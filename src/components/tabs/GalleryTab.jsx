import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, MessageCircle, Plus, ChevronRight, Clock, Award, Filter, ShieldCheck, UserCheck, X, CheckCircle, FileText, CreditCard } from 'lucide-react';
import { STUDENTS, TUITION_DATA, ATTENDANCE_DATA, ARTWORKS } from '../../data/mockData';

export default function GalleryTab({ 
  artworks, 
  student, 
  onSelectArtwork, 
  onOpenAddModal, 
  isAdmin, 
  onDeleteArtwork,
  onSelectStudent 
}) {
  const [activeView, setActiveView] = useState('gallery'); // 'gallery' | 'timeline'
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('전체');
  
  // State for opening Age Group Student Cards Modal when clicking Age Pills
  const [ageModalGroup, setAgeModalGroup] = useState(null); // null | '유치부' | '초등저학년' | '초등고학년'

  const categories = ['전체', '수채화', '일러스트', '오일파스텔', '조소/만들기'];
  const ageGroups = [
    { key: '전체', label: '전체' },
    { key: '유치부', label: '유치부 (5~7세)' },
    { key: '초등저학년', label: '초등 저학년 (1~3학년)' },
    { key: '초등고학년', label: '초등 고학년 (4~6학년)' }
  ];

  // Handle student selection from age group modal: Reset filters so student's artworks show instantly!
  const handleSelectStudentFromModal = (studentId) => {
    onSelectStudent(studentId);
    setSelectedAgeGroup('전체'); // Reset age filter so all artworks of selected student display cleanly
    setSelectedCategory('전체'); // Reset category filter
    setAgeModalGroup(null); // Close modal
  };

  // When user clicks an age group pill
  const handleAgeGroupPillClick = (key) => {
    setSelectedAgeGroup(key);
    if (key !== '전체') {
      setAgeModalGroup(key); // Open student cards modal for that age group!
    }
  };

  // 1. Filter Selected Student's Artworks (with mockData fallback safety)
  const currentList = (artworks && artworks.length > 0) ? artworks : ARTWORKS;
  let studentArtworks = currentList.filter(a => a.studentId === student.id || a.studentId === student.id.replace('s0', 's'));

  if (studentArtworks.length === 0) {
    studentArtworks = ARTWORKS.filter(a => a.studentId === student.id || a.studentId === student.id.replace('s0', 's'));
  }

  // Fallback safety: If no artwork matched by studentId, show matching age group artworks
  const displayedBaseArtworks = studentArtworks.length > 0 
    ? studentArtworks 
    : currentList.filter(a => a.ageGroup === student.ageGroup);

  // 2. Filter by Category
  const filteredArtworks = displayedBaseArtworks.filter(a => {
    const matchesCategory = selectedCategory === '전체' || a.category === selectedCategory || (selectedCategory === '조소/만들기' && (a.category === '조소' || a.category === '만들기' || a.category === '조소/만들기' || a.category === '창의표현'));
    return matchesCategory;
  });

  // Split into 2026 current artworks vs 2025 past growth history
  const currentArtworks = filteredArtworks.filter(a => a.year === '2026' || !a.year);
  const pastArtworks = filteredArtworks.filter(a => a.year === '2025');

  // Student Attendance & Tuition Summary Data for Admin One-Stop Inspector
  const studentTuition = TUITION_DATA.find(t => t.studentId === student.id) || {
    amount: 180000,
    status: 'pending',
    statusText: '납부 예정'
  };

  const studentAttendance = ATTENDANCE_DATA[student.id]?.summary || {
    attendanceRate: 95,
    presentDays: 9,
    totalDays: 10
  };

  // Modal Student List for Selected Age Group
  const getAgeGroupStudents = (groupKey) => {
    if (groupKey === '유치부') return STUDENTS.filter(s => s.age <= 7);
    if (groupKey === '초등저학년') return STUDENTS.filter(s => s.age >= 8 && s.age <= 10);
    if (groupKey === '초등고학년') return STUDENTS.filter(s => s.age >= 11);
    return STUDENTS;
  };

  const currentModalStudents = ageModalGroup ? getAgeGroupStudents(ageModalGroup) : [];

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      
      {/* ------------------------------------------------------------------ */}
      {/* TOP COMPREHENSIVE STUDENT RECORD CARD (학생 종합 기록부 한눈에 보기) */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-gradient-to-r from-rose-100 via-purple-100 to-amber-100 p-4 rounded-3xl border border-rose-200/80 shadow-xs space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-2xl flex items-center justify-center shadow-sm border border-rose-200 shrink-0">
              {student.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-slate-800 tracking-tight">
                  {student.name} 학생 통합 기록부 📋
                </h2>
                <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                  {student.grade}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {student.class} • 지도: {student.teacher}
              </p>
            </div>
          </div>

          {/* Admin Add Artwork Button */}
          {isAdmin && (
            <button
              onClick={onOpenAddModal}
              className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-sm flex items-center gap-1 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" /> 작품 등록
            </button>
          )}
        </div>

        {/* 3-Column Summary Stats: Artworks + Attendance + Tuition in ONE glance! */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-rose-200/60">
          <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-rose-100">
            <div className="text-[10px] text-slate-500 font-bold">🎨 보유 작품</div>
            <div className="text-sm font-black text-rose-600">{displayedBaseArtworks.length}개</div>
            <div className="text-[9px] text-slate-400">(2026/2025 포함)</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-emerald-100">
            <div className="text-[10px] text-slate-500 font-bold">📅 출석률</div>
            <div className="text-sm font-black text-emerald-600">{studentAttendance.attendanceRate}%</div>
            <div className="text-[9px] text-slate-400">({studentAttendance.presentDays}/{studentAttendance.totalDays}일 출석)</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-amber-100">
            <div className="text-[10px] text-slate-500 font-bold">💳 8월 수납상태</div>
            <div className={`text-xs font-black ${studentTuition.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {studentTuition.statusText}
            </div>
            <div className="text-[9px] text-slate-400">{studentTuition.amount ? studentTuition.amount.toLocaleString() + '원' : ''}</div>
          </div>
        </div>
      </div>

      {/* Main View Switcher: 2026 Gallery vs 2025 Growth Timeline */}
      <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
        <div className="grid grid-cols-2 gap-1 flex-1">
          <button
            onClick={() => setActiveView('gallery')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeView === 'gallery'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <span>🎨 최신 작품 갤러리</span>
            <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded-full">{currentArtworks.length}</span>
          </button>

          <button
            onClick={() => setActiveView('timeline')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeView === 'timeline'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>📜 과거 성장 히스토리</span>
            <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded-full">{pastArtworks.length}</span>
          </button>
        </div>
      </div>

      {/* --- AGE GROUP PILLS (연령대 필터) --- */}
      <div className="space-y-1.5 bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs font-bold text-slate-500 shrink-0">연령대:</span>
          {ageGroups.map((g) => {
            const isSelected = selectedAgeGroup === g.key;
            return (
              <button
                key={g.key}
                onClick={() => handleAgeGroupPillClick(g.key)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-2xs scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                <span>{g.label}</span>
                {g.key !== '전체' && <span className="text-[10px] opacity-80">📱</span>}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-slate-50">
          <span className="text-xs font-bold text-slate-500 shrink-0">장르:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* VIEW 1: 2026 RECENT ARTWORKS GALLERY GRID */}
      {/* ------------------------------------------------------------------ */}
      {activeView === 'gallery' && (
        <div className="space-y-4">
          {currentArtworks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6 space-y-2">
              <div className="text-3xl">🎨</div>
              <p className="text-xs text-slate-500 font-medium">등록된 해당 필터의 작품이 없습니다.</p>
              {isAdmin && (
                <button
                  onClick={onOpenAddModal}
                  className="text-xs text-rose-500 font-bold hover:underline"
                >
                  + 원장님 권한으로 새 작품 등록하기
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {currentArtworks.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArtwork(art)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  {/* Artwork Image Container */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {art.category}
                    </div>
                    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                      {art.month || "08월"}
                    </div>
                  </div>

                  {/* Artwork Content Summary */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs line-clamp-1 group-hover:text-rose-600 transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {art.materials}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-semibold text-rose-500">
                        <Heart className="w-3 h-3 fill-rose-500" /> {art.likes || 0}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MessageCircle className="w-3 h-3" /> {(art.comments && art.comments.length) || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW 2: 2025 PAST GROWTH HISTORY TIMELINE */}
      {/* ------------------------------------------------------------------ */}
      {activeView === 'timeline' && (
        <div className="space-y-4">
          <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100 text-purple-900 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1 text-purple-700">
              <Sparkles className="w-4 h-4" /> 2025년 과거 성장 포트폴리오 히스토리
            </div>
            <p className="text-[11px] text-purple-800/80 leading-snug">
              1년 전 {student.name} 학생의 초기 미술 발달 스케치와 선생님 피드백 기록입니다. 현재 실력 성장과 비교해 보세요!
            </p>
          </div>

          {pastArtworks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-200 text-xs text-slate-400">
              2025년 보관된 성장 히스토리 작품이 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {pastArtworks.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArtwork(art)}
                  className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer flex gap-3"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                          2025년 10월 기록
                        </span>
                        <span className="text-[10px] text-slate-400">{art.category}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-xs mt-1">{art.title}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">
                        {art.feedback}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-50">
                      <span>👩‍🎨 {art.teacherName}</span>
                      <span className="text-rose-500 font-bold flex items-center gap-0.5">
                        💬 댓글 {(art.comments && art.comments.length) || 0}개 보기 →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL: AGE GROUP STUDENT CARDS POPUP (WHEN CLICKING AGE PILLS) */}
      {/* ------------------------------------------------------------------ */}
      {ageModalGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col p-4 sm:p-5 space-y-3 animate-pop-in">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  🏫 {ageModalGroup === '유치부' ? '유치부 (5~7세)' : (ageModalGroup === '초등저학년' ? '초등 저학년 (1~3학년)' : '초등 고학년 (4~6학년)')} 재원생 카드 목록 📱
                </h3>
                <p className="text-[10px] text-rose-500 font-semibold mt-0.5">
                  총 {currentModalStudents.length}명의 재원생 • 터치 1번으로 학생 화면 전환
                </p>
              </div>
              <button
                onClick={() => setAgeModalGroup(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Student Cards Grid */}
            <div className="overflow-y-auto max-h-[55vh] space-y-2 pr-1">
              <div className="grid grid-cols-2 gap-2">
                {currentModalStudents.map((s) => {
                  const tInfo = TUITION_DATA.find(t => t.studentId === s.id);
                  const isPaid = tInfo?.status === 'paid';
                  const isSelected = student.id === s.id;

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectStudentFromModal(s.id)}
                      className={`p-3 rounded-2xl border text-left transition-all hover:shadow-xs space-y-1.5 ${
                        isSelected
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 shadow-xs'
                          : 'bg-white border-slate-100 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{s.avatarEmoji}</span>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                          isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isPaid ? '수납 완료' : '납부 예정'}
                        </span>
                      </div>

                      <div>
                        <div className="font-extrabold text-slate-800 text-xs flex items-center gap-1">
                          <span>{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({s.id})</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                          {s.grade}
                        </div>
                        <div className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                          {s.class}
                        </div>
                      </div>

                      <div className="pt-1 border-t border-slate-50 flex justify-between items-center text-[9px] text-rose-500 font-bold">
                        <span>작품 3개 보유</span>
                        <span>기록 보기 →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setAgeModalGroup(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-xs"
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
