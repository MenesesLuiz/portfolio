"use client";

import { ArrowDownRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { SpecialText } from "@/components/ui/special-text";

const glyphs = " .,:;i1tfLCG08@";
const sourcePath = "/art/creation-hands-source.png";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function noise(column: number, row: number, time: number) {
  const value = Math.sin(column * 12.9898 + row * 78.233 + time * 0.00031) * 43758.5453;
  return value - Math.floor(value);
}

function readToken(token: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || fallback;
}

function AsciiHandsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frame = 0;
    let startedAt = performance.now();
    let sourceReady = false;
    let sample: ImageData | null = null;
    let sampleColumns = 0;
    let sampleRows = 0;
    let contactX = 0;
    let contactY = 0;

    const source = new Image();
    const sampleCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });

    const scheduleDraw = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const updateSample = (columns: number, rows: number, cssWidth: number, cssHeight: number) => {
      if (!sampleContext) {
        return;
      }

      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      sampleContext.clearRect(0, 0, columns, rows);

      const sourceAspect = source.naturalWidth / source.naturalHeight;
      const imageHeight = cssWidth < 640 ? cssHeight * 0.58 : (cssWidth * 1.06) / sourceAspect;
      const imageWidth = imageHeight * sourceAspect;
      const imageX = (cssWidth - imageWidth) / 2;
      const imageY = cssWidth < 640 ? cssHeight * 0.225 : cssHeight * 0.16;
      const scaleX = columns / cssWidth;
      const scaleY = rows / cssHeight;

      sampleContext.drawImage(source, imageX * scaleX, imageY * scaleY, imageWidth * scaleX, imageHeight * scaleY);
      sample = sampleContext.getImageData(0, 0, columns, rows);
      sampleColumns = columns;
      sampleRows = rows;
      contactX = imageX + imageWidth * 0.5;
      contactY = imageY + imageHeight * 0.49;
    };

    const draw = (now: number) => {
      frame = 0;

      if (!sourceReady) {
        return;
      }

      const { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(cssWidth * pixelRatio));
      const height = Math.max(1, Math.floor(cssHeight * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        startedAt = now;
        sample = null;
      }

      const columns = Math.min(172, Math.max(68, Math.floor(cssWidth / (cssWidth < 640 ? 6.5 : 8.2))));
      const rows = Math.min(86, Math.max(42, Math.floor(cssHeight / (cssWidth < 640 ? 8 : 9.5))));
      const cellWidth = cssWidth / columns;
      const cellHeight = cssHeight / rows;
      const fontSize = Math.max(7, cellHeight * 0.96);
      const elapsed = now - startedAt;
      const settled = reduceMotion ? 1 : clamp(elapsed / 1150);
      const reveal = 1 - Math.pow(1 - settled, 3);
      const foreground = readToken("--foreground", "#f1f1ed");
      const muted = readToken("--muted", "#aaa9a2");
      const accent = readToken("--accent", "#c6e66b");

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.font = `${fontSize}px "JetBrains Mono Variable", monospace`;
      context.textBaseline = "top";

      if (!sample || sampleColumns !== columns || sampleRows !== rows) {
        updateSample(columns, rows, cssWidth, cssHeight);
      }

      if (!sample) {
        return;
      }

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const sampleIndex = (row * columns + column) * 4;
          const alpha = sample.data[sampleIndex + 3] / 255;

          if (alpha < 0.04) {
            continue;
          }

          const luminance =
            (sample.data[sampleIndex] * 0.2126 + sample.data[sampleIndex + 1] * 0.7152 + sample.data[sampleIndex + 2] * 0.0722) / 255;
          const grain = noise(column, row, now);
          const pulse = reduceMotion ? 0 : Math.sin(now * 0.0011 + column * 0.31 - row * 0.12) * 0.045;
          const localReveal = reduceMotion ? 1 : clamp(reveal * 1.28 - noise(column, row, startedAt) * 0.28);
          const tonalDensity = 0.25 + (1 - luminance) * 0.82;
          const value = clamp(alpha * (tonalDensity + (grain - 0.5) * 0.1 + pulse) * localReveal);

          if (value < 0.06) {
            continue;
          }

          const index = Math.max(1, Math.min(glyphs.length - 1, Math.floor(value * glyphs.length)));
          const cellX = (column + 0.5) * cellWidth;
          const cellY = (row + 0.5) * cellHeight;
          const contactDistance = Math.hypot(cellX - contactX, cellY - contactY);
          const contactRadius = Math.max(28, Math.min(cssWidth, cssHeight) * 0.065);
          const isContact = contactDistance < contactRadius && value > 0.14;
          const opacity = 0.3 + alpha * 0.48 + value * 0.22;

          context.fillStyle = isContact ? accent : value > 0.5 ? foreground : muted;
          context.globalAlpha = isContact ? Math.min(1, opacity + 0.15) : opacity;
          context.fillText(glyphs[index], column * cellWidth, row * cellHeight);
        }
      }

      context.globalAlpha = 1;

      if (!reduceMotion) {
        frame = requestAnimationFrame(draw);
      }
    };

    source.onload = () => {
      sourceReady = true;
      startedAt = performance.now();
      sample = null;
      scheduleDraw();
    };
    source.src = sourcePath;

    const resizeObserver = new ResizeObserver(() => {
      sample = null;
      scheduleDraw();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-x-0 top-0 h-[calc(100%+4rem)] w-full sm:h-[calc(100%+8rem)]" />;
}

export function AsciiHandsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[calc(100dvh-4rem)] overflow-visible" aria-labelledby="inicio-titulo">
      <AsciiHandsCanvas />

      <div className="shell relative z-10 grid min-h-[calc(100dvh-4rem)] grid-cols-1 py-10 md:py-14 lg:grid-cols-12 lg:gap-x-8">
        <motion.div
          className="lg:col-span-8 lg:row-start-1"
          initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            id="inicio-titulo"
            className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl lg:text-[4rem]"
          >
            <SpecialText inView speed={14} className="font-sans font-semibold">
              Engenharia de Software, Cybersecurity e Desenvolvimento Web.
            </SpecialText>
          </h1>
          <a
            href="#projetos"
            className="mt-10 inline-flex items-center gap-3 border-b border-[var(--accent)] pb-3 text-base font-semibold transition-colors hover:text-[var(--accent)] active:translate-y-px"
          >
            Explorar trabalhos
            <ArrowDownRight size={20} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <p className="sr-only">Duas mãos em ASCII quase se tocam no centro da composição.</p>
    </section>
  );
}
