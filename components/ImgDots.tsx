"use client";
import Image from "next/image";
import { Circle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/utils";

interface ImgDotsProps {
  data: ImgDots;
  className?: string;
  classNameDots?: string;
  dotColor: string;
}

export const ImgDots = ({
  data,
  className,
  classNameDots,
  dotColor,
}: ImgDotsProps) => {
  const [selectedDotIndex, setSelectedDotIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<HTMLImageElement | null>(null);

  const handleDotClick = (index: number) => {
    setSelectedDotIndex(index);
  };

  return (
    <div
      className={cn(
        "flex max-h-screen flex-col items-center justify-center gap-2 rounded-xl p-4 xl:h-[600px] xl:flex-row xl:items-start",
        className,
      )}
    >
      <div
        className="relative w-fit xl:min-h-full xl:min-w-fit"
        style={{
          height: imageLoaded
            ? `${(imageLoaded.naturalHeight / imageLoaded.naturalWidth) * 100}%`
            : "100%",
        }}
      >
        <Image
          onLoad={(e) => setImageLoaded(e.currentTarget)}
          className="h-full w-full rounded-xl object-cover"
          alt={data.alt}
          width={1000}
          height={1000}
          quality={80}
          src={data.src}
        />
        {data.dots.map((dot, index) => (
          <div
            key={index}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            className="absolute"
          >
            <Circle
              onClick={() => handleDotClick(index)}
              className={cn(
                "h-5 w-5 cursor-pointer drop-shadow-xl transition",
                classNameDots,
                selectedDotIndex !== index
                  ? "fill-none"
                  : `fill-${dotColor} stroke-${dotColor}`,
              )}
            />
          </div>
        ))}
      </div>

      <div className="h-full w-full overflow-y-auto rounded-lg bg-white p-4 text-black xl:w-1/2">
        {selectedDotIndex !== null && (
          <div
            className={cn("flex gap-4", {
              "flex-row xl:flex-col":
                data.dots[selectedDotIndex].paragraph.sideImg,
              "flex-col": !data.dots[selectedDotIndex].paragraph.sideImg,
            })}
          >
            <div className="flex-1">
              <h2 className="top-0 text-lg font-bold">
                {data.dots[selectedDotIndex].paragraph.title}
              </h2>
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: data.dots[selectedDotIndex].paragraph.text,
                }}
              />
            </div>
            {data.dots[selectedDotIndex].paragraph.galleryIds && (
              <div className="flex gap-2">
                {data.dots[selectedDotIndex].paragraph.galleryIds.map(
                  (gallery, idx) => (
                    <div key={idx} className="w-48">
                      <Image
                        className="w-full rounded-lg object-contain"
                        src={gallery.cover}
                        alt={gallery.title}
                        width={200}
                        height={200}
                      />
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
