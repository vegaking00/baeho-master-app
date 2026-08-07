import React, { useState } from 'react';
import { Megaphone, Search, Pin, Calendar, ChevronRight, Eye, PlusCircle, Trash2 } from 'lucide-react';

export default function NoticeTab({ notices, onSelectNotice, isAdmin, onOpenAddNoticeModal, onDeleteNotice }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');

  const tags = ['전체', '중요', '행사', '수업', '일정', '축하'];

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '전체' || n.tag === selectedTag || n.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  const getTagBadge = (tag) => {
    switch (tag) {
      case '중요':
        return 'bg-rose-500 text-white font-bold';
      case '안내':
      case '수업':
        return 'bg-sky-100 text-sky-700 font-semibold';
      case '휴원':
      case '일정':
        return 'bg-amber-100 text-amber-800 font-semibold';
      case '축하':
      case '소식':
        return 'bg-emerald-100 text-emerald-700 font-semibold';
      default:
        return 'bg-slate-100 text-slate-700 font-semibold';
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Notice Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-orange-100 p-4 rounded-3xl border border-amber-200/60 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-rose-500" /> 리더스아트 공지사항
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            원내 주요 행사 및 신연정 원장님 안내를 확인하세요.
          </p>
        </div>

        {/* Admin Only Add Notice Button */}
        {isAdmin && (
          <button
            onClick={onOpenAddNoticeModal}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1 shrink-0 transition-transform active:scale-95 animate-pulse"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ 공지 작성</span>
          </button>
        )}
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="공지사항 제목 또는 내용 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-rose-400 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedTag === t
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Cards List */}
      <div className="space-y-2.5">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs">
            검색 결과와 일치하는 공지사항이 없습니다.
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => onSelectNotice(notice)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-98 relative overflow-hidden ${
                notice.tag === '중요'
                  ? 'bg-gradient-to-r from-rose-50/90 to-amber-50/70 border-rose-200 shadow-xs'
                  : 'bg-white border-slate-100 hover:border-rose-200 shadow-2xs'
              }`}
            >
              {/* Unread Pill */}
              {!notice.isRead && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}

              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {notice.tag === '중요' && (
                    <Pin className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${getTagBadge(notice.tag)}`}>
                    {notice.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {notice.date}
                  </span>
                </div>

                {/* Admin Delete Icon */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`'${notice.title}' 공지를 삭제하시겠습니까?`)) {
                        onDeleteNotice(notice.id);
                      }
                    }}
                    className="text-slate-300 hover:text-rose-500 p-1"
                    title="공지 삭제 (원장님 권한)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                {notice.title}
              </h3>

              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                {notice.content}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2.5 mt-2 border-t border-slate-100/80">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> 조회 {notice.views}
                </span>

                <div className="flex items-center gap-1 font-bold text-rose-500">
                  <span>상세보기</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
