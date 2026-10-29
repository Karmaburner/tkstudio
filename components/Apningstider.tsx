import { apningstider } from "@/lib/salong";

export function Apningstider({ className = "" }: { className?: string }) {
  return (
    <dl className={`divide-y divide-linje/70 ${className}`}>
      {apningstider.map((d) => (
        <div key={d.dag} className="flex justify-between gap-6 py-1.5">
          <dt>{d.dag}</dt>
          <dd className={d.apner ? "tall" : "text-gra"}>
            {d.apner ? `${d.apner}–${d.stenger}` : "Stengt"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Kort versjon til footeren: dager med samme tider slås sammen, «Tirsdag–torsdag 10–20».
export function ApningstiderKort({ className = "" }: { className?: string }) {
  const time = (t: string) => t.replace(":00", "");
  const grupper: { fra: string; til: string; tid: string }[] = [];
  for (const d of apningstider) {
    if (!d.apner || !d.stenger) continue;
    const tid = `${time(d.apner)}–${time(d.stenger)}`;
    const siste = grupper.at(-1);
    if (siste && siste.tid === tid) siste.til = d.dag;
    else grupper.push({ fra: d.dag, til: d.dag, tid });
  }
  const stengt = apningstider.filter((d) => !d.apner).map((d) => d.dag.toLowerCase());
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {grupper.map((g) => (
        <li key={g.fra} className="flex justify-between gap-6">
          <span>{g.fra === g.til ? g.fra : `${g.fra}–${g.til.toLowerCase()}`}</span>
          <span className="tall">{g.tid}</span>
        </li>
      ))}
      <li className="text-gra">
        Stengt {stengt.reverse().join(" og ")}
      </li>
    </ul>
  );
}
