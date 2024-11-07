"use client";
import { useFitText, cn } from "@/utils/utils";

interface FitTitleProps {
  words: string[];
  className?: string;
  fontstyle?: "elegant" | "regular";
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  height?: number;
}

export const FitTitle = ({
  words,
  className,
  fontstyle,
  size,
  height,
}: FitTitleProps) => {
  // Creare refs separati per ogni parola
  const firstRef = useFitText({ forceSingleLine: true, height });
  const secondRef = useFitText({ forceSingleLine: true, height });
  const thirdRef = useFitText({ forceSingleLine: true, height });
  const fourthRef = useFitText({ forceSingleLine: true, height });
  const fifthRef = useFitText({ forceSingleLine: true, height });

  // Array di refs pre-calcolato
  const textRefs = [firstRef, secondRef, thirdRef, fourthRef, fifthRef].slice(
    0,
    words.length,
  );

  return (
    <div
      className={cn(
        "z-10 mx-auto flex w-full flex-col",
        "uppercase",
        {
          // manage the size
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-screen-2xl": size === "2xl",
          "font-regular font-bold": fontstyle === "regular",
          "font-elegant": fontstyle === "elegant",
        },
        className,
      )}
    >
      {words.map((word, index) => (
        <div
          key={index}
          ref={textRefs[index].ref}
          style={{
            fontSize: textRefs[index].fontSize,
            lineHeight: textRefs[index].lineHeight,
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};
