import type { Metadata } from "next";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Download or view Keene Xander Brigado's full résumé — management engineering, full-stack development, and operations.",
};

export default function CVPage() {
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";
  const pdfPath = `${basePath}/resume.pdf`;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-grow">
        
        {/* PDF Embed (Browser Built-in Preview) */}
        <div className="flex-grow w-full h-[75vh] md:h-[85vh] glass-card rounded-xl p-1 md:p-2 mb-8 shadow-2xl">
          <iframe
            src={pdfPath}
            className="w-full h-full rounded-lg border border-white/5"
            title="Keene Xander Brigado — Résumé"
          />
        </div>

        {/* Action Bar (Afterwards) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-muted">
            Viewing via built-in browser preview.
          </p>
          <a
            href={pdfPath}
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors shadow-lg glow-accent"
          >
            <Download className="w-4 h-4" />
            Download Résumé
          </a>
        </div>

      </div>
    </div>
  );
}
