import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oops, algo aconteceu</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontrará mais detalhes
      </p>
      <pre>{error?.message || JSON.stringify(error, null, 2)}</pre>
      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link to="/" className="text-sky-600 underline dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
