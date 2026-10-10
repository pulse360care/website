import { DeliveryModePill } from "./DeliveryModePill";
import { ImageSlot } from "./ImageSlot";

interface ServiceItem {
  pill: string;
  title: string;
  body: string;
  brief: string;
  brandPill?: boolean;
}

/**
 * CHANGES-2026-10-10 #2: desktop (≥1280px) is an explicit 3+2 layout on a
 * 6-column grid — top row spans 2 cols each (4:3 images), bottom row spans
 * 3 cols each (16:9 images), formula straight from v4.dc.html (`svcTop =
 * services.length === 5 ? 3 : 2`). Below that, `.service-grid`'s own media
 * queries (app/globals.css) fall back to auto-fit/240px (tablet) and a
 * single column (mobile) — see that file for the three-tier breakpoints.
 */
export function ServiceRow({ heading, sub, items }: { heading: string; sub: string; items: ServiceItem[] }) {
  const svcTop = items.length === 5 ? 3 : 2;

  return (
    <div className="page-section">
      <div className="container">
        <h2 style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
          {heading}
        </h2>
        <p style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{sub}</p>
        <div className="service-grid" data-top-count={svcTop}>
          {items.map((item, i) => {
            const top = i < svcTop;
            return (
              <div
                key={item.title}
                className="service-card"
                data-row={top ? "top" : "bottom"}
                style={{
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-md)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-xs)",
                  overflowWrap: "break-word",
                }}
              >
                {/* Keyed by card position (svc-{index}), per the design bundle's
                    own convention — the doctor slot shifts which panel lands
                    where when doctorLive flips, matching the design intent. */}
                <ImageSlot ratio={top ? "4/3" : "16/9"} label="PHOTO" brief={item.brief} src={`/images/panels/panel-svc-${i}.png`} />
                <DeliveryModePill label={item.pill} brand={Boolean(item.brandPill)} />
                <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>
                  {item.title}
                </div>
                <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
