import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";

export default async function HospitalsPage(props: PageProps<"/[locale]/for-hospitals">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.hospitals;

  return (
    <div>
      <div className="page-section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "70ch" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{t.eyebrow}</span>
            <h1 style={{ margin: 0, fontSize: "var(--step-display-en)", lineHeight: "var(--leading-display-en)", fontWeight: 700, letterSpacing: "-0.01em" }}>{t.h1}</h1>
            <p style={{ margin: 0, fontSize: "var(--step-lead-en)", lineHeight: "var(--leading-lead-en)", color: "var(--color-text-secondary)" }}>{t.intro}</p>
          </div>
        </div>
      </div>

      <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{t.howHeading}</h2>
          <div className="two-col" style={{ alignItems: "stretch" }}>
            {t.hospBlocks.map((b) => (
              <div key={b.head} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", padding: "var(--space-lg)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)" }}>
                <h3 style={{ margin: 0, fontSize: "var(--step-h3-en)", lineHeight: "var(--leading-h3-en)", fontWeight: 600 }}>{b.head}</h3>
                <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-secondary)" }}>{b.body}</p>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/contact`}
            style={{
              minHeight: 56,
              minWidth: 220,
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 var(--space-lg)",
              borderRadius: "var(--radius-md)",
              background: "var(--color-action-primary)",
              color: "var(--color-action-primary-text)",
              fontSize: "var(--step-lead-en)",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
