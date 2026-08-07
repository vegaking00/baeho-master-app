import React, { useState } from 'react';
import { Palette, Heart, MessageCircle, Sparkles, Filter, PlusCircle, Trash2 } from 'lucide-react';

export default function GalleryTab({ artworks, student, onSelectArtwork, onOpenAddModal, isAdmin, onDeleteArtwork }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '수채화', '일러스트', '오일파스텔', '조소/만들기'];

  // Filter artworks by current selected student & category
  const studentArtworks = artworks.filter(art => art.studentId === student.id);
  const filteredArtworks = selectedCategory === '전체'
    ? studentArtworks
    : studentArtworks.filter(art => art.category === selectedCategory);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Student Art Gallery Header Banner */}
      <div className="bg-gradient-to-r from-rose-100 via-amber-100 to-sky-100 p-4 rounded-3xl border border-rose-200/50 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{student.avatarEmoji}</span>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                {student.name}의 아티스트 작품집 🎨
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                총 <span className="font-bold text-rose-600">{studentArtworks.length}개</span>의 미술 작품이 등록되어 있습니다.
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

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span className="text-slate-400 text-xs font-semibold shrink-0 pl-1">
          <Filter className="w-3.5 h-3.5 inline mr-1" />
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
              selectedCategory === cat
                ? 'bg-rose-500 text-white shadow-xs scale-105'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Artwork Grid List */}
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center text-xl">
            🎨
          </div>
          <p className="text-xs font-bold text-slate-600">등록된 해당 카테고리 작품이 없습니다.</p>
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
      )}
    </div>
  );
}
