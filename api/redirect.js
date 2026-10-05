export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const mainUrl = process.env.GAS_URLS;

  if (!mainUrl) {
    return res.status(500).send("Variabel GAS_URLS belum diisi di Settings Vercel.");
  }

  try {
    const response = await fetch(mainUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.url) {
      return res.redirect(302, data.url);
    } else {
      return res.status(500).send("Format JSON dari Apps Script tidak sesuai.");
    }
  } catch (error) {
    console.error("Gagal mengalihkan via Vercel:", error);
    return res.status(500).send("Gagal mengarahkan ke halaman sertifikat.");
  }
}
