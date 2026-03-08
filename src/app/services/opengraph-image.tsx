// src/app/services/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Orbitlink — Managed Network Infrastructure";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 64px",
          background:
            "radial-gradient(circle at top right, rgba(15,185,177,0.16), transparent 28%), linear-gradient(180deg, #0B0F14 0%, #09090B 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Orbitlink</div>
          <div
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.58)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Business network services
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              maxWidth: 900,
            }}
          >
            Managed Network Infrastructure
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.68)",
              fontWeight: 500,
            }}
          >
            Enterprise connectivity, delivery, and operational visibility
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          <div>Infrastructure-grade service stack</div>
          <div style={{ color: "#38FDFE" }}>orbitlink.ca</div>
        </div>
      </div>
    ),
    { ...size }
  );
}