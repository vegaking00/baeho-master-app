import React, { useState } from 'react';
import { Palette, ChevronDown, Sparkles, MapPin, Phone, Info, ShieldCheck, Lock, LogOut, UserCheck, LayoutGrid, Users } from 'lucide-react';
import { ACADEMY_INFO, STUDENTS } from '../data/mockData';

export default function Header({ 
  selectedStudent, 
  onSelectStudent, 
  isAdmin, 
  userRole,
  onOpenLoginModal, 
  onOpenParentModal,
  onOpenDashboardModal,
  onLogout 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const currentStudent = STUDENTS.find(s => s.id === selectedStudent) || STUDENTS[0];

  // Group students for smooth dropdown navigation
  const kinderStudents = STUDENTS.filter(s => s.age <= 7);
  const lowerElemStudents = STUDENTS.filter(s => s.age >= 8 && s.age <= 10);
  const upperElemStudents = STUDENTS.filter(s => s.age >= 11);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-rose-100 px-3 py-2 shadow-xs">
      
      {/* ------------------------------------------------------------------ */}
      {/* RESPONSIVE TOP BAR: ADMIN vs PARENT MODE STATUS & PROMINENT LOGOUT */}
      {/* ------------------------------------------------------------------ */}
      {userRole === 'admin' || isAdmin ? (
        <div className="bg-gradient-to-r from-purple-700 via-rose-600 to-amber-500 text-white text-[10px] font-bold px-2.5 py-1.5 -mx-3 -mt-2 mb-2 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> 원장님 접속 중
            </span>
            <button
              onClick={onOpenDashboardModal}
              className="bg-white text-purple-800 hover:bg-rose-50 px-2 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-0.5 shadow-2xs"
            >
              <Users className="w-3 h-3" /> 50명 대시보드
            </button>
          </div>

          {/* Big Prominent Always-Visible Logout Button */}
          <button
            onClick={onLogout}
            className="bg-slate-900 hover:bg-black text-amber-300 font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-amber-300/40 shrink-0 ml-1 active:scale-95 transition-transform"
          >
            <LogOut className="w-3.5 h-3.5" /> 로그아웃
          </button>
        </div>
      ) : userRole === 'parent' ? (
        /* Parent Privacy Security Bar & Prominent Logout */
        <div className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1.5 -mx-3 -mt-2 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-rose-300 truncate mr-1">
            <UserCheck className="w-3.5 h-3.5 shrink-0" /> 내 자녀 [{currentStudent.name}] 보호 중
          </span>
          
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenParentModal}
              className="bg-rose-500 hover:bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded-full"
            >
              자녀 변경
            </button>
            <button
              onClick={onLogout}
              className="bg-slate-900 hover:bg-black text-rose-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-rose-300/40 active:scale-95"
            >
              <LogOut className="w-3 h-3" /> 로그아웃
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        {/* Academy Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-400 via-amber-300 to-sky-300 p-0.5 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-sm">
              🎨
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-tight">
                {ACADEMY_INFO.name}
              </h1>
              <button 
                onClick={() => setShowInfoModal(true)}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                title="학원 정보 보기"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[9px] font-medium text-rose-500 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> {ACADEMY_INFO.subText}
            </p>
          </div>
        </div>

        {/* Right Section: Student Selector & Extra Logout */}
        <div className="flex items-center gap-1">
          {userRole === 'admin' || isAdmin ? (
            /* Admin Dropdown */
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-full px-2 py-1 text-xs font-semibold text-slate-700 active:scale-95 shadow-2xs"
              >
                <span className="w-4 h-4 rounded-full bg-rose-400 text-white text-[10px] flex items-center justify-center">
                  {currentStudent.avatarEmoji}
                </span>
                <span className="text-[11px]">{currentStudent.name}</span>
                <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-rose-100 z-50 p-2 animate-pop-in max-h-[60vh] overflow-y-auto">
                    <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 rounded-xl mb-1 sticky top-0 border border-rose-100 z-10">
                      <span>원장님 학생 선택 (총 50명)</span>
                      <button onClick={onOpenDashboardModal} className="underline hover:text-rose-800">
                        대시보드 보기 →
                      </button>
                    </div>

                    {/* Group 1: 유치부 (7세) */}
                    <div className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mt-1 mb-0.5">
                      👧 유치부 (7세 - {kinderStudents.length}명)
                    </div>
                    {kinderStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => {
                          onSelectStudent(student.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-1.5 rounded-xl transition-all text-left text-xs ${
                          selectedStudent === student.id
                            ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{student.avatarEmoji}</span>
                          <span>{student.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({student.id})</span>
                        </span>
                        {selectedStudent === student.id && <span className="text-rose-500 font-bold">✓</span>}
                      </button>
                    ))}

                    {/* Group 2: 초등 저학년 (1~3학년) */}
                    <div className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md mt-2 mb-0.5">
                      👦 초등 저학년 (1~3학년 - {lowerElemStudents.length}명)
                    </div>
                    {lowerElemStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => {
                          onSelectStudent(student.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-1.5 rounded-xl transition-all text-left text-xs ${
                          selectedStudent === student.id
                            ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{student.avatarEmoji}</span>
                          <span>{student.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({student.id})</span>
                        </span>
                        {selectedStudent === student.id && <span className="text-rose-500 font-bold">✓</span>}
                      </button>
                    ))}

                    {/* Group 3: 초등 고학년 (4~6학년) */}
                    <div className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md mt-2 mb-0.5">
                      🧑 초등 고학년 (4~6학년 - {upperElemStudents.length}명)
                    </div>
                    {upperElemStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => {
                          onSelectStudent(student.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-1.5 rounded-xl transition-all text-left text-xs ${
                          selectedStudent === student.id
                            ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{student.avatarEmoji}</span>
                          <span>{student.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({student.id})</span>
                        </span>
                        {selectedStudent === student.id && <span className="text-rose-500 font-bold">✓</span>}
                      </button>
                    ))}

                  </div>
                </>
              )}
            </div>
          ) : userRole === 'parent' ? (
            /* Parent Child Button */
            <button
              onClick={onOpenParentModal}
              className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full px-2 py-1 text-xs font-bold text-rose-800 shadow-2xs"
            >
              <span>{currentStudent.avatarEmoji}</span>
              <span className="text-[11px]">{currentStudent.name}</span>
            </button>
          ) : null}

          {/* Quick Header Logout Icon */}
          <button
            onClick={onLogout}
            className="bg-slate-800 hover:bg-black text-white p-1.5 rounded-full transition-colors border border-slate-700 shrink-0"
            title="메인 게이트로 로그아웃"
          >
            <LogOut className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>

      {/* Academy Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-rose-100 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                🎨 {ACADEMY_INFO.name}
              </h3>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{ACADEMY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${ACADEMY_INFO.phone}`} className="text-emerald-600 font-semibold hover:underline">
                  {ACADEMY_INFO.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs transition-colors shadow-sm"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
