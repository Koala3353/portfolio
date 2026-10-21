import { MARK_SVG, MARK_SVG_SMALL } from "./markSvg";

/** The site mark (inked K on a night tile), inline. Small sizes use the simplified drawing. */
export default function BrandMark({ className, small = true }: { className?: string; small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`brand-mark ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: small ? MARK_SVG_SMALL : MARK_SVG }}
    />
  );
}
