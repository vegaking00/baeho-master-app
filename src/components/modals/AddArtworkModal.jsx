import React, { useState } from 'react';
import { X, Image as ImageIcon, PlusCircle, Sparkles, Check, Upload, Link } from 'lucide-react';

export default function AddArtworkModal({ student, onClose, onAddArtwork }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('수채화');
  const [imageUrl, setImageUrl] = useState('');
  const [materials, setMaterials] = useState('');
  const [feedback, setFeedback] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url' | 'sample'

  // sample art image URLs for 1-click selection
  const sampleImages = [
    { label: '수채화 해바라기', url: '/images/artwork_sunflower.jpg' },
    { label: '우주 야옹이', url: '/images/artwork_space_cat.jpg' },
    { label: '에코 시티 일러스트', url: '/images/artwork_illust_danwoo.jpg' },
    { label: '로봇 조소', url: '/images/artwork_sculpture_danwoo.jpg' },
    { label: '공룡 클레이', url: '/images/artwork_clay_dino.jpg' },
    { label: '노을 풍경', url: '/images/artwork_city_sunset.jpg' }
  ];

  // Handle smartphone/PC local file selection -> convert to Data URL for instant upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일 크기가 5MB를 초과합니다. 더 작은 이미지를 선택해 주세요.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Base64 data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      alert('작품 제목과 이미지를 선택 또는 입력해 주세요!');
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
                ✨ 스마트폰/PC 갤러리 사진 직접 파일 선택 & URL 지원
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

          {/* Image Upload Option Tabs */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>작품 이미지 첨부 *</span>
            </label>

            {/* Mode Switcher Buttons */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl text-[11px] font-bold text-center">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`py-1.5 rounded-xl transition-all ${
                  uploadMode === 'file' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                📁 파일/갤러리 선택
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('sample')}
                className={`py-1.5 rounded-xl transition-all ${
                  uploadMode === 'sample' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                💡 예시 샘플 선택
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`py-1.5 rounded-xl transition-all ${
                  uploadMode === 'url' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                🌐 웹 URL 입력
              </button>
            </div>

            {/* Mode 1: Local File / Phone Gallery Picker */}
            {uploadMode === 'file' && (
              <div className="space-y-2 pt-1">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-rose-300 rounded-2xl cursor-pointer bg-rose-50/40 hover:bg-rose-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center">
                    <Upload className="w-6 h-6 text-rose-500 mb-1" />
                    <p className="text-xs font-bold text-slate-700">
                      스마트폰 갤러리 또는 컴퓨터 사진 선택
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      JPG, PNG, WEBP 사진 파일 클릭 (최대 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Mode 2: Quick Sample Selector */}
            {uploadMode === 'sample' && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-semibold text-slate-400">원터치 예시 샘플 이미지:</span>
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
            )}

            {/* Mode 3: Direct Web URL Input */}
            {uploadMode === 'url' && (
              <div className="space-y-1 pt-1">
                <input
                  type="text"
                  placeholder="https://example.com/my-image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-400 focus:bg-white"
                />
              </div>
            )}

            {/* Live Image Preview */}
            {imageUrl && (
              <div className="mt-2 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-16/9 relative">
                <img
                  src={imageUrl}
                  alt="미리보기"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                  }}
                />
                <span className="absolute bottom-1.5 right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" /> 이미지 선택 완료
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
