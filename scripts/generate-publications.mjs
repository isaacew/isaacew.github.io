import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const pdfRoot = path.join(repoRoot, 'pdfs', 'public', 'publications');
const imageRoot = path.join(repoRoot, 'images', 'public', 'publications');
const outputPath = path.join(repoRoot, 'publications.json');

function relativePosix(targetPath) {
  return path.relative(repoRoot, targetPath).split(path.sep).join('/');
}

function readGitFile(gitPath) {
  return execFileSync('git', ['show', `HEAD:${gitPath}`], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
}

function gitListMetadataPaths() {
  const output = execFileSync(
    'git',
    ['ls-tree', '-r', '--name-only', 'HEAD', 'content/publications'],
    { cwd: repoRoot, encoding: 'utf8' }
  );

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.endsWith('/metadata.json'));
}

function titleCase(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function prettifySlug(slug) {
  const spaced = slug
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .replace(/(\d)([A-Za-z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

  return titleCase(spaced || slug);
}

function extractYear(slug) {
  const match = slug.match(/(19|20)\d{2}/);
  return match ? Number(match[0]) : null;
}

function safeDirEntries(root) {
  try {
    return readdirSync(root, { withFileTypes: true });
  } catch {
    return [];
  }
}

function buildPdfIndex() {
  const map = new Map();
  const aliasMap = new Map([['evans200950', 'evans2009millionaire']]);

  for (const entry of safeDirEntries(pdfRoot)) {
    if (!entry.isDirectory()) continue;
    const paperPath = path.join(pdfRoot, entry.name, 'paper.pdf');
    try {
      if (statSync(paperPath).isFile()) {
        const normalizedKey = aliasMap.get(entry.name.toLowerCase()) ?? entry.name.toLowerCase();
        map.set(normalizedKey, {
          slug: entry.name,
          pdfPath: relativePosix(paperPath),
        });
      }
    } catch {
      // Ignore missing PDFs.
    }
  }

  return map;
}

function buildImageIndex() {
  const map = new Map();
  const aliasMap = new Map([['evans200950', 'evans2009millionaire']]);

  for (const entry of safeDirEntries(imageRoot)) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(imageRoot, entry.name);
    const files = safeDirEntries(dirPath)
      .filter((item) => item.isFile())
      .map((item) => item.name);
    const preferred = files.find((file) => /^featured?\.(png|jpg|jpeg|webp|svg)$/i.test(file));

    if (preferred) {
      const normalizedKey = aliasMap.get(entry.name.toLowerCase()) ?? entry.name.toLowerCase();
      map.set(normalizedKey, {
        slug: entry.name,
        imagePath: relativePosix(path.join(dirPath, preferred)),
      });
    }
  }

  return map;
}

function buildMetadataIndex() {
  const metadataPaths = gitListMetadataPaths();
  const map = new Map();

  for (const metadataPath of metadataPaths) {
    const raw = readGitFile(metadataPath);
    const metadata = JSON.parse(raw);
    map.set(metadata.id.toLowerCase(), metadata);
  }

  return map;
}

function normalizeAuthors(authors) {
  return Array.isArray(authors) ? authors : [];
}

function createFallbackRecord(asset) {
  return {
    id: asset.slug,
    slug: asset.slug,
    title: prettifySlug(asset.slug),
    authors: [],
    year: extractYear(asset.slug),
    venue: '',
    abstract: '',
    source: 'fallback',
    pdfPath: asset.pdfPath ?? '',
    imagePath: asset.imagePath ?? '',
  };
}

const pdfIndex = buildPdfIndex();
const imageIndex = buildImageIndex();
const metadataIndex = buildMetadataIndex();

const combinedKeys = new Set([
  ...pdfIndex.keys(),
  ...imageIndex.keys(),
  ...metadataIndex.keys(),
]);

const publications = Array.from(combinedKeys)
  .map((key) => {
    const pdf = pdfIndex.get(key);
    const image = imageIndex.get(key);
    const metadata = metadataIndex.get(key);

    if (!metadata) {
      return createFallbackRecord({ ...pdf, ...image, slug: pdf?.slug ?? image?.slug ?? key });
    }

    return {
      id: metadata.id,
      slug: metadata.id,
      title: metadata.title,
      authors: normalizeAuthors(metadata.authors),
      year: metadata.year ? Number(metadata.year) : extractYear(metadata.id),
      venue: metadata.venue ?? '',
      abstract: metadata.abstract ?? '',
      source: 'metadata',
      pdfPath: pdf?.pdfPath ?? '',
      imagePath: image?.imagePath ?? '',
    };
  })
  .filter((publication) => publication.pdfPath || publication.imagePath)
  .sort((left, right) => {
    const yearDiff = (right.year ?? 0) - (left.year ?? 0);
    if (yearDiff !== 0) return yearDiff;
    return left.title.localeCompare(right.title);
  });

writeFileSync(outputPath, `${JSON.stringify(publications, null, 2)}\n`, 'utf8');

console.log(`Generated ${publications.length} publications in ${relativePosix(outputPath)}.`);
