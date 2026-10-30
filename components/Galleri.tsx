"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { alleBehandlinger, behandlingFor, filtre, frisyreSlug, frisyrer, type FrisyreType } from "@/lib/salong";
import { Foto, RullTekst } from "./Felles";

// Hele galleriet med filter. Annenhver kolonne er skjøvet ned, så rutenettet blir skjevt.
// Et klikk på et bilde åpner det stort i en <dialog>, som gir fokusfelle og Esc uten ekstra kode.
// start: frisyren som skal åpnes med en gang, fra ?frisyre= i lenker fra forsiden.
export function Galleri({ start }: { start?: string }) {
  const [valgt, setValgt] = useState<FrisyreType | "alle">("alle");
  const [apen, setApen] = useState<number | null>(() => {
    const i = frisyrer.findIndex((f) => frisyreSlug(f) === start);
    return i === -1 ? null : i;
  });
  const dialog = useRef<HTMLDialogElement>(null);
  const sveip = useRef(0);
  const synlige = valgt === "alle" ? frisyrer : frisyrer.filter((f) => f.typer.includes(valgt));

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (apen !== null && !d.open) d.showModal();
    if (apen === null && d.open) d.close();
  }, [apen]);

  const ga = (steg: number) => setApen((i) => (i === null ? i : (i + steg + synlige.length) % synlige.length));
  const vist = apen !== null ? synlige[apen] : null;
  const behandling = vist ? alleBehandlinger.find((b) => b.navn === behandlingFor(vist)) : undefined;

  return (
    <div>
      <div role="group" aria-label="Vis frisyrer" className="flex flex-wrap gap-2">
        {filtre.map((f) => {
          const aktiv = valgt === f.verdi;
          const antall = f.verdi === "alle" ? frisyrer.length : frisyrer.filter((x) => x.typer.includes(f.verdi as FrisyreType)).length;
          return (
            <button
              key={f.verdi}
              type="button"
              aria-pressed={aktiv}
              onClick={() => setValgt(f.verdi)}
              className={`min-h-12 px-5 font-bold transition-colors ${
                aktiv ? "bg-hvit text-kull" : "border-2 border-gra text-hvit hover:border-neon"
              }`}
            >
              {f.tekst} <span className="tall ml-1 opacity-80">{antall}</span>
            </button>
          );
        })}
      </div>
      <p role="status" className="sr-only">
        Viser {synlige.length} frisyrer
      </p>

      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {synlige.map((f, i) => (
          <li key={f.bilde.src} className={i % 2 === 1 ? "translate-y-10" : ""}>
            <button type="button" aria-haspopup="dialog" onClick={() => setApen(i)} className="group block w-full text-left">
              <span className="relative block overflow-hidden bg-flate">
                <Foto
                  bilde={f.bilde}
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:saturate-150"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-1.5 w-full origin-left -skew-x-[40deg] scale-x-0 bg-neon transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="smal text-[1.5rem] leading-none group-hover:text-neon-tekst">{f.navn}</span>
                <span aria-hidden="true" className="text-[1.25rem] text-lavendel">
                  +
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="lysboks-tittel"
        onClose={() => setApen(null)}
        // Klikk på det mørke rundt boksen lukker den.
        onClick={(e) => e.target === e.currentTarget && setApen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") ga(1);
          if (e.key === "ArrowLeft") ga(-1);
        }}
        onTouchStart={(e) => (sveip.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - sveip.current;
          if (Math.abs(dx) > 60) ga(dx < 0 ? 1 : -1);
        }}
        className="lysboks m-auto max-h-[100svh] w-full max-w-6xl bg-kull p-0 text-hvit backdrop:bg-kull/90 sm:w-[calc(100%-3rem)]"
      >
        {vist && (
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="bg-flate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={vist.bilde.src}
                src={vist.bilde.src}
                srcSet={vist.bilde.srcSet}
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt={vist.bilde.alt}
                width={vist.bilde.w}
                height={vist.bilde.h}
                className="lysboks-bilde mx-auto max-h-[58svh] w-auto object-contain lg:max-h-[86svh]"
              />
            </div>

            <div className="flex flex-col p-5 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="tall text-[1.125rem] text-lavendel">
                  {apen! + 1} / {synlige.length}
                </p>
                <button
                  type="button"
                  onClick={() => setApen(null)}
                  className="flex min-h-12 items-center gap-2 border-2 border-hvit px-4 font-bold hover:bg-hvit hover:text-kull"
                >
                  Lukk <span aria-hidden="true">✕</span>
                </button>
              </div>

              <h2 id="lysboks-tittel" className="mt-6 text-[clamp(2.25rem,4.25vw,3rem)]">
                {vist.navn}
              </h2>
              <p className="mt-3 max-w-prose text-[1.125rem] text-gra">{vist.bilde.alt}</p>

              {behandling && (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t-2 border-linje pt-4">
                  <div>
                    <dt className="text-gra">Behandling</dt>
                    <dd className="font-bold">{behandling.navn}</dd>
                  </div>
                  <div>
                    <dt className="text-gra">Pris og tid</dt>
                    <dd className="tall">
                      {behandling.pris} kr · {behandling.tid}
                    </dd>
                  </div>
                </dl>
              )}

              <div className="mt-8 flex flex-col gap-3 lg:mt-auto lg:pt-8">
                {behandling && (
                  <Link
                    href={`/bestill-time?behandling=${encodeURIComponent(behandling.navn)}`}
                    className="knapp knapp-hvit"
                  >
                    <RullTekst>Bestill noe lignende</RullTekst>
                  </Link>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => ga(-1)} className="min-h-12 border-2 border-gra px-4 font-bold hover:border-neon">
                    <span aria-hidden="true">← </span>Forrige
                  </button>
                  <button type="button" onClick={() => ga(1)} className="min-h-12 border-2 border-gra px-4 font-bold hover:border-neon">
                    Neste<span aria-hidden="true"> →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
