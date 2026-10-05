export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const mainUrl = process.env.GAS_MAIN_URL;

  if (!mainUrl) {
    return res.status(500).json({ error: "GAS_MAIN_URL belum diatur di Vercel" });
  }

  try {
    
    const response = await fetch(mainUrl);
    const data = await response.json();

    if (data && data.url) {
      return res.status(200).json({ url: data.url });
    } else {
      return res.status(500).json({ error: "Data URL tidak ditemukan pada respon Apps Script" });
    }
  } catch (error) {
    console.error("Gagal memanggil Apps Script:", error);
    return res.status(500).json({ error: "Gagal mengambil data dari Apps Script" });
  }
}
