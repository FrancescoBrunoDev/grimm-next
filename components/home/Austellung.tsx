"use client";
import { useState } from "react";
import Link from "next/link";
import { FitTitle } from "@/components/FitTitle";
import Image from "next/image";

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
      className="mx-auto flex h-screen w-screen max-w-screen-xl items-center px-8 py-12 md:py-12"
    >
      <div className="flex w-full flex-col items-start">
        <FitTitle
          words={["Ausstellungsräume"]}
          size="md"
          fontstyle="regular"
          className="mx-0"
        />
        <div className="flex w-full">
          <ul className="flex h-56 items-center gap-2 overflow-x-auto">
            {expositions.map(({ title, img, href }, index) => {
              let pushBack = false;
              if (idHover !== false && idHover !== index) pushBack = true;

              return (
                <li
                  key={index}
                  onMouseEnter={() => setIdHover(index)}
                  onMouseLeave={() => setIdHover(false)}
                  className={`group relative h-40 w-64 shrink-0 transition-all hover:h-48 hover:w-72 ${pushBack && "opacity-50"}`}
                >
                  <Image
                    className="rounded-xl object-cover"
                    fill
                    quality={50}
                    src={img}
                    alt={title}
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-background to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <Link href={href} className="relative block size-full">
                    <p className="absolute inset-x-0 bottom-0 hidden p-2 text-4xl font-bold uppercase group-hover:z-10 group-hover:block">
                      {title}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
