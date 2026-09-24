"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Copy,
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  MagnifyingGlass,
  CircleHalf,
} from "@phosphor-icons/react";
import { primaryNav, secondaryNav, site } from "@/lib/site";
import { useTheme } from "./theme";

type Item = { id: string; label: string; group: string; icon: React.ReactNode; run: () => void };

export default function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { pref, cycle } = useTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => {
      router.push(href);
      onClose();
    };
    const pages = [{ href: "/", label: "Home" }, ...primaryNav, ...secondaryNav].map((l) => ({
      id: l.href,
      label: l.label,
      group: "Pages",
      icon: <ArrowRight size={16} />,
      run: go(l.href),
    }));
    return [
      ...pages,
      {
        id: "copy-email",
        label: copied ? "Email copied" : `Copy email (${site.email})`,
        group: "Actions",
        icon: <Copy size={16} />,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(() => setCopied(true));
        },
      },
      {
        id: "resume",
        label: "Download résumé",
        group: "Actions",
        icon: <DownloadSimple size={16} />,
        run: () => {
          window.open(site.resume, "_blank", "noopener");
          onClose();
        },
      },
      {
        id: "theme",
        label: `Theme: ${pref} (switch)`,
        group: "Actions",
        icon: <CircleHalf size={16} />,
        run: cycle,
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "Links",
        icon: <GithubLogo size={16} />,
        run: () => window.open(site.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Links",
        icon: <LinkedinLogo size={16} />,
        run: () => window.open(site.linkedin, "_blank", "noopener"),
      },
    ];
  }, [router, onClose, pref, cycle, copied]);

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        setQuery("");
        setActive(0);
        setCopied(false);
        onClose();
      }}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="m-auto mt-[12vh] w-[min(36rem,calc(100%-2rem))] rounded-2xl border border-line bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      aria-label="Command menu"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <MagnifyingGlass size={18} className="text-subtle" aria-hidden />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search pages and actions"
          aria-label="Search pages and actions"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
          className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-subtle"
        />
        <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-xs text-subtle">esc</kbd>
      </div>
      <ul id="cmd-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {filtered.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-muted">
            Nothing matches &ldquo;{query}&rdquo;. Try &ldquo;projects&rdquo; or &ldquo;email&rdquo;.
          </li>
        )}
        {filtered.map((item, i) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          return (
            <li key={item.id} role="presentation">
              {header && <p className="px-3 pb-1 pt-3 text-xs font-medium text-subtle">{header}</p>}
              <button
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={item.run}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  i === active ? "bg-surface-2 text-fg" : "text-muted"
                }`}
              >
                <span className={i === active ? "text-accent" : ""}>{item.icon}</span>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
