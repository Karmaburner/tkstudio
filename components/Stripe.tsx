"use client";

import { useEffect, useRef, useState } from "react";

// Sidelengs galleri med piler og en tynn linje som viser hvor langt man har kommet.
// Kan fortsatt rulles med mus, finger og tastatur (Tab hit, så piltaster).
export function Stripe({ etikett, children }: { etikett: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [andel, setAndel] = useState(0);
  const [synlig, setSynlig] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mal = () => {
      const maks = el.scrollWidth - el.clientWidth;
      setAndel(maks > 0 ? el.scrollLeft / maks : 0);
      setSynlig(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
    };
    mal();
    el.addEventListener("scroll", mal, { passive: true });
    window.addEventListener("resize", mal);
    return () => {
      el.removeEventListener("scroll", mal);
      window.removeEventListener("resize", mal);
    };
  }, []);

  function bla(retning: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const rolig = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: retning * el.clientWidth * 0.8, behavior: rolig ? "auto" : "smooth" });
  }

  const pil = "flex h-12 w-12 items-center justify-center transition-[background-color,opacity] knapp-omriss disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <>
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={etikett}
        className="mt-14 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl items-center gap-6 px-4 sm:px-6">
        {/* Bredden på det lyse feltet er hvor mye som vises, og plasseringen er hvor langt man har kommet. */}
        <div aria-hidden="true" className="relative h-[3px] flex-1 bg-linje">
          <div
            className="absolute inset-y-0 bg-hvit"
            style={{ width: `${synlig * 100}%`, left: `${andel * (1 - synlig) * 100}%` }}
          />
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => bla(-1)} disabled={synlig >= 0.999 || andel <= 0.01} aria-label="Forrige frisyrer" className={pil}>
            <svg aria-hidden="true" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="h-3 w-5">
              <path d="M19 6H3M8 1.5 3.5 6 8 10.5" />
            </svg>
          </button>
          <button type="button" onClick={() => bla(1)} disabled={synlig >= 0.999 || andel >= 0.99} aria-label="Neste frisyrer" className={pil}>
            <svg aria-hidden="true" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="h-3 w-5">
              <path d="M1 6h16M12 1.5 16.5 6 12 10.5" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
