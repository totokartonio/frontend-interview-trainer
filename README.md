# Frontend Interview Trainer

Live demo: https://frontend-trainer.netlify.app/

An interactive web app for preparing for frontend interviews through bite-sized lessons, practice tasks, and quizzes.

---

## Features

### Curriculum

22 lessons covering core frontend topics:

- JavaScript fundamentals: types, scope, closures, `this`, prototypes
- Asynchronous JavaScript: promises, async/await, event loop
- TypeScript: types, generics, utility types
- React: hooks, performance, testing
- HTML5 and CSS: semantics, Flexbox, Grid, layout architecture
- Data structures and basic algorithms
- Git, DevTools, and interview strategy

### Learning experience

- Structured lessons with theory, key takeaways, and practice tasks
- Quizzes with instant feedback and short explanations
- Progress tracking, including completion stats and best quiz attempts

### Gamification and progress

- Daily streak counter
- One‑day "freeze" if you miss a day
- Visual indicators for progress and unlocked lessons
- Lessons unlock sequentially based on quiz completion
- All progress stored locally in `localStorage`

---

## Tech Stack

### Core

- React 19.2
- TypeScript 5.9
- Vite 7.2
- TanStack Router 1.139 (file‑based, type‑safe routing)

### UI & styling

- Mantine 8.3
- Tabler Icons
- CSS Modules
- View Transitions API for smoother page changes

### State management

- Zustand 5.0
- Zustand Persist for `localStorage` persistence

### Testing

- Vitest 4.0
- React Testing Library 16.3
- JSDOM

### Code quality

- ESLint
- TypeScript ESLint rules

---

## Getting Started

### Prerequisites

- Bun 1.0+

### Installation

```bash
git clone https://github.com/yourusername/frontend-interview-trainer.git
cd frontend-interview-trainer

bun install
```

### Run the development server

```bash
bun run dev
```

Then open:

```
http://localhost:5173
```

---

## Available Scripts

```bash
bun run dev           # Start development server
bun run build         # Build for production
bun run preview       # Preview production build
bun run lint          # Run ESLint
bun run test          # Run tests
bun run test:ui       # Run tests with UI runner
bun run test:coverage # Generate coverage report
bun run test:watch    # Run tests in watch mode
```

---

## Project Structure

```text
src/
├── components/           # Reusable UI components
│   ├── Completion/       # Quiz completion screen
│   ├── Home/             # Dashboard with lesson grid
│   ├── Lesson/           # Lesson content display
│   ├── NotFound/         # 404 page
│   └── Quiz/             # Interactive quiz component
├── data/
│   ├── constants.ts      # App constants
│   └── course.json       # Course content and structure
├── routes/               # TanStack Router pages
│   ├── __root.tsx        # Root layout
│   ├── index.tsx         # Home page
│   ├── lesson.$lessonId.tsx
│   ├── quiz.$lessonId.tsx
│   └── completion.$lessonId.tsx
├── store/
│   └── progress.ts       # Zustand store for user progress
├── styles/               # Global styles
├── types/                # Shared TypeScript types
├── utils/                # Helper functions
└── __tests__/            # Test files
```

---

## How It Works

### Learning flow

1. **Dashboard** – See all lessons, streak, and overall progress.
2. **Lesson** – Read the theory, important points, and suggested practice tasks.
3. **Quiz** – Answer multiple-choice questions for the current lesson.
4. **Completion** – View your score and move on to the next lesson.

### Progress system

- Lessons unlock one by one as you pass quizzes
- Passing threshold: 60% correct answers
- Daily streak counter tracks consecutive learning days
- One‑day freeze so a single missed day does not reset your streak
- Progress and best scores are stored in `localStorage`

### Quiz features

- Multiple‑choice questions with immediate feedback
- Explanations for each answer
- Visual indicators for correct and incorrect answers
- Progress bar and question counter
- Best attempt per quiz is saved

---

## Testing

The project includes tests for:

- Components (UI behavior and interactions)
- Store (state management logic)
- Utilities (pure helper functions)

Common commands:

```bash
bun run test          # Run all tests
bun run test:ui       # Run tests with UI
bun run test:coverage # Generate coverage report
```

---

## Design

- Responsive layout for desktop, tablet, and mobile
- Semantic HTML with basic accessibility in mind
- Smooth page transitions using the View Transitions API
- Color‑coded lesson states and progress
- Consistent UI built with Mantine components

---

## Course Outline

The course is split into 22 lessons:

- **JavaScript Core (1–7):** types, scope, closures, `this`, prototypes, async, API calls
- **HTML & CSS (8–10):** semantics, accessibility, Flexbox, Grid, layout architecture
- **Algorithms (11–12):** arrays, strings, sorting, stack, queue, recursion
- **TypeScript (13–15):** core types, generics, React integration
- **React (16–18):** fundamentals, hooks, performance, testing
- **Tools & Process (19–20):** Git, DevTools, debugging workflow
- **Interview Prep (21–22):** formats, strategy, final project

---

## Deployment

The app is deployed on Netlify with continuous deployment from the `main` branch.

Build configuration:

- Build command: `bun run build`
- Publish directory: `dist`

---

## License

This project is open source and available under the [MIT License](https://claude.ai/chat/LICENSE).

---

## Contact

Repository: https://github.com/totokartonio/frontend-interview-trainer  
Live demo: https://frontend-trainer.netlify.app/
