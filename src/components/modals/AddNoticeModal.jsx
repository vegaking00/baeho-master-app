import React, { useState } from 'react';
import { X, Megaphone, PlusCircle } from 'lucide-react';

export default function AddNoticeModal({ onClose, onAddNotice }) {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('중요');
  const [category, setCategory] = useState('행사');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 작성해 주세요!');
      return;
    }

    const newNotice = {
      title: title.trim(),
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      tag,
      category,
      content: content.trim(),
      isRead: false,
      views: 0
    };

    onAddNotice(newNotice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-rose-100 p-5 space-y-4 animate-pop-in">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Megaphone className="w-4 h-4 text-rose-500" /> 공지사항 작성 (원장님)
          </h3>
          <button onClick={onClose} className="text-slate-400 font-bold text-xs">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">공지 제목 *</label>
            <input
              type="text"
              placeholder="예: [필독] 8월 여름방학 특강 및 전시회 안내"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">태그</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              >
                <option value="중요">중요</option>
                <option value="안내">안내</option>
                <option value="휴원">휴원</option>
                <option value="소식">소식</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              >
                <option value="행사">행사</option>
                <option value="수업">수업</option>
                <option value="일정">일정</option>
                <option value="축하">축하</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">본문 내용 *</label>
            <textarea
              rows="5"
              placeholder="학부모님께 전달할 공지 내용을 자세히 작성해 주세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-400 hover:from-rose-600 hover:to-amber-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> 공지사항 등록하기 (Firestore)
          </button>
        </form>
      </div>
    </div>
  );
}
