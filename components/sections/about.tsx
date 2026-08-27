"use client";

import type { ReactNode } from "react";
import { SpecialText } from "@/components/ui/special-text";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";

function Highlight({ children, mono = false }: { children: ReactNode; mono?: boolean }) {
  return (
    <mark className={`bg-transparent font-semibold text-[var(--accent-text)] ${mono ? "font-mono" : ""}`}>
      {children}
    </mark>
  );
}

const timelineData: TimelineEntry[] = [
  {
    title: "2014-2016",
    content: (
      <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
        Foi a época em que utilizava notebooks no dia a dia, mas já sabia operar um desktop sem problemas.
        Modificações no <Highlight mono>%appdata%</Highlight> e no <Highlight mono>regedit</Highlight> eram
        diárias. Comecei a explorar as mais diversas áreas da computação e de <Highlight>hardware</Highlight> por
        meio de vídeos no YouTube.
      </p>
    ),
  },
  {
    title: "2017-2020",
    content: (
      <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
        Ganhei meu primeiro desktop e tive <Highlight>contato direto com o hardware</Highlight> físico. Foi a época em
        que aprendi na prática como funcionava um computador, montando e desmontando tudo sozinho.
      </p>
    ),
  },
  {
    title: "2021-2024",
    content: (
      <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
        Tive meu primeiro contato com linguagens de marcação e entrei de vez no mundo da programação. <Highlight mono>HTML</Highlight>{" "}
        e <Highlight mono>CSS</Highlight> eram incríveis para mim; logo depois, comecei com <Highlight mono>Python</Highlight>.
        Em 2024, ingressei no curso de <Highlight>Engenharia de Software</Highlight> pela{" "}
        <Highlight>Universidade do Estado do Pará</Highlight> (<Highlight mono>5/8</Highlight>).
      </p>
    ),
  },
  {
    title: "2025-Atual",
    content: (
      <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
        Durante minha trajetória na tecnologia, o interesse por <Highlight>cibersegurança</Highlight> falou mais alto.
        Ingressei na{" "}
        <Highlight>Faculdade de Informática e Administração Paulista (FIAP)</Highlight>, no curso de{" "}
        <Highlight>Defesa Cibernética</Highlight> (<Highlight mono>2/4</Highlight>), com foco técnico em{" "}
        <Highlight>Cloud Security</Highlight>.
      </p>
    ),
  },
  {
    title: "Plus",
    content: (
      <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
        Durante todos esses anos, também aprendi a comandar <Highlight>Inteligências Artificiais</Highlight> e, mais
        recentemente, <Highlight>agentes de IA</Highlight>. Hoje, desenvolvo sites utilizando essas ferramentas, unindo
        o conhecimento de infraestrutura, programação e segurança que adquiri ao longo da minha jornada.
      </p>
    ),
  },
];

export function About() {
  return (
    <section id="sobre">
      <Timeline
        data={timelineData}
        heading={
          <SpecialText inView speed={16} className="font-sans font-semibold">
            Sobre mim
          </SpecialText>
        }
        description={
          <p>
            Da curiosidade por hardware ao desenvolvimento com agentes de IA, esta é a trajetória que conectou
            programação, infraestrutura e segurança.
          </p>
        }
      />
    </section>
  );
}
