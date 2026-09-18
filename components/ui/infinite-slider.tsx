import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: ReactNode;
  duplicateChildren?: ReactNode;
  gap?: number;
  duration?: number;
  copies?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
};

/**
 * A CSS marquee made from repeated equal sets. It moves exactly one set per
 * cycle, while additional sets keep wide viewports continuously populated.
 */
export function InfiniteSlider({
  children,
  duplicateChildren,
  gap = 24,
  duration = 36,
  copies = 3,
  reverse = false,
  className,
  trackClassName,
}: InfiniteSliderProps) {
  const setCount = Math.max(2, copies);
  const style = {
    "--infinite-slider-gap": `${gap}px`,
    "--infinite-slider-duration": `${duration}s`,
    "--infinite-slider-shift": `${-100 / setCount}%`,
  } as CSSProperties;

  const repeatedSets = Array.from({ length: setCount - 1 }, (_, index) => (
    <div key={index} className="infinite-slider-set" aria-hidden="true">{duplicateChildren ?? children}</div>
  ));

  return (
    <div className={cn("infinite-slider", className)} style={style}>
        <div className={cn("infinite-slider-track", reverse && "infinite-slider-track-reverse", trackClassName)}>
          <div className="infinite-slider-set">{children}</div>
          {repeatedSets}
        </div>
    </div>
  );
}
