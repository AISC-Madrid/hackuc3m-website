import Image from "next/image";
import Link from "next/link";
export const metadata = { title: "Página no encontrada · HackUC3M" };
export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found-code" aria-hidden="true">
        <span>4</span>
        <span className="charlie-coin">
          <Image src="/charlie.svg" alt="" width={624} height={628} unoptimized />
        </span>
        <span>4</span>
      </p>
      <h1>Real Decreto 404</h1>
      <p className="not-found-lead">
        Por el presente se hace saber que la página que buscas no existe en
        estos dominios.
      </p>
      <p className="not-found-signature">Firmado: Carlos III</p>
      <Link className="button primary" href="/">
        Volver al inicio
      </Link>
    </main>
  );
}
