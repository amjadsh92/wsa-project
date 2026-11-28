"use client";
import { useEffect, useState, type RefObject } from "react";
import { MAX_HOME_PROJECTS, selectedHomeProjects, type HomeContent, type HomeProjects, type HomeCover } from "@/lib/home-content";
import type { PortfolioPageId } from "@/lib/project-content";
import ProjectCover from "@/app/ui/components/ProjectCover";
import ConfirmDialog from "./ConfirmDialog";
import styles from "./admin.module.css";

export default function HomeProjectsEditor({ content, onChange, viewport, previewFrame }: { previewFrame: RefObject<HTMLIFrameElement | null>; viewport: "desktop" | "phone"; content: HomeContent; onChange: (value: HomeProjects) => void }) {
  return <>
    <div className={styles.sectionHeading}><h2>Choose what comes first.</h2><p>Select up to {MAX_HOME_PROJECTS} projects per group. Titles, images and modal details follow the original projects.</p></div>
    <ProjectSelection page="page3" viewport={viewport} previewFrame={previewFrame} content={content} onChange={onChange} />
    <div className={styles.divider} />
    <label className={styles.field}>Art Work header name<input maxLength={60} value={content.homeProjects.artTitle} onChange={event => onChange({ ...content.homeProjects, artTitle: event.target.value })} /></label>
    <ProjectSelection page="page2" viewport={viewport} previewFrame={previewFrame} content={content} onChange={onChange} />
  </>;
}

function ProjectSelection({ page, content, onChange, viewport, previewFrame }: { previewFrame: RefObject<HTMLIFrameElement | null>; viewport: "desktop" | "phone"; page: PortfolioPageId; content: HomeContent; onChange: (value: HomeProjects) => void }) {
  const [adjusting, setAdjusting] = useState<string | null>(null);
  const [choice, setChoice] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);
  const selection = content.homeProjects;
  const projects = selectedHomeProjects(content.portfolio, selection, page);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const selectedSlugs = selection[page].join(",");
  useEffect(() => {
    const iframe = previewFrame.current;
    if (!iframe) return;
    let cleanup = () => {};
    const connect = () => {
      cleanup();
      const body = iframe.contentDocument?.body;
      if (!body) return;
      const read = () => {
        const next: Record<string, number> = {};
        body.querySelectorAll<HTMLElement>(`[data-home-cover^="${page}/"]`).forEach(node => {
          if (node.clientHeight) next[node.dataset.homeCover!.slice(6)] = node.clientWidth / node.clientHeight;
        });
        setRatios(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
      };
      const resize = new ResizeObserver(read);
      const observe = () => {
        resize.disconnect();
        body.querySelectorAll(`[data-home-cover^="${page}/"]`).forEach(node => resize.observe(node));
        read();
      };
      const mutations = new MutationObserver(observe);
      mutations.observe(body, { childList: true, subtree: true });
      observe();
      cleanup = () => { resize.disconnect(); mutations.disconnect(); };
    };
    connect();
    iframe.addEventListener("load", connect);
    return () => { iframe.removeEventListener("load", connect); cleanup(); };
  }, [page, previewFrame, selectedSlugs, viewport]);
  const options = content.portfolio[page].map(section => ({ ...section, projects: section.projects.filter(project => !selection[page].includes(project.slug)) }));
  const hasOptions = options.some(section => section.projects.length);
  const canAdd = projects.length < MAX_HOME_PROJECTS;
  const validChoice = options.some(section => section.projects.some(project => project.slug === choice));
  const update = (slugs: string[]) => onChange({ ...selection, [page]: slugs, ...(selection.covers ? { covers: selection.covers.filter(cover => cover.page !== page || slugs.includes(cover.slug)) } : {}) });
  const adjust = (slug: string, patch: Partial<HomeCover>) => {
    const project = projects.find(p => p.slug === slug);
    if (!project) return;
    const cover: HomeCover = { page, slug, coverX: project.coverX, coverY: project.coverY, coverZoom: project.coverZoom, coverFit: project.coverFit ?? false, ...patch };
    onChange({ ...selection, covers: [...(selection.covers ?? []).filter(c => c.page !== page || c.slug !== slug), cover] });
  };
  const add = () => {
    onChange({ ...selection, [page]: [...selection[page], choice], covers: [...(selection.covers ?? []).filter(c => c.page !== page || c.slug !== choice), { page, slug: choice, coverX: 50, coverY: 50, coverZoom: 1, coverFit: true }] });
    setAdjusting(choice); setChoice("");
  };
  // Match the image areas at the portal's 1440px desktop / 390px phone preview sizes.
  const aspectRatio = page === "page3" ? (viewport === "phone" ? "390 / 334" : "670 / 332.8") : (viewport === "phone" ? "331.5 / 275.5" : "432 / 376");
  const move = (index: number, direction: number) => {
    const slugs = [...selection[page]], next = index + direction;
    if (next < 0 || next >= slugs.length) return;
    [slugs[index], slugs[next]] = [slugs[next], slugs[index]];
    update(slugs);
  };
  return <section aria-label={`Homepage projects from ${content.navigation[page]}`}>
    {removing && <ConfirmDialog title="Remove from homepage?" description={`“${projects.find(p => p.slug === removing)?.title}” will stay in ${content.navigation[page]}. Only its homepage placement will be removed when you publish.`} confirmLabel="Remove from homepage" onCancel={() => setRemoving(null)} onConfirm={() => { update(selection[page].filter(slug => slug !== removing)); setRemoving(null); }} />}
    <h3 className={styles.subheading}>{page === "page3" ? "First project group" : "Below the header"} · {projects.length}/{MAX_HOME_PROJECTS}</h3>
    <p className={styles.help}>Choose from {content.navigation[page]} only. Use the arrows to set the display order.</p>
    <label className={styles.field}>Choose a project from {content.navigation[page]}
      <select aria-label={`Choose homepage project from ${page}`} value={validChoice ? choice : ""} disabled={!canAdd || !hasOptions} onChange={event => setChoice(event.target.value)}>
        <option value="">{!canAdd ? "Maximum reached" : !hasOptions ? "No more projects available" : "Select a project"}</option>
        {options.filter(section => section.projects.length).map(section => <optgroup key={section.id} label={section.title}>{section.projects.map(project => <option key={project.slug} value={project.slug}>{project.title} — {project.location || project.slug}</option>)}</optgroup>)}
      </select>
    </label>
    <button type="button" className={styles.secondaryButton} disabled={!canAdd || !validChoice} onClick={add}>Add to {page === "page3" ? "first group" : "header group"}</button>
    {!projects.length && <p className={styles.help}>No projects selected. This group will show no projects until you add one.</p>}
    {projects.map((project, index) => <div className={styles.homeProjectCard} key={project.slug}>
      <div className={styles.homeProjectThumb}><ProjectCover src={project.image} alt={project.title} coverX={project.coverX} coverY={project.coverY} coverZoom={project.coverZoom} coverFit={project.coverFit} sizes="120px" /></div>
      <div><strong>{index + 1}. {project.title}</strong><p className={styles.help}>{project.category} · {project.location}</p>
        <div className={styles.imageActions}>
          <button type="button" disabled={index === 0} aria-label={`Move ${project.title} earlier in ${page}`} onClick={() => move(index, -1)}>↑</button>
          <button type="button" disabled={index === projects.length - 1} aria-label={`Move ${project.title} later in ${page}`} onClick={() => move(index, 1)}>↓</button>
          <button type="button" aria-expanded={adjusting === project.slug} aria-controls={`adjust-${page}-${project.slug}`} onClick={() => setAdjusting(adjusting === project.slug ? null : project.slug)}>Adjust image</button>
          <button type="button" className={styles.deleteButton} onClick={() => setRemoving(project.slug)}>Remove</button>
        </div>
      </div>
      {adjusting === project.slug && <div className={styles.homeCropEditor} id={`adjust-${page}-${project.slug}`}>
        <p className={styles.help}>Drag the image or use the sliders. These adjustments apply only to this homepage image. The frame size stays unchanged.</p>
        <div className={styles.homeCropFrame} style={{ aspectRatio: ratios[project.slug] ?? aspectRatio }}>
          <ProjectCover src={project.image} alt={project.title} coverX={project.coverX} coverY={project.coverY} coverZoom={project.coverZoom} coverFit={project.coverFit} onPositionChange={(coverX, coverY) => adjust(project.slug, { coverX, coverY })} />
        </div>
        <small>{viewport === "phone" ? "Phone" : "Desktop"} frame preview</small>
        <label className={styles.rangeRow}>Zoom<input type="range" min="1" max="300" step="1" value={Math.round(project.coverZoom * 100)} onChange={e => adjust(project.slug, { coverZoom: Number(e.target.value) / 100 })} /><span>{Math.round(project.coverZoom * 100)}%</span></label>
        <label className={styles.rangeRow}>Horizontal<input type="range" min="0" max="100" value={project.coverX} onChange={e => adjust(project.slug, { coverX: Number(e.target.value) })} /><span>{Math.round(project.coverX)}%</span></label>
        <label className={styles.rangeRow}>Vertical<input type="range" min="0" max="100" value={project.coverY} onChange={e => adjust(project.slug, { coverY: Number(e.target.value) })} /><span>{Math.round(project.coverY)}%</span></label>
        <div className={styles.imageActions}>
          <button type="button" onClick={() => adjust(project.slug, { coverFit: true, coverZoom: 1, coverX: 50, coverY: 50 })}>Fit full image</button>
          <button type="button" onClick={() => adjust(project.slug, { coverFit: false, coverZoom: 1, coverX: 50, coverY: 50 })}>Fill frame</button>
          <button type="button" onClick={() => adjust(project.slug, { coverX: 50, coverY: 50 })}>Center</button>
        </div>
        <button type="button" className={styles.textButton} onClick={() => onChange({ ...selection, covers: (selection.covers ?? []).filter(c => c.page !== page || c.slug !== project.slug) })}>Use original project settings</button>
      </div>}
    </div>)}
  </section>;
}
