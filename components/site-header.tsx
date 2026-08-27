"use client";

import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#projetos", label: "Projetos" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--surface)]">
      <div>
        <div className="shell flex h-16 items-center justify-between gap-6">
          <a href="#sobre" className="text-sm font-bold tracking-[0.02em]">
            PORTFOLIO
          </a>

          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex" aria-label="Navegação principal">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--foreground)] focus-visible:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="grid size-10 place-items-center border border-[var(--line)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.98] md:hidden"
            aria-label={open ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        {open ? (
          <nav className="shell grid border-t border-[var(--line)] bg-[var(--surface)] py-4 md:hidden" aria-label="Navegação móvel">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-[var(--line)] py-3 text-sm text-[var(--muted)] last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
