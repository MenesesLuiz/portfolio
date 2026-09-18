"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(root.current, {
      y: 22, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 86%", once: true },
    });
  }, { scope: root });
  return <div ref={root} className={className}>{children}</div>;
}
