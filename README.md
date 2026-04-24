# Teichträume

Website für **teichtraeume.de** — Spezialist für Koiteiche, Hürtgenwald.

Eine statische Single-Page-Seite mit React (via Babel Standalone im Browser) — **kein Build-Step, kein Node nötig**. Einfach die Dateien hochladen, fertig.

---

## Struktur

```
.
├── index.html              # Hauptseite
├── impressum.html          # Impressum & Datenschutz
├── app.jsx                 # App-Shell (Palette, Hero-Switch, Tweaks)
├── sections.jsx            # Alle Sections (Nav, Hero, About, Services, …)
├── ripples.jsx             # Cursor-Ripple-Effekt auf dem Hero
├── tweaks-panel.jsx        # Tweaks-Panel-Komponenten
├── assets/
│   ├── logo.svg
│   ├── hero.jpeg
│   └── image1–4.jpeg
├── CNAME                   # → teichtraeume.de (für GitHub Pages)
└── .nojekyll               # GitHub Pages soll nicht als Jekyll-Seite bauen
```

---

## Lokal testen

Einfach einen kleinen HTTP-Server im Projektordner starten (keine `file://` URL —
React/Babel brauchen HTTP):

```bash
# Python
python3 -m http.server 8000

# oder Node
npx serve .
```

Dann `http://localhost:8000` öffnen.

---

## Deploy via GitHub Pages

### 1. Repository anlegen

Auf GitHub neues Repo erstellen, z. B. `teichtraeume` (beliebiger Name).

### 2. Dateien hochladen

```bash
cd <projektordner>
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:<USER>/teichtraeume.git
git push -u origin main
```

### 3. GitHub Pages aktivieren

Im Repo:
**Settings → Pages**
- **Source:** `Deploy from a branch`
- **Branch:** `main` · Ordner: `/ (root)`
- **Save**

Nach 1–2 Minuten ist die Seite erreichbar unter
`https://<USER>.github.io/teichtraeume/`.

### 4. Eigene Domain `teichtraeume.de` einrichten

Die Datei `CNAME` im Root enthält bereits `teichtraeume.de` — GitHub liest das
automatisch. In den **Settings → Pages → Custom domain** sollte sie
erscheinen. Dort auch **Enforce HTTPS** aktivieren (sobald verfügbar, ca. 5–30 min
nach korrektem DNS).

#### DNS-Einträge beim Domain-Provider (IONOS / united-domains / INWX / …)

Für **Apex** (`teichtraeume.de`) — vier **A-Records** auf GitHub Pages IPs:

| Typ | Host / Name | Wert            |
| --- | ----------- | --------------- |
| A   | `@`         | `185.199.108.153` |
| A   | `@`         | `185.199.109.153` |
| A   | `@`         | `185.199.110.153` |
| A   | `@`         | `185.199.111.153` |

Optional: IPv6 (AAAA):

| Typ  | Host | Wert                  |
| ---- | ---- | --------------------- |
| AAAA | `@`  | `2606:50c0:8000::153` |
| AAAA | `@`  | `2606:50c0:8001::153` |
| AAAA | `@`  | `2606:50c0:8002::153` |
| AAAA | `@`  | `2606:50c0:8003::153` |

Für **www** (`www.teichtraeume.de`) — ein **CNAME**:

| Typ   | Host  | Wert                      |
| ----- | ----- | ------------------------- |
| CNAME | `www` | `<USER>.github.io`        |

> ⚠️ Bestehende `A`-/`CNAME`-Einträge auf `@` und `www` vorher entfernen,
> sonst gibt es Konflikte.

DNS-Propagation dauert typischerweise 10 min – 2 h. Mit
`dig teichtraeume.de +short` prüfen — sollte die 4 IPs oben ausgeben.

### 5. Updates veröffentlichen

```bash
git add .
git commit -m "Update"
git push
```

GitHub Pages baut & deployt automatisch (~1 min).

---

## Anpassungen (ohne Code)

Im Browser oben rechts das **Tweaks-Toggle** aktivieren — dort lassen sich
Palette, Hero-Bild und Cursor-Ripple umschalten. Die gewählten Werte werden
direkt in `app.jsx` (zwischen `/*EDITMODE-BEGIN*/` und `/*EDITMODE-END*/`)
persistiert, falls im Claude-Editor gearbeitet wird. Bei reinem
Filesystem-Editor: die Defaults dort manuell ändern.

---

## Technik-Notizen

- **Keine Build-Pipeline.** React 18 + Babel Standalone werden via CDN
  geladen und transpilieren die `.jsx`-Dateien im Browser. Für eine
  Handvoll Besuchern absolut okay — wenn der Traffic wächst, lohnt sich
  ein `npm run build` (Vite), der das JSX vorab kompiliert.
- **Fonts:** Google Fonts (Fraunces, Inter Tight, JetBrains Mono) — werden
  per `<link>` eingebunden, kein Self-Hosting.
- **Bilder:** liegen in `assets/` als JPEG. Für bessere Performance bei
  Bedarf in WebP/AVIF konvertieren.
- **Impressum:** `impressum.html` — Inhalte dort direkt im HTML anpassen.

---

© Teichträume · Tim Afflerbach · Hürtgenwald
