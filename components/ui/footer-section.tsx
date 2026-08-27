"use client";

import { ArrowUp } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface FooterItem {
  title: string;
  href?: string;
}

interface FooterSection {
  label: string;
  items: FooterItem[];
}

const footerSections: FooterSection[] = [
  {
    label: "Navegação",
    items: [
      { title: "Sobre", href: "#sobre" },
      { title: "Certificações", href: "#certificacoes" },
      { title: "Tech Stack", href: "#stack" },
      { title: "Projetos", href: "#projetos" },
    ],
  },
  {
    label: "Contato",
    items: [{ title: "Links profissionais em breve" }],
  },
];

export function Footer() {
  return (
    <footer
      id="rodape"
      className="relative scroll-mt-16 overflow-hidden border-t border-[var(--line)]"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-28 -translate-x-1/2 bg-[var(--accent)]"
      />

      <div className="shell py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(2,minmax(10rem,0.7fr))] lg:gap-10">
          <AnimatedContainer className="max-w-md md:col-span-2 lg:col-span-1">
            <a
              href="#"
              className="inline-flex text-sm font-bold tracking-[0.02em] transition-colors hover:text-[var(--accent-text)]"
            >
              PORTFOLIO
            </a>
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              Engenharia de Software, Cybersecurity e Desenvolvimento Web.
            </p>
          </AnimatedContainer>

          {footerSections.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.08 + index * 0.08}>
              <section aria-labelledby={`footer-${section.label.toLowerCase()}`}>
                <h2
                  id={`footer-${section.label.toLowerCase()}`}
                  className="text-sm font-semibold text-[var(--foreground)]"
                >
                  {section.label}
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="inline-flex transition-colors hover:text-[var(--accent-text)]"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <span>{item.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer
          delay={0.22}
          className="mt-12 flex flex-col gap-5 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {new Date().getFullYear()} Portfolio profissional.</p>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-2 text-[var(--foreground)] transition-colors hover:text-[var(--accent-text)] active:translate-y-px"
          >
            Voltar ao topo
            <ArrowUp size={16} weight="bold" aria-hidden="true" />
          </a>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.65, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
