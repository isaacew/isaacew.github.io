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
  kind?: 'journal' | 'conference' | 'thesis' | 'preprint' | 'patent' | 'techreport' | 'other';
  preprintUrl?: string;
  url?: string;
  doi?: string;
  codeUrl?: string;
  hasLocalPaper?: boolean;
  bibtex?: string;
  citation?: string;
};

function formatIeeeCitation(data: any, fallbackId: string): string {
  const fields = data.bibtex?.fields ?? {};
  const title = data.title || fields.title || '';
  const authorField =
    (Array.isArray(data.authors) && data.authors.length > 0
      ? data.authors.join(', ')
      : fields.author) || '';
  const venue = data.venue || fields.booktitle || fields.journal || '';
  const year = data.year || fields.year || '';
  const pages = data.pages || fields.pages || '';

  const parts: string[] = [];
  if (authorField) parts.push(authorField);
  if (title) parts.push(`"${title}"`);
  if (venue) parts.push(venue);
  if (year) parts.push(year);
  if (pages) parts.push(`pp. ${pages}`);

  if (parts.length === 0) return fallbackId;
  return parts.join(', ');
}

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
      const citation = formatIeeeCitation(data, data.id ?? dir.name);
      const rawType = (data.bibtex?.type || '').toLowerCase();
      const journalField = (data.bibtex?.fields?.journal || '').toLowerCase();
      const kind: Publication['kind'] =
        rawType === 'article'
          ? 'journal'
          : rawType === 'inproceedings'
          ? 'conference'
          : rawType === 'phdthesis'
          ? 'thesis'
          : rawType === 'techreport'
          ? 'techreport'
          : rawType === 'misc' && journalField.includes('arxiv')
          ? 'preprint'
          : rawType === 'misc'
          ? 'patent'
          : 'other';
      publications.push({
        id: data.id ?? dir.name,
        title: data.title ?? '',
        abstract: data.abstract ?? '',
        authors: Array.isArray(data.authors) ? data.authors : [],
        year: data.year ?? '',
        venue: data.venue ?? '',
        pages: data.pages ?? '',
        organization: data.organization ?? '',
        kind,
        preprintUrl: data.preprintUrl ?? data.preprint_url ?? undefined,
        url: data.url ?? undefined,
        doi: data.doi ?? undefined,
        codeUrl: data.codeUrl ?? data.code_url ?? undefined,
        hasLocalPaper: fs.existsSync(paperPath),
        bibtex,
        citation,
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
