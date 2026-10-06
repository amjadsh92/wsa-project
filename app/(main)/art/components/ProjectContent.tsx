"use client";

import SharedProjectContent from "../../components/ProjectContent";
import { projects, type Project } from "../projects";

export default function ProjectContent({ project }: { project: Project }) {
  const relatedProjects = projects
    .filter(
      (relatedProject) =>
        relatedProject.slug !== project.slug &&
        relatedProject.category === project.category,
    )
    .slice(0, 3);

  return (
    <SharedProjectContent
      project={project}
      relatedProjects={relatedProjects}
      basePath="/art"
    />
  );
}
