import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  Send,
  X,
  Sparkles,
  Leaf,
  Loader2,
  RefreshCw,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { Language, GreenGuruDiagnosis, ChatMessage } from '../types/greenguru';
import { COMMON_SYMPTOMS } from '../data/commonProblems';

interface DiagnosticianProps {
  language: Language;
  onDiagnose: (prompt: string, imageBase64?: string, mimeType?: string) => Promise<void>;
  isLoading: boolean;
  onSelectQuickSymptom: (prompt: string) => void;
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
}

export const Diagnostician: React.FC<DiagnosticianProps> = ({
  language,
  onDiagnose,
  isLoading,
  onSelectQuickSymptom,
  chatHistory,
  onSendMessage,
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [isRecording, setIsRecording] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    en: {
      headline: 'Ask GreenGuru: Your Organic Plant Doctor',
      subheadline:
        'Describe plant symptoms or upload a photo of infected leaves, pests, or stems. We prescribe non-toxic kitchen and garden remedies.',
      inputPlaceholder:
        'e.g., White fluffy bugs under hibiscus leaves, or yellow curled leaves on tomato plant...',
      uploadBtn: 'Attach Leaf Photo',
      analyzingText: 'GreenGuru is inspecting the plant & preparing organic remedies...',
      submitBtn: 'Diagnose Organically',
      quickSymptomsTitle: 'Common Plant Issues (1-Click Consultation):',
      dropPrompt: 'Drop your plant leaf photo here...',
      voiceNotSupported: 'Speech recognition is not supported in this browser.',
      conversationTitle: 'Consultation Discussion',
      replyPlaceholder: 'Ask a follow-up question (e.g. How to store the neem spray?)...',
    },
    hi: {
      headline: 'GreenGuru से पूछें: आपका जैविक पौधा डॉक्टर',
      subheadline:
        'रोग के लक्षण बताएं या प्रभावित पत्ती, कीट या तने की फोटो अपलोड करें। हम रसोई व घरेलू चीजों से सुरक्षित जैविक उपचार बताएंगे।',
      inputPlaceholder:
        'उदा: गुड़हल के पत्तों पर सफेद चिपचिपे कीड़े, या मिर्च की पत्तियाँ मुड़ रही हैं...',
      uploadBtn: 'पत्ती की फोटो लगाएं',
      analyzingText: 'GreenGuru पौधे की जाँच कर रहा है और जैविक काढ़ा तैयार कर रहा है...',
      submitBtn: 'जैविक निदान प्राप्त करें',
      quickSymptomsTitle: 'सामान्य पौधों के रोग (एक क्लिक में पूछें):',
      dropPrompt: 'पत्ती की फोटो यहाँ छोड़ें...',
      voiceNotSupported: 'इस ब्राउज़र में आवाज पहचान समर्थित नहीं है।',
      conversationTitle: 'परामर्श चर्चा',
      replyPlaceholder: 'आगे का सवाल पूछें (उदा: क्या इसमें हल्दी मिला सकते हैं?)...',
    },
    te: {
      headline: 'GreenGuru మొక్కల డాక్టర్‌ను అడగండి',
      subheadline:
        'మీ మొక్క లక్షణాలు వివరించండి లేదా ఆకు, పురుగుల ఫోటో అప్‌లోడ్ చేయండి. వంటింటి వ్యర్థాలు మరియు సహజ కషాయాలతో పరిష్కారం పొందండి.',
      inputPlaceholder:
        'ఉదా: మందార ఆకుల వెనుక తెల్లటి పిండి పురుగులు, లేదా మిరప ఆకులు ముడుచుకుపోతున్నాయి...',
      uploadBtn: 'ఆకు ఫోటోను జతచేయండి',
      analyzingText: 'GreenGuru ఆకులను పరిశీలిస్తోంది & సహజ నివారణలను సిద్ధం చేస్తోంది...',
      submitBtn: 'సేంద్రియ పరిష్కారం పొందండి',
      quickSymptomsTitle: 'సాధారణ మొక్కల సమస్యలు (ఒక్క క్లిక్‌తో అడగండి):',
      dropPrompt: 'మొక్క ఫోటోను ఇక్కడ డ్రాప్ చేయండి...',
      voiceNotSupported: 'మీ బ్రౌజర్‌లో వాయిస్ సపోర్ట్ లేదు.',
      conversationTitle: 'సంభాషణ చర్చ',
      replyPlaceholder: 'తదుపరి ప్రశ్న అడగండి (ఉదా: పసుపు కలపవచ్చా? ఎంత మోతాదులో కొట్టాలి?)...',
    },
  }[language];

  // Handle image upload & base64 conversion
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  // Web Speech API Voice Recognition
  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t.voiceNotSupported);
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (language === 'te') {
        recognition.lang = 'te-IN';
      } else {
        recognition.lang = 'en-US';
      }

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !selectedImage) return;
    await onDiagnose(prompt.trim(), selectedImage || undefined, imageMimeType);
    setPrompt('');
  };

  return (
    <div className="space-y-6">
      {/* Consultation Input Container */}
      <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-xl overflow-hidden p-6 sm:p-8">
        <div className="max-w-3xl mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-xl bg-lime-100 text-emerald-800">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-700">
              Diagnostic Intake
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-display text-emerald-950">
            {t.headline}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800/80 mt-1.5 leading-relaxed">
            {t.subheadline}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag & Drop or Text Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 transition-all p-4 ${
              dragActive
                ? 'border-lime-500 bg-lime-50/50'
                : 'border-emerald-200 bg-emerald-50/20 focus-within:border-emerald-500 focus-within:bg-white'
            }`}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.inputPlaceholder}
              rows={3}
              className="w-full bg-transparent resize-none border-none outline-none text-emerald-950 placeholder-emerald-700/50 text-sm leading-relaxed"
            />

            {/* Selected Image Thumbnail preview */}
            {selectedImage && (
              <div className="mt-2 relative inline-block group">
                <img
                  src={selectedImage}
                  alt="Plant symptom preview"
                  className="w-24 h-24 object-cover rounded-xl border-2 border-emerald-400 shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-md transition-colors"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Action Bar inside Input */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-emerald-100">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Camera className="w-4 h-4 text-emerald-700" />
                  <span>{t.uploadBtn}</span>
                </button>

                {/* Voice Input */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900'
                  }`}
                  title="Voice dictation"
                >
                  {isRecording ? (
                    <MicOff className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-emerald-700" />
                  )}
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || (!prompt.trim() && !selectedImage)}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-950/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-lime-300" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-lime-400" />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Loading Banner */}
        {isLoading && (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-lime-50 to-emerald-50 border border-lime-300 flex items-center gap-3 animate-pulse">
            <RefreshCw className="w-5 h-5 text-emerald-700 animate-spin shrink-0" />
            <p className="text-xs sm:text-sm font-semibold text-emerald-950">
              {t.analyzingText}
            </p>
          </div>
        )}

        {/* 1-Click Common Symptoms Chips */}
        <div className="mt-6 pt-6 border-t border-emerald-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
            {t.quickSymptomsTitle}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {COMMON_SYMPTOMS.map((sym) => {
              const langData = sym[language];
              return (
                <button
                  key={sym.id}
                  onClick={() => onSelectQuickSymptom(langData.prompt)}
                  className="p-2.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/90 text-left border border-emerald-200/80 hover:border-emerald-300 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{sym.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 line-clamp-1 group-hover:text-emerald-700">
                      {langData.title}
                    </h4>
                    <p className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                      {langData.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Follow-up Discussion history if any messages */}
      {chatHistory.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-emerald-950 text-sm">
              {t.conversationTitle}
            </h3>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                    🌿
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-lg leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-800 text-white rounded-br-none'
                      : 'bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-bl-none font-medium'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Quick follow-up reply box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem('reply') as HTMLInputElement).value;
              if (input?.trim()) {
                onSendMessage(input.trim());
                e.currentTarget.reset();
              }
            }}
            className="flex gap-2 pt-2"
          >
            <input
              name="reply"
              type="text"
              placeholder={t.replyPlaceholder}
              className="flex-1 px-4 py-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
