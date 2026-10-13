import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Volume2,
  VolumeX,
  PhoneCall,
  Leaf,
  CheckCircle2,
  Share2,
  Printer,
  HeartHandshake,
  Send,
} from 'lucide-react';
import { GreenGuruDiagnosis, Language } from '../types/greenguru';
import { RemedyCard } from './RemedyCard';

interface DiagnosisResultProps {
  diagnosis: GreenGuruDiagnosis;
  language: Language;
  onAnswerClarification: (answer: string) => void;
  onOpenKVK: () => void;
  onOpenSafety: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  diagnosis,
  language,
  onAnswerClarification,
  onOpenKVK,
  onOpenSafety,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [clarificationInput, setClarificationInput] = useState('');

  const t = {
    en: {
      diagnosisHeader: 'GreenGuru Plant Diagnosis',
      likelyIssue: 'Identified Pest / Disease:',
      severityMild: 'Mild Issue',
      severityModerate: 'Moderate Infestation',
      severitySevere: 'Severe Outbreak - Urgent Care',
      clarificationTitle: 'GreenGuru Clarification Question',
      clarificationSub: 'To give you the most accurate tailored cure, answer this short question:',
      clarificationPlaceholder: 'Type your answer here...',
      sendAnswer: 'Submit Detail',
      remediesTitle: 'Recommended Natural & Household Remedies',
      safetyTitle: 'Critical Safety Precautions',
      preventionTitle: 'Organic Prevention & Soil Care',
      kvkBannerTitle: 'Critical Notice: Consult Local Agriculture Officer / KVK',
      listenAudio: 'Listen to GreenGuru Advice',
      stopAudio: 'Stop Audio',
      printBtn: 'Print / Save Report',
    },
    hi: {
      diagnosisHeader: 'GreenGuru पौधा निदान रिपोर्ट',
      likelyIssue: 'पहचाना गया कीट / रोग:',
      severityMild: 'हल्का प्रभाव',
      severityModerate: 'मध्यम प्रकोप',
      severitySevere: 'गंभीर रोग - तुरंत ध्यान दें',
      clarificationTitle: 'GreenGuru का एक छोटा स्पष्टीकरण प्रश्न',
      clarificationSub: 'अधिक सटीक घरेलू नुस्खे के लिए, कृपया इस प्रश्न का उत्तर दें:',
      clarificationPlaceholder: 'यहाँ अपना उत्तर लिखें...',
      sendAnswer: 'उत्तर भेजें',
      remediesTitle: 'प्राकृतिक एवं घरेलू उपचार (विधि व मात्रा)',
      safetyTitle: 'अति आवश्यक सुरक्षा सावधानियाँ',
      preventionTitle: 'जैविक रोकथाम एवं मिट्टी की देखभाल',
      kvkBannerTitle: 'विशेष सूचना: स्थानीय कृषि विज्ञान केंद्र (KVK) से संपर्क करें',
      listenAudio: 'GreenGuru की सलाह सुनें',
      stopAudio: 'आवाज रोकें',
      printBtn: 'रिपोर्ट प्रिंट / सहेजें',
    },
    te: {
      diagnosisHeader: 'GreenGuru మొక్కల రోగ నిర్ధారణ నివేదిక',
      likelyIssue: 'గుర్తించిన పురుగు / తెగులు:',
      severityMild: 'స్వల్ప ప్రభావం',
      severityModerate: 'మధ్యస్థ తెగులు',
      severitySevere: 'తీవ్రమైన తెగులు - వెంటనే రక్షించండి',
      clarificationTitle: 'GreenGuru అడిగిన చిన్న ప్రశ్న',
      clarificationSub: 'మరింత కచ్చితమైన సహజ నివారణ కొరకు, దయచేసి ఈ ప్రశ్నకు సమాధానం ఇవ్వండి:',
      clarificationPlaceholder: 'మీ సమాధానం ఇక్కడ టైప్ చేయండి...',
      sendAnswer: 'సమాధానం పంపండి',
      remediesTitle: 'సిఫార్సు చేసిన సహజ మరియు వంటింటి కషాయాలు',
      safetyTitle: 'ముఖ్యమైన భద్రతా జాగ్రత్తలు',
      preventionTitle: 'సేంద్రియ నివారణ & నేల సంరక్షణ చిట్కాలు',
      kvkBannerTitle: 'ముఖ్య గమనిక: కృషి విజ్ఞాన కేంద్రం (KVK) నిపుణులను సంప్రదించండి',
      listenAudio: 'సలహాను వినండి',
      stopAudio: 'ఆపండి',
      printBtn: 'నివేదికను ప్రింట్ చేయండి',
    },
  }[language];

  const handleAudioToggle = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = `${diagnosis.identification.issueName}. ${diagnosis.friendlySummary}. ${diagnosis.remedies.map(r => `${r.name}. ${r.whenToApply}`).join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (language === 'te') {
      utterance.lang = 'te-IN';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const getSeverityBadge = () => {
    const sev = diagnosis.identification.severity;
    if (sev === 'severe') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          {t.severitySevere}
        </span>
      );
    }
    if (sev === 'moderate') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          {t.severityModerate}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        {t.severityMild}
      </span>
    );
  };

  const handleClarificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationInput.trim()) return;
    onAnswerClarification(clarificationInput.trim());
    setClarificationInput('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Friendly summary and audio/print toolbar */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-emerald-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-5 h-5 text-lime-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-lime-100">
                {t.diagnosisHeader}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
              {diagnosis.friendlySummary}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            {/* Audio narration */}
            <button
              onClick={handleAudioToggle}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isPlayingAudio
                  ? 'bg-amber-400 text-amber-950 animate-pulse font-bold'
                  : 'bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{t.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>{t.listenAudio}</span>
                </>
              )}
            </button>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-emerald-800/70 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/60 transition-colors"
              title={t.printBtn}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary Identification Box */}
        <div className="pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-lime-300">
              {t.likelyIssue}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5 font-serif-display">
              {diagnosis.identification.issueName}
            </h3>
            {diagnosis.identification.scientificOrCommonNote && (
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                {diagnosis.identification.scientificOrCommonNote}
              </p>
            )}
          </div>
          <div>{getSeverityBadge()}</div>
        </div>
      </div>

      {/* CLARIFICATION QUESTION (Rule #1: Ask ONE short question while giving a first suggestion) */}
      {diagnosis.identification.clarificationQuestion && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-200/80 text-amber-900 rounded-2xl shrink-0">
              <HelpCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-amber-950">
                {t.clarificationTitle}
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">{t.clarificationSub}</p>

              <div className="mt-3 p-3.5 bg-white/90 rounded-2xl border border-amber-200 text-amber-950 font-medium text-sm">
                "{diagnosis.identification.clarificationQuestion}"
              </div>

              <form
                onSubmit={handleClarificationSubmit}
                className="mt-3.5 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="text"
                  value={clarificationInput}
                  onChange={(e) => setClarificationInput(e.target.value)}
                  placeholder={t.clarificationPlaceholder}
                  className="flex-1 px-4 py-2.5 bg-white rounded-xl border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-emerald-950"
                />
                <button
                  type="submit"
                  disabled={!clarificationInput.trim()}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendAnswer}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* KVK Alert Notice if Severe / Spreading Fast */}
      {(diagnosis.kvkAlert?.isNeeded ||
        diagnosis.identification.severity === 'severe') && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-rose-200 text-rose-800 rounded-2xl shrink-0">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-bold text-rose-950 text-base">{t.kvkBannerTitle}</h4>
              <p className="text-xs text-rose-800 mt-1 max-w-xl">
                {diagnosis.kvkAlert?.message ||
                  'This condition appears rapidly spreading or viral. Isolate the affected plant and call the Kisan Call Centre at 1800-180-1551.'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenKVK}
            className="px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap shadow-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>KVK Helpline Details</span>
          </button>
        </div>
      )}

      {/* REMEDIES LIST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold font-serif-display text-emerald-950">
              {t.remediesTitle}
            </h3>
          </div>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {diagnosis.remedies.length} Prescribed Formulas
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {diagnosis.remedies.map((remedy, idx) => (
            <RemedyCard key={idx} remedy={remedy} index={idx} />
          ))}
        </div>
      </div>

      {/* CRITICAL SAFETY NOTES */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-lime-100 text-emerald-900">
              <ShieldAlert className="w-5 h-5 text-emerald-700" />
            </span>
            <h3 className="text-lg font-bold text-emerald-950">{t.safetyTitle}</h3>
          </div>
          <button
            onClick={onOpenSafety}
            className="text-xs text-emerald-700 font-bold hover:underline"
          >
            View Full Principles &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {diagnosis.safetyNotes.map((note, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span className="leading-relaxed font-medium">{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PREVENTION & SOIL CARE */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50/60 rounded-3xl p-6 border-2 border-teal-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 rounded-xl bg-teal-200/70 text-teal-900">
            <HeartHandshake className="w-5 h-5" />
          </span>
          <h3 className="text-lg font-bold text-emerald-950">{t.preventionTitle}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {diagnosis.preventionTips.map((tip, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/90 border border-teal-200/80 flex flex-col justify-between shadow-2xs"
            >
              <div className="flex items-start gap-2 mb-2">
                <Leaf className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                  Organic Tip #{i + 1}
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
