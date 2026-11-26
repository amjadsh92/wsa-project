export type PortfolioPageId = "page2" | "page3";
export type ProjectImage = { src: string; alt: string };
export type EditableProject = {
  slug: string; title: string; location: string; year: string;
  image: string; description: string; moreDescription: string; images: ProjectImage[];
};
export type ProjectSection = { id: string; title: string; projects: EditableProject[] };
export type Portfolio = Record<PortfolioPageId, ProjectSection[]>;
export type DisplayProject = EditableProject & { category: string; sectionId: string };
export const defaultProjectImage = "/architecture/images/project1.jpg";
export const defaultDescription = "JUMP is located at the intersection of diverse urban areas in Aubervilliers, Paris. Commissioned by Icade, the building connects two green zones, “Place du Front Populaire” and the urban forest of “Parc Icade des Portes de Paris”. With its colossal landing, JUMP has established itself as the central point of convergence in the area. The building integrates a hotel, offices, retail spaces, and parking. The design embraces the area’s electic architecture and enhances the dynamism of this urban area served by Metro Line 12.";
export function defaultPortfolio(): Portfolio {
  const page = () => Array.from({ length: 3 }, (_, section) => ({
    id: "header" + (section + 1), title: "Header " + (section + 1),
    projects: Array.from({ length: 9 }, (_, i) => ({
      slug: section === 0 ? "image" + (i + 1) : "header" + (section + 1) + "-image" + (i + 1),
      title: "Building 140 CERN", location: "GENEVA, CH", year: "2025",
      image: defaultProjectImage, description: defaultDescription,
      moreDescription: defaultDescription + "\n\n" + defaultDescription,
      images: Array.from({ length: 6 }, () => ({ src: defaultProjectImage, alt: "Building 140 CERN" })),
    })),
  }));
  return { page2: page(), page3: page() };
}
export function sectionProjects(section: ProjectSection): DisplayProject[] {
  return section.projects.map(project => ({ ...project, category: section.title, sectionId: section.id }));
}
export function allProjects(portfolio: Portfolio, page: PortfolioPageId) {
  return portfolio[page].flatMap(sectionProjects);
}
export function parsePortfolio(value: unknown, preview = false): Portfolio {
  if (value === undefined) return defaultPortfolio();
  const obj = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const text = (value: unknown, max: number, name: string, required = false) => {
    if (typeof value !== "string" || value.length > max || (required && !preview && !value.trim())) throw new Error("Invalid " + name + ".");
    return value.trim();
  };
  const image = (value: unknown) => {
    if (value !== defaultProjectImage && (typeof value !== "string" || !/^\/api\/media\/[a-f0-9-]{36}\.webp$/.test(value))) throw new Error("Choose an uploaded project image.");
    return value as string;
  };
  const result = {} as Portfolio;
  for (const page of ["page2", "page3"] as const) {
    const sections = obj[page];
    if (!Array.isArray(sections) || sections.length !== 3) throw new Error("Each project page needs three headers.");
    const slugs = new Set<string>();
    result[page] = sections.map((section, index) => {
      if (!section || section.id !== "header" + (index + 1) || !Array.isArray(section.projects)) throw new Error("Invalid project header.");
      return {
        id: section.id, title: text(section.title, 60, "header name", true),
        projects: section.projects.map((p: EditableProject) => {
          if (!p || typeof p.slug !== "string" || !/^[a-z0-9-]{1,80}$/.test(p.slug) || slugs.has(p.slug)) throw new Error("Project URLs must be unique within their page.");
          slugs.add(p.slug);
          const year = text(p.year, 4, "project year");
          if (year && !(preview ? /^\d{0,4}$/ : /^\d{4}$/).test(year)) throw new Error("Use a four-digit project year.");
          if (!Array.isArray(p.images) || p.images.length > 20) throw new Error("Use up to 20 additional images per project.");
          return {
            slug: p.slug, title: text(p.title, 120, "project title", true),
            location: text(p.location, 120, "location"), year, image: image(p.image),
            description: text(p.description, 5000, "description"), moreDescription: text(p.moreDescription, 10000, "expanded description"),
            images: p.images.map(img => {
              if (!img) throw new Error("Invalid additional image.");
              return { src: image(img.src), alt: text(img.alt, 160, "image description") };
            }),
          };
        }),
      };
    });
  }
  return result;
}

export function createProject(slug: string): EditableProject {
  return { slug, title: "New project", location: "", year: "", image: defaultProjectImage, description: "", moreDescription: "", images: [] };
}
