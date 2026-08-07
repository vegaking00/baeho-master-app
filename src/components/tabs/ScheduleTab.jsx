import React, { useState } from 'react';
import { CalendarDays, Sparkles, PlusCircle, Trash2 } from 'lucide-react';
import { SCHEDULE_DATA } from '../../data/mockData';

export default function ScheduleTab({ events, isAdmin, onOpenAddScheduleModal, onDeleteSchedule }) {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const filters = ['전체', '원비안내', '특강수업', '휴원', '학원행사', '상담'];
  const theme = SCHEDULE_DATA.monthlyTheme;

  const scheduleList = events || SCHEDULE_DATA.events;

  const filteredEvents = selectedFilter === '전체'
    ? scheduleList
    : scheduleList.filter(e => e.category === selectedFilter);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Monthly Art Theme Highlight Card */}
      <div className="bg-gradient-to-br from-rose-400 via-amber-300 to-sky-300 p-0.5 rounded-3xl shadow-md">
        <div className="bg-white rounded-[22px] p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-500" /> 이달의 교육 주제
            </span>
            <span className="text-xs font-bold text-slate-400">2026.08</span>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800 leading-tight">
              {theme.title}
            </h2>
            <p className="text-xs font-semibold text-rose-500 mt-1">
              {theme.subtitle}
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-rose-50/50 p-3 rounded-2xl border border-rose-100/60">
            {theme.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {theme.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Admin Add Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                selectedFilter === f
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Admin Add Schedule Button */}
        {isAdmin && (
          <button
            onClick={onOpenAddScheduleModal}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1 shrink-0 transition-transform active:scale-95 animate-pulse"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ 일정 등록</span>
          </button>
        )}
      </div>

      {/* Monthly Events List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 px-1">
          <CalendarDays className="w-4 h-4 text-rose-500" /> 8월 전체 주요 학원 일정
        </h3>

        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:shadow-xs transition-all space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl">
                  {evt.date} ({evt.day})
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${evt.color}`}>
                  {evt.category}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                  {evt.dDay}
                </span>

                {/* Admin Delete Icon */}
                {isAdmin && (
                  <button
                    onClick={() => {
                      if (window.confirm(`'${evt.title}' 일정을 삭제하시겠습니까?`)) {
                        onDeleteSchedule(evt.id);
                      }
                    }}
                    className="text-slate-300 hover:text-rose-500 p-1"
                    title="일정 삭제 (원장님 권한)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-800">
              {evt.title}
            </h4>

            <p className="text-[11px] text-slate-600 leading-snug">
              {evt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
