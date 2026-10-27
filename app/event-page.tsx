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

const collaborationMail =
  "mailto:aisc.asoc@uc3m.es?subject=HackUC3M%2027%20Colaboraci%C3%B3n";

export default function EventPage({ event }: { event: EventContent }) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header wrap">
        <a className="brand-mark" href="#" aria-label="HackUC3M, inicio">
          <Image
            src="/hackuc3m-mark.svg"
            alt=""
            width={48}
            height={48}
            unoptimized
          />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#encuentro">El hackathon</a>
          <a href="#retos">Tracks</a>
          <a href="#partners">Colaboradores</a>
          <a href="#dudas">FAQ</a>
        </nav>
        <a className="button secondary compact" href="#lista">
          Preinscríbete
        </a>
      </header>
      <main id="contenido">
        <section className="hero wrap" aria-labelledby="hero-title">
          <h1 id="hero-title">
            HackUC3M <span>’27</span>
          </h1>
          <p className="lead">
            El hackathon de la Universidad Carlos III de Madrid.
            <br className="desktop-break" /> Dos días para resolver en equipo
            retos reales de la industria.
          </p>
          <div className="brand-rule" aria-hidden="true" />
          <p className="event-facts">
            <span>{event.date}</span>
            <span aria-hidden="true">◆</span>
            <span>{event.venue}</span>
          </p>
          <div className="hero-actions">
            <a href="#lista" className="button primary">
              Preinscribirme <Arrow />
            </a>
            <a href={collaborationMail} className="button secondary">
              Quiero colaborar <Arrow diagonal />
            </a>
          </div>
          <p className="status">
            <span className="status-dot" aria-hidden="true" />
            {event.waitlistOpen
              ? "Preinscripción abierta. Tendrás prioridad al inscribirte."
              : "Próximamente, más novedades."}
          </p>
        </section>
        <section
          id="encuentro"
          className="split wrap section-space section-rule"
        >
          <h2>
            Retos de la industria.
            <br />
            Talento universitario.
          </h2>
          <div>
            <p className="lead">{event.intro}</p>
            <p className="copy">
              Nos reunimos en Leganés para trabajar en equipo, probar ideas y
              construir soluciones.
            </p>
            <a className="text-link" href="#lista">
              Preinscríbete con prioridad <Arrow />
            </a>
          </div>
        </section>
        <section id="retos" className="wrap section-space section-rule">
          <h2>Los tracks</h2>
          <p className="copy">
            Problemas reales. Distintas formas de resolverlos.
          </p>
          {event.tracks.length ? (
            <div className="track-list">
              {event.tracks.map((track) => (
                <article key={track.title}>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="panel tracks-pending">
              <h3>Varios retos confirmados</h3>
              <p>
                Pronto publicaremos los tracks, las empresas participantes y
                todos los detalles.
              </p>
            </div>
          )}
          <div className="prize-announcement">
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M8 3h8v6a4 4 0 0 1-8 0V3Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 2v5m-4 3h8m-6-3h4v3" />
            </svg>
            <div>
              <h3>Gran premio</h3>
              <p>Lo anunciaremos pronto.</p>
            </div>
          </div>
        </section>
        <section id="lista" className="waitlist-section">
          <div className="split wrap section-space">
            <div>
              <h2>Preinscríbete ahora y tendrás prioridad</h2>
              <p className="copy">
                Déjanos tu email. Te enviaremos el enlace cuando abramos
                inscripciones. Las personas preinscritas tendrán prioridad para
                apuntarse.
              </p>
              <p className="status">
                <span className="status-dot" aria-hidden="true" />
                {event.waitlistOpen
                  ? "Preinscripciones abiertas"
                  : "Preinscripciones cerradas"}
              </p>
            </div>
            <WaitlistForm open={event.waitlistOpen} />
          </div>
        </section>
        <section id="partners" className="split wrap section-space">
          <div>
            <h2>Construyamos esta edición juntos</h2>
            <p className="copy">
              Acerca los retos de tu empresa al talento universitario. Hablemos
              de patrocinio y colaboración.
            </p>
            <a className="text-link" href={collaborationMail}>
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
                    src="/aisc/Property1=AISCLockupColor.svg"
                    alt="Organiza AISC Madrid"
                    width={160}
                    height={41}
                    unoptimized
                  />
                </a>
              </>
            )}
          </div>
        </section>
        <section id="dudas" className="split wrap section-space section-rule">
          <h2>Preguntas frecuentes</h2>
          <div className="faq-list">
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
            HackUC3M ’27
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
