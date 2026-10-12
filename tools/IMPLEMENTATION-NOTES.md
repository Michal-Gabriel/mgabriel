# Wdrożenie briefu — 2026-10-12

Zmiany są lokalne, bez commita i pusha. Zachowano zastane zmiany pozycjonowania, copy, palety oraz reduced-motion. Ostatni commit pozostaje `8aaf1ed`.

## Wynik

- Samodzielna 404, canonical, og:url, og:site_name, og:locale, sitemap i robots.
- Trzy warianty szablonu Open Graph 1200 × 630 i docelowe metadane.
- Person i dwa Article: schema.org — 0 błędów, 0 ostrzeżeń.
- Zdjęcie 512 × 512, bez EXIF: WebP 17 130 B, JPEG 52 040 B. Oryginał pozostaje.
- Sips nie obsługuje zapisu WebP; użyto @squoosh/cli. Dla zgodności z Node 25 wyłączono globalne fetch tylko w tymczasowym procesie konwersji, bez zmiany projektu.
- Usunięto nieużywane providery, NavLink, NotFound i zależność react-router-dom; zachowano MotionConfig.
- Dwie historie w osobnych chunkach. Main: 457,13 → 294,02 KB, gzip 146,31 → 95,31 KB. Osobne chunki: 12,04 i 7,48 KB.
- Zakładki Experience mają role ARIA, jeden tab stop, przeniesienie fokusu, strzałki, Home/End. Orientacja odpowiada układowi: pozioma na telefonie, pionowa od 640 px.
- Kolejność: About → How I Work → Success Stories → Experience → Contact; numeracja i menu zgodne.
- Work(), PROJECTS, IconFolder i IconExternal celowo pozostawione.

## Sprawdzenie

- `npx tsc --noEmit`, `npx tsc --noEmit -p tsconfig.app.json`, `npm run build`, `git diff --check`: OK.
- `dist/404.html` samodzielny, bez /assets/; sitemap poprawny XML z trzema URL, data 2026-10-12.
- Metadane i JSON-LD zweryfikowane również w HTML po buildzie.
- Widoki 375 i 1440 px: hero, proof bar, oferta; brak poziomego przepełnienia dokumentu.
- Obie historie, linki powrotne, CTA hero oraz pozycje menu sprawdzone w przeglądarce.
- Zakładki: mysz, strzałki, zawijanie, Home, End i Tab do panelu sprawdzone.
- Kontakt ma `mailto:michal.gabriel3@gmail.com?subject=Data%20Trust%20Check`. Nie wysyłano maila ani nie otwierano zewnętrznego klienta.
- Konsola aplikacji bez błędów. 404 sprawdzona przy 375 px.

## Pozostało przed publikacją

Zgodnie z briefem nie wygenerowano PNG Open Graph. Metadane już wskazują ich docelowe adresy; plików nie ma jeszcze w public/ ani dist/. Instrukcja i trzy komendy są w [OG-IMAGES.md](OG-IMAGES.md). Po ich wykonaniu ponownie uruchom build, sprawdź wymiary i pliki w dist/. Po osobno zatwierdzonym deployu sprawdź podglądy w LinkedIn Post Inspector.

## Pliki zmienione przez tę realizację

- `index.html`
- `success-stories/eleven-out-of-170/index.html`
- `success-stories/doubling-registration-conversion/index.html`
- `public/404.html` (nowy)
- `public/sitemap.xml` (nowy)
- `public/robots.txt`
- `public/profile-512.jpg` (nowy)
- `public/profile-512.webp` (nowy)
- `src/App.tsx`
- `src/pages/Index.tsx`
- `src/components/NavLink.tsx` (usunięty)
- `src/pages/NotFound.tsx` (usunięty)
- `package.json`
- `package-lock.json`
- `tools/og-template.html` (nowy)
- `tools/OG-IMAGES.md` (nowy)
- `tools/IMPLEMENTATION-NOTES.md` (nowy)

`src/index.css` nadal zawiera wyłącznie zastane niezacommitowane zmiany; podczas tej realizacji go nie edytowano.
