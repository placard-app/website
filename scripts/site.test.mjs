import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('catalog has unique routes and imported documentation', () => {
  const docs = JSON.parse(readFileSync('src/docs/catalog.json', 'utf8'));
  assert.equal(new Set(docs.map((d) => d.slug)).size, docs.length);
  for (const doc of docs) assert(readFileSync(`src/docs/content/${doc.slug}.md`, 'utf8').trim().length > 100);
});
