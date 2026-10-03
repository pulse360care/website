import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";

export default async function BlogIndexPage(props: PageProps<"/[locale]/blog">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.blog;
  const isTamil = locale === "ta";

  return (
    <div className="page-section">
      <div className="container">
        <span style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{t.eyebrow}</span>
        <h1
          style={{
            margin: "var(--space-md) 0 0",
            fontSize: isTamil ? "var(--step-display-ta)" : "var(--step-display-en)",
            lineHeight: isTamil ? "var(--leading-display-ta)" : "var(--leading-display-en)",
            fontWeight: 700,
            letterSpacing: isTamil ? undefined : "-0.01em",
          }}
        >
          {t.h1}
        </h1>
        <p style={{ margin: "var(--space-md) 0 var(--space-xl)", maxWidth: "58ch", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)", color: "var(--color-text-secondary)" }}>
          {t.intro}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "var(--space-md)", alignItems: "stretch" }}>
          {t.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              style={{
                display: "block",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-lg)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: isTamil ? undefined : ".04em", textTransform: isTamil ? "none" : "uppercase", color: "var(--color-text-brand)" }}>
                {post.date} · {post.readTime}
              </div>
              <div style={{ marginTop: "var(--space-2xs)", fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>
                {post.title}
              </div>
              <p style={{ margin: "var(--space-xs) 0 0", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-primary)" }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
