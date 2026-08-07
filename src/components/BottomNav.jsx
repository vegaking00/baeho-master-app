import React from 'react';
import { Palette, Megaphone, CalendarCheck, CalendarDays } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, unreadNoticeCount }) {
  const navItems = [
    { id: 'gallery', label: '작품 갤러리', icon: Palette, badge: null },
    { id: 'notice', label: '공지사항', icon: Megaphone, badge: unreadNoticeCount > 0 ? unreadNoticeCount : null },
    { id: 'attendance', label: '출석 현황', icon: CalendarCheck, badge: null },
    { id: 'schedule', label: '학원 일정', icon: CalendarDays, badge: null },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t border-rose-100/70 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-rose-500 font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              {/* Active Tab Pill Indicator */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-300 rounded-full animate-fade-in" />
              )}

              <div className="relative mt-0.5">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-rose-500' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs border-2 border-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
