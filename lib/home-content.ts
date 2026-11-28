import { defaultAboutSections, parseAboutSections, type AboutSection } from "./about-content";
import { allProjects, defaultPortfolio, parsePortfolio, type Portfolio, type PortfolioPageId } from "./project-content";
export type HeroImage = {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
};

export const MAX_HOME_PROJECTS = 5;
export type HomeCover = { page: PortfolioPageId; slug: string; coverX: number; coverY: number; coverZoom: number; coverFit: boolean };
export type HomeProjects = { page3: string[]; page2: string[]; artTitle: string; covers?: HomeCover[] };
export function defaultHomeProjects(portfolio: Portfolio): HomeProjects {
  return { page3: allProjects(portfolio, "page3").slice(0, MAX_HOME_PROJECTS).map(p => p.slug), page2: allProjects(portfolio, "page2").slice(0, MAX_HOME_PROJECTS).map(p => p.slug), artTitle: "Art Work" };
}
export function selectedHomeProjects(portfolio: Portfolio, selection: HomeProjects, page: PortfolioPageId) {
  const projects = new Map(allProjects(portfolio, page).map(project => [project.slug, project]));
  return selection[page].flatMap(slug => {
    const project = projects.get(slug);
    const cover = selection.covers?.find(cover => cover.page === page && cover.slug === slug);
    return project ? [{ ...project, ...(cover ? { coverX: cover.coverX, coverY: cover.coverY, coverZoom: cover.coverZoom, coverFit: cover.coverFit } : {}) }] : [];
  });
}
// Removing a source project also removes its homepage reference. Never auto-fill a curated list.
export function reconcileHomeProjects(selection: HomeProjects, portfolio: Portfolio): HomeProjects {
  const result = { ...selection, page2: selectedHomeProjects(portfolio, selection, "page2").map(p => p.slug), page3: selectedHomeProjects(portfolio, selection, "page3").map(p => p.slug) };
  if (result.covers) result.covers = result.covers.filter(cover => result[cover.page].includes(cover.slug));
  return result;
}

export type HomeContent = {
  homeProjects: HomeProjects;
  about: AboutSection[];
  portfolio: Portfolio;
  navigation: { page1: string; page2: string; page3: string };
  title: string;
  companion: string;
  showCompanion: boolean;
  words: [string, string, string];
  showWords: [boolean, boolean, boolean];
  images: HeroImage[];
};

export type HomeDocument = {
  revision: number;
  draft: HomeContent;
  published: HomeContent;
  savedAt: string | null;
  publishedAt: string | null;
};

export const MAX_IMAGES = 20;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const fallbackImage: HeroImage = {
  id: "default", src: "/home/images/project1.jpg", alt: "Architecture by KAAN", x: 50, y: 50,
};
export const defaultHomeContent: HomeContent = {
  homeProjects: defaultHomeProjects(defaultPortfolio()),
  navigation: { page1: "About", page2: "Art", page3: "Architecture" },
  about: defaultAboutSections,
  portfolio: defaultPortfolio(),
  title: "KAAN",
  companion: "Architecten",
  showCompanion: true,
  words: ["Architecture", "Art", "Design"],
  showWords: [true, true, true],
  images: [],
};
export const visibleImages = (content: HomeContent) => content.images.length ? content.images : [fallbackImage];
export const visibleWords = (content: HomeContent) => content.words.filter((word, i) => content.showWords[i] && word.trim());

// The same validation is used by the API and the isolated live preview.
export function parseHomeContent(value: unknown, allowEmptyTitle = false): HomeContent {
  if (!value || typeof value !== "object") throw new Error("Invalid homepage settings.");
  const v = value as Record<string, unknown>;
  const text = (input: unknown, limit: number, name: string) => {
    if (typeof input !== "string" || input.length > limit) throw new Error(`${name} must be no longer than ${limit} characters.`);
    return input.trim();
  };
  // Existing saved documents predate editable navigation names.
  const rawNavigation = v.navigation === undefined ? defaultHomeContent.navigation : v.navigation;
  if (!rawNavigation || typeof rawNavigation !== "object" || Array.isArray(rawNavigation)) throw new Error("Invalid navigation names.");
  const navigation = {} as HomeContent["navigation"];
  for (const key of pageIds) {
    const name = text((rawNavigation as Record<string, unknown>)[key] ?? (rawNavigation as Record<string, unknown>)[legacyPageKeys[key]], 30, "Navigation name");
    if (!name && !allowEmptyTitle) throw new Error("Enter all three navigation names before saving.");
    navigation[key] = name;
  }
  if (!allowEmptyTitle) {
    const slugs = pageIds.map(key => pageSlug(navigation[key]));
    if (slugs.some(slug => !slug || reservedPageSlugs.has(slug))) throw new Error("Choose page names that produce valid URLs and do not use reserved routes.");
    if (new Set(slugs).size !== slugs.length) throw new Error("Each page needs a different URL.");
  }
  const title = text(v.title, 40, "Main title");
  if (!title && !allowEmptyTitle) throw new Error("Enter a main title before saving.");
  if (typeof v.showCompanion !== "boolean" || !Array.isArray(v.words) || v.words.length !== 3 || !Array.isArray(v.showWords) || v.showWords.length !== 3 || !v.showWords.every(b => typeof b === "boolean")) throw new Error("Invalid text visibility settings.");
  if (!Array.isArray(v.images) || v.images.length > MAX_IMAGES) throw new Error(`Use up to ${MAX_IMAGES} carousel images.`);
  const images = v.images.map((image: unknown): HeroImage => {
    if (!image || typeof image !== "object") throw new Error("Invalid carousel image.");
    const img = image as Record<string, unknown>;
    if (typeof img.id !== "string" || !/^[a-f0-9-]{36}\.webp$/.test(img.id) || img.src !== `/api/media/${img.id}`) throw new Error("Choose an uploaded image.");
    if (typeof img.x !== "number" || !Number.isFinite(img.x) || img.x < 0 || img.x > 100 || typeof img.y !== "number" || !Number.isFinite(img.y) || img.y < 0 || img.y > 100) throw new Error("Invalid image position.");
    return { id: img.id, src: img.src as string, alt: text(img.alt, 160, "Image description"), x: img.x, y: img.y };
  });
  if (new Set(images.map(img => img.id)).size !== images.length) throw new Error("The same upload cannot appear twice.");
  const portfolio = parsePortfolio(v.portfolio, allowEmptyTitle);
  const raw = v.homeProjects === undefined ? defaultHomeProjects(portfolio) : v.homeProjects;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Invalid homepage project settings.");
  const settings = raw as Record<string, unknown>;
  const artTitle = text(settings.artTitle, 60, "Homepage project header");
  if (!artTitle && !allowEmptyTitle) throw new Error("Enter a homepage project header.");
  const homeProjects: HomeProjects = { artTitle, page2: [], page3: [] };
  for (const page of ["page2", "page3"] as const) {
    const slugs = settings[page];
    const available = new Set(allProjects(portfolio, page).map(project => project.slug));
    if (!Array.isArray(slugs) || slugs.length > MAX_HOME_PROJECTS) throw new Error(`Choose up to ${MAX_HOME_PROJECTS} homepage projects per group.`);
    if (slugs.some(slug => typeof slug !== "string" || !available.has(slug))) throw new Error(`Choose homepage projects from ${navigation[page]} only.`);
    if (new Set(slugs).size !== slugs.length) throw new Error("A homepage project cannot appear twice in its group.");
    homeProjects[page] = [...slugs];
  }
  if (settings.covers !== undefined) {
    if (!Array.isArray(settings.covers) || settings.covers.length > MAX_HOME_PROJECTS * 2) throw new Error("Invalid homepage image adjustments.");
    const seen = new Set<string>();
    homeProjects.covers = settings.covers.map((cover: HomeCover) => {
      if (!cover || !["page2", "page3"].includes(cover.page) || typeof cover.slug !== "string" || !homeProjects[cover.page].includes(cover.slug)) throw new Error("Choose a selected homepage project to adjust.");
      const key = cover.page + "/" + cover.slug;
      if (seen.has(key)) throw new Error("Duplicate homepage image adjustment.");
      seen.add(key);
      if ([cover.coverX, cover.coverY].some(value => typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) || typeof cover.coverZoom !== "number" || !Number.isFinite(cover.coverZoom) || cover.coverZoom < .01 || cover.coverZoom > 3 || typeof cover.coverFit !== "boolean") throw new Error("Invalid homepage image zoom or position.");
      return { page: cover.page, slug: cover.slug, coverX: cover.coverX, coverY: cover.coverY, coverZoom: cover.coverZoom, coverFit: cover.coverFit };
    });
  }
  return {
    homeProjects,
    about: parseAboutSections(v.about, allowEmptyTitle),
    portfolio, navigation, title, companion: text(v.companion, 40, "Companion word"), showCompanion: v.showCompanion,
    words: v.words.map(w => text(w, 30, "Subtitle word")) as HomeContent["words"],
    showWords: v.showWords as HomeContent["showWords"], images,
  };
}


export const pageIds = ["page1", "page2", "page3"] as const;
export type PageId = typeof pageIds[number];
const legacyPageKeys = { page1: "about", page2: "art", page3: "architecture" } as const;
export function pageSlug(name: string): string {
  return name.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
export const reservedPageSlugs = new Set(["admin", "api", "_next", "page1", "page2", "page3", "work", "test", "repository", "home", "fonts", "images", "favicon-ico", "robots-txt", "sitemap-xml"]);
export function pagePath(navigation: HomeContent["navigation"], id: PageId) {
  return "/" + pageSlug(navigation[id]);
}
