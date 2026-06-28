import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Proxies a subscribe submission to the Beehiiv API.
// Keeps BEEHIIV_API_KEY server-side — the client never sees it.
// Required env vars (set in Vercel project settings):
//   BEEHIIV_API_KEY         (e.g. bh_xxxxxxxxxxxxxxxxxxxx)
//   BEEHIIV_PUBLICATION_ID  (e.g. pub_xxxxxxxxxxxxxxxxxxxx)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const source = (body.source ?? 'signal24-website').slice(0, 60);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY?.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim();
  if (!apiKey || !publicationId) {
    console.error('[subscribe] BEEHIIV_* env vars are missing');
    return NextResponse.json({ error: 'Subscriptions are temporarily unavailable.' }, { status: 503 });
  }

  try {
    const upstream = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: source,
          utm_medium: 'popup',
          utm_campaign: 'site-subscribe',
          referring_site: 'https://signal24.info',
        }),
        cache: 'no-store',
      },
    );

    // Beehiiv responds 200/201 on success, 400-level on validation issues.
    if (!upstream.ok) {
      const text = await upstream.text();
      console.error(`[subscribe] beehiiv ${upstream.status}: ${text.slice(0, 300)}`);
      // Don't leak upstream errors to the user — just say it failed.
      return NextResponse.json(
        { error: 'Could not complete sign-up. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[subscribe] fetch failed:', (err as Error).message);
    return NextResponse.json(
      { error: 'Could not reach the newsletter service.' },
      { status: 504 },
    );
  }
}
