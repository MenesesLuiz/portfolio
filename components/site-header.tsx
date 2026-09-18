"use client";

import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { KineticText } from "@/components/motion/kinetic-text";

const links = [{ href: "#inicio", label: "Home" }, { href: "#projetos", label: "Projetos" }, { href: "#educacao", label: "Educação" }, { href: "#sobre", label: "Sobre" }, { href: "#contato", label: "Contato" }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(10,10,10,.92)] backdrop-blur-md">
      <div>
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#inicio" className="font-mono text-xs font-bold tracking-[.08em]">
            <KineticText text="MENESESLUIZ.DEV" />
          </a>

          <nav className="hidden items-center gap-7 text-xs font-semibold text-[var(--muted)] md:flex" aria-label="Navegação principal">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--foreground)] focus-visible:text-[var(--foreground)]"
              >
                <KineticText text={link.label} />
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="grid size-10 place-items-center border border-[var(--line)] text-[var(--foreground)] transition-colors hover:border-[var(--foreground)] active:scale-[0.98] md:hidden"
            aria-label={open ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        {open ? (
          <nav className="shell grid border-t border-[var(--line)] bg-[var(--ink)] py-3 md:hidden" aria-label="Navegação móvel">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-[var(--line)] py-3 text-sm text-[var(--muted)] last:border-b-0 hover:text-[var(--foreground)]"
                onClick={() => setOpen(false)}
              >
                <KineticText text={link.label} />
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
