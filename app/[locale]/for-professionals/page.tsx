import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { doctorLive } from "@/lib/config";
import { contactDetails } from "@/lib/contact";

export default async function ProfessionalsPage(props: PageProps<"/[locale]/for-professionals">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.professionals;

  // The doctor role card is only ever added, never disabled or greyed out
  // — see lib/config.ts `doctorLive` (MKT-06 §5).
  const roles = doctorLive ? t.roles : t.roles.slice(0, 3);
  const approvalNote = doctorLive ? t.approvalNoteFour : t.approvalNoteThree;

  return (
    <div>
      <div className="page-section">
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "70ch" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{t.eyebrow}</span>
          <h1 style={{ margin: 0, fontSize: "var(--step-display-en)", lineHeight: "var(--leading-display-en)", fontWeight: 700, letterSpacing: "-0.01em" }}>{t.h1}</h1>
          <p style={{ margin: 0, fontSize: "var(--step-lead-en)", lineHeight: "var(--leading-lead-en)", color: "var(--color-text-secondary)" }}>{t.lead}</p>
        </div>
      </div>

      <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{t.rolesHeading}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "var(--space-sm)", alignItems: "stretch" }}>
            {roles.map((role) => (
              <div key={role.title} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", padding: "var(--space-lg)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)" }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{t.zone}</span>
                <h3 style={{ margin: 0, fontSize: "var(--step-h3-en)", lineHeight: "var(--leading-h3-en)", fontWeight: 600 }}>{role.title}</h3>
                <ul style={{ margin: "var(--space-2xs) 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
                  {role.body.split(" · ").map((req) => (
                    <li key={req} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-xs)", color: "var(--color-text-secondary)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
                      <span aria-hidden="true" style={{ flex: "none", color: "var(--color-text-brand)", fontWeight: 700 }}>
                        ✓
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
                <p style={{ margin: "var(--space-sm) 0 0", paddingTop: "var(--space-sm)", borderTop: "1px solid var(--color-border-subtle)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
                  {t.approvalHeading}: {role.note ?? approvalNote}
                </p>
              </div>
            ))}
          </div>

          <p style={{ margin: 0, maxWidth: "70ch", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", padding: "var(--space-sm) var(--space-md)", borderLeft: "3px solid var(--color-border-brand)", background: "var(--color-surface-base)" }}>
            {t.noLabNote}
          </p>

          <a
            href={contactDetails.whatsappHref}
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
            {t.whatsappCta}
          </a>
        </div>
      </div>
    </div>
  );
}
