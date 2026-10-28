// Vercel serverless function: proxies satellite tiles so the key never reaches the browser.
module.exports = async function (req, res) {
  const { z, x, y } = req.query;
  if (![z, x, y].every(function (v) { return /^\d{1,7}$/.test(String(v)); })) {
    return res.status(400).send("Bad request");
  }
  const key = process.env.MAPTILER_KEY;
  if (!key) return res.status(500).send("MAPTILER_KEY not set");
  try {
    const r = await fetch("https://api.maptiler.com/tiles/satellite-v2/" + z + "/" + x + "/" + y + ".jpg?key=" + key);
    if (!r.ok) return res.status(r.status).send("Upstream error");
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400");
    res.status(200).send(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    res.status(502).send("Fetch failed");
  }
};
