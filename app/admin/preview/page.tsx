"use client";
import { useEffect, useState } from "react";
import Home from "@/app/home/Home";
import Footer from "@/app/ui/components/Footer";
import { defaultHomeContent, parseHomeContent } from "@/lib/home-content";
import { allProjects } from "@/lib/project-content";
import { PageNames } from "@/app/ui/components/PageNames";
import { PortfolioContent } from "@/app/ui/components/PortfolioContent";
import { NavbarProvider } from "@/app/(main)/NavbarProvider";
import Navbar from "@/app/(main)/Navbar";
import Page2 from "@/app/(main)/_page2/Page";
import Page3 from "@/app/(main)/_page3/Page";
import ProjectContent from "@/app/(main)/components/ProjectContent";
import { InProjectModalContext } from "@/app/(main)/components/ProjectModalNavigation";
import type { PreviewTarget } from "../ProjectEditor";
export default function PreviewPage() {
  const [content, setContent] = useState(defaultHomeContent);
  const [target, setTarget] = useState<PreviewTarget>(null);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== window.parent || event.data?.type !== "home-preview") return;
      try {
        setContent(parseHomeContent(event.data.content, true));
        const target = event.data.target;
        setTarget(target && ["page2", "page3"].includes(target.page) ? { page: target.page, slug: typeof target.slug === "string" ? target.slug : undefined } : null);
      } catch { /* Ignore malformed messages. */ }
    };
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "home-preview-ready" }, location.origin);
    const keepPreview = (event: MouseEvent) => {
      if ((event.target as Element).closest("a")) event.preventDefault();
    };
    document.addEventListener("click", keepPreview, true);
    return () => { window.removeEventListener("message", receive); document.removeEventListener("click", keepPreview, true); };
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [target?.page, target?.slug]);
  const projects = target ? allProjects(content.portfolio, target.page) : [];
  const project = projects.find(project => project.slug === target?.slug);
  return <PageNames navigation={content.navigation}><PortfolioContent portfolio={content.portfolio}>
    {!target ? <Home content={content} preview /> : project ? (
      <InProjectModalContext.Provider value={true}>
        <div className="bg-white min-h-screen pt-4">
          <ProjectContent key={target.page + project.slug} project={project} relatedProjects={projects.filter(p => p.sectionId === project.sectionId && p.slug !== project.slug).slice(0, 3)} basePath={`/${target.page}`} />
        </div>
      </InProjectModalContext.Provider>
    ) : <NavbarProvider><Navbar navigation={content.navigation} />{target.page === "page2" ? <Page2 /> : <Page3 />}</NavbarProvider>}
    <Footer />
  </PortfolioContent></PageNames>;
}
