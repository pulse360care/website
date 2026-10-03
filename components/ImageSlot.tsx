/**
 * Reserved image slot. Ratio is load-bearing (it reserves the space a real
 * photograph will occupy so layout doesn't jump when one lands). `label` is
 * the short category tag shown top-left on the placeholder; `brief` is the
 * shot description an art director would actually be handed — it must never
 * render as visible page copy (CHANGES-2026-09-30 #1), only as `alt`/`title`.
 *
 * With `src`: renders the interim brand graphic panel (see docs/design —
 * "Imagery, interim brand graphic panels") as a real `<img>`, `object-fit:
 * cover`. These are placeholders with intent, not final art — retire them
 * for real photography per-slot, not by reverting to `src`-less mode.
 *
 * Without `src`: falls back to the neutral dashed-border placeholder, never
 * stock imagery — used where no panel exists yet.
 */
export function ImageSlot({
  ratio,
  label,
  brief,
  minHeight,
  src,
}: {
  ratio: `${number}/${number}`;
  label: string;
  brief: string;
  minHeight?: number;
  src?: string;
}) {
  if (src) {
    return (
      <figure
        style={{
          margin: 0,
          aspectRatio: ratio,
          minHeight,
          width: "100%",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-ratio interim graphic panel, not a photograph needing next/image optimisation */}
        <img src={src} alt={brief} title={brief} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </figure>
    );
  }

  return (
    <div
      title={brief}
      style={{
        aspectRatio: ratio,
        minHeight,
        width: "100%",
        background: "var(--color-surface-sunken)",
        border: "1px dashed var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "var(--space-sm)",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".08em",
          color: "var(--color-text-tertiary)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
