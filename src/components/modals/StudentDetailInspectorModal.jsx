import React, { useState } from 'react';
import { X, Sparkles, Heart, MessageCircle, Clock, CheckCircle, CreditCard, Calendar, UserCheck, ChevronRight } from 'lucide-react';
import { STUDENTS, TUITION_DATA, ATTENDANCE_DATA } from '../../data/mockData';

export default function StudentDetailInspectorModal({ 
  studentId, 
  artworksList, 
  onClose, 
  onSelectArtwork, 
  onUpdateTuition 
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'art' | 'attendance' | 'tuition'

  const student = STUDENTS.find(s => s.id === studentId) || STUDENTS[0];
  const studentArtworks = (artworksList || []).filter(a => a.studentId === student.id);
  
  const studentTuition = TUITION_DATA.find(t => t.studentId === student.id) || {
    id: `tui-${student.id}`,
    amount: 180000,
    status: 'pending',
    statusText: '납부 예정',
    dueDate: '2026.08.05'
  };

  const studentAttendance = ATTENDANCE_DATA[student.id] || {
    summary: { attendanceRate: 95, presentDays: 9, totalDays: 10 },
    days: {}
  };

  const isPaid = studentTuition.status === 'paid';

  const handleMarkPaid = () => {
    if (onUpdateTuition) {
      const nowStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
      onUpdateTuition(studentTuition.id, {
        status: 'paid',
        statusText: '수납 완료',
        paidDate: nowStr,
        paymentMethod: '원장님 현장 수납 완료 처리'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col p-4 sm:p-5 space-y-3.5 animate-pop-in">
        
        {/* Modal Top Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 via-amber-300 to-purple-400 text-white text-2xl flex items-center justify-center shadow-xs border border-rose-200">
              {student.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-800 text-base">
                  {student.name} 학생 종합 기록부
                </h3>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {student.grade}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {student.class} • 학부모 ID: <span className="font-mono text-rose-600 font-bold">{student.parentAccount?.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Summary Badges */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-rose-50 p-2 rounded-2xl border border-rose-100">
            <div className="text-[10px] text-slate-500 font-bold">🎨 등록 작품</div>
            <div className="text-sm font-black text-rose-600">{studentArtworks.length}개 보유</div>
          </div>
          <div className="bg-emerald-50 p-2 rounded-2xl border border-emerald-100">
            <div className="text-[10px] text-slate-500 font-bold">📅 출석률</div>
            <div className="text-sm font-black text-emerald-600">{studentAttendance.summary?.attendanceRate}%</div>
          </div>
          <div className="bg-amber-50 p-2 rounded-2xl border border-amber-100">
            <div className="text-[10px] text-slate-500 font-bold">💳 8월 수납상태</div>
            <div className={`text-xs font-black ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
              {studentTuition.statusText}
            </div>
          </div>
        </div>

        {/* Scrollable Detailed Sections */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 max-h-[52vh]">
          
          {/* SECTION 1: 🎨 ARTWORK PORTFOLIO (3 ITEMS WITH COMMENTS) */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-rose-600">
                🎨 {student.name}의 미술 작품 & 과거 성장 기록 ({studentArtworks.length}개)
              </span>
            </div>

            <div className="space-y-2">
              {studentArtworks.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    if (onSelectArtwork) onSelectArtwork(art);
                  }}
                  className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-rose-300 transition-all cursor-pointer flex gap-3 items-center"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-14 h-14 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-md">
                        {art.year === '2025' ? '2025 과거기록' : '2026 최신작'}
                      </span>
                      <span className="text-[10px] text-slate-400">{art.category}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-xs truncate">{art.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{art.feedback}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: 📅 ATTENDANCE & LESSON MEMO */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-600">
                📅 8월 출석 현황 및 교사 수업 메모
              </span>
              <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">
                {studentAttendance.summary?.presentDays}일 출석 / {studentAttendance.summary?.totalDays}일 수업
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>최근 수업 등원일: 2026.08.07</span>
                <span className="text-emerald-600 font-bold">정시 등원 (15:30)</span>
              </div>
              <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                💬 <strong>선생님 메모:</strong> {student.name} 학생 실기 집중력이 우수하며 조소 성형 질감을 완성도 높게 마감함.
              </p>
            </div>
          </div>

          {/* SECTION 3: 💳 TUITION PAYMENT STATUS & ACTION */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-amber-600">
                💳 8월 수강료 원비 수납 정보
              </span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
              }`}>
                {studentTuition.statusText}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-800">{student.class}</div>
                <div className="text-[10px] text-slate-400">당월 청구액: {studentTuition.amount ? studentTuition.amount.toLocaleString() : '180,000'}원</div>
              </div>

              {!isPaid ? (
                <button
                  onClick={handleMarkPaid}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xs transition-all active:scale-95 flex items-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> 수납 완료 처리
                </button>
              ) : (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> 결제 완료됨
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs shadow-xs"
        >
          확인 완료
        </button>

      </div>
    </div>
  );
}
