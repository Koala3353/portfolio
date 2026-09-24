import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import SnakeGame from "@/components/SnakeGame";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[80dvh] flex-col items-center gap-12 py-16 md:py-24">
      <header className="text-center">
        <p className="font-mono text-sm text-subtle">404</p>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mx-auto mt-4 max-w-[50ch] leading-relaxed text-muted">
          The link may be old or mistyped. Head back home, or play a round of snake while you&apos;re here.
        </p>
        <Link href="/" className="btn btn-secondary mt-8">
          <ArrowLeft size={16} aria-hidden />
          Back to home
        </Link>
      </header>
      <section aria-label="Snake game" className="w-full max-w-[440px]">
        <SnakeGame />
      </section>
    </div>
  );
}
