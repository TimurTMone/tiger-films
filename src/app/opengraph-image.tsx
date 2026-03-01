import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tiger Films — Продюсерская компания";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0c0c0f 0%, #1a1a24 50%, #0c0c0f 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(90deg, #f59e0b, #f97316)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Tiger Films
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              fontWeight: 500,
            }}
          >
            Продюсерская компания · Кино Казахстан
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
