import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { en } from "@/lib/i18n/en";
import type { Dictionary } from "@/lib/i18n/types";
import { ImageSlot } from "@/components/ImageSlot";

type Post = Dictionary["blog"]["posts"][number];
type Block = Post["body"][number];

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

/**
 * CHANGES-2026-10-10 #7: article body is a mix of plain paragraphs and
 * typed blocks (h/h3/ul/note/q), copied verbatim from v4.dc.html's
 * articles[0]. `q` blocks also feed the FAQPage JSON-LD below.
 */
function ArticleBlock({ block, isTamil }: { block: Block; isTamil: boolean }) {
  const bodyStyle = { margin: "0 0 var(--space-md)", fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : 1.6, color: "var(--color-text-primary)" } as const;

  if (typeof block === "string") {
    return <p style={bodyStyle}>{block}</p>;
  }

  switch (block.t) {
    case "h":
      return (
        <h2
          style={{
            margin: "var(--space-xl) 0 var(--space-md)",
            fontSize: isTamil ? "var(--step-h2-ta)" : "var(--step-h2-en)",
            lineHeight: isTamil ? "var(--leading-h2-ta)" : "var(--leading-h2-en)",
            fontWeight: 700,
          }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          style={{
            margin: "var(--space-lg) 0 var(--space-sm)",
            fontSize: isTamil ? "var(--step-h3-ta)" : "var(--step-h3-en)",
            lineHeight: isTamil ? "var(--leading-h3-ta)" : "var(--leading-h3-en)",
            fontWeight: 600,
          }}
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul style={{ margin: "0 0 var(--space-md)", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
          {block.items.map((item, j) => (
            <li
              key={j}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-xs)",
                fontSize: bodyStyle.fontSize,
                lineHeight: bodyStyle.lineHeight,
                color: bodyStyle.color,
              }}
            >
              <span aria-hidden="true" style={{ color: "var(--color-text-brand)", fontWeight: 700 }}>
                –
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div
          style={{
            margin: "0 0 var(--space-md)",
            padding: "var(--space-sm) var(--space-md)",
            border: "2px solid var(--color-border-strong)",
            borderRadius: "var(--radius-md)",
            fontSize: bodyStyle.fontSize,
            lineHeight: bodyStyle.lineHeight,
            color: bodyStyle.color,
          }}
        >
          {block.text}
        </div>
      );
    case "q":
      return (
        <>
          <h3
            style={{
              margin: "var(--space-lg) 0 var(--space-xs)",
              fontSize: isTamil ? "var(--step-h3-ta)" : "var(--step-h3-en)",
              lineHeight: isTamil ? "var(--leading-h3-ta)" : "var(--leading-h3-en)",
              fontWeight: 600,
            }}
          >
            {block.q}
          </h3>
          <p style={bodyStyle}>{block.text}</p>
        </>
      );
  }
}

export default async function BlogArticlePage(props: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const post = dict.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const isTamil = locale === "ta";

  // FAQPage JSON-LD, built from the article's own `q` blocks (CHANGES-2026-10-10 #7).
  const faqBlocks = post.body.filter((b): b is Extract<Block, { t: "q" }> => typeof b !== "string" && b.t === "q");
  const faqJsonLd =
    faqBlocks.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqBlocks.map((b) => ({
            "@type": "Question",
            name: b.q,
            acceptedAnswer: { "@type": "Answer", text: b.text },
          })),
        }
      : null;

  return (
    <div className="page-section">
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      ) : null}
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
            <ImageSlot ratio="3/2" label="PHOTO" brief={post.brief} minHeight={260} src={`/images/panels/panel-${post.image}.png`} />
          </div>
          {post.body.map((block, i) => (
            <ArticleBlock key={i} block={block} isTamil={isTamil} />
          ))}
          <p style={{ margin: "var(--space-lg) 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", padding: "var(--space-sm) var(--space-md)", borderLeft: "3px solid var(--color-border-brand)", background: "var(--color-surface-sunken)" }}>
            {dict.blog.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
