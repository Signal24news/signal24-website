import { NextResponse, type NextRequest } from 'next/server';
import schedule from './lib/schedule-map.json';

// Stories scheduled in the CMS stay hidden until their go-live time. This runs
// before the page cache, so the story is never cached as "not found" and gets
// a normal page (status 200) on the first visit after it goes live.
const goLive = schedule as Record<string, string>;

export function middleware(req: NextRequest) {
  const slug = decodeURIComponent(req.nextUrl.pathname.replace(/^\/article\//, '').replace(/\/$/, ''));
  const at = goLive[slug];
  if (at && new Date(at).getTime() > Date.now()) {
    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page not found · Signal 24</title><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
        '<body style="font-family:Inter,system-ui,sans-serif;background:#F6F8FD;color:#0E1733;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">' +
        '<div style="text-align:center;padding:24px"><h1 style="font-size:28px;margin:0 0 8px">Page not found</h1><p style="margin:0 0 20px;color:#475569">This story is not available.</p>' +
        '<a href="/" style="color:#4467FE;font-weight:600">Go to the Signal 24 homepage</a></div></body></html>',
      { status: 404, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
    );
  }
  return NextResponse.next();
}

export const config = { matcher: '/article/:slug*' };
