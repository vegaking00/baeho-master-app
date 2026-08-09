import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Heart } from 'lucide-react';
import { STUDENTS } from '../../data/mockData';

export default function ParentLoginModal({ currentStudentId, onClose, onSelectChild }) {
  const [selectedId, setSelectedId] = useState(currentStudentId);

  const handleConfirm = () => {
    onSelectChild(selectedId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-rose-100 p-5 space-y-4 animate-pop-in">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">학부모 자녀 선택 / 인증</h3>
              <p className="text-[10px] text-rose-500 font-medium">🔒 내 자녀 전용 안전 모드 접속</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-snug bg-rose-50/60 p-3 rounded-2xl border border-rose-100">
          학부모 모드에서는 선택하신 <strong>'내 자녀'의 미술 작품, 성장 기록, 출석 및 원비 수납 내역만</strong> 안전하게 조회됩니다. (타인 학생 데이터 접근 차단)
        </p>

        {/* Student Selector List */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">학부모 자녀 목록 선택:</label>
          {STUDENTS.map((student) => {
            const isSelected = selectedId === student.id;
            return (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedId(student.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{student.avatarEmoji}</span>
                  <div>
                    <div className="text-xs font-bold">{student.name} 학생 학부모</div>
                    <div className="text-[10px] text-slate-500 font-normal">{student.grade} • {student.class}</div>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                    선택됨 ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
        >
          <ShieldCheck className="w-4 h-4" /> 내 자녀 전용 모드로 접속하기
        </button>
      </div>
    </div>
  );
}
