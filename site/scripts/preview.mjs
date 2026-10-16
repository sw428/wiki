import fs from 'node:fs/promises';
import path from 'node:path';
import { metadataRoot } from './shared.mjs';
import { vitepress, completed } from './process.mjs';

const info = JSON.parse(await fs.readFile(path.join(metadataRoot, 'build-info.json'), 'utf8'));
process.env.SITE_BASE = info.base;
const server = vitepress(['preview', '--host', '127.0.0.1', ...process.argv.slice(2)]);
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => server.kill());
await completed(server);
