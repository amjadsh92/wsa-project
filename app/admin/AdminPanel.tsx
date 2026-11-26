"use client";
import ConfirmDialog from "./ConfirmDialog";
import ProjectEditor, { type PreviewTarget } from "./ProjectEditor";
import { pagePath } from "@/lib/home-content";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { suisse } from "@/app/fonts";
import { MAX_IMAGES, MAX_UPLOAD_BYTES, fallbackImage, type HeroImage, type HomeContent, type HomeDocument } from "@/lib/home-content";
import styles from "./admin.module.css";

type IconName = "plus" | "arrow" | "upload" | "close" | "desktop" | "phone" | "check" | "image" | "external";
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    plus: "M12 5v14M5 12h14", arrow: "M5 12h14m-6-6 6 6-6 6", upload: "M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6",
    close: "m6 6 12 12M6 18 18 6", desktop: "M3 4h18v13H3zM8 21h8m-4-4v4", phone: "M7 2h10v20H7zM10 18h4",
    check: "m5 12 4 4L19 6", image: "M3 3h18v18H3zM3 17l6-6 4 4 3-3 5 5M15 7h.01", external: "M14 3h7v7m0-7L10 14M10 3H3v18h18v-7",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function AdminPanel({ initialDocument }: { initialDocument: HomeDocument }) {
  const [confirmation, setConfirmation] = useState<"publish" | "revert" | null>(null);
  const [document, setDocument] = useState(initialDocument);
  const [content, setContent] = useState(initialDocument.draft);
  const [section, setSection] = useState<"identity" | "carousel" | "page2" | "page3">("identity");
  const [previewTarget, setPreviewTarget] = useState<PreviewTarget>(null);
  const [viewport, setViewport] = useState<"desktop" | "phone">("desktop");
  const [selected, setSelected] = useState(0);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(600);
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const dirty = JSON.stringify(content) !== JSON.stringify(document.draft);
  const unpublished = JSON.stringify(content) !== JSON.stringify(document.published);
  const active = content.images[selected];
  const projectPage = section === "page2" || section === "page3" ? section : null;
  const pageLabel = projectPage ? content.navigation[projectPage] : "Homepage";
  const previewWidth = viewport === "desktop" ? 1440 : 390;
  const previewHeight = viewport === "desktop" ? 960 : 780;
  const scale = Math.min(1, stageWidth / previewWidth);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new ResizeObserver(entries => setStageWidth(entries[0].contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const send = () => frameRef.current?.contentWindow?.postMessage({ type: "home-preview", content, target: previewTarget }, location.origin);
    send();
    const ready = (event: MessageEvent) => {
      if (event.origin === location.origin && event.source === frameRef.current?.contentWindow && event.data?.type === "home-preview-ready") send();
    };
    window.addEventListener("message", ready);
    return () => window.removeEventListener("message", ready);
  }, [content, previewTarget]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const edit = (patch: Partial<HomeContent>) => { setContent(current => ({ ...current, ...patch })); setMessage(""); setError(""); };
  const editImage = (patch: Partial<HeroImage>) => edit({ images: content.images.map((image, i) => i === selected ? { ...image, ...patch } : image) });
  async function save(publish: boolean) {
    setBusy(publish ? "Publishing…" : "Saving…"); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/home", {
        method: publish ? "POST" : "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, revision: document.revision }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to save changes.");
      setDocument(result); setContent(result.draft);
      setMessage(publish ? "Published. Your website is now up to date." : "Draft saved. Your public website is unchanged.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to save changes."); }
    finally { setBusy(""); }
  }
  async function upload(files: FileList | File[], replace = false) {
    const list = Array.from(files);
    if (!list.length) return;
    setError(""); setMessage("");
    if (content.images.length + (replace ? 0 : list.length) > MAX_IMAGES) { setError(`You can add up to ${MAX_IMAGES} images.`); return; }
    if (list.some(file => file.size > MAX_UPLOAD_BYTES || !["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setError("Choose JPG, PNG or WebP images, up to 10 MB each."); return; }
    setBusy("Uploading…");
    const added: HeroImage[] = [];
    try {
      for (const file of list) {
        const form = new FormData(); form.append("image", file);
        const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Upload failed.");
        added.push(result);
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed. Please try again."); }
    finally {
      if (added.length) {
        setContent(current => ({ ...current, images: replace ? current.images.map((image, i) => i === selected ? { ...added[0], alt: image.alt, x: image.x, y: image.y } : image) : [...current.images, ...added] }));
        if (!replace) setSelected(content.images.length);
        setSection("carousel"); setPreviewTarget(null);
      }
      setBusy("");
      if (fileRef.current) fileRef.current.value = "";
      if (replaceRef.current) replaceRef.current.value = "";
    }
  }
  function moveImage(direction: number) {
    const images = [...content.images];
    const to = selected + direction;
    if (to < 0 || to >= images.length) return;
    [images[selected], images[to]] = [images[to], images[selected]];
    edit({ images }); setSelected(to);
  }
  const changeFile = (event: ChangeEvent<HTMLInputElement>, replace = false) => { if (event.target.files) void upload(event.target.files, replace); };

  return (
    <div className={`${styles.shell} ${suisse.className}`}>
      {confirmation && <ConfirmDialog
        title={confirmation === "publish" ? "Ready to publish?" : "Restore the published version?"}
        description={confirmation === "publish"
          ? `Your changes to ${pageLabel}, along with any pending edits to other pages, will become visible on the website.`
          : "This replaces your current edits with the published website content. Save the draft afterward to keep the restored version."}
        confirmLabel={confirmation === "publish" ? "Publish changes" : "Restore version"}
        onCancel={() => setConfirmation(null)}
        onConfirm={() => {
          setConfirmation(null);
          if (confirmation === "publish") void save(true);
          else { setContent(document.published); setSelected(0); setMessage("Published settings restored in the editor. Save the draft to keep them."); setError(""); }
        }}
      />}

      <aside className={styles.sidebar}>
        <a href="#editor" className={styles.brand}>KAAN<span>STUDIO / EDITOR</span></a>
        <div className={styles.navLabel}>YOUR WEBSITE</div>
        <nav className={styles.pageNavigation} aria-label="Website pages">
          {(["home", "page2", "page3"] as const).map((page, index) => (
            <a key={page} id={page + "-nav"} href="#editor" aria-current={(page === "home" ? !projectPage : projectPage === page) ? "page" : undefined} aria-disabled={!!busy}
              className={`${styles.navLink} ${(page === "home" ? !projectPage : projectPage === page) ? styles.navActive : ""}`}
              onClick={event => {
                if (busy) { event.preventDefault(); return; }
                setSection(page === "home" ? "identity" : page);
                setPreviewTarget(page === "home" ? null : { page });
              }}>
              <span>{String(index + 1).padStart(2, "0")}</span>{page === "home" ? "Homepage" : content.navigation[page]}<Icon name="arrow" />
            </a>
          ))}
        </nav>
        <div className={styles.sidebarBottom}><span className={styles.smallDot} />WORKSPACE<br /><p>A place to shape<br />your first impression.</p><a href="/" target="_blank" rel="noreferrer">Visit website <Icon name="external" /></a></div>
      </aside>
      <main className={styles.main} id="editor">
        <header className={styles.topbar}>
          <span>Website / <strong>{pageLabel}</strong></span>
          <div className={styles.actions}>
            <span className={styles.saveState}><i className={dirty ? styles.unsavedDot : styles.savedDot} />{dirty ? "Unsaved changes" : unpublished ? "Draft saved" : "Up to date"}</span>
            <button type="button" className={styles.secondaryButton} disabled={!!busy || !dirty} onClick={() => void save(false)}>Save draft</button>
            <button type="button" className={styles.publishButton} disabled={!!busy} onClick={() => setConfirmation("publish")}>{busy || "Publish changes"}<Icon name="arrow" /></button>
          </div>
        </header>
        <div className={styles.pageHeading}><div><p className={styles.eyebrow}>THE FIRST IMPRESSION</p><h1>{projectPage ? pageLabel : "Make it yours"}<span>.</span></h1><p>Curate your images. Define your identity. Shape your pages and project stories.</p></div><span className={styles.pageNumber}>{projectPage ? `${projectPage === "page2" ? "02" : "03"} / PROJECTS` : "01 / HOME"}</span></div>
        {(error || message) && <div role={error ? "alert" : "status"} className={error ? styles.error : styles.success}>{error || message}</div>}
        <div className={styles.workspace}>
          <section className={styles.editor} aria-label="Website settings">
            {!projectPage && <div className={styles.tabs} role="tablist" aria-label="Homepage sections">
              <button type="button" role="tab" id="identity-tab" aria-controls="editor-panel" aria-selected={section === "identity"} disabled={!!busy} onClick={() => { setSection("identity"); setPreviewTarget(null); }}><span>01</span>Identity</button>
              <button type="button" role="tab" id="carousel-tab" aria-controls="editor-panel" aria-selected={section === "carousel"} disabled={!!busy} onClick={() => { setSection("carousel"); setPreviewTarget(null); }}><span>02</span>Carousel <small>{content.images.length}</small></button>

            </div>}
            <fieldset disabled={!!busy} className={styles.editorBody} id="editor-panel" role={projectPage ? "group" : "tabpanel"} aria-labelledby={projectPage ? `${projectPage}-nav` : `${section}-tab`}>
              {section === "page2" || section === "page3" ? <ProjectEditor key={section} page={section} portfolio={content.portfolio} onChange={portfolio => edit({ portfolio })} preview={setPreviewTarget} setBusy={setBusy} onError={setError} /> : section === "identity" ? <>
                <div className={styles.sectionHeading}><h2>A name. A point of view.</h2><p>Edit the words visitors see first.</p></div>
                <label className={styles.field}>Main title <span>Required</span><input aria-label="Main title" value={content.title} maxLength={40} onChange={e => edit({ title: e.target.value })} placeholder="KAAN" /><small>This always appears on your homepage.</small></label>
                <div className={styles.field}>
                  <div className={styles.fieldRow}><label htmlFor="companion">Word beside the title</label><Toggle label="Show companion word" checked={content.showCompanion} onChange={value => edit({ showCompanion: value })} /></div>
                  <input id="companion" value={content.companion} maxLength={40} onChange={e => edit({ companion: e.target.value })} placeholder="Architecten" disabled={!content.showCompanion} />
                </div>
                <div className={styles.divider} />
                <h3 className={styles.subheading}>Page names</h3>
                <p className={styles.help}>Used on the homepage and the navigation on each page. Publishing also changes the public URLs. Project links follow their page.</p>
                {(["page1", "page2", "page3"] as const).map(key => (
                  <label className={styles.field} key={key}>{key} — {pagePath(content.navigation, key)}
                    <input aria-label={`Name for /${key}`} maxLength={30} value={content.navigation[key]} onChange={e => edit({ navigation: { ...content.navigation, [key]: e.target.value } })} />
                  </label>
                ))}
                <div className={styles.divider} />
                <h3 className={styles.subheading}>The words below</h3><p className={styles.help}>Keep all three, choose a few, or hide them entirely.</p>
                {content.words.map((word, index) => <div className={styles.wordRow} key={index}><span>0{index + 1}</span><input aria-label={`Subtitle word ${index + 1}`} value={word} maxLength={30} disabled={!content.showWords[index]} onChange={e => { const words = [...content.words] as HomeContent["words"]; words[index] = e.target.value; edit({ words }); }} /><Toggle label={`Show subtitle word ${index + 1}`} checked={content.showWords[index]} onChange={value => { const showWords = [...content.showWords] as HomeContent["showWords"]; showWords[index] = value; edit({ showWords }); }} /></div>)}
                <button type="button" className={styles.textButton} onClick={() => edit({ showCompanion: false, showWords: [false, false, false] })}>Show the main title only <Icon name="arrow" /></button>
              </> : <>
                <div className={styles.sectionHeading}><h2>Set the scene.</h2><p>Your images, in the order visitors will see them.</p></div>
                <input ref={fileRef} className={styles.fileInput} type="file" accept="image/jpeg,image/png,image/webp" multiple aria-label="Upload carousel images" onChange={e => changeFile(e)} />
                <input ref={replaceRef} className={styles.fileInput} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Replace selected image" onChange={e => changeFile(e, true)} />
                <button type="button" className={`${styles.uploadZone} ${dragging ? styles.dragging : ""}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); if (!busy) void upload(e.dataTransfer.files); }} onClick={() => fileRef.current?.click()}>
                  <span className={styles.uploadIcon}><Icon name="upload" /></span><strong>Add your images</strong><span>Drop files here or browse</span><small>JPG, PNG, WebP · up to 10 MB each</small>
                </button>
                {!content.images.length ? <div className={styles.emptyState}><div className={styles.defaultThumb} style={{ backgroundImage: `url(${fallbackImage.src})` }} /><div><strong>A considered starting point.</strong><p>No uploads yet. The default image will appear until you add your own.</p></div></div> : <>
                  <div className={styles.imageStrip} aria-label="Carousel images">{content.images.map((image, i) => <button key={image.id} type="button" aria-label={`Edit image ${i + 1}`} aria-pressed={selected === i} onClick={() => setSelected(i)} style={{ backgroundImage: `url(${image.src})`, backgroundPosition: `${image.x}% ${image.y}%` }}><span>{String(i + 1).padStart(2, "0")}</span></button>)}</div>
                  {active && <div className={styles.imageDetails}>
                    <div className={styles.selectedImage} style={{ backgroundImage: `url(${active.src})`, backgroundPosition: `${active.x}% ${active.y}%` }}><span>IMAGE {String(selected + 1).padStart(2, "0")} / {String(content.images.length).padStart(2, "0")}</span></div>
                    <div className={styles.imageActions}><button type="button" disabled={selected === 0} onClick={() => moveImage(-1)} aria-label="Move image earlier">←</button><button type="button" disabled={selected === content.images.length - 1} onClick={() => moveImage(1)} aria-label="Move image later">→</button><button type="button" onClick={() => replaceRef.current?.click()}>Replace</button><button type="button" className={styles.deleteButton} onClick={() => { edit({ images: content.images.filter((_, i) => i !== selected) }); setSelected(Math.max(0, selected - 1)); }}>Remove</button></div>
                    <label className={styles.field}>Image description<input value={active.alt} maxLength={160} onChange={e => editImage({ alt: e.target.value })} placeholder="Describe the architecture in this image" /><small>Helps visitors using screen readers.</small></label>
                    <h3 className={styles.subheading}>Image position</h3><p className={styles.help}>Choose what stays in view when the image fills the screen.</p>
                    <label className={styles.rangeRow}>Horizontal<input type="range" min="0" max="100" value={active.x} onChange={e => editImage({ x: Number(e.target.value) })} /><span>{active.x}%</span></label>
                    <label className={styles.rangeRow}>Vertical<input type="range" min="0" max="100" value={active.y} onChange={e => editImage({ y: Number(e.target.value) })} /><span>{active.y}%</span></label>
                  </div>}
                </>}
                <p className={styles.help}>Up to {MAX_IMAGES} images. Removing every image restores the default after publishing.</p>
              </>}
            </fieldset>
            <div className={styles.editorFooter}><Icon name="check" /><span>Preview as you edit. Publish when you’re ready.</span></div>
          </section>
          <section className={styles.preview} aria-label="Live website preview">
            <div className={styles.previewHeading}><div><span className={styles.liveDot} />LIVE PREVIEW</div><div className={styles.devices}><button type="button" aria-label="Desktop preview" aria-pressed={viewport === "desktop"} onClick={() => setViewport("desktop")}><Icon name="desktop" /></button><button type="button" aria-label="Mobile preview" aria-pressed={viewport === "phone"} onClick={() => setViewport("phone")}><Icon name="phone" /></button></div></div>
            <div className={styles.previewStage} ref={stageRef}>
              <div className={styles.browser} style={{ width: previewWidth * scale }}><div className={styles.browserBar}><span>● ● ●</span><span>{previewTarget ? content.navigation[previewTarget.page] : "Home"}</span><Icon name="image" /></div><div style={{ height: previewHeight * scale, overflow: "hidden" }}><iframe ref={frameRef} src="/admin/preview" title="Website draft preview" style={{ width: previewWidth, height: previewHeight, transform: `scale(${scale})`, transformOrigin: "top left", border: 0 }} onLoad={() => frameRef.current?.contentWindow?.postMessage({ type: "home-preview", content, target: previewTarget }, location.origin)} /></div></div>
            </div>
            <div className={styles.previewNote}><span><span className={styles.smallDot} />{unpublished || dirty ? "Draft preview · not yet published" : "Matches your published homepage"}</span><span>Scroll inside to explore ↓</span></div>
            <div className={styles.publishingNote}><span>YOUR NEXT CHAPTER</span><h3>Good things deserve<br />a thoughtful introduction.</h3><p>Everything here is a draft until you publish. Take your time.</p></div>
          </section>
        </div>
        <footer className={styles.panelFooter}><span>{document.publishedAt ? `Last published ${`${document.publishedAt.slice(0, 16).replace("T", " ")} UTC`}` : "Your first publication starts here."}</span><button type="button" disabled={!!busy || (!dirty && !unpublished)} onClick={() => setConfirmation("revert")}>Revert to published version</button></footer>
      </main>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={styles.toggle}><input type="checkbox" aria-label={label} checked={checked} onChange={event => onChange(event.target.checked)} /><span /></label>;
}
