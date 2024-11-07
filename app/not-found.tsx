import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <Hero>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">Nicht Gefunden</h2>
        <p>Konnte die angeforderte Ressource nicht finden</p>
        <Button text="Zurück zur Startseite" color="white" href="/" />
      </div>
    </Hero>
  );
}
