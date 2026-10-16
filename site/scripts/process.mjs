import { spawn } from 'node:child_process';
import path from 'node:path';
import { siteRoot } from './shared.mjs';

export function vitepress(args, options = {}) {
  return spawn(process.execPath, [path.join(siteRoot, 'node_modules', 'vitepress', 'bin', 'vitepress.js'), ...args], {
    cwd: siteRoot, stdio: 'inherit', ...options
  });
}

export function completed(child) {
  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) => code === 0 ? resolve() : reject(new Error(`VitePressが終了しました: ${signal || code}`)));
  });
}
