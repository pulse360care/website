export function Faq({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: { q: string; a: string }[];
}) {
  return (
    <div className="page-section" style={{ background: "var(--color-surface-sunken)", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "76ch" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{heading}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "var(--space-md)" }}>
          {items.map((item) => (
            <div key={item.q} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", padding: "var(--space-md)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)" }}>
              <h3 style={{ margin: 0, fontSize: "var(--step-lead-en)", lineHeight: 1.4, fontWeight: 600 }}>{item.q}</h3>
              <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-secondary)" }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
