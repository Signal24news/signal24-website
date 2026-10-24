// Tells Bing (and other IndexNow search engines) about new or updated stories after each
// production build. Bing's index also feeds ChatGPT search and Microsoft Copilot.
// It never fails the build: any error is only logged.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const KEY = 'b2f50b04db99b3325e9ade4700781a3b';
const HOST = 'signal24.info';
const SITE = 'https://' + HOST;
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

async function main() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.log('[indexnow] skipped (not a production build)');
    return;
  }
  const dir = path.join(process.cwd(), 'content', 'articles');
  const now = Date.now();
  const urls = [SITE + '/'];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    const t = new Date(data.updated || data.date).getTime();
    if (!Number.isNaN(t) && now - t <= WINDOW_MS) urls.push(SITE + '/article/' + f.replace(/\.md$/, ''));
  }
  if (urls.length === 1) {
    console.log('[indexnow] no recent stories, nothing to send');
    return;
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: SITE + '/' + KEY + '.txt', urlList: urls }),
    signal: AbortSignal.timeout(8000),
  });
  console.log('[indexnow] sent ' + urls.length + ' URLs, status ' + res.status);
}

main().catch((e) => console.log('[indexnow] not sent: ' + (e && e.message ? e.message : e)));
