"use client";

export default function FloatingOrbs({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Primary violet orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
          background: "radial-gradient(closest-side, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.1) 40%, transparent 100%)",
          top: "-10%",
          right: "-5%",
          animation: "float-1 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Secondary cyan orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: "30vw",
          height: "30vw",
          maxWidth: "450px",
          maxHeight: "450px",
          background: "radial-gradient(closest-side, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 40%, transparent 100%)",
          bottom: "10%",
          left: "-5%",
          animation: "float-2 25s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Small accent orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: "20vw",
          height: "20vw",
          maxWidth: "300px",
          maxHeight: "300px",
          background: "radial-gradient(closest-side, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 100%)",
          top: "50%",
          left: "40%",
          animation: "float-3 30s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 40px) scale(1.05); }
          66% { transform: translate(20px, -20px) scale(0.95); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.08); }
          66% { transform: translate(-20px, 30px) scale(0.92); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -40px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
