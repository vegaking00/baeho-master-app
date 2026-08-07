import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, Sparkles } from 'lucide-react';
import { adminLogin } from '../../firebase';

export default function AdminLoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('director@leadersart.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const res = await adminLogin(email, password);
    setIsLoading(false);

    if (res.success) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-rose-100 p-5 space-y-4 animate-pop-in">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">원장님(관리자) 로그인</h3>
              <p className="text-[10px] text-slate-400">리더스아트 관리자 전용 인증</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Hint Box */}
        <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-2xl text-[11px] text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 테스트용 계정 안내
          </div>
          <p className="text-[10px] text-amber-800 leading-snug">
            • 이메일: <strong className="font-mono">director@leadersart.com</strong><br />
            • 비밀번호: <strong className="font-mono">123456</strong>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> 이메일
            </label>
            <input
              type="email"
              placeholder="director@leadersart.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-slate-400" /> 비밀번호
            </label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-[11px] font-bold text-rose-500 bg-rose-50 p-2 rounded-xl border border-rose-100">
              ⚠️ {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 mt-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isLoading ? '로그인 중...' : '관리자 권한 로그인'}</span>
          </button>
        </form>

        <p className="text-[10px] text-slate-400 text-center">
          * 비로그인 상태에서는 작품, 공지, 출석, 일정이 조회(보기) 모드로 제한됩니다.
        </p>
      </div>
    </div>
  );
}
