/**
 * Content-config flags. These drive structural rendering decisions (which
 * layout, which copy variant) rather than being simple feature toggles —
 * see docs/design/project/design_handoff_pulse_website/README.md, "Service
 * row — count-driven grid".
 */

/**
 * MKT-06 §5: doctor consultation must not be advertised publicly until
 * verified doctors exist on the platform and legal review of doctor
 * advertising is complete. The design's own default is the three-service
 * state; flip this only once that condition is actually met.
 *
 * When true, the doctor consultation service line appears everywhere it
 * belongs (service row, "how it works" step 4, contact form chips,
 * professionals role list, hero copy). When false, it is removed — never
 * disabled or greyed out — from all of those places.
 */
export const doctorLive = false;

/**
 * The founders section requires real photographs and real names (WEB-D02).
 * Neither exists yet, so the section ships removed rather than with
 * placeholder silhouettes or "team photo coming soon" — flip once content
 * is supplied.
 */
export const foundersVisible = false;

/**
 * Primary CTA destination. The design left this open as a three-way
 * comparison (waitlist / app-store / launching-soon); "waitlist" was
 * chosen for this build.
 */
export const ctaMode = "waitlist" as const;
