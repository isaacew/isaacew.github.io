import fs from 'fs';
import path from 'path';

export type Publication = {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  year: string;
  venue: string;
  pages: string;
  organization: string;
  preprintUrl?: string;
  url?: string;
  doi?: string;
  codeUrl?: string;
  hasLocalPaper?: boolean;
  bibtex?: string;
};

export function getPublications(): Publication[] {
  const root = path.resolve('content/publications');
  if (!fs.existsSync(root)) return [];

  const entries = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const publications: Publication[] = [];

  for (const dir of entries) {
    const folder = path.join(root, dir.name);
    const metaPath = path.join(folder, 'metadata.json');
    if (!fs.existsSync(metaPath)) continue;

    try {
      const raw = fs.readFileSync(metaPath, 'utf8');
      const data = JSON.parse(raw);
      const paperPath = path.join(folder, 'paper.pdf');
      const bibtex =
        typeof data.bibtex === 'string'
          ? data.bibtex
          : data.bibtex && data.bibtex.fields
          ? `@${data.bibtex.type || 'article'}{${data.bibtex.key || data.id || dir.name},\n` +
            Object.entries(data.bibtex.fields)
              .map(([k, v]) => `  ${k} = {${v}}`)
              .join(',\n') +
            '\n}'
          : undefined;
      publications.push({
        id: data.id ?? dir.name,
        title: data.title ?? '',
        abstract: data.abstract ?? '',
        authors: Array.isArray(data.authors) ? data.authors : [],
        year: data.year ?? '',
        venue: data.venue ?? '',
        pages: data.pages ?? '',
        organization: data.organization ?? '',
        preprintUrl: data.preprintUrl ?? data.preprint_url ?? undefined,
        url: data.url ?? undefined,
        doi: data.doi ?? undefined,
        codeUrl: data.codeUrl ?? data.code_url ?? undefined,
        hasLocalPaper: fs.existsSync(paperPath),
        bibtex,
      });
    } catch {
      // Skip malformed entries
    }
  }

  // Sort most recent first (by year desc, then title)
  publications.sort((a, b) => {
    const ya = parseInt(a.year || '0', 10);
    const yb = parseInt(b.year || '0', 10);
    if (yb !== ya) return yb - ya;
    return a.title.localeCompare(b.title);
  });

  return publications;
}
