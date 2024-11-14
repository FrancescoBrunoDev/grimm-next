"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useMediaQuery } from "@/utils/useMediaQuery";
import Image from "next/image";
import { useInView, cn } from "@/utils/utils";

export const About = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isSmallScreen = !useMediaQuery("md");

  const { ref, isInView } = useInView({
    threshold: 0.5,
    once: true,
    rootMargin: "10%",
  });

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  // if smallScreen become true then set the isOpen to false
  useEffect(() => {
    if (isSmallScreen) {
      setIsOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <section
      ref={ref}
      id="about"
      className="mx-auto flex w-screen max-w-screen-xl items-center px-4 md:h-screen md:px-8 md:py-12"
    >
      <div
        className={cn(
          "display items-center gap-8 rounded-xl bg-primary px-4 py-4 text-background md:flex md:flex-row md:bg-transparent md:p-0 md:px-8 md:text-primary",
        )}
      >
        <div
          className={cn(
            "hidden h-[25rem] w-72 shrink-0 overflow-hidden rounded-lg lg:block",
            "transition-all duration-1000",
            {
              "translate-x-0 opacity-100": isInView,
              "-translate-x-5 opacity-0": !isInView,
            },
          )}
        >
          <Image
            className="object-cover"
            src="/img/Home_Page/NLGrimm_V_Zweite_Suite_04.jpeg"
            alt="Grimm Zweite Suite Cover"
            fill
            priority={true}
            sizes="30vw"
            quality={50}
          />
        </div>
        <div
          onClick={isSmallScreen ? toggleOpen : undefined}
          className={`md:grid md:grid-cols-2 md:gap-8 ${isSmallScreen && "height-auto opacity-100"}`}
        >
          <p
            className={cn(
              "font-regularBold text-balance",
              "transition-all delay-75 duration-1000",
              {
                "line-clamp-1": isSmallScreen && !isOpen,
                "translate-x-0 opacity-100": isInView,
                "translate-x-5 opacity-0": !isInView,
              },
            )}
          >
            {isSmallScreen && (
              <span className="flex w-full justify-center">
                <ChevronUp className={`transition ${isOpen && "rotate-180"}`} />
              </span>
            )}
            Die digitale Ausstellung möchte anhand von Briefen, Fotografien,
            Musikhandschriften, Konzertprogrammen und zahlreichen weiteren
            Objekten das wechselvolle Leben des Komponisten und Dirigenten
            Julius Otto Grimm (1827–1903) anschaulich machen. In Grimm sei die
            „Gelehrten- und Künstlernatur in vollendeter Weise vereinigt“ – so
            der Geiger Richard Barth über seinen langjährigen Freund und
            Musikerkollegen. Im Unterschied zu Johannes Brahms, mit dem Grimm
            seit dem Jahre 1853 ebenfalls eine enge Freundschaft verband, sei
            Grimms Name freilich „nicht so sieghaft in die weite Welt gedrungen,
            wie wäre das aber auch möglich gewesen bei einem Künstler, der sich
            in seinem ganzen Leben stets in vornehmer Bescheidenheit
            zurückgehalten und nie den Ehrgeiz gehabt hat, die Welt mit seinem
            lauten Ruhme zu erfüllen.“
            <br />
            Aufgrund seiner vorbehaltlosen Brahms-Verehrung titulierte ihn die
            Nachwelt gar scherzhaft als den „Oberbrahmser“. Grimm, der aus dem
            livländischen Pernau stammte und am Leipziger Konservatorium
            ausgebildet wurde, war im Jahre 1860 Mitunterzeichner der „Erklärung
            gegen die Neudeutschen“.
            <br />
            <br />
          </p>
          {(isSmallScreen && isOpen) || !isSmallScreen ? (
            <p
              className={cn(
                "font-regularBold text-balance",
                "transition-all delay-150 duration-1000",
                {
                  "translate-x-0 opacity-100": isInView,
                  "translate-x-5 opacity-0": !isInView,
                },
              )}
            >
              Während seiner Zeit in Münster führte er zahlreiche Kompositionen
              von Brahms auf und widmete ihm seine Zweite Suite in Canonform op.
              16. Gleichwohl war Grimm, der von seinen Freunden liebevoll „Ise“
              genannt wurde, eine Musikerpersönlichkeit mit durchaus eigenem
              Profil. Und so möchte die digitale Schau einerseits die
              Eingebundenheit in ein namhaftes Künstlernetzwerk (Clara Schumann,
              Julius Stockhausen, Joseph und Amalie Joachim u. a.) aufzeigen und
              die damit einhergehende musikästhetische Verortung und
              Identifikation verdeutlichen. Anderseits soll aber auch seine
              ebenso unstrittige künstlerische Individualität in den Fokus
              gerückt werden. Die Exponate gewähren spannende Einblicke in ein
              Künstlerleben, das neben familiären und beruflichen Glücksmomenten
              auch schwere Schicksalsschläge bereithielt. In den ausgewählten
              Schriftstücken kann virtuell „geblättert“ und gelesen werden. Und
              dies sei nachdrücklich empfohlen: Grimm war nämlich ein Komponist,
              der ironisch und gewandt zu schreiben verstand.
              <br />
              <br />
              Münster, Oktober 2022
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default About;
