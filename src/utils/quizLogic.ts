import { Archetype, archetypes } from '@/data/archetypes';
import { questions } from '@/data/questions';

export interface QuizAnswer {
  questionId: number;
  selectedOption: string;
}

export interface ArchetypeScore {
  archetypeId: string;
  score: number;
  highWeightMatches: number;
}

// Archetype priority for tie-breaking (higher index = higher priority)
const archetypePriority = [
  'balanced',
  'philosopher',
  'nun',
  'underdog',
  'saboteur',
  'workaholic',
  'overachiever',
  'warrior',
  'wisewoman',
  'unbalanced-heroine',
  'mother',
  'chairwoman',
  'queen'
];

export const calculateArchetypeScores = (answers: QuizAnswer[]): ArchetypeScore[] => {
  const scores: { [key: string]: ArchetypeScore } = {};

  // Initialize scores for all archetypes
  archetypes.forEach(archetype => {
    scores[archetype.id] = {
      archetypeId: archetype.id,
      score: 0,
      highWeightMatches: 0
    };
  });

  // Calculate scores based on answers
  answers.forEach(answer => {
    // Find the question and selected option
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const selectedOption = question.options.find(opt => opt.letter === answer.selectedOption);
    if (!selectedOption) return;

    // Add points to each archetype for this answer
    selectedOption.archetypes.forEach((archetypeId: string) => {
      if (scores[archetypeId]) {
        scores[archetypeId].score += 1;
        
        // Check if this is a high-weight match (single archetype answer)
        if (selectedOption.archetypes.length === 1) {
          scores[archetypeId].highWeightMatches += 1;
        }
      }
    });
  });

  return Object.values(scores).sort((a, b) => {
    // First sort by total score (descending)
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    
    // If tied, sort by high-weight matches (descending)
    if (b.highWeightMatches !== a.highWeightMatches) {
      return b.highWeightMatches - a.highWeightMatches;
    }
    
    // If still tied, sort by archetype priority (higher priority wins)
    const aPriority = archetypePriority.indexOf(a.archetypeId);
    const bPriority = archetypePriority.indexOf(b.archetypeId);
    return bPriority - aPriority;
  });
};

export const getDominantArchetype = (answers: QuizAnswer[]): Archetype | null => {
  const scores = calculateArchetypeScores(answers);
  
  if (scores.length === 0) return null;
  
  const topScore = scores[0];
  return getArchetypeById(topScore.archetypeId) || null;
};

export const getArchetypeById = (id: string): Archetype | undefined => {
  return archetypes.find(archetype => archetype.id === id);
}; 