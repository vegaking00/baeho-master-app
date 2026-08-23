import React, { useState } from 'react';
import { ShieldCheck, Users, CreditCard, Send, Plus, Sparkles, CheckCircle, Clock, ChevronRight, Search, FileText, Bell } from 'lucide-react';
import { STUDENTS, TUITION_DATA, ATTENDANCE_DATA } from '../../data/mockData';

export default function AdminMainDashboardView({ 
  onSelectStudent, 
  onOpenAddArtwork, 
  onOpenAddNotice, 
  onOpenAddSchedule,
  onOpenDashboardModal,
  onNavigateTab,
  tuitionList 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const currentTuitionList = tuitionList || TUITION_DATA;
  const totalStudents = STUDENTS.length; // 50
  const paidCount = currentTuitionList.filter(t => t.status === 'paid').length;
  const pendingCount = totalStudents - paidCount;
  const paidRate = Math.round((paidCount / totalStudents) * 100);

  const kinderCount = STUDENTS.filter(s => s.age <= 7).length;
  const lowerElemCount = STUDENTS.filter(s => s.age >= 8 && s.age <= 10).length;
  const upperElemCount = STUDENTS.filter(s => s.age >= 11).length;

  const filteredStudents = STUDENTS.filter(s => 
    s.name.includes(searchTerm) || 
    s.grade.includes(searchTerm) || 
    s.id.includes(searchTerm.toLowerCase())
  );

  const handleSendReminder = () => {
    alert(`[알림 발송 완료] 8월 미납 학부모님(${pendingCount}명)께 수납 안내 문자가 일괄 발송되었습니다! 📱`);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      
      {/* Top Director Executive Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white p-4 sm:p-5 rounded-3xl shadow-md space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs text-2xl flex items-center justify-center border border-white/30 shrink-0">
              👩‍🎨
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  신연정 원장 총괄 메인 👑
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                리더스아트 50명 학원 운영 총괄 대시보드
              </h2>
              <p className="text-xs text-rose-100 mt-0.5">
                원내 전체 재원생 현황 • 원비 수납 달성률 {paidRate}%
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDashboardModal}
            className="bg-white text-purple-700 hover:bg-rose-50 font-extrabold text-xs px-3 py-1.5 rounded-full shadow-xs shrink-0 flex items-center gap-1"
          >
            <Users className="w-3.5 h-3.5" /> 50명 대시보드
          </button>
        </div>

        {/* 4 Key Executive Stats */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-white/20">
          <div className="bg-white/15 backdrop-blur-xs p-2 rounded-2xl">
            <div className="text-[10px] text-purple-100">총 재원생</div>
            <div className="text-sm sm:text-base font-black">{totalStudents}명</div>
          </div>
          <div className="bg-white/15 backdrop-blur-xs p-2 rounded-2xl">
            <div className="text-[10px] text-amber-200 font-bold">유치부 (7세)</div>
            <div className="text-sm sm:text-base font-black text-amber-200">{kinderCount}명</div>
          </div>
          <div className="bg-white/15 backdrop-blur-xs p-2 rounded-2xl">
            <div className="text-[10px] text-sky-200 font-bold">초등 저학년</div>
            <div className="text-sm sm:text-base font-black text-sky-200">{lowerElemCount}명</div>
          </div>
          <div className="bg-white/15 backdrop-blur-xs p-2 rounded-2xl">
            <div className="text-[10px] text-purple-200 font-bold">초등 고학년</div>
            <div className="text-sm sm:text-base font-black text-purple-200">{upperElemCount}명</div>
          </div>
        </div>
      </div>

      {/* 3 Quick Admin Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onOpenAddArtwork}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold p-3 rounded-2xl text-xs flex flex-col items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>+ 작품 등록</span>
        </button>

        <button
          onClick={onOpenAddNotice}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold p-3 rounded-2xl text-xs flex flex-col items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
        >
          <Bell className="w-5 h-5" />
          <span>+ 공지 작성</span>
        </button>

        <button
          onClick={onOpenAddSchedule}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-2xl text-xs flex flex-col items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
        >
          <Sparkles className="w-5 h-5" />
          <span>+ 특강 일정</span>
        </button>
      </div>

      {/* Tuition Summary Card & Action */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amber-500" /> 8월 원비 수납 실시간 현황
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              완납 {paidCount}명 / 납부 예정 {pendingCount}명 (달성률 {paidRate}%)
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSendReminder}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] px-2.5 py-1 rounded-xl flex items-center gap-1"
            >
              <Send className="w-3 h-3" /> 미납 알림
            </button>
            <button
              onClick={() => onNavigateTab('tuition')}
              className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[11px] px-2.5 py-1 rounded-xl"
            >
              전체 관리 →
            </button>
          </div>
        </div>

        {/* Tuition Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
            <div style={{ width: `${paidRate}%` }} className="bg-emerald-500 h-full rounded-full transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* 50 Students Management Grid */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-600" /> 50명 재원생 기록 통합 조회
          </h3>
          <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
            클릭 시 종합 기록부 팝업
          </span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="학생 이름, 학년 또는 ID 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="overflow-y-auto max-h-[300px] space-y-2 pr-1">
          <div className="grid grid-cols-2 gap-2">
            {filteredStudents.map((s) => {
              const tInfo = currentTuitionList.find(t => t.studentId === s.id);
              const isPaid = tInfo?.status === 'paid';

              return (
                <button
                  key={s.id}
                  onClick={() => onSelectStudent(s.id)}
                  className="p-3 rounded-2xl border border-slate-100 hover:border-purple-300 bg-slate-50/50 text-left transition-all hover:shadow-xs space-y-1"
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
                    <div className="text-[10px] text-slate-500 font-normal">
                      {s.grade}
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-100 flex justify-between items-center text-[9px] text-purple-600 font-bold">
                    <span>작품 3개</span>
                    <span>조회 →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
