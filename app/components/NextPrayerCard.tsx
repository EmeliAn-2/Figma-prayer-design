interface NextPrayerCardProps {
  timeUntilNext: {
    hours: number;
    minutes: number;
    seconds: number;
    name: string;
    arabicName: string;
    time: string;
  };
  currentTime: Date;
}

export function NextPrayerCard({ timeUntilNext, currentTime }: NextPrayerCardProps) {
  return (
    <div className="neumorphic-main-gradient p-6 rounded-3xl relative overflow-hidden border border-emerald-800/30">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-400" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
        </svg>
      </div>

      {/* Top Decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

      <div className="relative z-10">
        {/* Current Time */}
        <div className="text-center mb-6">
          <p className="text-emerald-200/50 text-xs tracking-widest uppercase mb-2">Current Time</p>
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-200 to-amber-200 bg-clip-text text-transparent tabular-nums mb-1">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit',
              hour12: true 
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent"></div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xl">☪</span>
            <span className="text-xs text-emerald-300/80 uppercase tracking-wider">Next Prayer</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent"></div>
        </div>

        {/* Next Prayer Info */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h3 className="text-2xl text-emerald-100">{timeUntilNext.name}</h3>
            <span className="text-xl text-amber-300">{timeUntilNext.arabicName}</span>
          </div>
          <p className="text-emerald-400">{timeUntilNext.time}</p>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-4">
          <div className="neumorphic-countdown-mini">
            <div className="text-3xl font-bold bg-gradient-to-br from-emerald-300 to-emerald-400 bg-clip-text text-transparent tabular-nums">
              {String(timeUntilNext.hours).padStart(2, '0')}
            </div>
            <div className="text-xs text-emerald-200/50 mt-1">Hours</div>
          </div>
          <div className="text-2xl font-bold text-emerald-800">:</div>
          <div className="neumorphic-countdown-mini">
            <div className="text-3xl font-bold bg-gradient-to-br from-emerald-300 to-emerald-400 bg-clip-text text-transparent tabular-nums">
              {String(timeUntilNext.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs text-emerald-200/50 mt-1">Mins</div>
          </div>
          <div className="text-2xl font-bold text-emerald-800">:</div>
          <div className="neumorphic-countdown-mini">
            <div className="text-3xl font-bold bg-gradient-to-br from-emerald-300 to-emerald-400 bg-clip-text text-transparent tabular-nums">
              {String(timeUntilNext.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-emerald-200/50 mt-1">Secs</div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
    </div>
  );
}