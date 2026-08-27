"use client";

import { Dithering, type DitheringProps } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type DitheringShaderProps = DitheringProps & {
  className?: string;
};

export function DitheringShader({ className, speed = 1, style, ...props }: DitheringShaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <Dithering
        {...props}
        speed={reduceMotion ? 0 : speed}
        style={{ height: "100%", width: "100%", ...style }}
      />
    </div>
  );
}
