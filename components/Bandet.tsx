"use client";

import { useState } from "react";

// Skrått, rødt bånd med ord som ruller. Går lenger enn fem sekunder,
// så det har pauseknapp (WCAG 2.2.2). Står stille ved redusert bevegelse.
export function Bandet({ ord }: { ord: string[] }) {
  const [pause, setPause] = useState(false);
  const rad = (skjult: boolean) => (
    <ul aria-hidden={skjult || undefined} className="flex shrink-0 items-center">
      {ord.map((o) => (
        <li key={o} className="smal flex items-center whitespace-nowrap px-6 text-[clamp(2rem,5vw,3.5rem)] leading-none">
          {o}
          <span aria-hidden="true" className="ml-12 inline-block h-3 w-3 rotate-45 bg-kull" />
        </li>
      ))}
    </ul>
  );
  return (
    // Ytre boks klipper det skrå båndet, så siden ikke blir bredere enn skjermen.
    <div className={`relative overflow-hidden pb-14 pt-4 ${pause ? "bandet-pause" : ""}`}>
      <div className="-mx-8 -rotate-2 overflow-hidden bg-neon py-4 text-kull">
        <div className="bandet flex w-max">
          {rad(false)}
          {rad(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPause(!pause)}
        aria-pressed={pause}
        className="absolute bottom-1 right-6 flex min-h-11 items-center gap-2 bg-kull px-3 text-[0.9375rem] font-bold text-hvit"
      >
        <span aria-hidden="true">{pause ? "▶" : "❚❚"}</span>
        {pause ? "Start båndet" : "Stopp båndet"}
      </button>
    </div>
  );
}
