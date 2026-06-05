#!/usr/bin/env node

// Enrich content/publications.bib with missing data from Semantic Scholar.
// - Treats the existing .bib as source of truth.
// - Only fills fields that are currently missing (e.g., abstract, doi, url).
// - Identifies papers primarily by DOI if present, otherwise by title + first author.

import fs from 'fs';
import path from 'path';
import https from 'https';

const bibPath = path.resolve('content/publications.bib');

if (!fs.existsSync(bibPath)) {
  console.error(`BibTeX file not found: ${bibPath}`);
  process.exit(1);
}

const bibContent = fs.readFileSync(bibPath, 'utf8');

// Very small BibTeX parser similar to generate_publications_from_bib.js
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
    entries.push({ type: type.toLowerCase(), key, fields, raw: match[0] });
  }
  return entries;
}

function buildBibEntry({ type, key, fields }) {
  const ordered = Object.keys(fields)
    .sort()
    .map((name) => `  ${name} = {${fields[name]}}`)
    .join(',\n');
  return `@${type}{${key},\n${ordered}\n}`;
}

function httpsJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', reject);
  });
}

function needEnrichment(fields) {
  return !fields.abstract || !fields.doi || !fields.url;
}

async function fetchFromSemanticScholar(fields) {
  const base = 'https://api.semanticscholar.org/graph/v1/paper';
  const fieldsParam = 'fields=title,abstract,doi,url,venue,year,authors.name';

  if (fields.doi) {
    const doi = encodeURIComponent(fields.doi);
    const url = `${base}/DOI:${doi}?${fieldsParam}`;
    return httpsJson(url).catch(() => null);
  }

  if (fields.title && fields.author) {
    const title = encodeURIComponent(fields.title);
    const firstAuthor = fields.author.split(/\s+and\s+/i)[0];
    const query = encodeURIComponent(`${fields.title} ${firstAuthor}`);
    const searchUrl = `${base}/search?query=${query}&limit=1&${fieldsParam}`;
    const res = await httpsJson(searchUrl).catch(() => null);
    if (res && res.data && res.data.length > 0) return res.data[0];
  }
  return null;
}

async function main() {
  const entries = parseBibEntries(bibContent);
  let changed = false;

  for (const entry of entries) {
    const { fields, key } = entry;
    if (!needEnrichment(fields)) continue;

    console.log(`Enriching ${key}...`);
    let paper;
    try {
      paper = await fetchFromSemanticScholar(fields);
    } catch (err) {
      console.warn(`  Failed to fetch for ${key}: ${err.message}`);
      continue;
    }
    if (!paper) {
      console.warn(`  No match found for ${key}`);
      continue;
    }

    // Only fill in missing fields; never overwrite existing ones.
    if (!fields.abstract && paper.abstract) {
      fields.abstract = paper.abstract.replace(/\s+/g, ' ').trim();
      changed = true;
    }
    if (!fields.doi && paper.doi) {
      fields.doi = paper.doi;
      changed = true;
    }
    if (!fields.url && paper.url) {
      fields.url = paper.url;
      changed = true;
    }
  }

  if (!changed) {
    console.log('No changes made; all entries already had data.');
    return;
  }

  const updatedText = entries.map((e) => buildBibEntry(e)).join('\n\n');
  fs.writeFileSync(bibPath, updatedText + '\n');
  console.log('Updated BibTeX written to', bibPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

