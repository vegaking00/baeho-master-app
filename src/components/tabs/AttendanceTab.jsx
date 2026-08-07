import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Clock, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
import { ATTENDANCE_DATA } from '../../data/mockData';

export default function AttendanceTab({ student, isAdmin, onUpdateAttendance }) {
  const [selectedDate, setSelectedDate] = useState('2026-08-07');
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memoInput, setMemoInput] = useState('');
  const [statusInput, setStatusInput] = useState('present');

  const studentData = ATTENDANCE_DATA[student.id] || ATTENDANCE_DATA['s1'];
  const summary = studentData.summary;
  const daysRecord = studentData.days || {};

  // August 2026 Calendar days calculation (Aug 1 2026 is Saturday)
  const daysInMonth = 31;
  const firstDayOfWeek = 6;

  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const dateStr = `2026-08-${formattedDay}`;
    calendarCells.push({
      day,
      dateStr,
      record: daysRecord[dateStr] || null
    });
  }

  const selectedDayInfo = daysRecord[selectedDate];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return { text: '출석', bg: 'bg-emerald-500 text-white', icon: CheckCircle2, dot: 'bg-emerald-500' };
      case 'late':
        return { text: '지각', bg: 'bg-amber-500 text-white', icon: Clock, dot: 'bg-amber-500' };
      case 'absent':
        return { text: '결석', bg: 'bg-rose-500 text-white', icon: AlertCircle, dot: 'bg-rose-500' };
      case 'makeup':
        return { text: '보강', bg: 'bg-purple-500 text-white', icon: RefreshCw, dot: 'bg-purple-500' };
      default:
        return null;
    }
  };

  const handleSaveAttendance = () => {
    const newRecord = {
      status: statusInput,
      timeIn: selectedDayInfo?.timeIn || '15:30',
      timeOut: selectedDayInfo?.timeOut || '17:00',
      memo: memoInput.trim() || `${student.name} 정시 등원 및 실기 수업`
    };

    if (onUpdateAttendance) {
      onUpdateAttendance(student.id, selectedDate, newRecord);
    }
    setIsEditingMemo(false);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Attendance Summary Header */}
      <div className="bg-gradient-to-r from-emerald-100 via-sky-100 to-indigo-100 p-4 rounded-3xl border border-emerald-200/60 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{student.avatarEmoji}</span>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                {student.name} 학생의 8월 출석 현황 📅
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                월 출석률: <span className="font-extrabold text-emerald-600 text-sm">{summary.attendanceRate}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-emerald-200/40 text-center">
          <div className="bg-white/80 p-2 rounded-2xl border border-emerald-100 shadow-2xs">
            <div className="text-[10px] text-slate-400 font-bold">출석</div>
            <div className="text-sm font-extrabold text-emerald-600">{summary.presentDays}일</div>
          </div>
          <div className="bg-white/80 p-2 rounded-2xl border border-amber-100 shadow-2xs">
            <div className="text-[10px] text-slate-400 font-bold">지각</div>
            <div className="text-sm font-extrabold text-amber-600">{summary.lateDays}일</div>
          </div>
          <div className="bg-white/80 p-2 rounded-2xl border border-rose-100 shadow-2xs">
            <div className="text-[10px] text-slate-400 font-bold">결석</div>
            <div className="text-sm font-extrabold text-rose-500">{summary.absentDays}일</div>
          </div>
          <div className="bg-white/80 p-2 rounded-2xl border border-purple-100 shadow-2xs">
            <div className="text-[10px] text-slate-400 font-bold">보강</div>
            <div className="text-sm font-extrabold text-purple-600">{summary.makeupDays}일</div>
          </div>
        </div>
      </div>

      {/* Monthly Calendar View */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        {/* Calendar Title */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <button className="p-1 text-slate-400 hover:text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
            <CalendarIcon className="w-4 h-4 text-rose-500" /> 2026년 8월
          </div>
          <button className="p-1 text-slate-400 hover:text-slate-600"><ChevronRight className="w-4 h-4" /></button>
        </div>

        {/* Status Legend */}
        <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-500 py-1 bg-slate-50 rounded-xl">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 출석</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 지각</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> 결석</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> 보강</span>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 pt-1">
          <span className="text-rose-500">일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span className="text-sky-500">토</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarCells.map((cell, index) => {
            if (!cell) return <div key={`empty-${index}`} className="h-11" />;

            const { day, dateStr, record } = cell;
            const isSelected = selectedDate === dateStr;
            const badge = record ? getStatusBadge(record.status) : null;

            return (
              <button
                key={dateStr}
                onClick={() => {
                  setSelectedDate(dateStr);
                  if (record) {
                    setStatusInput(record.status);
                    setMemoInput(record.memo);
                  } else {
                    setStatusInput('present');
                    setMemoInput('');
                  }
                  setIsEditingMemo(false);
                }}
                className={`h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all duration-150 ${
                  isSelected
                    ? 'bg-rose-500 text-white font-bold shadow-xs scale-105 z-10'
                    : 'hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <span className="text-xs">{day}</span>
                {badge && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : badge.dot}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Detail Info / Admin Edit Card */}
      <div className="bg-white rounded-3xl p-4 border border-rose-100/80 shadow-xs space-y-2.5 animate-pop-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span>📅 {selectedDate} 수업 기록</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedDayInfo && (
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadge(selectedDayInfo.status).bg}`}>
                {getStatusBadge(selectedDayInfo.status).text}
              </span>
            )}

            {/* Admin Only Edit Toggle */}
            {isAdmin && !isEditingMemo && (
              <button
                onClick={() => {
                  setStatusInput(selectedDayInfo?.status || 'present');
                  setMemoInput(selectedDayInfo?.memo || '');
                  setIsEditingMemo(true);
                }}
                className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-full"
              >
                <Edit3 className="w-3 h-3" /> 출석 체크 (원장님)
              </button>
            )}
          </div>
        </div>

        {/* Admin Editing Mode Form */}
        {isAdmin && isEditingMemo ? (
          <div className="space-y-3 bg-rose-50/60 p-3 rounded-2xl border border-rose-100 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">출석 상태 변경</label>
              <select
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold"
              >
                <option value="present">🟢 출석</option>
                <option value="late">🟡 지각</option>
                <option value="absent">🔴 결석</option>
                <option value="makeup">🟣 보강</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">수업 메모 작성</label>
              <input
                type="text"
                placeholder="선생님의 수업 관찰 및 특이사항 입력..."
                value={memoInput}
                onChange={(e) => setMemoInput(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setIsEditingMemo(false)}
                className="px-3 py-1.5 bg-slate-200 rounded-xl font-bold text-slate-600"
              >
                취소
              </button>
              <button
                onClick={handleSaveAttendance}
                className="px-3 py-1.5 bg-rose-500 text-white rounded-xl font-bold"
              >
                저장하기
              </button>
            </div>
          </div>
        ) : selectedDayInfo ? (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-rose-400" /> 입실: <strong className="text-slate-800">{selectedDayInfo.timeIn}</strong>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> 퇴실: <strong className="text-slate-800">{selectedDayInfo.timeOut}</strong>
              </span>
            </div>

            <div className="bg-rose-50/50 p-3 rounded-2xl border border-rose-100 text-slate-700 space-y-1">
              <div className="text-[11px] font-bold text-rose-600">📝 선생님 수업 메모</div>
              <p className="text-xs font-medium text-slate-700">{selectedDayInfo.memo}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">
            해당 날짜에는 학원 등원 수업이 없는 날입니다.
          </p>
        )}
      </div>
    </div>
  );
}
