"use client";
import SharedProjectContent from "../../components/ProjectContent";
import { usePortfolio } from "@/app/ui/components/PortfolioContent";
import { allProjects, type DisplayProject } from "@/lib/project-content";
export default function ProjectContent({ project }: { project: DisplayProject }) {
 const projects = allProjects(usePortfolio(), "page3");
 return <SharedProjectContent project={project} relatedProjects={projects.filter(p => p.sectionId === project.sectionId && p.slug !== project.slug).slice(0, 3)} basePath="/page3" />;
}
