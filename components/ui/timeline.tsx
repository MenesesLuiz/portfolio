"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
}

type TimelineProps = {
  data: TimelineEntry[];
  heading: ReactNode;
  description?: ReactNode;
};

export function Timeline({ data, heading, description }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const updateHeight = () => setHeight(timeline.getBoundingClientRect().height);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(timeline);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 25%", "end 65%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div ref={containerRef} className="w-full font-sans">
      <div className="shell pb-20 pt-36 md:pb-28 md:pt-44">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.025em] md:text-5xl">{heading}</h2>
        {description ? <div className="mt-8 max-w-xl text-base leading-7 text-[var(--muted)]">{description}</div> : null}
      </div>

      <div ref={timelineRef} className="shell relative pb-20 md:pb-28">
        {data.map((item, index) => (
          <article key={`${item.title}-${index}`} className="relative flex justify-start pt-14 first:pt-4 md:gap-12 md:pt-28 md:first:pt-8">
            <div className="sticky top-28 z-10 w-0 self-start md:w-[36%]">
              <div className="absolute left-0 grid size-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)]">
                <div className="size-2 rounded-full bg-[var(--accent)]" />
              </div>
              <h3 className="hidden pl-16 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--muted)] md:block lg:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="w-full min-w-0 pl-14 md:w-[64%] md:pl-0">
              <h3 className="mb-5 text-2xl font-semibold tracking-[-0.02em] text-[var(--muted)] md:hidden">{item.title}</h3>
              {item.content}
            </div>
          </article>
        ))}

        <div
          aria-hidden="true"
          style={{ height }}
          className="absolute left-4 top-0 w-px overflow-hidden bg-[var(--line)]"
        >
          {reduceMotion ? (
            <div className="absolute inset-x-0 top-0 h-full w-px bg-[var(--accent)]" />
          ) : (
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-px bg-[var(--accent)]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
