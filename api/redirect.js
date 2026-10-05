export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const envUrls = process.env.GAS_URLS || "";
  
  if (!envUrls) {
    return res.status(500).json({ error: "GAS_URLS belum diatur di Vercel Settings" });
  }

  // Split jika terdapat beberapa URL dipisahkan koma
  const urlList = envUrls.split(',').map(u => u.trim()).filter(Boolean);

  // PILIHAN A: Jika Anda memasukkan 3 URL Apps Script target di Vercel
  // (Paling cepat & tidak perlu hit API Apps Script utama lagi)
  if (urlList.length > 1) {
    const randomIndex = Math.floor(Math.random() * urlList.length);
    return res.status(200).json({ url: urlList[randomIndex] });
  }

  // PILIHAN B: Jika Anda hanya memasukkan 1 URL utama Apps Script
  const mainUrl = urlList[0];

  try {
    const response = await fetch(mainUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script mengembalikan HTTP Status ${response.status}`);
    }

    const data = await response.json();

    if (data && data.url) {
      return res.status(200).json({ url: data.url });
    } else {
      return res.status(500).json({ error: "Format JSON Apps Script tidak memiliki properti 'url'" });
    }
  } catch (error) {
    console.error("Gagal memanggil Apps Script:", error);
    return res.status(500).json({ error: error.message || "Gagal mengambil data dari Apps Script" });
  }
}
