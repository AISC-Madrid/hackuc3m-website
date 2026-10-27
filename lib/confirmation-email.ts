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
<body style="margin:0;padding:0;background-color:#ece4d9;color:#2c1425;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">Tendrás prioridad. Te enviaremos el enlace cuando abramos las inscripciones.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ece4d9;">
    <tr><td align="center" style="padding:32px 12px;">
      <!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#f3f0df;border:1px solid #decbcc;border-radius:12px;">
        <tr><td class="email-gutter" style="padding:36px 44px 28px;border-bottom:1px solid #c49db5;">
          <a href="https://hackuc3m.com" style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:36px;font-weight:700;letter-spacing:1px;text-decoration:none;color:#7e3a6b;">HackUC3M ’27</a>
          <p style="margin:12px 0 0;font-size:14px;line-height:22px;color:#705f64;">${escapeHtml(content.date)} ◆ ${escapeHtml(content.venue)} · UC3M</p>
        </td></tr>
        <tr><td class="email-gutter" style="padding:40px 44px 40px;">
          <h1 class="email-title" style="margin:0 0 20px;font-size:40px;line-height:1.15;letter-spacing:-0.8px;font-weight:600;color:#2c1425;">Estás en la lista.</h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:#58444e;">Tu preinscripción a HackUC3M ’27 está guardada. Nos alegra que quieras formar parte.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:24px 0;border-top:1px solid #decbcc;border-bottom:1px solid #decbcc;">
              <h2 style="margin:0 0 8px;font-size:20px;line-height:28px;font-weight:600;color:#7e3a6b;">Tendrás prioridad.</h2>
              <p style="margin:0;font-size:16px;line-height:26px;color:#58444e;">Cuando abramos las inscripciones, recibirás el enlace en este email para que puedas apuntarte. No tienes que hacer nada más por ahora.</p>
            </td></tr>
          </table>
          <p style="margin:20px 0 28px;font-size:14px;line-height:22px;color:#705f64;">La preinscripción no confirma una plaza. La participación se confirmará durante el proceso de inscripción.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#7e3a6b" style="background-color:#7e3a6b;border-radius:9999px;mso-padding-alt:14px 28px;">
            <a href="https://hackuc3m.com" style="display:inline-block;padding:14px 28px;border:1px solid #7e3a6b;border-radius:9999px;font-size:14px;line-height:20px;font-weight:600;text-decoration:none;color:#f3f0df;">Ver novedades</a>
          </td></tr></table>
          <p style="margin:32px 0 0;font-size:16px;line-height:26px;color:#58444e;">Nos vemos en Leganés,<br><strong style="color:#2c1425;">AISC Madrid</strong></p>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
        <tr><td class="email-gutter" style="padding:24px 44px 8px;">
          <p style="margin:0;font-size:14px;line-height:22px;color:#705f64;">Recibes este email porque te has preinscrito a HackUC3M. Para darte de baja o gestionar tus datos, escribe a <a href="mailto:aisc.asoc@uc3m.es" style="color:#7e3a6b;text-decoration:underline;">aisc.asoc@uc3m.es</a>.</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`,
  };
}
