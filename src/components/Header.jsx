import React, { useState } from 'react';
import { Palette, Bell, ChevronDown, Sparkles, MapPin, Phone, Info } from 'lucide-react';
import { ACADEMY_INFO, STUDENTS } from '../data/mockData';

export default function Header({ selectedStudent, onSelectStudent, unreadNoticeCount }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const currentStudent = STUDENTS.find(s => s.id === selectedStudent) || STUDENTS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-rose-100/60 px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between">
        {/* Academy Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 via-amber-300 to-sky-300 p-0.5 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Palette className="w-5 h-5 text-rose-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
                {ACADEMY_INFO.name}
              </h1>
              <button 
                onClick={() => setShowInfoModal(true)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                title="학원 정보 보기"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] font-medium text-rose-500/80 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {ACADEMY_INFO.subText}
            </p>
          </div>
        </div>

        {/* Child Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/80 rounded-full px-3 py-1.5 transition-all text-xs font-semibold text-slate-700 active:scale-95 shadow-2xs"
          >
            <span className="w-5 h-5 rounded-full bg-rose-400 text-white text-xs flex items-center justify-center">
              {currentStudent.avatarEmoji}
            </span>
            <span>{currentStudent.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-rose-100 z-50 p-2 animate-pop-in">
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  자녀 선택 (학부모 계정)
                </div>
                {STUDENTS.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => {
                      onSelectStudent(student.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left mt-1 ${
                      selectedStudent === student.id
                        ? 'bg-gradient-to-r from-rose-50 to-amber-50 text-rose-700 font-bold border border-rose-200/60'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-rose-100 text-base flex items-center justify-center">
                        {student.avatarEmoji}
                      </span>
                      <div>
                        <div className="text-xs">{student.name} 학생</div>
                        <div className="text-[10px] text-slate-400 font-normal">{student.grade} • {student.class}</div>
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
              className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs transition-colors shadow-sm"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
