import React, { useState } from 'react';
import { Search, Sparkles, Filter, Leaf, Beaker, Clock, ShieldCheck, Copy, Check } from 'lucide-react';
import { ORGANIC_REMEDY_LIBRARY, OrganicRemedyCard } from '../data/organicRemedies';
import { Language } from '../types/greenguru';

interface RemedyPharmacyProps {
  language: Language;
}

export const RemedyPharmacy: React.FC<RemedyPharmacyProps> = ({ language }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = {
    en: {
      title: 'GreenGuru Botanical Remedy Pantry',
      subtitle: 'Time-tested natural, non-toxic recipes for organic gardeners and nurseries',
      all: 'All Remedies',
      pest: 'Pest Repellents',
      fungicide: 'Bio-Fungicides',
      soil: 'Soil & Microbes',
      companion: 'Companion Plants',
      searchPlaceholder: 'Search by ingredient (neem, garlic, ash, curd, baking soda)...',
      noResults: 'No remedies found matching your search.',
      ingredients: 'Ingredients & Precise Quantities:',
      preparation: 'Preparation Steps:',
      howToApply: 'Application:',
      whenToApply: 'Best Timing:',
      frequency: 'Frequency:',
      copyRecipe: 'Copy Recipe',
      copied: 'Copied!',
    },
    hi: {
      title: 'GreenGuru घरेलू जैविक नुस्खे भंडार',
      subtitle: 'रसोई और बागवानी के प्राकृतिक, विषमुक्त काढ़े और खाद',
      all: 'सभी नुस्खे',
      pest: 'कीट नाशक',
      fungicide: 'फफूंद नाशक',
      soil: 'मिट्टी व जीवाणु',
      companion: 'सहजीवी पौधे',
      searchPlaceholder: 'सामग्री से खोजें (नीम, लहसुन, राख, छाछ, बेकिंग सोडा)...',
      noResults: 'आपकी खोज के अनुसार कोई नुस्खा नहीं मिला।',
      ingredients: 'सामग्री और सही मात्रा:',
      preparation: 'बनाने की विधि:',
      howToApply: 'छिड़काव का तरीका:',
      whenToApply: 'सही समय:',
      frequency: 'कितनी बार:',
      copyRecipe: 'नुस्खा कॉपी करें',
      copied: 'कॉपी हो गया!',
    },
    te: {
      title: 'GreenGuru సేంద్రియ కషాయాల నిధి',
      subtitle: 'ఇంటి తోటల కోసం విషరహిత వంటింటి చిట్కాలు మరియు సహజ ఎరువులు',
      all: 'అన్ని కషాయాలు',
      pest: 'పురుగుల మందులు',
      fungicide: 'శిలీంద్ర నాశిని',
      soil: 'నేల & జీవామృతం',
      companion: 'తోడు మొక్కలు',
      searchPlaceholder: 'పదార్థాలతో వెతకండి (వేప, వెల్లుల్లి, బూడిద, మజ్జిగ, సోడా)...',
      noResults: 'మీ శోధనకు తగిన కషాయాలు లభించలేదు.',
      ingredients: 'కావలసిన పదార్థాలు & కొలతలు:',
      preparation: 'తయారీ విధానం:',
      howToApply: 'చల్లే విధానం:',
      whenToApply: 'అనువైన సమయం:',
      frequency: 'ఎన్ని రోజులకు ఒకసారి:',
      copyRecipe: 'కాపీ చేయండి',
      copied: 'కాపీ అయ్యింది!',
    },
  }[language];

  const getRemedyName = (item: OrganicRemedyCard) => {
    if (language === 'hi') return item.nameHi;
    if (language === 'te') return item.nameTe;
    return item.nameEn;
  };

  const filteredRemedies = ORGANIC_REMEDY_LIBRARY.filter((item) => {
    const matchesCategory =
      filterCategory === 'all' ||
      (filterCategory === 'pest' && item.category === 'pest_control') ||
      (filterCategory === 'fungicide' && item.category === 'fungicide') ||
      (filterCategory === 'soil' && item.category === 'soil_booster') ||
      (filterCategory === 'companion' && item.category === 'companion');

    const name = getRemedyName(item).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      name.includes(query) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(query)) ||
      item.targets.some((target) => target.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleCopy = (item: OrganicRemedyCard) => {
    const text = `🌿 ${getRemedyName(item)}\n\n📋 Ingredients:\n${item.ingredients.map(i => `• ${i}`).join('\n')}\n\n🥣 Preparation:\n${item.preparation.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n🎯 Application: ${item.application}\n⏰ Timing: ${item.whenToApply}\n📅 Frequency: ${item.frequency}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-lime-500/20 text-lime-400 border border-lime-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-lime-300">
              Standard Verified Recipes
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-display text-white">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Search bar */}
        <div className="mt-6 relative max-w-xl">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-emerald-950/80 rounded-2xl border border-emerald-700/80 text-white placeholder-emerald-400/70 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Filter categories */}
        <div className="flex items-center flex-wrap gap-2 mt-4 pt-4 border-t border-emerald-800/60">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === 'all'
                ? 'bg-lime-500 text-emerald-950 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
            }`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setFilterCategory('pest')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === 'pest'
                ? 'bg-lime-500 text-emerald-950 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
            }`}
          >
            {t.pest}
          </button>
          <button
            onClick={() => setFilterCategory('fungicide')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === 'fungicide'
                ? 'bg-lime-500 text-emerald-950 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
            }`}
          >
            {t.fungicide}
          </button>
          <button
            onClick={() => setFilterCategory('soil')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === 'soil'
                ? 'bg-lime-500 text-emerald-950 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
            }`}
          >
            {t.soil}
          </button>
          <button
            onClick={() => setFilterCategory('companion')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === 'companion'
                ? 'bg-lime-500 text-emerald-950 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
            }`}
          >
            {t.companion}
          </button>
        </div>
      </div>

      {/* Grid of recipe cards */}
      {filteredRemedies.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-emerald-100 text-emerald-800">
          <p>{t.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRemedies.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border-2 border-emerald-100 hover:border-emerald-300 shadow-sm transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.badge}
                  </span>
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1 text-xs"
                    title={t.copyRecipe}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[11px] font-semibold">{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">{t.copyRecipe}</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-xl font-bold font-serif-display text-emerald-950 mb-3">
                  {getRemedyName(item)}
                </h3>

                {/* Targets */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.targets.map((tgt, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-lime-50 text-emerald-900 border border-lime-200"
                    >
                      ✓ {tgt}
                    </span>
                  ))}
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Beaker className="w-3.5 h-3.5 text-emerald-700" />
                    {t.ingredients}
                  </h4>
                  <ul className="space-y-1.5 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100 text-xs text-emerald-950">
                    {item.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation steps */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                    {t.preparation}
                  </h4>
                  <ol className="space-y-1.5 text-xs text-emerald-900">
                    {item.preparation.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-700 shrink-0">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Application footer */}
              <div className="pt-4 border-t border-emerald-100 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="font-bold text-gray-700">{t.howToApply} </span>
                  <span className="text-gray-900">{item.application}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                    <span className="font-bold">{t.whenToApply} </span>
                    <span>{item.whenToApply}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-950 font-medium">
                    <span className="font-bold">{t.frequency} </span>
                    <span>{item.frequency}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
