import { certifications } from "@/content/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { CertificateCarousel } from "@/components/ui/certificate-carousel";
import { SpecialText } from "@/components/ui/special-text";

export function Certifications() {
  return (
    <section id="certificacoes" className="scroll-mt-16">
      <div className="shell relative pb-8 md:pb-10">
        <div className="relative flex min-h-24 items-center">
          <div aria-hidden="true" className="absolute left-4 top-0 h-12 w-px bg-[var(--line)]">
            <div className="absolute -bottom-4 -left-[15px] grid size-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)]">
              <div className="size-2 rounded-full bg-[var(--accent)]" />
            </div>
          </div>
          <Reveal className="w-full">
            <h2 className="max-w-2xl pl-16 text-3xl font-semibold tracking-[-0.025em] md:text-5xl">
              <SpecialText inView speed={16} className="font-sans font-semibold">
                Certificações
              </SpecialText>
            </h2>
          </Reveal>
        </div>

        {certifications.length === 0 ? (
          <Reveal delay={0.08} className="mt-10 max-w-xl text-sm leading-6 text-[var(--muted)]">
            Credenciais profissionais serão publicadas aqui.
          </Reveal>
        ) : (
          <CertificateCarousel items={certifications} />
        )}
      </div>
    </section>
  );
}
