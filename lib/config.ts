/**
 * Content-config flags. These drive structural rendering decisions (which
 * layout, which copy variant) rather than being simple feature toggles —
 * see docs/design/project/design_handoff_pulse_website/README.md, "Service
 * row — count-driven grid".
 */

/**
 * MKT-06 §5: doctor consultation must not be advertised publicly until
 * verified doctors exist on the platform and legal review of doctor
 * advertising is complete. Flipped to true per CHANGES-2026-09-30 #14 —
 * the owner's confirmation of MKT-06 §5 is still pending in writing;
 * flip this back to false if that confirmation doesn't land.
 *
 * When true, the doctor consultation service line appears everywhere it
 * belongs (service row, "how it works" step 4, contact form chips,
 * professionals role list, hero copy). When false, it is removed — never
 * disabled or greyed out — from all of those places.
 */
export const doctorLive = true;

/**
 * Hides the header's EN/தமிழ் language toggle (CHANGES-2026-09-30 #15).
 * `/ta` routes and strings stay in the build either way — this only keeps
 * them off the sitemap and marks them `noindex` (see app/sitemap.ts and
 * app/[locale]/layout.tsx's generateMetadata) until a native speaker has
 * reviewed lib/i18n/ta.ts and this flips to true.
 */
export const tamilLive = false;

/**
 * The founders section requires real photographs and real names (WEB-D02).
 * Both are supplied now (Sidhu, Prem — see public/images/panels/panel-founder-*.jpg
 * and lib/i18n/en.ts `home.founders.people`); bios are still placeholder text,
 * pending the founders' own words.
 */
export const foundersVisible = true;

/**
 * Primary CTA destination (CHANGES-2026-09-30 #8). The design's earlier
 * waitlist / app-store / launching-soon comparison is resolved: both the
 * hero and the CTA band link straight to the contact form.
 */
export const primaryCtaPath = "/contact";
