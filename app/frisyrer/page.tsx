import type { Metadata } from "next";
import { Suspense } from "react";
import { Galleri } from "@/components/Galleri";
import { GalleriFraLenke } from "@/components/GalleriFraLenke";
import { Knapp, SideTopp } from "@/components/Felles";

export const metadata: Metadata = {
  title: "Frisyrer",
  description: "Sterke farger, balayage, bob, pixie, herreklipp og oppsatt hår. Finn noe du liker og vis det til frisøren.",
};

export default function Frisyrer() {
  return (
    <>
      <SideTopp etikett="Frisyrer" tittel={<>Finn din <span className="neonord">neste look.</span></>}>
        <p>
          Ta et skjermbilde av den du liker og vis det til oss. Vi sier ærlig hva som passer håret ditt og hva det vil koste.
        </p>
      </SideTopp>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* Den statiske siden viser galleriet lukket. En frisyre fra lenken åpnes i nettleseren. */}
        <Suspense fallback={<Galleri />}>
          <GalleriFraLenke />
        </Suspense>
        <div className="mt-28 flex flex-wrap items-center gap-6 border-t-2 border-hvit pt-10">
          <p className="smal text-[clamp(2.5rem,6vw,4rem)] leading-none">Fant du en?</p>
          <Knapp href="/bestill-time">Bestill time</Knapp>
        </div>
      </div>
    </>
  );
}
