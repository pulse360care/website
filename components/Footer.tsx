import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";
import { contactDetails } from "@/lib/contact";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const pages = [
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/technology-and-trust`, label: dict.nav.techTrust },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/for-professionals`, label: dict.nav.professionals },
    { href: `${base}/for-hospitals`, label: dict.nav.hospitals },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];
  // CHANGES-2026-10-03 #4: WhatsApp only, until Instagram/YouTube accounts
  // exist — dict.footer.social is a single-item list for the same reason.
  const social = [{ label: dict.footer.social[0], href: contactDetails.whatsappHref }];
  const contactLinks = [
    { label: contactDetails.phone, href: contactDetails.phoneHref },
    { label: contactDetails.email, href: contactDetails.emailHref },
    { label: dict.footer.localityLink, href: `${base}/contact` },
  ];

  return (
    <footer
      style={{
        background: "var(--color-surface-inverse)",
        color: "var(--color-text-inverse)",
        padding: "var(--space-xl) var(--space-md) var(--space-2xl)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{dict.nav.brand}</div>
        <p style={{ margin: "var(--space-xs) 0 var(--space-lg)", fontSize: 15, opacity: 0.92, maxWidth: "60ch" }}>
          {dict.footer.blurb}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "var(--space-md)", maxWidth: 720 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: locale === "en" ? ".06em" : undefined, opacity: 0.7 }}>
              {dict.footer.pagesHeading}
            </div>
            {pages.map((p) => (
              <Link key={p.href} href={p.href} style={{ fontSize: 15, minHeight: 24, color: "var(--color-text-inverse)" }}>
                {p.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: locale === "en" ? ".06em" : undefined, opacity: 0.7 }}>
              {dict.footer.elsewhereHeading}
            </div>
            {social.map((s) => (
              <a key={s.label} href={s.href} style={{ fontSize: 15, minHeight: 24, color: "var(--color-text-inverse)" }}>
                {s.label}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: locale === "en" ? ".06em" : undefined, opacity: 0.7 }}>
              {dict.footer.contactHeading}
            </div>
            {contactLinks.map((c) => (
              <a key={c.label} href={c.href} style={{ fontSize: 15, minHeight: 24, color: "var(--color-text-inverse)" }}>
                {c.label}
              </a>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "var(--space-lg)",
            paddingTop: "var(--space-md)",
            borderTop: "1px solid rgba(255,255,255,.24)",
            fontSize: 13,
            opacity: 0.85,
            display: "flex",
            gap: "var(--space-sm)",
            flexWrap: "wrap",
          }}
        >
          <span>{dict.footer.legal}</span>
          <span>·</span>
          <span style={{ textDecoration: "underline" }}>{dict.footer.privacy}</span>
          <span>·</span>
          <span style={{ textDecoration: "underline" }}>{dict.footer.terms}</span>
        </div>
      </div>
    </footer>
  );
}
