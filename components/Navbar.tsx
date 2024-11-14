"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-14 w-full items-center justify-between bg-black/70 px-4 py-1 backdrop-blur-xl md:px-8">
      <Link className="h-full" href="/">
        <Logo className="h-fit w-24" />
      </Link>

      <div className="flex items-center justify-end gap-8 overflow-hidden">
        <CollapsibleMenu toggleMenu={toggleMenu} isOpen={isOpen} />
        <div className="relative flex h-7 w-7 items-center justify-center">
          <div
            className={cn(
              "absolute transition-all duration-300",
              isOpen ? "rotate-45 opacity-0" : "rotate-0 opacity-100",
            )}
          >
            <Menu onClick={toggleMenu} className="cursor-pointer" />
          </div>

          <div
            className={cn(
              "absolute transition-all duration-300",
              isOpen ? "rotate-0 opacity-100" : "-rotate-45 opacity-0",
            )}
          >
            <X onClick={toggleMenu} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const CollapsibleMenu = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const sections = [
    { title: "Home", href: "/" },
    { title: "Projekt", href: "/#projekt" },
    { title: "About", href: "/#about" },
    { title: "Austellung", href: "/#austellung" },
    { title: "Impressum", href: "/#impressum" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 flex h-screen w-screen bg-black/70 p-8 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none",
        "transition-all duration-300",
        "md:static md:h-auto md:w-auto md:items-center md:justify-end md:gap-8 md:bg-transparent md:p-0",
        isOpen
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-full opacity-0",
      )}
    >
      <ul className="flex size-full flex-col items-end justify-center gap-4 md:flex-row">
        {sections.map((section) => (
          <li
            key={section.href}
            className="group relative text-2xl font-bold uppercase tracking-widest text-primary transition-all md:text-sm"
          >
            <Link onClick={toggleMenu} href={section.href}>
              {section.title}
            </Link>
            <span className="pointer-events-none absolute bottom-0 right-0 h-0 w-full bg-primary transition-all group-hover:h-2" />
          </li>
        ))}
      </ul>
    </div>
  );
};
