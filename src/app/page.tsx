import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Hormone Archetype
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Take our comprehensive 9-question quiz to uncover your unique hormone profile 
              and get personalized recommendations for optimal health and balance.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>This hormone archetype quiz is based on the groundbreaking framework presented in</strong><br/>
                <em>The Hormone Balance Bible</em> by Dr. Shawn Tassone, MD, PhD — the first double board-certified OB-GYN in the U.S. in integrative and functional medicine.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Just 9 simple questions to reveal your hormone archetype</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Results</h3>
              <p className="text-gray-600">Get your unique SHINES protocol tailored to your archetype</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Holistic Approach</h3>
              <p className="text-gray-600">Comprehensive wellness plan covering all aspects of hormone health</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Discover Your Hormone Archetype?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of women who have transformed their health by understanding their unique hormone profile.
            </p>
            <Link 
              href="/quiz"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Your Quiz Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Takes approximately 3-5 minutes • 100% confidential
            </p>
          </div>

          {/* Archetype Preview */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Meet the 12 Hormone Archetypes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'The Queen', color: 'bg-purple-100 text-purple-800' },
                { name: 'The Heroine', color: 'bg-pink-100 text-pink-800' },
                { name: 'The Mother', color: 'bg-green-100 text-green-800' },
                { name: 'The Wisewoman', color: 'bg-indigo-100 text-indigo-800' },
                { name: 'The Workaholic', color: 'bg-red-100 text-red-800' },
                { name: 'The Saboteur', color: 'bg-orange-100 text-orange-800' },
                { name: 'The Nun', color: 'bg-gray-100 text-gray-800' },
                { name: 'The Warrior', color: 'bg-yellow-100 text-yellow-800' },
                { name: 'The Underdog', color: 'bg-blue-100 text-blue-800' },
                { name: 'The Overachiever', color: 'bg-teal-100 text-teal-800' },
                { name: 'The Chairwoman', color: 'bg-rose-100 text-rose-800' },
                { name: 'The Philosopher', color: 'bg-cyan-100 text-cyan-800' }
              ].map((archetype, index) => (
                <div 
                  key={index}
                  className={`${archetype.color} rounded-lg p-3 text-center text-sm font-medium`}
                >
                  {archetype.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
