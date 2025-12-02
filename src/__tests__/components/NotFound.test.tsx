import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotFound } from "../../components/NotFound/NotFound";
import { renderWithRouter } from "../test-utils";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
}));

import { useNavigate } from "@tanstack/react-router";

describe("NotFound компонент", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it("должен отобразить переданное сообщение", () => {
    const message = "Урок не найден";
    renderWithRouter(<NotFound message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('должна быть кнопка "На главную"', () => {
    renderWithRouter(<NotFound message="Ошибка" />);

    expect(
      screen.getByRole("button", { name: /На главную/i })
    ).toBeInTheDocument();
  });

  it('кнопка "На главную" должна быть активной', () => {
    renderWithRouter(<NotFound message="Ошибка" />);

    const button = screen.getByRole("button", { name: /На главную/i });
    expect(button).not.toBeDisabled();
  });

  it("должен навигировать на главную при клике на кнопку", async () => {
    const user = userEvent.setup();
    renderWithRouter(<NotFound message="Ошибка" />);

    const button = screen.getByRole("button", { name: /На главную/i });
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/",
    });
  });

  it("должен отобразить разные сообщения об ошибке", () => {
    const messages = [
      "Урок не найден",
      "Страница не существует",
      "Доступ запрещён",
    ];

    messages.forEach((message) => {
      const { unmount } = renderWithRouter(<NotFound message={message} />);
      expect(screen.getByText(message)).toBeInTheDocument();
      unmount();
    });
  });

  it("должен содержать правильные атрибуты на кнопке", () => {
    renderWithRouter(<NotFound message="Ошибка" />);

    const button = screen.getByRole("button", { name: /На главную/i });
    expect(button.tagName).toBe("BUTTON");
  });

  it("должен отобразить сообщение об ошибке в видном месте", () => {
    const message = "Урок не найден";
    renderWithRouter(<NotFound message={message} />);

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeVisible();
  });

  it("кнопка должна быть видима на странице", () => {
    renderWithRouter(<NotFound message="Ошибка" />);

    const button = screen.getByRole("button", { name: /На главную/i });
    expect(button).toBeVisible();
  });

  it("должен корректно работать с длинными сообщениями об ошибке", () => {
    const longMessage =
      "Возникла ошибка при попытке загрузить урок. Урок может быть недоступным или удалённым из системы.";
    renderWithRouter(<NotFound message={longMessage} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it("должен корректно работать с пустым сообщением", () => {
    renderWithRouter(<NotFound message="" />);

    expect(
      screen.getByRole("button", { name: /На главную/i })
    ).toBeInTheDocument();
  });
});
