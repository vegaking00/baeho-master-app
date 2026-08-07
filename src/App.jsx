import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import GalleryTab from './components/tabs/GalleryTab';
import NoticeTab from './components/tabs/NoticeTab';
import AttendanceTab from './components/tabs/AttendanceTab';
import ScheduleTab from './components/tabs/ScheduleTab';
import ArtworkModal from './components/modals/ArtworkModal';
import NoticeModal from './components/modals/NoticeModal';
import { STUDENTS, ARTWORKS, NOTICES } from './data/mockData';

export default function App() {
  const [selectedStudentId, setSelectedStudentId] = useState('s1');
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Stateful lists so user interactions (like artwork comments & likes, notice read status) persist during preview
  const [artworksList, setArtworksList] = useState(ARTWORKS);
  const [noticesList, setNoticesList] = useState(NOTICES);

  const currentStudent = STUDENTS.find(s => s.id === selectedStudentId) || STUDENTS[0];
  const unreadNoticeCount = noticesList.filter(n => !n.isRead).length;

  // Toggle artwork like
  const handleToggleLike = (artworkId, isLiked) => {
    setArtworksList(prev => prev.map(art => {
      if (art.id === artworkId) {
        const currentLikes = art.likes || 0;
        return { ...art, likes: isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1) };
      }
      return art;
    }));
  };

  // Add comment to artwork
  const handleAddComment = (artworkId, commentText) => {
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
  };

  // Mark notice as read
  const handleMarkNoticeRead = (noticeId) => {
    setNoticesList(prev => prev.map(n => n.id === noticeId ? { ...n, isRead: true } : n));
  };

  return (
    <div className="min-h-screen bg-slate-200/80 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Device Frame Container (Simulates smartphone on desktop) */}
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
      </div>
    </div>
  );
}
