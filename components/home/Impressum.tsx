"use client";
import { Button } from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useInView, cn } from "@/utils/utils";
import { ExternalLink } from "lucide-react";

export const Impressum = () => {
  const { ref, isInView } = useInView({
    threshold: 0.5,
    once: true,
    rootMargin: "10%",
  });

  const logos = [
    {
      alt: "Universitätsgesellschaft Münster e.V.",
      href: "https://www.uni-muenster.de/Foerderer/",
      src: "/img/Impressum/ugm_v4.svg",
    },
    {
      alt: "Stadtarchiv Münster",
      href: "https://www.stadt-muenster.de/archiv/startseite",
      src: "/img/Impressum/Stadtarchiv.png",
    },
    {
      alt: "Universität Münster",
      href: "https://www.uni-muenster.de/studium/index.shtml",
      src: "/img/Impressum/Loghi-03.png",
    },
    {
      alt: "Universität Münster - Institut für Musikwissenschaft",
      href: "https://www.uni-muenster.de/Musikwissenschaft/",
      src: "/img/Impressum/MuWi-Institut.png",
    },
  ];

  return (
    <section
      id="impressum"
      className="mx-auto flex w-screen max-w-screen-xl items-center justify-center px-8 py-12 md:h-screen md:py-12"
    >
      <div
        ref={ref}
        className={cn(
          "bg-primary flex flex-col gap-8 rounded-xl p-8",
          "transition-all delay-[100ms] duration-[1000ms]",
          {
            "translate-y-0 opacity-100": isInView,
            "translate-y-4 opacity-0": !isInView,
          },
        )}
      >
        <div className="flex flex-col items-center gap-12 text-background lg:flex-row">
          <h1 className="place-self-start font-elegant text-4xl sm:text-6xl lg:place-self-center">
            Impressum
          </h1>
          <div className="flex flex-col gap-4 text-base">
            <p className="text-balance font-regular">
              Online-Ausstellung im Rahmen des Grimm-Forschungsprojekts am
              Institut für Musikwissenschaft der Universität Münster
            </p>
            <div className="flex flex-wrap items-center justify-between gap-8 md:flex-nowrap">
              <p className="w-48">
                Design & Programmierung:
                <br />
                <Link
                  className="group relative flex w-fit items-center text-background hover:text-background"
                  href={"https://www.francesco-bruno.com"}
                >
                  Francesco Bruno{" "}
                  <ExternalLink className="h-4 group-hover:-rotate-12" />
                </Link>
                <br />
                Projektleitung & Konzeption: Anna Maria Plischka & Peter Schmitz
                Texte: Peter Schmitz
              </p>
              <p>
                Institut für Musikwissenschaft
                <br /> Universität Münster
                <br /> Philippistr. 2b
                <br /> 48149 Münster
              </p>
              <Button
                color="background"
                text="Abbildungsnachweise"
                href="/img/Home_Page/Abbildungsnachweise.pdf"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-evenly gap-8">
          {logos.map(({ alt, href, src }, index) => (
            <Link
              key={alt}
              href={href}
              className={cn("shrink-0", "transition-all duration-1000", {
                "opacity-100": isInView,
                "opacity-0": !isInView,
              })}
              style={{
                transitionDelay: `${500 + index * 500}ms`,
              }}
            >
              <Image
                className="h-14 w-auto shrink-0"
                src={src}
                alt={alt}
                width={100}
                height={100}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
