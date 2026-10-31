# UTeM SunGrid

*Peta kampus 3D untuk menjadikan tenaga solar UTeM nampak dan mudah difahami.*

UTeM SunGrid is an interactive 3D campus map of Universiti Teknikal Malaysia Melaka. It is a Group 2 project for the MPU course *Falsafah dan Isu Semasa*. The aim is to make UTeM’s rooftop solar infrastructure visible and to raise energy-ethics literacy.

The philosophy angle is simple: solar panels on campus roofs are easy to walk past without noticing. Heidegger’s idea of unconcealment (*aletheia*) versus standing-reserve (*Bestand*) is used here as a prompt — energy should not stay an invisible stockpile. The Jevons paradox and “moral licence” warn that cleaner supply can still increase use if we treat it as a free pass. The project also speaks to SDGs 7 (affordable clean energy), 12 (responsible consumption) and 13 (climate action).

## Current status vs roadmap

**Done**

- 3D vector campus map with day/night palettes
- Camera locked to the UTeM main campus, with a mask outside the OSM boundary
- Labels on faculty buildings only
- Click a faculty to open a full-screen modal

**Planned**

- Solar pins and per-building energy figures (clearly marked as *anggaran* until real numbers are supplied)
- “Solar 101” infographic
- “Kuiz Cabaran UTeM SunGrid” multiple-choice quiz

## How it works

There is one static file, `index.html`. No build step, no npm, no API keys.

MapLibre GL JS (4.7.1, unpkg CDN) draws the map. OpenStreetMap data arrives as vector tiles from OpenFreeMap. Roads, water, parks and 3D building boxes are styled in code. Building heights use OSM `render_height` when present, otherwise a default of 9 metres so campus blocks are never flat.

The campus outline is OSM way 587894193 (Kampus Induk). That polygon is hardcoded as `CAMPUS_POLY` and drives both `maxBounds` and the dark outside mask. Faculty labels come from the `BUILDINGS` array. Clicking a faculty opens the modal built by `renderPopup()`.

## Features and controls

- Pan, zoom, rotate and tilt (MapLibre navigation control, top-right)
- **2D / 3D** button: tilt between a pitched view and a flat view
- **☀ / 🌙** button: day or night palette
- Click a faculty building, its label or its dot to open the modal
- Close with the X, Esc, or the dark backdrop — the map then recentres on a top-down view of the whole campus
- `?debug` — chip with live centre coordinates; tap the map to log `[lon, lat]`
- `?nolock` — skip `maxBounds`, the mask and the outline (plain map for debugging)

## Project structure

- `index.html` — page, CSS, map style, campus data, labels, modal
- `README.md` — this file

## Deployment

The GitHub `main` branch is connected to Vercel. Every push to `main` auto-deploys in about a minute. No secrets are required.

Live site: https://utem-sungrid.vercel.app

## How to edit common things

All of this is in `index.html`.

- **Add or rename a faculty** — edit `BUILDINGS` (`id`, `name`, `short`, `lon`, `lat`, `isFaculty`). Non-faculty OSM names live in `OTHER_BUILDINGS` (kept, not labelled).
- **Popup content** — change `renderPopup(building)`. Animation and layout stay outside that function.
- **Colours** — `palettes.day` and `palettes.night`.
- **Campus lock** — `CAMPUS_POLY` (closed `[lon, lat]` ring) and `CAMPUS_BOUNDS` (bbox plus padding). `MASK_OUTER` is the rectangle used as the mask’s outer ring.
- **Start camera** — `mapOpts`: centre `[102.3205, 2.3142]`, zoom `16.8`, pitch `60`, bearing `-20`.
- **Click any building, not only faculties** — set `CLICKABLE_FACULTY_ONLY` to `false`.

## Run locally

From this folder:

```
python -m http.server 8000
```

Then open http://localhost:8000

## Data sources, credits and licences

- Map data © OpenStreetMap contributors, ODbL
- Vector tiles: [OpenFreeMap](https://openfreemap.org)
- Rendering: [MapLibre GL JS](https://maplibre.org) 4.7.1, BSD-3-Clause

## Known limitations

Building heights are approximate. Some OSM names and footprints are missing or unnamed. The map needs an internet connection for tiles and fonts.
