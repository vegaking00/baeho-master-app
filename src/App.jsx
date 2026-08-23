import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoginLandingPage from './components/LoginLandingPage';
import AdminMainDashboardView from './components/views/AdminMainDashboardView';
import ParentMainCareView from './components/views/ParentMainCareView';
import GalleryTab from './components/tabs/GalleryTab';
import NoticeTab from './components/tabs/NoticeTab';
import AttendanceTab from './components/tabs/AttendanceTab';
import ScheduleTab from './components/tabs/ScheduleTab';
import TuitionTab from './components/tabs/TuitionTab';
import ArtworkModal from './components/modals/ArtworkModal';
import NoticeModal from './components/modals/NoticeModal';
import AddArtworkModal from './components/modals/AddArtworkModal';
import AddNoticeModal from './components/modals/AddNoticeModal';
import AddScheduleModal from './components/modals/AddScheduleModal';
import AdminLoginModal from './components/modals/AdminLoginModal';
import ParentLoginModal from './components/modals/ParentLoginModal';
import AdminDashboardModal from './components/modals/AdminDashboardModal';
import StudentDetailInspectorModal from './components/modals/StudentDetailInspectorModal';
import { STUDENTS, ARTWORKS, NOTICES, ATTENDANCE_DATA, SCHEDULE_DATA, TUITION_DATA } from './data/mockData';
import { 
  subscribeGallery, 
  subscribeNotices, 
  subscribeAttendance, 
  subscribeSchedules,
  subscribeTuition,
  subscribeAuthStatus,
  adminLogout,
  addArtworkToFirestore,
  deleteArtworkFromFirestore,
  addNoticeToFirestore,
  deleteNoticeFromFirestore,
  updateAttendanceInFirestore,
  addScheduleToFirestore,
  deleteScheduleFromFirestore,
  updateTuitionInFirestore,
  addCommentToFirestore, 
  toggleLikeInFirestore,
  seedInitialFirestoreData
} from './firebase';

export default function App() {
  // Session & User Role State: 'guest' (First Landing) | 'admin' (Director Main) | 'parent' (Parent Main)
  const [userRole, setUserRole] = useState('guest'); 
  const [selectedStudentId, setSelectedStudentId] = useState('s01'); // Default to Danwoo (12세)
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'gallery' | 'notice' | 'attendance' | 'tuition' | 'schedule'
  
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  
  // Modals state
  const [showAddArtworkModal, setShowAddArtworkModal] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [inspectorStudentId, setInspectorStudentId] = useState(null); // When director inspects a child

  // Firestore Realtime Collections state
  const [artworksList, setArtworksList] = useState(ARTWORKS);
  const [noticesList, setNoticesList] = useState(NOTICES);
  const [attendanceData, setAttendanceData] = useState(ATTENDANCE_DATA);
  const [schedulesList, setSchedulesList] = useState(SCHEDULE_DATA.events);
  const [tuitionList, setTuitionList] = useState(TUITION_DATA);

  const currentStudent = STUDENTS.find(s => s.id === selectedStudentId) || STUDENTS[0];
  const unreadNoticeCount = noticesList.filter(n => !n.isRead).length;

  // 1. Firebase Auth Listener
  useEffect(() => {
    const unsubAuth = subscribeAuthStatus((user) => {
      if (user) {
        setUserRole('admin');
      }
    });
    return () => unsubAuth();
  }, []);

  // 2. Firestore Real-time Collections Sync
  useEffect(() => {
    seedInitialFirestoreData();

    const unsubGallery = subscribeGallery((data) => setArtworksList(data));
    const unsubNotices = subscribeNotices((data) => setNoticesList(data));
    const unsubAttendance = subscribeAttendance((data) => setAttendanceData(data));
    const unsubSchedules = subscribeSchedules((data) => setSchedulesList(data));
    const unsubTuition = subscribeTuition((data) => setTuitionList(data));

    return () => {
      unsubGallery();
      unsubNotices();
      unsubAttendance();
      unsubSchedules();
      unsubTuition();
    };
  }, []);

  // --- ACTIONS ---

  const handleAdminLoginSuccess = () => {
    setUserRole('admin');
    setActiveTab('home');
  };

  const handleParentLoginSuccess = (studentId) => {
    setSelectedStudentId(studentId);
    setUserRole('parent');
    setActiveTab('home');
  };

  const handleLogout = async () => {
    await adminLogout();
    setUserRole('guest');
    setActiveTab('home');
  };

  const handleSelectStudentWithInspector = (studentId) => {
    setSelectedStudentId(studentId);
    if (userRole === 'admin') {
      setInspectorStudentId(studentId); // Open comprehensive student inspector modal for Director!
    }
  };

  const handleAddArtwork = async (newArtwork) => {
    const tempId = `art-${Date.now()}`;
    const artWithId = { id: tempId, ...newArtwork };
    setArtworksList(prev => [artWithId, ...prev]);

    await addArtworkToFirestore(newArtwork);
  };

  const handleDeleteArtwork = async (artworkId) => {
    setArtworksList(prev => prev.filter(a => a.id !== artworkId));
    await deleteArtworkFromFirestore(artworkId);
  };

  const handleAddNotice = async (newNotice) => {
    const tempId = `not-${Date.now()}`;
    const noticeWithId = { id: tempId, ...newNotice };
    setNoticesList(prev => [noticeWithId, ...prev]);

    await addNoticeToFirestore(newNotice);
  };

  const handleDeleteNotice = async (noticeId) => {
    setNoticesList(prev => prev.filter(n => n.id !== noticeId));
    await deleteNoticeFromFirestore(noticeId);
  };

  const handleUpdateAttendance = async (studentId, dateStr, dayRecord) => {
    setAttendanceData(prev => {
      const studentData = prev[studentId] || { summary: { totalDays: 10, presentDays: 9, lateDays: 1, absentDays: 0, makeupDays: 0, attendanceRate: 90 }, days: {} };
      const updatedDays = { ...(studentData.days || {}), [dateStr]: dayRecord };
      return {
        ...prev,
        [studentId]: { ...studentData, days: updatedDays }
      };
    });

    await updateAttendanceInFirestore(studentId, dateStr, dayRecord, null);
  };

  const handleAddSchedule = async (newSchedule) => {
    const tempId = `sch-${Date.now()}`;
    const schWithId = { id: tempId, ...newSchedule };
    setSchedulesList(prev => [schWithId, ...prev]);

    await addScheduleToFirestore(newSchedule);
  };

  const handleDeleteSchedule = async (scheduleId) => {
    setSchedulesList(prev => prev.filter(s => s.id !== scheduleId));
    await deleteScheduleFromFirestore(scheduleId);
  };

  const handleUpdateTuition = async (tuitionId, updateData) => {
    setTuitionList(prev => prev.map(t => t.id === tuitionId ? { ...t, ...updateData } : t));
    await updateTuitionInFirestore(tuitionId, updateData);
  };

  const handleToggleLike = async (artworkId, isLiked) => {
    setArtworksList(prev => prev.map(art => {
      if (art.id === artworkId) {
        const currentLikes = art.likes || 0;
        return { ...art, likes: isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1) };
      }
      return art;
    }));

    await toggleLikeInFirestore(artworkId, isLiked);
  };

  const handleAddComment = async (artworkId, commentText) => {
    const newComment = {
      id: Date.now(),
      name: userRole === 'admin' ? "신연정 원장님" : `${currentStudent.name} 학부모`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      text: commentText
    };

    setArtworksList(prev => prev.map(art => {
      if (art.id === artworkId) {
        const updatedComments = [...(art.comments || []), newComment];
        const updatedArt = { ...art, comments: updatedComments };
        if (selectedArtwork && selectedArtwork.id === artworkId) {
          setSelectedArtwork(updatedArt);
        }
        return updatedArt;
      }
      return art;
    }));

    await addCommentToFirestore(artworkId, newComment);
  };

  const handleMarkNoticeRead = (noticeId) => {
    setNoticesList(prev => prev.map(n => n.id === noticeId ? { ...n, isRead: true } : n));
  };

  // --- RENDER SCREEN BASED ON USER ROLE ---

  // 1. GUEST MODE: INITIAL INTEGRATED LANDING PAGE
  if (userRole === 'guest') {
    return (
      <LoginLandingPage
        onAdminLogin={handleAdminLoginSuccess}
        onParentLogin={handleParentLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-200/80 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Device Frame Container */}
      <div className="mobile-container w-full min-h-screen sm:min-h-[880px] bg-slate-50 flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header Bar */}
        <Header
          selectedStudent={selectedStudentId}
          onSelectStudent={handleSelectStudentWithInspector}
          isAdmin={userRole === 'admin'}
          userRole={userRole}
          onOpenLoginModal={() => setShowAdminLoginModal(true)}
          onOpenParentModal={() => setShowParentModal(true)}
          onOpenDashboardModal={() => setShowDashboardModal(true)}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-3">
          
          {/* TAB: HOME MAIN SCREEN (DIRECTOR vs PARENT SPECIFIC MAIN) */}
          {activeTab === 'home' && (
            userRole === 'admin' ? (
              /* Director Admin Command Center Main View */
              <AdminMainDashboardView
                onSelectStudent={handleSelectStudentWithInspector}
                onOpenAddArtwork={() => setShowAddArtworkModal(true)}
                onOpenAddNotice={() => setShowAddNoticeModal(true)}
                onOpenAddSchedule={() => setShowAddScheduleModal(true)}
                onOpenDashboardModal={() => setShowDashboardModal(true)}
                onNavigateTab={setActiveTab}
                tuitionList={tuitionList}
              />
            ) : (
              /* Parent Child Care Main View */
              <ParentMainCareView
                student={currentStudent}
                artworksList={artworksList}
                onSelectArtwork={setSelectedArtwork}
                onNavigateTab={setActiveTab}
              />
            )
          )}

          {activeTab === 'gallery' && (
            <GalleryTab
              artworks={artworksList}
              student={currentStudent}
              onSelectArtwork={setSelectedArtwork}
              onOpenAddModal={() => setShowAddArtworkModal(true)}
              isAdmin={userRole === 'admin'}
              onDeleteArtwork={handleDeleteArtwork}
              onSelectStudent={handleSelectStudentWithInspector}
            />
          )}

          {activeTab === 'notice' && (
            <NoticeTab
              notices={noticesList}
              onSelectNotice={(notice) => {
                setSelectedNotice(notice);
                handleMarkNoticeRead(notice.id);
              }}
              isAdmin={userRole === 'admin'}
              onOpenAddNoticeModal={() => setShowAddNoticeModal(true)}
              onDeleteNotice={handleDeleteNotice}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceTab
              student={currentStudent}
              isAdmin={userRole === 'admin'}
              onUpdateAttendance={handleUpdateAttendance}
            />
          )}

          {activeTab === 'tuition' && (
            <TuitionTab
              student={currentStudent}
              tuitionList={tuitionList}
              isAdmin={userRole === 'admin'}
              onUpdateTuition={handleUpdateTuition}
              onSelectStudent={handleSelectStudentWithInspector}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleTab
              events={schedulesList}
              isAdmin={userRole === 'admin'}
              onOpenAddScheduleModal={() => setShowAddScheduleModal(true)}
              onDeleteSchedule={handleDeleteSchedule}
            />
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadNoticeCount={unreadNoticeCount}
        />

        {/* Modals */}
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
          />
        )}

        {selectedNotice && (
          <NoticeModal
            notice={selectedNotice}
            onClose={() => setSelectedNotice(null)}
            onMarkRead={handleMarkNoticeRead}
          />
        )}

        {showAddArtworkModal && (
          <AddArtworkModal
            student={currentStudent}
            onClose={() => setShowAddArtworkModal(false)}
            onAddArtwork={handleAddArtwork}
          />
        )}

        {showAddNoticeModal && (
          <AddNoticeModal
            onClose={() => setShowAddNoticeModal(false)}
            onAddNotice={handleAddNotice}
          />
        )}

        {showAddScheduleModal && (
          <AddScheduleModal
            onClose={() => setShowAddScheduleModal(false)}
            onAddSchedule={handleAddSchedule}
          />
        )}

        {showAdminLoginModal && (
          <AdminLoginModal
            onClose={() => setShowAdminLoginModal(false)}
            onLoginSuccess={handleAdminLoginSuccess}
          />
        )}

        {showParentModal && (
          <ParentLoginModal
            currentStudentId={selectedStudentId}
            onClose={() => setShowParentModal(false)}
            onSelectChild={handleParentLoginSuccess}
          />
        )}

        {showDashboardModal && (
          <AdminDashboardModal
            currentStudentId={selectedStudentId}
            onClose={() => setShowDashboardModal(false)}
            onSelectStudent={handleSelectStudentWithInspector}
            tuitionList={tuitionList}
          />
        )}

        {inspectorStudentId && (
          <StudentDetailInspectorModal
            studentId={inspectorStudentId}
            artworksList={artworksList}
            onClose={() => setInspectorStudentId(null)}
            onSelectArtwork={(art) => {
              setSelectedArtwork(art);
            }}
            onUpdateTuition={handleUpdateTuition}
          />
        )}
      </div>
    </div>
  );
}
