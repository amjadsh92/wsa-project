import { notFound } from "next/navigation";
import ProjectContent from "../components/ProjectContent";
import { getProjectBySlug } from "../projects";

export default async function ProjectPage({
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
    <main className="min-h-screen bg-[#f3f1ec]">
      <ProjectContent project={project} />
    </main>
  );
}