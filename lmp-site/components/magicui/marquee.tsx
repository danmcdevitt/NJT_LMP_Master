"use client";

import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Pause the marquee animation on hover
   */
  pauseOnHover?: boolean;
  /**
   * Reverse the direction of the marquee
   */
  reverse?: boolean;
  /**
   * Vertical marquee instead of horizontal
   */
  vertical?: boolean;
  /**
   * Repeat the content multiple times
   */
  repeat?: number;
  /**
   * Children to display in the marquee
   */
  children?: React.ReactNode;
}

export function Marquee({
  className,
  pauseOnHover = false,
  reverse = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 [gap:var(--gap)]", {
              "flex-row animate-marquee": !vertical,
              "flex-col animate-marquee-vertical": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
            style={{
              animationDuration: "var(--duration)",
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

