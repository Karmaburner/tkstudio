"use client";

import { useSearchParams } from "next/navigation";
import { Galleri } from "./Galleri";

// Leser ?frisyre= fra lenkene i stripa på forsiden og åpner den frisyren.
export function GalleriFraLenke() {
  const p = useSearchParams();
  return <Galleri start={p.get("frisyre") ?? undefined} />;
}
