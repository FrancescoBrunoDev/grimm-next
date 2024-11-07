"use client";
import { Hero } from "@/components/Hero";
import { Content } from "@/components/Content";
import ThreeModel from "@/utils/threeModel.jsx";
import { TimeLine } from "@/app/ausstellung/Ein_bewegtes_Musikerleben/Timeline";
import { FitTitle } from "@/components/FitTitle";
import { cn, useInView } from "@/utils/utils";

export default function Ein_bewegtes_Musikerleben() {
  const { ref, isInView } = useInView({
    threshold: 0.5,
    once: true,
    rootMargin: "10%",
  });
  return (
    <>
      <Hero ref={ref}>
        <Content size="xl" className="relative gap-24">
          <FitTitle
            words={["Ein bewegtes", "Musikerleben"]}
            fontstyle="elegant"
            size="xl"
            className={cn("transition-all delay-[100ms] duration-[2000ms]", {
              "opacity-100 blur-none": isInView,
              "opacity-0 blur-sm": !isInView,
            })}
          />
          <div className="flex w-full">
            <div
              className={cn(
                "flex flex-col gap-4 place-self-start",
                "transition-all delay-[1500ms] duration-[1500ms]",
                {
                  "translate-y-0 opacity-100": isInView,
                  "translate-y-4 opacity-0": !isInView,
                },
              )}
            >
              <h3 className="text-2xl font-bold">Lebensstationen</h3>
              <p className="text-justify lg:max-w-sm">
                Die Ausstellung lenkt zunächst den Blick auf die wesentlichen
                Lebensstationen von Julius Otto Grimm. Sie thematisiert etwa
                sein Wirken als Hauslehrer in St. Petersburg, behandelt die
                prägende Ausbildungszeit in Leipzig und widmet sich schließlich
                der längeren Phase von der Familiengründung bis zur beruflichen
                Etablierung (Göttingen und Münster). Die Schau dokumentiert aber
                nicht nur den Werdegang Grimms, sie spürt auch seinem Nachruhm
                nach.
              </p>
            </div>
            <div
              className={cn(
                "pointer-events-none hidden h-52 flex-1 items-center justify-center lg:flex",
                "transition-all delay-[3000ms] duration-[1500ms]",
                {
                  "opacity-100": isInView,
                  "opacity-0": !isInView,
                },
              )}
            >
              <ThreeModel
                modelPath="/img/1/model/Grimm-semplificato.glb"
                cameraPosition={[2, 0, 2.4]}
                autoRotate={true}
                enableZoom={false}
                className="h-[40rem] w-[35rem]"
                modelPosition={[0, -1.3, 0]}
                modelRotation={[0, Math.PI / 4, 0]}
                modelScale={[0.8, 0.8, 0.8]}
              />
            </div>
          </div>
        </Content>
      </Hero>
      <Content>
        <TimeLine />
      </Content>
    </>
  );
}
