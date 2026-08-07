import React, { useState } from 'react';
import { X, Image, PlusCircle, Sparkles, Check } from 'lucide-react';

export default function AddArtworkModal({ student, onClose, onAddArtwork }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('수채화');
  const [imageUrl, setImageUrl] = useState('');
  const [materials, setMaterials] = useState('');
  const [feedback, setFeedback] = useState('');

  // sample art image URLs for 1-click selection
  const sampleImages = [
    { label: '수채화 해바라기', url: '/images/artwork_sunflower.jpg' },
    { label: '우주 야옹이', url: '/images/artwork_space_cat.jpg' },
    { label: '에코 시티 일러스트', url: '/images/artwork_illust_danwoo.jpg' },
    { label: '로봇 조소', url: '/images/artwork_sculpture_danwoo.jpg' },
    { label: '공룡 클레이', url: '/images/artwork_clay_dino.jpg' },
    { label: '노을 풍경', url: '/images/artwork_city_sunset.jpg' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      alert('작품 제목과 이미지 URL을 입력해 주세요!');
      return;
    }

    const newArt = {
      studentId: student.id,
      title: title.trim(),
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      category,
      imageUrl: imageUrl.trim(),
      materials: materials.trim() || '수채화 물감, 드로잉 패드',
      teacherName: '신연정 원장님',
      teacherAvatar: '👩‍🎨',
      feedback: feedback.trim() || `${student.name} 학생이 집중력을 발휘하여 완성한 멋진 작품입니다!`,
      tags: [`#${category}`, `#${student.name}작품`, '#리더스아트'],
      likes: 0,
      comments: []
    };

    onAddArtwork(newArt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-rose-100 animate-pop-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">{student.avatarEmoji}</span>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {student.name} 학생 작품 등록
              </h3>
              <p className="text-[10px] text-rose-500 font-medium">
                🔥 Storage 없이 이미지 URL / Firestore 직저장 방식 지원
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-2xs flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 space-y-4 text-xs">
          
          {/* Title Input */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">작품 제목 *</label>
            <input
              type="text"
              placeholder="예: 바닷속을 헤엄치는 인어공주"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              required
            />
          </div>

          {/* Category Select */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
            >
              <option value="수채화">수채화</option>
              <option value="일러스트">일러스트</option>
              <option value="오일파스텔">오일파스텔</option>
              <option value="조소/만들기">조소/만들기</option>
            </select>
          </div>

          {/* Image URL Input & Sample Selector */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>작품 이미지 URL * (Firebase Storage 미사용)</span>
              <span className="text-[10px] text-slate-400 font-normal">웹 링크 또는 샘플 클릭</span>
            </label>
            
            <input
              type="text"
              placeholder="https://example.com/my-image.jpg 또는 샘플 선택"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
              required
            />

            {/* Quick Sample Image Pills */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-semibold text-slate-400">💡 예시 샘플 이미지 선택하기:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleImages.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(s.url)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      imageUrl === s.url
                        ? 'bg-rose-500 text-white border-rose-500 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {imageUrl === s.url && <Check className="w-3 h-3 inline mr-0.5" />}
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Box */}
            {imageUrl && (
              <div className="mt-2 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-16/9 relative">
                <img
                  src={imageUrl}
                  alt="미리보기"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                  }}
                />
                <span className="absolute bottom-1 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-md">
                  미리보기
                </span>
              </div>
            )}
          </div>

          {/* Materials Input */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">사용 재료</label>
            <input
              type="text"
              placeholder="예: 수채화 물감, 아크릴 페인트, 4절 도화지"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>

          {/* Teacher Feedback */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">선생님 피드백 코멘트</label>
            <textarea
              rows="3"
              placeholder="학생의 관찰력, 색감, 집중력에 대한 칭찬과 평가 기록을 작성해 주세요..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-400 hover:from-rose-600 hover:to-amber-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> 작품 등록하기 (Firestore 저장)
          </button>
        </form>
      </div>
    </div>
  );
}
