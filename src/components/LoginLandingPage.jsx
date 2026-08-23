import React, { useState } from 'react';
import { Palette, ShieldCheck, UserCheck, Key, Mail, Sparkles, MapPin, Phone, Search, Users, ChevronRight, Lock } from 'lucide-react';
import { ACADEMY_INFO, STUDENTS } from '../data/mockData';

export default function LoginLandingPage({ onAdminLogin, onParentLogin }) {
  const [activeTab, setActiveTab] = useState('parent'); // 'parent' | 'admin'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Admin Login Inputs
  const [adminEmail, setAdminEmail] = useState('director@leadersart.com');
  const [adminPassword, setAdminPassword] = useState('123456');
  const [adminError, setAdminError] = useState('');

  // Parent Login Inputs
  const [parentEmail, setParentEmail] = useState('s01@leadersart.com');
  const [parentPassword, setParentPassword] = useState('pass01');
  const [parentError, setParentError] = useState('');

  // Filter 50 students
  const filteredStudents = STUDENTS.filter(s => 
    s.name.includes(searchTerm) || 
    s.grade.includes(searchTerm) || 
    s.id.includes(searchTerm.toLowerCase())
  );

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError('');
    if (adminEmail === 'director@leadersart.com' && adminPassword === '123456') {
      onAdminLogin();
    } else {
      setAdminError('관리자 계정 정보가 일치하지 않습니다. (기본: director@leadersart.com / 123456)');
    }
  };

  const handleParentSubmit = (e) => {
    e.preventDefault();
    setParentError('');
    const cleanId = parentEmail.trim().toLowerCase().replace('@leadersart.com', '');
    const matched = STUDENTS.find(s => s.id === cleanId || s.parentAccount?.email === parentEmail || s.parentAccount?.username === cleanId);
    
    if (matched) {
      onParentLogin(matched.id);
    } else {
      setParentError('학부모 계정을 찾을 수 없습니다. (예: s01@leadersart.com / pass01)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col p-5 sm:p-6 space-y-5 animate-pop-in">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 via-amber-400 to-purple-500 p-1 mx-auto shadow-md">
            <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center text-3xl">
              🎨
            </div>
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {ACADEMY_INFO.name} 미술학원
            </h1>
            <p className="text-xs font-semibold text-rose-500 mt-0.5">
              {ACADEMY_INFO.subText}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> 강남 대치 본원 2층
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-500" /> {ACADEMY_INFO.phone}
            </span>
          </div>
        </div>

        {/* Tab Switcher: 학부모 접속 vs 관리자(원장님) 접속 */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => setActiveTab('parent')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'parent'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>👨‍👩‍👧‍👦 학부모 메인 접속</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>👑 원장님 관리자 접속</span>
          </button>
        </div>

        {/* --- TAB 1: PARENT LOGIN & CHILD PICKER --- */}
        {activeTab === 'parent' && (
          <div className="space-y-4">
            <form onSubmit={handleParentSubmit} className="space-y-3 text-xs">
              <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100 text-slate-700 text-[11px] space-y-1">
                <div className="font-bold text-rose-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 학부모 계정 테스트 안내
                </div>
                <p className="text-[10px] text-slate-600 leading-snug">
                  • 학부모 아이디: <strong className="font-mono text-rose-700">s01@leadersart.com</strong> (s01 ~ s50)<br />
                  • 비밀번호: <strong className="font-mono text-rose-700">pass01</strong> (pass01 ~ pass50)
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> 학부모 아이디 (이메일 또는 ID)
                </label>
                <input
                  type="text"
                  placeholder="s01@leadersart.com 또는 s01"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-slate-400" /> 비밀번호
                </label>
                <input
                  type="password"
                  placeholder="pass01"
                  value={parentPassword}
                  onChange={(e) => setParentPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
                  required
                />
              </div>

              {parentError && (
                <p className="text-[11px] font-bold text-rose-500 bg-rose-50 p-2 rounded-xl border border-rose-100">
                  ⚠️ {parentError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <UserCheck className="w-4 h-4" /> 내 자녀 전용 케어 메인 진입 →
              </button>
            </form>

            {/* Direct 50 Students Click Selector */}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1 text-purple-600">
                  <Users className="w-3.5 h-3.5" /> 50명 재원생 1클릭 선택 진입
                </span>
                <span className="text-[10px] text-slate-400">클릭 즉시 접속</span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="자녀 이름 또는 학년 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-[11px] focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="overflow-y-auto max-h-[160px] space-y-1 pr-1 border border-slate-100 rounded-2xl p-1">
                {filteredStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onParentLogin(s.id)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-left text-xs transition-colors border border-slate-100"
                  >
                    <span className="flex items-center gap-2">
                      <span>{s.avatarEmoji}</span>
                      <span className="font-bold text-slate-800">{s.name} ({s.id})</span>
                      <span className="text-[10px] text-slate-400">{s.grade}</span>
                    </span>
                    <span className="text-[10px] font-bold text-rose-500 flex items-center gap-0.5">
                      접속 <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: DIRECTOR ADMIN LOGIN --- */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
            <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100 text-purple-900 text-[11px] space-y-1">
              <div className="font-bold text-purple-700 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 원장님 관리자 전용 접속
              </div>
              <p className="text-[10px] text-purple-800/80 leading-snug">
                전체 50명 학생 관리, 원비 수납 통합 관리, 작품 및 공지사항 총괄 권한이 부여됩니다.
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> 관리자 이메일
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-purple-400 focus:bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-slate-400" /> 비밀번호
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-purple-400 focus:bg-white"
                required
              />
            </div>

            {adminError && (
              <p className="text-[11px] font-bold text-rose-500 bg-rose-50 p-2 rounded-xl border border-rose-100">
                ⚠️ {adminError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" /> 원장님 학원 총괄 대시보드 진입 →
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
