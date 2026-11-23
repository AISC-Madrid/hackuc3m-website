import PaginaDocumento, { leer } from "../documento/documento";

export const metadata = { title: "Cómo llegar · HackUC3M ’27" };

export default function Page() {
  return <PaginaDocumento doc={leer("como-llegar")} />;
}
