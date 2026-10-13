import React from 'react';
import { Leaf, PhoneCall, ShieldCheck, BookOpen, Globe } from 'lucide-react';
import { Language } from '../types/greenguru';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenKVK: () => void;
  onOpenSafety: () => void;
  onOpenLibrary: () => void;
  onOpenPrompt?: () => void;
  activeTab: 'diagnose' | 'library';
  setActiveTab: (tab: 'diagnose' | 'library') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenKVK,
  onOpenSafety,
  onOpenLibrary,
  onOpenPrompt,
  activeTab,
  setActiveTab,
}) => {
  const titles = {
    en: {
      brand: 'GreenGuru',
      subtitle: 'Organic Plant Doctor & Pest Remedy Expert',
      diagnoseTab: 'Plant Doctor',
      libraryTab: 'Remedy Pantry',
      kvkBtn: 'KVK Helpline',
      safetyBtn: 'Organic Safety Rules',
    },
    hi: {
      brand: 'GreenGuru',
      subtitle: 'जैविक पौधा डॉक्टर एवं घरेलू कीट निवारण विशेषज्ञ',
      diagnoseTab: 'पौधा डॉक्टर',
      libraryTab: 'घरेलू नुस्खे',
      kvkBtn: 'कृषि विज्ञान केंद्र (KVK)',
      safetyBtn: 'जैविक सुरक्षा नियम',
    },
    te: {
      brand: 'GreenGuru',
      subtitle: 'సేంద్రియ మొక్కల డాక్టర్ & సహజ తెగుళ్ల నివారణ',
      diagnoseTab: 'మొక్కల డాక్టర్',
      libraryTab: 'సహజ కషాయాలు',
      kvkBtn: 'వ్యవసాయ కేంద్రం (KVK)',
      safetyBtn: 'సేంద్రియ భద్రత',
    },
  };

  const t = titles[currentLanguage];

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md text-emerald-50 border-b border-emerald-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center shadow-md shadow-emerald-950/40 text-emerald-950">
              <Leaf className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white font-serif-display">
                  GreenGuru
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Organic
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Navigation & Language Select */}
          <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-3">
            {/* View Switcher */}
            <div className="bg-emerald-900/80 p-1 rounded-xl flex items-center border border-emerald-700/50">
              <button
                onClick={() => setActiveTab('diagnose')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'diagnose'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {t.diagnoseTab}
              </button>
              <button
                onClick={() => {
                  setActiveTab('library');
                  onOpenLibrary();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'library'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                {t.libraryTab}
              </button>
            </div>

            {/* Safety Rules Modal Trigger */}
            <button
              onClick={onOpenSafety}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 hover:text-emerald-50 text-xs font-medium border border-emerald-700/40 transition-colors flex items-center gap-1.5"
              title="Organic Safety Guidelines"
            >
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span className="hidden md:inline">{t.safetyBtn}</span>
            </button>

            {/* View LLM System Prompt Trigger */}
            {onOpenPrompt && (
              <button
                onClick={onOpenPrompt}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 hover:text-emerald-50 text-xs font-medium border border-emerald-700/40 transition-colors flex items-center gap-1.5"
                title="View GreenGuru System Prompt"
              >
                <span className="text-lime-300 font-mono text-xs font-bold">{'</>'}</span>
                <span className="hidden lg:inline">System Prompt</span>
              </button>
            )}

            {/* KVK Helpline Trigger */}
            <button
              onClick={onOpenKVK}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 hover:text-amber-100 text-xs font-medium border border-amber-700/50 transition-colors flex items-center gap-1.5"
              title="Krishi Vigyan Kendra Helpline"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">{t.kvkBtn}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-emerald-900/80 rounded-xl p-0.5 border border-emerald-700/60">
              <span className="pl-2 pr-1 text-emerald-300">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-lime-500 text-emerald-950 font-bold'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg font-hindi transition-all ${
                  currentLanguage === 'hi'
                    ? 'bg-lime-500 text-emerald-950 font-bold'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onLanguageChange('te')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg font-telugu transition-all ${
                  currentLanguage === 'te'
                    ? 'bg-lime-500 text-emerald-950 font-bold'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
