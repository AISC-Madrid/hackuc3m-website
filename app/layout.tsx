import type { Metadata } from "next";
import {
  Brygada_1918,
  Cinzel,
  Corinthia,
  Ibarra_Real_Nova,
  Xanh_Mono,
} from "next/font/google";
import Desplazamiento from "./desplazamiento";
import "./globals.css";

// next/font sirve las fuentes desde el propio dominio: no se llama a Google en tiempo de ejecución.
const ibarra = Ibarra_Real_Nova({
  variable: "--font-ibarra",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const brygada = Brygada_1918({
  variable: "--font-brygada",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700"],
});
const corinthia = Corinthia({
  variable: "--font-corinthia",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});
const xanh = Xanh_Mono({
  variable: "--font-xanh",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "HackUC3M ’27 · Hackathon en la Universidad Carlos III de Madrid",
  description:
    "19 y 20 de febrero de 2027 · EPS, Campus de Leganés. Dos días para resolver en equipo retos reales de la industria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={[ibarra, brygada, cinzel, corinthia, xanh]
        .map((f) => f.variable)
        .join(" ")}
    >
      <body>
        {children}
        <Desplazamiento />
      </body>
    </html>
  );
}
