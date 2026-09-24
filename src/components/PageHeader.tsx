import Reveal from "./Reveal";
import Parallax from "./art/Parallax";
import Contours from "./art/Contours";

/** Standard top-of-page header used by every interior page, over a drifting contour field. */
export default function PageHeader({
  title,
  intro,
  children,
  seed = 1,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  /** Varies the contour terrain so each page looks different. */
  seed?: number;
}) {
  return (
    <header className="relative isolate overflow-hidden">
      <Parallax speed={120} className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[130%]">
        <Contours seed={seed} className="h-full w-full" />
      </Parallax>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-bg" />
      <div className="container-page pb-12 pt-16 md:pb-16 md:pt-24">
        <Reveal>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
          {intro && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </header>
  );
}
