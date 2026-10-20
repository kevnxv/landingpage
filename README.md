# Landingpage – Instagram-Sichtbarkeit für Network-Marketer

Statische Seite ohne Build-Schritt: `index.html` + `assets/` (CSS, JS, Favicon) + `impressum.html` + `datenschutz.html`.

## Vor dem Livegang ersetzen (Suche nach `[`)
- `[MARKE]`, `[Dein Name]` – Markenname (Titel, Logo, Footer, Meta-Tags)
- `[X]` Werktage – Antwortzeit im Kontaktbereich
- `[Calendly-Link]` – `href="#"` der Buttons „Direkt Termin wählen“ / „Termin direkt buchen“ durch den Buchungslink ersetzen
- `[Instagram-Link]` – Footer-Icon
- Formular `#leadForm`:
  - `data-mailto="[deine@email.de]"` → echte E-Mail (öffnet das Mailprogramm des Besuchers), **oder**
  - `data-endpoint="https://formspree.io/f/DEINE-ID"` setzen (Formspree-Konto anlegen) → sendet direkt
- Kundenstimme (Abschnitt „Angebot“) – nur mit echter, freigegebener Stimme füllen, sonst `<figure class="quote">` löschen
- **Impressum & Datenschutzerklärung** (`impressum.html`, `datenschutz.html`) – in Deutschland Pflicht vor Veröffentlichung
- Google Fonts werden von Google geladen – für DSGVO besser lokal hosten oder in der Datenschutzerklärung nennen

## Veröffentlichen
- **Netlify Drop:** app.netlify.com/drop öffnen, Ordner hineinziehen – fertig (eigene Domain optional).
- **GitHub Pages:** Repo anlegen, Dateien hochladen, Settings → Pages → Branch `main` / root.
- Alternativ jeder Webspace (Strato, IONOS, …) per FTP.
