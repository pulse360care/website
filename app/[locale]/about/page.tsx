import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <div>
      <div className="page-section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "70ch" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{t.eyebrow}</span>
            <h1 style={{ margin: 0, fontSize: "var(--step-display-en)", lineHeight: "var(--leading-display-en)", fontWeight: 700, letterSpacing: "-0.01em" }}>{t.h1}</h1>
            <p style={{ margin: 0, fontSize: "var(--step-lead-en)", lineHeight: "var(--leading-lead-en)", color: "var(--color-text-secondary)" }}>{t.lead}</p>
          </div>
        </div>
      </div>

      <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "76ch" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>
              {t.whatWeWillDo.eyebrow}
            </span>
            <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{t.whatWeWillDo.heading}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", marginTop: "var(--space-xs)" }}>
              {t.whatWeWillDo.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "flex-start" }}>
                  <span aria-hidden="true" style={{ flex: "none", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-tertiary)" }}>
                    —
                  </span>
                  <span style={{ fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
