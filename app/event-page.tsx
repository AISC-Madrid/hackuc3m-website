import Image from "next/image";
import type { EventContent } from "@/lib/event";
import WaitlistForm from "./waitlist-form";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}
function Calendar() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 11h18" />
    </svg>
  );
}
function Location() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function EventPage({ event }: { event: EventContent }) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header wrap">
        <a className="wordmark" href="#" aria-label="HackUC3M, inicio">
          <Image
            src="/hackuc3m-mark.svg"
            alt=""
            width={64}
            height={64}
            unoptimized
          />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#encuentro">El hackathon</a>
          <a href="#retos">Tracks</a>
          <a href="#partners">Colaboradores</a>
          <a href="#dudas">FAQ</a>
        </nav>
        <a className="header-cta" href="#lista">
          Preinscríbete <Arrow />
        </a>
      </header>
      <main id="contenido">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-light" aria-hidden="true" />
          <h1 id="hero-title">
            HackUC3M <span>’27</span>
          </h1>
          <p className="hero-description">
            El hackathon de la Universidad Carlos III de Madrid.
            <br className="desktop-break" /> Dos días para construir, en equipo.
          </p>
          <div className="hero-actions">
            <a href="#lista" className="button primary">
              Preinscribirme <Arrow />
            </a>
            <a
              href="mailto:aisc.asoc@uc3m.es?subject=HackUC3M%2027%20Colaboraci%C3%B3n"
              className="button secondary"
            >
              Quiero colaborar <Arrow diagonal />
            </a>
          </div>
          <p className="hero-status">
            <span className="status-dot" />
            {event.waitlistOpen
              ? "Preinscripción abierta · Tendrás prioridad al inscribirte."
              : "Próximamente, más novedades."}
          </p>
          <div className="event-strip">
            <div>
              <Calendar />
              <span>{event.date}</span>
            </div>
            <div>
              <Location />
              <span>{event.venue}</span>
            </div>
            <a href="https://aiscmadrid.com" target="_blank" rel="noreferrer">
              <span>Organiza</span>
              <Image
                src="/aisc/Property 1=AISC Lockup White.svg"
                alt="AISC Madrid"
                width={116}
                height={30}
                unoptimized
              />
            </a>
          </div>
        </section>
        <section id="encuentro" className="intro-section wrap section-space">
          <h2>
            Retos de la industria.
            <br />
            <span>Talento universitario.</span>
          </h2>
          <div className="intro-body">
            <p className="large-copy">{event.intro}</p>
            <p>
              Nos reunimos en Leganés para trabajar en equipo, probar ideas y
              construir soluciones.
            </p>
            <a className="text-link" href="#lista">
              Preinscríbete con prioridad <Arrow />
            </a>
          </div>
        </section>
        <section id="retos" className="tracks-section wrap section-space">
          <div className="section-heading">
            <h2>Los tracks.</h2>
            <p>Problemas reales. Distintas formas de resolverlos.</p>
          </div>
          {event.tracks.length ? (
            <div className="track-list">
              {event.tracks.map((track) => (
                <article key={track.title}>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                  <Arrow diagonal />
                </article>
              ))}
            </div>
          ) : (
            <div className="tracks-pending">
              <div className="pending-mark" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div>
                <h3>Varios retos confirmados.</h3>
                <p>
                  Pronto publicaremos los tracks, las empresas participantes y
                  todos los detalles.
                </p>
              </div>
              <span className="pending-label">Detalles próximamente</span>
            </div>
          )}
          <div className="prize-announcement">
            <svg
              aria-hidden="true"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M8 3h8v6a4 4 0 0 1-8 0V3Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 2v5m-4 3h8m-6-3h4v3" />
            </svg>
            <div>
              <h3>Gran premio.</h3>
              <p>Lo anunciaremos pronto.</p>
            </div>
          </div>
        </section>
        <section id="lista" className="waitlist-section">
          <div className="wrap waitlist-layout section-space">
            <div>
              <h2>
                Preinscríbete ahora.
                <br />
                <span>Tendrás prioridad.</span>
              </h2>
              <p>
                Déjanos tu email. Te enviaremos el enlace cuando abramos
                inscripciones. Las personas preinscritas tendrán prioridad para
                apuntarse.
              </p>
              <div className="waitlist-note">
                <span className="status-dot" />
                <span>
                  {event.waitlistOpen
                    ? "Preinscripciones abiertas"
                    : "Preinscripciones cerradas"}
                </span>
              </div>
            </div>
            <WaitlistForm open={event.waitlistOpen} />
          </div>
        </section>
        <section id="partners" className="partners-section wrap section-space">
          <div>
            <h2>
              Construyamos
              <br />
              esta edición juntos.
            </h2>
            <p>
              Acerca los retos de tu empresa al talento universitario. Hablemos
              de patrocinio y colaboración.
            </p>
            <a
              className="text-link"
              href="mailto:aisc.asoc@uc3m.es?subject=HackUC3M%2027%20Colaboraci%C3%B3n"
            >
              Contactar con la organización <Arrow diagonal />
            </a>
          </div>
          <div className="partner-area">
            {event.sponsors.length ? (
              event.sponsors.map((s) => (
                <a
                  className="sponsor-name"
                  key={s.name}
                  href={s.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {s.name}
                  <Arrow diagonal />
                </a>
              ))
            ) : (
              <>
                <span>Colaboradores</span>
                <p>Próximamente anunciaremos quiénes nos acompañan.</p>
                <a
                  href="https://aiscmadrid.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/aisc/Property 1=AISC Lockup White.svg"
                    alt="Organiza AISC Madrid"
                    width={154}
                    height={42}
                    unoptimized
                  />
                </a>
              </>
            )}
          </div>
        </section>
        <section id="dudas" className="faq-section wrap section-space">
          <h2>Preguntas frecuentes.</h2>
          <div>
            {event.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <div>
          <a className="footer-wordmark" href="#">
            HackUC3M <span>’27</span>
          </a>
          <p>
            Una iniciativa de <a href="https://aiscmadrid.com">AISC Madrid</a>
          </p>
        </div>
        <a href="mailto:aisc.asoc@uc3m.es">aisc.asoc@uc3m.es</a>
        <a href="/privacidad">Privacidad</a>
      </footer>
    </>
  );
}
