import { education, experiences, profile, skills } from './site-data.js';

const PAGE_SIZE = 9;
const HERO_MESSAGES = [
  'Pursuit-evasion systems, guidance law design, and flight-tested autonomy.',
  'A cleaner archive built directly from retained papers, figures, and metadata.',
  'Search, filter, and scan the publication record without fighting the layout.',
];

const state = {
  publications: [],
  search: '',
  year: '',
  sort: 'newest',
  view: 'grid',
  visibleCount: PAGE_SIZE,
  spotlightIndex: 0,
};

const elements = {
  profileTitle: document.querySelector('#profile-title'),
  profileSummary: document.querySelector('#profile-summary'),
  heroFocusline: document.querySelector('#hero-focusline'),
  heroLatestYear: document.querySelector('#hero-latest-year'),
  heroImageCount: document.querySelector('#hero-image-count'),
  heroSpotlightMeta: document.querySelector('#hero-spotlight-meta'),
  heroSpotlightTitle: document.querySelector('#hero-spotlight-title'),
  heroSpotlightSummary: document.querySelector('#hero-spotlight-summary'),
  heroSpotlightTicker: document.querySelector('#hero-spotlight-ticker'),
  heroSpotlightLink: document.querySelector('#hero-spotlight-link'),
  heroSpotlightLinkLabel: document.querySelector('#hero-spotlight-link-label'),
  cvLink: document.querySelector('#cv-link'),
  portrait: document.querySelector('#portrait'),
  stats: document.querySelector('#stats'),
  researchAreas: document.querySelector('#research-areas'),
  skills: document.querySelector('#skills'),
  publicationCount: document.querySelector('#publication-count'),
  publicationGrid: document.querySelector('#publication-grid'),
  experienceTimeline: document.querySelector('#experience-timeline'),
  educationTimeline: document.querySelector('#education-timeline'),
  yearFilter: document.querySelector('#year-filter'),
  sortFilter: document.querySelector('#sort-filter'),
  searchInput: document.querySelector('#search-input'),
  viewGrid: document.querySelector('#view-grid'),
  viewCompact: document.querySelector('#view-compact'),
  loadMore: document.querySelector('#load-more'),
  resultsHero: document.querySelector('#results-hero'),
};

const parallaxElements = {
  ambientNorth: document.querySelector('.ambient--north'),
  ambientEast: document.querySelector('.ambient--east'),
  ambientSouth: document.querySelector('.ambient--south'),
  heroVisual: document.querySelector('.hero__visual'),
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

function truncate(text, limit = 180) {
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
}

function formatAuthors(authors) {
  return authors.length ? authors.join(', ') : 'Metadata unavailable';
}

function uniqueYears(items) {
  return [...new Set(items.map((item) => item.year).filter(Boolean))].sort((a, b) => b - a);
}

function sortPublications(items) {
  const sorted = [...items];

  if (state.sort === 'title') {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (state.sort === 'oldest') {
    return sorted.sort((a, b) => (a.year ?? 0) - (b.year ?? 0) || a.title.localeCompare(b.title));
  }

  return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));
}

function filteredPublications() {
  const query = state.search.trim().toLowerCase();

  return sortPublications(
    state.publications.filter((publication) => {
      if (state.year && String(publication.year ?? '') !== state.year) return false;
      if (!query) return true;

      return [publication.title, publication.venue, publication.year, publication.authors.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(query);
    })
  );
}

function heroPublications() {
  const items = sortPublications(state.publications).filter((publication) => publication.imagePath);
  return items.length ? [items[0]] : [];
}

function computeStats() {
  const years = uniqueYears(state.publications);
  return [
    { label: 'Publications', value: state.publications.length },
    { label: 'Years Covered', value: years.length || 'N/A' },
    { label: 'Image Previews', value: state.publications.filter((item) => item.imagePath).length },
    { label: 'Newest Item', value: years[0] ?? 'N/A' },
  ];
}

function renderStats() {
  const stats = computeStats();
  elements.stats.innerHTML = stats
    .map(
      (item) => `
        <div class="stats__item">
          <dt>${escapeHtml(item.label)}</dt>
          <dd>${escapeHtml(item.value)}</dd>
        </div>
      `
    )
    .join('');

}

function renderProfile() {
  elements.profileTitle.textContent = `${profile.title} | ${profile.institute}`;
  elements.profileSummary.textContent = profile.summary;
  elements.cvLink.href = profile.cvPath;
  elements.portrait.src = profile.portraitPath;
  elements.researchAreas.innerHTML = profile.researchAreas
    .map(
      (area) => `
        <article class="pill-card">
          <h3>${escapeHtml(area.title)}</h3>
          <p>${escapeHtml(area.description)}</p>
        </article>
      `
    )
    .join('');
}

function renderSkills() {
  elements.skills.innerHTML = skills
    .map(
      (skill) => `
        <article class="capability-card">
          <h3>${escapeHtml(skill.title)}</h3>
          <p>${escapeHtml(skill.description)}</p>
        </article>
      `
    )
    .join('');
}

function renderTimeline(target, items, kind) {
  target.innerHTML = items
    .map((item) => {
      const name = kind === 'experience' ? item.company : item.school;
      const subtitle = kind === 'experience' ? item.title : item.degree;

      return `
        <article class="timeline__item">
          <p class="timeline__time">${escapeHtml(item.time)}</p>
          <h3>${escapeHtml(name)}</h3>
          <p class="timeline__subtitle">${escapeHtml(subtitle)}</p>
          <p class="timeline__location">${escapeHtml(item.location)}</p>
          ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
        </article>
      `;
    })
    .join('');
}

function populateYearFilter() {
  elements.yearFilter.innerHTML = '<option value="">All years</option>';
  elements.yearFilter.insertAdjacentHTML(
    'beforeend',
    uniqueYears(state.publications).map((year) => `<option value="${year}">${year}</option>`).join('')
  );
}

function renderHeroSpotlight() {
  const items = heroPublications();

  if (!items.length) {
    elements.heroSpotlightMeta.textContent = 'Archive';
    elements.heroSpotlightTitle.textContent = 'Spotlight unavailable';
    elements.heroSpotlightSummary.textContent = 'Publication metadata could not be loaded.';
    elements.heroSpotlightTicker.textContent = 'Archive offline';
    elements.heroSpotlightLink.href = '#publications';
    elements.heroSpotlightLinkLabel.textContent = 'View archive';
    return;
  }

  const publication = items[state.spotlightIndex % items.length];
  elements.heroSpotlightMeta.textContent = [publication.year, publication.venue]
    .filter(Boolean)
    .join(' / ');
  elements.heroSpotlightTitle.textContent = publication.title;
  elements.heroSpotlightSummary.textContent = truncate(publication.abstract, 160) || formatAuthors(publication.authors);
  elements.heroSpotlightTicker.textContent = '';
  elements.heroSpotlightLink.href = publication.pdfPath || '#publications';
  elements.heroSpotlightLinkLabel.textContent = publication.pdfPath ? 'PDF' : 'Archive';
}

function createPublicationCard(publication) {
  const meta = [publication.year, publication.venue].filter(Boolean).join(' / ');
  const imageMarkup = publication.imagePath
    ? `<img src="${escapeHtml(publication.imagePath)}" alt="${escapeHtml(publication.title)} preview" loading="lazy" />`
    : `<div class="publication-card__placeholder">${escapeHtml(
        publication.title
          .split(/\s+/)
          .slice(0, 2)
          .map((word) => word[0] ?? '')
          .join('')
      )}</div>`;

  return `
    <article class="publication-card ${state.view === 'compact' ? 'publication-card--compact' : ''}">
      <div class="publication-card__media">${imageMarkup}</div>
      <div class="publication-card__body">
        <p class="publication-card__meta">${escapeHtml(meta || 'Publication')}</p>
        <h3>${escapeHtml(publication.title)}</h3>
        <p class="publication-card__authors">${escapeHtml(formatAuthors(publication.authors))}</p>
        <p class="publication-card__abstract">${escapeHtml(
          truncate(publication.abstract, state.view === 'compact' ? 100 : 150)
        )}</p>
        <div class="publication-card__actions">
          ${
            publication.pdfPath
              ? `<a class="button button--small button--solid" href="${escapeHtml(
                  publication.pdfPath
                )}" target="_blank" rel="noreferrer">Open PDF</a>`
              : ''
          }
          <span class="publication-card__tag">${escapeHtml(publication.source)}</span>
        </div>
      </div>
    </article>
  `;
}

function renderResultsHero(filtered) {
  elements.resultsHero.innerHTML = '';
}

function animateWobble() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const softNoise = document.querySelector('#wobble-soft-noise');
  const softMap = document.querySelector('#wobble-soft-map');
  const strongNoise = document.querySelector('#wobble-strong-noise');
  const strongMap = document.querySelector('#wobble-strong-map');

  if (!softNoise || !softMap || !strongNoise || !strongMap) {
    return;
  }

  const start = performance.now();

  function frame(now) {
    const t = (now - start) / 1000;
    const softX = 0.008 + Math.sin(t * 0.7) * 0.0018;
    const softY = 0.012 + Math.cos(t * 0.9) * 0.0015;
    const strongX = 0.016 + Math.sin(t * 1.05) * 0.0022;
    const strongY = 0.02 + Math.cos(t * 1.15) * 0.002;

    softNoise.setAttribute('baseFrequency', `${softX.toFixed(4)} ${softY.toFixed(4)}`);
    softMap.setAttribute('scale', `${(14 + Math.sin(t * 1.1) * 3).toFixed(2)}`);
    strongNoise.setAttribute('baseFrequency', `${strongX.toFixed(4)} ${strongY.toFixed(4)}`);
    strongMap.setAttribute('scale', `${(22 + Math.cos(t * 1.25) * 4).toFixed(2)}`);

    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
}

function renderPublications() {
  const filtered = filteredPublications();
  const shown = filtered.slice(0, state.visibleCount);

  elements.publicationCount.textContent = `${shown.length} of ${filtered.length} records shown`;
  elements.publicationGrid.classList.toggle('publication-grid--compact', state.view === 'compact');
  renderResultsHero(filtered);

  elements.publicationGrid.innerHTML = shown.length
    ? shown.map(createPublicationCard).join('')
    : '<div class="empty-state">No publications match the current filters.</div>';

  elements.loadMore.hidden = shown.length >= filtered.length;
}

function startHeroMotion() {
  let messageIndex = 0;
  elements.heroFocusline.textContent = HERO_MESSAGES[0];

  window.setInterval(() => {
    messageIndex = (messageIndex + 1) % HERO_MESSAGES.length;
    elements.heroFocusline.textContent = HERO_MESSAGES[messageIndex];
  }, 4200);
}

function setupScrollParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let ticking = false;

  function update() {
    const y = window.scrollY || window.pageYOffset || 0;
    const normalized = Math.min(Math.max(y / 900, 0), 1);

    if (parallaxElements.ambientNorth) {
      parallaxElements.ambientNorth.style.transform = `translate3d(${normalized * -14}px, ${normalized * 8}px, 0)`;
    }

    if (parallaxElements.ambientEast) {
      parallaxElements.ambientEast.style.transform = `translate3d(${normalized * 18}px, ${normalized * -12}px, 0)`;
    }

    if (parallaxElements.ambientSouth) {
      parallaxElements.ambientSouth.style.transform = `translate3d(${normalized * -12}px, ${normalized * 6}px, 0)`;
    }

    if (parallaxElements.heroVisual) {
      const heroOffset = Math.max(0, Math.min(y, 220));
      parallaxElements.heroVisual.style.transform = `translate3d(0, ${heroOffset * -0.06}px, 0)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
    }
    ticking = true;
  });

  update();
}

function bindControls() {
  elements.searchInput.addEventListener('input', (event) => {
    state.search = event.target.value;
    state.visibleCount = PAGE_SIZE;
    renderPublications();
  });

  elements.yearFilter.addEventListener('change', (event) => {
    state.year = event.target.value;
    state.visibleCount = PAGE_SIZE;
    renderPublications();
  });

  elements.sortFilter.addEventListener('change', (event) => {
    state.sort = event.target.value;
    state.visibleCount = PAGE_SIZE;
    renderPublications();
  });

  elements.viewGrid?.addEventListener('click', () => {
    state.view = 'grid';
    renderPublications();
  });

  elements.loadMore.addEventListener('click', () => {
    state.visibleCount += PAGE_SIZE;
    renderPublications();
  });
}

function setupReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          const children = entry.target.querySelectorAll('.reveal__child');
          children.forEach((node, index) => {
            node.style.animationDelay = `${index * 45}ms`;
          });

          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
}

async function loadPublications() {
  try {
    const response = await fetch('./publications.json');
    if (!response.ok) {
      throw new Error(`Failed to load publications: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function init() {
  renderProfile();
  renderSkills();
  renderTimeline(elements.experienceTimeline, experiences, 'experience');
  renderTimeline(elements.educationTimeline, education, 'education');
  bindControls();
  setupReveals();

  state.publications = await loadPublications();
  populateYearFilter();
  renderStats();
  renderHeroSpotlight();
  renderPublications();
  startHeroMotion();
  animateWobble();
  setupScrollParallax();
}

init();
