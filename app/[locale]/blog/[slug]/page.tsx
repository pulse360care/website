import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { en } from "@/lib/i18n/en";

export function generateStaticParams() {
  return locales.flatMap((locale) => en.blog.posts.map((post) => ({ locale, slug: post.slug })));
}

export default async function BlogArticlePage(props: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const post = dict.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const a = dict.blog.article;
  const isTamil = locale === "ta";

  return (
    <div className="page-section">
      <div className="container">
        <div style={{ maxWidth: "68ch" }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: isTamil ? undefined : ".04em", textTransform: isTamil ? "none" : "uppercase", color: "var(--color-text-brand)" }}>
            {post.date} · {post.readTime}
          </div>
          <h1
            style={{
              margin: "var(--space-xs) 0 0",
              fontSize: isTamil ? "var(--step-display-ta)" : "var(--step-display-en)",
              lineHeight: isTamil ? "var(--leading-display-ta)" : "var(--leading-display-en)",
              fontWeight: 700,
              letterSpacing: isTamil ? undefined : "-0.01em",
            }}
          >
            {post.title}
          </h1>
          <p style={{ margin: "var(--space-md) 0 0", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)" }}>
            {a.standfirst}
          </p>
          <div
            style={{
              margin: "var(--space-lg) 0",
              minHeight: 200,
              background: "var(--color-surface-sunken)",
              border: "1px dashed var(--color-border-default)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "var(--color-text-tertiary)",
              textAlign: "center",
              padding: "var(--space-sm)",
            }}
          >
            {a.photoCaption}
          </div>
          <p style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : 1.6 }}>{a.body1}</p>
          <h2 style={{ margin: "var(--space-lg) 0 var(--space-xs)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
            {a.subhead}
          </h2>
          <p style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : 1.6 }}>{a.body2}</p>
          <ul style={{ margin: "0 0 var(--space-md)", paddingLeft: "1.2em", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : 1.6 }}>
            {a.list.map((item, i) => (
              <li key={i} style={{ marginBottom: "var(--space-2xs)" }}>
                {item}
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: "var(--space-xl)",
              border: "1.5px solid var(--color-border-strong)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-md)",
              background: "var(--color-surface-sunken)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: isTamil ? undefined : ".04em", textTransform: isTamil ? "none" : "uppercase", marginBottom: "var(--space-2xs)" }}>
              {a.notMedicalAdvice.label}
            </div>
            <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{a.notMedicalAdvice.body}</p>
          </div>
          <div style={{ marginTop: "var(--space-lg)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{a.footerNote}</div>
        </div>
      </div>
    </div>
  );
}
