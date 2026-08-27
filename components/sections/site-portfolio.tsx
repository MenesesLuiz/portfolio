"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { portfolioSites } from "@/content/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { SpecialText } from "@/components/ui/special-text";

export function SitePortfolio() {
  return (
    <section id="trabalhos" className="section-rule">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] md:text-5xl">
            <SpecialText inView speed={16} className="font-sans font-semibold">
              Sites desenvolvidos
            </SpecialText>
          </h2>
        </Reveal>

        {portfolioSites.length === 0 ? (
          <Reveal delay={0.08} className="mt-10 flex items-center gap-2 text-sm text-[var(--muted)]">
            Seleção de sites em preparação.
            <ArrowUpRight size={17} aria-hidden="true" />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
