"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const glyphs = " .,:;i1tfLCG08@";
const sourcePath = "/art/creation-hands-source.png";

function AsciiHand({ side }: { side: "left" | "right" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const source = new Image();
    const sampler = document.createElement("canvas");
    const sampleContext = sampler.getContext("2d", { willReadFrequently: true });
    let frame = 0;

    const draw = () => {
      const { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(cssWidth * ratio));
      const height = Math.max(1, Math.floor(cssHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }

      const columns = Math.max(68, Math.min(172, Math.floor(cssWidth / 8.2)));
      const rows = Math.max(42, Math.min(86, Math.floor(cssHeight / 9.5)));
      sampler.width = columns;
      sampler.height = rows;
      sampleContext?.clearRect(0, 0, columns, rows);
      const sourceAspect = source.naturalWidth / source.naturalHeight;
      const imageHeight = (cssWidth * 1.06) / sourceAspect;
      const imageWidth = imageHeight * (source.naturalWidth / source.naturalHeight);
      const imageX = (cssWidth - imageWidth) / 2;
      const imageY = cssHeight * 0.16;
      sampleContext?.drawImage(source, imageX * (columns / cssWidth), imageY * (rows / cssHeight), imageWidth * (columns / cssWidth), imageHeight * (rows / cssHeight));
      const data = sampleContext?.getImageData(0, 0, columns, rows);
      if (!data) return;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.font = `${Math.max(7, cssHeight / rows)}px "JetBrains Mono Variable", monospace`;
      context.textBaseline = "top";

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const isLeft = column < columns * 0.49;
          if ((side === "left" && !isLeft) || (side === "right" && column < columns * 0.51)) continue;
          const index = (row * columns + column) * 4;
          const alpha = data.data[index + 3] / 255;
          const luminosity = (data.data[index] * 0.2126 + data.data[index + 1] * 0.7152 + data.data[index + 2] * 0.0722) / 255;
          const density = alpha * (1 - luminosity);
          if (density < 0.09) continue;
          context.globalAlpha = Math.min(0.28, density * 0.42);
          context.fillStyle = density > 0.45 ? "#f1f1ee" : "#b2b2ad";
          context.fillText(glyphs[Math.min(glyphs.length - 1, Math.floor(density * glyphs.length))], (column * cssWidth) / columns, (row * cssHeight) / rows);
        }
      }
      context.globalAlpha = 1;
    };

    source.onload = () => { draw(); };
    source.src = sourcePath;
    const resize = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); });
    resize.observe(canvas);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); };
  }, [side]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

export function AsciiHandsNarrative() {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.set([root.current, left.current, right.current], { autoAlpha: 1 });
      const outwardMovement = gsap.timeline({ scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.45 } }).to(left.current, { xPercent: -22, ease: "none" }, 0).to(right.current, { xPercent: 22, ease: "none" }, 0);
      return () => outwardMovement.kill();
    });
    return () => mm.revert();
  }, { scope: root });

  return <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden motion-reduce:hidden md:block"><div ref={left} className="absolute inset-0"><AsciiHand side="left" /></div><div ref={right} className="absolute inset-0"><AsciiHand side="right" /></div></div>;
}
