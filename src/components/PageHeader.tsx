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
}) {
  return (
    <header className="container-page pb-12 pt-16 md:pb-16 md:pt-24">
      <Reveal>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </header>
  );
}
