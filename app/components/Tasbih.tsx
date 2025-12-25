import { useState } from 'react';
import { RotateCcw, Plus, Settings as SettingsIcon } from 'lucide-react';

export function Tasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [totalCount, setTotalCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTotalCount(totalCount + 1);

    // Vibration feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Reset if target reached
    if (newCount >= target) {
      setTimeout(() => {
        setCount(0);
      }, 500);
    }
  };

  const reset = () => {
    setCount(0);
  };

  const resetAll = () => {
    setCount(0);
    setTotalCount(0);
  };

  const targetOptions = [33, 99, 100, 500, 1000];

  const progress = (count / target) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="islamic-pattern-divider mb-3"></div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
          Digital Tasbih
        </h2>
        <p className="text-emerald-200/60 text-sm mt-1">تسبيح</p>
        <div className="islamic-pattern-divider mt-3"></div>
      </div>

      {/* Common Dhikr */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <h3 className="text-emerald-100 text-center mb-4">Common Dhikr</h3>
        <div className="space-y-2">
          {[
            { arabic: 'سُبْحَانَ ٱللَّٰهِ', transliteration: 'SubhanAllah', meaning: 'Glory be to Allah' },
            { arabic: 'ٱلْحَمْدُ لِلَّٰهِ', transliteration: 'Alhamdulillah', meaning: 'All praise is due to Allah' },
            { arabic: 'ٱللَّٰهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest' },
            { arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', transliteration: 'La ilaha illallah', meaning: 'There is no god but Allah' },
          ].map((dhikr) => (
            <div key={dhikr.arabic} className="settings-item p-3 rounded-2xl text-center">
              <p className="text-xl text-amber-300 mb-1">{dhikr.arabic}</p>
              <p className="text-sm text-emerald-400">{dhikr.transliteration}</p>
              <p className="text-xs text-emerald-200/50 mt-1">{dhikr.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Counter Display */}
      <div className="neumorphic-main-gradient p-8 rounded-3xl relative overflow-hidden border border-emerald-800/30">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-400" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Progress Ring */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="rgba(16, 185, 129, 0.1)"
                strokeWidth="12"
              />
              {/* Progress Circle */}
              <circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 110}`}
                strokeDashoffset={`${2 * Math.PI * 110 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Count Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-7xl font-bold bg-gradient-to-br from-emerald-300 to-amber-300 bg-clip-text text-transparent tabular-nums">
                {count}
              </div>
              <div className="text-emerald-400/60 text-sm mt-2">/ {target}</div>
            </div>
          </div>

          {/* Target Selector & Settings */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 neumorphic-icon-small rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <SettingsIcon className="w-5 h-5 text-emerald-400" />
            </button>
            {showSettings && (
              <div className="flex gap-2">
                {targetOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setTarget(option)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      target === option
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                        : 'neumorphic-icon-small text-emerald-400/60'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Total Count */}
          <div className="text-center mb-6">
            <p className="text-emerald-200/50 text-xs mb-1">Total Count</p>
            <p className="text-2xl font-bold text-emerald-400 tabular-nums">{totalCount}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={reset}
              className="flex-1 neumorphic-icon-small p-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95"
            >
              <RotateCcw className="w-5 h-5 text-amber-400" />
              <span className="text-emerald-100">Reset</span>
            </button>

            <button
              onClick={increment}
              className="w-32 h-32 rounded-full neumorphic-main-gradient border-4 border-emerald-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-12 h-12 text-emerald-300" />
            </button>

            <button
              onClick={resetAll}
              className="flex-1 neumorphic-icon-small p-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95"
            >
              <RotateCcw className="w-5 h-5 text-rose-400" />
              <span className="text-emerald-100">Reset All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="neumorphic-card p-6 rounded-3xl border border-emerald-900/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 neumorphic-icon-small rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">ℹ️</span>
          </div>
          <div>
            <h3 className="text-emerald-100 mb-2">How to use</h3>
            <ul className="text-emerald-200/60 text-sm space-y-1">
              <li>• Tap the large button to count</li>
              <li>• Counter resets automatically at target</li>
              <li>• Use settings to change target number</li>
              <li>• "Reset" clears current count</li>
              <li>• "Reset All" clears total count too</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
