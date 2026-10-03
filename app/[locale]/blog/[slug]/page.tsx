import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { en } from "@/lib/i18n/en";
import { ImageSlot } from "@/components/ImageSlot";

export function generateStaticParams() {
  return locales.flatMap((locale) => en.blog.posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata(props: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) return {};
  const post = getDictionary(locale).blog.posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    // CHANGES-2026-10-03 #3: clinician review required before publish —
    // while `reviewed` is false, keep the article out of search entirely
    // (matches the sitemap exclusion in app/sitemap.ts).
    robots: post.reviewed ? undefined : { index: false, follow: false },
  };
}

export default async function BlogArticlePage(props: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const index = dict.blog.posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = dict.blog.posts[index];
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
          <p style={{ margin: "var(--space-md) 0 0", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)", color: "var(--color-text-secondary)" }}>
            {post.excerpt}
          </p>
          <div style={{ margin: "var(--space-lg) 0" }}>
            <ImageSlot ratio="3/2" label="PHOTO" brief={post.brief} minHeight={260} src={`/images/panels/panel-art-${index}.png`} />
          </div>
          {post.body.map((paragraph, i) => (
            <p key={i} style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : 1.6, color: "var(--color-text-primary)" }}>
              {paragraph}
            </p>
          ))}
          <p style={{ margin: "var(--space-lg) 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", padding: "var(--space-sm) var(--space-md)", borderLeft: "3px solid var(--color-border-brand)", background: "var(--color-surface-sunken)" }}>
            {dict.blog.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
