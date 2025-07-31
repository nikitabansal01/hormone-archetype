import { questions, getQuestionById } from '@/data/questions';

export interface QuizAnswer {
  questionId: string;
  selectedOption: string;
  path?: string;
}

export interface ArchetypeScore {
  archetypeId: string;
  score: number;
  highWeightMatches: number;
}

// Archetype priority for tie-breaking (higher in list = higher priority)
export const archetypePriority = [
  'balanced',
  'queen',
  'mother',
  'chairwoman',
  'workaholic',
  'saboteur',
  'underdog',
  'overachiever',
  'warrior',
  'nun',
  'philosopher',
  'unbalanced-heroine',
  'wisewoman'
];

export const calculateArchetypeScores = (answers: QuizAnswer[]): ArchetypeScore[] => {
  const scores: { [key: string]: ArchetypeScore } = {};

  // Initialize scores for all archetypes
  archetypePriority.forEach(archetypeId => {
    scores[archetypeId] = {
      archetypeId,
      score: 0,
      highWeightMatches: 0
    };
  });

  // Calculate scores based on answers
  answers.forEach(answer => {
    const question = getQuestionById(answer.questionId);
    if (!question) return;

    const selectedOption = question.options.find(opt => opt.letter === answer.selectedOption);
    if (!selectedOption) return;

    selectedOption.archetypes.forEach((archetypeId: string) => {
      if (scores[archetypeId]) {
        scores[archetypeId].score += 1;
        // High weight match if this option only maps to one archetype
        if (selectedOption.archetypes.length === 1) {
          scores[archetypeId].highWeightMatches += 1;
        }
      }
    });
  });

  // Convert to array and sort by score, then by high weight matches, then by priority
  const sortedScores = Object.values(scores).sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.highWeightMatches !== a.highWeightMatches) {
      return b.highWeightMatches - a.highWeightMatches;
    }
    const aPriority = archetypePriority.indexOf(a.archetypeId);
    const bPriority = archetypePriority.indexOf(b.archetypeId);
    return aPriority - bPriority;
  });

  return sortedScores;
};

export interface QuizResult {
  mainArchetype: string;
  secondaryArchetype?: string;
  confidence: 'high' | 'medium' | 'low';
  scores: ArchetypeScore[];
}

export const getQuizResult = (answers: QuizAnswer[]): QuizResult => {
  const scores = calculateArchetypeScores(answers);
  
  // Filter out the main branching question - only count path-specific questions
  const pathAnswers = answers.filter(answer => answer.questionId !== 'main');
  const totalPathQuestions = pathAnswers.length;
  
  if (scores.length === 0 || totalPathQuestions === 0) {
    return {
      mainArchetype: 'balanced',
      confidence: 'low',
      scores: []
    };
  }

  const topScore = scores[0];
  const secondScore = scores[1];
  
  // Calculate confidence based on score ratio (only path questions count)
  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (topScore.score === totalPathQuestions) {
    confidence = 'high'; // Perfect score (3/3)
  } else if (topScore.score >= Math.ceil(totalPathQuestions * 0.67)) {
    confidence = 'medium'; // Good score (2/3)
  }

  // Check if we should show a secondary archetype
  let secondaryArchetype: string | undefined;
  if (secondScore && secondScore.score > 0) {
    const scoreDifference = topScore.score - secondScore.score;
    // Show secondary if scores are close (within 1 point) and both have meaningful scores
    if (scoreDifference <= 1 && secondScore.score >= Math.ceil(totalPathQuestions * 0.5)) {
      secondaryArchetype = secondScore.archetypeId;
    }
  }

  return {
    mainArchetype: topScore.archetypeId,
    secondaryArchetype,
    confidence,
    scores
  };
};

export const getDominantArchetype = (answers: QuizAnswer[]): string => {
  const result = getQuizResult(answers);
  return result.mainArchetype;
}; 