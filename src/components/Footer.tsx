import Link from "next/link";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { primaryNav, secondaryNav, site } from "@/lib/site";

const socials = [
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
  { href: site.github, label: "GitHub", Icon: GithubLogo },
  { href: `mailto:${site.email}`, label: "Email", Icon: EnvelopeSimple },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-semibold">{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Management Engineering at Ateneo de Manila. I build automation, apps, and AI workflows for
            teams that need things to run.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer: explore">
          <p className="text-sm font-medium">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {primaryNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer: more">
          <p className="text-sm font-medium">More</p>
          <ul className="mt-4 space-y-2.5">
            {secondaryNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-page flex flex-col items-start justify-between gap-2 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>
          Press <kbd className="rounded border border-line px-1 font-mono">⌘K</kbd> to jump anywhere.
        </p>
      </div>
    </footer>
  );
}
