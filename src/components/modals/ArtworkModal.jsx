import React, { useState } from 'react';
import { X, Heart, MessageCircle, Share2, Download, Sparkles, UserCheck, Send } from 'lucide-react';

export default function ArtworkModal({ artwork, onClose, onToggleLike, onAddComment }) {
  const [commentInput, setCommentInput] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(artwork.likes || 0);

  if (!artwork) return null;

  const handleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikeCount(prev => nextLiked ? prev + 1 : prev - 1);
    if (onToggleLike) onToggleLike(artwork.id, nextLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    if (onAddComment) {
      onAddComment(artwork.id, commentInput.trim());
    }
    setCommentInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-rose-100 animate-pop-in">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">
              {artwork.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">{artwork.date}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {/* Artwork Image Container */}
          <div className="relative group rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-md">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-auto max-h-[340px] object-contain bg-slate-900 mx-auto"
            />
            <div className="absolute bottom-2 right-2 flex gap-1.5">
              <button
                onClick={() => alert("작품 고화질 이미지가 저장되었습니다!")}
                className="bg-white/80 hover:bg-white text-slate-700 p-2 rounded-xl backdrop-blur-xs shadow-md transition-all active:scale-95"
                title="이미지 저장"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title & Materials */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              {artwork.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <span className="font-semibold text-rose-500">🎨 재료:</span> {artwork.materials}
            </p>
          </div>

          {/* Tags */}
          {artwork.tags && (
            <div className="flex flex-wrap gap-1.5">
              {artwork.tags.map((tag, idx) => (
                <span key={idx} className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Teacher Feedback Box */}
          <div className="bg-gradient-to-br from-amber-50/90 via-rose-50/50 to-orange-50/80 p-4 rounded-2xl border border-amber-200/60 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{artwork.teacherAvatar || '👩‍🎨'}</span>
                <div>
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    {artwork.teacherName} 코멘트
                    <span className="bg-amber-200 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">담임</span>
                  </div>
                  <div className="text-[10px] text-amber-700/80">원내 실기 관찰 기록</div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            
            <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-amber-100 shadow-2xs">
              "{artwork.feedback}"
            </p>
          </div>

          {/* Like & Comments Stats Bar */}
          <div className="flex items-center justify-between border-t border-b border-slate-100 py-2.5 px-1">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs font-bold transition-transform active:scale-125 ${
                  isLiked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>좋아요 {likeCount}개</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <MessageCircle className="w-4 h-4 text-sky-500" />
                <span>칭찬 코멘트 {artwork.comments?.length || 0}개</span>
              </div>
            </div>

            <button
              onClick={() => alert("작품 링크가 복사되었습니다!")}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" /> 공유
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1">
              💬 학부모 칭찬 한마디
            </h4>

            {(!artwork.comments || artwork.comments.length === 0) ? (
              <p className="text-xs text-slate-400 text-center py-3 bg-slate-50 rounded-xl">
                아이에게 첫 번째 칭찬 댓글을 달아주세요! 👏
              </p>
            ) : (
              <div className="space-y-2">
                {artwork.comments.map((c) => (
                  <div key={c.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-rose-600">{c.name}</span>
                      <span className="text-[10px] text-slate-400">{c.date}</span>
                    </div>
                    <p className="text-slate-700">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comment Input Footer */}
        <form onSubmit={handleCommentSubmit} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="아이에게 따뜻한 칭찬 메시지를 남겨주세요..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!commentInput.trim()}
            className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-xs shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
