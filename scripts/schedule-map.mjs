// Writes src/lib/schedule-map.json before every build: the stories whose CMS
// "Schedule" time is still in the future, with their go-live time. The
// middleware uses it to keep those stories hidden until then.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dir = path.join(process.cwd(), 'content', 'articles');
const out = path.join(process.cwd(), 'src', 'lib', 'schedule-map.json');
const now = Date.now();
const map = {};

if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    if (!data.scheduled) continue;
    const t = new Date(data.scheduled).getTime();
    if (!Number.isNaN(t) && t > now) map[f.replace(/\.md$/, '')] = new Date(t).toISOString();
  }
}

fs.writeFileSync(out, JSON.stringify(map, null, 2) + '\n');
console.log('[schedule] ' + Object.keys(map).length + ' scheduled stor' + (Object.keys(map).length === 1 ? 'y' : 'ies'));
