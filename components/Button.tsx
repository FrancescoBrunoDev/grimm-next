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
  color: "black" | "white";
  className?: string;
  href?: string;
  onClick?: () => void;
}) => {
  const baseClass = cn(
    "h-fit rounded-lg px-4 py-2 transition-all",
    {
      "bg-black text-white hover:bg-opacity-80": color === "black",
      "bg-white text-black hover:bg-opacity-80 hover:text-black":
        color === "white",
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
