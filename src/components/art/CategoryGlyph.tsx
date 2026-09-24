import type { ProjectCategory } from "@/data/projects";

/*
  Line-art marks, one per project category. Stroke uses currentColor so the parent
  sets the tone; the single accent detail uses the accent token.
*/

const glyphs: Record<ProjectCategory, React.ReactNode> = {
  // Stacked browser frames
  Web: (
    <>
      <rect x="34" y="18" width="58" height="42" rx="6" opacity="0.4" />
      <rect x="26" y="30" width="58" height="42" rx="6" opacity="0.7" />
      <rect x="18" y="42" width="58" height="42" rx="6" className="fill-surface" />
      <path d="M18 52 H76" />
      <circle cx="25" cy="47" r="1.6" className="fill-accent stroke-none" />
      <path d="M28 64 H52 M28 72 H44" />
    </>
  ),
  // Node lattice with one active neuron
  AI: (
    <>
      {[
        [22, 30], [22, 70], [52, 20], [52, 50], [52, 80], [84, 50],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" className="fill-surface" />
      ))}
      <path d="M27 30 L47 20 M27 30 L47 50 M27 70 L47 50 M27 70 L47 80 M57 20 L79 50 M57 50 L79 50 M57 80 L79 50" opacity="0.6" />
      <circle cx="84" cy="50" r="5" className="fill-accent stroke-none" />
    </>
  ),
  // Conversation arcs
  Bots: (
    <>
      <path d="M20 30 a10 10 0 0 1 10 -10 h34 a10 10 0 0 1 10 10 v16 a10 10 0 0 1 -10 10 h-22 l-12 10 v-10 a10 10 0 0 1 -10 -10 z" />
      <path d="M86 50 v14 a10 10 0 0 1 -10 10 h-4 v10 l-12 -10 h-10" opacity="0.55" />
      <circle cx="36" cy="38" r="2.4" className="fill-accent stroke-none" />
      <circle cx="47" cy="38" r="2.4" className="fill-current stroke-none" opacity="0.6" />
      <circle cx="58" cy="38" r="2.4" className="fill-current stroke-none" opacity="0.35" />
    </>
  ),
  // Interlocking blocks / pipeline
  Tools: (
    <>
      <rect x="16" y="20" width="28" height="28" rx="6" />
      <rect x="60" y="20" width="28" height="28" rx="6" opacity="0.6" />
      <rect x="38" y="56" width="28" height="28" rx="6" className="fill-surface" />
      <path d="M44 34 H60 M30 48 V70 H38 M74 48 V70 H66" opacity="0.7" />
      <path d="M46 70 l4 4 l8 -8" className="stroke-accent" />
    </>
  ),
};

export default function CategoryGlyph({
  category,
  className,
}: {
  category: ProjectCategory;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 104 104"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {glyphs[category]}
    </svg>
  );
}
