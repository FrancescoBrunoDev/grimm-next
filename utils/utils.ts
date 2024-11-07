"use client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef, useState } from "react";
import { toFontSize } from "@/utils/useMediaQuery";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface UseFitTextOptions {
  forceSingleLine?: boolean;
  height?: number;
  maxFontSize?: TailwindQueries | number;
}

export const useFitText = ({
  forceSingleLine = false,
  height = 0.8,
  maxFontSize = 1000 // valore predefinito
}: UseFitTextOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState("16px");
  const [lineHeight, setLineHeight] = useState("1.2");

  useEffect(() => {
    const resizeText = () => {
      if (ref.current) {
        const parentWidth = ref.current.parentElement?.offsetWidth || 0;
        let newFontSize = 16;
        ref.current.style.fontSize = `${newFontSize}px`;

        if (forceSingleLine) {
          ref.current.style.whiteSpace = "nowrap";
        }

        while (ref.current.scrollWidth <= parentWidth && newFontSize < (
          typeof maxFontSize === 'string' ? toFontSize(maxFontSize) : maxFontSize
        )) {
          newFontSize += 1;
          ref.current.style.fontSize = `${newFontSize}px`;
        }

        while (ref.current.scrollWidth > parentWidth && newFontSize > 1) {
          newFontSize -= 1;
          ref.current.style.fontSize = `${newFontSize}px`;
        }

        setFontSize(`${newFontSize}px`);
        setLineHeight(`${newFontSize * height}px`);
      }
    };

    resizeText();
    window.addEventListener("resize", resizeText);
    return () => window.removeEventListener("resize", resizeText);
  }, [forceSingleLine, maxFontSize]);

  return { ref, fontSize, lineHeight };
};

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animationKey?: string;
}

export const useInView = ({
  threshold = 0,
  rootMargin = '0px',
  once = false,
}: UseInViewOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once && !hasPlayed.current) {
            hasPlayed.current = true;
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
};