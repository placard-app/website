import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const script = readFileSync(new URL('./fetch-installers.mjs', import.meta.url), 'utf8');
for (const mode of ['valid', 'digest', 'incomplete', 'size'])
  test(`installer publication: ${mode}`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'placard-installers-'));
    try {
      mkdirSync(join(dir, 'scripts'));
      mkdirSync(join(dir, 'bin'));
      writeFileSync(join(dir, 'scripts/fetch-installers.mjs'), script);
      const content = 'verified installer\n';
      const names = [
        'install.sh',
        'install.ps1',
        'docker-compose.yml',
        'example.env',
        'docker-compose.override.yml',
        'Caddyfile',
        'placard-recovery.py',
      ];
      const release = {
        tag_name: 'v1.2.0',
        draft: false,
        prerelease: false,
        assets: names.map((name, i) => ({
          name,
          id: i + 1,
          state: 'uploaded',
          size: Buffer.byteLength(content),
          digest: 'sha256:' + createHash('sha256').update(content).digest('hex'),
        })),
      };
      if (mode === 'digest') release.assets[1].digest = 'sha256:' + '0'.repeat(64);
      if (mode === 'incomplete') release.assets.pop();
      if (mode === 'size') release.assets[1].size++;
      writeFileSync(
        join(dir, 'bin/gh'),
        `#!${process.execPath}\nprocess.stdout.write(process.argv.includes('releases/latest')?'': '')`
      );
      writeFileSync(
        join(dir, 'bin/gh'),
        `#!${process.execPath}\nprocess.stdout.write(process.argv.some(a=>a.endsWith('/releases/latest'))?${JSON.stringify(JSON.stringify(release))}:${JSON.stringify(content)});`,
        { mode: 0o755 }
      );
      chmodSync(join(dir, 'bin/gh'), 0o755);
      const run = () =>
        execFileSync(process.execPath, [resolve(dir, 'scripts/fetch-installers.mjs')], {
          cwd: dir,
          env: { ...process.env, PATH: join(dir, 'bin') + ':' + process.env.PATH },
          stdio: 'pipe',
        });
      if (mode === 'valid') {
        run();
        assert.equal(readFileSync(join(dir, 'public/install.sh'), 'utf8'), content);
        assert.equal(readFileSync(join(dir, 'public/install.ps1'), 'utf8'), content);
      } else {
        assert.throws(run);
        assert(!existsSync(join(dir, 'public/install.sh')));
        assert(!existsSync(join(dir, 'public/install.ps1')));
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
