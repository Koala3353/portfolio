import { ImageResponse } from "next/og";
import { MARK_SVG } from "@/components/brand/markSvg";

export const dynamic = "force-static";
export const alt = "Keene Brigado: diagnoses how a business runs, then builds the fix. Open to tech, consulting, and FMCG internships.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 52,
          padding: "0 72px",
          color: "#f3ead8",
          fontFamily: "sans-serif",
          background:
            "radial-gradient(60% 70% at 18% 30%, rgba(255,207,122,0.22), rgba(255,207,122,0) 70%), linear-gradient(135deg, #2c3566 0%, #1b2140 100%)",
        }}
      >
        <img src={mark} width={250} height={250} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#ffcf7a" }}>KEENE&apos;S DESK · MANILA</div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            Keene Brigado
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 29, lineHeight: 1.35, color: "#d9d4e8" }}>
            <span>Diagnoses how a business runs, then builds the fix.</span>
            <span>Open to tech, consulting, and FMCG internships.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
