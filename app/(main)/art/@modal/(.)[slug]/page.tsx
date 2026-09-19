import { notFound } from "next/navigation";
import ProjectContent from "../../components/ProjectContent";
import ProjectModal from "../../components/ProjectModal";
import { getProjectBySlug } from "../../projects";

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
    <ProjectModal>
      <ProjectContent project={project} />
    </ProjectModal>
  );
}