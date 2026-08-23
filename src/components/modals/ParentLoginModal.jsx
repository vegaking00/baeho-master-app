import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Search, Key, Mail, Sparkles, BookOpen } from 'lucide-react';
import { STUDENTS } from '../../data/mockData';

export default function ParentLoginModal({ currentStudentId, onClose, onSelectChild }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'select' | 'lookup'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Login input fields
  const [loginId, setLoginId] = useState('s01@leadersart.com');
  const [password, setPassword] = useState('pass01');
  const [loginError, setLoginError] = useState('');

  // Selected student
  const [selectedId, setSelectedId] = useState(currentStudentId);

  // Filter student list
  const filteredStudents = STUDENTS.filter(s => 
    s.name.includes(searchTerm) || 
    s.grade.includes(searchTerm) || 
    s.id.includes(searchTerm.toLowerCase())
  );

  // Handle Parent Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    // Normalize input id (e.g. "s01", "s1", "s01@leadersart.com")
    const cleanInput = loginId.trim().toLowerCase().replace('@leadersart.com', '');
    const matchedStudent = STUDENTS.find(s => 
      s.id.toLowerCase() === cleanInput || 
      s.parentAccount?.username === cleanInput ||
      s.parentAccount?.email.toLowerCase() === loginId.trim().toLowerCase()
    );

    if (matchedStudent) {
      onSelectChild(matchedStudent.id);
      onClose();
    } else {
      setLoginError('입력하신 학부모 아이디를 찾을 수 없습니다. (예: s01@leadersart.com / pass01)');
    }
  };

  const handleSelectConfirm = (studentId) => {
    onSelectChild(studentId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col p-5 space-y-4 animate-pop-in">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">학부모 로그인 & 자녀 선택 (50명 지원)</h3>
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

        {/* Tab Switcher: Login vs 50 Students Direct Picker vs Account Lookup */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl text-[11px] font-bold text-center">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`py-1.5 rounded-xl transition-all ${
              activeTab === 'login' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            🔑 아이디 로그인
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('select')}
            className={`py-1.5 rounded-xl transition-all ${
              activeTab === 'select' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            👦 자녀 즉시 선택 (50명)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            className={`py-1.5 rounded-xl transition-all ${
              activeTab === 'lookup' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            📜 계정 표 보기
          </button>
        </div>

        {/* --- TAB 1: ID / Password Login --- */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
            <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100 text-slate-700 text-[11px] space-y-1">
              <div className="font-bold text-rose-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 학부모 계정 테스트 안내
              </div>
              <p className="text-[10px] text-slate-600 leading-snug">
                • 아이디: <strong className="font-mono text-rose-700">s01@leadersart.com</strong> (또는 s01~s50)<br />
                • 비밀번호: <strong className="font-mono text-rose-700">pass01</strong> (또는 pass01~pass50)
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> 학부모 아이디 (이메일 또는 ID)
              </label>
              <input
                type="text"
                placeholder="s01@leadersart.com 또는 s01"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
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
                placeholder="pass01"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
                required
              />
            </div>

            {loginError && (
              <p className="text-[11px] font-bold text-rose-500 bg-rose-50 p-2 rounded-xl border border-rose-100">
                ⚠️ {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 mt-2"
            >
              <ShieldCheck className="w-4 h-4" /> 내 자녀 전용 계정 로그인
            </button>
          </form>
        )}

        {/* --- TAB 2: 50 Students Direct Search & Selection --- */}
        {activeTab === 'select' && (
          <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="학생 이름, 학년(7세, 3학년 등) 또는 ID 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="overflow-y-auto max-h-[300px] space-y-1.5 pr-1">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">검색된 학생이 없습니다.</div>
              ) : (
                filteredStudents.map((student) => {
                  const isSelected = currentStudentId === student.id;
                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => handleSelectConfirm(student.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{student.avatarEmoji}</span>
                        <div>
                          <div className="text-xs font-bold">{student.name} 학생 ({student.id})</div>
                          <div className="text-[10px] text-slate-500 font-normal">{student.grade} • {student.class}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded-full">
                        {isSelected ? '현재 선택됨' : '선택'}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* --- TAB 3: 50 Students Account Lookup Table --- */}
        {activeTab === 'lookup' && (
          <div className="space-y-2 flex-1 overflow-hidden flex flex-col text-xs">
            <div className="flex justify-between items-center bg-purple-50 p-2.5 rounded-xl border border-purple-100 text-purple-900 text-[11px] font-bold">
              <span>총 50명 재원생 계정 목록</span>
              <span>비밀번호 예시: pass01 ~ pass50</span>
            </div>

            <div className="overflow-y-auto max-h-[300px] border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 sticky top-0 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">학생명</th>
                    <th className="p-2">연령/학년</th>
                    <th className="p-2">학부모 이메일 / 비번</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STUDENTS.map((s) => (
                    <tr key={s.id} className="hover:bg-rose-50/50 cursor-pointer" onClick={() => handleSelectConfirm(s.id)}>
                      <td className="p-2 font-mono font-bold text-rose-600">{s.id}</td>
                      <td className="p-2 font-bold text-slate-800">{s.name}</td>
                      <td className="p-2 text-slate-500">{s.grade}</td>
                      <td className="p-2 font-mono text-[10px] text-slate-600">
                        {s.parentAccount?.email} / <strong className="text-slate-800">{s.parentAccount?.password}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
