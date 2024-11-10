"use client";
import { cn } from "@/utils/utils";
import Link from "next/link";

export const Button = ({
  text,
  color,
  className,
  href,
  onClick,
}: {
  text: string;
  color: "background" | "primary";
  className?: string;
  href?: string;
  onClick?: () => void;
}) => {
  const baseClass = cn(
    "h-fit rounded-lg px-4 py-2 transition-all hover:bg-opacity-80 hover:scale-[1.02] hover:drop-shadow-lg",
    {
      "bg-background text-primary ": color === "background",
      "bg-primary text-background hover:text-background": color === "primary",
    },
    className,
  );

  if (href) {
    return (
      <Link href={href} className={baseClass} onClick={onClick}>
        {text}
      </Link>
    );
  }

  return (
    <button className={baseClass} onClick={onClick}>
      {text}
    </button>
  );
};
