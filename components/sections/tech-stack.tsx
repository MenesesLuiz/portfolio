import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { technicalSkills } from "@/content/portfolio";

const stackNames = ["Python", "Git", "GitHub", "Amazon Web Services", "Docker", "Linux", "Node.js", "MySQL", "Postman", "Visual Studio Code", "PowerShell"];

export function TechStack() {
  const stackItems = stackNames.map((name) => {
    const skill = technicalSkills.find((item) => item.name === name);
    return <div key={name} role="listitem" className="tech-stack-item">{skill ? <Image src={skill.icon} alt={name} width={56} height={56} className="tech-stack-icon" /> : null}</div>;
  });
  return <section id="stack" className="section-rule scroll-mt-20" aria-labelledby="stack-titulo"><div className="shell py-20 md:py-28"><ScrollReveal><div className="flex items-end gap-4 sm:gap-6"><h2 id="stack-titulo" className="display text-5xl font-semibold md:text-7xl">Tech Stack</h2><Image src="/assets/logos/MeneseLuiz-Corpo.png" alt="Ilustração de corpo inteiro de Luiz Meneses" width={1254} height={1254} className="tech-stack-portrait" /></div></ScrollReveal><ScrollReveal><div role="list" aria-label="Tecnologias" className="mt-12"><InfiniteSlider gap={36} duration={38} className="tech-stack-slider">{stackItems}</InfiniteSlider></div></ScrollReveal></div></section>;
}
