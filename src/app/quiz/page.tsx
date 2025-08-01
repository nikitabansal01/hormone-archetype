'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, getQuestionById, getNextQuestion } from '@/data/questions';
import { QuizAnswer } from '@/utils/quizLogic';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionId, setCurrentQuestionId] = useState('main');
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const question = getQuestionById(currentQuestionId);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption || !question) return;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestionId,
      selectedOption: selectedOption,
      path: question.path
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestionId), newAnswer];
    setAnswers(updatedAnswers);

    // Get the next question
    const nextQuestionId = getNextQuestion(currentQuestionId, selectedOption);
    
    if (nextQuestionId) {
      // Move to next question in the path
      setCurrentQuestionId(nextQuestionId);
      setSelectedOption('');
    } else {
      // End of path - show results
      const answersParam = encodeURIComponent(JSON.stringify(updatedAnswers));
      router.push(`/result?answers=${answersParam}`);
    }
  };

  const handlePrevious = () => {
    if (answers.length === 0) return;

    // Remove the current answer and go back
    const newAnswers = answers.slice(0, -1);
    setAnswers(newAnswers);

    if (newAnswers.length === 0) {
      // Go back to main question
      setCurrentQuestionId('main');
    } else {
      // Go back to the previous question
      const previousAnswer = newAnswers[newAnswers.length - 1];
      setCurrentQuestionId(previousAnswer.questionId);
      setSelectedOption(previousAnswer.selectedOption);
    }
  };

  if (!question) {
    return <div>Question not found</div>;
  }

  // Calculate progress based on path
  const getProgress = () => {
    if (currentQuestionId === 'main') return 0;
    const pathQuestions = questions.filter(q => q.path === question.path);
    const currentIndex = pathQuestions.findIndex(q => q.id === currentQuestionId);
    return ((currentIndex + 1) / (pathQuestions.length + 1)) * 100; // +1 for main question
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌸</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
              Discover Your Hormone Archetype
            </h1>
            <p className="text-base text-gray-600 mb-4">
              This quick quiz reveals your hormone personality and what you can do to feel better.
            </p>
            
            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="text-sm mr-1.5">🫶</span>
                <span className="text-xs text-gray-600 font-medium">Inspired by women</span>
              </div>
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="text-sm mr-1.5">🔬</span>
                <span className="text-xs text-gray-600 font-medium">Science-based</span>
              </div>
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="text-sm mr-1.5">🔒</span>
                <span className="text-xs text-gray-600 font-medium">Private</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8 mb-6 border border-white/50">
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {question.text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = selectedOption === option.letter;
                
                return (
                  <button
                    key={option.letter}
                    onClick={() => handleOptionSelect(option.letter)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
                        isSelected
                          ? 'border-pink-400 bg-pink-400'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-gray-700 leading-relaxed text-sm">
                          {option.text}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={answers.length === 0}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                answers.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white/80 text-gray-600 hover:bg-white shadow-sm hover:shadow-md border border-gray-200'
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                !selectedOption
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-sm hover:shadow-md transform hover:scale-105'
              }`}
            >
              {getNextQuestion(currentQuestionId, selectedOption || '') ? 'Continue →' : 'Find My Type'}
            </button>
          </div>


        </div>
      </div>
    </div>
  );
} 