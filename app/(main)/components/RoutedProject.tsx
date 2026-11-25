import { notFound } from "next/navigation";
import { resolvePage } from "@/lib/page-routes";
import { getProjectBySlug as artProject } from "../_page2/projects";
import { getProjectBySlug as architectureProject } from "../_page3/projects";
import ArtContent from "../_page2/components/ProjectContent";
import ArchitectureContent from "../_page3/components/ProjectContent";
import ProjectModal from "./ProjectModal";
export default async function RoutedProject({ page, slug, modal = false }: { page: string; slug: string; modal?: boolean }) {
  const id = await resolvePage(page);
  if (id === "page1") notFound();
  const project = (id === "page2" ? artProject : architectureProject)(slug);
  if (!project) notFound();
  const content = id === "page2" ? <ArtContent project={project} /> : <ArchitectureContent project={project} />;
  return modal ? <ProjectModal key={page + slug}>{content}</ProjectModal> : <main className="min-h-screen bg-white">{content}</main>;
}
