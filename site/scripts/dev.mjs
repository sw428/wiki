import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { sync } from './sync.mjs';
import { siteRoot, wikiRoot } from './shared.mjs';
import { vitepress } from './process.mjs';

await sync();
const watchers = new Map();
let timer;
let syncing = false;
let pending = false;

async function refreshWatchers() {
  const config = JSON.parse(await fsp.readFile(path.join(siteRoot, 'publish.json'), 'utf8'));
  const inputs = new Map([
    [path.join(siteRoot, 'pages'), true],
    [path.join(siteRoot, 'assets'), true],
    [path.join(siteRoot, 'publish.json'), false],
    [path.join(wikiRoot, 'img'), true],
    ...config.collections.map(collection => [path.resolve(wikiRoot, collection.source), true])
  ]);
  for (const [target, watcher] of watchers) {
    if (!inputs.has(target)) { watcher.close(); watchers.delete(target); }
  }
  for (const [target, recursive] of inputs) {
    if (watchers.has(target)) continue;
    const watcher = fs.watch(target, { recursive }, () => {
      clearTimeout(timer);
      timer = setTimeout(update, 300);
    });
    watcher.on('error', error => console.error(`監視エラー: ${error.message}`));
    watchers.set(target, watcher);
  }
}

async function update() {
  if (syncing) { pending = true; return; }
  syncing = true;
  try {
    await sync();
    await refreshWatchers();
  } catch (error) {
    console.error(`同期できませんでした: ${error.message}`);
  } finally {
    syncing = false;
    if (pending) { pending = false; timer = setTimeout(update, 300); }
  }
}

await refreshWatchers();
const port = process.env.WIKI_SITE_PORT || '5173';
if (!/^\d+$/.test(port) || Number(port) < 1024 || Number(port) > 65535) throw new Error('WIKI_SITE_PORTは1024〜65535で指定してください。');
const server = vitepress(['dev', '--host', '127.0.0.1', '--port', port, '--strictPort']);
function close() {
  clearTimeout(timer);
  for (const watcher of watchers.values()) watcher.close();
}
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => { close(); server.kill(); });
server.once('error', error => { console.error(error); close(); process.exitCode = 1; });
server.once('exit', code => { close(); process.exitCode = code ?? 1; });
