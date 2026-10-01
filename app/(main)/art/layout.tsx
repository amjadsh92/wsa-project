import { ProjectModalNavigation } from "../components/ProjectModalNavigation";

export default function ArtLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ProjectModalNavigation>
      {children}
      {modal}
    </ProjectModalNavigation>
  );
}
