"use client";
import { FitTitle } from "@/components/FitTitle";
import { Hero } from "@/components/Hero";
import { Content } from "@/components/Content";
import { useEffect, useRef, useState } from "react";
import { cn, useInView } from "@/utils/utils";
import {
  ImgDots,
  ImgDotsDescription,
  ImgDotsImage,
} from "@/components/ImgDots";
import dotsOnMap from "./dotsOnMap.json";

export default function Grimm_in_Muenster() {
  const { ref, isInView } = useInView({});

  return (
    <div className="hidden sm:block">
      <Hero
        className={cn(`fixed h-screen transition-all duration-700`, {
          "scale-90 opacity-20 blur-lg": isInView,
        })}
      >
        <FitTitle
          words={["Grimm in", "Münster"]}
          size="lg"
          fontstyle="elegant"
          height={1.05}
        />
      </Hero>
      <ScrollPath />
      <Content className="flex h-[300vh] flex-col">
        <div className="h-screen" />
        <div className="h-screen">
          <div className="z-20 flex flex-col gap-4 bg-black/60 p-6 backdrop-blur-xl">
            <p>
              Im letzten Ausstellungsraum sind die Umrisse eines historischen
              Stadtplanes von Münster zu sehen. Die roten Markierungen verweisen
              auf zentrale Orte, die mit Grimms Person verknüpft sind. Es
              handelt sich dabei einerseits um die wechselnden Wohnorte der
              Familie, andererseits um die wichtigsten Wirkungsstätten des
              Dirigenten und Musikers. Sodann wird über die noch heute im
              Stadtbild sichtbaren Grimm-Gedenkorte informiert.
            </p>

            <p>
              „Das eigene Haus bezog Grimm erst nach 14jähriger Wirksamkeit in
              Münster. Seine erste Wohnung war auf dem Bült bei Metzger
              Schwarte. Der Bült war damals und ist heute noch ein Stück
              Mittelalter, kleine Häuschen in einer engen Straße. Grimm erzählte
              später manchmal mit Ergötzen, wie ein vornehmer Herr ihn dort
              aufsuchen wollte und, ratlos zwischen den Häuschen stehend,
              ausrief: ‚Wo kann hier ein Musikdirektor wohnen!&apos; Von 1868 an
              wohnte Grimm am Bispinghof beim Maurer-Meister Barring – nicht
              viel komfortabler –, von 1871 an am Krummen Timpen, bis er 1874 in
              sein eigenes Haus zog, das er sich aus der klingenden Frucht der
              ‚lieben nahrungsspendenden Stundenquälerei&apos; erbaut hatte.
              […]&quot;
            </p>

            <p className="text-right text-sm italic">
              aus: Franz Ludwig: Julius Otto Grimm. Ein Beitrag zur Geschichte
              der musikalischen Spätromantik, Bielefeld und Leipzig 1925, S. 99.
            </p>
          </div>
        </div>
      </Content>
      <Content
        ref={ref}
        className={cn(
          "flex h-screen items-center justify-center transition-all",
        )}
      >
        <div className="fixed inset-0 mt-10 flex items-center justify-center">
          <ImgDots
            className={cn(
              "max-h-screen max-w-screen-xl gap-10 p-20 transition-all duration-700",
              {
                "scale-95 opacity-0": !isInView,
                "scale-100 opacity-100": isInView,
              },
            )}
            data={dotsOnMap}
          >
            <ImgDotsImage dotColor="red-700" />
            <ImgDotsDescription />
          </ImgDots>
        </div>
      </Content>
    </div>
  );
}

const ScrollPath = ({ className }: { className?: string }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [viewBox, setViewBox] = useState("0 0 1004.6 1345.5");

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const bbox = path.getBBox();
    setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

    const length = path.getTotalLength();
    // Imposta strokeDasharray inizialmente a "0 length"
    path.style.strokeDasharray = `0 ${length}`;
    path.style.strokeDashoffset = "0";

    const handleScroll = () => {
      const scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);

      // Calcola la lunghezza visibile del percorso in base allo scroll
      const visibleLength = length * Math.min(1, scrollPercentage / 0.7);
      path.style.strokeDasharray = `${visibleLength} ${length}`;

      // Resto del codice per gestire la larghezza della linea
      if (scrollPercentage >= 0 && scrollPercentage <= 0.7) {
        const fadeValue = 1 - scrollPercentage / 0.7;
        path.style.strokeWidth = 7 * fadeValue + "px";
      } else {
        path.style.strokeWidth = "0px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 h-screen w-full",
        className,
      )}
    >
      <svg
        viewBox={viewBox}
        className="h-full w-full"
        preserveAspectRatio="xMidYMin meet"
      >
        <path
          ref={pathRef}
          className="fill-none stroke-red-700"
          style={{ strokeWidth: "7px" }}
          d="m 500.3,43.4 v 272.8 c 1.7,56.8 0.7,69.1 -16,79.6 -33.2,20.7 -46.6,16.1 -57.8,32.2 -11.5,16.5 3.8,28.2 -10.1,46 -22,28.4 -19.5,29.6 -28.5,30.5 -9.7,1 -20.1,-12.7 -33.1,-10.3 -17.2,3.2 -15.9,24.6 -23.4,27.6 -14.3,5.7 -14.2,-11.9 -29.1,-11.2 -10.5,0.5 -4.8,7.5 -23.3,10.1 -17.8,2.4 -13.8,-13 -43.5,-4.4 -15.4,4.4 -15.7,22.4 -15.5,24.4 7.4,53.1 -58.8,30.8 -55.8,76.3 1.6,24.9 52.1,34.3 49.7,85.6 -1.5,31.3 -74.8,30.7 -95.6,60.9 -25.5,36.9 13.2,174.8 86.6,191.8 18.7,4.3 65.4,-17.7 112,-69.7 33,-36.7 47.7,-36.4 67.1,-39.3 40,-6.1 96,4.2 116.5,39.2 11.7,19.9 4.7,35.8 17.6,43.2 16.4,9.4 34.8,-12.6 70.2,-18.4 37,-6.1 52,12.1 82.2,15.2 67.7,6.9 128.1,-70.7 152.4,-101.9 18.2,-23.4 73.2,-100.7 68.3,-206.9 -1,-22.4 -4.4,-79.2 -42.3,-131.6 -19.8,-27.4 -70.5,-75.8 -95.9,-66.6 -12.1,4.4 -11.4,19.4 -28.7,32.6 -25.8,19.7 -59,14 -68,12.7 -42.8,-6.4 -51.2,-28 -56.7,-35.9 -0.7,-1.1 -1.4,-2.1 -2.1,-3.1 -14.4,-22.5 -40.4,-64.2 -84.7,-9.8 -182.8,225 -12.4,388 -12.4,561 0,169.7 0.2,259.9 0,325.5"
        />
      </svg>
    </div>
  );
};
