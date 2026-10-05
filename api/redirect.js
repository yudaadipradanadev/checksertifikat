export default function handler(req, res) {
  // Matikan cache agar setiap request selalu merotasi URL secara acak
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const envUrls = process.env.GAS_URLS || "";
  const webAppURLs = envUrls.split(",").map(url => url.trim()).filter(Boolean);

  if (webAppURLs.length === 0) {
    return res.status(500).send("GAS_URLS belum dikonfigurasi di Vercel Settings.");
  }

  // Pilih 1 dari 3 URL secara acak di server Vercel (Kecepatan < 5 milidetik)
  const randomIndex = Math.floor(Math.random() * webAppURLs.length);
  const targetURL = webAppURLs[randomIndex];

  // Direct 302 Redirect resmi dari Server Vercel (Menghilangkan Screen Warning Google)
  return res.redirect(302, targetURL);
}
