'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* Fun Visual Elements */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-4xl">🌸</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  <span className="text-sm">✨</span>
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full flex items-center justify-center shadow-md animate-ping">
                  <span className="text-xs">💫</span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 leading-tight">
              Which hormone type is
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                secretly running your life?
              </span>
            </h1>

            {/* Fun Visual Description */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4 text-2xl">
                <span className="animate-bounce">🎭</span>
                <span className="animate-pulse">🔍</span>
                <span className="animate-bounce">💝</span>
              </div>
            </div>

            {/* Simple Description */}
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                Uncover your hormone personality in just 1 minute! ✨
              </p>
            </div>



            {/* Fun Attribution */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 p-3 rounded-full mb-8 max-w-lg mx-auto">
              <p className="text-xs text-gray-600 whitespace-nowrap">
                <span className="font-medium">✨</span> Developed in alignment with Dr. Shawn Tassone, MD, PhD&apos;s clinical research.
              </p>
            </div>
          </div>

          {/* Fun CTA Section */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 text-lg">
                <span className="animate-pulse">🚀</span>
                <span className="text-gray-600">Ready to discover?</span>
                <span className="animate-bounce">✨</span>
              </div>
            </div>
            
            <Link 
              href="/quiz"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:rotate-1"
            >
              <span className="mr-3 text-2xl animate-bounce">🎯</span>
              Start the Quiz
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <div className="flex justify-center mt-4 space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="mr-1">⏱️</span>
                <span>1 minute</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🔒</span>
                <span>Private</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🎁</span>
                <span>Free</span>
              </div>
            </div>
          </div>

          {/* Fun Archetype Preview */}
          <div className="mb-10">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Meet your potential hormone personalities
              </h3>
              <div className="flex justify-center space-x-2 text-lg">
                <span className="animate-pulse">🎭</span>
                <span className="animate-bounce">✨</span>
                <span className="animate-pulse">💫</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Queen', emoji: '👑', color: 'from-purple-100 to-pink-100' },
                { name: 'Warrior', emoji: '⚔️', color: 'from-yellow-100 to-orange-100' },
                { name: 'Mother', emoji: '🤱', color: 'from-green-100 to-teal-100' },
                { name: 'Wisewoman', emoji: '🧙‍♀️', color: 'from-indigo-100 to-purple-100' },
                { name: 'Workaholic', emoji: '💼', color: 'from-red-100 to-pink-100' },
                { name: 'Saboteur', emoji: '🎭', color: 'from-orange-100 to-yellow-100' },
                { name: 'Nun', emoji: '🙏', color: 'from-gray-100 to-blue-100' },
                { name: 'Heroine', emoji: '💪', color: 'from-pink-100 to-red-100' },
                { name: 'Underdog', emoji: '🐕', color: 'from-blue-100 to-indigo-100' },
                { name: 'Overachiever', emoji: '🏆', color: 'from-teal-100 to-green-100' },
                { name: 'Chairwoman', emoji: '👔', color: 'from-rose-100 to-pink-100' },
                { name: 'Philosopher', emoji: '🤔', color: 'from-cyan-100 to-blue-100' }
              ].map((archetype, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${archetype.color} rounded-2xl p-3 text-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 border border-white/50 cursor-pointer group`}
                >
                  <div className="text-2xl mb-1 group-hover:animate-bounce">{archetype.emoji}</div>
                  <div className="text-xs text-gray-700 font-medium">{archetype.name}</div>
                </div>
              ))}
            </div>
          </div>



        </div>
      </div>

      
    </div>
  );
}

