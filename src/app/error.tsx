'use client'

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
{
  return (
    <html>
      <body>
    <div className="font-extrabold">
      <h2>Algo deu errado!</h2>
      <button onClick={() => reset()}>Tente novamente</button>
    </div>
    </body>
    </html>
  )
};
}