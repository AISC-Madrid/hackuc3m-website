import Link from "next/link";
export const metadata = { title: "Privacidad · HackUC3M" };
export default function Privacy() {
  return (
    <main className="prose-page">
      <Link className="text-link" href="/">
        Volver a HackUC3M
      </Link>
      <h1>Tu email, para HackUC3M.</h1>
      <p>
        La organización de HackUC3M (AISC Madrid) utiliza los datos que
        facilitas en la lista de espera para gestionar tu interés en el evento,
        conservar tu orden de alta y enviarte avisos sobre la apertura de
        inscripciones y tu acceso prioritario.
      </p>
      <h2>Qué guardamos</h2>
      <p>
        Tu email, tu nombre si lo facilitas, la fecha de alta y el registro de
        tu consentimiento. Registramos también el estado de los correos y de las
        futuras invitaciones. Para limitar abusos, conservamos temporalmente un
        identificador derivado de la dirección IP, sin guardar la IP original.
      </p>
      <h2>Tu consentimiento</h2>
      <p>
        Te apuntas de forma voluntaria y puedes retirar tu consentimiento en
        cualquier momento escribiendo a{" "}
        <a href="mailto:aisc.asoc@uc3m.es">aisc.asoc@uc3m.es</a>. Apuntarte no
        confirma una plaza en el evento.
      </p>
      <h2>Servicios que utilizamos</h2>
      <p>
        Cloudflare aloja la web y la base de datos. Resend se utiliza para el
        envío de correos cuando esté activado. Los datos se utilizan únicamente
        para gestionar las comunicaciones y la participación en HackUC3M.
      </p>
      <h2>Conservación y derechos</h2>
      <p>
        Conservaremos los datos hasta que finalice la gestión de esta edición de
        HackUC3M o hasta que solicites su eliminación. Puedes solicitar acceso,
        rectificación o eliminación de tus datos, retirar tu consentimiento o
        plantear dudas escribiendo a{" "}
        <a href="mailto:aisc.asoc@uc3m.es">aisc.asoc@uc3m.es</a>.
      </p>
    </main>
  );
}
