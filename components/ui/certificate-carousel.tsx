"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { CSSProperties, FocusEvent, MouseEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

import type { Certification } from "@/content/portfolio";
import { Tilt } from "@/components/ui/tilt";

const COPY_COUNT = 3;
const CYCLE_REPEAT_COUNT = 3;
const AUTOPLAY_SPEED = 36;
const DRAG_THRESHOLD = 6;

type CertificateCarouselProps = {
  items: Certification[];
};

type DragState = {
  pointerId: number | null;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
};

function CertificateCard({ item, isAccessible }: { item: Certification; isAccessible: boolean }) {
  const ratioStyle = {
    "--certificate-ratio": item.imageWidth / item.imageHeight,
  } as CSSProperties;

  const media = (
    <div className="transition-transform duration-300 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
      <Tilt rotationFactor={4} springOptions={{ stiffness: 220, damping: 24, mass: 0.6 }}>
        <div className="relative h-24 w-full sm:h-[7.5rem] md:h-[8.5rem]">
          <Image
            src={item.image}
            alt={isAccessible ? `${item.title}, emitido por ${item.issuer}` : ""}
            fill
            draggable={false}
            sizes="(max-width: 640px) 10rem, 13rem"
            className="pointer-events-none select-none object-contain"
          />
        </div>
      </Tilt>
    </div>
  );

  const caption = (
    <div className="pt-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold leading-5 text-[var(--accent-text)]">{item.issuer}</p>
        {item.credentialUrl ? (
          <ArrowUpRight
            aria-hidden="true"
            className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent-text)]"
            size={18}
          />
        ) : null}
      </div>
      <h3 className="mt-1.5 text-sm font-semibold leading-5 text-[var(--foreground)]">{item.title}</h3>
      {item.issuedAt ? <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">{item.issuedAt}</p> : null}
    </div>
  );

  const content = (
    <>
      {media}
      {caption}
    </>
  );

  return (
    <div
      style={ratioStyle}
      className="relative w-[calc(6rem*var(--certificate-ratio))] shrink-0 hover:z-10 sm:w-[calc(7.5rem*var(--certificate-ratio))] md:w-[calc(8.5rem*var(--certificate-ratio))]"
    >
      {item.credentialUrl ? (
        <a
          href={item.credentialUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={isAccessible ? undefined : -1}
          aria-label={`Abrir credencial ${item.title}`}
          className="group block"
        >
          {content}
        </a>
      ) : (
        <article className="group">{content}</article>
      )}
    </div>
  );
}

function ComingSoonItem() {
  return (
    <p className="flex h-24 w-44 shrink-0 items-center justify-center px-4 text-center text-sm font-semibold leading-6 text-[var(--muted)] sm:h-[7.5rem] sm:w-52 md:h-[8.5rem] md:w-56">
      Mais certificados por vir! :)
    </p>
  );
}

export function CertificateCarousel({ items }: CertificateCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>({ pointerId: null, startX: 0, startScrollLeft: 0, moved: false });
  const lastDragEndRef = useRef(Number.NEGATIVE_INFINITY);
  const resumeAtRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const frame = window.requestAnimationFrame(() => {
      scroller.scrollLeft = scroller.scrollWidth / COPY_COUNT;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [items.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const interactionPaused = isDragging || isHovered || isFocused;
    if (!scroller || reduceMotion || interactionPaused || !isInView || items.length < 2) return;

    let animationFrame = 0;
    let previousTime = performance.now();

    const move = (time: number) => {
      const elapsed = Math.min(time - previousTime, 64);
      previousTime = time;

      if (!document.hidden && time >= resumeAtRef.current) {
        const cycleWidth = scroller.scrollWidth / COPY_COUNT;
        scroller.scrollLeft += (AUTOPLAY_SPEED * elapsed) / 1000;

        if (scroller.scrollLeft >= cycleWidth * 2) {
          scroller.scrollLeft -= cycleWidth;
        }
      }

      animationFrame = window.requestAnimationFrame(move);
    };

    animationFrame = window.requestAnimationFrame(move);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isDragging, isFocused, isHovered, isInView, items.length, reduceMotion]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const scroller = scrollerRef.current;
    if (!scroller) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    const drag = dragRef.current;
    if (!scroller || drag.pointerId !== event.pointerId) return;

    const movement = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(movement) >= DRAG_THRESHOLD) {
      drag.moved = true;
      scroller.setPointerCapture(event.pointerId);
    }

    const cycleWidth = scroller.scrollWidth / COPY_COUNT;
    let nextScrollLeft = drag.startScrollLeft - movement;

    if (nextScrollLeft >= cycleWidth * 2) {
      nextScrollLeft -= cycleWidth;
      drag.startScrollLeft -= cycleWidth;
    } else if (nextScrollLeft <= 0) {
      nextScrollLeft += cycleWidth;
      drag.startScrollLeft += cycleWidth;
    }

    scroller.scrollLeft = nextScrollLeft;
    if (drag.moved) event.preventDefault();
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    const drag = dragRef.current;
    if (!scroller || drag.pointerId !== event.pointerId) return;

    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    if (drag.moved) lastDragEndRef.current = performance.now();

    drag.pointerId = null;
    resumeAtRef.current = performance.now() + 900;
    setIsDragging(false);
  }

  function preventClickAfterDrag(event: MouseEvent<HTMLDivElement>) {
    if (performance.now() - lastDragEndRef.current < 350) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Certificações profissionais"
        className={`overflow-x-scroll overflow-y-hidden [scrollbar-width:none] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={handleBlur}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={preventClickAfterDrag}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="flex w-max select-none py-6">
          {Array.from({ length: COPY_COUNT }, (_, copyIndex) => (
            <div key={copyIndex} className="flex shrink-0">
              {Array.from({ length: CYCLE_REPEAT_COUNT }, (_, repeatIndex) => {
                const isAccessible = copyIndex === 1 && repeatIndex === 0;

                return (
                  <div
                    key={repeatIndex}
                    aria-hidden={isAccessible ? undefined : true}
                    className="flex shrink-0 items-start gap-6 pr-6 md:gap-8 md:pr-8"
                  >
                    {items.map((item) => (
                      <CertificateCard
                        key={`${copyIndex}-${repeatIndex}-${item.issuer}-${item.title}`}
                        item={item}
                        isAccessible={isAccessible}
                      />
                    ))}
                    <ComingSoonItem />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
