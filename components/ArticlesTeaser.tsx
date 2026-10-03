import Link from "next/link";
import { ImageSlot } from "./ImageSlot";

export function ArticlesTeaser({
  locale,
  eyebrow,
  heading,
  posts,
}: {
  locale: string;
  eyebrow: string;
  heading: string;
  posts: { slug: string; title: string; excerpt: string; date: string; readTime: string; brief: string }[];
}) {
  return (
    <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "40ch" }}>{heading}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "var(--space-sm)", alignItems: "stretch" }}>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-xs)",
                padding: "var(--space-md)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface-base)",
                textDecoration: "none",
                color: "var(--color-text-primary)",
              }}
            >
              <ImageSlot ratio="3/2" label="PHOTO" brief={post.brief} src={`/images/panels/panel-art-${i}.png`} />
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)", marginTop: "var(--space-xs)" }}>{post.title}</div>
              <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-secondary)" }}>{post.excerpt}</p>
              <span style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginTop: "auto", paddingTop: "var(--space-xs)" }}>
                {post.date} · {post.readTime}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
