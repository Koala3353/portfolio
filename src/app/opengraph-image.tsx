import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Keene Xander Brigado: code, operations, and AI";
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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0b0d",
          color: "#ececee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>Keene Xander Brigado</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 600, lineHeight: 1.05, letterSpacing: -3 }}>
          <span>I build the systems</span>
          <span>
            teams run on<span style={{ color: "#f97316" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          Management Engineering, Ateneo de Manila · Code, operations, AI
        </div>
      </div>
    ),
    size
  );
}
