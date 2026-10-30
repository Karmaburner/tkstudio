import { Knapp, SideTopp } from "@/components/Felles";

export default function IkkeFunnet() {
  return (
    <>
      <SideTopp etikett="Feil 404" tittel={<>Klippet <span className="neonord">for kort</span></>}>
        <p>Siden du lette etter, finnes ikke. Kanskje lenken er gammel, eller kanskje vi har flyttet den.</p>
      </SideTopp>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Knapp href="/">Til forsiden</Knapp>
      </div>
    </>
  );
}
