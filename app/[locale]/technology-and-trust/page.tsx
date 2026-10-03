import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";

export default async function TechTrustPage(props: PageProps<"/[locale]/technology-and-trust">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.techTrust;

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
        <div className="container two-col" style={{ alignItems: "stretch" }}>
          {t.trustBlocks.map((b) => (
            <div key={b.head} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", padding: "var(--space-lg)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)" }}>
              <h3 style={{ margin: 0, fontSize: "var(--step-h3-en)", lineHeight: "var(--leading-h3-en)", fontWeight: 600 }}>{b.head}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                {b.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-xs)", color: "var(--color-text-secondary)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                    <span aria-hidden="true" style={{ flex: "none", color: "var(--color-text-brand)", fontWeight: 700 }}>
                      {b.mark}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
