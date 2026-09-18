# Frontend Handoff

## Overview

O portfólio foi reformulado como uma experiência editorial de alto contraste para **MenesesLuiz**, com foco em engenharia, segurança e precisão. A aplicação continua sendo uma página única em Next.js, mas agora possui uma narrativa clara: apresentação, áreas de atuação, projetos, stack, educação, certificações, trajetória e contato.

## Architecture

- `app/page.tsx` compõe a homepage usando seções independentes.
- `content/portfolio.ts` continua sendo a fonte única dos dados reais de certificações, tecnologias e futuros projetos.
- Componentes que precisam de animação são Client Components isolados; o restante permanece server-rendered.
- A página é estática e compatível com App Router / React Server Components.

## Design System

- **Cores:** near-black, graphite, branco quente, cinza e prata; sem neons ou gradientes decorativos.
- **Tipografia:** Manrope Variable para leitura e display; JetBrains Mono apenas em labels, índices e metadados.
- **Spacing:** escalas amplas (`py-20` / `py-28`) e container máximo de 88rem.
- **Grid:** linhas verticais discretas na hero e grades editoriais de 12 colunas em desktop.
- **Princípios:** alto contraste, bordas de 1px, composição assimétrica, poucos elementos técnicos e sem cards genéricos repetidos.

## Components

- `components/sections/hero.tsx`: apresentação, CTAs primários e retrato ilustrado local em `public/assets/logos/MenesesLuiz.webp`, mantido imediatamente após a assinatura em todos os breakpoints.
- `components/sections/focus-areas.tsx`: áreas de atuação em lista editorial indexada.
- `components/sections/project-portfolio.tsx`: estrutura para projetos e estado de construção quando a fonte ainda está vazia, com trilho editorial de publicação.
- `components/sections/tech-stack.tsx`: tecnologias agrupadas por papel técnico.
- `components/sections/certifications.tsx` e `certificate-carousel.tsx`: credenciais reais em trilho contínuo, sem molduras visuais, com pista de estado, pausa no hover/foco, zoom e tilt por ponteiro.
- `components/sections/about.tsx`: trajetória resumida a partir do conteúdo existente.
- `components/sections/education.tsx`: formações da UEPA e FIAP com logos oficiais remotos.
- `components/sections/contact.tsx`: CTA de conversão com e-mail e GitHub verificados a partir da configuração existente do repositório.
- `components/motion/smooth-scroll.tsx` e `scroll-reveal.tsx`: integração de motion encapsulada.
- `components/motion/kinetic-text.tsx`: entrada breve por caractere e resposta de hover/foco para links importantes.
- `components/motion/ascii-hands-narrative.tsx`: mãos ASCII decorativas, guiadas pelo scroll e mantidas visíveis; nas seções mais densas, elas apenas recuam para as bordas.

## Animations

- Lenis é a única camada de smooth scrolling.
- Lenis é acionado pelo ticker do GSAP, evitando um segundo RAF independente.
- GSAP + ScrollTrigger fazem reveals locais, com `useGSAP()` e cleanup automático.
- As mãos ASCII não usam mais fades durante a narrativa de scroll; apenas deslocamento horizontal para preservar a presença sem disputar conteúdo.
- A hero é intencionalmente estática na primeira pintura; conteúdo e CTA não dependem de JavaScript para aparecer.
- O indicador de scroll é reservado ao desktop para proteger a dobra e a hierarquia em telas menores.
- `KineticText` mantém a entrada breve e dispara a resposta por caractere somente uma vez por entrada de cursor/foco; ela não é reiniciada ao sair do elemento.
- `prefers-reduced-motion` desativa Lenis e evita timelines, deixando todo o conteúdo imediatamente acessível.

## Responsive Strategy

- Container reduz de 4rem para 2.5rem de margem lateral em telas pequenas; textos cinéticos respeitam a largura disponível para evitar overflow em 320px.
- Hero troca grade de 12 colunas por fluxo vertical; a navegação vira menu semântico móvel.
- Stack passa de quatro para duas e então uma coluna conforme o espaço disponível.
- O trilho de certificações preserva a proporção original das imagens, pausa por hover/foco e respeita reduced motion.
- Validado sem overflow horizontal em 320, 375, 430, 768, 1024, 1440 e 1920px.

## Accessibility

- Um `h1` coerente; seções com `aria-labelledby`; landmarks `header`, `main`, `nav` e `footer`.
- Links apontam para âncoras reais; botões móveis têm rótulos e estado expandido.
- Foco visível global e contraste alto.
- Todas as imagens relevantes têm texto alternativo.
- Motion não é requisito para exibir conteúdo.

## Performance

- Certificados usam `next/image` e carregamento responsivo.
- Sem WebGL ou shader; o canvas ASCII é estático e o carrossel de certificados é CSS, sem RAF adicional.
- Motion foi consolidado, removendo animações duplicadas de Motion e RAFs antigos.
- A homepage continua estática no build de produção.

## Dependencies

- Adicionadas: `gsap`, `@gsap/react`, `lenis` para o sistema de motion requerido.
- Removidas: `motion` e `@paper-design/shaders-react`, pois os componentes que dependiam delas foram substituídos e não havia uso ativo saudável.
- Adicionado `eslint.config.mjs` para restaurar o comando de lint, que estava quebrado por ausência de configuração flat do ESLint 9.

## Files Changed

- Base e SEO: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`.
- Navegação e rodapé: `components/site-header.tsx`, `components/ui/footer-section.tsx`.
- Seções: `components/sections/about.tsx`, `certifications.tsx`, `certificate-carousel.tsx`, `project-portfolio.tsx`, `tech-stack.tsx`; adicionadas `hero.tsx`, `focus-areas.tsx`, `education.tsx`, `contact.tsx`.
- Motion: adicionados `components/motion/smooth-scroll.tsx`, `scroll-reveal.tsx`, `kinetic-text.tsx` e `ascii-hands-narrative.tsx`.
- Higiene: removidos componentes legados não referenciados de ASCII/canvas, carrossel, shader, marquee, tilt, timeline, reveal e efeito de texto.

## Known Issues

- `engineeringProjects` e `portfolioSites` continuam vazios. Enquanto isso, a seção comunica de forma editorial que os cases principais estão em construção, sem simular um projeto publicado.
- Não há URL de LinkedIn publicada no projeto; não foi inventada.
- Logos de educação são carregados a partir das fontes institucionais oficiais, portanto dependem da disponibilidade desses domínios. A marca da UEPA é deliberadamente enquadrada apenas no símbolo institucional, removendo a marca de governo que acompanhava o arquivo-fonte.
- Open Graph, canonical, favicon, manifest, sitemap e robots ainda precisam de um domínio/URL público real para serem finalizados.

## Recommended Next Steps

1. Preencher `engineeringProjects` com projetos reais, incluindo descrição, imagem, disciplina e URL do GitHub.
2. Adicionar LinkedIn quando a URL correta estiver disponível.
3. Definir URL canônica e assets de marca para completar metadados sociais e arquivos de indexação.
4. Executar auditoria de desempenho (Lighthouse/React Scan) quando houver projetos e mídia reais.
