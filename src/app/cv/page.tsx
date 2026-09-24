import type { Metadata } from "next";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "View or download Keene Xander Brigado's full résumé: management engineering, full-stack development, and operations.",
};

export default function CVPage() {
  return (
    <>
      <PageHeader seed={9} title="Résumé" intro="The full one-page résumé. Download it or open it in a new tab.">
        <div className="flex flex-wrap gap-3">
          <a href={site.resume} download className="btn btn-primary">
            <DownloadSimple size={18} aria-hidden />
            Download résumé
          </a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Open in new tab
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </PageHeader>
      <section aria-label="Résumé preview" className="container-page pb-24">
        <div className="surface overflow-hidden p-1.5">
          <object
            data={site.resume}
            type="application/pdf"
            aria-label={`${site.name} résumé (PDF)`}
            className="block h-[80dvh] min-h-[480px] w-full rounded-xl bg-surface-2"
          >
            <div className="flex h-full flex-col items-start justify-center gap-4 p-8">
              <p className="max-w-[50ch] leading-relaxed text-muted">
                Your browser can&apos;t display the PDF here.
              </p>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="link-underline text-accent">
                Open the résumé PDF
              </a>
            </div>
          </object>
        </div>
      </section>
    </>
  );
}
