import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Página não encontrada.</h2>
      <p>O Elemento da busca não existe.</p>
      <Link href="/">Voltar para a Home</Link>
    </div>
  );
}