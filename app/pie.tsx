/* eslint-disable @next/next/no-img-element */
// Pie compartido (CompPie del canvas): lo usan la landing y las páginas de documento.
// Los enlaces a /codigo-de-conducta y /creditos se añaden cuando existan esas páginas (PR 1.4).
export default function Pie() {
  return (
    <footer className="pie">
      <span className="pie-verj" aria-hidden="true" />
      <span className="pie-filig" aria-hidden="true" />
      <div className="wrap pie-cols">
        <div>
          <p className="lab" style={{ margin: "0 0 12px" }}>
            Colaboradores
          </p>
          <div className="pie-logos">
            <a href="https://aiscmadrid.com">
              <img
                src="/logos/aisc-lockup.png"
                alt="AI Student Collective Madrid"
                width={189}
                height={48}
                loading="lazy"
              />
            </a>
            <a href="https://www.uc3m.es">
              <img
                src="/logos/uc3m.png"
                alt="Universidad Carlos III de Madrid"
                width={134}
                height={48}
                loading="lazy"
              />
            </a>
          </div>
        </div>
        <div className="pie-enlaces">
          <a className="lnk" href="mailto:aisc.asoc@uc3m.es">
            aisc.asoc@uc3m.es
          </a>
          <a className="lnk" href="/privacidad">
            Privacidad
          </a>
        </div>
        <div className="pie-redes">
          <a
            href="https://www.instagram.com/aisc_madrid/"
            className="red"
            aria-label="Instagram de AISC Madrid"
          >
            <i className="gl" style={{ ["--src" as string]: "url(/logos/redes/instagram.svg)" }} />
          </a>
          <a
            href="https://www.linkedin.com/company/ai-student-collective-madrid"
            className="red"
            aria-label="LinkedIn de AISC Madrid"
          >
            <i className="gl" style={{ ["--src" as string]: "url(/logos/redes/linkedin.svg)" }} />
          </a>
        </div>
      </div>
      <div className="wrap pie-final">
        <p className="nota" style={{ margin: 0 }}>
          Grabados de dominio público y CC0 · Wikimedia Commons y Rijksmuseum
        </p>
        <a className="arriba" href="#">
          Volver arriba <span className="gl manecilla" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
