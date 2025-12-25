import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NextPrayerCard } from './components/NextPrayerCard';
import { PrayerTimesList } from './components/PrayerTimesList';
import { QiblaCompass } from './components/QiblaCompass';
import { FeatureGrid } from './components/FeatureGrid';
import { BottomNav } from './components/BottomNav';
import { Settings } from './components/Settings';
import { Tasbih } from './components/Tasbih';
import { Dua } from './components/Dua';

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('home');
  const [prayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '05:30', arabicName: 'الفجر' },
    { name: 'Sunrise', time: '07:00', arabicName: 'الشروق' },
    { name: 'Dhuhr', time: '12:45', arabicName: 'الظهر' },
    { name: 'Asr', time: '15:30', arabicName: 'العصر' },
    { name: 'Maghrib', time: '18:15', arabicName: 'المغرب' },
    { name: 'Isha', time: '19:45', arabicName: 'العشاء' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentPrayerIndex = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (let i = prayerTimes.length - 1; i >= 0; i--) {
      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      if (now >= prayerMinutes) {
        return i;
      }
    }
    return -1;
  };

  const getNextPrayer = () => {
    const currentIndex = getCurrentPrayerIndex();
    if (currentIndex === -1) return prayerTimes[0];
    if (currentIndex === prayerTimes.length - 1) return prayerTimes[0];
    return prayerTimes[currentIndex + 1];
  };

  const getTimeUntilNextPrayer = () => {
    const nextPrayer = getNextPrayer();
    const [hours, minutes] = nextPrayer.time.split(':').map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);
    
    let diff = prayerTime.getTime() - currentTime.getTime();
    if (diff < 0) {
      prayerTime.setDate(prayerTime.getDate() + 1);
      diff = prayerTime.getTime() - currentTime.getTime();
    }
    
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { 
      hours: hoursLeft, 
      minutes: minutesLeft, 
      seconds: secondsLeft, 
      name: nextPrayer.name,
      arabicName: nextPrayer.arabicName,
      time: nextPrayer.time
    };
  };

  const currentPrayerIndex = getCurrentPrayerIndex();
  const timeUntilNext = getTimeUntilNextPrayer();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <NextPrayerCard timeUntilNext={timeUntilNext} currentTime={currentTime} />
            <PrayerTimesList 
              prayerTimes={prayerTimes} 
              currentPrayerIndex={currentPrayerIndex}
              nextPrayerName={timeUntilNext.name}
            />
            <FeatureGrid onFeatureClick={(feature) => setActiveTab(feature)} />
          </>
        );
      case 'qibla':
        return <QiblaCompass />;
      case 'quran':
        return (
          <div className="neumorphic-card p-8 rounded-3xl text-center border border-emerald-900/30">
            <div className="w-20 h-20 mx-auto mb-4 neumorphic-icon-small rounded-full flex items-center justify-center">
              <span className="text-4xl">📖</span>
            </div>
            <h3 className="text-2xl bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent mb-2">
              Quran
            </h3>
            <p className="text-emerald-200/60">Coming soon...</p>
          </div>
        );
      case 'ramadan':
        return (
          <div className="neumorphic-card p-8 rounded-3xl text-center border border-emerald-900/30">
            <div className="w-20 h-20 mx-auto mb-4 neumorphic-icon-small rounded-full flex items-center justify-center">
              <span className="text-4xl">🌙</span>
            </div>
            <h3 className="text-2xl bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent mb-2">
              Ramadan
            </h3>
            <p className="text-emerald-200/60">Coming soon...</p>
          </div>
        );
      case 'more':
        return <Settings />;
      case 'tasbih':
        return <Tasbih />;
      case 'dua':
        return <Dua />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f1a] via-[#0d2818] to-[#1a3a2a] pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        <Header currentTime={currentTime} />
        <div className="space-y-6 mt-6">
          {renderContent()}
        </div>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}