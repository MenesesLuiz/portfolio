import { technicalSkills } from "@/content/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/ui/marquee";
import { SpecialText } from "@/components/ui/special-text";

export function TechStack() {
  return (
    <section id="stack" className="scroll-mt-16">
      <div className="shell pb-20 pt-8 md:pb-28 md:pt-12">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] md:text-5xl">
            <SpecialText inView speed={16} className="font-sans font-semibold">
            Tech Stack
            </SpecialText>
          </h2>
        </Reveal>

        {technicalSkills.length > 0 ? (
          <Marquee
            pauseOnHover
            direction="right"
            speed={34}
            className="mt-8"
            aria-label="Tecnologias e ferramentas"
          >
            {technicalSkills.map((skill) => (
              <figure key={skill.name} className="mx-7 flex size-20 shrink-0 items-center justify-center p-3 md:mx-10 md:size-24 md:p-4">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  title={skill.name}
                  width={64}
                  height={64}
                  loading="lazy"
                  draggable={false}
                  className="size-full select-none object-contain transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
                />
              </figure>
            ))}
          </Marquee>
        ) : (
          <Reveal delay={0.08} className="mt-10 max-w-xl text-base leading-7 text-[var(--muted)]">
            Tecnologias e ferramentas serão organizadas por especialidade.
          </Reveal>
        )}
      </div>
    </section>
  );
}
