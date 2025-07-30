export interface Archetype {
  id: string;
  name: string;
  hormoneIssue: string;
  description: string;
  commonSymptoms: string[];
  cravings: string[];
  shines: {
    stress: string;
    hormoneSupport: string;
    inflammation: string;
    nutrition: string;
    exercise: string;
    sleep: string;
  };
  cta: {
    title: string;
    buttonText: string;
    url: string;
  };
  color: string;
}

export const archetypes: Archetype[] = [
  {
    id: 'queen',
    name: 'The Queen',
    hormoneIssue: 'Estrogen Dominance',
    description: "You rule with presence — but when estrogen takes the throne alone, it can leave you bloated, moody, or foggy. It's time to balance the crown and let calm lead.",
    commonSymptoms: [
      'Bloating',
      'Weight gain',
      'Irregular/heavy periods',
      'Breast tenderness',
      'Anxiety',
      'Mood swings',
      'Brain fog',
      'Water retention'
    ],
    cravings: ['Sugar', 'Salt'],
    shines: {
      stress: 'Yoga, meditation, deep breathing',
      hormoneSupport: 'DIM, chasteberry, fiber',
      inflammation: 'Avoid alcohol and processed foods',
      nutrition: 'Cruciferous vegetables, fiber-rich foods',
      exercise: 'Moderate exercise, yoga',
      sleep: 'Consistent sleep schedule, avoid screens before bed'
    },
    cta: {
      title: 'Ready to balance your hormones?',
      buttonText: 'Get Your Queen Protocol',
      url: '#'
    },
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'unbalanced-heroine',
    name: 'The Unbalanced Heroine',
    hormoneIssue: 'Progesterone Deficiency',
    description: "You feel everything — deeply. When your calming hormone is low, you may struggle with PMS, anxiety, or restless sleep. Your heroic comeback starts with restoring calm.",
    commonSymptoms: [
      'PMDD',
      'Anxiety',
      'Insomnia',
      'Catamenial migraines',
      'Hot flashes',
      'Fibroids',
      'Crying spells',
      'Breast tenderness'
    ],
    cravings: ['Emotional eating'],
    shines: {
      stress: 'Gentle stress management, self-care',
      hormoneSupport: 'Vitamin C, B6, magnesium, zinc, chasteberry',
      inflammation: 'Anti-inflammatory diet, seed cycling',
      nutrition: 'Whole foods, healthy fats',
      exercise: 'Pilates or walking',
      sleep: 'Sleep hygiene, relaxation techniques'
    },
    cta: {
      title: 'Time to restore your balance?',
      buttonText: 'Get Your Heroine Protocol',
      url: '#'
    },
    color: 'bg-pink-100 text-pink-800'
  },
  {
    id: 'mother',
    name: 'The Mother',
    hormoneIssue: 'Estrogen Dominance + Low Progesterone',
    description: "You carry the weight of the world — and your hormones know it. This blend of excess estrogen and too-little progesterone can feel like an emotional rollercoaster. You deserve support too.",
    commonSymptoms: [
      'Irregular cycles',
      'Mood changes',
      'Fatigue',
      'Night sweats',
      'Mix of Queen + Heroine symptoms'
    ],
    cravings: ['Sugar', 'Salt'],
    shines: {
      stress: 'Time with girlfriends, community support',
      hormoneSupport: 'Balance estrogen with progesterone therapy',
      inflammation: 'Liver support, detoxification',
      nutrition: 'Balanced diet, liver-supporting foods',
      exercise: 'Moderate movement, dry brushing',
      sleep: 'Consistent sleep routine'
    },
    cta: {
      title: 'Ready to nurture your hormones?',
      buttonText: 'Get Your Mother Protocol',
      url: '#'
    },
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'wisewoman',
    name: 'The Wisewoman',
    hormoneIssue: 'Estrogen Deficiency',
    description: "You've been through cycles of wisdom — but low estrogen may bring hot flashes, dryness, or sleep issues. It's your time to feel nourished, not depleted.",
    commonSymptoms: [
      'Hot flashes',
      'Vaginal dryness',
      'Insomnia',
      'Thinning skin/hair',
      'Night sweats',
      'Mood instability',
      'Memory lapses'
    ],
    cravings: ['Not specified'],
    shines: {
      stress: 'Relaxation techniques, mindfulness',
      hormoneSupport: 'Soy, red clover, black cohosh',
      inflammation: 'Anti-inflammatory diet',
      nutrition: 'Healthy fats, phytoestrogens',
      exercise: 'Gentle movement, yoga',
      sleep: 'Sleep optimization, lubricants'
    },
    cta: {
      title: 'Ready to embrace your wisdom?',
      buttonText: 'Get Your Wisewoman Protocol',
      url: '#'
    },
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'workaholic',
    name: 'The Workaholic',
    hormoneIssue: 'Cortisol Excess',
    description: "You hustle hard, but stress hormones may be running the show. If you're wired and tired, it's time to reset, breathe, and stop glorifying burnout.",
    commonSymptoms: [
      'Fatigue',
      'Belly weight',
      'GERD',
      'Poor sleep',
      'Tension headaches',
      'Low libido',
      'Skin sagging',
      'Anxiety'
    ],
    cravings: ['Salt', 'Sugar'],
    shines: {
      stress: 'Meditation, adaptogens, stress reduction',
      hormoneSupport: 'Adrenal support, cortisol management',
      inflammation: 'Anti-inflammatory diet',
      nutrition: 'Balanced meals, avoid processed foods',
      exercise: 'Stop overtraining, gentle movement',
      sleep: 'Sleep hygiene, reduce caffeine'
    },
    cta: {
      title: 'Time to slow down and heal?',
      buttonText: 'Get Your Workaholic Protocol',
      url: '#'
    },
    color: 'bg-red-100 text-red-800'
  },
  {
    id: 'saboteur',
    name: 'The Saboteur',
    hormoneIssue: 'Cortisol Deficiency',
    description: "You're drained, not lazy. Burnout has left your adrenals running on empty. It's time to slow down, rebuild, and gently rise again — this time with rest at the center.",
    commonSymptoms: [
      'Exhaustion',
      'Low BP',
      'Blood sugar crashes',
      'Joint pain',
      'Increased infections'
    ],
    cravings: ['Sugar'],
    shines: {
      stress: 'Gentle support, adrenal tonic herbs',
      hormoneSupport: 'Adrenal restoration, adaptogens',
      inflammation: 'Anti-inflammatory diet',
      nutrition: 'Regular meals, blood sugar balance',
      exercise: 'Gentle movement, avoid overtraining',
      sleep: 'Sleep restoration, EMF reduction'
    },
    cta: {
      title: 'Ready to restore your energy?',
      buttonText: 'Get Your Saboteur Protocol',
      url: '#'
    },
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'nun',
    name: 'The Nun',
    hormoneIssue: 'Testosterone Deficiency',
    description: "You're calm and caring, but may feel flat or disconnected. When testosterone dips, so can your drive, vitality, and spark. Time to awaken your inner fire.",
    commonSymptoms: [
      'Low libido',
      'Weight gain',
      'Hair thinning',
      'Poor orgasm response',
      'Fatigue'
    ],
    cravings: ['Not specific'],
    shines: {
      stress: 'Stress management, self-care',
      hormoneSupport: 'Zinc, DHEA (under medical advice), maca',
      inflammation: 'Anti-inflammatory diet',
      nutrition: 'Protein-rich foods, healthy fats',
      exercise: 'Weight training, strength building',
      sleep: 'Quality sleep, vitamin D'
    },
    cta: {
      title: 'Ready to reclaim your vitality?',
      buttonText: 'Get Your Nun Protocol',
      url: '#'
    },
    color: 'bg-gray-100 text-gray-800'
  },
  {
    id: 'warrior',
    name: 'The Warrior',
    hormoneIssue: 'Testosterone Excess (PCOS type)',
    description: "You're fierce — but your hormones may be swinging too hard. Acne, hair changes, or irregular periods could be signs your inner warrior needs a new strategy.",
    commonSymptoms: [
      'Acne',
      'Facial/body hair',
      'Scalp hair thinning',
      'Irregular/absent periods',
      'Deep voice'
    ],
    cravings: ['Sugar', 'High-starch'],
    shines: {
      stress: 'Stress management, mindfulness',
      hormoneSupport: 'Blood sugar balance, inositol',
      inflammation: 'Anti-inflammatory diet, avoid dairy/sugar',
      nutrition: 'Low-glycemic foods, spearmint tea',
      exercise: 'Regular movement, strength training',
      sleep: 'Consistent sleep schedule'
    },
    cta: {
      title: 'Ready to balance your warrior energy?',
      buttonText: 'Get Your Warrior Protocol',
      url: '#'
    },
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'underdog',
    name: 'The Underdog',
    hormoneIssue: 'Low Thyroid',
    description: "You move slower, feel colder, and tire more easily — but you're not broken. Your thyroid may just need a loving nudge. Small shifts can spark big comebacks.",
    commonSymptoms: [
      'Weight gain',
      'Constipation',
      'Fatigue',
      'Joint pain',
      'Cold hands/feet',
      'Depression'
    ],
    cravings: ['Carbs', 'Caffeine'],
    shines: {
      stress: 'Gentle stress management',
      hormoneSupport: 'Selenium, iodine (if not Hashimoto\'s)',
      inflammation: 'Gluten-free diet, anti-inflammatory foods',
      nutrition: 'Thyroid-supporting foods, T3/T4 balance',
      exercise: 'Gentle movement, avoid overtraining',
      sleep: 'Quality sleep, consistent schedule'
    },
    cta: {
      title: 'Ready to boost your metabolism?',
      buttonText: 'Get Your Underdog Protocol',
      url: '#'
    },
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'overachiever',
    name: 'The Overachiever',
    hormoneIssue: 'High Thyroid (Hyperthyroid)',
    description: "You're buzzing with energy — but maybe too much. When your thyroid is in overdrive, it can feel like anxiety on autopilot. Let's gently dial it down.",
    commonSymptoms: [
      'Unexplained weight loss',
      'Insomnia',
      'Racing heart',
      'Anxiety',
      'Tremors'
    ],
    cravings: ['None noted'],
    shines: {
      stress: 'Calming herbs, stress reduction',
      hormoneSupport: 'Thyroid support, avoid iodine excess',
      inflammation: 'Anti-inflammatory diet',
      nutrition: 'Balanced nutrition, avoid stimulants',
      exercise: 'Gentle exercise, avoid overtraining',
      sleep: 'Sleep optimization, monitor autoimmunity'
    },
    cta: {
      title: 'Ready to find your balance?',
      buttonText: 'Get Your Overachiever Protocol',
      url: '#'
    },
    color: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'chairwoman',
    name: 'The Chairwoman',
    hormoneIssue: 'Estrogen Dominance + Cortisol Excess',
    description: "You're managing it all — but your hormones are maxed out. This combo can lead to burnout masked as productivity. You don't need to do more, you need to restore.",
    commonSymptoms: [
      'Irregular periods',
      'Mood swings',
      'Brain fog',
      'GI issues',
      'Skin sagging',
      'Insomnia',
      'Burnout'
    ],
    cravings: ['Sugar', 'Salt'],
    shines: {
      stress: 'Adaptogens, stress management',
      hormoneSupport: 'DIM, liver detox, magnesium',
      inflammation: 'Anti-inflammatory diet',
      nutrition: 'Liver-supporting foods, balanced diet',
      exercise: 'Moderate cardio, avoid overtraining',
      sleep: 'Sleep hygiene, stress reduction'
    },
    cta: {
      title: 'Ready to lead with balance?',
      buttonText: 'Get Your Chairwoman Protocol',
      url: '#'
    },
    color: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'philosopher',
    name: 'The Philosopher',
    hormoneIssue: 'Low Estrogen + Low Testosterone',
    description: "You're reflective, intuitive, and peaceful — but you might feel flat, tired, or unseen. It's not in your head — your hormones might just need a little love.",
    commonSymptoms: [
      'Hot flashes',
      'Low libido',
      'Brain fog',
      'Dry skin',
      'Mood swings',
      'Hair loss'
    ],
    cravings: ['Not specific'],
    shines: {
      stress: 'Grounding exercise, energy medicine',
      hormoneSupport: 'Estrogen/testosterone support',
      inflammation: 'Anti-inflammatory diet',
      nutrition: 'Balanced nutrition, healthy fats',
      exercise: 'Gentle movement, grounding practices',
      sleep: 'Quality sleep, circadian rhythm balance'
    },
    cta: {
      title: 'Ready to find your inner wisdom?',
      buttonText: 'Get Your Philosopher Protocol',
      url: '#'
    },
    color: 'bg-cyan-100 text-cyan-800'
  },
  {
    id: 'balanced',
    name: 'The Balanced',
    hormoneIssue: 'Hormonally Balanced',
    description: "You're in a great place! Your hormones appear to be in balance — your cycle, energy, sleep, and mood all suggest you're running like a well-oiled goddess machine. Keep nurturing yourself with good habits to stay in this sweet spot.",
    commonSymptoms: [
      'Regular menstrual cycles',
      'Stable energy levels',
      'Consistent mood',
      'Good sleep quality',
      'Healthy appetite',
      'Normal libido'
    ],
    cravings: ['Balanced cravings'],
    shines: {
      stress: 'Maintain current stress management practices',
      hormoneSupport: 'Continue supporting overall health',
      inflammation: 'Maintain anti-inflammatory lifestyle',
      nutrition: 'Continue balanced, whole-food diet',
      exercise: 'Maintain current exercise routine',
      sleep: 'Continue good sleep hygiene'
    },
    cta: {
      title: 'Maintain your hormone harmony?',
      buttonText: 'Get Your Maintenance Protocol',
      url: '#'
    },
    color: 'bg-emerald-100 text-emerald-800'
  }
];

export const getArchetypeById = (id: string): Archetype | undefined => {
  return archetypes.find(archetype => archetype.id === id);
}; 