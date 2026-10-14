import { notFound } from "next/navigation";
import ProjectContent from "@/app/(main)/architecture/components/ProjectContent";
import ProjectModal from "@/app/(main)/architecture/components/ProjectModal";
import { getProjectBySlug } from "@/app/(main)/architecture/projects";

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
