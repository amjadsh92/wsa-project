export type HeroImage = {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
};

export type HomeContent = {
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
  return {
    title, companion: text(v.companion, 40, "Companion word"), showCompanion: v.showCompanion,
    words: v.words.map(w => text(w, 30, "Subtitle word")) as HomeContent["words"],
    showWords: v.showWords as HomeContent["showWords"], images,
  };
}
