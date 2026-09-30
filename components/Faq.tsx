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
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", maxWidth: "76ch" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{heading}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
          {items.map((item) => (
            <details key={item.q} style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)" }}>
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-md)",
                  minHeight: "var(--size-target-min)",
                  padding: "var(--space-sm) var(--space-md)",
                  fontSize: "var(--step-lead-en)",
                  fontWeight: 600,
                }}
              >
                {item.q}
                <span aria-hidden="true" style={{ color: "var(--color-text-brand)", fontWeight: 700, fontSize: 20, flex: "none" }}>
                  +
                </span>
              </summary>
              <p style={{ margin: 0, padding: "0 var(--space-md) var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-secondary)" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
