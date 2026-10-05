export default function handler(req, res) {
  // Matikan cache agar setiap request merotasi URL baru
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const envUrls = process.env.GAS_URLS || "";
  const webAppURLs = envUrls.split(",").map(url => url.trim()).filter(Boolean);

  if (webAppURLs.length === 0) {
    return res.status(500).send("GAS_URLS belum diisi dengan benar di Settings Vercel.");
  }

  // Rotasi acak di server Vercel (Super Kilat & Tanpa Error Response)
  const randomIndex = Math.floor(Math.random() * webAppURLs.length);
  const targetURL = webAppURLs[randomIndex];

  // Direct 302 Redirect resmi dari Server Vercel
  return res.redirect(302, targetURL);
}
