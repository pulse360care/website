import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { doctorLive } from "@/lib/config";
import { contactDetails } from "@/lib/contact";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.contact;

  const contactRows = [
    { label: t.whatsappLabel, value: contactDetails.whatsapp, href: contactDetails.whatsappHref },
    { label: t.phoneLabel, value: contactDetails.phone, href: contactDetails.phoneHref },
    { label: t.emailLabel, value: contactDetails.email, href: contactDetails.emailHref },
  ];

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
        <div className="container">
          <ContactForm locale={locale} dict={dict} doctorLive={doctorLive} />
        </div>
      </div>

      <div className="page-section" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "70ch" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{t.directHeading}</span>
          {contactRows.map((row) => (
            <a key={row.label} href={row.href} style={{ display: "flex", flexDirection: "column", gap: 2, minHeight: 48, justifyContent: "center", textDecoration: "none" }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{row.label}</span>
              <span style={{ fontSize: "var(--step-lead-en)", lineHeight: 1.5, color: "var(--color-text-brand)", fontWeight: 600 }}>{row.value}</span>
            </a>
          ))}
          <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{t.hoursNote}</div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", padding: "var(--space-sm) var(--space-md)", borderLeft: "3px solid var(--color-border-brand)", background: "var(--color-surface-sunken)" }}>
            {dict.home.contactTeaser.emergencyNote}
          </p>
        </div>
      </div>
    </div>
  );
}
