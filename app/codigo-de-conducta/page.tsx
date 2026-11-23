import PaginaDocumento, { leer } from "../documento/documento";

export const metadata = { title: "Código de conducta · HackUC3M ’27" };

export default function Page() {
  return <PaginaDocumento doc={leer("codigo-de-conducta")} />;
}
