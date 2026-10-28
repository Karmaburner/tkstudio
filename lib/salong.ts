// Alt innhold om den oppdiktede salongen samlet ett sted.
// Åpningstider, priser og folk hentes herfra overalt, så de aldri spriker.

// Mappen siden ligger i på GitHub Pages. Bildeadresser må ha den foran seg.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const b = (fil: string) => `${base}/bilder/${fil}`;

export const salong = {
  navn: "TK Studio",
  slagord: "Hår med mening",
  gate: "Saksegata 12",
  postnr: "3510",
  sted: "Hønefoss",
  telefon: "12 34 56 78",
  telefonLenke: "+4712345678",
  epost: "hei@tkstudio.example",
  instagram: "@tkstudio",
  url: "https://karmaburner.github.io/tkstudio",
  adkomst: "Inngang fra gata, ingen trapper. Gratis parkering i en time på torget rett over.",
};

export type Dag = { dag: string; apner: string | null; stenger: string | null; schema: string };

export const apningstider: Dag[] = [
  { dag: "Mandag", apner: null, stenger: null, schema: "Monday" },
  { dag: "Tirsdag", apner: "10:00", stenger: "20:00", schema: "Tuesday" },
  { dag: "Onsdag", apner: "10:00", stenger: "20:00", schema: "Wednesday" },
  { dag: "Torsdag", apner: "10:00", stenger: "20:00", schema: "Thursday" },
  { dag: "Fredag", apner: "10:00", stenger: "18:00", schema: "Friday" },
  { dag: "Lørdag", apner: "10:00", stenger: "16:00", schema: "Saturday" },
  { dag: "Søndag", apner: null, stenger: null, schema: "Sunday" },
];

export type Bilde = { src: string; alt: string; w: number; h: number; srcSet?: string };

export const bilder = {
  hero: { src: b("salong-hero.webp"), srcSet: `${b("salong-hero-720.webp")} 720w, ${b("salong-hero.webp")} 1030w`, alt: "Salongen innenfra: svarte stoler, røde neonlister og TK Studio-skiltet på veggen bak skranken.", w: 1030, h: 565 },
  resepsjon: { src: b("salong-resepsjon.webp"), alt: "Resepsjonen med logoen på en svart vegg og stylingplassene langs speilene.", w: 1000, h: 481 },
  inngang: { src: b("salong-inngang.webp"), alt: "Salongen sett fra inngangen, med skranken i svart marmor og en rød diagonal gjennom den.", w: 1000, h: 684 },
  stasjoner: { src: b("salong-stasjoner.webp"), alt: "En lang rekke stylingstasjoner med speil innrammet av rødt lys.", w: 1000, h: 564 },
  skranke: { src: b("salong-skranke.webp"), alt: "Skranken med røde blomster, og salongen bak med buede speil.", w: 1000, h: 583 },
  interior: { src: b("salong-interior.webp"), alt: "Stoler i svart skinn foran speil med røde og lilla vinkler på veggene.", w: 1030, h: 545 },
  logovegg: { src: b("salong-logo.webp"), alt: "TK Studio-logoen lyser på veggen over skranken.", w: 1018, h: 562 },
  perspektiv: { src: b("salong-perspektiv.webp"), alt: "Salongen fra siden, med varme lamper over skranken og en lilla vegg bak.", w: 1035, h: 538 },
  arbeidTiril: { src: b("arbeid-tiril.webp"), alt: "Tiril med rødt hår og tatoveringer klipper en kunde.", w: 700, h: 743 },
  arbeidKasper: { src: b("arbeid-kasper.webp"), alt: "Kasper føner langt, blondt hår.", w: 700, h: 854 },
  arbeidRonja: { src: b("arbeid-ronja.webp"), alt: "Ronja vasker håret til en kunde som ligger avslappet ved vasken.", w: 700, h: 737 },
  arbeidKlipp: { src: b("arbeid-klipp.webp"), alt: "Nærbilde av en presisjonsklipp med saks og kam.", w: 700, h: 978 },
  verktoy: { src: b("detalj-verktoy.webp"), alt: "Sakser, kammer og fønere på et svart håndkle.", w: 700, h: 609 },
  produkter: { src: b("detalj-produkter.webp"), alt: "Hylle med røde, svarte og lilla hårprodukter med TK-logo.", w: 700, h: 636 },
  ventesone: { src: b("detalj-ventesone.webp"), alt: "Ventesonen med en sofa i svart skinn, røde puter og et stort portrett på veggen.", w: 700, h: 641 },
  vask: { src: b("detalj-vask.webp"), alt: "En kunde med lukkede øyne får håret vasket.", w: 700, h: 583 },
  neon: { src: b("detalj-neon.webp"), alt: "Rødt neonskilt med teksten Good hair, good mood over en sofa.", w: 700, h: 600 },
  sakser: { src: b("detalj-sakser.webp"), alt: "", w: 700, h: 310 },
} satisfies Record<string, Bilde>;

export type Frisor = {
  slug: string;
  navn: string;
  rolle: string;
  tekst: string;
  liker: string[];
  bilde: Bilde;
};

export const team: Frisor[] = [
  {
    slug: "tiril",
    navn: "Tiril",
    rolle: "Fargeansvarlig og medeier",
    tekst: "T-en i TK. Har farget sitt eget hår rødt siden hun var femten og har ikke sett seg tilbake. Elsker sterke farger og kunder som sier «gjør det du vil».",
    liker: ["Rødt og fuksia", "Balayage", "Store forandringer"],
    bilde: { src: b("team-tiril.webp"), alt: "Tiril med langt, rødt hår klipper en mann i salongen og smiler.", w: 700, h: 1251 },
  },
  {
    slug: "kasper",
    navn: "Kasper",
    rolle: "Klipp og herre, medeier",
    tekst: "K-en i TK. Gikk fra barbersalong til dameklipp og tok med seg presisjonen. Har en fade han kaller «linjal» og blir aldri ferdig før det er symmetrisk.",
    liker: ["Fade og herreklipp", "Krøller", "Presise bobber"],
    bilde: { src: b("team-kasper.webp"), alt: "Kasper med krøllete hår og skjegg føner en kunde i TK Studio-forkle.", w: 700, h: 1101 },
  },
  {
    slug: "ronja",
    navn: "Ronja",
    rolle: "Styling og oppsett",
    tekst: "Den som får festhåret til å sitte gjennom hele natta. Tar seg tid ved vasken, fordi hun mener en god hodebunnsmassasje er halve besøket.",
    liker: ["Oppsatt hår", "Bryllup", "Blond"],
    bilde: { src: b("team-ronja.webp"), alt: "Ronja med blond bob smiler med rundbørste og føner i hendene.", w: 700, h: 1095 },
  },
];

export type Behandling = { navn: string; pris: string; tid: string; merknad?: string };
// frisor: den som anbefales i bestillingen når noen velger en behandling herfra.
export type Kategori = { slug: string; tittel: string; ingress: string; frisor: string; bilde: Bilde; behandlinger: Behandling[] };

export const kategorier: Kategori[] = [
  {
    slug: "klipp",
    frisor: "kasper",
    tittel: "Klipp",
    ingress: "Fra en enkel stuss til en helt ny form. Vi starter alltid med fem minutter prat.",
    bilde: { src: b("frisyre-23-burgunder-presis-bob.webp"), alt: "Presis bob i burgunder.", w: 700, h: 1090 },
    behandlinger: [
      { navn: "Dameklipp", pris: "690", tid: "60 min" },
      { navn: "Klipp og føn", pris: "890", tid: "75 min" },
      { navn: "Lugg", pris: "250", tid: "15 min" },
      { navn: "Barn under 12 år", pris: "390", tid: "30 min" },
    ],
  },
  {
    slug: "herre",
    frisor: "kasper",
    tittel: "Herre",
    ingress: "Fade, krøller eller klassisk. Kasper har linjal i blikket.",
    bilde: { src: b("frisyre-19-herre-teksturert-fade.webp"), alt: "Herreklipp med krøllete topp og høy fade.", w: 700, h: 1468 },
    behandlinger: [
      { navn: "Herreklipp", pris: "520", tid: "45 min" },
      { navn: "Fade", pris: "590", tid: "45 min" },
      { navn: "Skjegg", pris: "290", tid: "20 min" },
      { navn: "Klipp og skjegg", pris: "750", tid: "60 min" },
    ],
  },
  {
    slug: "farge",
    frisor: "tiril",
    tittel: "Farge",
    ingress: "Naturlig eller neon. Vi tester alltid på en lokk først når fargen er ny for deg.",
    bilde: { src: b("frisyre-13-rode-highlights-portrett.webp"), alt: "Mørkt hår med kraftige røde striper.", w: 700, h: 1591 },
    behandlinger: [
      { navn: "Ettervekst", pris: "1 090", tid: "90 min" },
      { navn: "Helfarge", pris: "fra 1 290", tid: "2 t" },
      { navn: "Striper", pris: "fra 1 690", tid: "2 t" },
      { navn: "Balayage", pris: "fra 2 490", tid: "3 t" },
      { navn: "Sterke farger", pris: "fra 1 890", tid: "3 t", merknad: "Rødt, fuksia, lilla og andre farger som synes." },
    ],
  },
  {
    slug: "styling",
    frisor: "ronja",
    tittel: "Styling",
    ingress: "Til fest, bryllup eller bare en fredag. Ronja får det til å sitte.",
    bilde: { src: b("frisyre-09-oppsatt-festhaar.webp"), alt: "Oppsatt festfrisyre med pyntenåler.", w: 700, h: 940 },
    behandlinger: [
      { navn: "Føn og styling", pris: "490", tid: "40 min" },
      { navn: "Oppsatt hår", pris: "fra 990", tid: "60 min" },
      { navn: "Brudehår med prøve", pris: "fra 2 290", tid: "2 × 90 min" },
    ],
  },
];

export type FrisyreType = "farge" | "blond" | "klipp" | "herre" | "oppsatt";

export const filtre: { verdi: FrisyreType | "alle"; tekst: string }[] = [
  { verdi: "alle", tekst: "Alle" },
  { verdi: "farge", tekst: "Farge" },
  { verdi: "blond", tekst: "Blond" },
  { verdi: "klipp", tekst: "Klipp" },
  { verdi: "herre", tekst: "Herre" },
  { verdi: "oppsatt", tekst: "Oppsatt" },
];

export type Frisyre = { navn: string; typer: FrisyreType[]; bilde: Bilde };

const f = (nr: string, fil: string, navn: string, typer: FrisyreType[], alt: string, h: number): Frisyre => ({
  navn,
  typer,
  bilde: { src: b(`frisyre-${nr}-${fil}.webp`), alt, w: 700, h },
});

export const frisyrer: Frisyre[] = [
  // Nytt enkeltfoto i full oppløsning. Lysboksen får 1024 px, rutenettet 700 px.
  {
    navn: "Burgunderbølger",
    typer: ["farge"],
    bilde: {
      src: b("frisyre-27-burgunder-bolger.webp"),
      srcSet: `${b("frisyre-27-burgunder-bolger-700.webp")} 700w, ${b("frisyre-27-burgunder-bolger.webp")} 1024w`,
      alt: "Langt hår i dyp burgunder med myke bølger, sett over skulderen i salongen.",
      w: 1024,
      h: 1536,
    },
  },
  f("01", "rod-balayage-lange-bolger", "Rød balayage", ["farge"], "Langt, mørkt hår med røde bølger som blir lysere mot tuppene.", 787),
  f("23", "burgunder-presis-bob", "Burgunder bob", ["farge", "klipp"], "Presis bob i burgunder med mørk rot.", 1090),
  f("19", "herre-teksturert-fade", "Teksturert fade", ["herre"], "Herreklipp med krøllete topp og høy fade.", 1468),
  f("02", "platina-blond-bob", "Platinablond bob", ["blond", "klipp"], "Skulderlang platinablond bob med løse bølger.", 741),
  f("04", "fuksia-kort-bob", "Fuksia bob", ["farge", "klipp"], "Kort bob i sterk fuksia med lang lugg til siden.", 795),
  f("09", "oppsatt-festhaar", "Festfrisyre", ["oppsatt"], "Oppsatt festfrisyre med løse lokker og pyntenåler, sett bakfra.", 940),
  f("07", "kobber-kroller", "Kobberkrøller", ["farge"], "Mørke krøller med kobberrøde toner.", 737),
  f("06", "platina-pixie", "Platina pixie", ["blond", "klipp"], "Kort platinablond pixie med tekstur på toppen.", 791),
  f("22", "herre-krollete-undercut", "Krøllete undercut", ["herre"], "Herreklipp med krøllete topp og kort undercut.", 1169),
  f("24", "rosalilla-ombre-bak", "Rosa og lilla ombré", ["farge"], "Langt, mørkt hår med rosa og lilla ombré, sett bakfra.", 1140),
  f("03", "karamell-balayage", "Karamellbalayage", ["farge"], "Langt, brunt hår med karamellfargede striper og myke bølger.", 733),
  f("12", "isblond-hoy-hestehale", "Isblond hestehale", ["blond", "oppsatt"], "Isblond, høy hestehale med bølger.", 951),
  f("13", "rode-highlights-portrett", "Røde striper", ["farge"], "Mørkt hår med kraftige røde striper rundt ansiktet.", 1591),
  f("08", "herre-krollete-topp", "Krøller på toppen", ["herre"], "Herreklipp med krøller på toppen og kort fade på sidene.", 745),
  f("14", "lys-blond-lob", "Lys blond lob", ["blond", "klipp"], "Lys blond lob med myke bølger og midtskill.", 1673),
  f("20", "morkerodt-haar-profil", "Mørkerødt", ["farge"], "Langt, mørkerødt hår med bølger, sett fra siden.", 1011),
  f("10", "halvoppsatt-med-flette", "Halvoppsatt med flette", ["oppsatt", "blond"], "Halvoppsatt, langt, blondt hår med tvunnet flette og hårspenne.", 890),
  f("16", "kobber-lange-bolger", "Lange kobberbølger", ["farge"], "Lange, kobberrøde bølger.", 1204),
  f("17", "kort-platina-pixie", "Pixie med lugg", ["blond", "klipp"], "Kort platinablond pixie med lang lugg.", 1185),
  f("05", "honningblond-volum", "Honningblond", ["blond"], "Langt, honningblondt hår med volum og store bølger.", 765),
  f("15", "brun-balayage-lag", "Brun balayage i lag", ["farge", "klipp"], "Langt, brunt hår i lag med lys balayage.", 1223),
  f("18", "rett-platinablondt-haar", "Rett platina", ["blond"], "Langt, rett, platinablondt hår.", 1558),
  f("25", "rodhaar-med-volum", "Rødt med volum", ["farge"], "Rødt hår med mye volum på en smilende kunde i salongen.", 1034),
  f("21", "myke-beige-bolger-bak", "Beige bølger", ["blond"], "Myke, beigeblonde bølger, sett bakfra.", 1113),
  f("26", "blond-salongstyling", "Blond bob med bølger", ["blond", "klipp"], "Skulderlang, blond bob med bølger i rosa lys fra salongen.", 1094),
];

// Hvor mange minutter første time tar: «60 min», «2 t», «2 × 90 min».
export function minutter(tid: string) {
  const del = tid.split("×").pop()!;
  const tall = parseInt(del);
  return del.includes(" t") ? tall * 60 : tall;
}

export const alleBehandlinger = kategorier.flatMap((k) => k.behandlinger.map((b) => ({ ...b, kategori: k })));

// Hvilken behandling i prislisten som gir en frisyre fra galleriet.
export function behandlingFor(f: Frisyre) {
  const n = f.navn.toLowerCase();
  if (n.includes("balayage")) return "Balayage";
  if (f.typer.includes("herre")) return n.includes("fade") ? "Fade" : "Herreklipp";
  if (f.typer.includes("oppsatt")) return "Oppsatt hår";
  if (/fuksia|rosa|lilla/.test(n)) return "Sterke farger";
  if (n.includes("striper")) return "Striper";
  if (f.typer.includes("farge") || /platina|isblond/.test(n)) return "Helfarge";
  if (f.typer.includes("blond")) return "Striper";
  return "Dameklipp";
}
