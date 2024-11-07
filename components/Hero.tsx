"use client";
import { cn } from "@/utils/utils";

export const Hero = ({
  children,
  className,
  ref,
  style,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
}>) => {
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
};
