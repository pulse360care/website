export function AboutStrip({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="page-section">
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
        <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "34ch" }}>{title}</h2>
        <p style={{ margin: 0, fontSize: "var(--step-lead-en)", lineHeight: "var(--leading-lead-en)", maxWidth: "62ch", color: "var(--color-text-secondary)" }}>{lead}</p>
      </div>
    </div>
  );
}
