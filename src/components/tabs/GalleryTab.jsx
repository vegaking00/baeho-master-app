import React, { useState } from 'react';
import { Palette, Heart, MessageCircle, Sparkles, Filter, PlusCircle, Trash2, Calendar, Award, LayoutGrid, Clock } from 'lucide-react';
import { STUDENTS } from '../../data/mockData';

export default function GalleryTab({ artworks, student, onSelectArtwork, onOpenAddModal, isAdmin, onDeleteArtwork }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('전체');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'timeline'

  const categories = ['전체', '수채화', '일러스트', '오일파스텔', '조소/만들기'];
  const ageGroups = ['전체', '유치부 (5~7세)', '초등 저학년 (1~3학년)', '초등 고학년 (4~6학년)'];

  // Filter artworks by current selected student & category & age group
  const studentArtworks = artworks.filter(art => art.studentId === student.id);
  
  // Filter list by category & age group
  let filteredArtworks = studentArtworks;
  if (selectedCategory !== '전체') {
    filteredArtworks = filteredArtworks.filter(art => art.category === selectedCategory);
  }
  if (selectedAgeGroup !== '전체') {
    if (selectedAgeGroup.includes('유치부')) {
      filteredArtworks = filteredArtworks.filter(art => art.studentId === 's2');
    } else if (selectedAgeGroup.includes('초등 저학년')) {
      filteredArtworks = filteredArtworks.filter(art => art.studentId === 's1');
    } else if (selectedAgeGroup.includes('초등 고학년')) {
      filteredArtworks = filteredArtworks.filter(art => art.studentId === 's3');
    }
  }

  // History timeline grouping (2026 vs 2025)
  const history2026 = filteredArtworks.filter(a => a.year === '2026' || !a.year);
  const historyPast = filteredArtworks.filter(a => a.year === '2025');

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Student Art Gallery Header Banner */}
      <div className="bg-gradient-to-r from-rose-100 via-amber-100 to-sky-100 p-4 rounded-3xl border border-rose-200/50 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{student.avatarEmoji}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-slate-800">
                  {student.name}의 아티스트 작품집 🎨
                </h2>
                <span className="bg-white/80 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  {student.ageGroupLabel || student.grade}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                총 <span className="font-bold text-rose-600">{studentArtworks.length}개</span>의 미술 작품 & 과거 성장 기록 보유
              </p>
            </div>
          </div>

          {/* Admin Only Add Artwork Button */}
          {isAdmin && (
            <button
              onClick={onOpenAddModal}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1 shrink-0 transition-transform active:scale-95 animate-pulse"
              title="원장님 전용 작품 등록"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ 작품 등록</span>
            </button>
          )}
        </div>
      </div>

      {/* View Mode Switcher & Age Group Filter Bar */}
      <div className="space-y-2">
        {/* Switcher: Grid View vs History Timeline View */}
        <div className="flex items-center justify-between bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-rose-500 text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> 최신 작품 갤러리
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'timeline'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> 📜 과거 성장 히스토리
            </button>
          </div>

          <span className="text-[10px] text-slate-400 font-medium px-2">
            {viewMode === 'grid' ? '최신순 목록' : '연도별 성장 타임라인'}
          </span>
        </div>

        {/* Age Group Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] font-bold text-slate-400 shrink-0">연령대:</span>
          {ageGroups.map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAgeGroup(age)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedAgeGroup === age
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {age}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 shrink-0">장르:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- 1. GRID VIEW --- */}
      {viewMode === 'grid' && (
        filteredArtworks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center text-xl">
              🎨
            </div>
            <p className="text-xs font-bold text-slate-600">등록된 해당 필터의 작품이 없습니다.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArtwork(art)}
                className="bg-white rounded-3xl border border-rose-100/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group active:scale-98 relative"
              >
                {/* Admin Only Delete Button */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`'${art.title}' 작품을 삭제하시겠습니까?`)) {
                        onDeleteArtwork(art.id);
                      }
                    }}
                    className="absolute top-2 right-2 z-10 bg-rose-600/80 hover:bg-rose-600 text-white p-1.5 rounded-full shadow-md transition-all backdrop-blur-xs"
                    title="작품 삭제 (원장님 권한)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Artwork Image Container */}
                <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=Artwork+Image';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                    {art.category}
                  </div>
                  {art.year === '2025' && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                      📜 2025 과거기록
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {art.date}
                  </div>
                </div>

                {/* Artwork Body Info */}
                <div className="p-3.5 space-y-2.5">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {art.title}
                  </h3>

                  {/* Teacher Comment Preview Quote */}
                  <div className="bg-amber-50/80 border border-amber-200/50 p-2.5 rounded-2xl text-[11px] text-slate-700 space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800">
                      <span>{art.teacherAvatar}</span> {art.teacherName} 피드백
                    </div>
                    <p className="line-clamp-2 text-slate-600 leading-snug">
                      "{art.feedback}"
                    </p>
                  </div>

                  {/* Card Footer Likes & Comments */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-rose-500 font-semibold">
                        <Heart className="w-3.5 h-3.5 fill-rose-500" /> {art.likes || 0}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <MessageCircle className="w-3.5 h-3.5 text-sky-400" /> {art.comments?.length || 0}
                      </span>
                    </div>
                    <span className="text-[11px] text-rose-500 font-bold group-hover:translate-x-1 transition-transform">
                      자세히 보기 →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* --- 2. HISTORY TIMELINE VIEW --- */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {/* 2026 Timeline Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-500" /> 2026년 성장 타임라인 ({history2026.length}작품)
              </h3>
            </div>

            <div className="border-l-2 border-rose-200 ml-4 pl-4 space-y-4">
              {history2026.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArtwork(art)}
                  className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2 relative"
                >
                  <div className="absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white" />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        {art.date}
                      </span>
                      <h4 className="font-bold text-slate-800 text-xs mt-1">{art.title}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 border px-2 py-0.5 rounded-lg">
                      {art.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                    "{art.feedback}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2025 Past Timeline Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> 2025년 이전 과거 성장 기록 ({historyPast.length}작품)
              </h3>
            </div>

            <div className="border-l-2 border-amber-200 ml-4 pl-4 space-y-4">
              {historyPast.length === 0 ? (
                <p className="text-xs text-slate-400">등록된 2025년 과거 기록 작품이 없습니다.</p>
              ) : (
                historyPast.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArtwork(art)}
                    className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2 relative"
                  >
                    <div className="absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white" />
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          📜 {art.date} 과거기록
                        </span>
                        <h4 className="font-bold text-slate-800 text-xs mt-1">{art.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                        {art.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-700 bg-white p-2 rounded-xl border border-amber-100">
                      {art.feedback}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
