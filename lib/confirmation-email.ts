import type { EventContent } from "./event";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    };
    return entities[character];
  });

export function confirmationEmail(content: Pick<EventContent, "date" | "venue">) {
  return {
    subject: "Estás en la lista · HackUC3M ’27",
    text: `Tu preinscripción a HackUC3M ’27 está guardada.\n\nTendrás prioridad cuando abramos las inscripciones. Te enviaremos el enlace a este email para que puedas apuntarte. No tienes que hacer nada más por ahora.\n\n${content.date}\n${content.venue} · UC3M\n\nLa preinscripción no confirma una plaza. La participación se confirmará durante el proceso de inscripción.\n\nConsulta las novedades en https://hackuc3m.com\n\nNos vemos en Leganés,\nAISC Madrid\n\nPara darte de baja o gestionar tus datos, escribe a aisc.asoc@uc3m.es.`,
    html: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Tu preinscripción a HackUC3M</title>
  <style>
    @media only screen and (max-width: 480px) {
      .email-gutter { padding-left: 24px !important; padding-right: 24px !important; }
      .email-title { font-size: 36px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#eee8ee;color:#281c2c;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">Tendrás prioridad. Te enviaremos el enlace cuando abramos las inscripciones.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eee8ee;">
    <tr><td align="center" style="padding:32px 12px;">
      <!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
        <tr><td class="email-gutter" bgcolor="#1c141e" style="padding:34px 44px 38px;background-color:#1c141e;">
          <a href="https://hackuc3m.com" style="font-family:Georgia,'Times New Roman',serif;font-size:29px;line-height:38px;letter-spacing:-1px;text-decoration:none;color:#f9f4e9;">HackUC3M <span style="color:#e34f87;">’27</span></a>
          <p style="margin:18px 0 0;font-size:13px;line-height:21px;color:#c7b7c5;">${escapeHtml(content.date)}<br>${escapeHtml(content.venue)} · UC3M</p>
        </td></tr>
        <tr><td class="email-gutter" bgcolor="#f9f4e9" style="padding:42px 44px 40px;background-color:#f9f4e9;">
          <h1 class="email-title" style="margin:0 0 22px;font-size:42px;line-height:1.12;letter-spacing:-1.2px;font-weight:600;color:#281c2c;">Estás en la lista.</h1>
          <p style="margin:0 0 26px;font-size:16px;line-height:27px;color:#514254;">Tu preinscripción a HackUC3M ’27 está guardada. Nos alegra que quieras formar parte.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:24px 0;border-top:1px solid #d9cdd5;border-bottom:1px solid #d9cdd5;">
              <h2 style="margin:0 0 10px;font-size:20px;line-height:28px;font-weight:600;color:#842060;">Tendrás prioridad.</h2>
              <p style="margin:0;font-size:16px;line-height:27px;color:#514254;">Cuando abramos las inscripciones, recibirás el enlace en este email para que puedas apuntarte. No tienes que hacer nada más por ahora.</p>
            </td></tr>
          </table>
          <p style="margin:22px 0 28px;font-size:13px;line-height:22px;color:#6b586b;">La preinscripción no confirma una plaza. La participación se confirmará durante el proceso de inscripción.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#9f2576" style="background-color:#9f2576;border-radius:8px;mso-padding-alt:16px 24px;">
            <a href="https://hackuc3m.com" style="display:inline-block;padding:16px 24px;border:1px solid #9f2576;border-radius:8px;font-size:15px;line-height:20px;font-weight:600;text-decoration:none;color:#fff4ed;">Ver novedades</a>
          </td></tr></table>
          <p style="margin:32px 0 0;font-size:15px;line-height:25px;color:#514254;">Nos vemos en Leganés,<br><strong style="color:#281c2c;">AISC Madrid</strong></p>
        </td></tr>
        <tr><td class="email-gutter" style="padding:24px 44px 8px;">
          <p style="margin:0;font-size:12px;line-height:20px;color:#69546a;">Recibes este email porque te has preinscrito a HackUC3M. Para darte de baja o gestionar tus datos, escribe a <a href="mailto:aisc.asoc@uc3m.es" style="color:#842060;text-decoration:underline;">aisc.asoc@uc3m.es</a>.</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`,
  };
}
