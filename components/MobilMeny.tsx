"use client";

import Link from "next/link";
import { useRef } from "react";
import { Knapp } from "./Felles";
import { meny } from "@/lib/meny";

export function MobilMeny() {
  const ref = useRef<HTMLDetailsElement>(null);
  // Mobilmeny med <details>: virker med tastatur og uten JavaScript.
  return (
    <details
      ref={ref}
      className="relative lg:hidden"
      // Lukk menyen når en lenke velges, også lenker til et avsnitt på samme side.
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) ref.current?.removeAttribute("open");
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && ref.current?.open) {
          ref.current.removeAttribute("open");
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      {/* To streker i ulik lengde. Blir et kryss når menyen er åpen. */}
      <summary className="flex h-12 w-12 items-center justify-center">
        <span className="sr-only">Meny</span>
        <span aria-hidden="true" className="hamburger relative block h-4 w-8">
          <span className="strek-1 absolute right-0 top-0 h-[3px] w-8 bg-hvit transition-transform duration-300" />
          <span className="strek-2 absolute bottom-0 right-0 h-[3px] w-5 bg-neon transition-all duration-300" />
        </span>
      </summary>
      <div className="absolute right-0 z-40 mt-2 w-[min(20rem,calc(100vw-2rem))] border-2 border-hvit bg-kull p-3">
        <nav aria-label="Mobilmeny">
          <ul>
            {meny.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="smal block px-3 py-2 text-[2rem] leading-none glod-hover">
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
  );
}
