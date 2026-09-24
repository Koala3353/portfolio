"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-fg"
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
