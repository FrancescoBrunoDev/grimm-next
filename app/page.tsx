import { Main } from "@/components/home/Main";
import { Projekt } from "@/components/home/Projekt";
import { About } from "@/components/home/About";
import { Austellung } from "@/components/home/Austellung";
import { Impressum } from "@/components/home/Impressum";

export default function Home() {
  return (
    <>
      <main className="h-screen snap-y overflow-y-scroll lg:snap-mandatory">
        <div className="lg:snap-center lg:snap-always">
          <Main />
        </div>
        <div className="lg:snap-center lg:snap-always">
          <Projekt />
        </div>
        <div className="lg:snap-center lg:snap-always">
          <About />
        </div>
        <div className="snap-center snap-always">
          <Austellung />
        </div>
        <div className="lg:snap-center lg:snap-always">
          <Impressum />
        </div>
      </main>
    </>
  );
}
