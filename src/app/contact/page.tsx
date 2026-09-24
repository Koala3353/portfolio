import type { Metadata } from "next";
import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import CopyEmailButton from "@/components/contact/CopyEmailButton";
import { contactChannels, contactIntro } from "@/data/contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Keene Xander Brigado about internships, projects, or collaboration.",
};

const icons = { email: EnvelopeSimple, linkedin: LinkedinLogo, github: GithubLogo };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Get in touch" intro={contactIntro} />
      <section aria-labelledby="channels-heading" className="container-page pb-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <Reveal>
            <h2 id="channels-heading" className="text-xl font-semibold">
              Direct channels
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {contactChannels.map((c) => {
                const Icon = icons[c.id];
                return (
                  <li key={c.id} className="flex items-center gap-4 py-4">
                    <Icon size={22} className="shrink-0 text-muted" aria-hidden />
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex min-w-0 flex-1 flex-col"
                    >
                      <span className="font-mono text-sm text-subtle">{c.label}</span>
                      <span className="flex items-center gap-1.5 truncate text-fg transition-colors group-hover:text-accent">
                        {c.display}
                        <ArrowUpRight
                          size={14}
                          aria-hidden
                          className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
                    {c.id === "email" && <CopyEmailButton email={site.email} />}
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
