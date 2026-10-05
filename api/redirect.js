export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const envUrl = process.env.GAS_URLS || "";
  const gasRouterUrl = envUrl.split(",")[0]?.trim(); // Mengambil URL router gas

  if (!gasRouterUrl) {
    return res.status(500).json({ error: "GAS_URLS belum diisi di Vercel Settings" });
  }

  try {
    // Memanggil API router gas untuk mendapatkan target sertifikat
    const response = await fetch(gasRouterUrl);
    const data = await response.json();

    if (data && data.url) {
      return res.status(200).json({ url: data.url });
    } else {
      throw new Error("Respon GAS tidak valid");
    }
  } catch (err) {
    return res.status(500).json({ error: "Gagal menghubungkan ke router GAS", details: err.message });
  }
}
