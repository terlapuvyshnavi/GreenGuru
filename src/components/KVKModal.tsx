import React from 'react';
import { X, PhoneCall, Building2, AlertTriangle, CheckCircle2, MapPin } from 'lucide-react';
import { Language } from '../types/greenguru';

interface KVKModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const KVKModal: React.FC<KVKModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const content = {
    en: {
      title: 'Krishi Vigyan Kendra (KVK) & Agriculture Expert Support',
      subtitle: 'When plant problems are severe, contagious, or spreading uncontrollably',
      helplineTitle: 'All-India Kisan Call Centre (Toll-Free)',
      helplineNumber: '1800-180-1551',
      helplineHours: 'Available 6:00 AM to 10:00 PM (All 7 Days) in 22 regional languages',
      whenToEscalate: 'When Should You Contact KVK / Agriculture Officer?',
      symptomsList: [
        'Sudden bacterial wilt where the entire plant collapses overnight without yellowing.',
        'Viral mosaic diseases (severe yellow mottling with distorted dwarf shoots) spreading to nearby beds.',
        'Root-knot nematodes or widespread root rot affecting over 50% of your crop.',
        'Unknown invasive caterpillar or borer outbreak resisting 2 rounds of organic neem sprays.',
      ],
      howToPrepare: 'How to bring your plant sample for diagnosis:',
      prepSteps: [
        'Collect a fresh sample showing both diseased and healthy green tissue.',
        'Place in a clean, dry ziplock bag (do NOT add water or wrap in wet cloth, as it grows mold).',
        'Take photos of the whole plant, the garden bed, and roots if possible.',
        'Tell the scientist what fertilizers, compost, or sprays you previously used.',
      ],
      findLocalKVK: 'Find your nearest district KVK center:',
      kvkWebsite: 'https://kvk.icar.gov.in',
      closeBtn: 'Close Helpline Guide',
    },
    hi: {
      title: 'कृषि विज्ञान केंद्र (KVK) एवं कृषि विशेषज्ञ सहायता',
      subtitle: 'जब पौधों का रोग गंभीर हो या तेजी से फैल रहा हो',
      helplineTitle: 'अखिल भारतीय किसान कॉल सेंटर (टोल-फ्री नंबर)',
      helplineNumber: '1800-180-1551',
      helplineHours: 'सुबह 6:00 से रात 10:00 बजे तक (सप्ताह के सातों दिन) हिंदी व क्षेत्रीय भाषाओं में उपलब्ध',
      whenToEscalate: 'KVK या कृषि अधिकारी से कब संपर्क करें?',
      symptomsList: [
        'बैक्टीरियल विल्ट (उकठा रोग), जहाँ पूरा पौधा रातों-रात हरा का हरा ही मुरझा जाए।',
        'विषाणु जनित मोज़ेक रोग (पत्तियों पर पीली-हरी धारियाँ और छोटे विकृत पत्ते)।',
        'जड़ों में गांठें (नेमाटोड) या 50% से अधिक क्यारियों में जड़ सड़न फैलना।',
        'नीम और घरेलू जैविक काढ़े के 2 छिड़काव के बाद भी कीटों का नियंत्रण न होना।',
      ],
      howToPrepare: 'जाँच के लिए पौधे का नमूना कैसे ले जाएं:',
      prepSteps: [
        'एक ताजा पत्ती/टहनी लें जिसमें रोगग्रस्त और थोड़ा स्वस्थ भाग दोनों हों।',
        'नमूने को एक साफ और सूखे जिपलॉक बैग में रखें (गीले कपड़े में न लपेटें)।',
        'पूरे पौधे और बगीचे की स्पष्ट तस्वीरें अपने फोन में रखें।',
        'वैज्ञानिक को बताएं कि आपने पहले कौन सी खाद या घोल छिड़का है।',
      ],
      findLocalKVK: 'अपने जिले का कृषि विज्ञान केंद्र खोजें:',
      kvkWebsite: 'https://kvk.icar.gov.in',
      closeBtn: 'बंद करें',
    },
    te: {
      title: 'కృషి విజ్ఞాన కేంద్రం (KVK) & వ్యవసాయ విస్తరణ సలహా',
      subtitle: 'మొక్కల తెగులు తీవ్రమైనప్పుడు లేదా వేగంగా వ్యాపిస్తున్నప్పుడు',
      helplineTitle: 'కిసాన్ కాల్ సెంటర్ ఉచిత టోల్-ఫ్రీ నంబర్ (Kisan Helpline)',
      helplineNumber: '1800-180-1551',
      helplineHours: 'ఉదయం 6:00 నుండి రాత్రి 10:00 వరకు (తెలుగుతో సహా 22 భాషలలో అందుబాటులో ఉంది)',
      whenToEscalate: 'ఎప్పుడు వ్యవసాయ అధికారులను లేదా KVK ని సంప్రదించాలి?',
      symptomsList: [
        'రాత్రికి రాత్రే మొక్క ఆకులు పచ్చగా ఉండగానే మొత్తం వాడిపోయి చనిపోవడం (బ్యాక్టీరియల్ విల్ట్).',
        'వైరస్ తెగులు (జెమినీ వైరస్, మొజాయిక్) వల్ల ఆకులు పసుపు-ఆకుపచ్చ చారలతో గిడసబారడం.',
        'వేరు బుడిపెల పురుగులు (Nematodes) లేదా 50% కంటే ఎక్కువ మొక్కల వేర్లు కుళ్లిపోవడం.',
        'రెండు సార్లు వేపనూనె లేదా సహజ కషాయం కొట్టినా తగ్గని తీవ్రమైన పురుగుల దాడి.',
      ],
      howToPrepare: 'నమూనాను ఎలా తీసుకువెళ్లాలి:',
      prepSteps: [
        'తెగులు సోకిన భాగంతో పాటు కొద్దిగా మంచి ఆకు ఉన్న కొమ్మను కత్తిరించండి.',
        'శుభ్రమైన పొడి ప్లాస్టిక్ లేదా జిప్‌లాక్ కవరులో ఉంచండి (తడి బట్టలో చుట్టవద్దు).',
        'మొక్క పూర్తి పరిస్థితిని మీ మొబైల్ ఫోన్‌లో ఫోటో తీసి ఉంచండి.',
        'గతంలో ఏవైనా ఎరువులు లేదా కషాయాలు చల్లి ఉంటే వ్యవసాయ శాస్త్రవేత్తకు వివరించండి.',
      ],
      findLocalKVK: 'మీ జిల్లా సమీప KVK కేంద్రాన్ని తెలుసుకోండి:',
      kvkWebsite: 'https://kvk.icar.gov.in',
      closeBtn: 'మూసివేయండి',
    },
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-100 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-900 to-amber-950 text-white flex items-start justify-between rounded-t-3xl sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-700/60 text-amber-300">
                <Building2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-serif-display">{t.title}</h2>
            </div>
            <p className="text-xs text-amber-200">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-amber-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-emerald-950 text-sm">
          {/* Toll Free Call Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-amber-900 uppercase">
                {t.helplineTitle}
              </span>
              <div className="text-3xl font-extrabold text-amber-950 flex items-center gap-2 tracking-wide font-mono mt-0.5">
                <PhoneCall className="w-6 h-6 text-amber-600 animate-pulse" />
                <span>{t.helplineNumber}</span>
              </div>
              <p className="text-xs text-amber-800 mt-1">{t.helplineHours}</p>
            </div>
            <a
              href={`tel:${t.helplineNumber.replace(/-/g, '')}`}
              className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs shadow-sm flex items-center gap-2 whitespace-nowrap transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Call Toll-Free
            </a>
          </div>

          {/* When to escalate */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <h3 className="font-bold text-amber-950 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              {t.whenToEscalate}
            </h3>
            <ul className="space-y-1.5 text-xs text-amber-900">
              {t.symptomsList.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to prepare sample */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <h3 className="font-bold text-emerald-950 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t.howToPrepare}
            </h3>
            <ul className="space-y-1.5 text-xs text-emerald-900">
              {t.prepSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Online Directory */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{t.findLocalKVK}</span>
            </div>
            <span className="font-semibold text-emerald-700">{t.kvkWebsite}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-50/50 border-t border-amber-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
