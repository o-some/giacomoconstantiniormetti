# Iormetti Concepts — Prüfstand

Stand: 18.09.2026. Status: **REVIEW CANDIDATE**, nicht öffentlich veröffentlicht.

| Prüfung | Ergebnis | Beleg / Grenze |
|---|---|---|
| Referenz 044 identifiziert | BESTÄTIGT | Dropbox-Datei `[044] [Fitness] – Built Different.png`, Revision im Projektzustand |
| Referenz visuell geöffnet | BESTÄTIGT | Zehn Druckseiten; Rot/Creme, schmale Versalien, monochrome Sportmotive |
| CAF / MasterBrain gelesen | BESTÄTIGT | 1.21.0 / 4.6.1; Bootstrap 1.8.0; relevante Web-/Designmodule |
| Ausführbarer CAF-Kernel | NICHT AUSGEFÜHRT | Native Erstellung anhand gelesener Arbeitsverträge; kein behaupteter Runtime-/Resolver-PASS |
| Bilder | ERSTELLT UND INSPIZIERT | Sechs eigenständige Fotomotive + Logoentwurf; Bildagent kontrollierte alle Dateien, Hauptlauf kontrollierte Hero, Training und Logo |
| JavaScript-Syntax | BESTANDEN | `node --check site/app.js` |
| Lokale Assets / Sprungziele | BESTANDEN | Keine fehlenden Dateien oder Anker; keine doppelten IDs |
| Dokumentstruktur | TEILWEISE GEPRÜFT | Ein H1, sechs Bilder mit Alt-Text, semantische Bereiche und native Formfelder |
| Textfarben | RECHNERISCH GEPRÜFT | Ink/Paper 13,48:1; Red/Paper 8,01:1; Stone/Paper 5,35:1; Warm White/Red 8,74:1; Pale Ochre/Red 4,91:1 |
| Externe Laufzeitressourcen | KEINE GEFUNDEN | Bilder, CSS, JS und Schrift liegen lokal |
| Netzwerkversand Formular | NICHT VORHANDEN | Gesprächsnotiz bleibt im Arbeitsspeicher des Browsers und wird nur auf Wunsch heruntergeladen |
| Browser-/Interaktionstest | BLOCKIERT | Cloud-Browser lehnt localhost und Datei-URLs ab; keine Umgehung, keine Screenshot-Evidence |
| Mobil/Desktop/Ultra-wide | NICHT GERENDERT GEPRÜFT | Responsive Regeln implementiert; tatsächliche Prüfung ausstehend |
| Reduced Motion | IMPLEMENTIERT, NICHT IM BROWSER GEPRÜFT | CSS-Mediaquery und JS-Zweig vorhanden |
| Unabhängige visuelle Abnahme | OFFEN | Ohne gerenderte Evidence keine Premium-Freigabe |
| Echte Kundenidentität im Bild | NICHT VERWENDET | Alle Sportmotive illustrativ; keine Bilder von Giacomo vorgelegt |
| Public Release | GESPERRT | Kontakt, Betreiberangaben, Angebotsbestätigung, Designfreigabe und gerenderte QA fehlen |

## Grenzen

Keine Behauptung über bestandene Live-, Safari-, Endgeräte-, Datenschutz- oder vollständige Accessibility-Prüfungen. Keine R7-Freigabe und keine pauschale 60-Domänen-Zertifizierung. Geschäftliche Texte sind konkrete Entwürfe für die Kundenfreigabe.

## Nächste konkrete Schritte

1. Website lokal öffnen, Desktop und 360/390/430/768/1440/2560 px prüfen; Navigation, Formular, Download, FAQ und Reduced Motion ausführen.
2. Kontakt-/Buchungsweg sowie Betreiberinformationen und tatsächliche Angebote eintragen.
3. Reale Datenschutz-/Rechtstexte für die dann festgelegte Produktion erstellen und fachlich prüfen.
4. Design freigeben; erst danach öffentliche Bereitstellung auf dem vereinbarten GitHub-/Hosting-Weg.

## Unabhängige statische Prüfung und Korrekturen

Separater Prüfer untersuchte HTML/CSS/JS. Drei Befunde wurden korrigiert: Formular initial gesperrt und erst nach Registrierung des lokalen Handlers aktiviert; Navigation ohne JavaScript bleibt mobil sichtbar; offenes mobiles Menü erhält eine viewportbezogene Maximalhöhe und eigenes vertikales Scrollen. Syntax erneut geprüft. Die Umsetzung dieser Korrekturen wurde statisch geprüft, nicht im Browser ausgeführt.
