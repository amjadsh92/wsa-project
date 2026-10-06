"use client";

import { useEffect, useState } from "react";
import SharedProjectContent from "../../components/ProjectContent";
import { projects, type Project } from "../projects";

export default function ProjectContent({ project }: { project: Project }) {
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Select after hydration so the server and browser initially render alike.
    const candidates = projects.filter(
      (relatedProject) =>
        relatedProject.slug !== project.slug &&
        relatedProject.category === project.category,
    );

    // Fisher–Yates shuffle: random order without duplicates.
    for (let index = candidates.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [candidates[index], candidates[randomIndex]] = [
        candidates[randomIndex],
        candidates[index],
      ];
    }

    setRelatedProjects(candidates.slice(0, 3));
  }, [project.slug, project.category]);

  return (
    <SharedProjectContent
      project={project}
      relatedProjects={relatedProjects}
      basePath="/architecture"
    />
  );
}
