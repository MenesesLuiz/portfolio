import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { FocusAreas } from "@/components/sections/focus-areas";
import { Hero } from "@/components/sections/hero";
import { ProjectPortfolio } from "@/components/sections/project-portfolio";
import { TechStack } from "@/components/sections/tech-stack";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { AsciiHandsNarrative } from "@/components/motion/ascii-hands-narrative";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-[100dvh] overflow-x-clip bg-[var(--ink)] text-[var(--foreground)]">
        <SiteHeader />
        <AsciiHandsNarrative />
        <main id="conteudo" className="relative z-10"><Hero /><FocusAreas /><ProjectPortfolio /><TechStack /><Education /><Certifications /><About /><Contact /></main>
        <div className="relative z-10"><SiteFooter /></div>
      </div>
    </SmoothScroll>
  );
}
