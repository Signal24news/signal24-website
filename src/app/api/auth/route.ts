import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Decap CMS GitHub OAuth — step 1: redirect the popup to GitHub's authorize URL.
// GitHub will redirect back to /api/callback?code=... with the auth code,
// which /api/callback exchanges for an access token.
export async function GET(req: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse('GITHUB_CLIENT_ID is not configured.', { status: 500 });
  }

  const state = randomBytes(16).toString('hex');
  const url = new URL(req.url);
  const redirectUri = `${url.origin}/api/callback`;

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', redirectUri);
  authorize.searchParams.set('scope', 'repo,user');
  authorize.searchParams.set('state', state);

  const res = NextResponse.redirect(authorize.toString(), 302);
  // Short-lived state cookie used by /api/callback to thwart CSRF.
  res.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  return res;
}
