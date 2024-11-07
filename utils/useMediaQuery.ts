"use client"
import { useState, useEffect } from "react";

const toPixel = (query: TailwindQueries) => {
    const breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
    };
    return breakpoints[query as keyof typeof breakpoints] || query;
}

const toFontSize = (query: TailwindQueries): number => {
    const fontSizes = {
        'xs': 12,    // 0.75rem
        'sm': 14,    // 0.875rem
        'base': 16,  // 1rem
        'lg': 18,    // 1.125rem
        'xl': 20,    // 1.25rem
        '2xl': 24,   // 1.5rem
        '3xl': 30,   // 1.875rem
        '4xl': 36,   // 2.25rem
        '5xl': 48,   // 3rem
        '6xl': 60,   // 3.75rem
        '7xl': 72,   // 4.5rem
        '8xl': 96,   // 6rem
        '9xl': 128   // 8rem
    };

    return fontSizes[query as keyof typeof fontSizes] ||
        parseInt(query as string) ||
        16; // default fallback
};


const convertFromTailwind = (query: TailwindQueries) => {
    switch (query) {
        case "sm":
            return "(min-width: 640px)";
        case "md":
            return "(min-width: 768px)";
        case "lg":
            return "(min-width: 1024px)";
        case "xl":
            return "(min-width: 1280px)";
        case "2xl":
            return "(min-width: 1536px)";
        default:
            return query;
    }
}

const useMediaQuery = (query: TailwindQueries) => {
    query = convertFromTailwind(query);
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
};

export {
    useMediaQuery, toPixel, toFontSize
};