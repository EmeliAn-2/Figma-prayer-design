import { BookOpen, Sparkles, Moon, Heart } from 'lucide-react';

interface FeatureGridProps {
  onFeatureClick: (feature: string) => void;
}

export function FeatureGrid({ onFeatureClick }: FeatureGridProps) {
  const features = [
    { icon: BookOpen, label: 'Quran', color: 'text-emerald-400', id: 'quran' },
    { icon: Sparkles, label: 'Tasbih', color: 'text-amber-400', id: 'tasbih' },
    { icon: Moon, label: 'Ramadan', color: 'text-yellow-300', id: 'ramadan' },
    { icon: Heart, label: 'Dua', color: 'text-rose-400', id: 'dua' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature) => (
        <button
          key={feature.label}
          onClick={() => onFeatureClick(feature.id)}
          className="neumorphic-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 border border-emerald-900/30"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 neumorphic-icon-small rounded-full flex items-center justify-center">
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <span className="text-emerald-100">{feature.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}