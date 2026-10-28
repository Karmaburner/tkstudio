import Link from "next/link";
import { Logo } from "./Logo";
import { Knapp } from "./Felles";
import { MobilMeny } from "./MobilMeny";
import { meny } from "@/lib/meny";

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

        <MobilMeny />
      </div>
    </header>
  );
}
