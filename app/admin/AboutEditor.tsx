"use client";
import { useRef, useState } from "react";
import type { AboutSection } from "@/lib/about-content";
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
    <details className={styles.markdownHelp}><summary>Markdown guide</summary>
      <pre>{"## Heading\n**Bold** and *italic*\n- List item\n1. Numbered item\n[Link text](https://example.com)\n![Image description](/api/media/your-image.webp)\n\n| Name | Details |\n| --- | --- |\n| Example | Information |\n\n> Quotation\n\n---"}</pre>
      <p>Blank lines separate paragraphs. Tables, checklists, strikethrough, and code blocks are supported.</p>
    </details>
  </>;
}
