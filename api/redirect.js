export default function handler(req, res) {
  const envUrls = process.env.GAS_URLS || "";
  const webAppURLs = envUrls.split(",").map(url => url.trim()).filter(Boolean);

  if (webAppURLs.length === 0) {
    return res.status(500).json({ error: "Variabel GAS_URLS belum diisi di Vercel" });
  }

  const randomIndex = Math.floor(Math.random() * webAppURLs.length);
  const targetURL = webAppURLs[randomIndex];

  return res.status(200).json({ url: targetURL });
}
