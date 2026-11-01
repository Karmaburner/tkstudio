// Lager mindre utgaver av hvert bilde i public/bilder, så mobiler slipper å hente
// større filer enn de viser. Navn: salong-hero-w540.webp osv.
// Skriver lib/bildestorrelser.json med bredden på originalen og hvilke mindre utgaver som finnes.
// Foto-komponenten lager srcSet ut fra den.
// Kjøres fra prosjektmappen: node scripts/lag-storrelser.mjs (kjøres også på slutten av lag-bilder.mjs)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);

const mappe = "public/bilder";
const bredder = [360, 540, 720];
const liste = {};

// Gamle håndlagde utgaver (salong-hero-720, frisyre-27-...-700) og våre egne hoppes over.
const erUtgave = (f) => /-(w?\d{3,4})\.webp$/.test(f);

for (const f of fs.readdirSync(mappe).filter((f) => f.endsWith(".webp") && !erUtgave(f)).sort()) {
  const fil = path.join(mappe, f);
  const { width } = await sharp(fil).metadata();
  const navn = f.replace(/\.webp$/, "");
  const lagd = [];
  // Bare utgaver som er tydelig mindre enn originalen. Ellers er gevinsten for liten.
  for (const w of bredder.filter((w) => w <= width * 0.85)) {
    const ut = path.join(mappe, `${navn}-w${w}.webp`);
    if (!fs.existsSync(ut) || fs.statSync(ut).mtimeMs < fs.statSync(fil).mtimeMs)
      await sharp(fil).resize(w).webp({ quality: 74 }).toFile(ut);
    lagd.push(w);
  }
  liste[f] = { w: width, utgaver: lagd };
}

fs.writeFileSync("lib/bildestorrelser.json", JSON.stringify(liste, null, 1) + "\n");
console.log(`${Object.keys(liste).length} bilder, ${Object.values(liste).reduce((s, x) => s + x.utgaver.length, 0)} mindre utgaver`);
