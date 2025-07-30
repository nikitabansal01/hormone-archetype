export interface Question {
  id: number;
  text: string;
  options: {
    letter: string;
    text: string;
    archetypes: string[];
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "How have your periods been over the last 6 months? (Choose the option that best matches your recent pattern.)",
    options: [
      {
        letter: "A",
        text: "Heavy, long, or irregular",
        archetypes: ["queen", "chairwoman"]
      },
      {
        letter: "B",
        text: "Light or absent",
        archetypes: ["nun", "wisewoman"]
      },
      {
        letter: "C",
        text: "Unpredictable — sometimes light, sometimes heavy",
        archetypes: ["mother"]
      },
      {
        letter: "D",
        text: "I no longer menstruate",
        archetypes: ["wisewoman", "philosopher"]
      },
      {
        letter: "E",
        text: "No periods, but acne or facial/body hair",
        archetypes: ["warrior"]
      },
      {
        letter: "F",
        text: "Regular, predictable cycles with few symptoms",
        archetypes: ["balanced"]
      }
    ]
  },
  {
    id: 2,
    text: "How would you describe your sleep in the past 4 weeks?",
    options: [
      {
        letter: "A",
        text: "I struggle to fall asleep or wake up feeling anxious",
        archetypes: ["queen", "workaholic"]
      },
      {
        letter: "B",
        text: "I sleep but never feel rested",
        archetypes: ["saboteur", "underdog"]
      },
      {
        letter: "C",
        text: "I'm wired at night, mind races",
        archetypes: ["workaholic", "overachiever"]
      },
      {
        letter: "D",
        text: "I sleep deeply but still feel exhausted",
        archetypes: ["saboteur"]
      },
      {
        letter: "E",
        text: "I sleep fine, but need caffeine to feel alert",
        archetypes: ["nun", "underdog"]
      },
      {
        letter: "F",
        text: "I fall asleep easily and feel rested most days",
        archetypes: ["balanced"]
      }
    ]
  },
  {
    id: 3,
    text: "How do your moods usually feel before or during your period (last 3 cycles)?",
    options: [
      {
        letter: "A",
        text: "I feel emotional, anxious, or cry easily",
        archetypes: ["unbalanced-heroine"]
      },
      {
        letter: "B",
        text: "I feel foggy, irritable, or low energy",
        archetypes: ["chairwoman", "mother"]
      },
      {
        letter: "C",
        text: "Mood swings and brain fog hit me hard",
        archetypes: ["queen", "chairwoman"]
      },
      {
        letter: "D",
        text: "I feel mentally drained or burned out",
        archetypes: ["workaholic", "saboteur"]
      },
      {
        letter: "E",
        text: "I'm mostly emotionally stable",
        archetypes: ["philosopher"]
      },
      {
        letter: "F",
        text: "I feel normal with minimal mood changes",
        archetypes: ["balanced"]
      }
    ]
  },
  {
    id: 4,
    text: "Which physical symptoms do you regularly notice? (Choose up to 2)",
    options: [
      {
        letter: "A",
        text: "Bloating, breast tenderness, puffiness",
        archetypes: ["queen", "mother"]
      },
      {
        letter: "B",
        text: "Hot flashes, night sweats, or vaginal dryness",
        archetypes: ["wisewoman"]
      },
      {
        letter: "C",
        text: "Chin/jaw acne, facial hair, scalp hair thinning",
        archetypes: ["warrior"]
      },
      {
        letter: "D",
        text: "Cold hands/feet, constipation, weight gain",
        archetypes: ["underdog"]
      },
      {
        letter: "E",
        text: "No noticeable symptoms",
        archetypes: ["philosopher"]
      }
    ]
  },
  {
    id: 5,
    text: "How has your energy felt over the past month?",
    options: [
      {
        letter: "A",
        text: "I push through the day but crash later",
        archetypes: ["chairwoman", "workaholic"]
      },
      {
        letter: "B",
        text: "I feel tired most of the time, even after sleep",
        archetypes: ["saboteur", "underdog"]
      },
      {
        letter: "C",
        text: "I feel anxious or restless much of the day",
        archetypes: ["workaholic", "overachiever"]
      },
      {
        letter: "D",
        text: "I feel unmotivated or low energy",
        archetypes: ["nun"]
      },
      {
        letter: "E",
        text: "Some days I'm energized, others I'm drained",
        archetypes: ["mother", "warrior"]
      },
      {
        letter: "F",
        text: "I feel consistently energized and focused",
        archetypes: ["balanced"]
      }
    ]
  },
  {
    id: 6,
    text: "What foods have you craved most often in the last few weeks?",
    options: [
      {
        letter: "A",
        text: "Sweets like chocolate, pastries, or desserts",
        archetypes: ["queen", "warrior", "saboteur"]
      },
      {
        letter: "B",
        text: "Salty snacks like chips, olives, or nuts",
        archetypes: ["workaholic"]
      },
      {
        letter: "C",
        text: "Both sweet and salty",
        archetypes: ["chairwoman"]
      },
      {
        letter: "D",
        text: "Bread, pasta, or coffee",
        archetypes: ["underdog"]
      },
      {
        letter: "E",
        text: "I eat mostly for comfort, not strong cravings",
        archetypes: ["unbalanced-heroine"]
      }
    ]
  },
  {
    id: 7,
    text: "What's your usual response after meals?",
    options: [
      {
        letter: "A",
        text: "I feel bloated or very tired",
        archetypes: ["queen", "warrior"]
      },
      {
        letter: "B",
        text: "I crash or feel sleepy 1–2 hours later",
        archetypes: ["saboteur", "underdog"]
      },
      {
        letter: "C",
        text: "I get hungry again quickly",
        archetypes: ["workaholic"]
      },
      {
        letter: "D",
        text: "I rely on snacks or caffeine after meals",
        archetypes: ["nun"]
      },
      {
        letter: "E",
        text: "I often lose my appetite when stressed",
        archetypes: ["saboteur"]
      },
      {
        letter: "F",
        text: "I feel satisfied and stable after eating",
        archetypes: ["balanced"]
      }
    ]
  },
  {
    id: 8,
    text: "How would you describe your libido over the past few months?",
    options: [
      {
        letter: "A",
        text: "Very low or nonexistent",
        archetypes: ["nun", "wisewoman"]
      },
      {
        letter: "B",
        text: "Normal interest, but hard to reach orgasm",
        archetypes: ["nun"]
      },
      {
        letter: "C",
        text: "Changes with mood, stress, or cycle",
        archetypes: ["mother"]
      },
      {
        letter: "D",
        text: "Low when I feel tired or gain weight",
        archetypes: ["underdog"]
      },
      {
        letter: "E",
        text: "Still strong, but not always connected",
        archetypes: ["warrior", "overachiever"]
      },
      {
        letter: "F",
        text: "Libido feels healthy and consistent",
        archetypes: ["balanced"]
      }
    ]
  },
  {
    id: 9,
    text: "What has your emotional state been like recently (last 4 weeks)?",
    options: [
      {
        letter: "A",
        text: "Easily irritated or moody",
        archetypes: ["queen", "chairwoman"]
      },
      {
        letter: "B",
        text: "Anxious or tense most days",
        archetypes: ["workaholic"]
      },
      {
        letter: "C",
        text: "Emotionally flat or unmotivated",
        archetypes: ["nun", "underdog"]
      },
      {
        letter: "D",
        text: "Restless and overwhelmed",
        archetypes: ["overachiever", "workaholic"]
      },
      {
        letter: "E",
        text: "Mostly calm and balanced",
        archetypes: ["balanced"]
      }
    ]
  }
];

export const getQuestionById = (id: number): Question | undefined => {
  return questions.find(question => question.id === id);
}; 