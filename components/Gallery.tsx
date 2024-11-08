"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Expand, X, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/utils/utils";
import { Content } from "@/components/Content";

type GalleryProps = {
  gallery: Gallery;
  className?: string;
  style?: React.CSSProperties;
};

type GalleryOverlayProps = {
  isOpen: boolean;
  isAnimating: boolean;
  handleClose: () => void;
  gallery: Gallery;
  selected: number;
  setSelected: (index: number) => void;
};

const GalleryOverlay: React.FC<GalleryOverlayProps> = ({
  isOpen,
  isAnimating,
  handleClose,
  gallery,
  selected,
  setSelected,
}) => {
  if (!isOpen) return null;

  const images =
    gallery.images && gallery.images.length > 0
      ? gallery.images
      : [
          {
            src: gallery.cover,
            caption: gallery.caption || gallery.title,
          },
        ];

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 text-white",
        "transition-all duration-300",
        {
          "translate-y-0 scale-100 opacity-100 backdrop-blur-xl": isAnimating,
          "translate-y-5 scale-95 opacity-0 backdrop-blur-0": !isAnimating,
        },
      )}
    >
      <Content className="relative h-full">
        <button className="absolute right-4 top-4" onClick={handleClose}>
          <X />
        </button>
        <div className="grid size-full grid-cols-1 grid-rows-6 justify-center gap-4">
          <div
            className={cn("flex", {
              "row-span-6": images.length === 1,
              "row-span-5": images.length > 1,
            })}
          >
            {images.length > 1 && (
              <button
                onClick={() => setSelected(selected - 1)}
                disabled={selected === 0}
                className="disabled:opacity-50"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
            )}
            <View selected={images[selected]} gallery={gallery} />{" "}
            {images.length > 1 && (
              <button
                onClick={() => setSelected(selected + 1)}
                disabled={selected === images.length - 1}
                className="disabled:opacity-50"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            )}
          </div>
          {images.length > 1 && (
            <Preview
              fallbackCaption={gallery.caption || gallery.title}
              images={images}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </div>
      </Content>
    </div>,
    document.body,
  );
};

export const Gallery = ({ gallery, className, style }: GalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [coverLoaded, setCoverLoaded] = useState<HTMLImageElement | null>(null);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 500); // tempo della transizione
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative w-full overflow-hidden rounded-lg text-white transition-all",
          className,
        )}
        style={{
          ...style,
          aspectRatio: coverLoaded
            ? `${coverLoaded.naturalWidth} / ${coverLoaded.naturalHeight}`
            : undefined,
        }}
      >
        <h4 className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 p-4 text-xl font-bold opacity-0 transition-opacity group-hover:opacity-100">
          <p dangerouslySetInnerHTML={{ __html: gallery.title }}></p>
          <Expand />
        </h4>
        <Image
          onLoad={(e) => setCoverLoaded(e.currentTarget)}
          sizes="20vw"
          fill
          quality={90}
          src={gallery.cover}
          alt={gallery.title}
          className="transition-all duration-500 group-hover:scale-105 group-hover:brightness-50"
        />
      </button>
      <GalleryOverlay
        isOpen={isOpen}
        isAnimating={isAnimating}
        handleClose={handleClose}
        gallery={gallery}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

const View = ({
  selected,
  gallery,
}: {
  selected: {
    src: string;
    caption?: string;
  };
  gallery: Gallery;
}) => {
  const caption = selected.caption || gallery.caption || gallery.title;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="relative size-full overflow-hidden rounded-lg">
        <Image
          src={selected.src}
          alt={caption}
          fill
          quality={80}
          className="absolute inset-0 size-full object-contain"
        />
      </div>
      {caption && <p dangerouslySetInnerHTML={{ __html: caption }}></p>}
    </div>
  );
};

const Preview = ({
  fallbackCaption,
  images,
  selected,
  setSelected,
}: {
  fallbackCaption: string;
  images: { src: string; caption?: string }[];
  selected: number;
  setSelected: (index: number) => void;
}) => {
  return (
    <div className="row-span-1 flex gap-2 overflow-x-scroll">
      {images.map((image, index) => (
        <button
          onClick={() => setSelected(index)}
          key={index}
          className={cn(
            "group relative h-full w-40 shrink-0 overflow-hidden rounded-lg transition-opacity",
          )}
        >
          <Image
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              {
                "brightness-50": selected === index,
              },
            )}
            fill
            sizes="10rem"
            quality={5}
            key={index}
            src={image.src}
            alt={image.caption || fallbackCaption}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-white p-1 text-center text-black">
              {index + 1}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
