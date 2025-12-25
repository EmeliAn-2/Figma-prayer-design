import { useState } from 'react';
import { Heart, Search, ChevronDown, ChevronUp, BookmarkPlus, Star } from 'lucide-react';

interface DuaItem {
  id: number;
  title: string;
  titleArabic: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  category: string;
  isFavorite?: boolean;
}

export function Dua() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [duas, setDuas] = useState<DuaItem[]>([
    {
      id: 1,
      title: 'Morning Dua',
      titleArabic: 'دعاء الصباح',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      transliteration: 'Aṣbaḥnā wa aṣbaḥa al-mulku lillāh, wa al-ḥamdu lillāh',
      translation: 'We have entered the morning and the whole universe belongs to Allah, and all praise is for Allah.',
      reference: 'Muslim',
      category: 'Morning/Evening',
    },
    {
      id: 2,
      title: 'Evening Dua',
      titleArabic: 'دعاء المساء',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      transliteration: 'Amsaynā wa amsā al-mulku lillāh, wa al-ḥamdu lillāh',
      translation: 'We have entered the evening and the whole universe belongs to Allah, and all praise is for Allah.',
      reference: 'Muslim',
      category: 'Morning/Evening',
    },
    {
      id: 3,
      title: 'Before Eating',
      titleArabic: 'دعاء قبل الطعام',
      arabic: 'بِسْمِ اللَّهِ',
      transliteration: 'Bismillāh',
      translation: 'In the name of Allah.',
      reference: 'Abu Dawud, Tirmidhi',
      category: 'Daily Life',
    },
    {
      id: 4,
      title: 'After Eating',
      titleArabic: 'دعاء بعد الطعام',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      transliteration: 'Alḥamdu lillāhi alladhī aṭʿamanā wa saqānā wa jaʿalanā muslimīn',
      translation: 'All praise is due to Allah who fed us, gave us drink, and made us Muslims.',
      reference: 'Abu Dawud, Tirmidhi',
      category: 'Daily Life',
    },
    {
      id: 5,
      title: 'Entering Home',
      titleArabic: 'دعاء دخول المنزل',
      arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      transliteration: 'Bismillāhi walajna, wa bismillāhi kharajna, wa ʿalā allāhi rabbinā tawakkalnā',
      translation: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we place our trust.',
      reference: 'Abu Dawud',
      category: 'Daily Life',
    },
    {
      id: 6,
      title: 'For Protection',
      titleArabic: 'دعاء الحفظ',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      transliteration: 'Aʿūdhu bi-kalimāti allāhi at-tāmmāti min sharri mā khalaq',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
      reference: 'Muslim',
      category: 'Protection',
    },
    {
      id: 7,
      title: 'When Distressed',
      titleArabic: 'دعاء الكرب',
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ',
      transliteration: 'Lā ilāha illā allāhu al-ʿaẓīmu al-ḥalīm, lā ilāha illā allāhu rabbu al-ʿarshi al-ʿaẓīm',
      translation: 'There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Mighty Throne.',
      reference: 'Bukhari, Muslim',
      category: 'Difficult Times',
    },
    {
      id: 8,
      title: 'For Forgiveness',
      titleArabic: 'سيد الاستغفار',
      arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ',
      transliteration: 'Allāhumma anta rabbī lā ilāha illā ant, khalaqtanī wa anā ʿabduk',
      translation: 'O Allah, You are my Lord. There is no god but You. You created me and I am Your servant.',
      reference: 'Bukhari',
      category: 'Repentance',
    },
    {
      id: 9,
      title: 'Before Sleep',
      titleArabic: 'دعاء النوم',
      arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      transliteration: 'Bismika allāhumma amūtu wa aḥyā',
      translation: 'In Your name, O Allah, I die and I live.',
      reference: 'Bukhari',
      category: 'Sleep',
    },
    {
      id: 10,
      title: 'Waking Up',
      titleArabic: 'دعاء الاستيقاظ',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      transliteration: 'Alḥamdu lillāhi alladhī aḥyānā baʿda mā amātanā wa ilayhi an-nushūr',
      translation: 'All praise is for Allah who gave us life after causing us to die, and to Him is the resurrection.',
      reference: 'Bukhari',
      category: 'Morning/Evening',
    },
  ]);

  const categories = ['All', 'Morning/Evening', 'Daily Life', 'Protection', 'Difficult Times', 'Repentance', 'Sleep'];

  const toggleFavorite = (id: number) => {
    setDuas(duas.map(dua => 
      dua.id === id ? { ...dua, isFavorite: !dua.isFavorite } : dua
    ));
  };

  const filteredDuas = duas.filter(dua => {
    const matchesCategory = selectedCategory === 'All' || dua.category === selectedCategory;
    const matchesSearch = 
      dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="islamic-pattern-divider mb-3"></div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
          Duas & Supplications
        </h2>
        <p className="text-emerald-200/60 text-sm mt-1">أدعية</p>
        <div className="islamic-pattern-divider mt-3"></div>
      </div>

      {/* Search Bar */}
      <div className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
          <input
            type="text"
            placeholder="Search duas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none pl-12 pr-4 py-3 text-emerald-100 placeholder-emerald-400/40"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                : 'neumorphic-icon-small text-emerald-400/60 hover:text-emerald-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Duas List */}
      <div className="space-y-4">
        {filteredDuas.length === 0 ? (
          <div className="neumorphic-card p-8 rounded-3xl text-center border border-emerald-900/30">
            <p className="text-emerald-200/60">No duas found</p>
          </div>
        ) : (
          filteredDuas.map((dua) => (
            <div
              key={dua.id}
              className="neumorphic-card p-4 rounded-3xl border border-emerald-900/30"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-emerald-100 mb-1">{dua.title}</h3>
                  <p className="text-amber-300 text-sm">{dua.titleArabic}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                    {dua.category}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(dua.id)}
                  className="w-10 h-10 neumorphic-icon-small rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      dua.isFavorite ? 'fill-rose-400 text-rose-400' : 'text-emerald-400'
                    }`}
                  />
                </button>
              </div>

              {/* Arabic Text */}
              <div className="neumorphic-time-display p-4 rounded-2xl mb-3 text-center">
                <p className="text-2xl text-amber-200 leading-relaxed" dir="rtl">
                  {dua.arabic}
                </p>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => setExpandedId(expandedId === dua.id ? null : dua.id)}
                className="w-full flex items-center justify-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-3"
              >
                <span className="text-sm">
                  {expandedId === dua.id ? 'Show less' : 'Show translation'}
                </span>
                {expandedId === dua.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Expanded Content */}
              {expandedId === dua.id && (
                <div className="space-y-3 border-t border-emerald-800/30 pt-3">
                  {/* Transliteration */}
                  <div>
                    <p className="text-xs text-emerald-200/50 mb-1">Transliteration:</p>
                    <p className="text-emerald-300 italic">{dua.transliteration}</p>
                  </div>

                  {/* Translation */}
                  <div>
                    <p className="text-xs text-emerald-200/50 mb-1">Translation:</p>
                    <p className="text-emerald-200">{dua.translation}</p>
                  </div>

                  {/* Reference */}
                  <div className="flex items-center gap-2">
                    <BookmarkPlus className="w-4 h-4 text-amber-400" />
                    <p className="text-xs text-emerald-400/60">Reference: {dua.reference}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Info Card */}
      <div className="neumorphic-card p-6 rounded-3xl border border-emerald-900/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 neumorphic-icon-small rounded-full flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-emerald-100 mb-2">About Duas</h3>
            <p className="text-emerald-200/60 text-sm leading-relaxed">
              Make dua with sincerity and certainty. The Prophet ﷺ said: "Make dua to Allah with certainty that He will answer you." (Tirmidhi)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
