import React from 'react';
import { X, Calendar, Eye, CheckCircle2, Megaphone, Share2 } from 'lucide-react';

export default function NoticeModal({ notice, onClose, onMarkRead }) {
  if (!notice) return null;

  const getTagColor = (tag) => {
    switch (tag) {
      case '중요': return 'bg-rose-500 text-white';
      case '안내': return 'bg-sky-500 text-white';
      case '휴원': return 'bg-amber-500 text-white';
      case '소식': return 'bg-emerald-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-rose-100 animate-pop-in">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs ${getTagColor(notice.tag)}`}>
              {notice.tag}
            </span>
            <span className="text-xs text-slate-500 font-medium">학원 공지사항</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-2xs flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-800 leading-snug">
              {notice.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-400" /> {notice.date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" /> 조회 {notice.views}회
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100" />

          {/* Main Text Content */}
          <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner-soft">
            {notice.content}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
          <button
            onClick={() => {
              if (onMarkRead) onMarkRead(notice.id);
              onClose();
            }}
            className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-amber-400 hover:from-rose-600 hover:to-amber-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" /> 확인했습니다 (공지 읽음)
          </button>
        </div>
      </div>
    </div>
  );
}
