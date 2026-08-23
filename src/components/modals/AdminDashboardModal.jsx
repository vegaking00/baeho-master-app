import React, { useState } from 'react';
import { X, Users, Search, GraduationCap, CreditCard, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { STUDENTS, TUITION_DATA } from '../../data/mockData';

export default function AdminDashboardModal({ currentStudentId, onClose, onSelectStudent, tuitionList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgeGroupFilter, setSelectedAgeGroupFilter] = useState('전체');

  // Tuition calculation
  const totalStudents = STUDENTS.length; // 50
  const currentTuitionList = tuitionList || TUITION_DATA;
  const paidCount = currentTuitionList.filter(t => t.status === 'paid').length;
  const pendingCount = totalStudents - paidCount;
  const paidRate = Math.round((paidCount / totalStudents) * 100);

  // Group students by Grade/Age
  const kinderStudents = STUDENTS.filter(s => s.age <= 7);
  const lowerElemStudents = STUDENTS.filter(s => s.age >= 8 && s.age <= 10);
  const upperElemStudents = STUDENTS.filter(s => s.age >= 11);

  const filterList = (list) => {
    if (!searchTerm.trim()) return list;
    return list.filter(s => s.name.includes(searchTerm) || s.grade.includes(searchTerm) || s.id.includes(searchTerm.toLowerCase()));
  };

  const filteredKinder = filterList(kinderStudents);
  const filteredLower = filterList(lowerElemStudents);
  const filteredUpper = filterList(upperElemStudents);

  const handleStudentClick = (studentId) => {
    onSelectStudent(studentId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col p-4 sm:p-5 space-y-4 animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                원장님 학년별 50명 재원생 구성 대시보드 🏫
              </h3>
              <p className="text-[10px] sm:text-xs text-rose-500 font-semibold">
                원내 전체 학생 수: 총 {totalStudents}명 • 수납 완료율: {paidRate}%
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Summary Stats Overview */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-rose-50 p-2.5 rounded-2xl border border-rose-100">
            <div className="text-[10px] text-slate-400 font-bold">전체 재원생</div>
            <div className="text-sm font-extrabold text-rose-600">{totalStudents}명</div>
          </div>
          <div className="bg-amber-50 p-2.5 rounded-2xl border border-amber-100">
            <div className="text-[10px] text-amber-700 font-bold">유치부 (7세)</div>
            <div className="text-sm font-extrabold text-amber-600">{kinderStudents.length}명</div>
          </div>
          <div className="bg-sky-50 p-2.5 rounded-2xl border border-sky-100">
            <div className="text-[10px] text-sky-700 font-bold">초등 저학년</div>
            <div className="text-sm font-extrabold text-sky-600">{lowerElemStudents.length}명</div>
          </div>
          <div className="bg-purple-50 p-2.5 rounded-2xl border border-purple-100">
            <div className="text-[10px] text-purple-700 font-bold">초등 고학년</div>
            <div className="text-sm font-extrabold text-purple-600">{upperElemStudents.length}명</div>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="학생 이름, 학년 또는 학생 ID 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-rose-400"
          />
        </div>

        {/* Main Age Grouped Scrollable Student List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[50vh]">
          
          {/* Group 1: 유치부 (7세 - 10명) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-amber-100/70 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 border border-amber-200">
              <span className="flex items-center gap-1.5">
                👧 유치부 (7세 창의 표현 & 클레이반)
              </span>
              <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-amber-800">
                {kinderStudents.length}명
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredKinder.map((s) => {
                const tInfo = currentTuitionList.find(t => t.studentId === s.id);
                const isPaid = tInfo?.status === 'paid';
                const isCurrent = currentStudentId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => handleStudentClick(s.id)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs space-y-1 text-left ${
                      isCurrent
                        ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{s.avatarEmoji}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isPaid ? '수납완료' : '납부예정'}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs">{s.name} <span className="text-[10px] text-slate-400 font-mono">({s.id})</span></div>
                    <div className="text-[10px] text-slate-400 leading-tight">{s.grade}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 2: 초등 저학년 (1~3학년 / 8~10세 - 22명) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-sky-100/70 px-3 py-1.5 rounded-xl text-xs font-bold text-sky-900 border border-sky-200">
              <span className="flex items-center gap-1.5">
                👦 초등 저학년 (1~3학년 / 융합 조형 & 수채화반)
              </span>
              <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-sky-800">
                {lowerElemStudents.length}명
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredLower.map((s) => {
                const tInfo = currentTuitionList.find(t => t.studentId === s.id);
                const isPaid = tInfo?.status === 'paid';
                const isCurrent = currentStudentId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => handleStudentClick(s.id)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs space-y-1 text-left ${
                      isCurrent
                        ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{s.avatarEmoji}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isPaid ? '수납완료' : '납부예정'}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs">{s.name} <span className="text-[10px] text-slate-400 font-mono">({s.id})</span></div>
                    <div className="text-[10px] text-slate-400 leading-tight">{s.grade}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 3: 초등 고학년 (4~6학년 / 11~13세 - 18명) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-purple-100/70 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-900 border border-purple-200">
              <span className="flex items-center gap-1.5">
                🧑 초등 고학년 (4~6학년 / 웹툰 일러스트 & 입체 조소반)
              </span>
              <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-purple-800">
                {upperElemStudents.length}명
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredUpper.map((s) => {
                const tInfo = currentTuitionList.find(t => t.studentId === s.id);
                const isPaid = tInfo?.status === 'paid';
                const isCurrent = currentStudentId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => handleStudentClick(s.id)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs space-y-1 text-left ${
                      isCurrent
                        ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{s.avatarEmoji}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isPaid ? '수납완료' : '납부예정'}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs">{s.name} <span className="text-[10px] text-slate-400 font-mono">({s.id})</span></div>
                    <div className="text-[10px] text-slate-400 leading-tight">{s.grade}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
