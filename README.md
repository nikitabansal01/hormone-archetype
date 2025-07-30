# Hormone Archetype Quiz

A full-stack web application built with Next.js, TypeScript, and Tailwind CSS that helps users discover their hormone archetype through a comprehensive 9-question quiz.

## Features

- **Interactive Quiz**: 9 carefully crafted questions to determine hormone archetype
- **12 Hormone Archetypes**: Comprehensive profiles including The Queen, The Warrior, The Workaholic, and more
- **Personalized Results**: Custom SHINES protocol recommendations for each archetype
- **Mobile-First Design**: Responsive design that works on all devices
- **Beautiful UI/UX**: Modern, clean interface with smooth animations
- **Progress Tracking**: Visual progress indicator and question navigation

## Hormone Archetypes

The application includes 12 unique hormone archetypes:

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

## SHINES Protocol

Each archetype comes with a personalized SHINES protocol covering:

- **S** - Stress management
- **H** - Hormone support
- **I** - Inflammation reduction
- **N** - Nutrition optimization
- **E** - Exercise recommendations
- **S** - Sleep optimization

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hormone-archetype-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── quiz/
│   │   └── page.tsx         # Quiz interface
│   └── result/
│       └── page.tsx         # Results page
├── data/
│   ├── archetypes.ts        # Archetype definitions
│   └── questions.ts         # Quiz questions
└── utils/
    └── quizLogic.ts         # Quiz scoring logic
```

## Quiz Logic

The quiz uses a sophisticated scoring system:

1. Each answer maps to 1-2 archetypes
2. Points are awarded based on matches
3. High-weight matches (single archetype answers) are prioritized
4. Tie-breaking uses archetype priority hierarchy
5. Results are calculated in real-time

## Customization

### Adding New Archetypes

1. Add archetype data to `src/data/archetypes.ts`
2. Update question mappings in `src/data/questions.ts`
3. Add to priority list in `src/utils/quizLogic.ts`

### Modifying Questions

1. Edit questions in `src/data/questions.ts`
2. Update archetype mappings as needed
3. Test scoring logic in `src/utils/quizLogic.ts`

### Styling

- Colors and themes are defined in Tailwind classes
- Each archetype has a unique color scheme
- Responsive design uses Tailwind breakpoints

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with zero configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ for women's hormone health and wellness.
