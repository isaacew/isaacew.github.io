// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import * as config from "astro:env/client";
import STATS from "../content/snapshot/article-stats.json";
import COMMENTS from "../content/snapshot/article-comments.json";

type Comment = (typeof COMMENTS)[number];

/**
 * Whether to enable theming (dark & light mode).
 */
export const kEnableTheming = true;
/**
 * Whether to enable backend, required by click and comment feature.
 */
export const kEnableBackend = false;
/**
 * Whether to enable click tracking.
 */
export const kEnableClick = true && kEnableBackend;
/**
 * Whether to enable comment posting and viewing.
 */
export const kEnableComment = true && kEnableBackend;
/**
 * Whether to enable like reaction.
 */
export const kEnableReaction = true && kEnableBackend;
/**
 * Whether to enable post search (needs Js).
 */
export const kEnableSearch = true;
/**
 * Whether to enable PDF Archive.
 */
export const kEnableArchive = false;
/**
 * Whether to enable printing
 */
export const kEnablePrinting = true && kEnableArchive;

/**
 * The title of the website.
 */
export const kSiteTitle: string = config.SITE_TITLE || "My Blog";

/**
 * The title of the website.
 */
export const kSiteLogo: string = kSiteTitle;
/**
 * The title of the website, used in the index page.
 */
export const kSiteIndexTitle: string = config.SITE_INDEX_TITLE || kSiteTitle;
/**
 * The description of the website.
 */
export const kSiteDescription: string = config.SITE_DESCRIPTION || "My blog.";
/**
 * The name of the site owner.
 */
export const kSiteOwner: string = config.SITE_OWNER;
/**
 * The source code URL of the site.
 *
 * Disable this if you don't want to show the source code link.
 */
export const kSiteSourceUrl: string | undefined = config.SITE_SOURCE_URL;
/**
 * The baidu verification code, used for SEO.
 */
/**
 * The URL base of the website.
 * - For a GitHub page `https://username.github.io/repo`, the URL base is `/repo/`.
 * - For a netlify page, the URL base is `/`.
 */
export const kUrlBase = (config.URL_BASE || "").replace(/\/$/, "");

/**
 * The click info obtained from the backend.
 */
export const kArticleStats = STATS;

/**
 * The comment info obtained from the backend.
 */
export const kCommentInfo = (() => {
  const kCommentInfo = new Map<string, Comment[]>();
  for (const comment of COMMENTS) {
    const { articleId } = comment;
    if (!kCommentInfo.has(articleId)) {
      kCommentInfo.set(articleId, []);
    }
    kCommentInfo.get(articleId)?.push(comment);
  }
  return kCommentInfo;
})();
export const kCommentList = COMMENTS;
/**
 * A candidate list of servers to cover people in different regions.
 */
export const kServers = (() => {
  // const kServers = ["http://localhost:13333"];

  const kServers = (config.BACKEND_ADDR || "")
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (kEnableBackend && kServers.length === 0) {
    throw new Error(
      "kServers is empty, please set BACKEND_ADDR in .env, or disable kEnableBackend in consts.ts"
    );
  }

  return kServers;
})();

export const kFriendLinks = [
  // {
  //   name: "name",
  //   url: "https://google.com",
  //   desc: "a good friend",
  // },
];

export const kJobTitle: string = "Aerospace Engineer at the Air Force Research Laboratory"; 

export const social = {
    email: 'isaacweintraub@gmail.com',
    location: 'Dayton, OH',
    affiliation: 'US Air Force',
    linkedin: 'https://www.linkedin.com/in/isaac-weintraub-a06a591b/',
    github: 'isaacew',
    gitlab: '',
    scholar: 'https://scholar.google.com/citations?user=Re7-TLgAAAAJ&hl=en',
    orcid: 'https://orcid.org/0000-0003-2209-2500',
    x: '',
    arxiv: 'http://arxiv.org/a/weintraub_i_1',
    // researchgate: 'https://www.researchgate.net/profile/Alexander-Von-Moll-2',
}
