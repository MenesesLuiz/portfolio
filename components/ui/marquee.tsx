import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: number;
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  const trackStyle = {
    "--marquee-duration": `${speed}s`,
  } as React.CSSProperties;

  const sequence = (
    <div className="flex shrink-0">
      <div className="flex shrink-0">{children}</div>
      <div aria-hidden="true" className="flex shrink-0">
        {children}
      </div>
    </div>
  );

  return (
    <div
      className={cn("marquee w-full overflow-hidden", className)}
      data-pause-on-hover={pauseOnHover}
      {...props}
    >
      <div className="marquee-track flex w-max" data-direction={direction} style={trackStyle}>
        {sequence}
        <div aria-hidden="true" className="flex shrink-0">
          {sequence}
        </div>
      </div>
    </div>
  );
}
