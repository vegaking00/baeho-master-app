import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import GalleryTab from './components/tabs/GalleryTab';
import NoticeTab from './components/tabs/NoticeTab';
import AttendanceTab from './components/tabs/AttendanceTab';
import ScheduleTab from './components/tabs/ScheduleTab';
import ArtworkModal from './components/modals/ArtworkModal';
import NoticeModal from './components/modals/NoticeModal';
import AddArtworkModal from './components/modals/AddArtworkModal';
import { STUDENTS, ARTWORKS, NOTICES } from './data/mockData';
import { 
  subscribeArtworks, 
  addArtworkToFirestore, 
  addCommentToFirestore, 
  toggleLikeInFirestore,
  isFirebaseConnected 
} from './firebase';

export default function App() {
  const [selectedStudentId, setSelectedStudentId] = useState('s3'); // Default to Danwoo (12세)
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showAddArtworkModal, setShowAddArtworkModal] = useState(false);

  // Stateful lists so user interactions (like artwork comments & likes, notice read status) persist
  const [artworksList, setArtworksList] = useState(ARTWORKS);
  const [noticesList, setNoticesList] = useState(NOTICES);

  const currentStudent = STUDENTS.find(s => s.id === selectedStudentId) || STUDENTS[0];
  const unreadNoticeCount = noticesList.filter(n => !n.isRead).length;

  // Real-time Firestore sync
  useEffect(() => {
    const unsubscribe = subscribeArtworks((updatedArtworks) => {
      setArtworksList(updatedArtworks);
    });
    return () => unsubscribe();
  }, []);

  // Add new artwork (Firestore + Local state)
  const handleAddArtwork = async (newArtwork) => {
    const tempId = `art-${Date.now()}`;
    const artWithId = { id: tempId, ...newArtwork };

    // Update local state for immediate feedback
    setArtworksList(prev => [artWithId, ...prev]);

    // Send to Firestore if connected (Image URL stored in document, no Storage required!)
    if (isFirebaseConnected) {
      await addArtworkToFirestore(newArtwork);
    }
  };

  // Toggle artwork like
  const handleToggleLike = async (artworkId, isLiked) => {
    setArtworksList(prev => prev.map(art => {
      if (art.id === artworkId) {
        const currentLikes = art.likes || 0;
        return { ...art, likes: isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1) };
      }
      return art;
    }));

    if (isFirebaseConnected) {
      await toggleLikeInFirestore(artworkId, isLiked);
    }
  };

  // Add comment to artwork
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

    if (isFirebaseConnected) {
      await addCommentToFirestore(artworkId, newComment);
    }
  };

  // Mark notice as read
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
          unreadNoticeCount={unreadNoticeCount}
        />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-3">
          {activeTab === 'gallery' && (
            <GalleryTab
              artworks={artworksList}
              student={currentStudent}
              onSelectArtwork={setSelectedArtwork}
              onOpenAddModal={() => setShowAddArtworkModal(true)}
            />
          )}

          {activeTab === 'notice' && (
            <NoticeTab
              notices={noticesList}
              onSelectNotice={(notice) => {
                setSelectedNotice(notice);
                handleMarkNoticeRead(notice.id);
              }}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceTab
              student={currentStudent}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleTab />
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
      </div>
    </div>
  );
}
