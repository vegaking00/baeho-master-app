import React, { useState } from 'react';
import { ShieldCheck, Users, CreditCard, Send, Plus, Sparkles, CheckCircle, Clock, ChevronRight, Search, FileText, Bell, ChevronDown } from 'lucide-react';
import { STUDENTS, TUITION_DATA, ATTENDANCE_DATA } from '../../data/mockData';

export default function AdminMainDashboardView({ 
  onSelectStudent, 
  onOpenAddArtwork, 
  onOpenAddNotice, 
  onOpenAddSchedule,
  onOpenDashboardModal,
  onOpenExcelImport,
  onNavigateTab,
  tuitionList 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradeTab, setSelectedGradeTab] = useState('전체'); // '전체' | '유치부' | '초등저학년' | '초등고학년'

  const currentTuitionList = tuitionList || TUITION_DATA;
  const totalStudents = STUDENTS.length; // 50
  const paidCount = currentTuitionList.filter(t => t.status === 'paid').length;
  const pendingCount = totalStudents - paidCount;
  const paidRate = Math.round((paidCount / totalStudents) * 100);

  // Group Students by Grade
  const kinderStudents = STUDENTS.filter(s => s.age <= 7);
  const lowerElemStudents = STUDENTS.filter(s => s.age >= 8 && s.age <= 10);
  const upperElemStudents = STUDENTS.filter(s => s.age >= 11);

  const kinderCount = kinderStudents.length;
  const lowerElemCount = lowerElemStudents.length;
  const upperElemCount = upperElemStudents.length;

  // Filter logic (by Student Name, Parent Account/Name, Grade, ID)
  const filterList = (list) => {
    if (!searchTerm.trim()) return list;
    const term = searchTerm.trim().toLowerCase();
    return list.filter(s => 
      s.name.toLowerCase().includes(term) || 
      s.grade.toLowerCase().includes(term) || 
      s.id.toLowerCase().includes(term) ||
      (s.parentAccount?.username && s.parentAccount.username.toLowerCase().includes(term)) ||
      (s.parentAccount?.email && s.parentAccount.email.toLowerCase().includes(term)) ||
      (term.includes('학부모') && s.name.includes(term.replace('학부모', '').trim()))
    );
  };

  const filteredKinder = filterList(kinderStudents);
  const filteredLower = filterList(lowerElemStudents);
  const filteredUpper = filterList(upperElemStudents);

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

      {/* Quick Admin Action Buttons */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={onOpenAddArtwork}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold p-2.5 rounded-2xl text-[11px] flex flex-col items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ 작품 등록</span>
        </button>

        <button
          onClick={onOpenAddNotice}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold p-2.5 rounded-2xl text-[11px] flex flex-col items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
        >
          <Bell className="w-4 h-4" />
          <span>+ 학원 공지</span>
        </button>

        <button
          onClick={onOpenAddSchedule}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold p-2.5 rounded-2xl text-[11px] flex flex-col items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ 학원 일정</span>
        </button>

        <button
          onClick={onOpenExcelImport}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2.5 rounded-2xl text-[11px] flex flex-col items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
        >
          <Users className="w-4 h-4" />
          <span>📊 엑셀 일괄등록</span>
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

      {/* ------------------------------------------------------------------ */}
      {/* 50명 재원생 학년별 구분 조회 & 검색 섹션 (요청사항 전면 반영) */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3.5">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-600" /> 50명 재원생 학년별 구분 조회
          </h3>
          <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
            터치 시 종합 기록부 팝업
          </span>
        </div>

        {/* Search Input Bar (Supports Student Name, Parent Account, Grade, ID) */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="학생 이름, 학부모 계정/이름, 학년 또는 ID 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Grade Category Pills Switcher */}
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-2xl text-[11px] font-bold text-center">
          <button
            onClick={() => setSelectedGradeTab('전체')}
            className={`py-1.5 rounded-xl transition-all ${
              selectedGradeTab === '전체' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600'
            }`}
          >
            전체 ({totalStudents})
          </button>
          <button
            onClick={() => setSelectedGradeTab('유치부')}
            className={`py-1.5 rounded-xl transition-all ${
              selectedGradeTab === '유치부' ? 'bg-amber-500 text-white shadow-2xs' : 'text-slate-600'
            }`}
          >
            유치부 ({kinderCount})
          </button>
          <button
            onClick={() => setSelectedGradeTab('초등저학년')}
            className={`py-1.5 rounded-xl transition-all ${
              selectedGradeTab === '초등저학년' ? 'bg-sky-500 text-white shadow-2xs' : 'text-slate-600'
            }`}
          >
            초등저 ({lowerElemCount})
          </button>
          <button
            onClick={() => setSelectedGradeTab('초등고학년')}
            className={`py-1.5 rounded-xl transition-all ${
              selectedGradeTab === '초등고학년' ? 'bg-purple-500 text-white shadow-2xs' : 'text-slate-600'
            }`}
          >
            초등고 ({upperElemCount})
          </button>
        </div>

        {/* Grouped Student List Sections */}
        <div className="overflow-y-auto max-h-[420px] space-y-4 pr-1">
          
          {/* GROUP 1: 유치부 (7세 - 10명) */}
          {(selectedGradeTab === '전체' || selectedGradeTab === '유치부') && filteredKinder.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 sticky top-0 z-10 shadow-2xs">
                <span>👧 7세 유치부 (창의 표현 & 클레이반)</span>
                <span className="bg-amber-200/70 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-amber-900">
                  {filteredKinder.length}명
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredKinder.map((s) => {
                  const tInfo = currentTuitionList.find(t => t.studentId === s.id);
                  const isPaid = tInfo?.status === 'paid';

                  return (
                    <button
                      key={s.id}
                      onClick={() => onSelectStudent(s.id)}
                      className="p-2.5 rounded-2xl border border-slate-100 hover:border-amber-400 bg-white text-left transition-all hover:shadow-xs space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{s.avatarEmoji}</span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isPaid ? '수납 완료' : '납부 예정'}
                        </span>
                      </div>

                      <div>
                        <div className="font-extrabold text-slate-800 text-xs flex items-center gap-1 group-hover:text-amber-700">
                          <span>{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({s.id})</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {s.grade}
                        </div>
                      </div>

                      <div className="pt-1 border-t border-slate-50 flex justify-between items-center text-[9px] text-amber-600 font-bold">
                        <span>작품 3개</span>
                        <span>조회 →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* GROUP 2: 초등 저학년 (1~3학년 - 22명) */}
          {(selectedGradeTab === '전체' || selectedGradeTab === '초등저학년') && filteredLower.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-sky-50 border border-sky-200/80 px-3 py-1.5 rounded-xl text-xs font-bold text-sky-900 sticky top-0 z-10 shadow-2xs">
                <span>👦 초등 저학년 (1~3학년 / 융합 조형 & 수채화반)</span>
                <span className="bg-sky-200/70 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-sky-900">
                  {filteredLower.length}명
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredLower.map((s) => {
                  const tInfo = currentTuitionList.find(t => t.studentId === s.id);
                  const isPaid = tInfo?.status === 'paid';

                  return (
                    <button
                      key={s.id}
                      onClick={() => onSelectStudent(s.id)}
                      className="p-2.5 rounded-2xl border border-slate-100 hover:border-sky-400 bg-white text-left transition-all hover:shadow-xs space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{s.avatarEmoji}</span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isPaid ? '수납 완료' : '납부 예정'}
                        </span>
                      </div>

                      <div>
                        <div className="font-extrabold text-slate-800 text-xs flex items-center gap-1 group-hover:text-sky-700">
                          <span>{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({s.id})</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {s.grade}
                        </div>
                      </div>

                      <div className="pt-1 border-t border-slate-50 flex justify-between items-center text-[9px] text-sky-600 font-bold">
                        <span>작품 3개</span>
                        <span>조회 →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* GROUP 3: 초등 고학년 (4~6학년 - 18명) */}
          {(selectedGradeTab === '전체' || selectedGradeTab === '초등고학년') && filteredUpper.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-purple-50 border border-purple-200/80 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-900 sticky top-0 z-10 shadow-2xs">
                <span>🧑 초등 고학년 (4~6학년 / 웹툰 일러스트 & 입체 조소반)</span>
                <span className="bg-purple-200/70 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-purple-900">
                  {filteredUpper.length}명
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredUpper.map((s) => {
                  const tInfo = currentTuitionList.find(t => t.studentId === s.id);
                  const isPaid = tInfo?.status === 'paid';

                  return (
                    <button
                      key={s.id}
                      onClick={() => onSelectStudent(s.id)}
                      className="p-2.5 rounded-2xl border border-slate-100 hover:border-purple-400 bg-white text-left transition-all hover:shadow-xs space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{s.avatarEmoji}</span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isPaid ? '수납 완료' : '납부 예정'}
                        </span>
                      </div>

                      <div>
                        <div className="font-extrabold text-slate-800 text-xs flex items-center gap-1 group-hover:text-purple-700">
                          <span>{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({s.id})</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {s.grade}
                        </div>
                      </div>

                      <div className="pt-1 border-t border-slate-50 flex justify-between items-center text-[9px] text-purple-600 font-bold">
                        <span>작품 3개</span>
                        <span>조회 →</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredKinder.length === 0 && filteredLower.length === 0 && filteredUpper.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              검색된 조건의 재원생이 없습니다.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
