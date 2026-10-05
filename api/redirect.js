export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const mainUrl = process.env.GAS_MAIN_URL;

  if (!mainUrl) {
    return res.status(500).json({ error: "GAS_MAIN_URL belum diatur di Vercel Settings." });
  }

  try {

    const response = await fetch(mainUrl);
    const data = await response.json();

    if (data && data.url) {

      return res.status(200).json({ url: data.url });
    } else {
      return res.status(500).json({ error: "Format data tidak sesuai" });
    }
  } catch (error) {
    console.error("Error pada API Vercel:", error);
    return res.status(500).json({ error: "Gagal mengambil URL dari Apps Script" });
  }
}
