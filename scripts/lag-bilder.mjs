// Kopierer bildene fra bildepakken til public/bilder med korte navn,
// gjør PNG om til WebP og lager delingsbilde og iPhone-ikon.
// Kjøres fra prosjektmappen: node scripts/lag-bilder.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);

const kilde = "bilder-original/TK_Studio_komplett_bildepakke/TK_Studio_Bildepakke";
const ut = "public/bilder";
fs.mkdirSync(ut, { recursive: true });

const filer = {
  "01_Salong/01_hero_salong_med_logo.png": "salong-hero.webp",
  "01_Salong/02_resepsjon_og_salong.webp": "salong-resepsjon.webp",
  "01_Salong/03_salong_fra_inngang.webp": "salong-inngang.webp",
  "01_Salong/04_stylingstasjoner.webp": "salong-stasjoner.webp",
  "01_Salong/05_moderne_resepsjon.webp": "salong-skranke.webp",
  "01_Salong/06_helhetlig_salonginterior.webp": "salong-interior.webp",
  "01_Salong/07_resepsjon_med_logo.webp": "salong-logo.webp",
  "01_Salong/08_salong_perspektiv.webp": "salong-perspektiv.webp",
  "02_Ansatte_i_arbeid/01_frisor_med_rodtoner_i_arbeid.webp": "arbeid-tiril.webp",
  "02_Ansatte_i_arbeid/05_frisor_foner.webp": "arbeid-kasper.webp",
  "02_Ansatte_i_arbeid/03_hodebunnsvask.webp": "arbeid-ronja.webp",
  "02_Ansatte_i_arbeid/04_frisor_klipper.webp": "arbeid-klipp.webp",
  "02_Ansatte_i_arbeid/08_frisor_klipper_herre.webp": "team-tiril.webp",
  "02_Ansatte_i_arbeid/09_frisor_foner_dame.webp": "team-kasper.webp",
  "04_Detaljer/07_frisor_produkter.webp": "team-ronja.webp",
  "04_Detaljer/01_verktoy_sakser.webp": "detalj-verktoy.webp",
  "04_Detaljer/02_produkthylle.webp": "detalj-produkter.webp",
  "04_Detaljer/03_ventesone.webp": "detalj-ventesone.webp",
  "04_Detaljer/04_fargebehandling.webp": "detalj-vask.webp",
  "04_Detaljer/05_neon_tekst.webp": "detalj-neon.webp",
  "04_Detaljer/08_sakser_naerbilde.webp": "detalj-sakser.webp",
};

for (const f of fs.readdirSync(path.join(kilde, "03_Haarmodeller"))) {
  const navn = f.replace(/^(\d+)_/, "frisyre-$1-").replace(/_/g, "-");
  filer[`03_Haarmodeller/${f}`] = navn;
}

for (const [fra, til] of Object.entries(filer)) {
  const buf = fs.readFileSync(path.join(kilde, fra));
  // WebP-filene fra pakken er allerede små. Bare PNG gjøres om.
  if (fra.endsWith(".webp")) fs.writeFileSync(path.join(ut, til), buf);
  else await sharp(buf).webp({ quality: 80 }).toFile(path.join(ut, til));
}

// Delingsbilde 1200 x 630 fra heltebildet, som har logoen på veggen.
await sharp(fs.readFileSync(path.join(kilde, "01_Salong/01_hero_salong_med_logo.png")))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile("app/opengraph-image.png");

// iPhone-ikon fra app/icon.svg.
await sharp(fs.readFileSync("app/icon.svg"), { density: 400 }).resize(180, 180).png().toFile("app/apple-icon.png");

console.log(`${Object.keys(filer).length} bilder lagt i ${ut}`);
