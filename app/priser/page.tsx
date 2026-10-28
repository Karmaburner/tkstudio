import type { Metadata } from "next";
import { Foto, Knapp, SideTopp } from "@/components/Felles";
import { kategorier, tillegg } from "@/lib/salong";

export const metadata: Metadata = {
  title: "Priser",
  description: "Alle priser hos TK Studio: klipp, herre, farge og styling. Du får vite hva det koster før vi begynner.",
};

// Prislisten som plakat: store tall, tykke streker, ingen tabellkant.
export default function Priser() {
  return (
    <>
      <SideTopp etikett="Priser" tittel={<>Ingen <span className="text-lavendel">overraskelser</span></>}>
        <p>
          Prisene gjelder vanlig lengde. Har du veldig langt eller tykt hår, sier vi fra før vi begynner. Står det «fra», får du en
          fast pris i stolen.
        </p>
      </SideTopp>

      <div className="mx-auto max-w-7xl space-y-28 px-4 sm:px-6">
        {kategorier.map((k, i) => (
          <section
            key={k.slug}
            id={k.slug}
            aria-labelledby={`${k.slug}-tittel`}
            className="grid scroll-mt-8 gap-10 lg:grid-cols-12"
          >
            <div className={`lg:col-span-4 ${i % 2 ? "kutt-venstre lg:order-last" : "kutt-hoyre"}`}>
              <Foto bilde={k.bilde} className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="lg:col-span-8">
              <div className="flex items-baseline gap-5">
                <span aria-hidden="true" className="tall text-[1.5rem] text-lavendel">
                  0{i + 1}
                </span>
                <h2 id={`${k.slug}-tittel`} className="text-[clamp(4rem,12vw,9rem)]">
                  {k.tittel}
                </h2>
              </div>
              <p className="mt-3 max-w-prose text-[1.1875rem] text-gra">{k.ingress}</p>
              <ul className="mt-8 border-t-4 border-neon">
                {k.behandlinger.map((b) => (
                  <li key={b.navn} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b-2 border-linje py-4">
                    <div>
                      <h3 className="text-[clamp(1.75rem,4vw,2.5rem)]">{b.navn}</h3>
                      <p className="mt-1 text-gra">
                        <span className="tall">{b.tid}</span>
                        {b.merknad && <> · {b.merknad}</>}
                      </p>
                    </div>
                    <p className="tall text-right text-[clamp(1.75rem,4vw,2.75rem)] leading-none">
                      {b.pris.startsWith("fra") && <span className="mr-2 font-sans text-[1rem] font-normal text-gra">fra</span>}
                      {b.pris === "0" ? (
                        "Gratis"
                      ) : (
                        <>
                          {b.pris.replace("fra ", "")}
                          <span className="ml-1 text-[1rem] text-gra">kr</span>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Tillegg uten bilde: en rolig liste, for den skal bare leses. */}
        <section id="tillegg" aria-labelledby="tillegg-tittel" className="scroll-mt-8 lg:ml-[33.333%] lg:pl-10">
          <h2 id="tillegg-tittel" className="text-[clamp(3rem,8vw,5.5rem)]">
            Tillegg
          </h2>
          <p className="mt-3 max-w-prose text-[1.1875rem] text-gra">Legges til en annen behandling. Kan ikke bestilles alene.</p>
          <ul className="mt-8 border-t-4 border-lavendel">
            {tillegg.map((b) => (
              <li key={b.navn} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b-2 border-linje py-4">
                <div>
                  <h3 className="text-[clamp(1.75rem,4vw,2.5rem)]">{b.navn}</h3>
                  <p className="mt-1 text-gra">
                    <span className="tall">{b.tid}</span>
                    {b.merknad && <> · {b.merknad}</>}
                  </p>
                </div>
                <p className="tall text-right text-[clamp(1.75rem,4vw,2.75rem)] leading-none">
                  <span className="mr-1 text-[1rem] text-gra">+</span>
                  {b.pris}
                  <span className="ml-1 text-[1rem] text-gra">kr</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap items-center gap-6 border-t-2 border-hvit pt-10">
          <p className="smal text-[clamp(2.5rem,6vw,4rem)] leading-none">Usikker på hva du trenger?</p>
          <Knapp href="/bestill-time?behandling=Konsultasjon">Bestill en gratis prat</Knapp>
        </div>
      </div>
    </>
  );
}
