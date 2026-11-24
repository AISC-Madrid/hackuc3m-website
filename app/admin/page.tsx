import "../(landing)/landing.css"; // la vista previa de tracks y cinta usa el CSS real de la landing
import "./admin.css";
import Panel from "./panel";

export const metadata = {
  title: "Organización · HackUC3M",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <Panel />;
}
