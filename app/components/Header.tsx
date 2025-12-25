import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentTime: Date;
}

export function Header({ currentTime }: HeaderProps) {
  const [dateOffset, setDateOffset] = useState(0);

  // Calculate Islamic date based on offset
  const calculateIslamicDate = (offset: number) => {
    const baseDay = 13;
    const baseMonth = 'Jumada al-Thani';
    const baseYear = 1447;
    
    const islamicMonths = [
      'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
      'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
      'Ramadan', 'Shawwal', 'Dhul-Qadah', 'Dhul-Hijjah'
    ];
    
    const currentMonthIndex = islamicMonths.indexOf(baseMonth);
    const daysInMonth = 30; // Simplified - Islamic months are 29 or 30 days
    
    let newDay = baseDay + offset;
    let newMonthIndex = currentMonthIndex;
    let newYear = baseYear;
    
    while (newDay > daysInMonth) {
      newDay -= daysInMonth;
      newMonthIndex++;
      if (newMonthIndex >= 12) {
        newMonthIndex = 0;
        newYear++;
      }
    }
    
    while (newDay < 1) {
      newMonthIndex--;
      if (newMonthIndex < 0) {
        newMonthIndex = 11;
        newYear--;
      }
      newDay += daysInMonth;
    }
    
    return {
      day: newDay,
      month: islamicMonths[newMonthIndex],
      year: newYear
    };
  };

  const islamicDate = calculateIslamicDate(dateOffset);

  const calculateGregorianDate = (offset: number) => {
    const date = new Date(currentTime);
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const gregorianDate = calculateGregorianDate(dateOffset);

  const handlePreviousDay = () => {
    setDateOffset(prev => prev - 1);
  };

  const handleNextDay = () => {
    setDateOffset(prev => prev + 1);
  };

  const handleToday = () => {
    setDateOffset(0);
  };

  const getDateLabel = () => {
    if (dateOffset === 0) return 'Today';
    if (dateOffset === 1) return 'Tomorrow';
    if (dateOffset === -1) return 'Yesterday';
    return dateOffset > 0 ? `+${dateOffset} days` : `${dateOffset} days`;
  };

  return (
    <div className="space-y-4">
      {/* Islamic Pattern Header */}
      <div className="text-center py-4">
        <div className="islamic-pattern-divider mb-3"></div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300 bg-clip-text text-transparent mb-2">
          Prayer Times
        </h1>
        <p className="text-emerald-200/60 text-sm tracking-widest">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        <div className="islamic-pattern-divider mt-3"></div>
      </div>

      {/* Location */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="neumorphic-icon-small w-10 h-10 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-emerald-200/50">Location</p>
            <h2 className="text-emerald-100">Makkah, Saudi Arabia</h2>
          </div>
        </div>
        <div className="neumorphic-icon-small w-10 h-10 rounded-full flex items-center justify-center">
          <Calendar className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Date Display with Navigation */}
      <div className="neumorphic-card p-4 rounded-2xl border border-emerald-900/30">
        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handlePreviousDay}
            className="neumorphic-icon-small w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-400" />
          </button>
          
          <button
            onClick={handleToday}
            className={`px-4 py-1 rounded-full transition-all ${
              dateOffset === 0 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'text-emerald-400/60 hover:text-emerald-400'
            }`}
          >
            <span className="text-xs font-medium">{getDateLabel()}</span>
          </button>
          
          <button
            onClick={handleNextDay}
            className="neumorphic-icon-small w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          >
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Date Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-200/50 mb-1">Islamic Date</p>
            <p className="text-emerald-100">{islamicDate.day} {islamicDate.month}, {islamicDate.year} AH</p>
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-emerald-800/50 to-amber-800/50"></div>
          <div className="text-right">
            <p className="text-xs text-emerald-200/50 mb-1">Gregorian Date</p>
            <p className="text-emerald-100 text-sm">{gregorianDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}