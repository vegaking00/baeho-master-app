import React, { useState } from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle, Send, FileText, Sparkles, Edit3 } from 'lucide-react';

export default function TuitionTab({ student, tuitionList, isAdmin, onUpdateTuition }) {
  const [selectedMonth, setSelectedMonth] = useState('2026년 08월');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [editingTuition, setEditingTuition] = useState(null);

  // Current student tuition item
  const studentTuition = tuitionList.find(t => t.studentId === student.id) || {
    id: `tui-${student.id}`,
    studentId: student.id,
    studentName: student.name,
    grade: student.grade,
    month: "2026년 08월",
    courseName: student.class || "미술 정규 실기반",
    amount: 180000,
    status: "pending",
    statusText: "납부 예정",
    dueDate: "2026.08.10",
    paidDate: "-",
    paymentMethod: "원내 결제 / 모바일 결제 예정",
    receiptNo: `RECEIPT-${student.id}-08`,
    note: "이달의 정기 수강료 안내입니다."
  };

  const isPaid = studentTuition.status === 'paid';

  const handleMarkAsPaid = () => {
    if (onUpdateTuition) {
      const nowStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
      onUpdateTuition(studentTuition.id, {
        status: 'paid',
        statusText: '수납 완료',
        paidDate: nowStr,
        paymentMethod: '원장님 수납 완료 처리 (현장/계좌)'
      });
    }
  };

  const handleSendReminder = () => {
    alert(`[알림 전송] ${student.name} 학부모님께 8월 원비 수납 안내 문자가 발송되었습니다! 📱`);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Tuition Header Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-sky-100 p-4 rounded-3xl border border-amber-200/70 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{student.avatarEmoji}</span>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                {student.name} 학생 수강료 및 원비 현황 💳
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {student.grade} • <span className="font-bold text-rose-600">{student.class}</span>
              </p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${
            isPaid ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
          }`}>
            {studentTuition.statusText}
          </span>
        </div>
      </div>

      {/* Main Billing Receipt Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        {/* Card Title & Receipt Action */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
              {studentTuition.month} 청구서
            </span>
            <h3 className="text-sm font-bold text-slate-800 mt-1">
              {studentTuition.courseName}
            </h3>
          </div>

          <button
            onClick={() => setShowReceiptModal(true)}
            className="text-xs text-slate-600 hover:text-rose-600 font-bold bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" /> 영수증 보기
          </button>
        </div>

        {/* Amount Section */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">당월 수강료 합계</span>
          <div className="text-right">
            <span className="text-xl font-black text-slate-800 tracking-tight">
              {studentTuition.amount.toLocaleString()}원
            </span>
            <p className="text-[10px] text-slate-400">납부 기한: {studentTuition.dueDate} 까지</p>
          </div>
        </div>

        {/* Payment Detail Details List */}
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">수납 상태</span>
            <span className={`font-bold flex items-center gap-1 ${isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isPaid ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
              {studentTuition.statusText}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">수납/결제 완료 일시</span>
            <span className="font-semibold text-slate-700">{studentTuition.paidDate}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400">결제 수단</span>
            <span className="font-semibold text-slate-700">{studentTuition.paymentMethod}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400">특이사항 / 내역</span>
            <span className="font-medium text-slate-600">{studentTuition.note}</span>
          </div>
        </div>

        {/* Admin Action Buttons (If Logged in as Director) */}
        {isAdmin && (
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 원장님 수납 관리 권한
            </div>

            <div className="grid grid-cols-2 gap-2">
              {!isPaid ? (
                <button
                  onClick={handleMarkAsPaid}
                  className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" /> 수납 완료 처리
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (onUpdateTuition) {
                      onUpdateTuition(studentTuition.id, {
                        status: 'pending',
                        statusText: '납부 예정',
                        paidDate: '-'
                      });
                    }
                  }}
                  className="py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-2xl flex items-center justify-center gap-1 transition-all"
                >
                  수납 취소 (미납 변경)
                </button>
              )}

              <button
                onClick={handleSendReminder}
                className="py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" /> 수납 알림 문자 발송
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tuition Payment History Timeline */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-rose-500" /> 이전 수강료 납부 기록
        </h3>

        <div className="space-y-2">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-800">2026년 07월 수강료</div>
              <div className="text-[10px] text-slate-400">2026.07.03 결제 완료 (신용카드)</div>
            </div>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-[10px]">
              수납 완료 (180,000원)
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-800">2026년 06월 수강료</div>
              <div className="text-[10px] text-slate-400">2026.06.04 결제 완료 (계좌이체)</div>
            </div>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-[10px]">
              수납 완료 (180,000원)
            </span>
          </div>
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
                <p className="text-[10px] text-slate-500">사업자 등록번호: 123-45-67890 | 원장 신연정</p>
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
              <div className="flex justify-between">
                <span>결제 일시</span>
                <span>{studentTuition.paidDate}</span>
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
