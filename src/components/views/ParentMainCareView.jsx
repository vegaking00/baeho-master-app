import React, { useState } from 'react';
import { Sparkles, Heart, MessageCircle, Clock, CheckCircle, CreditCard, FileText, Bell, Calendar, ChevronRight, UserCheck, Users, Smartphone, Zap } from 'lucide-react';
import { TUITION_DATA, ATTENDANCE_DATA, NOTICES, SCHEDULE_DATA, getSiblings } from '../../data/mockData';
import MobilePaymentSimulatorModal from '../modals/MobilePaymentSimulatorModal';

export default function ParentMainCareView({ 
  student, 
  artworksList, 
  onSelectArtwork,
  onNavigateTab,
  onSelectStudent,
  onCompletePayment 
}) {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Get sibling children registered under this family
  const siblings = getSiblings ? getSiblings(student.id) : [student];

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
      
      {/* Multi-Child Family Sibling Switcher Banner (if family has 2+ children enrolled) */}
      {siblings.length > 1 && (
        <div className="bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white p-3 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">👨‍👩‍👧‍👦</span>
            <div>
              <div className="text-xs font-black">
                다자녀 수강가족 계정 (총 {siblings.length}명 수강 중)
              </div>
              <div className="text-[10px] text-rose-100 font-medium">
                버튼 터치 1번에 자녀 화면이 즉시 전환됩니다!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {siblings.map((sib) => {
              const isCurrent = sib.id === student.id;
              return (
                <button
                  key={sib.id}
                  onClick={() => onSelectStudent && onSelectStudent(sib.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 active:scale-95 ${
                    isCurrent
                      ? 'bg-white text-rose-700 shadow-sm ring-2 ring-white/60'
                      : 'bg-black/25 hover:bg-black/40 text-white border border-white/30'
                  }`}
                >
                  <span>{sib.avatarEmoji}</span>
                  <span>{sib.name}</span>
                  {isCurrent && <span className="text-[9px] bg-rose-500 text-white px-1 rounded-full">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {student.class} • 지도: {student.teacher}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Summary Badges */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-rose-200/60">
          <div 
            onClick={() => onNavigateTab('gallery')}
            className="bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-rose-100 cursor-pointer hover:bg-white transition-all"
          >
            <div className="text-[10px] text-slate-500 font-bold">🎨 최근 작품</div>
            <div className="text-sm font-black text-rose-600">{studentArtworks.length}개 보유</div>
            <div className="text-[9px] text-rose-400 font-bold mt-0.5">갤러리 보기 →</div>
          </div>

          <div 
            onClick={() => onNavigateTab('attendance')}
            className="bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-emerald-100 cursor-pointer hover:bg-white transition-all"
          >
            <div className="text-[10px] text-slate-500 font-bold">📅 8월 출석률</div>
            <div className="text-sm font-black text-emerald-600">{studentAttendance.attendanceRate}%</div>
            <div className="text-[9px] text-emerald-500 font-bold mt-0.5">출석부 보기 →</div>
          </div>

          <div 
            onClick={() => isPaid ? setShowReceiptModal(true) : setShowPaymentModal(true)}
            className="bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-amber-100 cursor-pointer hover:bg-white transition-all"
          >
            <div className="text-[10px] text-slate-500 font-bold">💳 8월 수강료</div>
            <div className={`text-xs font-black ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
              {studentTuition.statusText}
            </div>
            <div className="text-[9px] text-amber-600 font-bold mt-0.5">
              {isPaid ? '영수증 확인 →' : '1초 결제하기 →'}
            </div>
          </div>
        </div>
      </div>

      {/* Child Recent Artworks Preview */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-rose-500" /> {student.name} 학생의 최신 미술 작품집
          </h3>
          <button
            onClick={() => onNavigateTab('gallery')}
            className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-0.5"
          >
            전체보기 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {studentArtworks.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            등록된 작품이 준비 중입니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {studentArtworks.slice(0, 2).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArtwork(art)}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-4/3 bg-slate-200 overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {art.category}
                  </div>
                </div>
                <div className="p-2.5 space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs line-clamp-1 group-hover:text-rose-600">
                    {art.title}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="text-rose-500 font-bold">♥ {art.likes || 0}</span>
                    <span>댓글 {(art.comments && art.comments.length) || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TUITION INVOICE & AUTOMATIC MOBILE PAYMENT CARD */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-amber-500" /> 8월 수강료 청구 및 모바일 1초 결제
          </h3>
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
            isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
          }`}>
            {studentTuition.statusText}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">수강 과목:</span>
            <span className="font-bold text-slate-800">{studentTuition.courseName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">청구 청구액:</span>
            <span className="font-extrabold text-rose-600 text-sm">
              {studentTuition.amount ? studentTuition.amount.toLocaleString() + '원' : '180,000원'}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-200/60 pt-2 text-[11px]">
            <span className="text-slate-500">납부 상태:</span>
            <span className={`font-extrabold ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isPaid ? `수납 완료 (${studentTuition.paidDate || '2026.08.28'} 결제됨)` : `${studentTuition.dueDate} 까지 납부`}
            </span>
          </div>
        </div>

        {/* Dynamic Buttons: Paid (Receipt Button) vs Unpaid (KakaoPay / Card Payment Simulator) */}
        {isPaid ? (
          <button
            onClick={() => setShowReceiptModal(true)}
            className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-amber-400" /> 8월 모바일 수강료 영수증 확인 →
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <span>💛 카카오페이 1초 결제</span>
            </button>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="py-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>💳 신용/체크카드 결제</span>
            </button>
          </div>
        )}
      </div>

      {/* Academy Notices */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-sky-500" /> 리더스아트 학원 공지사항
          </h3>
          <button
            onClick={() => onNavigateTab('notices')}
            className="text-xs text-sky-600 font-bold hover:underline"
          >
            공지 전체보기 →
          </button>
        </div>

        <div className="space-y-2">
          {recentNotices.map((n) => (
            <div key={n.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="bg-rose-100 text-rose-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {n.category || '공지'}
                </span>
                <span className="text-[10px] text-slate-400">{n.date}</span>
              </div>
              <h4 className="font-bold text-slate-800">{n.title}</h4>
              <p className="text-[11px] text-slate-600 line-clamp-2">{n.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Mobile Payment Simulator */}
      {showPaymentModal && (
        <MobilePaymentSimulatorModal
          tuition={studentTuition}
          student={student}
          onClose={() => setShowPaymentModal(false)}
          onCompletePayment={(tId, pMethod) => {
            if (onCompletePayment) {
              onCompletePayment(tId, pMethod);
            }
          }}
        />
      )}

      {/* Modal: Receipt Detail */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-rose-100 space-y-4 animate-pop-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                💳 {student.name} 학생 8월 수강료 영수증
              </h3>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">영수증 번호:</span>
                <span className="font-mono text-slate-700">{studentTuition.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">수업 코스:</span>
                <span className="font-bold">{studentTuition.courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">수강료 금액:</span>
                <span className="font-black text-rose-600 text-sm">
                  {studentTuition.amount ? studentTuition.amount.toLocaleString() + '원' : '180,000원'}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500">결제 상태:</span>
                <span className={`font-bold ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {studentTuition.statusText}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">결제 수단:</span>
                <span className="font-medium text-slate-700">{studentTuition.paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReceiptModal(false)}
              className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs shadow-xs"
            >
              확인 완료 및 닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
