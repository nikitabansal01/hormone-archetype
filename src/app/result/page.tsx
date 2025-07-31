'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { QuizAnswer, getQuizResult, QuizResult } from '@/utils/quizLogic';
import { Archetype, archetypes } from '@/data/archetypes';
import { getQuestionById } from '@/data/questions';

// Archetype explanations with playful nicknames
const archetypeExplanations: { [key: string]: { nickname: string; emoji: string; explanation: string } } = {
  'queen': {
    nickname: 'The Queen',
    emoji: '👑',
    explanation: "You're magnetic, moody, and mighty — but your estrogen may be throwing tantrums behind the scenes. Think bloating, drama, and unpredictable cycles. Don't worry — your crown just needs a hormone tune-up."
  },
  'mother': {
    nickname: 'The Mother',
    emoji: '🤱',
    explanation: "You give your all to everyone else — but your hormones are waving a white flag. Emotional, drained, and bloated? Yep. Your inner nurturer needs nurturing too."
  },
  'unbalanced-heroine': {
    nickname: 'The Unbalanced Heroine',
    emoji: '🦸‍♀️',
    explanation: "You're a superhero without sleep. If PMS is a monster movie and anxiety is your sidekick, it's time to bring calm back to the chaos. Your body's asking for more chill."
  },
  'wisewoman': {
    nickname: 'The Wisewoman',
    emoji: '🧙‍♀️',
    explanation: "You're entering your sage phase — but it doesn't have to feel dry, achy, and invisible. Let's bring back your softness and sparkle without chasing youth."
  },
  'warrior': {
    nickname: 'The Warrior',
    emoji: '⚔️',
    explanation: "You're fierce, fiery, and driven — but maybe a little too much? Acne, anger, and hair drama might be creeping in. Let's help you channel that bold energy without burning out."
  },
  'nun': {
    nickname: 'The Nun',
    emoji: '🙏',
    explanation: "You've gone off the grid — emotionally, sexually, maybe even creatively. Your fire isn't gone, it just needs a little hormonal spark to light it back up."
  },
  'philosopher': {
    nickname: 'The Philosopher',
    emoji: '🧘‍♂️',
    explanation: "You're calm, deep, and reflective — but also feeling flat, faded, and a little disconnected from life. It's time to gently reboot your glow."
  },
  'workaholic': {
    nickname: 'The Workaholic',
    emoji: '💼',
    explanation: "You run on deadlines and duty. But under that productivity mask is a nervous system on fire. Your stress hormone is maxed. Let's get you grounded and glowing again."
  },
  'saboteur': {
    nickname: 'The Saboteur',
    emoji: '🧃',
    explanation: "You've pushed past the edge. Now you're stuck in burnout mode — foggy, flat, and zapped. Your body isn't broken. It's asking for deep rest and real replenishment."
  },
  'chairwoman': {
    nickname: 'The Chairwoman',
    emoji: '🪑',
    explanation: "You're in charge — of everything. But behind the spreadsheets is a woman teetering on the edge. Let's get you out of the red zone and back into your body."
  },
  'underdog': {
    nickname: 'The Underdog',
    emoji: '📉',
    explanation: "You're moving slow, gaining weight, and wondering why nothing feels like it used to. Your thyroid is whispering — and we're about to help it speak up."
  },
  'overachiever': {
    nickname: 'The Overachiever',
    emoji: '🚀',
    explanation: "You're buzzing, brilliant, and can't sit still. But your body is racing and losing steam fast. Let's press pause and find your calm core again."
  },
  'balanced': {
    nickname: 'The Balanced',
    emoji: '✨',
    explanation: "You're in a great place! Your hormones appear to be in balance — your cycle, energy, sleep, and mood all suggest you're running like a well-oiled goddess machine. Keep nurturing yourself with good habits to stay in this sweet spot."
  }
};

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [secondaryArchetype, setSecondaryArchetype] = useState<Archetype | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [keepInLoop, setKeepInLoop] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper functions
  const getSelectedSymptoms = (userAnswers: QuizAnswer[]) => {
    const symptomAnswers = userAnswers.filter(answer => {
      const question = getQuestionById(answer.questionId);
      return question && question.path; // Only include path questions (not main)
    });

    const symptoms = symptomAnswers.map(answer => {
      const question = getQuestionById(answer.questionId);
      if (!question) return '';

      const option = question.options.find(opt => opt.letter === answer.selectedOption);
      return option?.text || '';
    }).filter(text => text.length > 0);

    return symptoms.slice(0, 4).join(', ') + (symptoms.length > 4 ? '...' : '');
  };

  const getSelectedCravings = (userAnswers: QuizAnswer[]) => {
    // For branching logic, we'll show the path they took
    const pathAnswer = userAnswers.find(answer => answer.questionId === 'main');
    if (!pathAnswer) return 'Not specified';

    const question = getQuestionById('main');
    const option = question?.options.find(opt => opt.letter === pathAnswer.selectedOption);
    return option?.text || 'Not specified';
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !archetype) return;

    setIsSubmitting(true);
    
    try {
      // Store quiz data to Upstash
      const response = await fetch('/api/store-quiz-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          archetype: archetype.id,
          answers,
          keepInLoop,
          quizResult
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store quiz data');
      }

      const result = await response.json();
      console.log('Quiz data stored:', result);
      
      // Redirect to protocol page with email, archetype, and checkbox state
      const protocolParams = new URLSearchParams({
        email: email,
        archetype: archetype.id,
        keepInLoop: keepInLoop.toString(),
        answers: searchParams.get('answers') || ''
      });
      
      router.push(`/protocol?${protocolParams.toString()}`);
    } catch (error) {
      console.error('Signup error:', error);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const answersParam = searchParams.get('answers');
    if (answersParam) {
      try {
        const parsedAnswers: QuizAnswer[] = JSON.parse(decodeURIComponent(answersParam));
        setAnswers(parsedAnswers);
        
        const result = getQuizResult(parsedAnswers);
        setQuizResult(result);
        
        const foundArchetype = archetypes.find(a => a.id === result.mainArchetype);
        setArchetype(foundArchetype || null);
        
        if (result.secondaryArchetype) {
          const foundSecondaryArchetype = archetypes.find(a => a.id === result.secondaryArchetype);
          setSecondaryArchetype(foundSecondaryArchetype || null);
        }
      } catch (error) {
        console.error('Error parsing answers:', error);
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!archetype) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Results Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn&apos;t find your hormone archetype results.</p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Take the Quiz Again
          </Link>
        </div>
      </div>
    );
  }

  const archetypeInfo = archetypeExplanations[archetype.id] || {
    nickname: archetype.name,
    emoji: '✨',
    explanation: archetype.description
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🧬</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your Hormone Personality Archetype
            </h1>
            <p className="text-lg text-gray-600">
              Discover what your body&apos;s been trying to tell you
            </p>
          </div>

          {/* Disclaimer Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start">
              <span className="text-2xl mr-3">💡</span>
              <div>
                <p className="text-blue-800 text-sm leading-relaxed">
                  This quiz is designed to reflect the most dominant hormone pattern in your body based on clinical archetypes. Your answers matched: <strong>{archetypeInfo.nickname} {archetypeInfo.emoji}</strong>. If you&apos;d like deeper insights, try our full hormone journal or lab quiz.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-white/50">
            <div className="text-center mb-8">
              {/* Main Archetype */}
              <div className="mb-6">
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-4 ${archetype.color}`}>
                  <span className="mr-2">{archetypeInfo.emoji}</span>
                  {archetypeInfo.nickname}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {archetype.hormoneIssue}
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  {archetypeInfo.explanation}
                </p>
              </div>

              {/* Secondary Archetype */}
              {secondaryArchetype && quizResult && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">💫 You may also resonate with:</p>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-base font-medium ${secondaryArchetype.color}`}>
                    <span className="mr-2">{archetypeExplanations[secondaryArchetype.id]?.emoji || '✨'}</span>
                    {archetypeExplanations[secondaryArchetype.id]?.nickname || secondaryArchetype.name}
                  </div>
                </div>
              )}

              {/* Confidence Level */}
              {quizResult && (
                <div className="mt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                    <span className="mr-1">
                      {quizResult.confidence === 'high' ? '🎯' : quizResult.confidence === 'medium' ? '✨' : '🤔'}
                    </span>
                    {quizResult.confidence === 'high' ? 'High Confidence' : 
                     quizResult.confidence === 'medium' ? 'Medium Confidence' : 'Low Confidence'}
                  </div>
                </div>
              )}
            </div>

            {/* Why You Matched */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why You Matched
              </h3>

              <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">
                  Because You Selected:
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-purple-700">Primary Concern: </span>
                    <span className="text-gray-700">{getSelectedCravings(answers)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-700">Symptoms: </span>
                    <span className="text-gray-700">{getSelectedSymptoms(answers)}</span>
                  </div>
                </div>
              </div>
            </div>



            {/* Email Sign-up Form */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                🚪 What&apos;s Next
              </h3>
                              <p className="text-gray-600 mb-6">
                  Get your complete personalized SHINES protocol with detailed recommendations, meal plans, and supplement guidance.
                </p>
              
              <form onSubmit={handleSignUp} className="max-w-md mx-auto">
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={keepInLoop}
                      onChange={(e) => setKeepInLoop(e.target.checked)}
                      className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-pink-400 focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      💌 Keep me in the loop with hormone hacks & updates
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Getting Your Protocol...
                    </>
                  ) : (
                    <>
                      Get Your SHINES Protocol 🔮
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
              

            </div>
          </div>

          {/* Take Quiz Again */}
          <div className="text-center">
            <Link
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:shadow-lg border border-gray-200 transition-all duration-200"
            >
              <span className="mr-2">🔄</span>
              Take Quiz Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
} 