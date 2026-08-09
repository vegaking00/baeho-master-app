import React from 'react';
import { Palette, Megaphone, CalendarCheck, CalendarDays, CreditCard } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, unreadNoticeCount }) {
  const navItems = [
    { id: 'gallery', label: '작품 갤러리', icon: Palette },
    { id: 'notice', label: '공지사항', icon: Megaphone, badge: unreadNoticeCount },
    { id: 'attendance', label: '출석 현황', icon: CalendarCheck },
    { id: 'tuition', label: '원비 수납', icon: CreditCard },
    { id: 'schedule', label: '학원 일정', icon: CalendarDays }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t border-rose-100/80 px-1 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center py-1 px-1.5 rounded-2xl transition-all duration-200 relative group active:scale-95 ${
                isActive
                  ? 'text-rose-500 font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-rose-500' : 'group-hover:scale-105'
                  }`}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-bold text-rose-600' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-rose-500 mt-0.5 animate-pop-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
