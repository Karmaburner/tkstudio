import type { Metadata } from "next";
import { SideTopp } from "@/components/Felles";
import { salong } from "@/lib/salong";
import { Bestilling } from "./Bestilling";

export const metadata: Metadata = {
  title: "Bestill time",
  description: "Velg behandling, frisør og tid. Det tar under ett minutt.",
};

export default function BestillTime() {
  return (
    <>
      <SideTopp etikett="Bestill time" tittel={<>Sett deg <span className="text-lavendel">i stolen</span></>}>
        <p>
          Fire valg og du er ferdig. Vil du heller snakke med noen, ring{" "}
          <a href={`tel:${salong.telefonLenke}`} className="lenke tall">
            {salong.telefon}
          </a>
          .
        </p>
      </SideTopp>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Bestilling />
      </div>
    </>
  );
}
