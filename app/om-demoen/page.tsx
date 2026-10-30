import type { Metadata } from "next";
import Link from "next/link";
import { Etikett, Knapp, SideTopp } from "@/components/Felles";

export const metadata: Metadata = {
  title: "Om demoen",
  description: "TK Studio finnes ikke. Siden er laget av Lilit Labs for å vise hva en frisørsalong kan få.",
};

// Skrevet ut fra hva salongen får, ikke hvordan det er bygd.
const punkter = [
  {
    tittel: "Ser ut som salongen",
    tekst: "Fargene, vinklene og lyset er hentet fra interiøret og logoen. Siden kunne ikke tilhørt noen andre.",
    href: "/",
  },
  {
    tittel: "Bilder som selger",
    tekst: "Kundene velger frisør med øynene. Galleriet kan filtreres, så den som vil ha rødt eller fade, finner det med en gang.",
    href: "/frisyrer",
  },
  {
    tittel: "Åpne priser",
    tekst: "Alle priser står ett sted og hentes derfra overalt. Færre telefoner som bare handler om hva ting koster.",
    href: "/priser",
  },
  {
    tittel: "Timebestilling",
    tekst: "Behandling, frisør og tid på under ett minutt. På en ekte side kobles den til bookingsystemet salongen allerede bruker.",
    href: "/bestill-time",
  },
  {
    tittel: "Frekk, men lesbar",
    tekst: "Sterke farger og store ord, men all tekst har god kontrast, og alt kan brukes med tastatur og stor zoom. Bevegelse stopper for dem som har slått det av.",
    href: "/",
  },
  {
    tittel: "Laget for mobilen",
    tekst: "De fleste finner frisøren sin på telefonen, gjerne fra Instagram. Siden er bygd for mobil først.",
    href: "/",
  },
];

export default function OmDemoen() {
  return (
    <>
      <SideTopp etikett="Om demoen" tittel={<>En salong som <span className="neonord">ikke finnes</span></>}>
        <p>
          TK Studio er laget av Lilit Labs for å vise hva en frisørsalong kan få: en side med like mye personlighet som salongen selv.
        </p>
        <p>
          Salongen, personene, prisene og adressen er oppdiktet, og bildene er laget med KI. På en ekte side kommer all tekst, alle
          priser og bilder fra salongen.
        </p>
      </SideTopp>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <section aria-labelledby="viser-tittel">
          <Etikett>Seks grep</Etikett>
          <h2 id="viser-tittel" className="mt-4 text-[clamp(2.25rem,4.25vw,3rem)]">
            Dette viser siden
          </h2>
          <ol className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {punkter.map((p, i) => (
              <li key={p.tittel} className="glid flex flex-col border-t-2 border-hvit pt-5">
                <span aria-hidden="true" className="tall text-[1.25rem] text-lavendel">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-[2.5rem]">{p.tittel}</h3>
                <p className="mt-3 flex-1 text-gra">{p.tekst}</p>
                <Link href={p.href} className="lenke mt-4 self-start py-1">
                  Se det på siden
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="lilit-tittel" className="kutt-hjorne mt-28 bg-fuksia px-6 py-14 sm:px-12">
          <Etikett farge="text-hvit">Lilit Labs</Etikett>
          <h2 id="lilit-tittel" className="mt-4 max-w-3xl text-[clamp(2.25rem,3.75vw,2.75rem)]">
            Vil du ha noe lignende for din salong?
          </h2>
          <p className="mt-5 max-w-prose text-[1.1875rem]">
            Lilit Labs er en liten nettsidebedrift i Hønefoss. Vi starter alltid med en prat om salongen og kundene deres.
          </p>
          <div className="mt-8">
            <Knapp href="https://lilitlabs.com">
              Ta kontakt med Lilit Labs
            </Knapp>
          </div>
        </section>

        <section aria-labelledby="tekst-tittel" className="mt-24 max-w-prose">
          <h2 id="tekst-tittel" className="text-[2.25rem]">
            Større tekst
          </h2>
          <p className="mt-4 text-gra">
            Hold inne Ctrl og trykk på pluss for å gjøre alt større. På Mac bruker du Cmd og pluss. På mobilen kan du knipe ut med to
            fingre. Siden er laget for å tåle det.
          </p>
        </section>
      </div>
    </>
  );
}
