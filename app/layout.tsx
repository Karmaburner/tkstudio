import type { Metadata } from "next";
import { Archivo, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { salong, apningstider } from "@/lib/salong";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Variabel bredde: smal og tung i titlene, bred og luftig som STUDIO i logoen.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  // Bare domenet: Next legger selv på /tkstudio for filer som delingsbildet.
  metadataBase: new URL(new URL(salong.url).origin),
  title: {
    default: `${salong.navn} · Frisør i ${salong.sted}`,
    template: `%s · ${salong.navn}`,
  },
  description:
    "Frisør med kant. Klipp, sterke farger, balayage, herre og oppsatt hår. Bestill time på nett. Demo laget av Lilit Labs.",
  // Salongen er oppdiktet. Siden skal ikke dukke opp når folk søker etter en ekte frisør.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: salong.navn,
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: salong.navn,
  url: salong.url,
  telephone: salong.telefonLenke,
  email: salong.epost,
  priceRange: "kr",
  address: {
    "@type": "PostalAddress",
    streetAddress: salong.gate,
    postalCode: salong.postnr,
    addressLocality: salong.sted,
    addressCountry: "NO",
  },
  openingHoursSpecification: apningstider
    .filter((d) => d.apner)
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: d.schema,
      opens: d.apner,
      closes: d.stenger,
    })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={`${atkinson.variable} ${archivo.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#innhold"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-hvit focus:px-4 focus:py-3 focus:font-bold focus:text-kull"
        >
          Hopp til innholdet
        </a>
        <Header />
        <main id="innhold" className="flex-1">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
