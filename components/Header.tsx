import Link from "next/link";
import { Logo } from "./Logo";
import { Knapp } from "./Felles";

export const meny = [
  { href: "/frisyrer", tekst: "Frisyrer" },
  { href: "/priser", tekst: "Priser" },
  { href: "/#teamet", tekst: "Teamet" },
  { href: "/#salongen", tekst: "Salongen" },
  { href: "/#finn-oss", tekst: "Finn oss" },
];

export function Header() {
  return (
    <header className="relative z-30 border-b border-linje/60 bg-kull">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="py-1" aria-label="TK Studio, til forsiden">
          <Logo />
        </Link>

        <nav aria-label="Hovedmeny" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {meny.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className="group relative block px-3 py-3 font-bold text-hvit"
                >
                  {m.tekst}
                  {/* Rød strek som tegnes ved hover, på skrå som resten av siden. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-2 h-[3px] origin-left -skew-x-[30deg] scale-x-0 bg-neon transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Knapp href="/bestill-time">Bestill time</Knapp>
        </div>

        {/* Mobilmeny med <details>: virker med tastatur og uten JavaScript. */}
        <details className="relative lg:hidden">
          <summary className="flex h-12 items-center gap-3 border-2 border-hvit px-4 font-bold">
            Meny
            <span aria-hidden="true" className="pil inline-block text-[1.5rem] leading-none text-neon transition-transform">
              +
            </span>
          </summary>
          <div className="absolute right-0 z-40 mt-2 w-[min(20rem,calc(100vw-2rem))] border-2 border-hvit bg-kull p-3">
            <nav aria-label="Mobilmeny">
              <ul>
                {meny.map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} className="smal block px-3 py-2 text-[2rem] leading-none hover:text-neon-tekst">
                      {m.tekst}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Knapp href="/bestill-time" className="mt-3 w-full justify-center">
              Bestill time
            </Knapp>
          </div>
        </details>
      </div>
    </header>
  );
}
