/* Concentric orbit rings with satellites; paired with <Parallax rotate> for scroll-driven spin. */
export default function Orbit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" className={className} aria-hidden="true">
      <circle cx="200" cy="200" r="190" className="stroke-line" />
      <circle cx="200" cy="200" r="140" className="stroke-line" strokeDasharray="3 9" strokeLinecap="round" />
      <circle cx="200" cy="200" r="90" className="stroke-line" />
      <circle cx="200" cy="200" r="36" className="fill-surface stroke-line" />
      <circle cx="200" cy="10" r="6" className="fill-accent" />
      <circle cx="340" cy="200" r="4" className="fill-subtle" />
      <circle cx="136" cy="264" r="4" className="fill-subtle" />
      <path d="M186 200 H214 M200 186 V214" className="stroke-accent" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
