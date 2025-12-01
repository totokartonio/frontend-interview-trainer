import { describe, it, expect, beforeEach, vi } from "vitest";
import { useProgressStore } from "../../store/progress";

const mockQuestions = [
  {
    id: 1,
    question: "Question 1",
    options: [
      { id: "opt-1-1", opt: "1" },
      { id: "opt-1-2", opt: "2" },
      { id: "opt-1-3", opt: "3" },
      { id: "opt-1-4", opt: "4" },
    ],
    correctAnswer: "opt-1-1",
    explanation: "Explanation",
  },
  {
    id: 2,
    question: "Question 2",
    options: [
      { id: "opt-2-1", opt: "1" },
      { id: "opt-2-2", opt: "2" },
      { id: "opt-2-3", opt: "3" },
      { id: "opt-2-4", opt: "4" },
    ],
    correctAnswer: "opt-2-2",
    explanation: "Explanation",
  },
  {
    id: 3,
    question: "Question 3",
    options: [
      { id: "opt-3-1", opt: "1" },
      { id: "opt-3-2", opt: "2" },
      { id: "opt-3-3", opt: "3" },
      { id: "opt-3-4", opt: "4" },
    ],
    correctAnswer: "opt-3-3",
    explanation: "Explanation",
  },
  {
    id: 4,
    question: "Question 4",
    options: [
      { id: "opt-4-1", opt: "1" },
      { id: "opt-4-2", opt: "2" },
      { id: "opt-4-3", opt: "3" },
      { id: "opt-4-4", opt: "4" },
    ],
    correctAnswer: "opt-4-4",
    explanation: "Explanation",
  },
];

const mockCourse = {
  title: "JavaScript Basics",
  duration: "3",
  lessonsPerWeek: 3,
  totalLessons: 3,
  lessons: [
    {
      id: 1,
      title: "Lesson 1",
      theory: {
        topics: ["Topic 1", "Topic 2", "Topic 3"],
        keyPoints: ["Keypoint 1", "Keypoint 2", "Keypoint 3"],
        content: "Content",
      },
      practice: ["Practice"],
      quiz: mockQuestions,
    },
    {
      id: 2,
      title: "Lesson 2",
      theory: {
        topics: ["Topic 1", "Topic 2", "Topic 3"],
        keyPoints: ["Keypoint 1", "Keypoint 2", "Keypoint 3"],
        content: "Content",
      },
      practice: ["Practice"],
      quiz: mockQuestions,
    },
    {
      id: 3,
      title: "Lesson 3",
      theory: {
        topics: ["Topic 1", "Topic 2", "Topic 3"],
        keyPoints: ["Keypoint 1", "Keypoint 2", "Keypoint 3"],
        content: "Content",
      },
      practice: ["Practice"],
      quiz: mockQuestions,
    },
  ],
};

describe("useProgressStore", () => {
  beforeEach(() => {
    useProgressStore.setState({
      lastCompletedDate: null,
      currentLesson: 1,
      completedLessons: [],
      quizzes: {},
      streak: 0,
      course: mockCourse,
      freeze: false,
    });
  });

  describe("saveQuizResult", () => {
    it("должен сохранить результат квиза с score и passed", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 85);

      const state = useProgressStore.getState();
      expect(state.quizzes["1"]).toBeDefined();
      expect(state.quizzes["1"].lastScore).toBe(85);
      expect(state.quizzes["1"].passed).toBe(true);
    });

    it("должен установить passed=false при score <= 60", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 55);

      const state = useProgressStore.getState();
      expect(state.quizzes["1"].passed).toBe(false);
    });

    it("должен установить passed=true при score > 60", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 65);

      const state = useProgressStore.getState();
      expect(state.quizzes["1"].passed).toBe(true);
    });

    it("должен увеличить streak при успешной сдаче урока на следующий день", () => {
      vi.useFakeTimers();

      try {
        const today = new Date(2024, 0, 1);
        const tomorrow = new Date(2024, 0, 2);

        useProgressStore.setState({
          lastCompletedDate: today.toISOString(),
          streak: 1,
        });

        vi.setSystemTime(tomorrow);

        const { saveQuizResult } = useProgressStore.getState();
        saveQuizResult("1", 75);

        const state = useProgressStore.getState();
        expect(state.streak).toBe(2);
      } finally {
        vi.useRealTimers();
      }
    });

    it("должен сбросить streak при пропуске > 2 дней", () => {
      vi.useFakeTimers();

      try {
        const today = new Date(2024, 0, 1);
        const threeDaysLater = new Date(2024, 0, 4);

        useProgressStore.setState({
          lastCompletedDate: today.toISOString(),
          streak: 5,
        });

        vi.setSystemTime(threeDaysLater);

        const { saveQuizResult } = useProgressStore.getState();
        saveQuizResult("1", 75);

        const state = useProgressStore.getState();
        expect(state.streak).toBe(1);
      } finally {
        vi.useRealTimers();
      }
    });

    it("freeze используется и сбрасывается при сдаче на 2-й день", () => {
      vi.useFakeTimers();

      try {
        const today = new Date(2024, 0, 1);
        const twoDaysLater = new Date(2024, 0, 3);

        useProgressStore.setState({
          lastCompletedDate: today.toISOString(),
          freeze: true,
          streak: 1,
        });

        vi.setSystemTime(twoDaysLater);

        const { saveQuizResult } = useProgressStore.getState();
        saveQuizResult("2", 75);

        const state = useProgressStore.getState();
        expect(state.freeze).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it("freeze НЕ сбрасывается при провале квиза", () => {
      vi.useFakeTimers();

      try {
        const today = new Date(2024, 0, 1);
        const twoDaysLater = new Date(2024, 0, 3);

        useProgressStore.setState({
          lastCompletedDate: today.toISOString(),
          freeze: true,
        });

        vi.setSystemTime(twoDaysLater);

        const { saveQuizResult } = useProgressStore.getState();
        saveQuizResult("1", 55);

        const state = useProgressStore.getState();
        expect(state.freeze).toBe(true);
      } finally {
        vi.useRealTimers();
      }
    });

    it("должен добавить lessonId в completedLessons при успешной сдаче", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 75);

      const state = useProgressStore.getState();
      expect(state.completedLessons).toContain(1);
    });

    it("пересдача НЕ должна добавлять дубликат в completedLessons", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 75);
      let state = useProgressStore.getState();
      expect(state.completedLessons.filter((id) => id === 1).length).toBe(1);

      saveQuizResult("1", 85);
      state = useProgressStore.getState();
      expect(state.completedLessons.filter((id) => id === 1).length).toBe(1);
    });

    it("пересдача не должна влиять на streak если урок уже пройден", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 75);
      const firstState = useProgressStore.getState();
      const initialStreak = firstState.streak;

      saveQuizResult("1", 65);
      const secondState = useProgressStore.getState();

      expect(secondState.streak).toBe(initialStreak);
    });

    it("bestScore обновляется только при улучшении результата", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 85);
      let state = useProgressStore.getState();
      expect(state.quizzes["1"].bestScore).toBe(85);

      saveQuizResult("1", 75);
      state = useProgressStore.getState();
      expect(state.quizzes["1"].bestScore).toBe(85);

      saveQuizResult("1", 90);
      state = useProgressStore.getState();
      expect(state.quizzes["1"].bestScore).toBe(90);
    });

    it("должен переместить currentLesson на следующий урок при успешной сдаче", () => {
      const { saveQuizResult } = useProgressStore.getState();

      useProgressStore.setState({ currentLesson: 1 });

      saveQuizResult("1", 75);

      const state = useProgressStore.getState();
      expect(state.currentLesson).toBe(2);
    });

    it("должен обновить lastCompletedDate при успешной сдаче", () => {
      const { saveQuizResult } = useProgressStore.getState();

      saveQuizResult("1", 75);

      const state = useProgressStore.getState();
      expect(state.lastCompletedDate).toBeDefined();
      expect(typeof state.lastCompletedDate).toBe("string");
    });
  });

  describe("setFreeze", () => {
    it("freeze активируется на 2-й день после последнего урока", () => {
      vi.useFakeTimers();

      try {
        const today = new Date(2024, 0, 1);
        const twoDaysLater = new Date(2024, 0, 3);

        useProgressStore.setState({
          lastCompletedDate: today.toISOString(),
        });

        vi.setSystemTime(twoDaysLater);

        const { setFreeze } = useProgressStore.getState();
        setFreeze();

        const state = useProgressStore.getState();
        expect(state.freeze).toBe(true);
      } finally {
        vi.useRealTimers();
      }
    });

    it("freeze НЕ активируется на 1-й день", () => {
      vi.useFakeTimers();

      try {
        const today = new Date(2024, 0, 1);

        useProgressStore.setState({
          lastCompletedDate: today.toISOString(),
        });

        vi.setSystemTime(today);

        const { setFreeze } = useProgressStore.getState();
        setFreeze();

        const state = useProgressStore.getState();
        expect(state.freeze).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it("freeze НЕ активируется на 3-й+ день", () => {
      vi.useFakeTimers();

      try {
        const today = new Date(2024, 0, 1);
        const threeDaysLater = new Date(2024, 0, 4);

        useProgressStore.setState({
          lastCompletedDate: today.toISOString(),
        });

        vi.setSystemTime(threeDaysLater);

        const { setFreeze } = useProgressStore.getState();
        setFreeze();

        const state = useProgressStore.getState();
        expect(state.freeze).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });
  });
});
