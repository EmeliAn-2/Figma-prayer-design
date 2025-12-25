import { Check, Bell } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

interface PrayerTimesListProps {
  prayerTimes: PrayerTime[];
  currentPrayerIndex: number;
  nextPrayerName: string;
}

export function PrayerTimesList({ prayerTimes, currentPrayerIndex, nextPrayerName }: PrayerTimesListProps) {
  const getPrayerIcon = (name: string): string => {
    const icons: Record<string, string> = {
      Fajr: '🌅',
      Sunrise: '☀️',
      Dhuhr: '🌞',
      Asr: '🌤️',
      Maghrib: '🌇',
      Isha: '🌙',
    };
    return icons[name] || '🕌';
  };

  return (
    <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-emerald-100">Prayer Times</h3>
        <Bell className="w-4 h-4 text-amber-400" />
      </div>
      
      <div className="space-y-2">
        {prayerTimes.map((prayer, index) => {
          const isPassed = index <= currentPrayerIndex;
          const isNext = prayer.name === nextPrayerName;
          
          return (
            <div
              key={prayer.name}
              className={`prayer-time-item p-4 rounded-2xl transition-all duration-300 ${
                isNext ? 'prayer-time-next' : ''
              } ${isPassed && !isNext ? 'prayer-time-passed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 neumorphic-icon-small rounded-full flex items-center justify-center">
                    <span className="text-xl">{getPrayerIcon(prayer.name)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`${isNext ? 'text-emerald-300' : 'text-emerald-100'} transition-colors`}>
                        {prayer.name}
                      </h4>
                      <span className={`text-sm ${isNext ? 'text-amber-300' : 'text-emerald-400/60'}`}>
                        {prayer.arabicName}
                      </span>
                    </div>
                    {isNext && (
                      <p className="text-xs text-emerald-400 mt-1">Coming next</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`font-bold tabular-nums ${
                    isNext ? 'text-emerald-300 text-xl' : isPassed ? 'text-emerald-700' : 'text-emerald-200'
                  }`}>
                    {prayer.time}
                  </span>
                  {isPassed && !isNext && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}