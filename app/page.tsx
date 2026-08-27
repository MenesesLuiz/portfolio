import { About } from "@/components/sections/about";
import { AsciiHandsHero } from "@/components/sections/ascii-hands-hero";
import { Certifications } from "@/components/sections/certifications";
import { ProjectPortfolio } from "@/components/sections/project-portfolio";
import { TechStack } from "@/components/sections/tech-stack";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-[var(--surface)] text-[var(--foreground)]">
      <SiteHeader />
      <main>
        <AsciiHandsHero />
        <About />
        <Certifications />
        <TechStack />
        <ProjectPortfolio />
      </main>
      <SiteFooter />
    </div>
  );
}
