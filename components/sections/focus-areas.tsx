import { ScrollReveal } from "@/components/motion/scroll-reveal";

const areas = ["Software Engineering", "Cybersecurity", "Cloud Security", "AI aplicada", "Web Engineering"];

export function FocusAreas() {
  return <section id="areas" aria-labelledby="areas-titulo" className="section-rule"><div className="shell grid gap-10 py-20 md:grid-cols-12 md:py-28"><ScrollReveal className="md:col-span-4"><h2 id="areas-titulo" className="display max-w-sm text-5xl font-semibold md:text-6xl">Sistemas, proteção e entrega.</h2></ScrollReveal><div className="md:col-span-7 md:col-start-6"><p className="copy max-w-xl">Uma base multidisciplinar para construir software considerando infraestrutura, segurança e a experiência de quem usa.</p><ol className="mt-10 border-t border-[var(--line)]">{areas.map((area, index) => <li key={area} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-[var(--line)] py-4 text-xl font-medium tracking-[-.03em] sm:grid-cols-[4.5rem_1fr] sm:text-2xl"><span className="mono text-[var(--subtle)]">0{index + 1}</span>{area}</li>)}</ol></div></div></section>;
}
