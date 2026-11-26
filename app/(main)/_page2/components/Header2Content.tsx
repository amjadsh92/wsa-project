import ProjectGrid from "../../components/ProjectGrid";
import { usePortfolio } from "@/app/ui/components/PortfolioContent";
import { sectionProjects } from "@/lib/project-content";
export default function Header2Content() {
  const section = usePortfolio().page2[1];
  return <ProjectGrid projects={sectionProjects(section)} basePath="/page2"  />;
}
