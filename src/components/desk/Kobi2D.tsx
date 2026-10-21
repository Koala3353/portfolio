/**
 * Kobi, drawn flat: the same koala as the 3D desk, for the regular home and small spots.
 * "peek" adds paws resting on an edge; "face" is just the head.
 */
export default function Kobi2D({ variant = "face", className }: { variant?: "face" | "peek"; className?: string }) {
  const peek = variant === "peek";
  return (
    <svg
      viewBox={peek ? "0 0 200 170" : "0 0 200 150"}
      className={`kobi2d ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <g className="kobi2d-head">
        {/* ears */}
        <circle cx="42" cy="58" r="36" fill="#9ea3b0" />
        <circle cx="158" cy="58" r="36" fill="#9ea3b0" />
        <circle cx="44" cy="60" r="22" fill="#e8a6b4" />
        <circle cx="156" cy="60" r="22" fill="#e8a6b4" />
        {/* head */}
        <ellipse cx="100" cy="88" rx="64" ry="58" fill="#9ea3b0" />
        <ellipse cx="100" cy="104" rx="40" ry="30" fill="#d9dbe2" opacity="0.55" />
        {/* eyes */}
        <g className="kobi2d-eyes">
          <circle cx="74" cy="80" r="8" fill="#20222b" />
          <circle cx="126" cy="80" r="8" fill="#20222b" />
          <circle cx="77" cy="77" r="2.6" fill="#fff" />
          <circle cx="129" cy="77" r="2.6" fill="#fff" />
        </g>
        {/* nose */}
        <ellipse cx="100" cy="98" rx="17" ry="21" fill="#20222b" />
        <ellipse cx="94" cy="90" rx="5" ry="4" fill="#fff" opacity="0.25" />
        {/* cheeks */}
        <ellipse cx="62" cy="104" rx="10" ry="6" fill="#e8a6b4" opacity="0.75" />
        <ellipse cx="138" cy="104" rx="10" ry="6" fill="#e8a6b4" opacity="0.75" />
      </g>
      {peek ? (
        <g>
          <ellipse cx="62" cy="150" rx="22" ry="14" fill="#9ea3b0" />
          <ellipse cx="138" cy="150" rx="22" ry="14" fill="#9ea3b0" />
          <path d="M52 148v6M60 147v7M68 148v6M128 148v6M136 147v7M144 148v6" stroke="#6f7484" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}
