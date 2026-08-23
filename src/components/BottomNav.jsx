import React from 'react';
import { Home, Palette, Bell, CalendarCheck, CreditCard, CalendarDays } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, unreadNoticeCount = 0 }) {
  const tabs = [
    { id: 'home', label: '메인 홈', icon: Home },
    { id: 'gallery', label: '작품 갤러리', icon: Palette },
    { id: 'notice', label: '공지사항', icon: Bell, badge: unreadNoticeCount },
    { id: 'attendance', label: '출석 현황', icon: CalendarCheck },
    { id: 'tuition', label: '원비 수납', icon: CreditCard },
    { id: 'schedule', label: '학원 일정', icon: CalendarDays }
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-rose-100 px-2 py-2 shadow-lg">
      <div className="grid grid-cols-6 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-rose-600 font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-0.5 animate-pop-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
