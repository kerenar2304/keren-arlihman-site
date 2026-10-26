/* the contact form on Cloudflare Pages: checks the name and phone, then sends them to Keren by email through Resend.
   Set in Cloudflare (Settings > Variables and Secrets): RESEND_API_KEY (secret), CONTACT_TO (her inbox),
   CONTACT_FROM (an address on the domain verified in Resend, e.g. site@kerenarlih.co.il) */
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function onRequestPost({ request, env }) {
  // only from the site itself
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false }, 403);
  let d;
  try { d = await request.json(); } catch { return json({ ok: false }, 400); }
  // the hidden field: people never fill it, bots do; they get a quiet "ok"
  if (d.company) return json({ ok: true });
  const name = String(d.name || '').trim().slice(0, 80), phone = String(d.phone || '').trim().slice(0, 30);
  if (name.length < 2 || phone.replace(/\D/g, '').length < 9) return json({ ok: false, error: 'invalid' }, 422);
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) return json({ ok: false, error: 'config' }, 500);
  const tel = phone.replace(/[^\d+]/g, ''), wa = tel.replace(/^0/, '972').replace(/^\+/, '');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: `האתר של קרן <${env.CONTACT_FROM}>`, to: [env.CONTACT_TO],
      subject: `פנייה חדשה מהאתר: ${name}`,
      text: `שם: ${name}\nטלפון: ${phone}\n\nוואטסאפ: https://wa.me/${wa}`,
      html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6"><h2 style="margin:0 0 12px">פנייה חדשה מהאתר</h2><p><b>שם:</b> ${esc(name)}<br><b>טלפון:</b> <a href="tel:${esc(tel)}">${esc(phone)}</a></p><p><a href="https://wa.me/${esc(wa)}">לשליחת הודעת וואטסאפ</a></p></div>`
    })
  });
  return r.ok ? json({ ok: true }) : json({ ok: false, error: 'send' }, 502);
}
export const onRequest = () => json({ ok: false }, 405);
