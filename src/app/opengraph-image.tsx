import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — Informatics student, AI & software builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#2c929c",
          padding: 56,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#fff5e6",
            border: "5px solid #202735",
            borderRadius: 28,
            boxShadow: "12px 12px 0 #202735",
            padding: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700, color: "#202735" }}>
            <div style={{ display: "flex", background: "#f6b832", border: "4px solid #202735", borderRadius: 14, padding: "6px 16px" }}>
              {siteConfig.brand}
            </div>
            <span>{siteConfig.title}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, color: "#202735", lineHeight: 1, letterSpacing: -3 }}>
            <span>I build things to see how far</span>
            <span>an idea can go.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#3b4354" }}>
            {siteConfig.name} · {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
