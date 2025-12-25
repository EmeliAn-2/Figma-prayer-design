import { Navigation } from 'lucide-react';

export function QiblaCompass() {
  // Mock Qibla direction - in a real app, this would be calculated based on location
  const qiblaDirection = 245; // degrees

  return (
    <div className="space-y-6">
      {/* Compass Card */}
      <div className="neumorphic-main-gradient p-8 rounded-3xl border border-emerald-800/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent mb-2">Qibla Direction</h2>
          <p className="text-emerald-200/60 text-sm">Point your device towards Kaaba</p>
        </div>

        {/* Compass */}
        <div className="relative w-64 h-64 mx-auto">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full neumorphic-compass-ring flex items-center justify-center">
            {/* Degree Markers */}
            <div className="absolute inset-4 rounded-full border-2 border-emerald-700/30">
              {/* Cardinal Directions */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-emerald-200">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-emerald-700">S</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-emerald-700">W</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-700">E</div>
            </div>

            {/* Inner Compass */}
            <div 
              className="w-48 h-48 rounded-full neumorphic-compass-inner flex items-center justify-center relative"
              style={{ transform: `rotate(${qiblaDirection}deg)` }}
            >
              {/* Kaaba Icon */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <span className="text-2xl">🕋</span>
                </div>
              </div>

              {/* Direction Needle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-emerald-400 via-amber-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Direction Info */}
        <div className="mt-6 text-center">
          <p className="text-emerald-200/60 text-sm mb-2">Qibla Direction</p>
          <div className="inline-flex items-center gap-2 neumorphic-badge px-6 py-3 rounded-full border border-emerald-800/30">
            <Navigation className="w-5 h-5 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">{qiblaDirection}°</span>
            <span className="text-emerald-400">SW</span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="neumorphic-card p-6 rounded-3xl border border-emerald-900/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 neumorphic-icon-small rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">ℹ️</span>
          </div>
          <div>
            <h3 className="text-emerald-100 mb-2">How to use</h3>
            <p className="text-emerald-200/60 text-sm leading-relaxed">
              Place your device on a flat surface and rotate yourself until the Kaaba icon points upward. 
              This direction is towards the Qibla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}