import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const catalog = JSON.parse(readFileSync('src/docs/catalog.json', 'utf8'));
for (const route of ['', 'plugins', 'docs', 'install', ...catalog.map((d) => 'docs/' + d.slug)]) {
  const file = `dist/${route ? route + '/' : ''}index.html`;
  assert(existsSync(file), `Missing route ${route}`);
  const html = readFileSync(file, 'utf8');
  assert(!html.includes('https://astrowind.vercel.app'), `Template URL in ${route}`);
}
for (const file of ['404.html', 'install.sh', 'install.ps1', 'robots.txt', 'sitemap-index.xml'])
  assert(existsSync('dist/' + file), `Missing ${file}`);
console.log('Verified all public routes and required artifacts');
