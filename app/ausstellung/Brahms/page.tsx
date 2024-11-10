"use client";
import { Hero } from "@/components/Hero";
import { Content } from "@/components/Content";
import { Paragraph } from "@/components/Paragraph";
import paragraphs from "./paragraphs.json";
import galleries from "./galleries.json";
import { FitTitle } from "@/components/FitTitle";
import { cn, useInView } from "@/utils/utils";
import Image from "next/image";

export default function Brahms() {
  const { ref, isInView } = useInView({
    threshold: 0.5,
    once: true,
    rootMargin: "10%",
  });

  return (
    <>
      <Hero
        ref={ref}
        className={cn(
          "fade-in-up transition-all duration-1000",
          "relative before:absolute before:inset-x-0 before:bottom-0 before:h-32 before:bg-gradient-to-t before:from-black before:to-transparent before:opacity-100",
          {
            "translate-y-0 opacity-100": isInView,
            "translate-y-4 opacity-0": !isInView,
          },
        )}
      >
        <div className="fixed -z-10 h-screen w-screen">
          <div className="absolute bottom-0 left-0 top-0 h-full w-auto">
            <Image
              alt="Brahms"
              src="/img/2/hero-section/Brahms.png"
              width={1000}
              height={1000}
              className="h-full w-auto object-cover"
              priority={true}
            />
          </div>
          <div className="absolute bottom-0 right-0 top-0 h-full w-auto">
            <Image
              alt="Grimm"
              src="/img/2/hero-section/Grimm.png"
              width={1000}
              height={1000}
              className="h-full w-auto object-cover"
              priority={true}
            />
          </div>
        </div>
        <Content size="xl" className="relative gap-12">
          <FitTitle
            words={["Brahms und", "grimm"]}
            fontstyle="elegant"
            size="lg"
            className={cn("transition-all delay-[100ms] duration-[2000ms]", {
              "opacity-100 blur-none": isInView,
              "opacity-0 blur-sm": !isInView,
            })}
          />
          <div
            className={cn(
              "flex w-full justify-center",
              "transition-all delay-[1000ms] duration-[1500ms]",
              {
                "translate-y-0 opacity-100": isInView,
                "translate-y-4 opacity-0": !isInView,
              },
            )}
          >
            <p className="text-justify lg:max-w-2xl">
              Julius Otto Grimm und Johannes Brahms kannten einander seit Ende
              des Jahres 1853. Bald entwickelte sich eine enge, im Grunde
              lebenslange Freundschaft. Zwischen den beiden Komponisten
              bestanden diverse musikalische Berührungspunkte (Bach-Verehrung,
              Erklärung gegen die Neudeutschen etc.). Auch teilten sie ähnliche
              literarische Interessen (Clemens Brentano, Jean Paul, E. T. A.
              Hoffmann, Joseph von Eichendorff). Verschiedentlich sollte bzw.
              durfte Grimm im Vorfeld der Veröffentlichung von Brahms-Werken
              diese durchsehen und seine Meinung darüber mitteilen. Ironisch
              bezeichnete Brahms ihn in dieser Rolle einmal als „Rezensent“
              seiner Kompositionen. Einige Stationen der Männerfreundschaft
              werden im Folgenden beleuchtet.
            </p>
          </div>
        </Content>
      </Hero>
      <Content className="gap-16">
        {paragraphs.map((paragraph, index) => {
          const paragraphGalleries = paragraph.galleryIds.map((id: number) => {
            return galleries.find((gallery: Gallery) => gallery.id === id);
          }) as Gallery[];
          const textSide = index % 2 === 0 ? "left" : "right";
          return (
            <Paragraph
              key={index}
              paragraph={paragraph}
              galleries={paragraphGalleries}
              textSide={textSide}
            />
          );
        })}
      </Content>
    </>
  );
}
