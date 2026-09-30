import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import { primaryCtaPath } from "@/lib/config";
import { ImageSlot } from "./ImageSlot";

/**
 * Ghost wordmark behind the title is a reserved parallax surface
 * (data-parallax/-depth) — decorative background only, static for now.
 * See globals.css for why it isn't scroll-linked yet.
 */
export function CtaBand({
  locale,
  wordmark,
  title,
  brief,
  ctaLabel,
}: {
  locale: Locale;
  wordmark: string;
  title: string;
  brief: string;
  ctaLabel: string;
}) {
  return (
    <div className="page-section" style={{ position: "relative", overflow: "clip", background: "var(--color-surface-inverse)", color: "var(--color-text-inverse)" }}>
      <div
        aria-hidden="true"
        data-parallax="wordmark"
        data-parallax-depth="0.06"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: "none",
          userSelect: "none",
          fontSize: "clamp(44px, 9vw, 104px)",
          lineHeight: 0.92,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--ink-900)",
          whiteSpace: "nowrap",
        }}
      >
        {wordmark}
      </div>
      <div className="container" style={{ position: "relative", display: "flex", flexDirection: "column", gap: "var(--space-lg)", alignItems: "flex-start" }}>
        <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "30ch" }}>{title}</h2>
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
            background: "var(--color-surface-base)",
            color: "var(--color-text-brand)",
            fontSize: "var(--step-lead-en)",
            fontWeight: 600,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          {ctaLabel}
        </Link>
        <div style={{ width: "100%", marginTop: "var(--space-xs)" }}>
          <ImageSlot ratio="21/9" label="WIDE" brief={brief} src="/images/panels/panel-band.png" />
        </div>
      </div>
    </div>
  );
}
