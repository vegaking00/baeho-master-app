import React, { useState } from 'react';
import { X, CalendarDays, PlusCircle } from 'lucide-react';

export default function AddScheduleModal({ onClose, onAddSchedule }) {
  const [date, setDate] = useState('2026.08.10');
  const [day, setDay] = useState('월');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('특강수업');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('일정 제목을 입력해 주세요!');
      return;
    }

    const colorMap = {
      '원비안내': 'bg-amber-100 text-amber-800 border-amber-300',
      '특강수업': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      '휴원': 'bg-rose-100 text-rose-800 border-rose-300',
      '학원행사': 'bg-purple-100 text-purple-800 border-purple-300',
      '상담': 'bg-sky-100 text-sky-800 border-sky-300'
    };

    const newSch = {
      date,
      day,
      title: title.trim(),
      category,
      color: colorMap[category] || 'bg-slate-100 text-slate-800 border-slate-300',
      description: description.trim() || '리더스아트 학원 주요 일정입니다.',
      dDay: 'NEW'
    };

    onAddSchedule(newSch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-rose-100 p-5 space-y-4 animate-pop-in">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-rose-500" /> 학원 일정 등록 (원장님)
          </h3>
          <button onClick={onClose} className="text-slate-400 font-bold text-xs">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-1">
              <label className="font-bold text-slate-700">날짜 *</label>
              <input
                type="text"
                placeholder="2026.08.10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">요일</label>
              <input
                type="text"
                placeholder="월"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">일정 제목 *</label>
            <input
              type="text"
              placeholder="예: 2학기 맞춤 진도 상담주간"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
            >
              <option value="원비안내">원비안내</option>
              <option value="특강수업">특강수업</option>
              <option value="휴원">휴원</option>
              <option value="학원행사">학원행사</option>
              <option value="상담">상담</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">상세 설명</label>
            <textarea
              rows="3"
              placeholder="학원 일정 관련 학부모 안내 사항..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> 일정 등록하기 (Firestore)
          </button>
        </form>
      </div>
    </div>
  );
}
