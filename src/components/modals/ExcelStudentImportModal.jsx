import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, Download, CheckCircle2, AlertCircle, Sparkles, Users } from 'lucide-react';

export default function ExcelStudentImportModal({ onClose, onImportStudents }) {
  const [csvText, setCsvText] = useState('');
  const [importedCount, setImportedCount] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Download Sample CSV Template
  const handleDownloadTemplate = () => {
    const sampleCsv = `학생이름,학년,연령,수강반,담당강사,학부모이메일,비밀번호\n김예원,7세 유치부,7,유치부 창의반,주미 선생님,yewon_mom@naver.com,pass123\n이준서,초등 2학년,9,초등 수채화반,신연정 원장님,junseo_dad@gmail.com,pass123\n박지민,초등 5학년,12,디지털 일러스트반,주미 선생님,jimin_mom@daum.net,pass123`;
    
    const blob = new Blob(['\uFEFF' + sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '수강생_일괄등록_양식_템플릿.csv';
    link.click();
  };

  // 2. Read Uploaded File
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      setCsvText(evt.target.result);
    };

    reader.readAsText(file, 'utf-8');
  };

  // 3. Parse CSV and Import Students
  const handleProcessImport = () => {
    if (!csvText.trim()) {
      alert("엑셀(CSV) 파일을 올려주시거나 텍스트를 입력해 주세요!");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const lines = csvText.trim().split('\n');
      const newStudents = [];

      // Skip header row if present
      const startIdx = lines[0].includes('학생이름') || lines[0].includes('이름') ? 1 : 0;

      for (let i = startIdx; i < lines.length; i++) {
        const row = lines[i].split(',').map(s => s.trim().replace(/"/g, ''));
        if (row.length < 2 || !row[0]) continue;

        const name = row[0];
        const grade = row[1] || '7세 유치부';
        const age = parseInt(row[2]) || (grade.includes('유치') ? 7 : grade.includes('고') ? 12 : 9);
        const className = row[3] || '미술 정규반';
        const teacher = row[4] || '신연정 원장님';
        const parentEmail = row[5] || `parent_${Date.now()}_${i}@leadersart.com`;
        const password = row[6] || 'pass123';

        const studentId = `s-${Date.now()}-${i}`;
        const avatarEmoji = age <= 7 ? '👧' : age <= 10 ? '👦' : '🧑';

        newStudents.push({
          id: studentId,
          name,
          grade,
          age,
          ageGroup: age <= 7 ? '유치부' : age <= 10 ? '초등저학년' : '초등고학년',
          class: className,
          teacher,
          avatarEmoji,
          parentAccount: {
            username: `parent_${name}`,
            email: parentEmail,
            password
          }
        });
      }

      if (newStudents.length === 0) {
        alert("올바른 수강생 데이터가 없습니다. 엑셀 양식을 확인해 주세요.");
        setIsProcessing(false);
        return;
      }

      setImportedCount(newStudents.length);
      setIsProcessing(false);

      if (onImportStudents) {
        onImportStudents(newStudents);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-rose-100 p-5 space-y-4 relative animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
            <FileSpreadsheet className="w-3.5 h-3.5" /> 50~200명 수강생 엑셀(CSV) 1초 일괄 등록
          </div>
          <h3 className="font-black text-slate-800 text-base">
            새로운 학원 원생 명단 대량 자동 업로드
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            코드 수정 없이 엑셀 파일만 올려놓으시면 50명~200명 전체 수강생이 1초 만에 자동 생성됩니다!
          </p>
        </div>

        {/* Success Feedback Banner */}
        {importedCount !== null ? (
          <div className="py-8 text-center space-y-3 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm animate-bounce">
              ✓
            </div>
            <h4 className="text-lg font-black text-slate-800">
              총 {importedCount}명의 수강생 정보가 1초 만에 성공적으로 등록되었습니다! 🎉
            </h4>
            <p className="text-xs text-emerald-600 font-bold">
              원장님 대시보드와 출석부, 원비 수납 청구서에 실시간 자동 연결되었습니다.
            </p>
          </div>
        ) : (
          /* Form Content */
          <>
            {/* Template Download Box */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>📥 수강생 엑셀 표준 서식 양식</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  이름, 학년, 연령, 수강반, 학부모 이메일 열 구성
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs transition-all active:scale-95 shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> 템플릿 받기
              </button>
            </div>

            {/* File Upload Drop Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                📂 작성한 엑셀(CSV) 파일 선택
              </label>

              <div className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/40 p-5 rounded-2xl text-center space-y-2 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept=".csv, .txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-8 h-8 text-rose-400 mx-auto" />
                <div className="text-xs font-bold text-slate-700">
                  {fileName ? `선택된 파일: ${fileName}` : '컴퓨터의 엑셀(CSV) 파일을 끌어다 놓으세요'}
                </div>
                <div className="text-[10px] text-slate-400">
                  마우스 클릭 후 저장한 `.csv` 파일 선택
                </div>
              </div>
            </div>

            {/* Manual Text Preview / Paste Area */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>또는 엑셀 내용을 직접 복사해서 붙여넣기</span>
                <span className="text-[10px] text-rose-500 font-semibold">선택 사항</span>
              </label>
              <textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder="학생이름,학년,연령,수강반,담당강사,학부모이메일,비밀번호&#10;김예원,7세 유치부,7,유치부 창의반,주미 선생님,yewon@naver.com,pass123"
                rows={3}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleProcessImport}
              className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              {isProcessing ? (
                <span>수강생 데이터 처리 중...</span>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  <span>50~200명 수강생 1초 일괄 등록 실행</span>
                </>
              )}
            </button>
          </>
        )}

      </div>
    </div>
  );
}
