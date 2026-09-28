import ProjectGrid from "../../components/ProjectGrid";
import { projects } from "../projects";

export default function Header3Content() {
  return <ProjectGrid projects={projects} basePath="/architecture" />;
}
