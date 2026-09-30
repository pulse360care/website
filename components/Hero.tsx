import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";
import { primaryCtaPath } from "@/lib/config";
import { ImageSlot } from "./ImageSlot";

/**
 * Headline lines rise from clipped containers on mount (pure CSS, no JS —
 * `animation ... both` holds the pre-animation state until it starts, and
 * `@media (prefers-reduced-motion)` in globals.css collapses every duration
 * to ~0 site-wide). Runs once on load, never on scroll.
 */
export function Hero({ locale, dict, lines, lead }: { locale: Locale; dict: Dictionary; lines: string[]; lead: string }) {
  const isTamil = locale === "ta";
  const home = dict.home;

  return (
    <div className="page-section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="two-col" style={{ alignItems: "end" }}>
          <div>
            <span style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: "var(--space-md)" }}>
              {home.hero.eyebrow}
            </span>
            {lines.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: isTamil ? "var(--step-display-ta)" : "var(--step-display-en)",
                    lineHeight: isTamil ? "var(--leading-display-ta)" : "var(--leading-display-en)",
                    fontWeight: 700,
                    letterSpacing: isTamil ? undefined : "-0.01em",
                    animation: `pulseRise var(--motion-duration-slow) var(--motion-ease-standard) ${i * 90}ms both`,
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
            <p
              style={{
                margin: "var(--space-md) 0 0",
                fontSize: "var(--step-lead-en)",
                lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)",
                textWrap: "pretty",
                maxWidth: "46ch",
                color: "var(--color-text-secondary)",
                animation: "pulseFade var(--motion-duration-slow) var(--motion-ease-standard) 320ms both",
              }}
            >
              {lead}
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-xs)",
                minHeight: "var(--size-target-min)",
                padding: "0 var(--space-md)",
                marginTop: "var(--space-md)",
                border: "1px solid var(--color-border-brand)",
                borderRadius: "var(--radius-full)",
                background: "var(--color-surface-selected)",
                color: "var(--color-text-brand)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <span aria-hidden="true" style={{ width: 8, height: 8, minWidth: 8, borderRadius: "var(--radius-full)", background: "var(--color-surface-brand)" }} />
              {home.hero.locationPill}
            </span>
            <div
              style={{
                marginTop: "var(--space-lg)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2xs)",
                alignItems: "flex-start",
                animation: "pulseFade var(--motion-duration-slow) var(--motion-ease-standard) 420ms both",
              }}
            >
              <Link
                href={`/${locale}${primaryCtaPath}`}
                style={{
                  minHeight: 56,
                  minWidth: 220,
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
                {home.ctaLabel}
              </Link>
              <Link href={`/${locale}/contact`} style={{ fontSize: 15 }}>
                {home.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div>
            <ImageSlot ratio="3/4" label="HERO" brief={home.hero.heroBrief} minHeight={280} src="/images/panels/panel-hero.png" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-md) var(--space-lg)",
            marginTop: "var(--space-xl)",
            paddingTop: "var(--space-md)",
            paddingBottom: "var(--space-xl)",
            borderTop: "1px solid var(--color-border-subtle)",
          }}
        >
          {home.hero.heroTrust.map((item) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "flex-start", gap: "var(--space-xs)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>
              <span
                aria-hidden="true"
                style={{
                  width: 22,
                  height: 22,
                  minWidth: 22,
                  border: "1.5px solid var(--color-verified-border)",
                  borderRadius: "var(--radius-xs)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--color-verified-text)",
                }}
              >
                ✓
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
