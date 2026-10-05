export default async function handler(req, res) {
  // Set Header CORS & Anti-Cache
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const mainUrl = process.env.GAS_URLS;

  if (!mainUrl) {
    return res.status(500).json({ error: "Terjadi Kesalah Server" });
  }

  try {
    // Memanggil Google Apps Script di sisi server
    const response = await fetch(mainUrl, {
      method: 'GET',
      redirect: 'follow' // Mengikuti redirect Google Apps Script secara otomatis
    });

    if (!response.ok) {
      throw new Error(`HTTP status error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.url) {
      return res.status(200).json({ url: data.url });
    } else {
      return res.status(500).json({ error: "Format JSON tidak memiliki properti 'url'" });
    }
  } catch (error) {
    console.error("Gagal memanggil GAS via Vercel:", error);
    return res.status(500).json({ error: error.message || "Gagal mengambil data dari Apps Script" });
  }
}
