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
  const [showInfoModal, setShowInfoModal] = useState(false);
  const currentStudent = STUDENTS.find(s => s.id === selectedStudent) || STUDENTS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-rose-100 px-3 py-2 shadow-xs">
      
      {/* ------------------------------------------------------------------ */}
      {/* TOP STATUS BAR: ADMIN MODE vs PARENT MODE SECURITY STATUS */}
      {/* ------------------------------------------------------------------ */}
      {userRole === 'admin' || isAdmin ? (
        /* Director Admin Mode Banner */
        <div className="bg-gradient-to-r from-purple-700 via-rose-600 to-amber-500 text-white text-[10px] font-bold px-2.5 py-1.5 -mx-3 -mt-2 mb-2 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> 🎨 원장님 관리자 통합 접속 중 (총 50명)
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenDashboardModal}
              className="bg-white text-purple-800 hover:bg-rose-50 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-0.5 shadow-2xs"
            >
              <Users className="w-3 h-3" /> 50명 요약 대시보드
            </button>
          </div>
        </div>
      ) : (
        /* Parent Privacy Security Bar */
        <div className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1.5 -mx-3 -mt-2 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-rose-300 truncate mr-1">
            <UserCheck className="w-3.5 h-3.5 shrink-0" /> 내 자녀 [{currentStudent.name}] 개인 정보 보호 모드
          </span>
          
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenParentModal}
              className="bg-rose-500 hover:bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold"
            >
              자녀 변경
            </button>
          </div>
        </div>
      )}

      {/* Main Header Row */}
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

        {/* Right Section: Header Badges & Actions */}
        <div className="flex items-center gap-1.5">
          {userRole === 'admin' || isAdmin ? (
            /* ADMIN MODE: Show Executive Admin Badge & Single Clean Logout (NO individual student dropdown!) */
            <div className="flex items-center gap-1.5">
              <span className="bg-purple-100 text-purple-900 text-[11px] font-black px-2.5 py-1 rounded-full border border-purple-200 flex items-center gap-1 shadow-2xs">
                👑 신연정 원장님
              </span>
              
              <button
                onClick={onLogout}
                className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs active:scale-95 transition-transform"
                title="메인 게이트로 로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            /* PARENT MODE: Show Child Badge + Logout */
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenParentModal}
                className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full px-2.5 py-1 text-xs font-bold text-rose-800 shadow-2xs"
              >
                <span>{currentStudent.avatarEmoji}</span>
                <span className="text-[11px]">{currentStudent.name} (내 아이)</span>
              </button>

              <button
                onClick={onLogout}
                className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs active:scale-95"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          )}
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
