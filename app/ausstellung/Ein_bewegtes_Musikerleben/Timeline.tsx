import paragraphs from "./paragraphs.json";
import galleries from "./galleries.json";
import { Circle } from "lucide-react";
import { cn } from "@/utils/utils";
import { Paragraph } from "@/components/Paragraph";

export const TimeLine = () => {
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const paragraphGalleries = paragraph.galleryIds.map((id: number) => {
          return galleries.find((gallery: Gallery) => gallery.id === id);
        }) as Gallery[];
        const textSide = "full";
        return (
          <div key={index} className="flex items-start">
            <div
              className={cn(
                `mt-4 flex shrink-0 translate-x-[12px] items-center justify-end space-x-1 py-8 md:w-20`,
                {
                  "pt-0": index === 0,
                  "pb-0": index === paragraphs.length - 1,
                },
              )}
            >
              {!paragraph.hiddenDot && (
                <>
                  <h2 className="hidden text-2xl font-bold md:block md:w-fit">
                    {paragraph.year}
                  </h2>
                  <Circle className={cn(`fill-primary h-[20px] w-[20px]`)} />
                </>
              )}
            </div>

            <div
              key={index}
              className={cn(
                `border-primary flex flex-col gap-8 border-l-4 py-8 pl-4`,
                {
                  "pt-0": index === 0,
                  "pb-0": index === paragraphs.length - 1,
                  "py-8": index !== 0 && index !== paragraphs.length - 1,
                },
              )}
            >
              <div>
                <h2 className="block text-2xl font-bold md:hidden">
                  {paragraph.year}
                </h2>
                <Paragraph
                  key={index}
                  paragraph={paragraph}
                  galleries={paragraphGalleries}
                  textSide={textSide}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
