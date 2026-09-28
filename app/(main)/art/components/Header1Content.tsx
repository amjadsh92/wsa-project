import ProjectGrid from "../../components/ProjectGrid";
import { projects } from "../projects";

export default function Header1Content() {
  return <ProjectGrid projects={projects} basePath="/art" isFirstSection />;
}
