export interface OrganicRemedyCard {
  id: string;
  nameEn: string;
  nameHi: string;
  nameTe: string;
  category: 'pest_control' | 'fungicide' | 'soil_booster' | 'companion' | 'mineral';
  badge: string;
  ingredients: string[];
  preparation: string[];
  application: string;
  whenToApply: string;
  frequency: string;
  targets: string[];
  safety: string;
}

export const ORGANIC_REMEDY_LIBRARY: OrganicRemedyCard[] = [
  {
    id: 'neem_soap_emulsion',
    nameEn: 'Cold-Pressed Neem & Mild Soap Spray',
    nameHi: 'नीम का तेल और माइल्ड साबुन का घोल',
    nameTe: 'వేపనూనె మరియు సబ్బు నీళ్ల ద్రావణం',
    category: 'pest_control',
    badge: 'Universal Pest Repellent',
    ingredients: [
      '1 Litre (1000 ml) Lukewarm water',
      '5 ml Pure cold-pressed neem oil (approx. 1 teaspoon)',
      '2 to 3 drops mild liquid soap or baby shampoo (works as an emulsifier so oil mixes with water)',
    ],
    preparation: [
      'First dissolve 2-3 drops of mild liquid soap in 100ml warm water until dissolved.',
      'Add 5ml neem oil and shake vigorously for 30 seconds until the mixture turns cloudy white (milky emulsion).',
      'Pour into the remaining water in your spray bottle and shake well before every spray.',
    ],
    application: 'Spray thoroughly on both the upper and lower surfaces of leaves, stems, and crevices where pests hide.',
    whenToApply: 'Strictly in the evening after 5:00 PM (never under hot direct sunlight to prevent leaf scorch, and to protect visiting bees).',
    frequency: 'Once every 7 days for prevention; every 4 days during an active pest infestation.',
    targets: ['Aphids', 'Mealybugs', 'Whiteflies', 'Spider Mites', 'Thrips'],
    safety: 'Always patch-test on a single leaf 24 hours prior. Keep away from eyes.',
  },
  {
    id: 'sour_buttermilk_fungicide',
    nameEn: 'Aged Sour Buttermilk / Curd Spray',
    nameHi: 'खट्टी छाछ / मट्ठा फफूंदनाशक',
    nameTe: 'పులిసిన మజ్జిగ శిలీంద్ర నాశిని (Sour Buttermilk)',
    category: 'fungicide',
    badge: 'Natural Bio-Fungicide',
    ingredients: [
      '100 ml Sour curd or naturally fermented buttermilk (aged 4-5 days)',
      '1 Litre fresh water',
      'Optional: Copper coil or clean copper coin placed inside buttermilk for 3 days to form green copper lactates',
    ],
    preparation: [
      'Allow leftover homemade curd/buttermilk to sit in a shaded corner for 4 to 5 days until it turns very sour.',
      'Filter thoroughly through a fine muslin cloth so it does not clog your spray nozzle.',
      'Dilute 100ml sour liquid with 900ml fresh water (1:10 dilution ratio).',
    ],
    application: 'Foliar spray over affected leaves showing white powdery coating or fungal spots.',
    whenToApply: 'Early morning or late evening in dry weather.',
    frequency: 'Once every 5 to 7 days until clear foliage regrows.',
    targets: ['Powdery Mildew', 'Downy Mildew', 'Leaf Spot', 'Rust Fungus'],
    safety: 'Safe for edible herbs and vegetables; simply wash produce with clean water before eating.',
  },
  {
    id: 'chilli_garlic_agniastra',
    nameEn: 'Garlic-Chilli Household Extract',
    nameHi: 'मिर्च-लहसुन का तीखा जैविक कीटनाशक',
    nameTe: 'వెల్లుల్లి - పచ్చిమిర్చి ఘాటైన కషాయం',
    category: 'pest_control',
    badge: 'Strong Herbal Repellent',
    ingredients: [
      '50 grams fresh garlic cloves (crushed)',
      '50 grams hot green chillies (finely ground)',
      '1 Litre clean water',
      '1 drop mild dish soap',
    ],
    preparation: [
      'Grind the garlic and green chillies into a paste with 100ml water.',
      'Simmer gently in 500ml water for 10-15 minutes or let it ferment overnight in a closed container.',
      'Strain through a fine cloth, then dilute with remaining water to make 1 litre.',
    ],
    application: 'Foliar spray targeting chewing caterpillars, borers, and stubborn sap-suckers.',
    whenToApply: 'Late evening hours only.',
    frequency: 'Once every 7 to 10 days.',
    targets: ['Stem borers', 'Leaf miners', 'Grasshoppers', 'Caterpillars'],
    safety: 'Wear gloves when handling! Keep strictly away from eyes, pets, and children.',
  },
  {
    id: 'wood_ash_dusting',
    nameEn: 'Sifted Wood Ash (Kitchen Chulha Ash)',
    nameHi: 'छनी हुई लकड़ी की राख',
    nameTe: 'బూడిద పొడి (Wood Ash Dusting)',
    category: 'mineral',
    badge: 'Alkaline Pest & Snail Barrier',
    ingredients: [
      'Natural, untreated wood ash (from clean firewood, coconut shells, or dried cow dung cakes)',
      'Fine kitchen flour sieve / sifter',
    ],
    preparation: [
      'Ensure the wood ash is completely cold and from clean natural firewood (never painted wood or plastics).',
      'Sift using a fine wire mesh sieve to remove charcoal chunks and sharp splinters.',
    ],
    application: 'Dust a light, paper-thin layer over damp morning leaves or create a 2-inch protective ring around plant base.',
    whenToApply: 'Early morning while leaves are lightly damp with dew, so the powder clings.',
    frequency: 'Once every 10 to 14 days, or immediately reapply after heavy rain.',
    targets: ['Snails & Slugs', 'Soft-bodied Aphids', 'Cutworms', 'Flea Beetles'],
    safety: 'Do not over-apply to acidic-soil loving plants (e.g. blueberries, azaleas) as ash raises soil pH.',
  },
  {
    id: 'baking_soda_fungicide',
    nameEn: 'Kitchen Baking Soda & Horticultural Oil',
    nameHi: 'मीठा सोडा (बेकिंग सोडा) फफूंदनाशक',
    nameTe: 'వంట సోడా (Baking Soda) స్ప్రే',
    category: 'fungicide',
    badge: 'pH Blocker for Fungal Spores',
    ingredients: [
      '5 grams (1 teaspoon) Food-grade Sodium Bicarbonate (Baking Soda)',
      '1 Litre water',
      '3 to 5 ml vegetable oil (mustard, sunflower, or coconut)',
      '2 drops gentle dish soap',
    ],
    preparation: [
      'Mix baking soda into warm water until completely dissolved.',
      'Whisk in the vegetable oil and dish soap to allow the spray to spread evenly over leaves.',
    ],
    application: 'Spray onto leaves showing early fungal patches or black spots.',
    whenToApply: 'Evening hours on dry foliage.',
    frequency: 'Once every 7 to 10 days.',
    targets: ['Black Spot on Roses', 'Anthracnose', 'Blight spores'],
    safety: 'Do not exceed 5 grams per litre, as excessive sodium bicarbonate can burn delicate leaves.',
  },
  {
    id: 'jeevamrutha_probiotic',
    nameEn: 'Jeevamrutha Soil Probiotic Tonic',
    nameHi: 'जीवामृत जैविक मिट्टी टॉनिक',
    nameTe: 'జీవామృతం సహజ జీవ ఎరువు',
    category: 'soil_booster',
    badge: 'Soil Microbe Multiplier',
    ingredients: [
      '100g Fresh desi cow dung (or well-aged compost)',
      '50ml Desi cow urine (or sour buttermilk)',
      '20g Jaggery / brown sugar (microbial food)',
      '20g Besan / gram flour (protein source)',
      'A pinch of virgin living soil from beneath a banyan or neem tree',
      '2 Litres clean dechlorinated water',
    ],
    preparation: [
      'Dissolve jaggery in water, then mix in gram flour, aged dung/compost, and inoculant soil in a wide-mouthed clay pot or bucket.',
      'Stir clockwise twice daily for 48 hours to ferment in a shaded spot under a breathable cloth.',
      'Dilute 1 part fermented tonic with 5 parts water before root drenching.',
    ],
    application: 'Drench soil at the root zone (do not spray directly onto delicate open flowers).',
    whenToApply: 'Morning or late afternoon on moist soil.',
    frequency: 'Twice a month for vigorous roots and disease resistance.',
    targets: ['Soil exhaustion', 'Weak root system', 'Beneficial microbial bloom', 'Nutrient uptake'],
    safety: 'Safe, natural aerobic fermentation. Never use raw human waste; always aerobic and wholesome.',
  },
  {
    id: 'marigold_companion',
    nameEn: 'African Marigold Companion Planting',
    nameHi: 'गेंदा (Marigold) सहजीवी पौध',
    nameTe: 'బంతి పూల మొక్కలు (Companion Planting)',
    category: 'companion',
    badge: 'Root Nematode & Pest Trap',
    ingredients: [
      'African Marigold (Tagetes erecta) or French Marigold seedlings',
      'Companion partners: Tomatoes, Brinjal, Chilli, Cucumbers, Rose bushes',
    ],
    preparation: [
      'Plant 1 marigold seedling for every 2-3 vegetable plants in the raised bed or border of grow bags.',
    ],
    application: 'Living plant roots release alpha-terthienyl compounds into soil that suppress harmful root-knot nematodes.',
    whenToApply: 'Plant simultaneously when transplanting vegetable crops.',
    frequency: 'Continuous all season.',
    targets: ['Root-knot nematodes', 'Tomato hornworms', 'Whiteflies (trap crop)'],
    safety: '100% natural, attracts pollinating bees and beneficial hoverflies to your terrace or garden.',
  },
];
