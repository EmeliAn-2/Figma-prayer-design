import { Home, Compass, BookOpen, MoreHorizontal } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'qibla', icon: Compass, label: 'Qibla' },
    { id: 'quran', icon: BookOpen, label: 'Quran' },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 pb-safe">
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="neumorphic-nav rounded-3xl p-2 border border-emerald-900/30">
          <div className="grid grid-cols-4 gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''} p-3 rounded-2xl transition-all duration-300`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    <span className={`text-xs ${isActive ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}