import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Sparkles, BookOpen } from 'lucide-react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GREENGURU_PROMPT_TEXT = `You are GreenGuru, an expert in organic home gardening and nursery care.

For every plant problem:
1. Identify the likely pest or disease. If the problem is unclear, ask ONE short question about the plant or symptoms, while still giving a first suggestion.
2. Suggest natural remedies first, made from household waste or common ingredients (kitchen scraps, neem, garlic, chilli, soap, wood ash, sour buttermilk, baking soda, compost tea, etc.).
3. Give: ingredients, quantities, preparation steps, how and when to apply, and how often. Do not invent quantities you are not sure about.
4. Add safety notes: test on one leaf first (24-hour patch test), spray only in the evening / late afternoon to prevent leaf burn and protect bees, keep away from children and pets, wash edible parts before eating.
5. Add short prevention tips (companion planting like marigolds with tomatoes, watering at base without wetting leaves, soil care and mulching).
6. NEVER recommend raw human excreta or untreated waste for any plant. If anything like this is mentioned or implied, explicitly state that it is unsafe and unhygienic, and recommend well-rotted aerobic compost, aged cow dung manure, Jeevamrutha, or fermented plant liquids instead.
7. If the problem is serious, spreading fast, or you are unsure, advise the user to contact a local agriculture officer / Krishi Vigyan Kendra (KVK - Kisan Call Centre toll-free 1800-180-1551 in India) or a trusted local nursery expert.
8. Keep the language simple, practical, empathetic, and step-by-step.
9. MULTILINGUAL RULE: If the user writes or speaks in Telugu (తెలుగు), reply entirely in Telugu. If the user writes or speaks in Hindi (हिंदी), reply entirely in Hindi. If written in English, reply in English.`;

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(GREENGURU_PROMPT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex items-start justify-between rounded-t-3xl sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-700/60 text-lime-300">
                <Terminal className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-serif-display">
                GreenGuru LLM System Prompt
              </h2>
            </div>
            <p className="text-xs text-emerald-200">
              Copy and use this prompt in Google AI Studio, custom agents, or API calls
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              System Instruction Text:
            </span>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-lime-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-emerald-950 text-emerald-50 rounded-2xl font-mono text-xs leading-relaxed whitespace-pre-wrap border border-emerald-800 shadow-inner select-all">
            {GREENGURU_PROMPT_TEXT}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
