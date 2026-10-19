import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — Informatics student, AI & software builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Embed the profile photo as a data URL so the image renders at build time.
  const photo = siteConfig.avatar
    ? `data:image/png;base64,${await readFile(join(process.cwd(), "public", siteConfig.avatar.src), "base64")}`
    : null;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#2c929c", padding: 56, fontFamily: "sans-serif" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 48,
            background: "#fff5e6",
            border: "5px solid #202735",
            borderRadius: 28,
            boxShadow: "12px 12px 0 #202735",
            padding: 48,
          }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700, color: "#202735" }}>
              <div style={{ display: "flex", background: "#f6b832", border: "4px solid #202735", borderRadius: 14, padding: "6px 16px" }}>
                {siteConfig.brand}
              </div>
              <span>{siteConfig.title}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", color: "#202735" }}>
              <span style={{ fontSize: 68, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{siteConfig.name}</span>
              <span style={{ fontSize: 34, marginTop: 18, color: "#3b4354", lineHeight: 1.25 }}>I build things to see how far an idea can go.</span>
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#3b4354" }}>
              {siteConfig.tagline} · {siteConfig.institution}
            </div>
          </div>
          {photo && (
            <img
              src={photo}
              alt=""
              width={360}
              height={360}
              style={{ borderRadius: 24, border: "5px solid #202735", boxShadow: "10px 10px 0 #f6b832", objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    ),
    size,
  );
}
