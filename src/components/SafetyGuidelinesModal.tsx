import React from 'react';
import { X, ShieldAlert, SunDim, Beaker, Apple, Ban, PhoneCall } from 'lucide-react';
import { Language } from '../types/greenguru';

interface SafetyGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SafetyGuidelinesModal: React.FC<SafetyGuidelinesModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const content = {
    en: {
      title: 'GreenGuru 6 Cardinal Organic Principles',
      subtitle: 'Safe, sustainable, non-toxic plant care for home gardens & nurseries',
      rule1Title: 'NEVER Use Raw Human Waste or Untreated Excreta',
      rule1Desc:
        'Untreated human waste carries dangerous human pathogens, E. coli, Salmonella, and parasitic eggs. GreenGuru strictly prohibits raw human waste. Always use fully cured aerobic hot compost, well-aged cattle manure (rotted 6+ months), or microbial tonics like Jeevamrutha.',
      rule2Title: 'The Evening Spray Rule (After 5:00 PM)',
      rule2Desc:
        'Never spray organic concoctions (especially oil, soap, or chilli sprays) under direct sunshine. Droplets magnify sunlight causing severe leaf scorch. Spraying at dusk also safeguards foraging honeybees and beneficial pollinators who have already returned to their hives.',
      rule3Title: 'Mandatory 24-Hour Leaf Patch Test',
      rule3Desc:
        'Every plant species has different leaf cuticle sensitivity. Always spray a single lower leaf first. Wait 24 hours. If there is no browning, curling, or yellow spotting, proceed with the whole plant.',
      rule4Title: 'Strict Proportions — Never Guess Quantities',
      rule4Desc:
        'Even natural ingredients like neem oil, baking soda, and wood ash can become caustic or raise soil pH if overdosed. Use exact measured amounts (e.g. 5ml neem oil with 2 drops soap per litre of water).',
      rule5Title: 'Wash All Harvests Before Consuming',
      rule5Desc:
        'Organic botanicals like neem oil and chilli extracts leave bitter residues. Always rinse edible leafy greens, chillies, tomatoes, and herbs thoroughly in cold running water before cooking or eating.',
      rule6Title: 'Rapid Outbreaks & KVK Escalation',
      rule6Desc:
        'If an infestation spreads within 48 hours across multiple plants, or shows viral mosaic twisting or sudden systemic bacterial wilt, isolate the plant and consult your local Krishi Vigyan Kendra (KVK) or Agriculture Officer immediately.',
      closeBtn: 'I Understand & Agree',
    },
    hi: {
      title: 'GreenGuru के 6 प्रमुख जैविक सुरक्षा सिद्धांत',
      subtitle: 'घर और नर्सरी के लिए सुरक्षित, विषमुक्त एवं प्राकृतिक बागवानी',
      rule1Title: 'कच्चे मानव मल या अनुपचारित कचरे का प्रयोग कभी न करें',
      rule1Desc:
        'कच्चा मानव अपशिष्ट ई-कोलाई, साल्मोनेला और परजीवी कीटाणु फैलाता है। GreenGuru इसे पूरी तरह वर्जित करता है। केवल अच्छी तरह सड़ी हुई एरोबिक कम्पोस्ट खाद, 6 महीने पुरानी गोबर खाद या जीवामृत का ही उपयोग करें।',
      rule2Title: 'शाम के समय छिड़काव का नियम (शाम 5 बजे के बाद)',
      rule2Desc:
        'कड़क धूप में कभी भी नीम तेल या तीखे काढ़े का छिड़काव न करें। इससे पत्तियाँ झुलस जाती हैं। शाम को छिड़कने से मधुमक्खियों और मित्र कीटों को भी नुकसान नहीं पहुँचता।',
      rule3Title: '24 घंटे का पत्ती पैच टेस्ट अनिवार्य',
      rule3Desc:
        'पूरे पौधे पर छिड़कने से पहले हमेशा नीचे की एक पत्ती पर छिड़क कर 24 घंटे इंतजार करें। यदि पत्ती पर कोई बुरा असर न पड़े, तभी पूरे पौधे पर छिड़कें।',
      rule4Title: 'माप-तोल का सख्त पालन करें',
      rule4Desc:
        'प्राकृतिक चीजें भी ज्यादा होने पर पौधे को नुकसान पहुंचा सकती हैं। बताए गए अनुपात (जैसे 1 लीटर पानी में 5ml नीम का तेल व 2 बूंद हल्का साबुन) का ही पालन करें।',
      rule5Title: 'सब्जियों और फलों को धोकर ही खाएं',
      rule5Desc:
        'नीम और मिर्च के काढ़े का कड़वापन दूर करने के लिए तोड़ने के बाद सब्जियों व पत्तियों को साफ पानी से अच्छी तरह धोएं।',
      rule6Title: 'गंभीर रोग में KVK / कृषि अधिकारी की सलाह',
      rule6Desc:
        'यदि रोग तेजी से फैल रहा हो या पौधा अचानक सूख रहा हो, तो तुरंत स्थानीय कृषि विज्ञान केंद्र (KVK) या विशेषज्ञ से संपर्क करें।',
      closeBtn: 'मैं समझ गया / सहमत हूँ',
    },
    te: {
      title: 'GreenGuru 6 ముఖ్యమైన సేంద్రియ భద్రతా సూత్రాలు',
      subtitle: 'ఇంటి తోటలు మరియు నర్సరీల కొరకు సురక్షితమైన, విషరహిత విధానాలు',
      rule1Title: 'మానవ వ్యర్థాలు లేదా పచ్చి మలమును ఎట్టి పరిస్థితుల్లోనూ వాడరాదు',
      rule1Desc:
        'పచ్చి మానవ వ్యర్థాలలో ప్రమాదకరమైన బ్యాక్టీరియా మరియు క్రిములు ఉంటాయి. GreenGuru దీనిని పూర్తిగా నిషేధిస్తుంది. కేవలం బాగా చివికిన సేంద్రియ కంపోస్ట్, ఆవు పేడ ఎరువు లేదా జీవామృతం మాత్రమే ఉపయోగించాలి.',
      rule2Title: 'సాయంత్రం వేళ మాత్రమే పిచికారీ చేయాలి (5 గంటల తర్వాత)',
      rule2Desc:
        'ఎండ తీవ్రంగా ఉన్నప్పుడు వేపనూనె లేదా ఇతర ద్రావణాలు చల్లకూడదు. ఆకులు మాడిపోతాయి. సాయంత్రం చల్లడం వల్ల తేనెటీగలు మరియు మిత్ర పురుగులకు హాని జరగదు.',
      rule3Title: 'ఒకే ఆకుపై 24 గంటల పరీక్ష (Patch Test)',
      rule3Desc:
        'మొత్తం మొక్కపై పిచికారీ చేసే ముందు కింద ఉన్న ఒకే ఆకుపై కొద్దిగా చల్లి 24 గంటలు గమనించండి. ఆకు మాడకపోతేనే మొత్తం మొక్కపై చల్లండి.',
      rule4Title: 'కొలతలు కచ్చితంగా పాటించండి',
      rule4Desc:
        'సహజ పదార్థాలైనప్పటికీ మోతాదు మించకూడదు (ఉదా: 1 లీటరు నీటికి 5 మి.లీ వేపనూనె, 2 చుక్కల మైల్డ్ లిక్విడ్ సబ్బు మాత్రమే).',
      rule5Title: 'కూరగాయలను శుభ్రంగా కడిగి వాడండి',
      rule5Desc:
        'ఆకుకూరలు, కూరగాయలను కోసిన తర్వాత మంచినీటితో శుభ్రంగా కడిగి మాత్రమే వంటలో వాడండి.',
      rule6Title: 'తీవ్రమైన తెగుళ్లకు KVK వ్యవసాయ కేంద్రం సంప్రదింపు',
      rule6Desc:
        'తెగులు వేగంగా వ్యాపిస్తున్నప్పుడు లేదా మొక్కలు నిలువునా ఎండిపోతున్నప్పుడు వెంటనే స్థానిక కృషి విజ్ఞాన కేంద్రం (KVK) లేదా వ్యవసాయ శాఖ నిపుణులను సంప్రదించండి.',
      closeBtn: 'నేను అర్థం చేసుకున్నాను',
    },
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex items-start justify-between rounded-t-3xl sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-700/60 text-emerald-300">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-serif-display">{t.title}</h2>
            </div>
            <p className="text-xs text-emerald-200">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules Body */}
        <div className="p-6 space-y-4 text-emerald-950 text-sm">
          {/* Rule 1: No Human Waste */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex gap-3.5 items-start">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-xl shrink-0">
              <Ban className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-rose-900 mb-1">{t.rule1Title}</h3>
              <p className="text-rose-800 text-xs leading-relaxed">{t.rule1Desc}</p>
            </div>
          </div>

          {/* Rule 2: Evening Spray */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex gap-3.5 items-start">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <SunDim className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-amber-950 mb-1">{t.rule2Title}</h3>
              <p className="text-amber-800 text-xs leading-relaxed">{t.rule2Desc}</p>
            </div>
          </div>

          {/* Rule 3: Leaf Patch Test */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex gap-3.5 items-start">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
              <Beaker className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-950 mb-1">{t.rule3Title}</h3>
              <p className="text-emerald-800 text-xs leading-relaxed">{t.rule3Desc}</p>
            </div>
          </div>

          {/* Rule 4: Precise Measurements */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex gap-3.5 items-start">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl shrink-0">
              <Beaker className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-blue-950 mb-1">{t.rule4Title}</h3>
              <p className="text-blue-800 text-xs leading-relaxed">{t.rule4Desc}</p>
            </div>
          </div>

          {/* Rule 5: Wash harvests */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex gap-3.5 items-start">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-xl shrink-0">
              <Apple className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-teal-950 mb-1">{t.rule5Title}</h3>
              <p className="text-teal-800 text-xs leading-relaxed">{t.rule5Desc}</p>
            </div>
          </div>

          {/* Rule 6: KVK Escalation */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex gap-3.5 items-start">
            <div className="p-2 bg-orange-100 text-orange-700 rounded-xl shrink-0">
              <PhoneCall className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-orange-950 mb-1">{t.rule6Title}</h3>
              <p className="text-orange-800 text-xs leading-relaxed">{t.rule6Desc}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
