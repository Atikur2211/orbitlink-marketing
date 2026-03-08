// src/app/network/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const alt = "Orbitlink — Network Posture & Operations";
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
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 82%, rgba(56,253,254,0.10), transparent 28%), radial-gradient(circle at 78% 26%, rgba(59,130,246,0.12), transparent 24%), linear-gradient(180deg, #0B0F14 0%, #09090B 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "56px 64px",
        }}
      >
        {/* soft grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* top glow line */}
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 118,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(56,253,254,0.0) 8%, rgba(56,253,254,0.30) 35%, rgba(59,130,246,0.18) 65%, transparent 100%)",
          }}
        />

        {/* content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Orbitlink
            </div>

            <div
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.56)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Operator-grade network posture
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 940,
            }}
          >
            <div
              style={{
                fontSize: 70,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-0.055em",
              }}
            >
              Network Posture &amp; Operations
            </div>

            <div
              style={{
                fontSize: 28,
                lineHeight: 1.3,
                color: "rgba(255,255,255,0.68)",
                fontWeight: 500,
                maxWidth: 900,
              }}
            >
              Telemetry, routing discipline, controlled rollout, and predictable
              escalation
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.10)",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 18,
              color: "rgba(255,255,255,0.60)",
            }}
          >
            <div>Infrastructure-grade operational surface</div>
            <div style={{ color: "#38FDFE", fontWeight: 600 }}>orbitlink.ca</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}