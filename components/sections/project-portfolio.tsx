"use client";

import { GithubLogo } from "@phosphor-icons/react";
import { engineeringProjects } from "@/content/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { SpecialText } from "@/components/ui/special-text";

export function ProjectPortfolio() {
  return (
    <section id="projetos" className="section-rule">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.025em] md:text-5xl">
            <SpecialText inView speed={16} className="font-sans font-semibold">
            Projetos
            </SpecialText>
          </h2>
        </Reveal>

        {engineeringProjects.length === 0 ? (
          <Reveal delay={0.08} className="mt-10 flex items-center gap-2 text-sm text-[var(--muted)]">
            Repositórios selecionados serão adicionados.
            <GithubLogo size={18} aria-hidden="true" />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
