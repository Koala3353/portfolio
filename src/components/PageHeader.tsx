import Reveal from "./Reveal";

/** Standard top-of-page header used by every interior page. */
export default function PageHeader({
  title,
  intro,
  children,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  /** Kept so existing pages compile; no longer used. */
  seed?: number;
}) {
  return (
    <header className="container-page pb-10 pt-12 md:pb-12 md:pt-20">
      <Reveal>
        <h1 className="max-w-3xl text-4xl leading-[1.05] md:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
      <div className="mt-10 h-px bg-line md:mt-12" />
    </header>
  );
}
