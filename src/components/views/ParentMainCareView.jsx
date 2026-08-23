import React, { useState } from 'react';
import { Sparkles, Heart, MessageCircle, Clock, CheckCircle, CreditCard, FileText, Bell, Calendar, ChevronRight, UserCheck } from 'lucide-react';
import { TUITION_DATA, ATTENDANCE_DATA, NOTICES, SCHEDULE_DATA } from '../../data/mockData';

export default function ParentMainCareView({ 
  student, 
  artworksList, 
  onSelectArtwork,
  onNavigateTab 
}) {
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Student specific data
  const studentArtworks = (artworksList || []).filter(a => a.studentId === student.id);
  
  const studentTuition = TUITION_DATA.find(t => t.studentId === student.id) || {
    id: `tui-${student.id}`,
    studentId: student.id,
    studentName: student.name,
    grade: student.grade,
    month: "2026년 08월",
    courseName: student.class || "미술 정규 실기반",
    amount: 180000,
    status: "pending",
    statusText: "납부 예정",
    dueDate: "2026.08.05",
    paidDate: "-",
    paymentMethod: "원내 결제 / 계좌 이체 예정",
    receiptNo: `RECEIPT-${student.id}-08`,
    note: "8월 정기 수강료 안내입니다."
  };

  const studentAttendance = ATTENDANCE_DATA[student.id]?.summary || {
    attendanceRate: 95,
    presentDays: 9,
    totalDays: 10
  };

  const isPaid = studentTuition.status === 'paid';
  const recentNotices = (NOTICES || []).slice(0, 2);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      
      {/* Top Child Profile Header Card */}
      <div className="bg-gradient-to-r from-rose-100 via-amber-100 to-sky-100 p-4 sm:p-5 rounded-3xl border border-rose-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-white text-3xl flex items-center justify-center shadow-sm border border-rose-200 shrink-0">
              {student.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                  {student.name} 학생 케어 공간 👧
                </h2>
                <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                  {student.grade}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {student.class} • 지도: {student.teacher}
              </p>
            </div>
          </div>

          <span className="bg-slate-800 text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs shrink-0">
            <UserCheck className="w-3 h-3 text-rose-300" /> 내 아이 암호화 전용
          </span>
        </div>

        {/* 3 Quick Child Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-rose-200/60">
          <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-rose-100">
            <div className="text-[10px] text-slate-500 font-bold">🎨 미술 작품</div>
            <div className="text-sm font-black text-rose-600">{studentArtworks.length}개 보유</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-emerald-100">
            <div className="text-[10px] text-slate-500 font-bold">📅 8월 출석률</div>
            <div className="text-sm font-black text-emerald-600">{studentAttendance.attendanceRate}%</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-amber-100">
            <div className="text-[10px] text-slate-500 font-bold">💳 8월 수납</div>
            <div className={`text-xs font-black ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
              {studentTuition.statusText}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: 🎨 MY CHILD 3 ARTWORKS (2026 NEW + 2025 HISTORY) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            🎨 우리 {student.name}의 미술 작품 & 성장 기록
          </h3>
          <button
            onClick={() => onNavigateTab('gallery')}
            className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-0.5"
          >
            전체 작품집 →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {studentArtworks.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArtwork(art)}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square bg-slate-200">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                  {art.year === '2025' ? '2025 과거' : '8월 신작'}
                </span>
              </div>
              <div className="p-2 text-[10px] font-bold text-slate-800 truncate">
                {art.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: 📅 MY CHILD ATTENDANCE & LESSON MEMO */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            📅 우리 {student.name}의 8월 출석 현황
          </h3>
          <button
            onClick={() => onNavigateTab('attendance')}
            className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-0.5"
          >
            출석 달력 보기 →
          </button>
        </div>

        <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 text-xs space-y-1">
          <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
            <span>최근 등원일: 2026.08.07 (금)</span>
            <span className="text-emerald-700 font-bold">정시 등원 (15:30)</span>
          </div>
          <p className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-emerald-100/70 mt-1">
            💬 <strong>선생님 피드백:</strong> {student.name}이가 형태와 입체감을 완성도 높게 표현하고 있습니다.
          </p>
        </div>
      </div>

      {/* SECTION 3: 💳 MY CHILD TUITION INVOICE */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            💳 8월 수강료 원비 청구서
          </h3>
          <button
            onClick={() => setShowReceiptModal(true)}
            className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-0.5"
          >
            영수증 확인 →
          </button>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-800">{studentTuition.courseName}</div>
            <div className="text-[10px] text-slate-400">납부 기한: {studentTuition.dueDate} 까지</div>
          </div>

          <div className="text-right">
            <div className="font-black text-slate-800 text-base">
              {studentTuition.amount ? studentTuition.amount.toLocaleString() : '180,000'}원
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
            }`}>
              {studentTuition.statusText}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 4: 📢 ACADEMY NOTICES & SCHEDULE */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            📢 학원 주요 공지사항
          </h3>
          <button
            onClick={() => onNavigateTab('notice')}
            className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-0.5"
          >
            공지 전체보기 →
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {recentNotices.map((n) => (
            <div
              key={n.id}
              onClick={() => onNavigateTab('notice')}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-colors cursor-pointer space-y-0.5"
            >
              <div className="flex items-center gap-2">
                <span className="bg-sky-100 text-sky-700 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  {n.tag}
                </span>
                <span className="text-[10px] text-slate-400">{n.date}</span>
              </div>
              <div className="font-bold text-slate-800 text-xs line-clamp-1">{n.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-rose-100 space-y-4 animate-pop-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                📄 리더스아트 수강료 수납 영수증
              </h3>
              <button onClick={() => setShowReceiptModal(false)} className="text-slate-400 font-bold text-xs">✕</button>
            </div>

            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60 space-y-2 text-xs text-slate-700">
              <div className="text-center pb-2 border-b border-amber-200/40">
                <h4 className="font-extrabold text-slate-800 text-sm">리더스아트 미술학원</h4>
                <p className="text-[10px] text-slate-500">영수증 번호: {studentTuition.receiptNo}</p>
              </div>

              <div className="flex justify-between pt-1">
                <span>학생명</span>
                <strong className="text-slate-900">{studentTuition.studentName} ({studentTuition.grade})</strong>
              </div>
              <div className="flex justify-between">
                <span>수강 과목</span>
                <strong>{studentTuition.courseName}</strong>
              </div>
              <div className="flex justify-between">
                <span>청구 월</span>
                <strong>{studentTuition.month}</strong>
              </div>
              <div className="flex justify-between">
                <span>수납 금액</span>
                <strong className="text-rose-600 text-sm">{studentTuition.amount.toLocaleString()}원</strong>
              </div>
              <div className="flex justify-between">
                <span>수납 상태</span>
                <strong className={isPaid ? "text-emerald-600" : "text-amber-600"}>{studentTuition.statusText}</strong>
              </div>
            </div>

            <button
              onClick={() => setShowReceiptModal(false)}
              className="w-full py-2.5 bg-rose-500 text-white font-bold rounded-2xl text-xs"
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
