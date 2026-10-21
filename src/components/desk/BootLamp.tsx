/**
 * The desk's loading screen: a little lamp that switches itself on.
 * The arm swings up into place, the bulb flickers on, and a cone of warm light spills onto the desk.
 * Pure SVG + CSS (see .boot-lamp in globals.css), so it plays while the 3D scene is still loading.
 */
export default function BootLamp() {
  return (
    <svg className="boot-lamp" viewBox="0 0 220 190" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="boot-lamp-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe3a3" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffcf7a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="boot-lamp-pool">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffcf7a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the light: a pool on the desk and the beam above it */}
      <ellipse className="bl-pool" cx="170" cy="165" rx="50" ry="11" fill="url(#boot-lamp-pool)" />
      <path className="bl-beam" d="M121 96 L172 69 L210 150 L210 164 L134 164 Z" fill="url(#boot-lamp-beam)" />

      {/* desk top */}
      <rect x="14" y="164" width="192" height="14" rx="7" fill="#b97d4f" stroke="#1b1726" strokeWidth="4" />

      {/* the lamp: base, then the arm and shade, which swing up together */}
      <ellipse cx="62" cy="161" rx="26" ry="7" fill="#4e7a3d" stroke="#1b1726" strokeWidth="4" />
      <g className="bl-arm">
        <g strokeLinecap="round" fill="none">
          <path d="M62 158 L80 96 L130 74" stroke="#1b1726" strokeWidth="13" />
          <path d="M62 158 L80 96 L130 74" stroke="#545b78" strokeWidth="6" />
        </g>
        <circle cx="80" cy="96" r="8" fill="#4e7a3d" stroke="#1b1726" strokeWidth="4" />
        {/* shade, opening down and to the right */}
        <g transform="rotate(-28 140 70)">
          <path d="M126 52 L154 52 L170 84 L110 84 Z" fill="#4e7a3d" stroke="#1b1726" strokeWidth="4" strokeLinejoin="round" />
          <circle className="bl-bulb" cx="140" cy="86" r="9" stroke="#1b1726" strokeWidth="3" />
        </g>
      </g>
    </svg>
  );
}
