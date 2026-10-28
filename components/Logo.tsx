// TK-monogrammet som vektor, tegnet etter logokonseptet:
// T-en er to kammer, K-en er en rød strek og en saks.
// Metallet følger tekstfargen, så logoen virker på både mørk og lys bunn.
export function Monogram({ className = "", tittel }: { className?: string; tittel?: string }) {
  const tenner = (x0: number, y0: number, antall: number, dx: number, dy: number, w: number, h: number) =>
    Array.from({ length: antall }, (_, i) => (
      <rect key={i} x={x0 + i * dx} y={y0 + i * dy} width={w} height={h} rx="0.4" />
    ));
  return (
    <svg
      viewBox="0 0 124 80"
      className={className}
      role={tittel ? "img" : undefined}
      aria-hidden={tittel ? undefined : true}
      aria-label={tittel}
    >
      <g fill="currentColor">
        {/* Kammen på tvers */}
        <rect x="2" y="4" width="56" height="8" rx="1.5" />
        {tenner(4, 12, 13, 4.1, 0, 2.2, 7)}
        {/* Kammen på langs */}
        <rect x="27" y="19" width="7" height="58" rx="1.5" />
        {tenner(21, 21, 13, 0, 4.2, 6, 2.2)}
      </g>
      {/* K: rød strek og saks */}
      <rect x="64" y="4" width="4" height="73" fill="var(--color-neon)" />
      <g fill="currentColor">
        <polygon points="71,44 116,3 120,6 76,48" />
        <polygon points="76,40 120,76 115,78 72,45" />
      </g>
      <circle cx="80" cy="62" r="8" fill="none" stroke="currentColor" strokeWidth="3.4" />
      <circle cx="74.5" cy="44.5" r="2.2" fill="var(--color-neon)" />
    </svg>
  );
}

export function Logo({ liten = false }: { liten?: boolean }) {
  return (
    <span className="flex items-center gap-3 text-hvit">
      <Monogram className={liten ? "h-9 w-auto" : "h-11 w-auto"} />
      <span className="font-display text-[1rem] font-semibold uppercase leading-none tracking-[0.45em] [font-stretch:125%]">
        Studio
      </span>
    </span>
  );
}
