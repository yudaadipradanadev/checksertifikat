export default async function handler(req, res) {
  const mainUrl = process.env.GAS_MAIN_URL;

  if (!mainUrl) {
    return res.status(500).json({ error: "GAS_MAIN_URL belum diatur di Vercel Settings." });
  }

  try {
    
    const response = await fetch(mainUrl);
    const data = await response.json();

    if (data && data.url) {
    
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      return res.redirect(302, data.url);
    } else {
      return res.status(500).send("Format respons Apps Script tidak sesuai.");
    }
  } catch (error) {
    console.error("Gagal memanggil GAS:", error);
    return res.status(500).send("Terjadi kesalahan saat mengarahkan halaman.");
  }
}
