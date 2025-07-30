'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import { QuizAnswer } from '@/utils/quizLogic';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const question = questions.find(q => q.id === currentQuestion);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion,
      selectedOption: selectedOption
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestion), newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      // Quiz completed, navigate to results
      const answersParam = encodeURIComponent(JSON.stringify(updatedAnswers));
      router.push(`/result?answers=${answersParam}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(a => a.questionId === currentQuestion - 1);
      setSelectedOption(previousAnswer?.selectedOption || '');
    }
  };

  const progress = (currentQuestion / 9) * 100;

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hormone Archetype Quiz
            </h1>
            <p className="text-lg text-gray-600">
              Question {currentQuestion} of 9
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0%</span>
              <span>{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
              {question.text}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option) => (
                <button
                  key={option.letter}
                  onClick={() => handleOptionSelect(option.letter)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedOption === option.letter
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                      selectedOption === option.letter
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === option.letter && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 mr-2">
                        {option.letter}.
                      </span>
                      <span className="text-gray-700 leading-relaxed">
                        {option.text}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 1}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                currentQuestion === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl'
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                !selectedOption
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {currentQuestion === 9 ? 'See Results' : 'Next →'}
            </button>
          </div>

          {/* Question Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: 9 }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setCurrentQuestion(i + 1);
                  const answer = answers.find(a => a.questionId === i + 1);
                  setSelectedOption(answer?.selectedOption || '');
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i + 1 === currentQuestion
                    ? 'bg-purple-600'
                    : answers.find(a => a.questionId === i + 1)
                    ? 'bg-green-400'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 