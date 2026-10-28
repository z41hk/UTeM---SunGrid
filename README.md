# UTeM SunGrid

Static campus map of Universiti Teknikal Malaysia Melaka (UTeM). Satellite imagery, roads, labels, and 3D buildings in one page (`index.html`).

Pushes to `main` deploy automatically on Vercel. `api/tile.js` is a serverless proxy for MapTiler satellite tiles so the key never reaches the browser. `MAPTILER_KEY` is set in Vercel environment variables and is never committed.
