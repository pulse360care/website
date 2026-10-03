"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";
import { localeLabels, otherLocale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";
import { tamilLive } from "@/lib/config";

function navItems(locale: Locale, dict: Dictionary) {
  const base = `/${locale}`;
  return [
    { href: base, label: dict.nav.home },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/technology-and-trust`, label: dict.nav.techTrust },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/for-professionals`, label: dict.nav.professionals },
    { href: `${base}/for-hospitals`, label: dict.nav.hospitals },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];
}

function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const target = otherLocale[locale];
  const rest = pathname.replace(new RegExp(`^/${locale}(/|$)`), "/");
  const href = `/${target}${rest === "/" ? "" : rest}`.replace(/\/+$/, "") || `/${target}`;

  function persist() {
    document.cookie = `NEXT_LOCALE=${target}; max-age=${60 * 60 * 24 * 365}; path=/`;
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-full)",
        overflow: "hidden",
        minHeight: "var(--size-target-min)",
        flex: "none",
      }}
      role="group"
      aria-label="Language / மொழி"
    >
      {(["en", "ta"] as const).map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={active ? pathname : href}
            onClick={active ? undefined : persist}
            lang={code}
            aria-current={active ? "true" : undefined}
            style={{
              minWidth: "var(--size-target-min)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 var(--space-sm)",
              fontSize: 15,
              fontWeight: active ? 600 : 500,
              background: active ? "var(--color-surface-selected)" : "transparent",
              color: active ? "var(--color-text-brand)" : "var(--color-text-primary)",
              textDecoration: "none",
            }}
          >
            {localeLabels[code]}
          </Link>
        );
      })}
    </span>
  );
}

/** Ring + ECG lockup, from the identity sheet's horizontal lockup at 28px —
 * currentColor so it inherits brand blue and reverses correctly on dark
 * bands; stroke-width 7 is what the identity sheet specifies at this size. */
function LogoMark() {
  return (
    <svg viewBox="0 0 64 64" width="28" height="28" fill="none" aria-hidden="true" style={{ flex: "none", display: "block" }}>
      <path d="M32 6 A26 26 0 1 1 12.5 49.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M8 32 H17 L22 21 L29 43 L34 32 H43" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HamburgerBars() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 20, height: 2, background: "var(--color-text-primary)" }} />
      ))}
    </>
  );
}

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";
  const items = navItems(locale, dict);
  const panelId = useId();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header ref={rootRef} style={{ position: "relative", zIndex: 5, background: "var(--color-surface-base)", borderBottom: "1px solid var(--color-border-subtle)" }}>
      {/*
        Three-column grid: symmetric minmax(120px,1fr) side floors are what
        centre the nav column — replacing them with flex, or adding a grid
        gap, breaks that centring. Both floors take space from the nav
        column before the nav wraps to a second row.
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(120px,1fr) auto minmax(120px,1fr)",
          alignItems: "stretch",
          gap: 0,
          minHeight: 64,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 var(--space-md)",
        }}
      >
        <div style={{ gridColumn: "1", minWidth: 0, display: "flex", alignItems: "center", padding: "var(--space-xs) 0" }}>
          <Link
            href={`/${locale}`}
            aria-label="Pulse — home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-xs)",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "var(--color-text-brand)",
              textDecoration: "none",
            }}
          >
            <LogoMark />
            <span>Pulse</span>
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="desktop-nav"
          style={{
            gridColumn: "2",
            display: "none",
            alignItems: "flex-end",
            gap: "var(--space-xs)",
            flexWrap: "wrap",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {items.slice(1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{
                  minHeight: 64,
                  display: "inline-flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  marginBottom: -1,
                  padding: "0 10px",
                  fontSize: 15,
                  textDecoration: "none",
                  color: active ? "var(--color-text-brand)" : "var(--color-text-primary)",
                  fontWeight: active ? 600 : 400,
                  borderBottom: active ? "2px solid var(--color-border-brand)" : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ gridColumn: "3", minWidth: 0, display: "flex", alignItems: "center", gap: "var(--space-xs)", justifyContent: "flex-end", padding: "var(--space-xs) 0" }}>
          {tamilLive ? <LanguageToggle locale={locale} /> : null}
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? dict.header.closeMenu : dict.header.openMenu}
            onClick={() => setOpen((v) => !v)}
            style={{
              flex: "none",
              width: "var(--size-target-min)",
              height: "var(--size-target-min)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              background: "var(--color-surface-base)",
              cursor: "pointer",
            }}
          >
            {open ? (
              <span style={{ fontSize: 20, lineHeight: 1 }} aria-hidden="true">
                ×
              </span>
            ) : (
              <HamburgerBars />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id={panelId}
          aria-label="Mobile"
          className="mobile-nav-panel"
          style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid var(--color-border-subtle)" }}
        >
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{
                  minHeight: "var(--size-target-min)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 var(--space-md)",
                  fontSize: 17,
                  color: "var(--color-text-primary)",
                  fontWeight: active ? 600 : 400,
                  textDecoration: "none",
                  borderTop: "1px solid var(--color-border-subtle)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
          .mobile-nav-panel { display: none !important; }
        }
      `}</style>
    </header>
  );
}
