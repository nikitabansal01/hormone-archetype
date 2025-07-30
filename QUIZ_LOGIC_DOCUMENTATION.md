# Hormone Archetype Quiz Logic Documentation

## Overview

The Hormone Archetype Quiz is a sophisticated assessment tool that helps users identify their dominant hormone profile through a series of 9 carefully crafted questions. This document explains how the quiz works, from question design to result calculation.

## How the Quiz Works

### 1. Question Structure

Each of the 9 questions has multiple choice answers (A, B, C, D, E, and sometimes F), where each answer maps to specific hormone archetypes. The questions cover:

- **Question 1**: Menstrual patterns (periods)
- **Question 2**: Sleep quality
- **Question 3**: Mood during periods
- **Question 4**: Physical symptoms
- **Question 5**: Energy levels
- **Question 6**: Food cravings
- **Question 7**: Post-meal responses
- **Question 8**: Libido (sex drive)
- **Question 9**: Overall emotional state

### 2. Answer Mapping System

Each answer choice is mapped to 1-2 hormone archetypes based on medical research and hormone patterns:

**Example:**
```
Question 1, Option A: "Heavy, long, or irregular periods"
→ Maps to: ["queen", "chairwoman"]
```

This means if someone selects this answer, they get 1 point for both "The Queen" and "The Chairwoman" archetypes.

### 3. The 13 Hormone Archetypes

The quiz identifies one of 13 possible hormone profiles:

1. **The Queen** - Estrogen Dominance
2. **The Unbalanced Heroine** - Progesterone Deficiency
3. **The Mother** - Estrogen Dominance + Low Progesterone
4. **The Wisewoman** - Estrogen Deficiency
5. **The Workaholic** - Cortisol Excess
6. **The Saboteur** - Cortisol Deficiency
7. **The Nun** - Testosterone Deficiency
8. **The Warrior** - Testosterone Excess (PCOS type)
9. **The Underdog** - Low Thyroid
10. **The Overachiever** - High Thyroid (Hyperthyroid)
11. **The Chairwoman** - Estrogen Dominance + Cortisol Excess
12. **The Philosopher** - Low Estrogen + Low Testosterone
13. **The Balanced** - Hormonally Balanced

## Scoring System

### Step 1: Point Allocation
- Each answer gives 1 point to each archetype it's mapped to
- Some answers map to 1 archetype (high-weight match)
- Some answers map to 2 archetypes (shared points)

### Step 2: High-Weight Matches
- Single-archetype answers are considered "high-weight matches"
- These are more specific indicators and get priority in tie-breaking

### Step 3: Final Ranking
The system sorts archetypes by:
1. **Total Score** (highest first)
2. **High-Weight Matches** (most specific matches first)
3. **Archetype Priority** (predefined hierarchy for tie-breaking)

## Archetype Priority Hierarchy

When scores are tied, the system uses this priority order (highest to lowest):

1. **The Balanced** - Highest priority (healthy profiles)
2. **The Philosopher** - Low hormone but stable
3. **The Nun** - Low testosterone
4. **The Underdog** - Low thyroid
5. **The Saboteur** - Cortisol deficiency
6. **The Workaholic** - Cortisol excess
7. **The Overachiever** - High thyroid
8. **The Warrior** - High testosterone
9. **The Wisewoman** - Estrogen deficiency
10. **The Unbalanced Heroine** - Progesterone deficiency
11. **The Mother** - Mixed estrogen/progesterone issues
12. **The Chairwoman** - Estrogen + cortisol excess
13. **The Queen** - Estrogen dominance (lowest priority)

## Example Calculation

Let's say a user answers:
- Q1: Option F (Regular periods) → 1 point to "balanced"
- Q2: Option F (Good sleep) → 1 point to "balanced"
- Q3: Option F (Normal mood) → 1 point to "balanced"
- Q4: Option E (No symptoms) → 1 point to "philosopher"
- Q5: Option F (Consistent energy) → 1 point to "balanced"
- Q6: Option E (Comfort food) → 1 point to "unbalanced-heroine"
- Q7: Option F (Satisfied after eating) → 1 point to "balanced"
- Q8: Option F (Healthy libido) → 1 point to "balanced"
- Q9: Option E (Calm and balanced) → 1 point to "balanced"

**Final Scores:**
- **The Balanced**: 7 points (7 high-weight matches)
- **The Philosopher**: 1 point (1 high-weight match)
- **The Unbalanced Heroine**: 1 point (1 high-weight match)

**Result**: "The Balanced" wins with 7 points and 7 high-weight matches.

## Why This System Works

### 1. Pattern Recognition
The quiz identifies patterns across multiple symptoms rather than relying on single indicators. This makes it more accurate than single-question assessments.

### 2. Weighted Scoring
High-weight matches (single-archetype answers) are prioritized because they're more specific indicators of hormone patterns.

### 3. Tie-Breaking Logic
The priority hierarchy ensures consistent results when multiple archetypes have similar scores.

### 4. Comprehensive Coverage
The 9 questions cover all major hormone systems:
- **Estrogen/Progesterone** (Questions 1, 3, 4, 8)
- **Cortisol** (Questions 2, 5, 7, 9)
- **Testosterone** (Questions 4, 8)
- **Thyroid** (Questions 4, 5, 7)

## Data Structure

### Questions Data (`questions.ts`)
```typescript
{
  id: 1,
  text: "Question text...",
  options: [
    {
      letter: "A",
      text: "Answer text...",
      archetypes: ["archetype1", "archetype2"]
    }
  ]
}
```

### Archetypes Data (`archetypes.ts`)
```typescript
{
  id: 'queen',
  name: 'The Queen',
  hormoneIssue: 'Estrogen Dominance',
  commonSymptoms: [...],
  cravings: [...],
  shines: { stress: "...", hormoneSupport: "...", ... },
  cta: { title: "...", buttonText: "...", url: "..." },
  color: 'bg-purple-100 text-purple-800'
}
```

### Quiz Logic (`quizLogic.ts`)
- `calculateArchetypeScores()`: Main scoring function
- `getDominantArchetype()`: Returns the winning archetype
- Priority hierarchy for tie-breaking

## Result Display

The quiz shows:
1. **Archetype Name** (e.g., "The Queen")
2. **Hormone Issue** (e.g., "Estrogen Dominance")
3. **Why You Matched**: Shows the specific symptoms and cravings the user selected
4. **SHINES Protocol**: 6-point personalized health plan
5. **Call-to-Action**: Next steps for the user

## Maintenance and Updates

### Adding New Questions
1. Add question to `questions.ts`
2. Map each answer to appropriate archetypes
3. Test with sample data

### Modifying Archetypes
1. Update archetype data in `archetypes.ts`
2. Adjust question mappings if needed
3. Update priority hierarchy if necessary

### Adding New Archetypes
1. Add archetype to `archetypes.ts`
2. Update question mappings
3. Add to priority hierarchy in `quizLogic.ts`

## Technical Implementation

### Files Structure
```
src/
├── data/
│   ├── questions.ts      # Question definitions and mappings
│   └── archetypes.ts     # Archetype profiles and data
├── utils/
│   └── quizLogic.ts      # Scoring and calculation logic
└── app/
    ├── quiz/page.tsx     # Quiz interface
    └── result/page.tsx   # Results display
```

### Key Functions
- `calculateArchetypeScores()`: Core scoring algorithm
- `getDominantArchetype()`: Final result determination
- `getSelectedSymptoms()`: Personalizes result display
- `getSelectedCravings()`: Shows user's specific cravings

## Conclusion

The Hormone Archetype Quiz uses a sophisticated but understandable scoring system that:
- **Accurately identifies** hormone patterns through multiple indicators
- **Provides personalized** results based on individual responses
- **Maintains consistency** through clear tie-breaking rules
- **Offers actionable** health recommendations through the SHINES protocol

This system makes complex hormone science accessible to everyone while maintaining medical accuracy and providing personalized health insights. 