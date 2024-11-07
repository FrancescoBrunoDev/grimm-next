"use client";
import { Hero } from "@/components/Hero";
import { Content } from "@/components/Content";
import { Paragraph } from "@/components/Paragraph";
import paragraphs from "./paragraphs.json";
import galleries from "./galleries.json";
import special from "./special.json";
import { FitTitle } from "@/components/FitTitle";
import { cn, useInView } from "@/utils/utils";
import Image from "next/image";

export default function Der_komponist() {
  const { ref, isInView } = useInView({
    threshold: 0.5,
    once: true,
    rootMargin: "10%",
  });
  return (
    <>
      <Hero
        ref={ref}
        className={cn("fade-in-up transition-all duration-1000", {
          "translate-y-0 opacity-100": isInView,
          "translate-y-4 opacity-0": !isInView,
        })}
      >
        <div className="absolute -z-10 h-screen w-screen">
          <div className="absolute right-0 flex h-full w-auto items-center">
            <Image
              alt="Grimm"
              src="/img/4/Cover/Grimm_am_Klavier-small.png"
              width={1000}
              height={1000}
              className="w-screen max-w-screen-md object-cover brightness-75 md:brightness-100"
            />
          </div>
        </div>
        <Content size="xl" className="relative items-start gap-12">
          <FitTitle
            className={cn(
              "mx-0 transition-all delay-[100ms] duration-[2000ms]",
              {
                "opacity-100 blur-none": isInView,
                "opacity-0 blur-sm": !isInView,
              },
            )}
            words={["Der Komponist", "& Bearbeiter"]}
            fontstyle="elegant"
            size="md"
          />
          <div
            className={cn(
              "flex w-full",
              "transition-all delay-[100ms] duration-[2000ms]",
              {
                "opacity-100 blur-none": isInView,
                "opacity-0 blur-sm": !isInView,
              },
            )}
          >
            <p className="animate-fade-in-up text-justify delay-100 duration-[100ms] md:max-w-xl">
              Julius Otto Grimm hat ein eher schmales, aber dennoch
              facettenreiches kompositorisches Œuvre hinterlassen. Einzelne
              Werke wurden zu Lebzeiten zwar recht häufig aufgeführt: so etwa
              seine
              <i>Suite in Canonform</i> op. 10, die Hymne <i>An die Musik</i>
              für Solostimmen, Chor und Orchester op. 12 nach einem Gedicht von
              Levin Schücking sowie{" "}
              <i>Ein Liederkranz aus Klaus Groth’s Quickborn</i> op. 24. Im
              Unterschied zu Johannes Brahms wurde Grimm aber nie eine größere
              Aufmerksamkeit zuteil. Er wirkte gleichsam im Schatten seines
              berühmten Freundes. Es dürfte dennoch lohnend sein, Grimm als
              Komponist „wiederzuentdecken“.
            </p>
          </div>
        </Content>
      </Hero>
      <Content className="gap-16">
        {paragraphs.map((paragraph, index) => {
          const paragraphGalleries = paragraph.galleryIds?.map((id: number) => {
            return galleries.find((gallery: Gallery) => gallery.id === id);
          }) as Gallery[];
          const textSide = index % 2 === 0 ? "left" : "right";
          const paragraphSpecial = paragraph.specialIds?.map(
            (id: { id: number; component: string }) => {
              const data = special.find(
                (special: ImgDots) => special.id === id.id,
              );
              return { data: data, component: id.component };
            },
          ) as { data: ImgDots; component: Specials }[];
          return (
            <Paragraph
              key={index}
              paragraph={paragraph}
              galleries={paragraphGalleries}
              textSide={textSide}
              paragraphSpecial={paragraphSpecial}
            />
          );
        })}
      </Content>
    </>
  );
}
