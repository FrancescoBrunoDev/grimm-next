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
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-screen-2xl": size === "2xl",
        },
        "mx-auto flex w-screen flex-col items-center px-4 py-12 md:px-12 md:py-12",
        className,
      )}
    >
      {children}
    </div>
  );
};
