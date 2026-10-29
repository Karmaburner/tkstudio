import Link from "next/link";
import { salong } from "@/lib/salong";
import { meny } from "@/lib/meny";
import { Monogram } from "./Logo";
import { Apningstider } from "./Apningstider";
import { EpostIkon, TelefonIkon } from "./Felles";

export function Footer() {
  return (
    <footer className="kutt-topp mt-28 bg-flate pt-[calc(3.5vw+3rem)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Monogram className="h-16 w-auto text-hvit" />
          <p className="smal mt-6 text-[3rem] leading-none">
            Hår med <span className="text-lavendel">mening</span>
          </p>
          <address className="mt-6 not-italic leading-relaxed">
            {salong.gate}, <span className="tall">{salong.postnr}</span> {salong.sted}
            <br />
            <a href={`tel:${salong.telefonLenke}`} className="lenke tall inline-flex items-center gap-2 py-1">
              <TelefonIkon className="text-lavendel" />
              {salong.telefon}
            </a>
            <br />
            <a href={`mailto:${salong.epost}`} className="lenke inline-flex items-center gap-2 py-1">
              <EpostIkon className="text-lavendel" />
              {salong.epost}
            </a>
          </address>
        </div>
        <div>
          <h2 className="text-[2rem]">Åpent</h2>
          <Apningstider className="mt-4 max-w-xs" />
        </div>
        <div>
          <h2 className="text-[2rem]">Sider</h2>
          <ul className="mt-4 space-y-1">
            {[...meny, { href: "/bestill-time", tekst: "Bestill time" }, { href: "/om-demoen", tekst: "Om demoen" }].map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="inline-block py-1 underline decoration-linje underline-offset-4 hover:decoration-neon">
                  {m.tekst}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-linje">
        <p className="mx-auto max-w-7xl px-4 py-5 text-base text-gra sm:px-6">
          Demo. Salongen, personene, prisene og adressen er oppdiktet, og bildene er laget med KI.{" "}
          <Link href="/om-demoen" className="font-bold text-hvit underline underline-offset-4">
            Om demoen
          </Link>
          {" · "}Nettside av:{" "}
          <a href="https://lilitlabs.com" className="font-bold text-hvit underline underline-offset-4">
            Lilit Labs
          </a>
        </p>
      </div>
    </footer>
  );
}
