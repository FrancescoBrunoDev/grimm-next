"use client";
import Image from "next/image";
import { Circle } from "lucide-react";
import { useState, createContext, useContext, ReactNode } from "react";
import { cn } from "@/utils/utils";
import { Gallery } from "@/components/Gallery";

interface ImgDotsContextType {
  selectedDotIndex: number;
  setSelectedDotIndex: (index: number) => void;
  imageLoaded: HTMLImageElement | null;
  setImageLoaded: (img: HTMLImageElement) => void;
  data: ImgDots;
}

const ImgDotsContext = createContext<ImgDotsContextType | undefined>(undefined);

interface ImgDotsProps {
  data: ImgDots;
  className?: string;
  children: ReactNode;
}

export const ImgDots = ({ data, className, children }: ImgDotsProps) => {
  const [selectedDotIndex, setSelectedDotIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<HTMLImageElement | null>(null);

  return (
    <ImgDotsContext.Provider
      value={{
        selectedDotIndex,
        setSelectedDotIndex,
        imageLoaded,
        setImageLoaded,
        data,
      }}
    >
      <div
        className={cn(
          "flex max-h-screen flex-col items-center justify-center gap-2 rounded-xl p-4 xl:h-[600px] xl:flex-row xl:items-start",
          className,
        )}
      >
        {children}
      </div>
    </ImgDotsContext.Provider>
  );
};

interface ImgDotsImageProps {
  className?: string;
  classNameDots?: string;
  dotColor: string;
}

export const ImgDotsImage = ({
  className,
  classNameDots,
  dotColor,
}: ImgDotsImageProps) => {
  const context = useContext(ImgDotsContext);
  if (!context) throw new Error("ImgDotsImage must be used within ImgDots");
  const {
    data,
    imageLoaded,
    setImageLoaded,
    selectedDotIndex,
    setSelectedDotIndex,
  } = context;

  return (
    <div
      className={cn("relative h-fit w-full", className)}
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
        quality={90}
        src={data.src}
        priority={true}
      />
      {data.dots.map((dot, index) => (
        <div
          key={index}
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          className="absolute"
        >
          <Circle
            onClick={() => setSelectedDotIndex(index)}
            className={cn(
              "h-5 w-5 cursor-pointer drop-shadow-xl transition",
              `stroke-${dotColor} fill-${dotColor}`,
              classNameDots,
              selectedDotIndex !== index ? "fill-none" : `fill-${dotColor}`,
            )}
          />
        </div>
      ))}
    </div>
  );
};

interface ImgDotsDescriptionProps {
  className?: string;
}

export const ImgDotsDescription = ({ className }: ImgDotsDescriptionProps) => {
  const context = useContext(ImgDotsContext);
  if (!context)
    throw new Error("ImgDotsDescription must be used within ImgDots");
  const { selectedDotIndex, data } = context;

  return (
    <div
      className={cn(
        "h-full w-full overflow-y-auto rounded-lg bg-white p-4 text-black xl:w-1/2",
        className,
      )}
    >
      {selectedDotIndex !== null && (
        <div
          className={cn("flex gap-4", {
            "flex-col xl:flex-row":
              data.dots[selectedDotIndex].paragraph.sideImg,
            "flex-col": !data.dots[selectedDotIndex].paragraph.sideImg,
          })}
        >
          <div className="flex-1">
            <h2 className="top-0 text-lg font-bold">
              {data.dots[selectedDotIndex].paragraph.title}
            </h2>
            <p
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
                    <Gallery
                      className="w-full rounded-lg object-contain"
                      gallery={gallery}
                    />
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
