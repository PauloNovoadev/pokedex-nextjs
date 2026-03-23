import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GlobalError from "@/app/error";

describe("Error", () => {
  it("deve renderizar a mensagem de erro", () => {
    render(
      <GlobalError
        error={new Error("Erro de teste")}
        reset={() => {}}
      />
    );

    expect(screen.getByText("Algo deu errado!")).toBeInTheDocument();
    expect(screen.getByText("Tente novamente")).toBeInTheDocument();
  });

  it("deve chamar reset ao clicar no botão", () => {
    const resetMock = vi.fn();

    render(
      <GlobalError
        error={new Error("Erro de teste")}
        reset={resetMock}
      />
    );

    fireEvent.click(screen.getByText("Tente novamente"));

    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});