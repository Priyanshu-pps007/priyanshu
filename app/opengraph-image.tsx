import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = siteConfig.ogImageAlt;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const roleHighlights = ["AI Engineer", "Backend Engineer", "FastAPI Developer", "Python Developer"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 20% 18%, rgba(145, 242, 255, 0.22), transparent 26%), radial-gradient(circle at 82% 16%, rgba(199, 242, 132, 0.18), transparent 22%), linear-gradient(180deg, #0b1322 0%, #09101d 52%, #070d17 100%)",
          color: "#f5f7fb",
          padding: "58px 64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.14,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 36,
            padding: "42px 44px",
            background: "rgba(7, 13, 24, 0.72)",
            boxShadow: "0 28px 90px rgba(1, 6, 18, 0.38)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                color: "#c7f284",
                fontSize: 24,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span>Priyanshu Pratap Singh</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                maxWidth: 760,
              }}
            >
              <div
                style={{
                  fontSize: 76,
                  lineHeight: 0.96,
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                AI systems and backend engineering built for production.
              </div>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.45,
                  color: "#dce6f2",
                }}
              >
                {siteConfig.description}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {roleHighlights.map((role) => (
              <div
                key={role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#eff5fb",
                  fontSize: 22,
                }}
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
