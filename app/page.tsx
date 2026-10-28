import Link from "next/link";
import { Apningstider } from "@/components/Apningstider";
import { Etikett, Foto, Knapp } from "@/components/Felles";
import { bilder, frisyrer, kategorier, salong, team } from "@/lib/salong";

const laveste = (k: (typeof kategorier)[number]) => k.behandlinger[0].pris.replace("fra ", "");

// Et utvalg til stripa på forsiden. Hele galleriet ligger på /frisyrer.
const utvalg = ["Burgunderbølger", "Rød balayage", "Teksturert fade", "Fuksia bob", "Festfrisyre", "Platina pixie", "Rosa og lilla ombré", "Burgunder bob", "Kobberkrøller"]
  .map((n) => frisyrer.find((f) => f.navn === n)!)
  .filter(Boolean);

export default function Forside() {
  return (
    <>
      {/* ---------- Toppen ---------- */}
      <section aria-labelledby="hero-tittel" className="relative isolate overflow-hidden">
        {/* Bildet åpnes på skrå som et saksekutt. Rett foto inni et skrått panel. */}
        <div className="hero-bilde relative h-[34svh] min-h-60 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
          <Foto bilde={bilder.hero} prioritet sizes="(min-width: 1024px) 62vw, 100vw" className="hero-zoom h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-kull via-kull/30 to-transparent lg:bg-gradient-to-r lg:from-kull lg:via-kull/20" />
          {/* Et rødt saksekutt sveiper over bildet. Bildet skjules aldri, så det teller som vist med en gang (LCP). */}
          <div aria-hidden="true" className="hero-blad pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-[24deg] bg-gradient-to-r from-transparent via-neon/45 to-transparent opacity-0" />
        </div>

        {/* Kjempestor TK i omriss bak teksten. Bare pynt. */}
        <p
          aria-hidden="true"
          className="smal omriss pointer-events-none absolute -left-6 top-[22svh] -z-10 select-none text-[48vw] leading-[0.8] opacity-40 lg:top-auto lg:bottom-[-6vw] lg:text-[34vw]"
        >
          TK
        </p>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 pb-24 pt-2 sm:px-6 lg:min-h-[calc(100svh-4.5rem)] lg:justify-center lg:py-24">
          <div className="hero-opp max-w-2xl">
            <Etikett>Frisøren i {salong.sted}</Etikett>
            <h1 id="hero-tittel" className="mt-10 text-[clamp(4.5rem,15vw,11.5rem)]">
              Hår med <span className="block text-lavendel">mening.</span>
            </h1>
            <p className="mt-6 max-w-md text-[1.25rem] leading-relaxed lg:mt-8">
              Klipp, sterke farger og styling for deg som vil bli lagt merke til. Eller som bare vil ha en klipp som sitter.
            </p>
            <div className="mt-7 flex flex-wrap gap-4 lg:mt-10">
              <Knapp href="/bestill-time">Bestill time</Knapp>
              <Knapp href="/frisyrer" variant="omriss">
                Se frisyrene
              </Knapp>
            </div>
          </div>
        </div>

      </section>

      {/* ---------- Hva vi gjør: trapp av store ord ---------- */}
      <section aria-labelledby="gjor-tittel" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:mt-40">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <Etikett>Det vi gjør</Etikett>
            <h2 id="gjor-tittel" className="mt-4 text-[clamp(3rem,8vw,6rem)]">
              Fire ting. <span className="text-lavendel">Gjort skikkelig.</span>
            </h2>
          </div>
          <p className="max-w-prose text-[1.1875rem] text-gra lg:pb-3">
            Klipp, herre, farge og styling. Fra en enkel stuss til en helt ny farge, og alt innenfor de fire er noe vi kan
            skikkelig. Prisene står åpent, og du får vite hva det koster før vi begynner.
          </p>
        </div>

        <ol className="mt-16 border-t-2 border-hvit">
          {kategorier.map((k, i) => (
            <li key={k.slug} className="glid border-b-2 border-hvit">
              <Link
                href={`/priser#${k.slug}`}
                className="group relative grid items-center gap-x-8 gap-y-2 py-8 sm:grid-cols-[4rem_1fr_auto]"
                style={{ paddingLeft: `min(${i * 7}vw, ${i * 5}rem)` }}
              >
                <span aria-hidden="true" className="tall text-[1.25rem] text-lavendel">
                  0{i + 1}
                </span>
                <span>
                  <span className="smal block text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.85] transition-colors group-hover:text-neon">
                    {k.tittel}
                  </span>
                  <span className="mt-3 block max-w-md text-gra">{k.ingress}</span>
                </span>
                <span className="text-right">
                  <span className="block text-gra">fra</span>
                  <span className="tall text-[2rem] leading-none">kr {laveste(k)}</span>
                </span>
                {/* Bildet dukker opp i et skrått panel ved hover, bare på stor skjerm. */}
                <span
                  aria-hidden="true"
                  className="kutt-venstre pointer-events-none absolute right-48 top-1/2 hidden h-56 w-44 -translate-y-1/2 rotate-3 scale-90 overflow-hidden opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 lg:block"
                >
                  <Foto bilde={{ ...k.bilde, alt: "" }} className="h-full w-full object-cover" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link href="/priser" className="lenke">
            Se hele prislisten
          </Link>
        </p>
      </section>

      {/* ---------- Frisyrer: skrå stripe ---------- */}
      <section aria-labelledby="frisyre-tittel" className="mt-24 lg:mt-40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
          <div>
            <Etikett>Frisyrer</Etikett>
            <h2 id="frisyre-tittel" className="mt-4 text-[clamp(3rem,8vw,6rem)]">
              <span className="tall">26</span> måter å <span className="text-lavendel">bli sett</span> på
            </h2>
          </div>
          <Knapp href="/frisyrer" variant="omriss">
            Se alle frisyrene
          </Knapp>
        </div>

        {/* Kan rulles sidelengs med mus, finger og tastatur (Tab hit, så piltaster). */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Utvalg av frisyrer, kan rulles sidelengs"
          className="mt-14 overflow-x-auto pb-6 [scrollbar-color:var(--color-neon)_transparent]"
        >
          <ul className="skyv flex w-max gap-4 px-4 sm:px-6">
            {utvalg.map((f, i) => (
              <li key={f.navn} className={`w-[15rem] shrink-0 sm:w-[18rem] ${i % 2 ? "mt-16" : ""}`}>
                <figure className="group">
                  <div className="overflow-hidden [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]">
                    <Foto bilde={f.bilde} sizes="18rem" className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <figcaption className="smal mt-3 pl-3 text-[1.625rem] leading-none group-hover:text-neon-tekst">{f.navn}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Teamet ---------- */}
      <section id="teamet" aria-labelledby="team-tittel" className="kutt-begge mt-20 scroll-mt-8 lg:mt-32 bg-fuksia py-[calc(3.5vw+5rem)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Etikett farge="text-hvit">Teamet</Etikett>
          <h2 id="team-tittel" className="mt-4 max-w-5xl text-[clamp(3rem,9vw,7rem)]">
            T for Tiril. K for Kasper. <span className="text-lavendel">Ronja for resten.</span>
          </h2>
          <p className="mt-6 max-w-prose text-[1.1875rem]">
            TK Studio er to frisører som ville ha sin egen salong, og en tredje som de ikke klarte seg uten. Du velger selv hvem du
            vil ha når du bestiller.
          </p>

          <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {team.map((p, i) => (
              <li key={p.slug} className={`glid ${["", "md:mt-28", "md:mt-12"][i]}`}>
                <div className="relative overflow-hidden [clip-path:polygon(0_0,100%_0,100%_88%,82%_100%,0_100%)]">
                  <Foto bilde={p.bilde} className="aspect-[3/4] w-full object-cover" />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-kull/90 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-[4.5rem] leading-none">{p.navn}</h3>
                </div>
                <p className="bred mt-5 text-[0.875rem] text-hvit">{p.rolle}</p>
                <p className="mt-3">{p.tekst}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${p.navn} liker`}>
                  {p.liker.map((l) => (
                    <li key={l} className="bg-kull px-3 py-1 text-[0.9375rem] font-bold">
                      {l}
                    </li>
                  ))}
                </ul>
                <Knapp href={`/bestill-time?frisor=${p.slug}`} variant="lys" className="mt-6">
                  Bestill hos {p.navn}
                </Knapp>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Salongen: asymmetrisk kollasj ---------- */}
      <section id="salongen" aria-labelledby="salong-tittel" className="mx-auto mt-20 max-w-7xl scroll-mt-8 lg:mt-32 px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5 md:pt-10">
            <Etikett>Salongen</Etikett>
            <h2 id="salong-tittel" className="mt-4 text-[clamp(3rem,7vw,5.5rem)]">
              Svart, rødt og <span className="text-lavendel">litt for mye</span> neon
            </h2>
            <p className="mt-6 max-w-prose text-[1.1875rem] text-gra">
              Seks stoler, to vasker og en sofa du ikke vil reise deg fra. Kaffen er god, musikken er høy nok, og ingen spør om du
              skal noe spesielt i helgen.
            </p>
          </div>
          <div className="kutt-venstre md:col-span-7">
            <Foto bilde={bilder.stasjoner} className="aspect-[16/10] w-full object-cover" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="glid md:col-span-4 md:col-start-2 md:mt-8">
            <Foto bilde={bilder.neon} className="aspect-square w-full object-cover" />
          </div>
          <div className="glid md:col-span-3 md:mt-16">
            <Foto bilde={bilder.produkter} className="aspect-[3/4] w-full object-cover" />
          </div>
          <div className="glid kutt-hoyre md:col-span-4 md:-mt-6">
            <Foto bilde={bilder.ventesone} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ---------- Bestill ---------- */}
      <section aria-labelledby="cta-tittel" className="relative mt-36">
        <div aria-hidden="true" className="tegn neonglod mx-auto mb-10 h-[3px] w-[80%] -rotate-3 bg-neon" />
        <div className="kutt-begge relative isolate overflow-hidden bg-rod py-[calc(3.5vw+5rem)]">
          <Foto
            bilde={bilder.sakser}
            className="absolute inset-0 h-full w-full object-cover opacity-15 grayscale"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="cta-tittel" className="text-[clamp(3.5rem,12vw,10rem)]">
              Klar for <br className="sm:hidden" />
              noe nytt?
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Knapp href="/bestill-time" variant="lys">
                Bestill time
              </Knapp>
              <p className="text-[1.1875rem]">
                Eller ring{" "}
                <a href={`tel:${salong.telefonLenke}`} className="tall font-bold underline underline-offset-4">
                  {salong.telefon}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Finn oss ---------- */}
      <section id="finn-oss" aria-labelledby="finn-tittel" className="mx-auto mt-20 grid max-w-7xl scroll-mt-8 lg:mt-32 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr_1.2fr]">
        <div>
          <Etikett>Finn oss</Etikett>
          <h2 id="finn-tittel" className="mt-4 text-[clamp(3rem,6vw,4.5rem)]">
            {salong.gate}
          </h2>
          <p className="mt-4 text-[1.1875rem]">
            <span className="tall">{salong.postnr}</span> {salong.sted}
          </p>
          <p className="mt-4 max-w-sm text-gra">{salong.adkomst}</p>
          <p className="mt-6 space-y-1">
            <a href={`tel:${salong.telefonLenke}`} className="lenke tall block w-fit py-1 text-[1.5rem]">
              {salong.telefon}
            </a>
            <a href={`mailto:${salong.epost}`} className="lenke block w-fit py-1">
              {salong.epost}
            </a>
          </p>
        </div>
        <div>
          <h3 className="text-[2.25rem]">Åpningstider</h3>
          <Apningstider className="mt-4 text-[1.125rem]" />
        </div>
        <div className="kutt-venstre">
          <Foto bilde={bilder.inngang} className="aspect-[4/3] h-full w-full object-cover" />
        </div>
      </section>
    </>
  );
}
