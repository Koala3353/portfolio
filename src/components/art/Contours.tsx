/*
  Topographic contour field, generated deterministically at build time.
  Each line is a sum of sines sampled across the width; `seed` varies the terrain per page.
*/

function contourPath(i: number, seed: number, w: number, h: number) {
  const base = (h / 14) * (i + 1);
  const pts: string[] = [];
  for (let x = 0; x <= w; x += 20) {
    const y =
      base +
      Math.sin(x / 140 + i * 0.55 + seed) * 22 +
      Math.sin(x / 57 + seed * 2.1 + i * 0.25) * 7 +
      Math.cos(x / 310 + i * 0.3) * 14;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export default function Contours({ seed = 1, className }: { seed?: number; className?: string }) {
  const w = 1200;
  const h = 420;
  const lines = Array.from({ length: 13 }, (_, i) => contourPath(i, seed, w, h));
  const accentLine = 6;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`ct-fade-${seed}`} x1="0" x2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.35" stopColor="white" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <mask id={`ct-mask-${seed}`}>
          <rect width={w} height={h} fill={`url(#ct-fade-${seed})`} />
        </mask>
      </defs>
      <g mask={`url(#ct-mask-${seed})`} strokeWidth="1" vectorEffect="non-scaling-stroke">
        {lines.map((d, i) => (
          <path
            key={i}
            d={d}
            className={i === accentLine ? "stroke-accent" : "stroke-line"}
            opacity={i === accentLine ? 0.6 : 1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
