"use client";

import { useState } from "react";
import { filtre, frisyrer, type FrisyreType } from "@/lib/salong";
import { Foto } from "./Felles";

// Hele galleriet med filter. Annenhver kolonne er skjøvet ned, så rutenettet blir skjevt.
export function Galleri() {
  const [valgt, setValgt] = useState<FrisyreType | "alle">("alle");
  const synlige = valgt === "alle" ? frisyrer : frisyrer.filter((f) => f.typer.includes(valgt));

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
              className={`kutt-hjorne min-h-12 px-5 font-bold transition-colors ${
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
            <figure className="group">
              <div className="relative overflow-hidden bg-flate">
                <Foto
                  bilde={f.bilde}
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:saturate-150"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-1.5 w-full origin-left -skew-x-[40deg] scale-x-0 bg-neon transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                <span className="smal text-[1.5rem] leading-none group-hover:text-neon-tekst">{f.navn}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
