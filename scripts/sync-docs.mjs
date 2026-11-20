import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const api = (route) => execFileSync('gh', ['api', `repos/placard-app/core/${route}`], { encoding: 'utf8' });
const catalog = JSON.parse(readFileSync('src/docs/catalog.json', 'utf8'));
const sha = JSON.parse(api('commits/main')).sha;
const published = new Map(catalog.map((d) => [d.path, d.slug]));
const raw = (file) =>
  Buffer.from(JSON.parse(api(`contents/${file}?ref=${sha}`)).content.replaceAll('\n', ''), 'base64').toString('utf8');
const { createHash } = await import('node:crypto');
const sources = new Map(catalog.map((doc) => [doc.path, raw(doc.path)]));
const sourceHash = createHash('sha256')
  .update(JSON.stringify([...sources]))
  .digest('hex');
const previous = JSON.parse(readFileSync('src/docs/source.json', 'utf8'));
if (previous.sourceHash === sourceHash) process.exit(0);
mkdirSync('src/docs/content', { recursive: true });
const assets = new Map();
for (const doc of catalog) {
  let text = sources.get(doc.path);
  text = text.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (match, image, label, href) => {
    if (/^(https?:|mailto:|#|\/)/.test(href)) return match;
    const [file, hash] = href.split('#');
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(doc.path), file));
    let target;
    if (image) {
      target = `/docs-assets/${resolved}`;
      assets.set(resolved, target);
    } else if (published.has(resolved)) target = '/docs/' + published.get(resolved);
    else
      target = `https://github.com/placard-app/core/${/\.(ya?ml|json|[cm]?js|tsx?|env)$/.test(resolved) ? 'raw' : 'blob'}/${sha}/${resolved}`;
    return `${image}[${label}](${target}${hash ? '#' + hash : ''})`;
  });
  writeFileSync(`src/docs/content/${doc.slug}.md`, text);
}
for (const [file, target] of assets) {
  const data = JSON.parse(api(`contents/${file}?ref=${sha}`));
  const dest = 'public' + target;
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(data.content.replaceAll('\n', ''), 'base64'));
}
writeFileSync(
  'src/docs/source.json',
  JSON.stringify({ repository: 'placard-app/core', commit: sha, sourceHash }, null, 2) + '\n'
);
