import { describe, it, expect } from "vitest";
import loadOrRedirect from "../../utils/loadOrRedirect";
import { useProgressStore } from "../../store/progress";
import type { LessonType } from "../../types/course";

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

describe("loadOrRedirect", () => {
  describe("успешная загрузка урока", () => {
    it("должен вернуть урок если он доступен (пройдённый урок)", () => {
      const lesson = mockCourse.lessons[0];

      const result = loadOrRedirect({
        id: 1,
        currentLesson: 3,
        totalLessons: mockCourse.totalLessons,
        lesson,
      });

      expect(result).toEqual(lesson);
      expect(result.id).toBe(1);
      expect(result.title).toBe("Lesson 1");
    });

    it("должен вернуть урок если это текущий урок", () => {
      const lesson = mockCourse.lessons[2];

      const result = loadOrRedirect({
        id: 3,
        currentLesson: 3,
        totalLessons: mockCourse.totalLessons,
        lesson,
      });

      expect(result).toEqual(lesson);
    });

    it("должен вернуть урок если пользователь уже завершил его", () => {
      const lesson = mockCourse.lessons[0];

      const result = loadOrRedirect({
        id: 1,
        currentLesson: 5,
        totalLessons: mockCourse.totalLessons,
        lesson,
      });

      expect(result).toEqual(lesson);
    });
  });

  describe("ошибка: несуществующий урок", () => {
    it("должен выбросить redirect при id > totalLessons", () => {
      expect(() => {
        loadOrRedirect({
          id: 999,
          currentLesson: 3,
          totalLessons: mockCourse.totalLessons,
          lesson: undefined,
        });
      }).toThrow();
    });

    it("должен выбросить redirect при id < 0", () => {
      expect(() => {
        loadOrRedirect({
          id: -1,
          currentLesson: 3,
          totalLessons: mockCourse.totalLessons,
          lesson: undefined,
        });
      }).toThrow();
    });

    it("должен выбросить redirect при lesson === undefined", () => {
      expect(() => {
        loadOrRedirect({
          id: 1,
          currentLesson: 3,
          totalLessons: mockCourse.totalLessons,
          lesson: undefined,
        });
      }).toThrow();
    });

    it("должен выбросить с правильным сообщением об ошибке", () => {
      try {
        loadOrRedirect({
          id: 999,
          currentLesson: 3,
          totalLessons: mockCourse.totalLessons,
          lesson: undefined,
        });
      } catch (error: any) {
        expect(error.status).toBe(307);
      }
    });
  });

  describe("ошибка: заблокированный урок", () => {
    it("должен выбросить redirect если id > currentLesson", () => {
      expect(() => {
        loadOrRedirect({
          id: 5,
          currentLesson: 3,
          totalLessons: mockCourse.totalLessons,
          lesson: mockCourse.lessons[4],
        });
      }).toThrow();
    });

    it("должен выбросить при попытке открыть урок за пределами доступного диапазона", () => {
      expect(() => {
        loadOrRedirect({
          id: 4,
          currentLesson: 2,
          totalLessons: 3,
          lesson: undefined,
        });
      }).toThrow();
    });
  });

  describe("ошибка: completion без пройденного квиза", () => {
    it("должен выбросить redirect если completion=true но quizStats undefined", () => {
      expect(() => {
        loadOrRedirect({
          id: 1,
          currentLesson: 1,
          totalLessons: 3,
          lesson: mockCourse.lessons[0],
          completion: true,
          quizStats: undefined,
        });
      }).toThrow();
    });

    it("должен позволить completion если quizStats существует", () => {
      const lesson = mockCourse.lessons[0];

      const result = loadOrRedirect({
        id: 1,
        currentLesson: 1,
        totalLessons: 3,
        lesson,
        completion: true,
        quizStats: { bestScore: 85, lastScore: 85, passed: true },
      });

      expect(result).toEqual(lesson);
    });

    it("не должен требовать quizStats если completion=false", () => {
      const lesson = mockCourse.lessons[0];

      const result = loadOrRedirect({
        id: 1,
        currentLesson: 1,
        totalLessons: 3,
        lesson,
        completion: false,
        quizStats: undefined,
      });

      expect(result).toEqual(lesson);
    });
  });

  describe("граничные случаи", () => {
    it("должен позволить открыть первый урок при currentLesson === 1", () => {
      const lesson = mockCourse.lessons[0];

      const result = loadOrRedirect({
        id: 1,
        currentLesson: 1,
        totalLessons: 3,
        lesson,
      });

      expect(result).toEqual(lesson);
    });

    it("должен позволить открыть последний доступный урок", () => {
      const lesson = mockCourse.lessons[2];

      const result = loadOrRedirect({
        id: 3,
        currentLesson: 5,
        totalLessons: 10,
        lesson,
      });

      expect(result).toEqual(lesson);
    });

    it("должен запретить открыть следующий урок даже на 1 номер выше", () => {
      expect(() => {
        loadOrRedirect({
          id: 4,
          currentLesson: 3,
          totalLessons: 10,
          lesson: mockCourse.lessons[3] as LessonType,
        });
      }).toThrow();
    });
  });

  describe("тестирование с реальным store", () => {
    it("loader должен использовать currentLesson из store", () => {
      useProgressStore.setState({
        currentLesson: 2,
        course: mockCourse,
      });

      const { currentLesson } = useProgressStore.getState();
      const lesson = mockCourse.lessons[1];

      const result = loadOrRedirect({
        id: 2,
        currentLesson,
        totalLessons: mockCourse.totalLessons,
        lesson,
      });

      expect(result.id).toBe(2);
    });

    it("loader должен блокировать урок если он выше currentLesson", () => {
      useProgressStore.setState({
        currentLesson: 2,
        course: mockCourse,
      });

      const { currentLesson } = useProgressStore.getState();

      expect(() => {
        loadOrRedirect({
          id: 3,
          currentLesson,
          totalLessons: mockCourse.totalLessons,
          lesson: mockCourse.lessons[2],
        });
      }).toThrow();
    });
  });
});
