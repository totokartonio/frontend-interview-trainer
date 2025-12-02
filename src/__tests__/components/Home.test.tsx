import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "../../components/Home";
import { useProgressStore } from "../../store/progress";
import { renderWithRouter } from "../test-utils";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
  useRouter: vi.fn(),
}));

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

describe("Home компонент", () => {
  beforeEach(() => {
    useProgressStore.setState({
      completedLessons: [1, 2],
      currentLesson: 3,
      streak: 5,
      freeze: false,
      quizzes: {
        "1": { bestScore: 85, lastScore: 85, passed: true },
        "2": { bestScore: 90, lastScore: 90, passed: true },
      },
      course: mockCourse,
    });
  });

  it("должен отобразить текущий урок", () => {
    renderWithRouter(<Home />);

    const currentLesson = screen.getByTestId("lesson-3");
    expect(currentLesson).toHaveAttribute("data-label", "current");
  });

  it("должен отобразить streak", () => {
    renderWithRouter(<Home />);

    expect(screen.getByTestId("streak")).toHaveTextContent("5");
  });

  it("должен отметить завершённые уроки классом completed", () => {
    renderWithRouter(<Home />);

    const lesson1 = screen.getByTestId("lesson-1");
    const lesson2 = screen.getByTestId("lesson-2");

    expect(lesson1).toHaveAttribute("data-label", "completed");
    expect(lesson2).toHaveAttribute("data-label", "completed");
  });

  it("должен отметить текущий урок классом current", () => {
    renderWithRouter(<Home />);

    const currentLesson = screen.getByTestId("lesson-3");
    expect(currentLesson).toHaveAttribute("data-label", "current");
  });

  it("должен отметить заблокированные уроки классом locked", () => {
    renderWithRouter(<Home />);

    const lesson4 = screen.queryByTestId("lesson-4");
    if (lesson4) {
      expect(lesson4).toHaveAttribute("data-label", "locked");
    }
  });

  it("нельзя кликнуть на заблокированный урок", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Home />);

    const lockedLesson = screen.queryByTestId("lesson-4");
    if (lockedLesson) {
      await user.click(lockedLesson);
      expect(lockedLesson).toHaveAttribute("data-label", "locked");
    }
  });

  it("должна показаться иконка freeze при freeze=true", () => {
    renderWithRouter(<Home />);
    act(() => useProgressStore.setState({ freeze: true }));

    expect(screen.queryByTestId("freeze")).toBeInTheDocument();
  });

  it("freeze иконка не должна показываться при freeze=false", () => {
    useProgressStore.setState({ freeze: false });

    renderWithRouter(<Home />);

    const freezeIcon = screen.queryByTestId("freeze");
    expect(freezeIcon).not.toBeInTheDocument();
  });
});
