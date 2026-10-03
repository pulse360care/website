import { ImageSlot } from "./ImageSlot";

/**
 * WEB-D02: requires real photographs and real names. Both now exist
 * (Sidhu, Prem), so `foundersVisible` is on — see lib/config.ts. Keep
 * the component gated on that flag so a future founder change can hide
 * it again cleanly if needed, rather than deleting/re-adding this file.
 */
export function Founders({
  eyebrow,
  heading,
  note,
  people,
}: {
  eyebrow: string;
  heading: string;
  note: string;
  people: { name: string; role: string; bio: string; brief: string }[];
}) {
  return (
    <div className="page-section">
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{eyebrow}</span>
          <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700, maxWidth: "34ch" }}>{heading}</h2>
          <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", maxWidth: "62ch", color: "var(--color-text-secondary)" }}>{note}</p>
        </div>
        <div className="two-col">
          {people.map((person, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", padding: "var(--space-md)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)" }}>
              <ImageSlot ratio="1/1" label="PORTRAIT" brief={person.brief} src={`/images/panels/panel-founder-${i}.jpg`} />
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>{person.name}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-brand)" }}>{person.role}</div>
              <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)", color: "var(--color-text-secondary)" }}>{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
