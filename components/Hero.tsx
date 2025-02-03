"use client";
import { cn } from "@/utils/utils";
import { forwardRef } from "react";

export const Hero = forwardRef<
  HTMLDivElement,
  Readonly<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }>
>(({ children, className, style }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-screen w-screen items-center justify-center",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
});

Hero.displayName = "Hero";
