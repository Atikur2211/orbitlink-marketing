// src/app/locations/mississauga/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Orbitlink — Business Fibre in Mississauga";
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
            "radial-gradient(circle at top right, rgba(15,185,177,0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(56,253,254,0.14), transparent 24%), linear-gradient(180deg, #0B0F14 0%, #09090B 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            opacity: 0.14,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(15,185,177,0.18)",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -60,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(56,253,254,0.12)",
            filter: "blur(80px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "58px 64px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontSize: 26,
                fontWeight: 700,
                color: "#38FDFE",
              }}
            >
              O
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                  color: "rgba(255,255,255,0.58)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Ontario business connectivity
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 860,
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 68,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-0.05em",
              }}
            >
              Business Fibre in Mississauga
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.25,
                color: "rgba(255,255,255,0.68)",
                fontWeight: 500,
              }}
            >
              Network infrastructure for modern businesses
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.10)",
              paddingTop: 20,
              fontSize: 18,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            <div style={{ display: "flex" }}>
              Mississauga • Ontario • Enterprise-grade delivery
            </div>
            <div style={{ display: "flex", color: "#38FDFE" }}>
              orbitlink.ca
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}