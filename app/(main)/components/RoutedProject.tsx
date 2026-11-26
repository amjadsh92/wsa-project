import { notFound } from "next/navigation";
import { resolvePage } from "@/lib/page-routes";
import { readHomeDocument } from "@/lib/home-store";
import { allProjects } from "@/lib/project-content";
import ProjectContent from "./ProjectContent";
import ProjectModal from "./ProjectModal";
export default async function RoutedProject({ page, slug, modal = false }: { page: string; slug: string; modal?: boolean }) {
  const id = await resolvePage(page);
  if (id === "page1") notFound();
  const { published } = await readHomeDocument();
  const projects = allProjects(published.portfolio, id);
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  const content = <ProjectContent project={project} relatedProjects={projects.filter(p => p.sectionId === project.sectionId && p.slug !== slug).slice(0, 3)} basePath={`/${id}`} />;
  return modal ? <ProjectModal key={page + slug}>{content}</ProjectModal> : <main className="min-h-screen bg-white">{content}</main>;
}
