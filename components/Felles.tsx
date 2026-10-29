import Link from "next/link";
import type { Bilde } from "@/lib/salong";

// Teksten i en knapp, som ruller opp ved hover mens pila flyr ut og tilbake.
// Kopien er skjult for skjermlesere, så de hører teksten én gang.
export function RullTekst({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="rull-tekst">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span aria-hidden="true" className="rull-pil">
        <Pil />
        <Pil />
      </span>
    </>
  );
}

// Pila er tegnet, ikke et tegn i skriften. Et tegn avrundes til hele piksler for seg selv,
// og kunne havne 1 px lavere i noen knapper enn andre.
function Pil() {
  return (
    <svg viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="h-[0.6em] w-[1em]">
      <path d="M1 6h16M12 1.5 16.5 6 12 10.5" />
    </svg>
  );
}

// Hovedknappen er hvit, den andre har hvit kant. Begge har rette hjørner.
export function Knapp({
  href,
  children,
  variant = "hvit",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "hvit" | "omriss";
  className?: string;
}) {
  // Hele klassenavnene står skrevet ut, ellers finner ikke Tailwind dem.
  const stil = { hvit: "knapp-hvit", omriss: "knapp-omriss" }[variant];
  return (
    <Link href={href} className={`knapp ${stil} ${className}`}>
      <RullTekst>{children}</RullTekst>
    </Link>
  );
}

// Liten etikett over titler: bred skrift med luft, som STUDIO i logoen.
export function Etikett({ children, farge = "text-lavendel" }: { children: React.ReactNode; farge?: string }) {
  return (
    <p className={`bred flex items-center gap-3 text-[0.875rem] ${farge}`}>
      <span aria-hidden="true" className="h-[3px] w-8 -skew-x-[30deg] bg-neon" />
      {children}
    </p>
  );
}

export function Foto({
  bilde,
  className = "",
  prioritet = false,
  sizes,
}: {
  bilde: Bilde;
  className?: string;
  prioritet?: boolean;
  sizes?: string;
}) {
  return (
    // GitHub Pages har ingen bildeserver, så vanlig <img> med faste mål er nok.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={bilde.src}
      srcSet={bilde.srcSet}
      alt={bilde.alt}
      width={bilde.w}
      height={bilde.h}
      sizes={sizes}
      loading={prioritet ? "eager" : "lazy"}
      fetchPriority={prioritet ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}

// Toppen på undersidene: enorm smal tittel, skrå neonlinje og ingress.
export function SideTopp({
  etikett,
  tittel,
  children,
}: {
  etikett: string;
  tittel: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
      <Etikett>{etikett}</Etikett>
      <h1 className="mt-8 text-[clamp(3.5rem,13vw,10rem)]">{tittel}</h1>
      <div aria-hidden="true" className="hero-strek neonglod mt-6 h-[4px] w-[min(40rem,80%)] -skew-x-[40deg] bg-neon" />
      {children && <div className="mt-8 max-w-prose space-y-4 text-[1.1875rem] text-gra">{children}</div>}
    </div>
  );
}

// Små symboler ved telefon og e-post. Pynt for øyet, så skjermlesere hopper over dem.
export function TelefonIkon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className={`h-[1em] w-[1em] shrink-0 ${className}`}>
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function EpostIkon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className={`h-[1em] w-[1em] shrink-0 ${className}`}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}
