"use client";

import { useState, useSyncExternalStore } from "react";
import { alleBehandlinger, apningstider, kategorier, minutter, team, tillegg } from "@/lib/salong";
import { RullTekst } from "@/components/Felles";

const kroner = (pris: string) => parseInt(pris.replace(/\D/g, ""));
const trengerToning = ["Striper", "Balayage", "Bleking"];

type Dag = { id: string; navn: string; dato: string; tider: string[] };

// Lager ledige tider for de neste åpne dagene. Bare for demoen:
// «opptatt» er tilfeldig, men likt hver gang for samme dag, tid og frisør.
// Behandlingen må bli ferdig før stengetid, så lange behandlinger får færre tider.
function lagDager(frisor: string, varighet: number): Dag[] {
  const dager: Dag[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  const ukedag = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
  while (dager.length < 5) {
    d.setDate(d.getDate() + 1);
    const navn = ukedag[d.getDay()];
    const apen = apningstider.find((a) => a.dag === navn);
    if (!apen?.apner || !apen.stenger) continue;
    const start = parseInt(apen.apner);
    const slutt = parseInt(apen.stenger);
    const tider: string[] = [];
    for (let t = start; t < slutt; t++) {
      for (const m of ["00", "30"]) {
        if (t * 60 + parseInt(m) + varighet > slutt * 60) continue;
        const nokkel = `${d.toDateString()}${t}${m}${frisor}`;
        let h = 0;
        for (const c of nokkel) h = (h * 31 + c.charCodeAt(0)) >>> 0;
        if (h % 3 === 0) tider.push(`${String(t).padStart(2, "0")}:${m}`);
      }
    }
    dager.push({
      id: d.toISOString().slice(0, 10),
      navn,
      dato: d.toLocaleDateString("nb-NO", { day: "numeric", month: "long" }),
      tider: tider.slice(0, 6),
    });
  }
  return dager;
}

type Feil = Partial<Record<"behandling" | "tid" | "navn" | "telefon", string>>;

const kort =
  "flex min-h-14 cursor-pointer items-center justify-between gap-4 border-2 border-gra px-4 py-3 transition-colors hover:border-neon has-[:checked]:border-hvit has-[:checked]:bg-hvit has-[:checked]:text-kull has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lavendel";

function Steg({ nr, tittel, children }: { nr: string; tittel: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t-2 border-hvit pt-6">
      <legend className="float-left flex w-full items-baseline gap-4">
        <span aria-hidden="true" className="tall text-[1.25rem] text-lavendel">
          {nr}
        </span>
        <span className="smal text-[clamp(2.25rem,5vw,3.25rem)] leading-none">{tittel}</span>
      </legend>
      <div className="clear-both pt-6">{children}</div>
    </fieldset>
  );
}

export function Bestilling({ start = {} }: { start?: { behandling?: string; frisor?: string } }) {
  // Én behandling per kategori, så man kan ta klipp og striper i samme time,
  // men ikke to klipp. Nøkkelen er kategorien, verdien er navnet på behandlingen.
  const [valg, setValg] = useState<Record<string, string>>(() => {
    const b = alleBehandlinger.find((x) => x.navn === start.behandling);
    return b ? { [b.kategori.slug]: b.navn } : {};
  });
  // Fanen som er åpen: kategorien til behandlingen fra lenken, ellers den første.
  const [fane, setFane] = useState(
    kategorier.find((k) => k.behandlinger.some((b) => b.navn === start.behandling))?.slug ?? kategorier[0].slug,
  );
  const [frisor, setFrisor] = useState(team.some((p) => p.slug === start.frisor) ? start.frisor! : "forste");
  const [dagId, setDagId] = useState("");
  const [valgtTid, setTid] = useState("");
  const [ekstra, setEkstra] = useState<string[]>([]);
  const [feil, setFeil] = useState<Feil>({});
  const [sendt, setSendt] = useState(false);

  // Datoene lages i nettleseren, så den statiske siden ikke viser gamle datoer.
  // Falsk under bygging, sann i nettleseren.
  const klar = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  // I samme rekkefølge som fanene: klipp før farge.
  const valgte = alleBehandlinger.filter((b) => valg[b.kategori.slug] === b.navn);
  const valgtBehandling = valgte[0];
  const behandling = valgte.map((b) => b.navn).join(" og ");
  const betalt = valgte.some((b) => b.pris !== "0");
  // Tillegg vises ikke ved gratis konsultasjon, og teller da heller ikke med.
  const valgteTillegg = betalt ? tillegg.filter((t) => ekstra.includes(t.navn)) : [];
  const varighet =
    (valgte.length ? valgte.reduce((s, b) => s + minutter(b.tid), 0) : 30) + valgteTillegg.reduce((s, t) => s + minutter(t.tid), 0);
  const sum = [...valgte, ...valgteTillegg].reduce((s, b) => s + kroner(b.pris), 0);
  const prisTekst = !valgtBehandling
    ? "–"
    : sum === 0
      ? "Gratis"
      : `${valgte.some((b) => b.pris.startsWith("fra")) ? "fra " : ""}${sum.toLocaleString("nb-NO")} kr`;
  const timer = Math.floor(varighet / 60);
  const varighetTekst = [timer ? `${timer} t` : "", varighet % 60 ? `${varighet % 60} min` : ""].filter(Boolean).join(" ");
  const behandlingTekst = [...valgte, ...valgteTillegg].map((b) => b.navn).join(" + ");
  // Anbefalt frisør er spesialisten på den lengste behandlingen, for eksempel farge foran klipp.
  // Alle kan klippe, så man kan fortsatt velge hvem man vil.
  const viktigst = [...valgte].sort((a, b) => minutter(b.tid) - minutter(a.tid))[0];
  const anbefalt = viktigst?.kategori.frisor;
  const dager = klar ? lagDager(frisor, varighet) : [];
  const dag = dager.find((d) => d.id === dagId) ?? dager[0];
  // En valgt tid som ikke lenger går (ny behandling eller frisør) teller som ikke valgt.
  const tid = dag?.tider.includes(valgtTid) ? valgtTid : "";

  const frisorNavn = frisor === "forste" ? "Første ledige" : team.find((p) => p.slug === frisor)?.navn;

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nye: Feil = {};
    if (!valgte.length) nye.behandling = "Velg hva du vil ha gjort.";
    if (!tid) nye.tid = "Velg en tid.";
    if (!String(data.get("navn") ?? "").trim()) nye.navn = "Skriv navnet ditt.";
    const tlf = String(data.get("telefon") ?? "").replace(/\s/g, "");
    if (!/^(\+47)?\d{8}$/.test(tlf)) nye.telefon = "Skriv et telefonnummer med åtte siffer.";
    setFeil(nye);
    if (Object.keys(nye).length === 0) setSendt(true);
    else document.getElementById(`${Object.keys(nye)[0]}-feil`)?.scrollIntoView({ block: "center" });
  }

  if (sendt) {
    return (
      <div role="status" className="kutt-hjorne bg-fuksia p-8 sm:p-12">
        <p className="smal text-[clamp(3rem,8vw,5.5rem)] leading-none">Sees!</p>
        <p className="mt-5 max-w-prose text-[1.1875rem]">
          {behandlingTekst} med {frisorNavn?.toLowerCase() === "første ledige" ? "første ledige frisør" : frisorNavn}, {dag?.navn.toLowerCase()}{" "}
          {dag?.dato} klokka <span className="tall">{tid}</span>.
        </p>
        <p className="mt-4 max-w-prose">
          På en ekte side ville salongen fått bestillingen nå, og du ville fått en SMS. Dette er en demo, så ingenting ble sendt.
        </p>
      </div>
    );
  }

  const felt = "mt-2 block w-full border-2 border-gra bg-kull px-4 py-3 text-[1.0625rem] text-hvit focus:border-hvit";

  return (
    <form onSubmit={send} noValidate className="grid gap-14 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-16">
        <Steg nr="01" tittel="Hva skal vi gjøre?">
          {feil.behandling && (
            <p id="behandling-feil" className="mb-4 flex items-start gap-2 border-l-4 border-lavendel bg-flate px-3 py-2 font-bold text-hvit">
              <span aria-hidden="true" className="text-lavendel">!</span>
              {feil.behandling}
            </p>
          )}
          {/* Én kategori om gangen, så listen ikke blir for lang. */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {kategorier.map((k) => {
              const aktiv = fane === k.slug;
              const harValgt = Boolean(valg[k.slug]);
              return (
                <button
                  key={k.slug}
                  type="button"
                  aria-pressed={aktiv}
                  onClick={() => setFane(k.slug)}
                  className={`flex min-h-12 items-center justify-center gap-2 px-4 font-bold transition-colors ${
                    aktiv ? "bg-hvit text-kull" : "border-2 border-gra text-hvit hover:border-neon"
                  }`}
                >
                  {k.tittel}
                  {harValgt && (
                    <span className={aktiv ? "" : "text-lavendel"}>
                      <span aria-hidden="true">✓</span>
                      <span className="sr-only"> (valgt)</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-gra">Du kan kombinere flere behandlinger, for eksempel klipp og striper.</p>
          <div className="mt-3 space-y-2">
            {kategorier
              .find((k) => k.slug === fane)!
              .behandlinger.map((b) => (
                <label key={b.navn} className={kort}>
                  <span className="flex items-center gap-3">
                    {/* Avkrysning, så valget kan tas bort igjen. Et nytt valg i samme fane bytter ut det gamle. */}
                    <input
                      type="checkbox"
                      name="behandling"
                      value={b.navn}
                      checked={valg[fane] === b.navn}
                      onChange={(e) =>
                        setValg((v) => {
                          const ny = { ...v };
                          if (e.target.checked) ny[fane] = b.navn;
                          else delete ny[fane];
                          return ny;
                        })
                      }
                      className="sr-only"
                    />
                    <span aria-hidden="true" className="tall w-4 text-center">
                      {valg[fane] === b.navn ? "✓" : "+"}
                    </span>
                    <span>
                      <span className="block font-bold">{b.navn}</span>
                      <span className="tall block text-[0.9375rem]">{b.tid}</span>
                    </span>
                  </span>
                  <span className="tall whitespace-nowrap">{b.pris === "0" ? "Gratis" : `${b.pris} kr`}</span>
                </label>
              ))}
          </div>

          {betalt && (
          <div className="mt-10">
            <p className="bred text-[0.875rem] text-lavendel">Legg til</p>
            <p className="mt-2 text-gra">Valgfritt. Legges til {behandling.toLowerCase()}.</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {tillegg.map((t) => (
                <label key={t.navn} className={kort}>
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="tillegg"
                      value={t.navn}
                      checked={ekstra.includes(t.navn)}
                      onChange={(e) =>
                        setEkstra((v) => (e.target.checked ? [...v, t.navn] : v.filter((x) => x !== t.navn)))
                      }
                      className="sr-only"
                    />
                    <span aria-hidden="true" className="tall w-4 text-center">
                      {ekstra.includes(t.navn) ? "✓" : "+"}
                    </span>
                    <span>
                      <span className="block font-bold">
                        {t.navn}
                        {t.navn === "Toning" && valgte.some((b) => trengerToning.includes(b.navn)) && (
                          <span className="kutt-hjorne ml-2 bg-lavendel px-2 py-0.5 text-[0.875rem] text-kull">Anbefalt</span>
                        )}
                      </span>
                      <span className="tall block text-[0.9375rem]">{t.tid}</span>
                    </span>
                  </span>
                  <span className="tall whitespace-nowrap">+ {t.pris} kr</span>
                </label>
              ))}
            </div>
          </div>
          )}
        </Steg>

        <Steg nr="02" tittel="Hvem vil du ha?">
          <div className="grid gap-2 sm:grid-cols-2">
            {[{ slug: "forste", navn: "Første ledige", rolle: "Flest tider å velge mellom" }, ...team].map((p) => (
              <label key={p.slug} className={kort}>
                <span>
                  <input
                    type="radio"
                    name="frisor"
                    value={p.slug}
                    checked={frisor === p.slug}
                    onChange={() => {
                      setFrisor(p.slug);
                      setTid("");
                    }}
                    className="sr-only"
                  />
                  <span className="smal block text-[1.75rem] leading-none">{p.navn}</span>
                  <span className="mt-1 block text-[0.9375rem]">{p.rolle}</span>
                </span>
                {anbefalt === p.slug && (
                  <span className="kutt-hjorne shrink-0 bg-lavendel px-2 py-1 text-[0.875rem] font-bold text-kull">
                    Anbefalt for {viktigst?.navn.toLowerCase()}
                  </span>
                )}
              </label>
            ))}
          </div>
        </Steg>

        <Steg nr="03" tittel="Når passer det?">
          {feil.tid && (
            <p id="tid-feil" className="mb-4 flex items-start gap-2 border-l-4 border-lavendel bg-flate px-3 py-2 font-bold text-hvit">
              <span aria-hidden="true" className="text-lavendel">!</span>
              {feil.tid}
            </p>
          )}
          {!klar ? (
            <p className="text-gra">Henter ledige tider …</p>
          ) : (
            <>
              <div role="radiogroup" aria-label="Dag" className="flex flex-wrap gap-2">
                {dager.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    role="radio"
                    aria-checked={dag?.id === d.id}
                    onClick={() => {
                      setDagId(d.id);
                      setTid("");
                    }}
                    className={`min-h-14 px-4 py-2 text-left ${
                      dag?.id === d.id ? "border-2 border-hvit bg-hvit text-kull" : "border-2 border-gra hover:border-neon"
                    }`}
                  >
                    <span className="block font-bold">{d.navn}</span>
                    <span className="block text-[0.9375rem]">{d.dato}</span>
                  </button>
                ))}
              </div>
              {dag?.tider.length === 0 && (
                <p className="mt-6 text-gra">
                  Ingen ledige tider som rekker {behandling.toLowerCase()} før stengetid denne dagen. Prøv en annen dag.
                </p>
              )}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {dag?.tider.map((t) => (
                  <label key={t} className={`${kort} justify-center`}>
                    <input
                      type="radio"
                      name="tid"
                      value={t}
                      checked={tid === t}
                      onChange={() => setTid(t)}
                      className="sr-only"
                    />
                    <span className="tall text-[1.125rem]">{t}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </Steg>

        <Steg nr="04" tittel="Hvem er du?">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="navn" className="font-bold">
                Navn
              </label>
              <input
                id="navn"
                name="navn"
                autoComplete="name"
                className={felt}
                aria-invalid={!!feil.navn}
                aria-describedby={feil.navn ? "navn-feil" : undefined}
              />
              {feil.navn && (
                <p id="navn-feil" className="mt-2 flex items-start gap-2 border-l-4 border-lavendel bg-flate px-3 py-2 font-bold text-hvit">
              <span aria-hidden="true" className="text-lavendel">!</span>
                  {feil.navn}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="telefon" className="font-bold">
                Mobil
              </label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={felt}
                aria-invalid={!!feil.telefon}
                aria-describedby={feil.telefon ? "telefon-feil" : undefined}
              />
              {feil.telefon && (
                <p id="telefon-feil" className="mt-2 flex items-start gap-2 border-l-4 border-lavendel bg-flate px-3 py-2 font-bold text-hvit">
              <span aria-hidden="true" className="text-lavendel">!</span>
                  {feil.telefon}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="melding" className="font-bold">
                Noe vi bør vite? <span className="font-normal text-gra">(valgfritt)</span>
              </label>
              <textarea id="melding" name="melding" rows={3} className={felt} />
            </div>
          </div>
        </Steg>
      </div>

      {/* Oppsummeringen følger med når man ruller på stor skjerm. */}
      <aside aria-label="Din bestilling" className="lg:sticky lg:top-6 lg:self-start">
        <div className="kutt-hjorne bg-flate p-6">
          <p className="bred text-[0.875rem] text-lavendel">Din time</p>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-gra">Behandling</dt>
              {/* Hver behandling kan fjernes rett herfra. */}
              <dd>
                {behandlingTekst ? (
                  <ul className="mt-1 space-y-1">
                    {[
                      ...valgte.map((b) => ({
                        navn: b.navn,
                        fjern: () =>
                          setValg((v) => {
                            const ny = { ...v };
                            delete ny[b.kategori.slug];
                            return ny;
                          }),
                      })),
                      ...valgteTillegg.map((t) => ({ navn: t.navn, fjern: () => setEkstra((v) => v.filter((x) => x !== t.navn)) })),
                    ].map((b) => (
                      <li key={b.navn} className="flex items-center justify-between gap-3">
                        <span className="font-bold">{b.navn}</span>
                        <button type="button" onClick={b.fjern} className="lenke -mr-2 min-h-11 px-2 text-[0.9375rem]">
                          Fjern<span className="sr-only"> {b.navn.toLowerCase()}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="font-bold">Ikke valgt</span>
                )}
              </dd>
            </div>
            {valgtBehandling && (
              <div>
                <dt className="text-gra">Varighet</dt>
                <dd className="tall font-bold">{varighetTekst}</dd>
              </div>
            )}
            <div>
              <dt className="text-gra">Frisør</dt>
              <dd className="font-bold">{frisorNavn}</dd>
            </div>
            <div>
              <dt className="text-gra">Tid</dt>
              <dd className="font-bold">
                {tid && dag ? (
                  <>
                    {dag.navn} {dag.dato} kl. <span className="tall">{tid}</span>
                  </>
                ) : (
                  "Ikke valgt"
                )}
              </dd>
            </div>
            <div className="border-t-2 border-linje pt-3">
              <dt className="text-gra">Pris</dt>
              <dd className="tall text-[2rem] leading-none">{prisTekst}</dd>
            </div>
          </dl>
          {/* Knappen er alltid aktiv, og teksten sier hva et klikk gjør. Mangler noe, viser klikket hvor. */}
          <button
            type="submit"
            className="knapp knapp-hvit mt-6 w-full"
          >
            <RullTekst>{!valgte.length ? "Velg behandling" : !tid ? "Velg dag og tid" : "Bekreft bestilling"}</RullTekst>
          </button>
          <p className="mt-4 text-[0.9375rem] text-gra">Demo. Ingenting blir sendt.</p>
        </div>
      </aside>
    </form>
  );
}
