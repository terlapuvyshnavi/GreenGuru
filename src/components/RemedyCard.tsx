import React, { useState } from 'react';
import { Beaker, Clock, Calendar, Check, Copy, Sparkles, AlertCircle } from 'lucide-react';
import { Remedy } from '../types/greenguru';

interface RemedyCardProps {
  remedy: Remedy;
  index: number;
}

export const RemedyCard: React.FC<RemedyCardProps> = ({ remedy, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `🌿 ${remedy.name}\n\n📋 Ingredients:\n${remedy.ingredients.map(i => `• ${i}`).join('\n')}\n\n🥣 Preparation:\n${remedy.preparationSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n🎯 How to Apply: ${remedy.howToApply}\n⏰ When: ${remedy.whenToApply}\n📅 Frequency: ${remedy.frequency}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeBadge = (type?: string) => {
    switch (type) {
      case 'kitchen_scrap':
        return { label: 'Kitchen Scrap Remedy', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'herbal':
        return { label: 'Herbal Botanical Extract', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'mineral':
        return { label: 'Natural Mineral / Ash', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
      default:
        return { label: 'Natural Organic Remedy', bg: 'bg-lime-100 text-lime-800 border-lime-300' };
    }
  };

  const badge = getTypeBadge(remedy.type);

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 shadow-sm transition-all overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/70 to-teal-50/40 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {index + 1}
          </span>
          <div>
            <h3 className="font-bold text-emerald-950 text-base sm:text-lg">
              {remedy.name}
            </h3>
            <span
              className={`inline-block mt-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}
            >
              {badge.label}
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="self-end sm:self-auto px-3 py-1.5 rounded-xl text-xs font-medium bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1.5 shadow-2xs"
          title="Copy Recipe"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied Recipe</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Recipe</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-4 text-emerald-950 text-xs sm:text-sm">
        {/* Ingredients */}
        <div>
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-2">
            <Beaker className="w-4 h-4 text-emerald-700" />
            <span>Ingredients & Precise Quantities:</span>
          </div>
          <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100 space-y-1.5">
            {remedy.ingredients.map((ing, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span className="font-medium text-emerald-950">{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Steps */}
        <div>
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Preparation Steps:</span>
          </div>
          <div className="space-y-1.5 pl-1">
            {remedy.preparationSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-emerald-900 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application & Timing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-emerald-100">
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
              How to Apply:
            </span>
            <p className="text-gray-900 font-medium text-xs leading-relaxed">
              {remedy.howToApply}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-0.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>When to Apply (Evening Rule):</span>
            </div>
            <p className="text-amber-950 font-medium text-xs leading-relaxed">
              {remedy.whenToApply}
            </p>
          </div>
        </div>

        {/* Frequency */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs font-semibold text-emerald-900">
          <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Frequency:</span>
          <span className="font-bold text-emerald-950">{remedy.frequency}</span>
        </div>
      </div>
    </div>
  );
};
