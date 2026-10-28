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
