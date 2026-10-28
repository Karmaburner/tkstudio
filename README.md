# TK Studio · demo

Demoside laget av [Lilit Labs](https://lilitlabs.com) for å vise hva en frisørsalong kan få. Salongen finnes ikke. Navn, personer, priser og adresse er oppdiktet, og bildene er laget med KI.

Live: https://karmaburner.github.io/tkstudio/

## Kjøre lokalt

```bash
npm install
npm run dev -- --port 3120
```

Ved `npm run build` lages en statisk versjon i `out/` med undermappen `/tkstudio`, som GitHub Pages bruker.

## Endre innhold

Alt innhold (åpningstider, priser, teamet, frisyrer og bilder) ligger i `lib/salong.ts`.

## Bilder

Originalene ligger i `bilder-original/` og er ikke med i git. `node scripts/lag-bilder.mjs` kopierer dem til `public/bilder` med korte navn og lager delingsbilde og iPhone-ikon.

## Publisering

Hver push til `main` bygges og legges ut av `.github/workflows/pages.yml`.
