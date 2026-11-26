import ProjectGrid from "../../components/ProjectGrid";
import { usePortfolio } from "@/app/ui/components/PortfolioContent";
import { sectionProjects } from "@/lib/project-content";
export default function Header1Content() {
  const section = usePortfolio().page2[0];
  return <ProjectGrid projects={sectionProjects(section)} basePath="/page2" isFirstSection />;
}
