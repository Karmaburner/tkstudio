"use client";

import { useEffect, useRef } from "react";

// Oppdiktet gatekart over Hønefoss sentrum, inspirert av kartet til Attitude Tattoo.
// Gatene tegnes opp én gang når kartet kommer inn i bildet. Uten JavaScript,
// eller med redusert bevegelse, vises kartet ferdig tegnet.

// Hovedgater: tykkere streker. pathLength="1" gjør at alle kan animeres likt.
const hovedgater = [
  "M500 315 L 560 322 L 780 300 L 1000 318 L 1200 310",
  "M600 460 L 690 250 L 735 120 L 770 0",
  "M920 460 L 905 300 L 940 120 L 960 0",
  "M500 144 L 600 138 L 735 120 L 940 120 L 1200 92",
];

// Sidegater: tynnere og svakere.
const sidegater = [
  "M520 460 L 530 320",
  "M540 321 L 555 141",
  "M640 322 L 660 220 L 700 214",
  "M780 300 L 800 214 L 905 206",
  "M690 250 L 790 262 L 842 228",
  "M842 228 L 905 238",
  "M1000 318 L 1010 120",
  "M1080 314 L 1100 110",
  "M1000 220 L 1200 205",
  "M1040 460 L 1050 316",
  "M760 460 L 780 300",
  "M560 322 L 600 460",
  "M500 229 L 520 228 L 660 220",
  "M600 138 L 610 60 L 760 40",
  "M840 0 L 830 120",
  "M1120 460 L 1130 312",
];

// Ledelinjer fra etikettene til venstre og inn til stedet de peker på (bare på stor skjerm).
const ledere = [
  { tekst: "TK Studio · Saksegata 12", y: 120, til: "L 480 120 L 790 262", x: 790, mal: 262 },
  { tekst: "Torget · gratis parkering", y: 210, til: "L 480 210 L 862 300", x: 862, mal: 300 },
  { tekst: "Elva · Storbrua", y: 380, til: "L 480 380 L 742 394", x: 742, mal: 394 },
];

export function Kart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skjul strekene til kartet kommer inn i bildet, og spill animasjonen én gang.
    svg.dataset.tegn = "venter";
    const obs = new IntersectionObserver(
      ([inn]) => {
        if (inn.isIntersecting) {
          svg.dataset.tegn = "spill";
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  return (
    <figure className="lg:col-span-3">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[1200/460]">
        <svg
          ref={ref}
          viewBox="0 0 1200 460"
          preserveAspectRatio="xMaxYMid slice"
          role="img"
          aria-label="Oppdiktet kart over Hønefoss sentrum. TK Studio ligger i Saksegata 12, rett ved torget og et kvartal fra elva."
          className="kart h-full w-full"
        >
          {/* Elva: et bredt bånd med tynne kanter. */}
          <g className="kart-elv">
            <path d="M500 428 C 580 440, 640 380, 760 392 S 1000 450, 1220 430" stroke="var(--color-lavendel)" strokeOpacity="0.6" strokeWidth="38" fill="none" />
            <path d="M500 428 C 580 440, 640 380, 760 392 S 1000 450, 1220 430" stroke="var(--color-kull)" strokeWidth="35" fill="none" />
          </g>

          {/* Torget. */}
          <path className="kart-strek kart-sen" pathLength={1} d="M830 280 L 900 288 L 894 336 L 824 328 Z" stroke="var(--color-lavendel)" strokeWidth="1.6" fill="none" />

          <g fill="none" stroke="var(--color-gra)" strokeOpacity="0.55" strokeWidth="1.2">
            {sidegater.map((d) => (
              <path key={d} className="kart-strek kart-sen" pathLength={1} d={d} />
            ))}
          </g>
          <g fill="none" stroke="var(--color-hvit)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            {hovedgater.map((d) => (
              <path key={d} className="kart-strek" pathLength={1} d={d} />
            ))}
          </g>

          {/* Storbrua over elva. */}
          <path className="kart-strek" pathLength={1} d="M742 372 L 742 414 M752 372 L 752 414" stroke="var(--color-hvit)" strokeWidth="2.6" fill="none" />

          {/* Ledelinjer med etiketter. Skjult på små skjermer, der forklaringen står under kartet. */}
          <g className="hidden lg:inline" fill="none" stroke="var(--color-hvit)" strokeWidth="1">
            {ledere.map((l) => (
              <g key={l.tekst}>
                <text x="20" y={l.y + 5} className="bred" fill="var(--color-hvit)" stroke="none" fontSize="14">
                  {l.tekst}
                </text>
                <path className="kart-strek kart-sist" pathLength={1} d={`M420 ${l.y} ${l.til}`} />
                <circle className="kart-prikk" cx="420" cy={l.y} r="3" fill="var(--color-hvit)" stroke="none" />
              </g>
            ))}
          </g>

          {/* Her er vi. */}
          <g className="kart-her">
            <circle className="kart-puls" cx="790" cy="262" r="16" fill="none" stroke="var(--color-neon)" strokeWidth="2" />
            <circle cx="790" cy="262" r="8" fill="var(--color-neon)" />
          </g>
        </svg>
      </div>

      {/* Forklaring på mobil, der etikettene i kartet ville blitt for små. */}
      <figcaption className="mt-4 grid gap-2 text-[1rem] sm:grid-cols-3 lg:sr-only">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-neon" />
          TK Studio · Saksegata 12
        </span>
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="h-3 w-3 shrink-0 border border-lavendel" />
          Torget · gratis parkering
        </span>
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="h-1 w-3 shrink-0 bg-lavendel/60" />
          Elva · Storbrua
        </span>
      </figcaption>
    </figure>
  );
}
