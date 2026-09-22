import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #12362c 0%, #1f6b54 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 8.7 12.45 23.1 15.55 12.6"
                stroke="#ffffff"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.45 12.6 19.55 23.1 24 8.7"
                stroke="#ffffff"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", maxWidth: 760 }}>
            Convert published travel currencies and plan a trip with indicative rates.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
