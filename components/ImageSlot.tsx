import Image from "next/image";

/**
 * Reserved image slot. Ratio is load-bearing (it reserves the space a real
 * photograph will occupy so layout doesn't jump when one lands). `label` is
 * the short category tag shown top-left on the placeholder; `brief` is the
 * shot description an art director would actually be handed — it must never
 * render as visible page copy (CHANGES-2026-09-30 #1), only as `alt`/`title`.
 *
 * With `src`: real photography (CHANGES-2026-10-10 #8), served through
 * next/image (`fill`, `object-fit: cover`) — automatic WebP/AVIF, responsive
 * sizing and lazy-loading, which the source files need at 1–2MB each.
 * `priority` is for the one above-the-fold instance (the hero); everything
 * else lazy-loads by default.
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
  priority,
}: {
  ratio: `${number}/${number}`;
  label: string;
  brief: string;
  minHeight?: number;
  src?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <figure
        style={{
          position: "relative",
          margin: 0,
          aspectRatio: ratio,
          minHeight,
          width: "100%",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          alt={brief}
          title={brief}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          style={{ objectFit: "cover" }}
        />
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
