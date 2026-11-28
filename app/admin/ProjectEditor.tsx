"use client";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import { MAX_UPLOAD_BYTES } from "@/lib/home-content";
import ProjectCover from "@/app/ui/components/ProjectCover";
import { createProject, type EditableProject, type Portfolio, type PortfolioPageId } from "@/lib/project-content";
import styles from "./admin.module.css";
export type PreviewTarget = { page: PortfolioPageId | "page1"; slug?: string; header?: string } | null;
export default function ProjectEditor({ page, portfolio, onChange, preview, setBusy, onError }: {
  page: PortfolioPageId; portfolio: Portfolio; onChange: (portfolio: Portfolio) => void;
  preview: (target: PreviewTarget) => void; setBusy: (value: string) => void; onError: (value: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fitZoom, setFitZoom] = useState<number | null>(null);
  const [header, setHeader] = useState(0);
  const [selected, setSelected] = useState(0);
  const [deleted, setDeleted] = useState<{ project: EditableProject; index: number; header: number } | null>(null);
  const section = portfolio[page][header];
  const selectedIndex = Math.min(selected, Math.max(0, section.projects.length - 1));
  const project = section.projects[selectedIndex];
  const setProjects = (projects: EditableProject[], headerIndex = header) => onChange({
    ...portfolio, [page]: portfolio[page].map((section, i) => i === headerIndex ? { ...section, projects } : section),
  });
  const addProject = () => {
    const project = createProject("project-" + crypto.randomUUID());
    setProjects([...section.projects, project]);
    setSelected(section.projects.length);
    setDeleted(null);
    preview({ page, slug: project.slug });
  };
  const deleteProject = () => {
    if (!project) return;

    setDeleted({ project, index: selectedIndex, header });
    setProjects(section.projects.filter((_, i) => i !== selectedIndex));
    setSelected(Math.max(0, selectedIndex - 1));
    preview({ page });
  };
  const updateProject = (patch: Partial<EditableProject>) => onChange({
    ...portfolio, [page]: portfolio[page].map((section, i) => i === header ? {
      ...section, projects: section.projects.map((project, j) => j === selectedIndex ? { ...project, ...patch } : project),
    } : section),
  });
  async function upload(files: FileList | null, cover: boolean) {
    if (!files?.length || !project) return;
    const list = Array.from(files);
    if (!cover && project.images.length + list.length > 20) { onError("Use up to 20 additional images."); return; }
    if (list.some(file => file.size > MAX_UPLOAD_BYTES || !["image/jpeg", "image/png", "image/webp"].includes(file.type))) { onError("Choose JPG, PNG or WebP images, up to 10 MB each."); return; }
    setBusy("Uploading…"); onError("");
    const images: { src: string; alt: string }[] = [];
    let uploadError = "";
    try {
      for (const file of list.slice(0, cover ? 1 : list.length)) {
        const form = new FormData(); form.append("image", file);
        const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Upload failed.");
        images.push({ src: result.src, alt: project.title });
      }
    } catch (error) { uploadError = error instanceof Error ? error.message : "Upload failed."; }
    finally {
      if (images.length) updateProject(cover ? { image: images[0].src, coverX: 50, coverY: 50, coverZoom: 1 } : { images: [...project.images, ...images] });
      if (uploadError) onError(uploadError);
      setBusy("");
    }
  }
  return <>
    {confirmDelete && project && <ConfirmDialog
      title="Delete this project?"
      description={`“${project.title}” will be removed from this header in your draft. The website changes only when you publish. You can undo this deletion in the editor.`}
      confirmLabel="Delete project" destructive
      onCancel={() => setConfirmDelete(false)}
      onConfirm={() => { setConfirmDelete(false); deleteProject(); }}
    />}

    <div className={styles.sectionHeading}><h2>Headers & projects.</h2><p>Edit a header, then choose a project to shape its story.</p></div>
    <label className={styles.field}>Header
      <select value={header} onChange={e => { setHeader(Number(e.target.value)); setSelected(0); preview({ page }); }}>
        {portfolio[page].map((section, i) => <option key={section.id} value={i}>{i + 1}. {section.title}</option>)}
      </select>
    </label>
    <label className={styles.field}>Header name
      <input maxLength={60} value={section.title} onChange={e => onChange({ ...portfolio, [page]: portfolio[page].map((section, i) => i === header ? { ...section, title: e.target.value } : section) })} />
    </label>
    <button type="button" className={styles.textButton} onClick={() => preview({ page })}>Preview page</button>
    <div className={styles.divider} />
    <div className={styles.projectToolbar}>
      <h3 className={styles.subheading}>{section.projects.length} projects</h3>
      <button type="button" className={styles.secondaryButton} onClick={addProject}>+ Add project</button>
    </div>
    {deleted && <div className={styles.help} role="status">Project removed from the draft. <button type="button" className={styles.textButton} onClick={() => {
      const projects = [...portfolio[page][deleted.header].projects];
      projects.splice(Math.min(deleted.index, projects.length), 0, deleted.project);
      setProjects(projects, deleted.header); setHeader(deleted.header); setSelected(deleted.index); setDeleted(null);
      preview({ page, slug: deleted.project.slug });
    }}>Undo deletion</button></div>}
    {!section.projects.length && <p className={styles.help}>This header has no projects. Use Add project to create the first one.</p>}
    {!!section.projects.length && <label className={styles.field}>Project
      <select value={selectedIndex} onChange={e => { const index = Number(e.target.value); setSelected(index); preview({ page, slug: section.projects[index].slug }); }}>
        {section.projects.map((project, i) => <option key={project.slug} value={i}>{i + 1}. {project.title}</option>)}
      </select>
    </label>}
    {project && <>
      <div className={styles.projectToolbar}>
        <button type="button" className={styles.textButton} onClick={() => preview({ page, slug: project.slug })}>Preview project details</button>
        <button type="button" className={styles.deleteProjectButton} onClick={() => setConfirmDelete(true)}>Delete project</button>
      </div>
      <label className={styles.field}>Project title<input value={project.title} maxLength={120} onChange={e => updateProject({ title: e.target.value })} /></label>
      <div className={styles.selectedImage} style={{ aspectRatio: "340 / 300", overflow: "hidden" }} role="img" aria-label={`Cover crop preview: ${project.title}`}>
        <ProjectCover src={project.image} alt={project.title} coverX={project.coverX} coverY={project.coverY} coverZoom={project.coverZoom} onFitZoom={setFitZoom} />
      </div>
      <label className={styles.field}>Choose / replace cover image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { void upload(e.target.files, true); e.target.value = ""; }} /><small>Used in the grid, related projects, and at the top of the modal.</small></label>
      <h3 className={styles.subheading}>Cover crop & zoom</h3>
      <p className={styles.help}>Zoom and position the image using the preview above. Zoom below 100% to reveal more of the image; empty space may appear around it. The full image remains visible inside the project.</p>
      <label className={styles.rangeRow}>Zoom<input type="range" min="1" max="300" step="1" value={Math.round(project.coverZoom * 100)} onChange={e => updateProject({ coverZoom: Number(e.target.value) / 100 })} /><span>{Math.round(project.coverZoom * 100)}%</span></label>
      <label className={styles.rangeRow}>Horizontal<input type="range" min="0" max="100" value={project.coverX} onChange={e => updateProject({ coverX: Number(e.target.value) })} /><span>{project.coverX}%</span></label>
      <label className={styles.rangeRow}>Vertical<input type="range" min="0" max="100" value={project.coverY} onChange={e => updateProject({ coverY: Number(e.target.value) })} /><span>{project.coverY}%</span></label>
      <button type="button" className={styles.textButton} disabled={fitZoom === null} onClick={() => { if (fitZoom !== null) updateProject({ coverX: 50, coverY: 50, coverZoom: Math.max(0.01, fitZoom) }); }}>Fit full image</button>
      <button type="button" className={styles.textButton} onClick={() => updateProject({ coverX: 50, coverY: 50 })}>Center cover</button>
      <button type="button" className={styles.textButton} onClick={() => updateProject({ coverX: 50, coverY: 50, coverZoom: 1 })}>Reset crop & zoom</button>
      <label className={styles.field}>Location<input maxLength={120} value={project.location} onChange={e => updateProject({ location: e.target.value })} /></label>
      <label className={styles.field}>Year<input inputMode="numeric" maxLength={4} value={project.year} onChange={e => updateProject({ year: e.target.value.replace(/\D/g, "") })} placeholder="2025" /></label>
      <p className={styles.help}>Category: <strong>{section.title}</strong> · follows this header’s name.</p>
      <label className={styles.field}>Description before +<textarea rows={7} maxLength={5000} value={project.description} onChange={e => updateProject({ description: e.target.value })} /></label>
      <label className={styles.field}>Description after +<textarea rows={9} maxLength={10000} value={project.moreDescription} onChange={e => updateProject({ moreDescription: e.target.value })} /><small>Leave empty to hide the + button. Separate paragraphs with a blank line.</small></label>
      <h3 className={styles.subheading}>Additional images ({project.images.length}/20)</h3>
      <label className={styles.field}>Add images<input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={e => { void upload(e.target.files, false); e.target.value = ""; }} /></label>
      {project.images.map((image, i) => <div key={i} className={styles.projectImageRow}>
        <div className={styles.projectImageThumb} style={{ backgroundImage: `url(${image.src})` }} role="img" aria-label={image.alt} />
        <p className={styles.help}>Image {i + 1}</p>
        <div className={styles.imageActions}>
          {[-1, 1].map(direction => <button key={direction} type="button" aria-label={direction < 0 ? "Move image earlier" : "Move image later"} disabled={i + direction < 0 || i + direction >= project.images.length} onClick={() => {
            const images = [...project.images]; [images[i], images[i + direction]] = [images[i + direction], images[i]]; updateProject({ images });
          }}>{direction < 0 ? "↑" : "↓"}</button>)}
          <button type="button" className={styles.deleteButton} onClick={() => updateProject({ images: project.images.filter((_, j) => j !== i) })}>Remove</button>
        </div>
      </div>)}
    </>}
  </>;
}
