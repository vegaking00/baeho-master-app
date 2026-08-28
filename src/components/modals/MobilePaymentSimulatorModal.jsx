import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Sparkles, Lock, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

export default function MobilePaymentSimulatorModal({ tuition, student, onClose, onCompletePayment }) {
  const [selectedMethod, setSelectedMethod] = useState('kakaopay'); // 'kakaopay' | 'tosspay' | 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!tuition || !student) return null;

  const amountStr = tuition.amount ? tuition.amount.toLocaleString() + '원' : '180,000원';

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const methodName = selectedMethod === 'kakaopay' 
        ? '카카오페이 (자동 승인)' 
        : selectedMethod === 'tosspay' 
        ? '토스페이 (자동 승인)' 
        : '신용/체크카드 간편결제 (자동 승인)';

      setTimeout(() => {
        if (onCompletePayment) {
          onCompletePayment(tuition.id, methodName);
        }
        onClose();
      }, 1400);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col p-5 space-y-4 animate-pop-in relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold border border-rose-100">
            <Sparkles className="w-3.5 h-3.5" /> 8월 모바일 수강료 결제 시뮬레이터
          </div>
          <h3 className="font-extrabold text-slate-800 text-base">
            {student.name} 학생 8월 수강료 결제
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            원장님 통장과 1초 자동 연동되는 실시간 결제 테스트
          </p>
        </div>

        {/* SUCCESS STATE ANIMATION */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-3 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm animate-bounce">
              ✓
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">
                수강료 결제가 완납 처리되었습니다!
              </h4>
              <p className="text-xs text-emerald-600 font-bold mt-1">
                원장님 학원 대시보드 수납 상태가 `수납 완료`로 즉시 업데이트되었습니다 🚀
              </p>
            </div>
          </div>
        ) : isProcessing ? (
          /* PROCESSING STATE SPINNER */
          <div className="py-10 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-extrabold text-slate-700">
              PG 결제 승인 요청 중... (1초 자동 연동 중)
            </p>
          </div>
        ) : (
          /* PAYMENT FORM FORM */
          <>
            {/* Billing Summary Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">수강 학생:</span>
                <span className="font-extrabold text-slate-800">{student.name} ({student.grade})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">수강 과목:</span>
                <span className="font-semibold text-slate-700">{tuition.courseName || student.class}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-2 text-sm">
                <span className="font-bold text-slate-700">결제 금액:</span>
                <span className="font-black text-rose-600 text-base">{amountStr}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 flex items-center justify-between">
                <span>결제 수단 선택</span>
                <span className="text-[10px] text-rose-500 font-bold">1초 자동 완납 처리</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('kakaopay')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedMethod === 'kakaopay'
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-xl">💛</span>
                  <span className="text-[11px] font-extrabold text-amber-900">카카오페이</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('tosspay')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedMethod === 'tosspay'
                      ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <span className="text-xl">💙</span>
                  <span className="text-[11px] font-extrabold text-sky-900">토스페이</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedMethod === 'card'
                      ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <span className="text-xl">💳</span>
                  <span className="text-[11px] font-extrabold text-purple-900">신용/체크카드</span>
                </button>
              </div>
            </div>

            {/* Security Guarantee Note */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-50 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>실제 결제 PG사와 100% 동일한 실시간 결제 완료 시뮬레이션입니다.</span>
            </div>

            {/* Pay Submit Button */}
            <button
              onClick={handlePay}
              className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <span>{amountStr} 1초 결제 완료하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

      </div>
    </div>
  );
}
