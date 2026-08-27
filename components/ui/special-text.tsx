"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpecialTextProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
  maxAnimatedCharacters?: number;
}

const RANDOM_CHARS = "_!X$0-+*#";

function getRandomChar(prevChar?: string): string {
  let char: string;
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  } while (char === prevChar);
  return char;
}

function getAnimatedIndices(length: number, maxCharacters: number) {
  if (length === 0) return [];

  const count = Math.min(length, Math.max(1, Math.floor(maxCharacters)));
  if (count === length) {
    return Array.from({ length }, (_, index) => index);
  }

  const step = (length - 1) / (count - 1);
  return Array.from({ length: count }, (_, index) => Math.round(index * step));
}

export function SpecialText({
  children,
  speed = 20,
  delay = 0,
  className = "",
  inView = false,
  once = true,
  maxAnimatedCharacters = 18,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once, margin: "-100px" });
  const shouldAnimate = !reduceMotion && (inView ? isInView : true);
  const animatedIndices = useMemo(() => getAnimatedIndices(children.length, maxAnimatedCharacters), [children.length, maxAnimatedCharacters]);
  const initialText = useMemo(() => {
    const chars = children.split("");
    animatedIndices.forEach((index) => {
      chars[index] = "\u00A0";
    });
    return chars.join("");
  }, [animatedIndices, children]);
  const [hasStarted, setHasStarted] = useState(() => !inView && delay <= 0);
  const [displayText, setDisplayText] = useState(() => (reduceMotion ? children : initialText));
  const [currentPhase, setCurrentPhase] = useState<"phase1" | "phase2">("phase1");
  const [animationStep, setAnimationStep] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);

  function clearStartTimeout() {
    if (startTimeoutRef.current === null) return;
    window.clearTimeout(startTimeoutRef.current);
    startTimeoutRef.current = null;
  }

  function clearAnimationInterval() {
    if (intervalRef.current === null) return;
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function startAnimation() {
    setHasStarted(true);
    setDisplayText(initialText);
    setCurrentPhase("phase1");
    setAnimationStep(0);
  }

  useEffect(() => {
    if (reduceMotion) {
      clearStartTimeout();
      clearAnimationInterval();
      setHasStarted(true);
      setDisplayText(children);
      return;
    }

    if (shouldAnimate && !hasStarted) {
      clearStartTimeout();
      if (delay <= 0) {
        startAnimation();
      } else {
        startTimeoutRef.current = window.setTimeout(() => {
          startTimeoutRef.current = null;
          startAnimation();
        }, delay * 1000);
      }
    }

    return clearStartTimeout;
  }, [children, delay, hasStarted, reduceMotion, shouldAnimate]);

  useEffect(() => {
    if (!hasStarted || reduceMotion) {
      return;
    }

    clearAnimationInterval();

    intervalRef.current = window.setInterval(() => {
      if (currentPhase === "phase1") {
        const maxSteps = animatedIndices.length * 2;
        const currentLength = Math.min(animationStep + 1, animatedIndices.length);
        const chars = children.split("");

        animatedIndices.forEach((characterIndex, index) => {
          chars[characterIndex] =
            index < currentLength ? getRandomChar(characterIndex > 0 ? chars[characterIndex - 1] : undefined) : "\u00A0";
        });

        setDisplayText(chars.join(""));

        if (animationStep < maxSteps - 1) {
          setAnimationStep((previous) => previous + 1);
        } else {
          setCurrentPhase("phase2");
          setAnimationStep(0);
        }
        return;
      }

      const revealedCount = Math.floor(animationStep / 2);
      const chars = children.split("");

      animatedIndices.forEach((characterIndex, index) => {
        if (index < revealedCount) {
          chars[characterIndex] = children[characterIndex];
        } else if (index === revealedCount && revealedCount < animatedIndices.length) {
          chars[characterIndex] = animationStep % 2 === 0 ? "_" : getRandomChar();
        } else {
          chars[characterIndex] = getRandomChar();
        }
      });

      setDisplayText(chars.join(""));

      if (animationStep < animatedIndices.length * 2 - 1) {
        setAnimationStep((previous) => previous + 1);
      } else {
        setDisplayText(children);
        clearAnimationInterval();
      }
    }, speed);

    return clearAnimationInterval;
  }, [animatedIndices, animationStep, children, currentPhase, hasStarted, reduceMotion, speed]);

  useEffect(() => {
    return () => {
      clearStartTimeout();
      clearAnimationInterval();
    };
  }, []);

  return (
    <span ref={containerRef} className={cn("block whitespace-pre-wrap break-words font-mono font-medium", className)}>
      <span aria-hidden="true">{displayText}</span>
      <span className="sr-only">{children}</span>
    </span>
  );
}
