import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NotFoundPage from "@/app/not-found";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("NotFoundPage", () => {
  it("deve renderizar a página 404 corretamente", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("Página não encontrada.")).toBeInTheDocument();
    expect(screen.getByText("O Elemento da busca não existe.")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Voltar para a Home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});