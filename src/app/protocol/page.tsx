'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Archetype, archetypes } from '@/data/archetypes';

// Detailed SHINES protocols for each archetype
const shrineProtocols: { [key: string]: { title: string; emoji: string; protocols: string[] } } = {
  'queen': {
    title: 'The Queen',
    emoji: '👑',
    protocols: [
      'Ease stress with yin yoga or nature walks 🌿',
      'Support estrogen metabolism with DIM or calcium d-glucarate 💊',
      'Add turmeric, ginger, and leafy greens to calm inflammation 🍵🥬',
      'Cruciferous veggies, high-fiber meals, and lots of water 🥦🌾💧',
      'Choose Pilates or light strength training 💪',
      'Lights out early, screens off, calm evenings 🛌✨'
    ]
  },
  'mother': {
    title: 'The Mother',
    emoji: '🤱',
    protocols: [
      'Gentle boundaries, alone time, and journaling 📓🛑',
      'B6 and magnesium to replenish your hormonal stores 💖',
      'Limit sugar, soothe the gut with warm, cooked meals 🍲',
      'Whole grains, healthy fats, and steady protein 🍽️',
      'Stretch or walk with intention, nothing too intense 🚶‍♀️',
      'Sleep rituals: chamomile tea, cozy lights, lavender mist 🌙🌼'
    ]
  },
  'unbalanced-heroine': {
    title: 'The Unbalanced Heroine',
    emoji: '🦸‍♀️',
    protocols: [
      'Daily breathwork or vagus nerve stimulation 🧘‍♀️',
      'Zinc + vitamin C, plus seed cycling for extra love 🌻💊',
      'Remove caffeine and stabilize blood sugar 🍳☕🚫',
      'Healthy fats, nuts, avocado, leafy greens 🥑🥜',
      'Gentle yoga or walking – keep cortisol chill 🧘‍♂️',
      'Nap, rest, warm baths – permission granted 🔥😴'
    ]
  },
  'wisewoman': {
    title: 'The Wisewoman',
    emoji: '🧙‍♀️',
    protocols: [
      'Emotional release: cry, journal, dance it out ✍️💃',
      'Phytoestrogens like flax, sesame, and fermented soy 🌱',
      'Focus on gut-healing soups and fermented foods 🍲🧄',
      'Warm meals, omega-3s, and iron-rich foods 🥣🐟',
      'Strength training and bodyweight movement 🏋️‍♀️',
      'Consistent bedtime and screen-free wind-down 🌙📵'
    ]
  },
  'warrior': {
    title: 'The Warrior',
    emoji: '⚔️',
    protocols: [
      'Journaling, therapy, or screaming into a pillow 😤📓',
      'Spearmint tea and zinc-rich foods to dial down T 🌿🥜',
      'Skip sugar, dairy, and fried stuff – your skin will thank you 🧀🚫',
      'Leafy greens, healthy carbs, cinnamon 🍠🌱',
      'Boxing, HIIT, or dancing like no one\'s watching 🥊💃',
      'Magnesium before bed, exhale that heat 🌬️💤'
    ]
  },
  'nun': {
    title: 'The Nun',
    emoji: '🙏',
    protocols: [
      'Rest is holy. Literally. Do nothing. Guilt-free 🧖‍♀️',
      'Add maca or tribulus (if doc-approved!) 🌿🔥',
      'Gentle detox with sauna, stretching, and teas 🍵',
      'Eggs, avocado, seeds – feed your inner fire 🍳🥑',
      'Lift heavy-ish stuff. Wake up the muscles 💪',
      'Sleep in, sleep deep. No alarms on weekends 😴📴'
    ]
  },
  'philosopher': {
    title: 'The Philosopher',
    emoji: '🧘‍♂️',
    protocols: [
      'Walk barefoot, sit with trees, journal your soul 🌳📓',
      'Try adaptogens like ashwagandha or maca (check first!) 🌿',
      'Heal the gut with bone broth and fermented foods 🍲',
      'Omega-3s, flax, sesame, and warming soups 🥣',
      'Stretching, Tai Chi, gentle motion flows 🧘‍♂️',
      'Set screen curfews and aim for 8+ hours 🌌🛌'
    ]
  },
  'workaholic': {
    title: 'The Workaholic',
    emoji: '💼',
    protocols: [
      'Say "no" like a boss. Guard your peace 🛑👑',
      'Ashwagandha, rhodiola, or magnesium to buffer stress 💊',
      'Ditch ultra-processed foods. Go slow-cooked instead 🥘',
      'Root veggies, berries, lean protein = brain + body fuel 🍠🍓',
      'Swap cardio for walking meditations 🚶‍♀️🌤️',
      'Bedtime rituals. Lavender, low light, slow breaths 🌙🛁'
    ]
  },
  'saboteur': {
    title: 'The Saboteur',
    emoji: '🧃',
    protocols: [
      'No alarms. No rushing. Ease into your day 🌅',
      'Vitamin C, licorice root (check with doc), and minerals 🍋🧂',
      'Support gut + adrenals with gentle, warm meals 🍲',
      'Small, frequent meals with protein and healthy fats 🥚🥑',
      'Very light movement — think walks, not workouts 🚶‍♀️',
      'Nap like it\'s your job. Deep rest heals 😴🛋️'
    ]
  },
  'chairwoman': {
    title: 'The Chairwoman',
    emoji: '🪑',
    protocols: [
      'No multitasking. One thing at a time 🧘‍♀️',
      'B-complex, chasteberry, and adrenal support 💊🌿',
      'Avoid sugar + alcohol, focus on whole foods 🍷🚫',
      'Protein-rich, fiber-filled, hormone-clearing meals 🥗',
      'Movement that calms: barre, walking, gentle weights 🧘‍♀️',
      'Create bedtime rituals: herbal tea, candles, silence 🫖🕯️'
    ]
  },
  'underdog': {
    title: 'The Underdog',
    emoji: '📉',
    protocols: [
      'Honor slowness. No more go-go-go 🌤️',
      'Check selenium, iodine, zinc levels with care 🧂🩺',
      'Remove gluten + soy for 4 weeks and observe 🍞🚫',
      'Warming, nutrient-rich meals like soups and stews 🥘',
      'Stretch and move gently, especially in the morning 🧘‍♀️',
      'Cozy socks, warm baths, and deep sleep rituals 🧦🛁'
    ]
  },
  'overachiever': {
    title: 'The Overachiever',
    emoji: '🚀',
    protocols: [
      'Ditch caffeine. For real. It\'s not helping 🚫☕',
      'Replenish minerals: magnesium, sodium, potassium 💧⚡',
      'Reduce gut inflammation with soft, soothing meals 🥣',
      'Sweet potatoes, oats, bananas = grounding 🍠🍌',
      'Downshift into slow yoga or walks 🧘‍♀️',
      'Sleep like it\'s a sacred ritual — long and uninterrupted 🛌✨'
    ]
  },
  'balanced': {
    title: 'The Balanced',
    emoji: '✨',
    protocols: [
      'Maintain your current stress management practices 🌟',
      'Continue supporting your overall hormone health 💊',
      'Keep up your anti-inflammatory lifestyle 🥗',
      'Preserve your balanced, whole-food diet 🍽️',
      'Maintain your current exercise routine 🏃‍♀️',
      'Continue your good sleep hygiene practices 😴'
    ]
  }
};

function ProtocolContent() {
  const searchParams = useSearchParams();
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [email, setEmail] = useState('');
  const [keepInLoop, setKeepInLoop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const archetypeId = searchParams.get('archetype');
    const emailParam = searchParams.get('email');
    const keepInLoopParam = searchParams.get('keepInLoop');
    
    if (archetypeId && emailParam) {
      const foundArchetype = archetypes.find(a => a.id === archetypeId);
      setArchetype(foundArchetype || null);
      setEmail(emailParam);
      setKeepInLoop(keepInLoopParam === 'true');
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your protocol...</p>
        </div>
      </div>
    );
  }

  if (!archetype) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Protocol Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your hormone protocol.</p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  const protocolInfo = shrineProtocols[archetype.id] || {
    title: archetype.name,
    emoji: '✨',
    protocols: ['Protocol information coming soon...']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🔮</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your Personalized SHINES Protocol
            </h1>
            <p className="text-lg text-gray-600">
              Welcome to your hormone optimization journey, {email.split('@')[0]}! ✨
            </p>
          </div>

          {/* Success Message - Only show if user checked "Keep me in the loop" */}
          {keepInLoop && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🎉</span>
                <div>
                  <h3 className="text-green-800 font-semibold mb-2">Welcome to the community!</h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    You're now signed up to receive personalized hormone optimization tips, meal plans, and expert guidance. Check your email for your welcome gift!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Archetype Header */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-white/50">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-4 ${archetype.color}`}>
                <span className="mr-2">{protocolInfo.emoji}</span>
                {protocolInfo.title}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {archetype.hormoneIssue}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {archetype.description}
              </p>
            </div>
          </div>

          {/* SHRINE Protocol */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-white/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your SHINES Protocol 🌟
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here's your personalized 6-step action plan to restore hormone balance and optimize your health. Start with one step at a time — small changes create big results!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {protocolInfo.protocols.slice(0, 3).map((protocol, index) => {
                  const shinesLetters = ['S', 'H', 'I', 'N', 'E', 'S'];
                  const letter = shinesLetters[index];
                  return (
                    <div key={index} className="flex items-start p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <span className="text-white font-bold text-sm">{letter}</span>
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed">{protocol}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-6">
                {protocolInfo.protocols.slice(3).map((protocol, index) => {
                  const shinesLetters = ['S', 'H', 'I', 'N', 'E', 'S'];
                  const letter = shinesLetters[index + 3];
                  return (
                    <div key={index + 3} className="flex items-start p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <span className="text-white font-bold text-sm">{letter}</span>
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed">{protocol}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-white/50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🚀 What's Next?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Weekly Tips</h4>
                  <p className="text-gray-600 text-sm">Get personalized hormone optimization tips delivered to your inbox</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Expert Resources</h4>
                  <p className="text-gray-600 text-sm">Access meal plans, supplement guides, and expert advice</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Community</h4>
                  <p className="text-gray-600 text-sm">Connect with other women on their hormone optimization journey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="mr-2">🏠</span>
              Back to Home
            </Link>
            
            <div className="block">
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
    </div>
  );
}

export default function ProtocolPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your protocol...</p>
        </div>
      </div>
    }>
      <ProtocolContent />
    </Suspense>
  );
} 