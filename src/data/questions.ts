export interface Question {
  id: string;
  text: string;
  options: {
    letter: string;
    text: string;
    nextQuestion?: string;
    archetypes: string[];
  }[];
  path?: string;
}

export const questions: Question[] = [
  // Main branching question
  {
    id: "main",
    text: "🌸 What feels most off right now? (Choose the one that feels most true today)",
    options: [
      {
        letter: "A",
        text: "😠 Mood swings or heavy periods",
        nextQuestion: "estrogen_q1",
        archetypes: []
      },
      {
        letter: "B",
        text: "😰 Always stressed or anxious",
        nextQuestion: "cortisol_q1",
        archetypes: []
      },
      {
        letter: "C",
        text: "🐢 Tired, cold, or weight gain",
        nextQuestion: "thyroid_q1",
        archetypes: []
      },
      {
        letter: "D",
        text: "😶 Low sex drive or motivation",
        nextQuestion: "testosterone_q1",
        archetypes: []
      },
      {
        letter: "E",
        text: "😭 Overwhelmed or too emotional",
        nextQuestion: "progesterone_q1",
        archetypes: []
      }
    ]
  },

  // ESTROGEN PATH
  {
    id: "estrogen_q1",
    path: "estrogen",
    text: "🌺 What's your period like these days?",
    options: [
      {
        letter: "A",
        text: "🩸 Heavy or painful",
        nextQuestion: "estrogen_q2",
        archetypes: ["queen"]
      },
      {
        letter: "B",
        text: "😩 Bloated or emotional",
        nextQuestion: "estrogen_q2",
        archetypes: ["mother"]
      },
      {
        letter: "C",
        text: "😖 Stress makes it worse",
        nextQuestion: "estrogen_q2",
        archetypes: ["chairwoman"]
      }
    ]
  },
  {
    id: "estrogen_q2",
    path: "estrogen",
    text: "🐍 How's your daily energy?",
    options: [
      {
        letter: "A",
        text: "🐍 Easily irritated",
        nextQuestion: "estrogen_q3",
        archetypes: ["queen"]
      },
      {
        letter: "B",
        text: "😵 Exhausted but pushing through",
        nextQuestion: "estrogen_q3",
        archetypes: ["mother"]
      },
      {
        letter: "C",
        text: "💼 Busy and burned out",
        nextQuestion: "estrogen_q3",
        archetypes: ["chairwoman"]
      }
    ]
  },
  {
    id: "estrogen_q3",
    path: "estrogen",
    text: "🍫 What's your appetite like?",
    options: [
      {
        letter: "A",
        text: "🍫 Crave sweets often",
        archetypes: ["queen"]
      },
      {
        letter: "B",
        text: "🍞 Comfort food feels necessary",
        archetypes: ["mother"]
      },
      {
        letter: "C",
        text: "🥗 Trying to eat clean but feel inflamed",
        archetypes: ["chairwoman"]
      }
    ]
  },

  // CORTISOL PATH
  {
    id: "cortisol_q1",
    path: "cortisol",
    text: "🔥 How do you feel under stress?",
    options: [
      {
        letter: "A",
        text: "🧨 Jumpy and anxious",
        nextQuestion: "cortisol_q2",
        archetypes: ["workaholic"]
      },
      {
        letter: "B",
        text: "🧃 Totally drained",
        nextQuestion: "cortisol_q2",
        archetypes: ["saboteur"]
      },
      {
        letter: "C",
        text: "💼 Managing but running low",
        nextQuestion: "cortisol_q2",
        archetypes: ["chairwoman"]
      }
    ]
  },
  {
    id: "cortisol_q2",
    path: "cortisol",
    text: "😬 How's your sleep?",
    options: [
      {
        letter: "A",
        text: "😬 Restless or wake up early",
        nextQuestion: "cortisol_q3",
        archetypes: ["workaholic"]
      },
      {
        letter: "B",
        text: "🛌 Still tired after sleep",
        nextQuestion: "cortisol_q3",
        archetypes: ["saboteur"]
      },
      {
        letter: "C",
        text: "📉 Sleep but feel robotic",
        nextQuestion: "cortisol_q3",
        archetypes: ["chairwoman"]
      }
    ]
  },
  {
    id: "cortisol_q3",
    path: "cortisol",
    text: "🔥 Your stress style?",
    options: [
      {
        letter: "A",
        text: "🔥 Can't slow down",
        archetypes: ["workaholic"]
      },
      {
        letter: "B",
        text: "🐢 Body shuts down",
        archetypes: ["saboteur"]
      },
      {
        letter: "C",
        text: "🧯 Cool outside, chaos inside",
        archetypes: ["chairwoman"]
      }
    ]
  },

  // THYROID PATH
  {
    id: "thyroid_q1",
    path: "thyroid",
    text: "🧠 How's your pace?",
    options: [
      {
        letter: "A",
        text: "🐢 Super slow",
        nextQuestion: "thyroid_q2",
        archetypes: ["underdog"]
      },
      {
        letter: "B",
        text: "⚡ Too fast",
        nextQuestion: "thyroid_q2",
        archetypes: ["overachiever"]
      }
    ]
  },
  {
    id: "thyroid_q2",
    path: "thyroid",
    text: "🧠 How's your brain?",
    options: [
      {
        letter: "A",
        text: "😴 Foggy",
        nextQuestion: "thyroid_q3",
        archetypes: ["underdog"]
      },
      {
        letter: "B",
        text: "🤯 Spinning thoughts",
        nextQuestion: "thyroid_q3",
        archetypes: ["overachiever"]
      }
    ]
  },
  {
    id: "thyroid_q3",
    path: "thyroid",
    text: "🚀 Energy pattern?",
    options: [
      {
        letter: "A",
        text: "🛌 Always tired",
        archetypes: ["underdog"]
      },
      {
        letter: "B",
        text: "🚀 Can't sit still",
        archetypes: ["overachiever"]
      }
    ]
  },

  // TESTOSTERONE PATH
  {
    id: "testosterone_q1",
    path: "testosterone",
    text: "🧪 How's your libido?",
    options: [
      {
        letter: "A",
        text: "🔥 High or intense",
        nextQuestion: "testosterone_q2",
        archetypes: ["warrior"]
      },
      {
        letter: "B",
        text: "🧊 Low or gone",
        nextQuestion: "testosterone_q2",
        archetypes: ["nun"]
      },
      {
        letter: "C",
        text: "😶 Disconnected",
        nextQuestion: "testosterone_q2",
        archetypes: ["philosopher"]
      }
    ]
  },
  {
    id: "testosterone_q2",
    path: "testosterone",
    text: "⚔️ Motivation?",
    options: [
      {
        letter: "A",
        text: "⚔️ Driven and impatient",
        nextQuestion: "testosterone_q3",
        archetypes: ["warrior"]
      },
      {
        letter: "B",
        text: "🙏 I've lost my spark",
        nextQuestion: "testosterone_q3",
        archetypes: ["nun"]
      },
      {
        letter: "C",
        text: "🧘‍♂️ Calm and low-key",
        nextQuestion: "testosterone_q3",
        archetypes: ["philosopher"]
      }
    ]
  },
  {
    id: "testosterone_q3",
    path: "testosterone",
    text: "💪 Body awareness?",
    options: [
      {
        letter: "A",
        text: "💪 Strong but aggressive",
        archetypes: ["warrior"]
      },
      {
        letter: "B",
        text: "😞 Not in tune with my body",
        archetypes: ["nun"]
      },
      {
        letter: "C",
        text: "🧠 In my head more than my body",
        archetypes: ["philosopher"]
      }
    ]
  },

  // PROGESTERONE PATH
  {
    id: "progesterone_q1",
    path: "progesterone",
    text: "🧘 How's PMS?",
    options: [
      {
        letter: "A",
        text: "🎭 Emotional rollercoaster",
        nextQuestion: "progesterone_q2",
        archetypes: ["unbalanced-heroine"]
      },
      {
        letter: "B",
        text: "😵‍💫 Tired and sensitive",
        nextQuestion: "progesterone_q2",
        archetypes: ["mother"]
      }
    ]
  },
  {
    id: "progesterone_q2",
    path: "progesterone",
    text: "😤 Stress mode?",
    options: [
      {
        letter: "A",
        text: "😤 Unravels me",
        nextQuestion: "progesterone_q3",
        archetypes: ["unbalanced-heroine"]
      },
      {
        letter: "B",
        text: "😮‍💨 Can't cope well",
        nextQuestion: "progesterone_q3",
        archetypes: ["mother"]
      }
    ]
  },
  {
    id: "progesterone_q3",
    path: "progesterone",
    text: "🌙 Sleep?",
    options: [
      {
        letter: "A",
        text: "🌙 Can't stay asleep",
        archetypes: ["unbalanced-heroine"]
      },
      {
        letter: "B",
        text: "😴 Tired even after rest",
        archetypes: ["mother"]
      }
    ]
  }
];

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};

export const getNextQuestion = (currentQuestionId: string, selectedOption: string): string | null => {
  const question = getQuestionById(currentQuestionId);
  if (!question) return null;
  
  const option = question.options.find(opt => opt.letter === selectedOption);
  return option?.nextQuestion || null;
}; 