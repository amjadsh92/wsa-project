import ProjectGrid from "../../components/ProjectGrid";
import { usePortfolio } from "@/app/ui/components/PortfolioContent";
import { sectionProjects } from "@/lib/project-content";
export default function Header3Content() {
  const section = usePortfolio().page3[2];
  return <ProjectGrid projects={sectionProjects(section)} basePath="/page3"  />;
}
