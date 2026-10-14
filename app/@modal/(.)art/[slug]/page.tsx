import { notFound } from "next/navigation";
import ProjectContent from "@/app/(main)/art/components/ProjectContent";
import ProjectModal from "@/app/(main)/art/components/ProjectModal";
import { getProjectBySlug } from "@/app/(main)/art/projects";

export default async function ProjectModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectModal key={slug}>
      <ProjectContent project={project} />
    </ProjectModal>
  );
}
