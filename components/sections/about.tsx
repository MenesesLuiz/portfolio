import { ScrollReveal } from "@/components/motion/scroll-reveal";

const path = [
  ["2014 — 2020", "A curiosidade começou no hardware: aprender a operar, montar e entender computadores na prática."],
  ["2021 — 2024", "O contato com HTML, CSS e Python levou à programação. Em 2024, Luiz ingressou em Engenharia de Software na Universidade do Estado do Pará."],
  ["2025 — atual", "O interesse por cibersegurança direcionou a formação em Defesa Cibernética na FIAP, com foco em Cloud Security."],
];

export function About() {
  return <section id="sobre" className="section-rule scroll-mt-20" aria-labelledby="sobre-titulo"><div className="shell py-20 md:py-28"><ScrollReveal><div className="grid gap-8 md:grid-cols-12"><div className="md:col-span-5"><h2 id="sobre-titulo" className="display text-5xl font-semibold md:text-7xl">Uma trajetória guiada por entender como as coisas funcionam.</h2></div><div className="md:col-span-5 md:col-start-8"><p className="copy">Da exploração de hardware ao desenvolvimento com agentes de IA, a formação conecta programação, infraestrutura e segurança. O interesse está em problemas que exigem entendimento técnico antes de implementação.</p></div></div></ScrollReveal><div className="mt-16 border-t border-[var(--line)]">{path.map(([period, text], index) => <ScrollReveal key={period}><article className="grid gap-5 border-b border-[var(--line)] py-7 md:grid-cols-12 md:py-9"><p className="mono text-[var(--muted)] md:col-span-3">0{index + 1} / {period}</p><p className="max-w-2xl text-lg leading-8 text-[var(--silver)] md:col-span-7">{text}</p></article></ScrollReveal>)}</div></div></section>;
}
