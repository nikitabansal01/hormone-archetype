// Simple test script to verify quiz logic
const { getDominantArchetype } = require('./src/utils/quizLogic.ts');

// Test case 1: Queen archetype answers
const queenAnswers = [
  { questionId: 1, selectedOption: 'A' }, // Heavy, long, or irregular periods
  { questionId: 2, selectedOption: 'A' }, // Struggle to fall asleep
  { questionId: 3, selectedOption: 'C' }, // Mood swings and brain fog
  { questionId: 4, selectedOption: 'A' }, // Bloating, breast tenderness
  { questionId: 5, selectedOption: 'A' }, // Push through but crash later
  { questionId: 6, selectedOption: 'A' }, // Sweets cravings
  { questionId: 7, selectedOption: 'A' }, // Feel bloated after meals
  { questionId: 8, selectedOption: 'A' }, // Very low libido
  { questionId: 9, selectedOption: 'A' }  // Easily irritated
];

// Test case 2: Warrior archetype answers
const warriorAnswers = [
  { questionId: 1, selectedOption: 'E' }, // No periods, but acne/facial hair
  { questionId: 2, selectedOption: 'E' }, // Sleep fine but need caffeine
  { questionId: 3, selectedOption: 'E' }, // Mostly emotionally stable
  { questionId: 4, selectedOption: 'C' }, // Chin/jaw acne, facial hair
  { questionId: 5, selectedOption: 'E' }, // Some days energized, others drained
  { questionId: 6, selectedOption: 'A' }, // Sweets cravings
  { questionId: 7, selectedOption: 'A' }, // Feel bloated after meals
  { questionId: 8, selectedOption: 'E' }, // Still strong but not connected
  { questionId: 9, selectedOption: 'E' }  // Mostly calm and balanced
];

console.log('Testing Queen archetype...');
const queenResult = getDominantArchetype(queenAnswers);
console.log('Queen result:', queenResult?.name);

console.log('\nTesting Warrior archetype...');
const warriorResult = getDominantArchetype(warriorAnswers);
console.log('Warrior result:', warriorResult?.name);

console.log('\nTest completed!'); 