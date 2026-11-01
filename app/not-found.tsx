import { Knapp, SideTopp } from "@/components/Felles";

export default function IkkeFunnet() {
  return (
    <>
      <SideTopp tittel="Klippet for kort">
        <p>Siden du lette etter, finnes ikke. Kanskje lenken er gammel, eller kanskje vi har flyttet den.</p>
      </SideTopp>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Knapp href="/">Til forsiden</Knapp>
      </div>
    </>
  );
}
