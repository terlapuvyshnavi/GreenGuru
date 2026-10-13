export interface CommonSymptom {
  id: string;
  icon: string;
  en: {
    title: string;
    description: string;
    prompt: string;
  };
  hi: {
    title: string;
    description: string;
    prompt: string;
  };
  te: {
    title: string;
    description: string;
    prompt: string;
  };
}

export const COMMON_SYMPTOMS: CommonSymptom[] = [
  {
    id: 'mealybugs',
    icon: '🐛',
    en: {
      title: 'Mealybugs / White Fuzzy Bugs',
      description: 'Cotton-like white clusters on leaf joints and stem tips',
      prompt: 'My plant has cotton-like white fuzzy bugs clustered on stems and under leaves (mealybugs). How do I treat them organically with household ingredients?',
    },
    hi: {
      title: 'मिलीबग / सफेद चिपचिपे कीड़े',
      description: 'तने और पत्तियों पर सफेद रुई जैसे चिपचिपे कीड़े',
      prompt: 'मेरे पौधे (जैसे गुड़हल/करी पत्ता) पर सफेद रुई जैसे मिलीबग कीड़े लगे हैं। घरेलू और जैविक उपायों से इनका इलाज कैसे करें?',
    },
    te: {
      title: 'పిండి పురుగులు / తెల్లటి బూజు పురుగులు',
      description: 'కాండం మరియు ఆకుల అడుగున తెల్లటి దూది వంటి పురుగులు',
      prompt: 'నా మొక్క కాండం మరియు ఆకుల వెనుక తెల్లటి దూది వంటి పిండి పురుగులు (Mealybugs) పట్టాయి. ఇంట్లోని వస్తువులతో సహజంగా ఎలా నివారించాలి?',
    },
  },
  {
    id: 'leaf_curl',
    icon: '🍂',
    en: {
      title: 'Leaf Curl & Crinkling',
      description: 'Leaves twisting upward or downward with stunted growth',
      prompt: 'My chilli and tomato plant leaves are curling, twisting, and wrinkling. What is causing this and what natural spray can save it?',
    },
    hi: {
      title: 'पत्ती मरोड़ / मुड़ी हुई पत्तियाँ',
      description: 'मिर्च या टमाटर की पत्तियाँ ऊपर या नीचे मुड़ रही हैं',
      prompt: 'मेरी मिर्च और टमाटर की पत्तियाँ मुड़ और सिकुड़ रही हैं (पत्ती मरोड़ रोग)। कृपया घरेलू जैविक उपचार और छिड़काव का तरीका बताएं।',
    },
    te: {
      title: 'ఆకు ముడుత తెగులు (Leaf Curl)',
      description: 'మిరప, టమాటా ఆకులు పైకి లేదా కిందకి ముడుచుకుపోతున్నాయి',
      prompt: 'నా మిరప మరియు టమోటా మొక్క ఆకులు ముడుచుకుపోయి గిడసబారిపోతున్నాయి (ఆకు ముడుత). దీనికి సహజమైన కషాయం లేదా నివారణ చెప్పండి.',
    },
  },
  {
    id: 'whiteflies',
    icon: '🪰',
    en: {
      title: 'Whiteflies / Flying Gnat Clouds',
      description: 'Tiny white flying insects that flutter when plant is shaken',
      prompt: 'Small white insects fly out in clouds when I touch the leaves, and leaves are turning sticky. What kitchen or neem remedy will repel whiteflies?',
    },
    hi: {
      title: 'सफेद मक्खी / सफेद फतिंगे',
      description: 'हिलाने पर उड़ने वाले छोटे सफेद कीड़े और चिपचिपी पत्तियाँ',
      prompt: 'पौधे को हिलाने पर छोटी सफेद मक्खियाँ उड़ती हैं और पत्तों पर चिपचिपापन है। नीम या घरेलू चीजों से कैसे भगाएं?',
    },
    te: {
      title: 'తెల్ల దోమలు (Whiteflies)',
      description: 'మొక్కను తాకితే ఎగిరే చిన్న తెల్లటి పురుగులు, జిగురు ఆకులు',
      prompt: 'మొక్క ఆకులను తాకినప్పుడు చిన్న తెల్ల దోమలు గుంపులుగా ఎగురుతున్నాయి. ఆకులు జిగురుగా మారాయి. వేపనూనె లేదా వంటింటి చిట్కాలతో ఎలా నివారించాలి?',
    },
  },
  {
    id: 'powdery_mildew',
    icon: '🍄',
    en: {
      title: 'Powdery White Fungus',
      description: 'White talcum-powder like coating on top of leaves',
      prompt: 'There is a white chalky powder coating all over the leaves of my rose/vegetable plant. How do I treat powdery mildew organically?',
    },
    hi: {
      title: 'सफेद फफूंद / छाछिया रोग',
      description: 'पत्तों पर सफेद पाउडर जैसा जमाव',
      prompt: 'गुलाब और बेल वाले पौधों की पत्तियों पर सफेद पाउडर या फफूंद जम गई है। छाछ या बेकिंग सोडा से इसका घरेलू इलाज बताएं।',
    },
    te: {
      title: 'బూడిద తెగులు (Powdery Mildew)',
      description: 'ఆకులపై తెల్లటి బూడిద లేదా పిండి పూసినట్లు ఉండటం',
      prompt: 'నా గులాబీ మరియు కూరగాయల మొక్కల ఆకులపై తెల్లటి బూడిద లాంటి పొర ఏర్పడింది. మజ్జిగ లేదా ఇంట్లోని పదార్థాలతో ఎలా తగ్గించాలి?',
    },
  },
  {
    id: 'yellowing_leaves',
    icon: '🌱',
    en: {
      title: 'Yellowing Leaves / Chlorosis',
      description: 'Leaves losing green color, veins distinct or pale leaves',
      prompt: 'The lower leaves of my plant are turning pale yellow and dropping. Is it overwatering, nutrient deficiency, or root issues? Give me natural remedies.',
    },
    hi: {
      title: 'पीले पत्ते / पोषण की कमी',
      description: 'पत्तियाँ पीली पड़कर गिर रही हैं',
      prompt: 'मेरे पौधे के निचले पत्ते पीले पड़ रहे हैं और गिर रहे हैं। क्या यह पानी ज्यादा होने से है या खाद की कमी से? घर पर बनी खाद या जैविक उपचार बताएं।',
    },
    te: {
      title: 'పసుపు పచ్చగా మారే ఆకులు',
      description: 'ఆకులు పసుపు రంగులోకి మారి రాలిపోతున్నాయి',
      prompt: 'నా మొక్కల కింద ఆకులు పసుపు రంగులోకి మారి రాలిపోతున్నాయి. నీరు ఎక్కువైందా లేదా పోషకాల లోపమా? సహజ ఎరువులు మరియు పరిష్కారం తెలపండి.',
    },
  },
  {
    id: 'black_spots',
    icon: '🌑',
    en: {
      title: 'Black Spots & Leaf Blight',
      description: 'Dark circular spots with yellow halos on rose or foliage',
      prompt: 'My rose and flowering plant has dark brown and black spots on leaves, and leaves are falling fast. How can I treat this fungal spot naturally?',
    },
    hi: {
      title: 'काले धब्बे और झुलसा रोग',
      description: 'पत्तों पर काले-भूरे धब्बे और गिरते पत्ते',
      prompt: 'गुलाब के पौधों के पत्तों पर काले गोल धब्बे पड़ गए हैं और पत्ते झड़ रहे हैं। प्राकृतिक फफूंदनाशक का घरेलू नुस्खा बताएं।',
    },
    te: {
      title: 'నల్ల మచ్చల తెగులు (Black Spot)',
      description: 'ఆకులపై నల్లటి, గోధుమ రంగు మచ్చలు ఏర్పడి రాలిపోవడం',
      prompt: 'గులాబీ మొక్క ఆకులపై నల్లటి మచ్చలు వచ్చి ఆకులు రాలిపోతున్నాయి. దీనికి సహజ ఫంగిసైడ్ వంటింటి నివారణ చెప్పండి.',
    },
  },
];
