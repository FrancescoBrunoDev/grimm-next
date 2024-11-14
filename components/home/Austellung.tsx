"use client";
import { useState } from "react";
import Link from "next/link";
import { FitTitle } from "@/components/FitTitle";
import Image from "next/image";
import { cn } from "@/utils/utils";

export const Austellung = () => {
  const [idHover, setIdHover] = useState<boolean | number>(false);

  const expositions = [
    {
      title: "Lebensstationen",
      img: "/img/Home_Page/Raum0001.jpeg",
      href: "/ausstellung/Ein_bewegtes_Musikerleben",
    },
    {
      title: "Brahms",
      img: "/img/Home_Page/Raum0002.jpeg",
      href: "/ausstellung/Brahms",
    },
    {
      title: "Künstlernetzwerk",
      img: "/img/Home_Page/Raum0003.jpeg",
      href: "/ausstellung/Kuenstler_Netzwerk",
    },
    {
      title: "Der Komponist & Bearbeiter",
      img: "/img/Home_Page/Raum0004.jpeg",
      href: "/ausstellung/Der_komponist",
    },
    {
      title: "Historischer Stadtrundgang",
      img: "/img/Home_Page/Raum0007.jpeg",
      href: "/ausstellung/Grimm_in_Muenster",
    },
  ];

  return (
    <section
      id="austellung"
      className="mx-auto flex h-screen w-screen max-w-screen-xl items-center px-4 py-12 md:px-8 md:py-12"
    >
      <div className="flex w-full flex-col items-start gap-4">
        <FitTitle
          words={["Ausstellungsräume"]}
          size="md"
          fontstyle="regular"
          className="mx-0"
        />
        <div className="flex w-full">
          <ul className="flex w-full flex-col items-center gap-2 md:h-56 md:flex-row md:overflow-x-auto">
            {expositions.map(({ title, img, href }, index) => {
              let pushBack = false;
              if (idHover !== false && idHover !== index) pushBack = true;

              return (
                <li
                  key={index}
                  onMouseEnter={() => setIdHover(index)}
                  onMouseLeave={() => setIdHover(false)}
                  className={cn(
                    `group relative h-40 w-full shrink-0 overflow-hidden rounded-xl transition-all md:w-64 md:hover:h-48 md:hover:w-72`,
                    { "opacity-50": pushBack },
                  )}
                >
                  <Link href={href} className="absolute inset-0">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background to-transparent opacity-100 transition-opacity md:opacity-50 md:group-hover:opacity-100" />
                    <Image
                      className="object-cover"
                      fill
                      quality={50}
                      src={img}
                      alt={title}
                    />
                  </Link>
                  <p className="absolute inset-x-0 bottom-0 z-10 p-2 text-2xl font-bold uppercase md:hidden md:text-4xl md:group-hover:block">
                    {title}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
