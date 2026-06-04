#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const srcRoot = path.resolve('content/publications');
const dstRoot = path.resolve('public/publications');

if (!fs.existsSync(srcRoot)) {
  process.exit(0);
}

fs.mkdirSync(dstRoot, { recursive: true });

const entries = fs.readdirSync(srcRoot, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const srcDir = path.join(srcRoot, entry.name);
  const dstDir = path.join(dstRoot, entry.name);
  fs.mkdirSync(dstDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.join(srcDir, file);
    const dstFile = path.join(dstDir, file);
    fs.copyFileSync(srcFile, dstFile);
  }
}

console.log('Synced publications to public/publications');

