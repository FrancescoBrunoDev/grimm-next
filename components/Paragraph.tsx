"use client";
import { Gallery } from "@/components/Gallery";
import { cn, useInView } from "@/utils/utils";
import AudioPlayer from "@/components/AudioPlayer";
import {
  ImgDots,
  ImgDotsDescription,
  ImgDotsImage,
} from "@/components/ImgDots";

interface ParagraphProps {
  className?: string;
  paragraph: {
    title: string | null;
    text: string;
    player?: {
      name: string;
      artist: string;
      src: string;
    }[];
  };
  galleries?: Gallery[];
  textSide: "left" | "right" | "full";
  paragraphSpecial?: {
    data: ImgDots;
    component: Specials;
  }[];
}

export const Paragraph = ({
  className,
  paragraph,
  galleries = [],
  textSide,
  paragraphSpecial = [],
}: ParagraphProps) => {
  const numGalleries = galleries?.filter((gallery) => gallery).length ?? 0;

  const { ref, isInView } = useInView({
    threshold: 0.1,
    once: true,
    rootMargin: "0%",
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex max-w-full flex-col gap-8",
        numGalleries > 0 && (numGalleries > 4 || textSide === "full")
          ? "lg:flex-col lg:items-start"
          : numGalleries > 0
            ? "lg:flex-row lg:items-center"
            : "items-center justify-center",

        className,
      )}
    >
      <div
        className={cn("flex shrink flex-col gap-4", {
          "lg:order-first": textSide === "left" || textSide === "full",
          "lg:order-last": textSide === "right",
          "w-full": numGalleries === 0,
        })}
      >
        <h1
          className={cn(
            "text-4xl font-bold transition-all duration-500 ease-in-out sm:text-6xl",
            {
              "translate-x-0 opacity-100": isInView,
              "translate-y-6 opacity-0 lg:translate-x-6 lg:translate-y-0":
                !isInView && textSide === "right",
              "translate-y-6 opacity-0 lg:-translate-x-6 lg:translate-y-0":
                !isInView && textSide === "left",
              "translate-y-6 opacity-0": !isInView && textSide === "full",
            },
          )}
        >
          {paragraph.title}
        </h1>
        <p
          className={cn(
            "hyphens-auto text-balance text-justify transition-all delay-300 duration-500",
            {
              "translate-x-0 opacity-100": isInView,
              "translate-y-6 opacity-0 lg:translate-x-6 lg:translate-y-0":
                !isInView && textSide === "right",
              "translate-y-6 opacity-0 lg:-translate-x-6 lg:translate-y-0":
                !isInView && textSide === "left",
              "translate-y-6 opacity-0": !isInView && textSide === "full",
            },
          )}
          dangerouslySetInnerHTML={{ __html: paragraph.text }}
        ></p>
        {paragraph.player && (
          <div
            className={cn("flex w-full justify-center", {
              "opacity-0": !isInView,
              "opacity-100": isInView,
            })}
          >
            <AudioPlayer tracks={paragraph.player} />
          </div>
        )}
        {paragraphSpecial.map((special, index) => {
          return <SpecialSelector key={index} {...special} />;
        })}
      </div>

      {numGalleries > 0 && (
        <div
          className={cn("w-full columns-2 gap-4 space-y-4 md:columns-3", {
            "lg:w-1/5 lg:shrink-0 lg:columns-1":
              numGalleries === 1 && textSide !== "full",
            "lg:w-2/5 lg:shrink-0 lg:columns-2":
              numGalleries >= 2 && textSide !== "full",
            "lg:w-full lg:columns-4": numGalleries > 4 || textSide === "full",
          })}
        >
          {galleries.map((gallery, index) => {
            if (!gallery) return null;

            return (
              <div key={gallery.id} className={cn("break-inside-avoid")}>
                <Gallery
                  className={cn(
                    "break-inside-avoid transition-all duration-1000",
                    {
                      "opacity-0": !isInView,
                      "opacity-100": isInView,
                    },
                  )}
                  style={{
                    transitionDelay: `${250 + index * 150}ms`,
                  }}
                  gallery={gallery}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SpecialSelector = (special: { component: Specials; data: ImgDots }) => {
  switch (special.component) {
    case "ImgDots":
      return (
        <ImgDots data={special.data} className="bg-white">
          <ImgDotsImage
            dotColor="white"
            className="xl:min-h-full xl:min-w-fit"
          />
          <ImgDotsDescription />
        </ImgDots>
      );
    default:
      return null;
  }
};
