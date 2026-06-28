import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Decap CMS GitHub OAuth — step 2: exchange the auth code for an access token,
// then post the result back to the opener window (Decap admin tab) via
// `postMessage` so Decap can stash the token and load the editor UI.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const clientId = process.env.GITHUB_CLIENT_ID?.trim();
  const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return errorPage('GitHub OAuth env vars (GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET) are not configured on the server.');
  }
  if (!code) return errorPage('Missing "code" query parameter from GitHub.');

  const stateCookie = cookies().get('decap_oauth_state')?.value;
  if (!stateCookie || !state || stateCookie !== state) {
    return errorPage('OAuth state mismatch — possible CSRF, please try logging in again.');
  }

  let token: string | undefined;
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'signal24-cms-oauth',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
      cache: 'no-store',
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      return errorPage(`GitHub returned ${tokenRes.status}: ${text.slice(0, 300)}`);
    }
    const data = (await tokenRes.json()) as { access_token?: string; error?: string; error_description?: string };
    if (!data.access_token) {
      return errorPage(`GitHub did not return a token: ${data.error_description ?? data.error ?? 'unknown error'}`);
    }
    token = data.access_token;
  } catch (err) {
    return errorPage(`Failed to reach GitHub: ${(err as Error).message}`);
  }

  // Decap listens for two postMessage events from the popup:
  //   1) "authorizing:github"           -> popup is ready, send the payload
  //   2) "authorization:github:success:{json}"  -> contains the token
  const payload = JSON.stringify({ token, provider: 'github' });
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body style="font-family: system-ui; padding: 24px; color: #0F0F0F;">
<p>Authentication successful — finishing sign-in…</p>
<script>
(function() {
  function send(status, content) {
    if (!window.opener) return;
    var message = 'authorization:github:' + status + ':' + JSON.stringify(content);
    window.opener.postMessage(message, '*');
  }
  window.addEventListener('message', function (ev) {
    if (ev.data === 'authorizing:github') {
      send('success', ${payload});
    }
  }, false);
  // Decap's listener may already be attached — emit once immediately too.
  send('success', ${payload});
  setTimeout(function () { window.close(); }, 1500);
})();
</script>
</body></html>`;

  const res = new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
  res.cookies.delete('decap_oauth_state');
  return res;
}

function errorPage(message: string) {
  const safe = message.replace(/</g, '&lt;');
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Sign-in error</title></head>
<body style="font-family: system-ui; padding: 24px; color: #0F0F0F;">
<h1 style="color:#E53935">Sign-in failed</h1>
<p>${safe}</p>
<p><a href="/admin">Back to /admin</a></p>
<script>
(function() {
  if (window.opener) {
    window.opener.postMessage('authorization:github:error:' + JSON.stringify({ message: ${JSON.stringify(message)} }), '*');
  }
})();
</script>
</body></html>`;
  return new NextResponse(html, {
    status: 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
