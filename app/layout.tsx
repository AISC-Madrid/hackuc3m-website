import type { Metadata } from "next";
import { Cinzel, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackUC3M '27 · Primer hackathon oficial de la UC3M",
  description:
    "20 y 21 de febrero de 2027 · EPS, Campus de Leganés. Dos días, retos reales propuestos por la industria y el mejor talento técnico universitario.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
      <Analytics />
    </html>
  );
}
