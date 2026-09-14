import Image from "next/image";
import HeroActions from "./hero-actions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <Image
          src="/LogoHackUc3m.svg"
          alt=""
          width={180}
          height={180}
          priority
          unoptimized
          className="mb-10 h-36 w-36 sm:h-44 sm:w-44"
        />
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-plum">
          1º Hackathon oficial · Universidad Carlos III de Madrid
        </p>
        <h1 className="font-display text-5xl font-bold tracking-wide text-violet sm:text-7xl">
          HackUC3M <span className="text-rose">&apos;27</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
          Dos días, retos reales propuestos por la industria y el mejor talento
          técnico universitario.
        </p>

        <div className="brand-rule my-10 w-full max-w-md" />

        <div className="flex flex-col gap-2 font-display text-lg tracking-wide text-ink sm:flex-row sm:gap-6">
          <span>20 – 21 febrero 2027</span>
          <span className="hidden text-sky sm:inline">◆</span>
          <span>EPS · Campus de Leganés</span>
        </div>

        <HeroActions />
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-3 px-6 pb-10 text-sm text-ink/60">
        <span>Organiza</span>
        <Image
          src="/aisc/Property%201=AISC%20Lockup%20Color.svg"
          alt="AISC Madrid"
          width={126}
          height={32}
          unoptimized
          className="h-8 w-auto"
        />
      </footer>
    </main>
  );
}
