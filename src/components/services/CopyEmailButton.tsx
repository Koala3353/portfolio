"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={copy} className="btn btn-secondary">
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      <span>{copied ? "Copied" : "Copy email"}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
