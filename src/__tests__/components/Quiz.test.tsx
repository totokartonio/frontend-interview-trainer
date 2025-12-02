import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quiz } from "../../components/Quiz/Quiz.tsx";
import type { QuizQuestion } from "../../types/course";
import { renderWithRouter } from "../test-utils";

const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Что такое hoisting?",
    options: [
      { id: "opt-1-1", opt: "Поднятие переменных" },
      { id: "opt-1-2", opt: "Спуск переменных" },
      { id: "opt-1-3", opt: "Удаление переменных" },
      { id: "opt-1-4", opt: "Дублирование переменных" },
    ],
    correctAnswer: "opt-1-1",
    explanation:
      "Hoisting - это поднятие объявлений переменных и функций в начало области видимости",
  },
  {
    id: 2,
    question: "Какое значение вернёт этот код?",
    options: [
      { id: "opt-2-1", opt: "undefined" },
      { id: "opt-2-2", opt: "null" },
      { id: "opt-2-3", opt: "5" },
      { id: "opt-2-4", opt: "ReferenceError" },
    ],
    correctAnswer: "opt-2-1",
    explanation: "x объявлена но не инициализирована, поэтому будет undefined",
  },
];

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("Quiz компонент", () => {
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    mockOnComplete.mockClear();
  });

  it("должен отобразить первый вопрос", () => {
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
  });

  it("должен отобразить все варианты ответов для первого вопроса", () => {
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    mockQuestions[0].options.forEach((option) => {
      expect(screen.getByText(option.opt)).toBeInTheDocument();
    });
  });

  it("кнопки ответов должны быть кликабельны в начале", () => {
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    mockQuestions[0].options.forEach((opt) => {
      const button = screen.getByRole("radio", { name: opt.opt });
      expect(button).not.toBeDisabled();
    });
  });

  it("должен показать explanation после выбора правильного ответа", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const correctButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(correctButton);

    await waitFor(() => {
      expect(
        screen.getByText(mockQuestions[0].explanation)
      ).toBeInTheDocument();
    });
  });

  it("должен показать explanation после выбора неправильного ответа", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const incorrectButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[1].opt,
    });
    await user.click(incorrectButton);

    await waitFor(() => {
      expect(
        screen.getByText(mockQuestions[0].explanation)
      ).toBeInTheDocument();
    });
  });

  it("должен заблокировать все варианты после выбора ответа", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const firstOption = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(firstOption);

    await waitFor(() => {
      mockQuestions[0].options.forEach((option) => {
        const button = screen.getByRole("radio", { name: option.opt });
        expect(button).toBeDisabled();
      });
    });
  });

  it("должен показать правильный ответ зелёным цветом", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const correctButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(correctButton);

    await waitFor(() => {
      expect(correctButton).toHaveAttribute("data-label", "correctAnswer");
    });
  });

  it("должен показать неправильный ответ красным цветом", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const incorrectButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[1].opt,
    });
    await user.click(incorrectButton);

    await waitFor(() => {
      expect(incorrectButton).toHaveAttribute("data-label", "wrongAnswer");
      const correctButton = screen.getByRole("radio", {
        name: mockQuestions[0].options[0].opt,
      });
      expect(correctButton).toHaveAttribute("data-label", "correctAnswer");
    });
  });

  it('должна появиться кнопка "Следующий вопрос" после ответа', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    await waitFor(() => {
      expect(screen.getByText("Следующий вопрос")).toBeInTheDocument();
    });
  });

  it('должна быть кнопка "Следующий вопрос" активной', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    await waitFor(() => {
      const nextButton = screen.getByRole("button", {
        name: "Следующий вопрос",
      });
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('должна быть кнопка "Завершить" на последнем вопросе', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    let answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    let nextButton = await screen.findByRole("button", {
      name: "Следующий вопрос",
    });
    await user.click(nextButton);

    answerButton = screen.getByRole("radio", {
      name: mockQuestions[1].options[0].opt,
    });
    await user.click(answerButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Завершить" })
      ).toBeInTheDocument();
    });
  });

  it('кнопка "Завершить" должна быть активной', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    let answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    let nextButton = await screen.findByRole("button", {
      name: "Следующий вопрос",
    });
    await user.click(nextButton);

    answerButton = screen.getByRole("radio", {
      name: mockQuestions[1].options[0].opt,
    });
    await user.click(answerButton);

    await waitFor(() => {
      const finishButton = screen.getByRole("button", { name: "Завершить" });
      expect(finishButton).not.toBeDisabled();
    });
  });

  it("должен вызвать onComplete с 100% при 100% правильных ответах", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    let answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    let nextButton = await screen.findByRole("button", {
      name: "Следующий вопрос",
    });
    await user.click(nextButton);

    answerButton = screen.getByRole("radio", {
      name: mockQuestions[1].options[0].opt,
    });
    await user.click(answerButton);

    const finishButton = await screen.findByRole("button", {
      name: "Завершить",
    });
    await user.click(finishButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith(100);
    });
  });

  it("должен вызвать onComplete с 50% при половине правильных ответов", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    let answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    let nextButton = await screen.findByRole("button", {
      name: "Следующий вопрос",
    });
    await user.click(nextButton);

    answerButton = screen.getByRole("radio", {
      name: mockQuestions[1].options[1].opt,
    });
    await user.click(answerButton);

    const finishButton = await screen.findByRole("button", {
      name: "Завершить",
    });
    await user.click(finishButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith(50);
    });
  });

  it("должен вызвать onComplete с 0% при всех неправильных ответах", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    let answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[1].opt,
    });
    await user.click(answerButton);

    let nextButton = await screen.findByRole("button", {
      name: "Следующий вопрос",
    });
    await user.click(nextButton);

    answerButton = screen.getByRole("radio", {
      name: mockQuestions[1].options[1].opt,
    });
    await user.click(answerButton);

    const finishButton = await screen.findByRole("button", {
      name: "Завершить",
    });
    await user.click(finishButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith(0);
    });
  });

  it("не должен вызвать onComplete пока квиз не завершён", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    const answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  it("должен показать текущий вопрос номер при навигации", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Quiz questions={mockQuestions} onComplete={mockOnComplete} />
    );

    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();

    const answerButton = screen.getByRole("radio", {
      name: mockQuestions[0].options[0].opt,
    });
    await user.click(answerButton);

    const nextButton = await screen.findByRole("button", {
      name: "Следующий вопрос",
    });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[1].question)).toBeInTheDocument();
    });
  });
});
