import { ChevronRight, Globe, Palette, Bell, MapPin, Navigation, Volume2, Info, Trash2, Plus, X, Check } from 'lucide-react';
import { useState } from 'react';

interface SettingsModal {
  type: 'language' | 'theme' | 'accent' | 'calculation' | 'asr' | 'latitude' | 'adjustments' | 'audio' | 'about' | null;
}

export function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedLocations, setSavedLocations] = useState([
    { id: 1, name: 'Makkah, Saudi Arabia' },
    { id: 2, name: 'Istanbul, Turkey' },
  ]);
  const [activeModal, setActiveModal] = useState<SettingsModal['type']>(null);
  
  // Settings states
  const [language, setLanguage] = useState('Türkçe');
  const [theme, setTheme] = useState('Dark Neumorphic');
  const [accentColor, setAccentColor] = useState('Islamic Green');
  const [calculationMethod, setCalculationMethod] = useState('Muslim World League');
  const [asrMethod, setAsrMethod] = useState('Standard');
  const [highLatitude, setHighLatitude] = useState('Middle of the Night');
  const [adhanVolume, setAdhanVolume] = useState(80);
  const [notificationSound, setNotificationSound] = useState(50);
  
  // Prayer adjustments (minutes)
  const [prayerAdjustments, setPrayerAdjustments] = useState({
    Fajr: 0,
    Sunrise: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  });

  const deleteLocation = (id: number) => {
    setSavedLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const addLocation = () => {
    const newLocation = prompt('Enter location name:');
    if (newLocation) {
      setSavedLocations(prev => [...prev, { id: Date.now(), name: newLocation }]);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Konum alındı: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          alert('Konum alınamadı: ' + error.message);
        }
      );
    } else {
      alert('Tarayıcınız konum hizmetini desteklemiyor.');
    }
  };

  const adjustPrayer = (prayer: string, delta: number) => {
    setPrayerAdjustments(prev => ({
      ...prev,
      [prayer]: prev[prayer as keyof typeof prev] + delta,
    }));
  };

  const resetPrayerAdjustments = () => {
    setPrayerAdjustments({
      Fajr: 0,
      Sunrise: 0,
      Dhuhr: 0,
      Asr: 0,
      Maghrib: 0,
      Isha: 0,
    });
  };

  // Modal Component
  const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[80vh] overflow-y-auto neumorphic-card p-6 rounded-3xl border border-emerald-800/30">
        <button
          onClick={onClose}
          className="float-right w-8 h-8 neumorphic-icon-small rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X className="w-4 h-4 text-emerald-400" />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="islamic-pattern-divider mb-3"></div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
          Settings
        </h2>
        <p className="text-emerald-200/60 text-sm mt-1">إعدادات</p>
        <div className="islamic-pattern-divider mt-3"></div>
      </div>

      {/* General Settings */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 neumorphic-icon-small rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-emerald-100">General Settings</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-700" />
        </div>

        <div className="space-y-2">
          {/* Language */}
          <button 
            onClick={() => setActiveModal('language')}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <p className="text-emerald-100">Dil / Language</p>
                <p className="text-xs text-emerald-400/60 mt-0.5">{language}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>

          {/* Theme Mode */}
          <button 
            onClick={() => setActiveModal('theme')}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <p className="text-emerald-100">Tema Modu / Theme</p>
                <p className="text-xs text-emerald-400/60 mt-0.5">{theme}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>

          {/* Accent Color */}
          <button 
            onClick={() => setActiveModal('accent')}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30"></div>
              <div className="text-left">
                <p className="text-emerald-100">Accent Color</p>
                <p className="text-xs text-emerald-400/60 mt-0.5">{accentColor}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>

      {/* Notifications Toggle */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <button 
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 neumorphic-icon-small rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left">
              <p className="text-emerald-100">Bildirimleri Etkinleştir</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">Enable Notifications</p>
            </div>
          </div>
          <div className={`w-14 h-8 rounded-full transition-all ${
            notificationsEnabled ? 'bg-emerald-500/30' : 'bg-emerald-900/30'
          } relative`}>
            <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-br transition-all ${
              notificationsEnabled 
                ? 'from-emerald-400 to-emerald-500 translate-x-6 shadow-lg shadow-emerald-500/50' 
                : 'from-emerald-700 to-emerald-800'
            }`}></div>
          </div>
        </button>
      </div>

      {/* Location Settings */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 neumorphic-icon-small rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-emerald-100">Location</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-700" />
        </div>

        <div className="space-y-3">
          {/* Current Location */}
          <button 
            onClick={getCurrentLocation}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-100">Current Location</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>

          {/* Add Location */}
          <button 
            onClick={addLocation}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-amber-400" />
              <span className="text-emerald-100">Location Add</span>
            </div>
            <span className="text-xs text-emerald-400/60">Location GPS</span>
          </button>

          {/* Saved Locations */}
          <div className="mt-4 pt-4 border-t border-emerald-800/30">
            <p className="text-xs text-emerald-200/50 mb-3 px-2">Location Saved:</p>
            <div className="space-y-2">
              {savedLocations.map((location) => (
                <div 
                  key={location.id}
                  className="settings-item p-3 rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-100 text-sm">{location.name}</span>
                  </div>
                  <button
                    onClick={() => deleteLocation(location.id)}
                    className="w-8 h-8 neumorphic-icon-small rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Settings */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 neumorphic-icon-small rounded-full flex items-center justify-center">
              <span className="text-lg">🕌</span>
            </div>
            <h3 className="text-emerald-100">Prayer Settings</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-700" />
        </div>

        <div className="space-y-2">
          {/* Calculation Method */}
          <button 
            onClick={() => setActiveModal('calculation')}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="text-left">
              <p className="text-emerald-100">Hesaplama Yöntemleri</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">{calculationMethod}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>

          {/* Asr Juristic Method */}
          <button 
            onClick={() => setActiveModal('asr')}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="text-left">
              <p className="text-emerald-100">İkindi Fıkhi Yöntemi</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">Asr Method: {asrMethod}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>

          {/* High Latitude */}
          <button 
            onClick={() => setActiveModal('latitude')}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="text-left">
              <p className="text-emerald-100">High Latitude</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">{highLatitude}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>

          {/* Prayer Adjustments */}
          <button 
            onClick={() => setActiveModal('adjustments')}
            className="w-full settings-item p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="text-left">
              <p className="text-emerald-100">Prayer Adjustments</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">Vakitlere manuel ayarlama</p>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <button 
          onClick={() => setActiveModal('audio')}
          className="w-full flex items-center justify-between hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 neumorphic-icon-small rounded-full flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left">
              <p className="text-emerald-100">Audio Settings</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">Ezan ve bildirim sesleri</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-700" />
        </button>
      </div>

      {/* About */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <button 
          onClick={() => setActiveModal('about')}
          className="w-full flex items-center justify-between hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 neumorphic-icon-small rounded-full flex items-center justify-center">
              <Info className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="text-emerald-100">About</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">Uygulama hakkında</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-700" />
        </button>
      </div>

      {/* Modals */}
      {activeModal === 'language' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <h3 className="text-xl text-emerald-100 mb-4">Select Language</h3>
            <div className="space-y-2">
              {['Türkçe', 'English', 'العربية', 'اردو'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setActiveModal(null);
                  }}
                  className={`w-full settings-item p-4 rounded-2xl flex items-center justify-between ${
                    language === lang ? 'border-2 border-emerald-500' : ''
                  }`}
                >
                  <span className="text-emerald-100">{lang}</span>
                  {language === lang && <Check className="w-5 h-5 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'theme' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <h3 className="text-xl text-emerald-100 mb-4">Select Theme</h3>
            <div className="space-y-2">
              {['Dark Neumorphic', 'Light Neumorphic', 'Classic Dark', 'Classic Light'].map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => {
                    setTheme(themeOption);
                    setActiveModal(null);
                  }}
                  className={`w-full settings-item p-4 rounded-2xl flex items-center justify-between ${
                    theme === themeOption ? 'border-2 border-emerald-500' : ''
                  }`}
                >
                  <span className="text-emerald-100">{themeOption}</span>
                  {theme === themeOption && <Check className="w-5 h-5 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'accent' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <h3 className="text-xl text-emerald-100 mb-4">Accent Color</h3>
            <div className="space-y-2">
              {[
                { name: 'Islamic Green', color: 'from-emerald-400 to-emerald-500' },
                { name: 'Golden', color: 'from-amber-400 to-amber-500' },
                { name: 'Blue', color: 'from-blue-400 to-blue-500' },
                { name: 'Purple', color: 'from-purple-400 to-purple-500' },
              ].map((colorOption) => (
                <button
                  key={colorOption.name}
                  onClick={() => {
                    setAccentColor(colorOption.name);
                    setActiveModal(null);
                  }}
                  className={`w-full settings-item p-4 rounded-2xl flex items-center justify-between ${
                    accentColor === colorOption.name ? 'border-2 border-emerald-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${colorOption.color} shadow-lg`}></div>
                    <span className="text-emerald-100">{colorOption.name}</span>
                  </div>
                  {accentColor === colorOption.name && <Check className="w-5 h-5 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'calculation' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <h3 className="text-xl text-emerald-100 mb-4">Hesaplama Yöntemi</h3>
            <div className="space-y-2">
              {[
                'Muslim World League',
                'Islamic Society of North America',
                'Egyptian General Authority',
                'Umm Al-Qura University',
                'University of Islamic Sciences, Karachi',
                'Institute of Geophysics, Tehran',
                'Shia Ithna-Ashari',
                'Diyanet İşleri Başkanlığı (Turkey)',
              ].map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setCalculationMethod(method);
                    setActiveModal(null);
                  }}
                  className={`w-full settings-item p-4 rounded-2xl text-left ${
                    calculationMethod === method ? 'border-2 border-emerald-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-100 text-sm">{method}</span>
                    {calculationMethod === method && <Check className="w-5 h-5 text-emerald-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'asr' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <h3 className="text-xl text-emerald-100 mb-4">İkindi Fıkhi Yöntemi</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setAsrMethod('Standard');
                  setActiveModal(null);
                }}
                className={`w-full settings-item p-4 rounded-2xl text-left ${
                  asrMethod === 'Standard' ? 'border-2 border-emerald-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-100">Standard (Shafi, Maliki, Hanbali)</span>
                  {asrMethod === 'Standard' && <Check className="w-5 h-5 text-emerald-400" />}
                </div>
                <p className="text-xs text-emerald-400/60">Gölge = Cisim boyu + Öğle gölgesi</p>
              </button>
              <button
                onClick={() => {
                  setAsrMethod('Hanafi');
                  setActiveModal(null);
                }}
                className={`w-full settings-item p-4 rounded-2xl text-left ${
                  asrMethod === 'Hanafi' ? 'border-2 border-emerald-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-100">Hanafi</span>
                  {asrMethod === 'Hanafi' && <Check className="w-5 h-5 text-emerald-400" />}
                </div>
                <p className="text-xs text-emerald-400/60">Gölge = 2 × Cisim boyu + Öğle gölgesi</p>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'latitude' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <h3 className="text-xl text-emerald-100 mb-4">High Latitude Ayarı</h3>
            <p className="text-emerald-200/60 text-sm mb-4">
              Kutuplara yakın bölgelerde kullanılır (İskandinav ülkeleri, Kanada vb.)
            </p>
            <div className="space-y-2">
              {[
                { name: 'None', desc: 'Standart hesaplama' },
                { name: 'Middle of the Night', desc: 'Gece ortası yöntemi' },
                { name: 'One Seventh', desc: 'Gecenin 1/7\'si' },
                { name: 'Angle Based', desc: 'Açı bazlı hesaplama' },
              ].map((method) => (
                <button
                  key={method.name}
                  onClick={() => {
                    setHighLatitude(method.name);
                    setActiveModal(null);
                  }}
                  className={`w-full settings-item p-4 rounded-2xl text-left ${
                    highLatitude === method.name ? 'border-2 border-emerald-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-emerald-100">{method.name}</span>
                    {highLatitude === method.name && <Check className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-emerald-400/60">{method.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'adjustments' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-emerald-100">Prayer Adjustments</h3>
              <button
                onClick={resetPrayerAdjustments}
                className="text-xs text-amber-400 hover:text-amber-300"
              >
                Reset All
              </button>
            </div>
            <p className="text-emerald-200/60 text-sm mb-4">
              Her namaz vaktine dakika ekleyin veya çıkarın
            </p>
            <div className="space-y-3">
              {Object.entries(prayerAdjustments).map(([prayer, minutes]) => (
                <div key={prayer} className="settings-item p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-100">{prayer}</span>
                    <span className={`text-sm font-bold ${
                      minutes === 0 ? 'text-emerald-400' : minutes > 0 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {minutes > 0 ? '+' : ''}{minutes} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustPrayer(prayer, -1)}
                      className="flex-1 neumorphic-icon-small py-2 rounded-xl text-emerald-400 hover:scale-105 transition-transform"
                    >
                      - 1 min
                    </button>
                    <button
                      onClick={() => adjustPrayer(prayer, 1)}
                      className="flex-1 neumorphic-icon-small py-2 rounded-xl text-emerald-400 hover:scale-105 transition-transform"
                    >
                      + 1 min
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'audio' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8">
            <h3 className="text-xl text-emerald-100 mb-6">Audio Settings</h3>
            
            {/* Adhan Volume */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-100">Ezan Sesi</span>
                <span className="text-emerald-400">{adhanVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={adhanVolume}
                onChange={(e) => setAdhanVolume(Number(e.target.value))}
                className="w-full h-2 bg-emerald-900/30 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Notification Sound */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-100">Bildirim Sesi</span>
                <span className="text-emerald-400">{notificationSound}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={notificationSound}
                onChange={(e) => setNotificationSound(Number(e.target.value))}
                className="w-full h-2 bg-emerald-900/30 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Adhan Selection */}
            <div>
              <span className="text-emerald-100 block mb-3">Ezan Seçimi</span>
              <div className="space-y-2">
                {['Makkah', 'Madinah', 'Al-Aqsa', 'Egypt', 'Turkey'].map((adhan) => (
                  <button
                    key={adhan}
                    className="w-full settings-item p-3 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform"
                  >
                    <span className="text-emerald-100">{adhan}</span>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'about' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="mt-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 neumorphic-icon-small rounded-full flex items-center justify-center">
              <span className="text-4xl">🕌</span>
            </div>
            <h3 className="text-2xl bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent mb-2">
              Prayer Times App
            </h3>
            <p className="text-emerald-200/60 mb-6">Version 1.0.0</p>
            
            <div className="neumorphic-card p-4 rounded-2xl border border-emerald-900/30 text-left mb-4">
              <h4 className="text-emerald-100 mb-2">Features:</h4>
              <ul className="text-sm text-emerald-200/60 space-y-1">
                <li>• Accurate prayer times</li>
                <li>• Qibla compass</li>
                <li>• Islamic calendar</li>
                <li>• Prayer notifications</li>
                <li>• Multiple calculation methods</li>
              </ul>
            </div>

            <p className="text-xs text-emerald-400/60">
              Made with ❤️ for the Muslim community
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}