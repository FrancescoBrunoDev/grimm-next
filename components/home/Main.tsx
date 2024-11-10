"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/utils";
import { Quote } from "@/components/home/Quote";

export const Main = () => {
  return (
    <section
      className={cn(
        "relative flex h-screen w-screen items-center justify-center",
        "before:absolute before:inset-x-0 before:bottom-0 before:h-32 before:bg-gradient-to-t before:from-background before:to-transparent before:opacity-100",
      )}
    >
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 -z-10 size-full object-cover"
      >
        <source src="/img/Home_Page/Grimm-background.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex w-full flex-col gap-8 p-8 sm:w-[600px]">
        <Quote className="w-full animate-fade-in px-16" />
        <h1 className="animate-fade-in-up text-balance text-center font-elegant text-5xl opacity-0 [animation-delay:500ms]">
          Der Brahms-Freund Julius Otto Grimm
        </h1>
      </div>
      <Link
        href="#projekt"
        className={cn(
          "text-secondary absolute bottom-7 flex flex-col items-center",
          "hover:text-primary animate-fade-in-up transition-all delay-[1500ms] duration-[1500ms] hover:-translate-y-2",
        )}
      >
        <p className="text-base font-bold uppercase">Mehr</p>
        <ChevronDown className="" />
      </Link>
    </section>
  );
};
