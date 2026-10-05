export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  // Membaca variabel GAS_URLS dari Vercel
  const mainUrl = process.env.GAS_URLS;

  if (!mainUrl) {
    return res.status(500).json({ error: "GAS_URLS belum diisi di Vercel Settings" });
  }

  try {
    const response = await fetch(mainUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`HTTP status error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.url) {
      return res.status(200).json({ url: data.url });
    } else {
      return res.status(500).json({ error: "Format JSON Apps Script tidak sesuai" });
    }
  } catch (error) {
    console.error("Gagal memanggil Apps Script:", error);
    return res.status(500).json({ error: error.message || "Gagal mengambil data dari Apps Script" });
  }
}
