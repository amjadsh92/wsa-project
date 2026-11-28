"use client";
import AboutImage from "./AboutImage";
import { aboutImageLayout } from "@/lib/about-content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { suisse } from "@/app/fonts";
import { useAboutSections } from "@/app/ui/components/AboutContent";
import styles from "./markdown.module.css";

export default function MarkdownSection({ index }: { index: number }) {
  const section = useAboutSections()[index];
  return <div data-about-section={section.id}
    className={`${suisse.className} ${styles.markdown} relative text-[1.375rem] p-[1.25rem] w-[80%] max-[960px]:text-[1.25rem] max-[750px]:text-[1.125rem] max-[600px]:text-[1rem] max-[500px]:w-[90%] max-[400px]:text-[0.875rem] ${index === 0 ? "pt-[10rem] bg-[#E1E3E3]" : "pt-[2.5rem]"} ${index === 2 ? "pb-[21.25rem]" : "pb-[11.75rem] max-[600px]:pb-[6.25rem]"}`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{
      img: ({ src, alt, title }) => typeof src === "string" && src ? <AboutImage key={src} src={src} alt={alt} title={title} layout={aboutImageLayout(section, src)} /> : null,
      table: ({ children }) => <div className={styles.tableScroll} role="region" aria-label={`Table in ${section.title}`} tabIndex={0}><table>{children}</table></div>,
    }}>{section.markdown}</ReactMarkdown>
  </div>;
}
