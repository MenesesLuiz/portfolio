"use client";

import { useEffect, useState, type CSSProperties } from "react";

type KineticTextProps = {
  text: string;
  className?: string;
};

export function KineticText({ text, className }: KineticTextProps) {
  const [initial, setInitial] = useState(true);
  const [run, setRun] = useState(0);
  const characterCount = Array.from(text).length;

  useEffect(() => {
    const timeout = window.setTimeout(() => setInitial(false), 540 + characterCount * 18);
    return () => window.clearTimeout(timeout);
  }, [characterCount]);

  useEffect(() => {
    if (!run) return;
    const timeout = window.setTimeout(() => setRun(0), 620);
    return () => window.clearTimeout(timeout);
  }, [run]);

  const words = text.split(/(\s+)/);
  const play = () => setRun(Date.now());

  return <span className={`kinetic-text ${className ?? ""}`} aria-label={text} data-kinetic-initial={initial || undefined} data-kinetic-run={run || undefined} onPointerEnter={play} onFocus={play}>{words.map((word, wordIndex) => {
    const startIndex = words.slice(0, wordIndex).join("").length;
    if (/^\s+$/.test(word)) {
      return <span key={`space-${wordIndex}`} aria-hidden="true" className="kinetic-space">&nbsp;</span>;
    }
    const characters = Array.from(word).map((character, characterOffset) => {
      const characterIndex = startIndex + characterOffset;
      return <span key={`${character}-${characterIndex}`} aria-hidden="true" className="kinetic-char" style={{ "--kinetic-index": characterIndex } as CSSProperties}>{character}</span>;
    });
    return <span key={`word-${wordIndex}`} aria-hidden="true" className="kinetic-word">{characters}</span>;
  })}</span>;
}
