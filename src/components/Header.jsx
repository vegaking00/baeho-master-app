import React, { useState } from 'react';
import { Palette, ChevronDown, Sparkles, MapPin, Phone, Info, ShieldCheck, Lock, LogOut } from 'lucide-react';
import { ACADEMY_INFO, STUDENTS } from '../data/mockData';

export default function Header({ 
  selectedStudent, 
  onSelectStudent, 
  isAdmin, 
  onOpenLoginModal, 
  onLogout 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const currentStudent = STUDENTS.find(s => s.id === selectedStudent) || STUDENTS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-rose-100/60 px-4 py-2.5 shadow-xs">
      {/* Top Admin Status Bar (If Logged In) */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 text-white text-[10px] font-bold px-3 py-1 -mx-4 -mt-2.5 mb-2 flex items-center justify-between shadow-inner-soft">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 🎨 관리자 접속 중 (신연정 원장님 / 주미 선생님)
          </span>
          <button
            onClick={onLogout}
            className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3 h-3" /> 로그아웃
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Academy Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-400 via-amber-300 to-sky-300 p-0.5 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-base">
              🎨
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">
                {ACADEMY_INFO.name}
              </h1>
              <button 
                onClick={() => setShowInfoModal(true)}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                title="학원 정보 보기"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] font-medium text-rose-500 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> {ACADEMY_INFO.subText}
            </p>
          </div>
        </div>

        {/* Right Section: Child Selector & Admin Login Toggle */}
        <div className="flex items-center gap-1.5">
          {/* Child Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/80 rounded-full px-2.5 py-1 transition-all text-xs font-semibold text-slate-700 active:scale-95 shadow-2xs"
            >
              <span className="w-4 h-4 rounded-full bg-rose-400 text-white text-[10px] flex items-center justify-center">
                {currentStudent.avatarEmoji}
              </span>
              <span>{currentStudent.name}</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-rose-100 z-50 p-2 animate-pop-in">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    자녀 선택
                  </div>
                  {STUDENTS.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => {
                        onSelectStudent(student.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-left mt-1 ${
                        selectedStudent === student.id
                          ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200/60'
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-xs flex items-center justify-center">
                          {student.avatarEmoji}
                        </span>
                        <div>
                          <div className="text-xs">{student.name} 학생</div>
                          <div className="text-[10px] text-slate-400 font-normal">{student.grade}</div>
                        </div>
                      </div>
                      {selectedStudent === student.id && (
                        <span className="text-xs text-rose-500 font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Admin Login Button (If Not Logged In) */}
          {!isAdmin && (
            <button
              onClick={onOpenLoginModal}
              className="bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 p-1.5 rounded-full transition-colors border border-slate-200/60"
              title="원장님(관리자) 로그인"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
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
