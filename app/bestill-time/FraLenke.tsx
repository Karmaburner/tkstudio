"use client";

import { useSearchParams } from "next/navigation";
import { Bestilling } from "./Bestilling";

// Leser ?behandling= og ?frisor= fra lenker i galleriet og på teamkortene,
// så valget er gjort når skjemaet åpnes.
export function BestillingFraLenke() {
  const p = useSearchParams();
  return <Bestilling start={{ behandling: p.get("behandling") ?? undefined, frisor: p.get("frisor") ?? undefined }} />;
}
