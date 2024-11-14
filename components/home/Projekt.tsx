"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView, cn } from "@/utils/utils";

export const Projekt = () => {
  const { ref, isInView } = useInView({
    threshold: 0.5,
    once: true,
    rootMargin: "10%",
  });

  return (
    <section
      id="projekt"
      ref={ref}
      className="mx-auto flex w-screen max-w-screen-lg items-center px-8 py-12 md:h-screen md:py-12"
    >
      <div className="flex flex-row items-center gap-8">
        <div
          className={cn(
            "hidden h-[35rem] w-96 shrink-0 overflow-hidden rounded-lg lg:block",
            "transition-all duration-1000",
            {
              "translate-x-0 opacity-100": isInView,
              "-translate-x-5 opacity-0": !isInView,
            },
          )}
        >
          <Image
            className="size-full object-cover"
            src="/img/Home_Page/Grimm_Julius_05_1316.jpg"
            alt="Frase"
            fill
            sizes="30vw"
            priority={true}
            quality={50}
          />
        </div>

        <p
          className={cn(
            "font-regularBold text-balance opacity-0",
            "transition-all duration-1000",
            {
              "translate-x-0 opacity-100": isInView,
              "translate-x-5 opacity-0": !isInView,
            },
          )}
        >
          Die Online-Ausstellung ist Teil eines größeren{" "}
          <Link href="https://www.uni-muenster.de/Musikwissenschaft/Forschung/juliusottogrimm.html">
            Forschungs- und Lehrprojektes
          </Link>{" "}
          zu Julius Otto Grimm am Institut für Musikwissenschaft der Universität
          Münster. Das Projekt wird von PD Dr. Peter Schmitz und Anna Maria
          Plischka, M.A., M.A. geleitet. Nach Lehrveranstaltungen zum
          Grimm-Nachlass im Stadtarchiv Münster (WS 2019/20 und WS 2021/22)
          fanden im Frühjahr und Sommer 2022 u.a. ein studentischer Workshop
          sowie mehrere Grimm-Konzerte statt. Eine{" "}
          <Link href="https://miami.uni-muenster.de/Record/3a6b1381-7f78-41a6-9579-5f97935b1bae">
            Edition der bisher unveröffentlichten Orchesterfassung von Grimms
            Scherzo op. 5 Nr. 2
          </Link>{" "}
          ist durch Maximilian Greshake veröffentlicht worden. Die wichtigsten
          Ergebnisse des Projektes sind ausführlich in dem opulenten Sammelband
          <Link
            href="https://www.waxmann.com/waxmann-buecher/?no_cache=1&tx_p2waxmann_pi2%5Bbuch
										%5D=BUC128739&tx_p2waxmann_pi2%5Baction%5D=show&tx_p2waxmann_pi2%5Bcontrolle
										r%5D=Buch&cHash=8f372def29c0f15bf5463fa41afc31da"
          >
            {" "}
            Julius Otto Grimm - ein Komponist und Dirigent des Brahms-Kreises
            nachzulesen
          </Link>
          .
        </p>
      </div>
    </section>
  );
};
