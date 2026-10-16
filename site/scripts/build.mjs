import fs from 'node:fs/promises';
import path from 'node:path';
import { sync } from './sync.mjs';
import { vitepress, completed } from './process.mjs';
import { metadataRoot, hash, siteBase } from './shared.mjs';
import { check } from './check.mjs';

if (process.argv[2] === '--base') {
  if (!process.argv[3]) throw new Error('--baseには公開先パスが必要です。');
  process.env.SITE_BASE = siteBase(process.argv[3]);
} else if (process.argv.length > 2) {
  throw new Error('指定できるオプションは --base /wiki/ です。');
}
await sync();
await completed(vitepress(['build']));
await fs.writeFile(path.join(metadataRoot, 'build-info.json'), JSON.stringify({
  base: siteBase(),
  catalogHash: hash(await fs.readFile(path.join(metadataRoot, 'catalog.json')))
}, null, 2) + '\n');
await check();
