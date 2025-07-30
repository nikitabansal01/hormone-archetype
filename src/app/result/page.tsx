'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { QuizAnswer, getDominantArchetype } from '@/utils/quizLogic';
import { Archetype } from '@/data/archetypes';
import { questions } from '@/data/questions';

function ResultContent() {
  const searchParams = useSearchParams();
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper functions to get selected symptoms and cravings
  const getSelectedSymptoms = (userAnswers: QuizAnswer[]) => {
    const symptomAnswers = userAnswers.filter(answer => 
      [1, 3, 4, 5, 7].includes(answer.questionId)
    );
    
    const symptoms = symptomAnswers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      const option = question?.options.find(opt => opt.letter === answer.selectedOption);
      return option?.text || '';
    }).filter(text => text.length > 0);
    
    return symptoms.slice(0, 4).join(', ') + (symptoms.length > 4 ? '...' : '');
  };

  const getSelectedCravings = (userAnswers: QuizAnswer[]) => {
    const cravingAnswer = userAnswers.find(answer => answer.questionId === 6);
    if (!cravingAnswer) return 'Not specified';
    
    const question = questions.find(q => q.id === 6);
    const option = question?.options.find(opt => opt.letter === cravingAnswer.selectedOption);
    return option?.text || 'Not specified';
  };

  useEffect(() => {
    const answersParam = searchParams.get('answers');
    if (answersParam) {
      try {
        const parsedAnswers: QuizAnswer[] = JSON.parse(decodeURIComponent(answersParam));
        setAnswers(parsedAnswers);
        const result = getDominantArchetype(parsedAnswers);
        setArchetype(result);
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
          <p className="text-gray-600">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (!archetype) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h1>
          <p className="text-gray-600 mb-6">Please complete the quiz to see your results.</p>
          <Link 
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Hormone Archetype
            </h1>
            <p className="text-xl text-gray-600">
              Discover what your results mean and how to optimize your hormone health
            </p>
          </div>

          {/* Archetype Result Card */}
          <div className={`${archetype.color} rounded-3xl p-8 md:p-12 mb-8 shadow-2xl`}>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {archetype.name}
              </h2>
              <p className="text-xl font-semibold mb-6">
                {archetype.hormoneIssue}
              </p>
              <div className="w-24 h-1 bg-current mx-auto rounded-full opacity-50 mb-6"></div>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                {archetype.description}
              </p>
            </div>
          </div>

          {/* Why You Matched Section */}
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
                  <span className="font-medium text-purple-700">Symptoms: </span>
                  <span className="text-gray-700">{getSelectedSymptoms(answers)}</span>
                </div>
                <div>
                  <span className="font-medium text-purple-700">Cravings: </span>
                  <span className="text-gray-700">{getSelectedCravings(answers)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SHINES Protocol */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Your SHINES Protocol
            </h3>
            <p className="text-gray-600 mb-8">
              A comprehensive 6-point plan to restore your hormone balance and optimize your health.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stress */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Stress</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{archetype.shines.stress}</p>
              </div>

              {/* Hormone Support */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">H</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Hormone Support</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{archetype.shines.hormoneSupport}</p>
              </div>

              {/* Inflammation */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">I</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Inflammation</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{archetype.shines.inflammation}</p>
              </div>

              {/* Nutrition */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Nutrition</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{archetype.shines.nutrition}</p>
              </div>

              {/* Exercise */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Exercise</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{archetype.shines.exercise}</p>
              </div>

              {/* Sleep */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Sleep</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{archetype.shines.sleep}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {archetype.cta.title}
            </h3>
            <p className="text-gray-600 mb-6">
              Get your complete personalized protocol with detailed recommendations, meal plans, and supplement guidance.
            </p>
            <Link 
              href={archetype.cta.url}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {archetype.cta.buttonText}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <Link 
              href="/"
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/quiz"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Retake Quiz
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