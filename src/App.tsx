import React, { useState } from 'react';
import { Header } from './components/Header';
import { Diagnostician } from './components/Diagnostician';
import { DiagnosisResult } from './components/DiagnosisResult';
import { RemedyPharmacy } from './components/RemedyPharmacy';
import { SafetyGuidelinesModal } from './components/SafetyGuidelinesModal';
import { KVKModal } from './components/KVKModal';
import { PromptModal } from './components/PromptModal';
import { Language, GreenGuruDiagnosis, ChatMessage } from './types/greenguru';
import {
  Leaf,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  SunDim,
  Beaker,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'diagnose' | 'library'>('diagnose');
  const [latestDiagnosis, setLatestDiagnosis] = useState<GreenGuruDiagnosis | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [isKVKOpen, setIsKVKOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // Diagnose plant problem via API
  const handleDiagnose = async (prompt: string, imageBase64?: string, mimeType?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          imageBase64,
          mimeType,
          language: currentLanguage,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to analyze plant problem.');
      }

      setLatestDiagnosis(result.data);

      // Add to conversation history
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: prompt || 'Attached plant photo for diagnosis.',
        image: imageBase64,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.data.friendlySummary,
        diagnosisData: result.data,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, userMsg, botMsg]);
    } catch (err: any) {
      console.error('Diagnosis error:', err);
      setError(err?.message || 'Something went wrong while connecting with GreenGuru. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick symptom click
  const handleSelectQuickSymptom = (symptomPrompt: string) => {
    handleDiagnose(symptomPrompt);
  };

  // Follow-up message in chat
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const formattedMessages = [...chatHistory, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedMessages,
          language: currentLanguage,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to send message.');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: resData.data.friendlySummary || 'GreenGuru advice provided.',
        diagnosisData: resData.data,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, botMsg]);

      // If response includes updated remedies or diagnosis, update current view
      if (resData.data.remedies && resData.data.remedies.length > 0) {
        setLatestDiagnosis(resData.data);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err?.message || 'Could not send message.');
    } finally {
      setIsLoading(false);
    }
  };

  // Answer GreenGuru's 1-question clarification
  const handleAnswerClarification = (answer: string) => {
    const fullClarificationPrompt = `Regarding your question "${latestDiagnosis?.identification.clarificationQuestion}": ${answer}. Please update your organic remedy and advice accordingly.`;
    handleSendMessage(fullClarificationPrompt);
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] text-emerald-950 flex flex-col font-sans selection:bg-lime-200 selection:text-emerald-950">
      {/* Top Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenKVK={() => setIsKVKOpen(true)}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenLibrary={() => setActiveTab('library')}
        onOpenPrompt={() => setIsPromptOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 flex items-start gap-3 text-sm shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Notice from GreenGuru:</p>
              <p className="text-xs text-rose-800 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-bold text-rose-700 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View Switch */}
        {activeTab === 'library' ? (
          <RemedyPharmacy language={currentLanguage} />
        ) : (
          <div className="space-y-8">
            {/* Consultation Intake Form */}
            <Diagnostician
              language={currentLanguage}
              onDiagnose={handleDiagnose}
              isLoading={isLoading}
              onSelectQuickSymptom={handleSelectQuickSymptom}
              chatHistory={chatHistory}
              onSendMessage={handleSendMessage}
            />

            {/* Display Active Diagnosis Results if available */}
            {latestDiagnosis && (
              <DiagnosisResult
                diagnosis={latestDiagnosis}
                language={currentLanguage}
                onAnswerClarification={handleAnswerClarification}
                onOpenKVK={() => setIsKVKOpen(true)}
                onOpenSafety={() => setIsSafetyOpen(true)}
              />
            )}

            {/* Welcome Organic Guide cards if no diagnosis yet */}
            {!latestDiagnosis && !isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                      <Beaker className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h3 className="font-bold text-emerald-950 text-base mb-1">
                      Kitchen Scrap & Household Remedies
                    </h3>
                    <p className="text-xs text-emerald-800/80 leading-relaxed">
                      Every prescription uses accessible, non-toxic household waste: neem oil, wood ash, sour buttermilk, garlic-chilli extracts, and mild soap. No expensive synthetic chemicals.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-50 text-[11px] font-semibold text-emerald-700">
                    Exact quantities provided
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                      <SunDim className="w-5 h-5 text-amber-700" />
                    </div>
                    <h3 className="font-bold text-emerald-950 text-base mb-1">
                      The Evening Spray & Leaf Test Rule
                    </h3>
                    <p className="text-xs text-emerald-800/80 leading-relaxed">
                      Never spray in hot sun. Spraying after 5:00 PM prevents leaf burn and protects friendly pollinating bees. Always test on one leaf 24 hours prior.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-50 text-[11px] font-semibold text-amber-800">
                    Pollinator & foliage safety
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-5 h-5 text-rose-700" />
                    </div>
                    <h3 className="font-bold text-emerald-950 text-base mb-1">
                      Zero Human Waste & KVK Escalation
                    </h3>
                    <p className="text-xs text-emerald-800/80 leading-relaxed">
                      We strictly forbid raw human excreta. For rapid fungal outbreaks or viral diseases, we guide you to your local Krishi Vigyan Kendra (KVK 1800-180-1551).
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-50 text-[11px] font-semibold text-rose-800">
                    Scientific & hygienic standards
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-emerald-950 text-emerald-200/80 border-t border-emerald-900 text-xs py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-lime-400" />
            <span className="font-bold text-white font-serif-display text-sm">
              GreenGuru
            </span>
            <span className="text-emerald-400">|</span>
            <span>Organic Home Gardening & Nursery Care</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsPromptOpen(true)}
              className="text-lime-400 hover:text-lime-300 transition-colors font-mono font-medium"
            >
              {'</>'} System Prompt
            </button>
            <span className="text-emerald-700">•</span>
            <button
              onClick={() => setIsSafetyOpen(true)}
              className="hover:text-white transition-colors"
            >
              Organic Safety Code
            </button>
            <span className="text-emerald-700">•</span>
            <button
              onClick={() => setIsKVKOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Kisan Helpline: 1800-180-1551
            </button>
          </div>
        </div>
      </footer>

      {/* Safety Modal */}
      <SafetyGuidelinesModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
        language={currentLanguage}
      />

      {/* KVK Modal */}
      <KVKModal
        isOpen={isKVKOpen}
        onClose={() => setIsKVKOpen(false)}
        language={currentLanguage}
      />

      {/* System Prompt Modal */}
      <PromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
      />
    </div>
  );
}
