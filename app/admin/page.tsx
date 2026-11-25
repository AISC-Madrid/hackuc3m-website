import "../(landing)/landing.css"; // la vista previa de tracks y cinta usa el CSS real de la landing
import "./admin.css";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { authorizedHeaders } from "@/lib/admin";
import Panel from "./panel";

export const metadata = {
  title: "Organización · HackUC3M",
  robots: { index: false, follow: false },
};

// Sin sesión de Cloudflare Access no existe: en producción Access corta antes, pero en
// las URLs de preview (workers.dev) no hay Access delante.
export default async function AdminPage() {
  if (!(await authorizedHeaders(await headers()))) notFound();
  return <Panel />;
}
