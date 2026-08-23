import React, { useState } from 'react';
import { X, Save, Palette, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { STUDENTS } from '../../data/mockData';

export default function ArtworkEditModal({ artwork, onClose, onSaveEdit }) {
  if (!artwork) return null;

  const [title, setTitle] = useState(artwork.title || '');
  const [category, setCategory] = useState(artwork.category || '수채화');
  const [materials, setMaterials] = useState(artwork.materials || '');
  const [description, setDescription] = useState(artwork.description || '');
  const [feedback, setFeedback] = useState(artwork.feedback || '');
  const [year, setYear] = useState(artwork.year || '2026');
  const [month, setMonth] = useState(artwork.month || '08월');
  const [imageUrl, setImageUrl] = useState(artwork.imageUrl || '');
  const [selectedStudentId, setSelectedStudentId] = useState(artwork.studentId || 's01');

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("작품 제목을 입력해 주세요.");
      return;
    }

    const selectedStudent = STUDENTS.find(s => s.id === selectedStudentId) || STUDENTS[0];

    const updatedData = {
      ...artwork,
      title: title.trim(),
      category,
      materials: materials.trim(),
      description: description.trim(),
      feedback: feedback.trim(),
      year,
      month,
      imageUrl,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      ageGroup: selectedStudent.ageGroup
    };

    if (onSaveEdit) {
      onSaveEdit(updatedData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-rose-100 animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-purple-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <div>
              <h3 className="font-extrabold text-purple-900 text-sm">
                원장님 전용 - 미술 작품 수정하기
              </h3>
              <p className="text-[10px] text-purple-700">
                작품 사진, 제목, 감상평 및 재료 내용을 수정합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-slate-600 flex items-center justify-center shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 space-y-4 text-xs">
          
          {/* Target Student Selector */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <span>🧑 대상 학생 선택</span>
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-400"
            >
              {STUDENTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.grade} - {s.class})
                </option>
              ))}
            </select>
          </div>

          {/* Artwork Image Preview & File Upload */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
              <span>작품 사진 수정/교체</span>
            </label>

            <div className="flex gap-3 items-center">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="미리보기"
                  className="w-20 h-20 object-cover rounded-2xl border border-slate-200 shadow-2xs shrink-0"
                />
              )}
              <div className="flex-1 space-y-1.5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer"
                />
                <input
                  type="url"
                  placeholder="또는 이미지 인터넷 URL 입력..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
          </div>

          {/* Artwork Title */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">작품 제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-400"
              placeholder="예: 배단우의 SF 우주 탐사선"
              required
            />
          </div>

          {/* Category & Materials */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">장르/카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="수채화">수채화</option>
                <option value="일러스트">일러스트</option>
                <option value="오일파스텔">오일파스텔</option>
                <option value="조소/만들기">조소/만들기</option>
                <option value="창의표현">창의표현</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">연도 구분</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="2026">2026년 (최신 작품)</option>
                <option value="2025">2025년 (과거 성장 히스토리)</option>
              </select>
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">사용 미술 재료</label>
            <input
              type="text"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-400"
              placeholder="예: 수채화 물감, 오일파스텔, 켄트지"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">작품 설명 (기획 의도)</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-400 resize-none"
              placeholder="아이의 기획 의도와 표현 기법을 적어주세요."
            />
          </div>

          {/* Teacher Feedback */}
          <div className="space-y-1">
            <label className="font-bold text-amber-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>원장님 / 지도교사 피드백 코멘트</span>
            </label>
            <textarea
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-amber-50/60 border border-amber-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-400 resize-none"
              placeholder="원장님의 칭찬 피드백 메시지를 적어주세요."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" /> 수정사항 저장하기
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
