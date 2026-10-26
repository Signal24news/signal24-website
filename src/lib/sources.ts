/**
 * Builds the "Sources" list shown at the end of a story from the external
 * links in its body. Nothing to fill in the CMS: every outside link counts.
 */

const OUTLETS: Record<string, string> = {
  'reuters.com': 'Reuters',
  'apnews.com': 'Associated Press',
  'afp.com': 'AFP',
  'bbc.com': 'BBC',
  'bbc.co.uk': 'BBC',
  'aljazeera.com': 'Al Jazeera',
  'aa.com.tr': 'Anadolu Agency',
  'arabnews.com': 'Arab News',
  'arabnews.pk': 'Arab News Pakistan',
  'voanews.com': 'Voice of America',
  'timesofisrael.com': 'The Times of Israel',
  'tribuneindia.com': 'The Tribune',
  'tribune.com.pk': 'The Express Tribune',
  'dawn.com': 'Dawn',
  'thenews.com.pk': 'The News',
  'geo.tv': 'Geo News',
  'arynews.tv': 'ARY News',
  'samaa.tv': 'Samaa TV',
  'aaj.tv': 'Aaj News',
  'dailypakistan.com.pk': 'Daily Pakistan',
  'abc.net.au': 'ABC News (Australia)',
  'abcnews.com': 'ABC News',
  'abcnews.go.com': 'ABC News',
  'cnn.com': 'CNN',
  'nbcnews.com': 'NBC News',
  'npr.org': 'NPR',
  'nytimes.com': 'The New York Times',
  'washingtonpost.com': 'The Washington Post',
  'theguardian.com': 'The Guardian',
  'ft.com': 'Financial Times',
  'bloomberg.com': 'Bloomberg',
  'bgov.com': 'Bloomberg Government',
  'cnbc.com': 'CNBC',
  'politifact.com': 'PolitiFact',
  'natesilver.net': 'Silver Bulletin',
  'britannica.com': 'Britannica',
  'yahoo.com': 'Yahoo News',
  'al-monitor.com': 'Al-Monitor',
  'engineeringnews.co.za': 'Engineering News',
  'anewz.tv': 'AnewZ',
  'freepressjournal.in': 'Free Press Journal',
  'espncricinfo.com': 'ESPNcricinfo',
  'cricinfo.com': 'ESPNcricinfo',
  'icc-cricket.com': 'ICC',
  'pcb.com.pk': 'Pakistan Cricket Board',
  'gulfnews.com': 'Gulf News',
  'thenationalnews.com': 'The National',
  'axios.com': 'Axios',
  'politico.com': 'Politico',
  'whitehouse.gov': 'The White House',
  'state.gov': 'US State Department',
  'mofa.gov.pk': 'Pakistan Foreign Office',
  'un.org': 'United Nations',
  'imf.org': 'IMF',
  'worldbank.org': 'World Bank',
  'wikipedia.org': 'Wikipedia',
  'wikimedia.org': 'Wikimedia Commons',
};

export type Source = { name: string; links: string[] };

function outletName(host: string): string {
  const h = host.replace(/^www\./, '').replace(/^m\./, '').replace(/^en\./, '').replace(/^english\./, '');
  const parts = h.split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts.slice(i).join('.');
    if (OUTLETS[key]) return OUTLETS[key];
  }
  return h;
}

export function extractSources(html: string, ownHost = 'signal24.info'): Source[] {
  const seen = new Set<string>();
  const byName = new Map<string, string[]>();
  const re = /<a\s[^>]*href="(https?:\/\/[^"]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const url = m[1].replace(/&amp;/g, '&');
    let host: string;
    try {
      host = new URL(url).hostname.toLowerCase();
    } catch {
      continue;
    }
    if (host.endsWith(ownHost) || seen.has(url)) continue;
    seen.add(url);
    const name = outletName(host);
    byName.set(name, [...(byName.get(name) ?? []), url]);
  }
  return Array.from(byName, ([name, links]) => ({ name, links }));
}
