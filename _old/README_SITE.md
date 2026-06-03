# Isaac Weintraub Academic Website

This repository contains the source for an academic website built with
[Astro](https://astro.build/) and [Typst](https://typst.app), adapted from the
[`tylant`](https://github.com/Myriad-Dreamin/tylant) template and oriented
around research publications rather than blogging.

The site is designed to be a hub for:

- A **main profile page** with photo and bio.
- A **Research** page that lists all publications as cards, filterable by
  research area tags.
- **Individual publication pages** with full details, abstract, and download
  links.

Blog functionality from the upstream template is effectively disabled; the
focus here is on publications, research areas, and academic profile.

## Project structure

Relevant top‑level folders:

- `src/`
  - `pages/index.astro` – main landing page (photo, bio, research areas,
    recent publications).
  - `pages/research.astro` – Research listing page (alias of
    `pages/publications/index.astro`).
  - `pages/publications/` – publications listing and detail routes.
  - `components/` – header, sidebar, and UI components (e.g.
    `Header.astro`, `Sidebar.astro`).
- `content/`
  - `publication/` – Typst files and metadata for each publication.
  - `other/` – additional content such as the `about` text.
- `public/` – static assets served as‑is.
- `typ/` – shared Typst templates and helpers.

## Running the site locally

This project uses Node.js and npm (or pnpm). From the repository root:

1. **Install dependencies**

   ```bash
   npm install
   ```

   or, if you prefer pnpm and have it installed:

   ```bash
   pnpm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   By default Astro will start on `http://localhost:4321/`. Open that URL in a
   browser to view the site. The dev server supports hot reload; saving changes
   in `src/` or `content/` will refresh the page.

3. **Build for production**

   To generate a static build into the `dist/` directory:

   ```bash
   npm run build
   ```

4. **Preview the production build**

   After building, you can preview the static output locally:

   ```bash
   npm run preview
   ```

   This runs a local server that serves the contents of `dist/`.

> Note
> The upstream template uses pnpm, but this project is configured to work with
> plain `npm` as well. Use whichever you are more comfortable with.

## Content model and how to edit it

### Main page (`/`)

- **Bio**: comes from `content/other/about.typ`. Edit that Typst file to change
  the text on the About section of the home page.
- **Photo**: the sidebar image is configured in `src/components/Sidebar.astro`;
  the main page image is imported in `src/pages/index.astro`. Replace the
  referenced image files in `src/assets/` and adjust the imports as needed.
- **Research Areas**: automatically derived from publication `tags`.
  - Any publication with a `tags` array in its metadata contributes to this
    list.
  - Each tag appears as a link on the home page that leads to the Research
    page filtered by that tag.

### Research page (`/research`)

- Implemented via `src/pages/research.astro`, which reuses
  `src/pages/publications/index.astro`.
- Displays all publications as cards, sorted by date (most recent first).
- Each card shows:
  - Title.
  - Authors.
  - Venue and date.
  - Optional thumbnail image if the publication metadata defines
    a `thumbnail` field.
  - Tag chips for the publication’s `tags`.
- The page supports filtering by research area using the `tag` query
  parameter, e.g. `/research?tag=Game%20Theory`.

### Publication detail pages

- Route pattern: `/publications/[slug]/`.
- Implemented by `src/pages/publications/[...slug].astro`, which renders
  each publication entry from the `pub` content collection using a shared
  layout (`src/layouts/BlogPost.astro`).
- Each publication pulls its metadata and content from the corresponding
  Typst file under `content/publication/`.
- Publication metadata is expected to include fields such as:
  - `title`, `author` (or author list), `venue`, `year`, `date`.
  - `abstract`/`abstractNote`.
  - `tags` – array of research area keywords (used on the home and research
    pages).
  - `file` – link to a PDF or other downloadable version of the paper.
  - `doi` – DOI string; the site can render this as a link.
  - `thumbnail` – path to a representative figure image for the card view.

You can manually edit these fields in the Typst source or associated metadata
files; changes will be picked up automatically by the Astro content system.

## Deployment

The site is a static Astro build and can be deployed to any static hosting
service (e.g. GitHub Pages, Netlify, Vercel, a simple file server).

General deployment steps:

1. Build the site:

   ```bash
   npm run build
   ```

2. Upload the contents of the `dist/` directory to your static host of
   choice, or configure a CI workflow to do this on every push to `main`.

For GitHub Pages, refer to the existing CI configuration in
`.github/workflows/gh-pages.yml` and the notes in the original `README.md`
about configuring `URL_BASE`.

