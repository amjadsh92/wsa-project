"use client";
import { useMemo, useRef, useState } from "react";
import { aboutImageLayout, imageKey, type AboutImageLayout, type AboutSection } from "@/lib/about-content";
import { markdownImages } from "@/lib/markdown-images";
import { MAX_UPLOAD_BYTES } from "@/lib/home-content";
import styles from "./admin.module.css";

export default function AboutEditor({ sections, onChange, selectHeader, setBusy, onError }: {
  sections: AboutSection[];
  onChange: (sections: AboutSection[]) => void;
  selectHeader: (id: string) => void;
  setBusy: (value: string) => void;
  onError: (value: string) => void;
}) {
  const [selected, setSelected] = useState(0);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const section = sections[selected];
  const images = useMemo(() => markdownImages(section.markdown), [section.markdown]);
  const updateImage = (src: string, patch: Partial<AboutImageLayout>) => {
    const layout = { ...aboutImageLayout(section, src), ...patch, src };
    edit({ imageLayouts: [...(section.imageLayouts ?? []).filter(image => imageKey(image.src) !== imageKey(src)), layout] });
  };
  const edit = (patch: Partial<AboutSection>) => onChange(sections.map((item, i) => i === selected ? { ...item, ...patch } : item));
  function insert(markdown: string, start = textarea.current?.selectionStart ?? section.markdown.length, end = textarea.current?.selectionEnd ?? start) {
    edit({ markdown: section.markdown.slice(0, start) + markdown + section.markdown.slice(end) });
    requestAnimationFrame(() => { textarea.current?.focus(); textarea.current?.setSelectionRange(start + markdown.length, start + markdown.length); });
  }
  async function upload(file: File | undefined) {
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) { onError("Choose a JPG, PNG or WebP image up to 10 MB."); return; }
    const start = textarea.current?.selectionStart ?? section.markdown.length;
    const end = textarea.current?.selectionEnd ?? start;
    setBusy("Uploading…"); onError("");
    try {
      const form = new FormData(); form.append("image", file);
      const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed.");
      insert(`\n\n![Image](${result.src})\n\n`, start, end);
    } catch (error) { onError(error instanceof Error ? error.message : "Upload failed."); }
    finally { setBusy(""); }
  }
  return <>
    <div className={styles.sectionHeading}><h2>Your story, in your words.</h2><p>Choose a header and write its content in Markdown. See the result in the live preview.</p></div>
    <label className={styles.field}>Header<select value={selected} onChange={e => { const index = Number(e.target.value); setSelected(index); selectHeader(sections[index].id); }}>
      {sections.map((section, i) => <option key={section.id} value={i}>{i + 1}. {section.title}</option>)}
    </select></label>
    <label className={styles.field}>Header name<input value={section.title} maxLength={60} onChange={e => edit({ title: e.target.value })} /></label>
    <div className={styles.markdownToolbar} aria-label="Insert Markdown">
      {[
        ["Heading", "\n\n## Heading\n\n"],
        ["Bold", "**Bold text**"],
        ["List", "\n\n- First item\n- Second item\n\n"],
        ["Link", "[Link text](https://example.com)"],
        ["Table", "\n\n| Column 1 | Column 2 |\n| --- | --- |\n| Value | Value |\n\n"],
        ["Quote", "\n\n> A quotation\n\n"],
      ].map(([label, markdown]) => <button type="button" key={label} onClick={() => insert(markdown)}>{label}</button>)}
    </div>
    <label className={styles.field}>Section content (Markdown)
      <textarea ref={textarea} className={styles.markdownInput} rows={24} maxLength={100000} spellCheck value={section.markdown} onChange={e => edit({ markdown: e.target.value })} />
    </label>
    <label className={styles.field}>Insert an image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { void upload(e.target.files?.[0]); e.target.value = ""; }} /><small>Uploads the image and inserts Markdown at your cursor. You can also use an image URL: ![Description](https://…)</small></label>
    {!!images.length && <section aria-label="Image layout controls">
      <h3 className={styles.subheading}>Image layout</h3>
      <p className={styles.help}>Choose alignment and width for each image. Width is relative to the content area; images keep their proportions and won’t be enlarged beyond their original size. Reusing an image in this header shares its settings.</p>
      {images.map((image, index) => {
        const layout = aboutImageLayout(section, image.src);
        return <div className={styles.projectImageRow} key={imageKey(image.src)}>
          <div className={styles.projectImageThumb} style={{ backgroundImage: `url(${JSON.stringify(image.src)})` }} role="img" aria-label={image.alt} />
          <p className={styles.help}>Image {index + 1}: {image.alt}</p>
          <div className={styles.imageAlignment} role="group" aria-label={`Image ${index + 1} alignment`}>
            {(["left", "center", "right"] as const).map(align => <button type="button" key={align} aria-pressed={layout.align === align} onClick={() => updateImage(image.src, { align })}>{align === "center" ? "Center" : align === "left" ? "Left" : "Right"}</button>)}
          </div>
          <label className={styles.rangeRow}>Image {index + 1} width<input type="range" min="10" max="100" step="1" value={layout.width} onChange={e => updateImage(image.src, { width: Number(e.target.value) })} /><span>{layout.width}%</span></label>
          <button type="button" className={styles.textButton} onClick={() => updateImage(image.src, { align: "left", width: 100 })}>Reset image layout</button>
        </div>;
      })}
    </section>}
    <details className={styles.markdownHelp}><summary>Markdown guide</summary>
      <pre>{"## Heading\n**Bold** and *italic*\n- List item\n1. Numbered item\n[Link text](https://example.com)\n![Image description](/api/media/your-image.webp)\n\n| Name | Details |\n| --- | --- |\n| Example | Information |\n\n> Quotation\n\n---"}</pre>
      <p>Blank lines separate paragraphs. Tables, checklists, strikethrough, and code blocks are supported.</p>
    </details>
  </>;
}
