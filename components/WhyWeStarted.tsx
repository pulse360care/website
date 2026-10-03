export function WhyWeStarted({ eyebrow, body, signature }: { eyebrow: string; body: string; signature: string }) {
  return (
    <div className="page-section" style={{ background: "var(--color-surface-inverse)", color: "var(--color-text-inverse)" }}>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "70ch" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-400)" }}>{eyebrow}</span>
          <span aria-hidden="true" style={{ fontSize: 48, lineHeight: 1, fontWeight: 700, color: "var(--blue-400)" }}>
            &ldquo;
          </span>
          <p style={{ margin: 0, fontSize: "var(--step-lead-en)", lineHeight: "var(--leading-lead-en)" }}>{body}</p>
          <p style={{ margin: 0, fontSize: 13, color: "var(--ink-400)" }}>{signature}</p>
        </div>
      </div>
    </div>
  );
}
