import { Hero } from "@/components/Hero";
import { Content } from "@/components/Content";
import { Paragraph } from "@/components/Paragraph";
import paragraphs from "./paragraphs.json";
import galleries from "./galleries.json";
import { FitTitle } from "@/components/FitTitle";
import Image from "next/image";

export default function KunstlerNetzwerk() {
  return (
    <>
      <Hero className="relative">
        <div className="absolute -z-10 h-screen w-screen">
          <div className="absolute right-0 flex h-full w-auto items-center">
            <Image
              alt="Grimm"
              src="/img/3/hero-section/Grimm-Netzwerk.png"
              width={1000}
              height={1000}
              className="h-3/5 w-auto object-cover brightness-75 md:brightness-100"
            />
          </div>
        </div>
        <Content size="xl" className="relative items-start gap-12">
          <FitTitle
            className="mx-0 animate-fade-in"
            words={["Künstler", "netzwerk"]}
            fontstyle="elegant"
            size="md"
          />
          <div className="flex w-full">
            <p className="animate-fade-in-up text-justify delay-100 duration-[100ms] md:max-w-xl">
              Grimm pflegte während seines langen Künstlerlebens vielfältige
              Beziehungen zu anderen Musikerinnen und Musikern. Einige dieser
              Bekannten und Freunde sind dem Schumann- und Brahms-Umfeld
              zuzurechnen. Daher mag man geneigt sein, von einem regelrechten
              „Künstlernetzwerk“ zu sprechen. Die jeweiligen Verbindungen können
              auf der Basis unterschiedlicher Quellen nachvollzogen werden:
              Briefe, Widmungen, Konzertprogramme etc.
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
