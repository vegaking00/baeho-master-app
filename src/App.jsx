import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
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
  const [selectedStudentId, setSelectedStudentId] = useState('s3'); // Default to Danwoo (12세)
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  
  // Modals state
  const [showAddArtworkModal, setShowAddArtworkModal] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);

  // Admin Auth state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

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
        setIsAdmin(true);
        setAdminUser(user);
      } else {
        setIsAdmin(false);
        setAdminUser(null);
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

  const handleLoginSuccess = (user) => {
    setIsAdmin(true);
    setAdminUser(user);
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAdmin(false);
    setAdminUser(null);
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
      name: "학부모",
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

  return (
    <div className="min-h-screen bg-slate-200/80 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Device Frame Container */}
      <div className="mobile-container w-full min-h-screen sm:min-h-[880px] bg-slate-50 flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header Bar */}
        <Header
          selectedStudent={selectedStudentId}
          onSelectStudent={setSelectedStudentId}
          isAdmin={isAdmin}
          onOpenLoginModal={() => setShowAdminLoginModal(true)}
          onOpenParentModal={() => setShowParentModal(true)}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-3">
          {activeTab === 'gallery' && (
            <GalleryTab
              artworks={artworksList}
              student={currentStudent}
              onSelectArtwork={setSelectedArtwork}
              onOpenAddModal={() => setShowAddArtworkModal(true)}
              isAdmin={isAdmin}
              onDeleteArtwork={handleDeleteArtwork}
            />
          )}

          {activeTab === 'notice' && (
            <NoticeTab
              notices={noticesList}
              onSelectNotice={(notice) => {
                setSelectedNotice(notice);
                handleMarkNoticeRead(notice.id);
              }}
              isAdmin={isAdmin}
              onOpenAddNoticeModal={() => setShowAddNoticeModal(true)}
              onDeleteNotice={handleDeleteNotice}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceTab
              student={currentStudent}
              isAdmin={isAdmin}
              onUpdateAttendance={handleUpdateAttendance}
            />
          )}

          {activeTab === 'tuition' && (
            <TuitionTab
              student={currentStudent}
              tuitionList={tuitionList}
              isAdmin={isAdmin}
              onUpdateTuition={handleUpdateTuition}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleTab
              events={schedulesList}
              isAdmin={isAdmin}
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
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {showParentModal && (
          <ParentLoginModal
            currentStudentId={selectedStudentId}
            onClose={() => setShowParentModal(false)}
            onSelectChild={setSelectedStudentId}
          />
        )}
      </div>
    </div>
  );
}
