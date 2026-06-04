#!/usr/bin/env node

// Simple script to generate publication folders from a BibTeX file.
// Usage: node scripts/generate_publications_from_bib.js path/to/file.bib

import fs from 'fs';
import path from 'path';

const bibPath = path.resolve(process.argv[2] || 'content/publications.bib');
const outputRoot = path.resolve('content/publications');

if (!fs.existsSync(bibPath)) {
  console.error(`BibTeX file not found: ${bibPath}`);
  process.exit(1);
}

if (!fs.existsSync(outputRoot)) {
  fs.mkdirSync(outputRoot, { recursive: true });
}

const bibContent = fs.readFileSync(bibPath, 'utf8');

// Very small BibTeX parser for @inproceedings entries
function parseBibEntries(text) {
  const entries = [];
  const entryRegex = /@([a-zA-Z]+)\s*\{([^,]+),([\s\S]*?)\n\s*\}/g;
  let match;
  while ((match = entryRegex.exec(text)) !== null) {
    const [, type, key, body] = match;
    const fields = {};
    const fieldRegex = /(\w+)\s*=\s*\{([\s\S]*?)\}/g;
    let f;
    while ((f = fieldRegex.exec(body)) !== null) {
      const [, name, value] = f;
      fields[name.toLowerCase()] = value.replace(/\s+/g, ' ').trim();
    }
    entries.push({ type: type.toLowerCase(), key, fields });
  }
  return entries;
}

const entries = parseBibEntries(bibContent);

entries.forEach((entry) => {
  const { key, fields } = entry;
  const folder = path.join(outputRoot, key);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  // Write metadata.json
  const metadata = {
    id: key,
    title: fields.title || '',
    abstract: fields.abstract || '',
    authors: fields.author ? fields.author.split(/\s+and\s+/i) : [],
    year: fields.year || '',
    venue: fields.booktitle || fields.journal || '',
    pages: fields.pages || '',
    organization: fields.organization || '',
    bibtex: entry,
  };

  fs.writeFileSync(path.join(folder, 'metadata.json'), JSON.stringify(metadata, null, 2));

  console.log(`Generated publication folder: ${folder}`);
});
