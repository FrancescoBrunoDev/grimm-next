"use client";
import { cn } from "@/utils/utils";

export const Content = ({
  children,
  size = "xl",
  className,
  ref,
}: Readonly<{
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}>) => {
  return (
    <div
      ref={ref}
      className={cn(
        {
          "max-w-(--breakpoint-sm)": size === "sm",
          "max-w-(--breakpoint-md)": size === "md",
          "max-w-(--breakpoint-lg)": size === "lg",
          "max-w-(--breakpoint-xl)": size === "xl",
          "max-w-(--breakpoint-2xl)": size === "2xl",
        },
        "mx-auto flex w-screen flex-col items-center px-4 py-12 md:px-12 md:py-12",
        className,
      )}
    >
      {children}
    </div>
  );
};
