import React, { useState } from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle, Send, FileText, Sparkles, Search, Filter } from 'lucide-react';
import { STUDENTS, TUITION_DATA } from '../../data/mockData';

export default function TuitionTab({ student, tuitionList, isAdmin, onUpdateTuition, onSelectStudent }) {
  const [selectedMonth, setSelectedMonth] = useState('2026년 08월');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [adminFilter, setAdminFilter] = useState('전체'); // '전체' | '미납' | '완료'
  const [adminSearch, setAdminSearch] = useState('');

  const currentTuitionList = tuitionList || TUITION_DATA;

  // Single student tuition (for parent view or selected student)
  const studentTuition = currentTuitionList.find(t => t.studentId === student.id) || {
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
    paymentMethod: "원내 결제 / 모바일 결제 예정",
    receiptNo: `RECEIPT-${student.id}-08`,
    note: "이달의 정기 수강료 안내입니다."
  };

  const isPaid = studentTuition.status === 'paid';

  // Overall Director Tuition Stats across 50 students
  const totalCount = STUDENTS.length; // 50
  const paidCount = currentTuitionList.filter(t => t.status === 'paid').length;
  const pendingCount = totalCount - paidCount;
  const paidRate = Math.round((paidCount / totalCount) * 100);

  // Admin filter list
  const filteredTuitionForAdmin = currentTuitionList.filter(t => {
    const matchesSearch = t.studentName.includes(adminSearch) || t.studentId.includes(adminSearch.toLowerCase()) || t.grade.includes(adminSearch);
    if (adminFilter === '미납') return matchesSearch && t.status !== 'paid';
    if (adminFilter === '완료') return matchesSearch && t.status === 'paid';
    return matchesSearch;
  });

  const handleMarkAsPaid = (tuitionId) => {
    if (onUpdateTuition) {
      const nowStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
      onUpdateTuition(tuitionId, {
        status: 'paid',
        statusText: '수납 완료',
        paidDate: nowStr,
        paymentMethod: '원장님 수납 완료 처리 (현장/계좌)'
      });
    }
  };

  const handleMarkAsUnpaid = (tuitionId) => {
    if (onUpdateTuition) {
      onUpdateTuition(tuitionId, {
        status: 'pending',
        statusText: '납부 예정',
        paidDate: '-'
      });
    }
  };

  const handleSendReminder = () => {
    alert(`[알림 전송] 8월 미납 학부모님(${pendingCount}명)께 수납 안내 문자가 일괄 발송되었습니다! 📱`);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* ------------------------------------------------------------------ */}
      {/* ADMIN VIEW: DIRECTOR ALL 50 STUDENTS TUITION MANAGEMENT TABLE */}
      {/* ------------------------------------------------------------------ */}
      {isAdmin ? (
        <div className="space-y-4">
          {/* Admin Header Stats */}
          <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white p-4 rounded-3xl shadow-md space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-extrabold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-300" /> 원장님 전체 50명 원비 수납 관리 💳
                </h2>
                <p className="text-xs text-rose-100 mt-0.5">
                  2026년 8월 수강료 일괄 수납 내역 & 실시간 처리
                </p>
              </div>

              <button
                onClick={handleSendReminder}
                className="bg-white text-rose-600 hover:bg-rose-50 font-bold text-xs px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1 shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> 미납 알림 발송
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-white/20">
              <div className="bg-white/20 backdrop-blur-xs p-2 rounded-2xl">
                <div className="text-[10px] text-rose-100">총 재원생</div>
                <div className="text-base font-black">{totalCount}명</div>
              </div>
              <div className="bg-white/20 backdrop-blur-xs p-2 rounded-2xl">
                <div className="text-[10px] text-emerald-200 font-bold">수납 완료</div>
                <div className="text-base font-black text-emerald-300">{paidCount}명</div>
              </div>
              <div className="bg-white/20 backdrop-blur-xs p-2 rounded-2xl">
                <div className="text-[10px] text-amber-200 font-bold">납부 예정/미납</div>
                <div className="text-base font-black text-amber-300">{pendingCount}명</div>
              </div>
              <div className="bg-white/20 backdrop-blur-xs p-2 rounded-2xl">
                <div className="text-[10px] text-purple-200 font-bold">수납 달성률</div>
                <div className="text-base font-black text-purple-200">{paidRate}%</div>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
                <button
                  onClick={() => setAdminFilter('전체')}
                  className={`px-3 py-1 rounded-xl transition-all ${
                    adminFilter === '전체' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  전체 ({totalCount})
                </button>
                <button
                  onClick={() => setAdminFilter('미납')}
                  className={`px-3 py-1 rounded-xl transition-all ${
                    adminFilter === '미납' ? 'bg-amber-500 text-white shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  납부 예정 ({pendingCount})
                </button>
                <button
                  onClick={() => setAdminFilter('완료')}
                  className={`px-3 py-1 rounded-xl transition-all ${
                    adminFilter === '완료' ? 'bg-emerald-500 text-white shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  수납 완료 ({paidCount})
                </button>
              </div>

              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="학생 이름/ID 검색..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>
          </div>

          {/* All 50 Students Tuition Management Cards List */}
          <div className="space-y-2.5">
            {filteredTuitionForAdmin.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-3xl border border-dashed text-slate-400 text-xs">
                검색된 수납 내역이 없습니다.
              </div>
            ) : (
              filteredTuitionForAdmin.map((item) => {
                const itemIsPaid = item.status === 'paid';
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-2 hover:border-rose-300 transition-colors"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectStudent && onSelectStudent(item.studentId)}
                          className="font-bold text-slate-800 text-xs hover:text-rose-600 flex items-center gap-1"
                        >
                          <span>{item.studentName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({item.studentId})</span>
                        </button>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {item.grade}
                        </span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        itemIsPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {item.statusText}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-700">{item.courseName}</div>
                        <div className="text-[10px] text-slate-400">결제수단: {item.paymentMethod}</div>
                      </div>

                      <div className="text-right">
                        <div className="font-black text-rose-600 text-sm">
                          {item.amount.toLocaleString()}원
                        </div>
                        <div className="text-[10px] text-slate-400">납부일시: {item.paidDate}</div>
                      </div>
                    </div>

                    {/* Admin Direct Action Button */}
                    <div className="pt-2 border-t border-slate-50 flex justify-end gap-2">
                      {!itemIsPaid ? (
                        <button
                          onClick={() => handleMarkAsPaid(item.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-xl shadow-2xs transition-all active:scale-95 flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> 수납 완료 처리
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsUnpaid(item.id)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-[11px] px-2.5 py-1 rounded-xl"
                        >
                          수납 취소
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------------ */
        /* PARENT VIEW: SINGLE CHILD PRIVATE TUITION BILL & RECEIPT */
        /* ------------------------------------------------------------------ */
        <div className="space-y-4">
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
          </div>
        </div>
      )}

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
