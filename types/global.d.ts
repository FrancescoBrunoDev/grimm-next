type Gallery = {
    id: number;
    title: string;
    cover: string;
    caption: string | null;
    images: { src: string; caption: string | null }[];
}

type ImgDots = {
    id: number;
    src: string;
    alt: string;
    dots: {
        x: number;
        y: number;
        paragraph: {
            title: string;
            text: string;
            sideImg?: boolean;
            galleryIds?: {
                title: string;
                cover: string;
            }[];
        };
    }[];
}

type Specials = "ImgDots";

interface Window {
    webkitAudioContext: typeof AudioContext;
}

type TailwindQueries =
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | string;