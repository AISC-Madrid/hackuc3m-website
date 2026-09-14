"use client";

import { useState } from "react";

const CONTACT_EMAIL = "aisc.asoc@uc3m.es";

export default function HeroActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <span className="rounded-full bg-plum px-7 py-3 text-sm font-medium text-cream">
          Inscripciones próximamente
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="contacto-empresas"
          className="cursor-pointer rounded-full border border-violet/30 px-7 py-3 text-sm font-medium text-violet transition hover:border-violet"
        >
          Soy una empresa
        </button>
      </div>

      <div
        id="contacto-empresas"
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="overflow-hidden text-ink/75">
          Contáctanos en{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=HackUC3M%20'27%20·%20Empresas`}
            tabIndex={open ? 0 : -1}
            className="font-medium text-plum underline decoration-rose/40 underline-offset-4 hover:decoration-rose"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}
