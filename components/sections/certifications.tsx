import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { certifications } from "@/content/portfolio";
import { CertificateCarousel } from "@/components/sections/certificate-carousel";

export function Certifications() {
  return <section id="certificacoes" className="section-rule scroll-mt-20" aria-labelledby="certificacoes-titulo"><div className="shell py-20 md:py-28"><ScrollReveal><div className="grid gap-8 md:grid-cols-12"><div className="md:col-span-5"><h2 id="certificacoes-titulo" className="display text-5xl font-semibold md:text-6xl">Certificações como evidência de estudo.</h2></div><p className="copy self-end md:col-span-4 md:col-start-9">Uma seleção direta de formações complementares em desenvolvimento e segurança.</p></div></ScrollReveal><ScrollReveal><CertificateCarousel certifications={certifications} /></ScrollReveal></div></section>;
}
