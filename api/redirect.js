export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const envUrls = process.env.GAS_URLS || "";
  const webAppURLs = envUrls.split(",").map(url => url.trim()).filter(Boolean);

  if (webAppURLs.length === 0) {
    return res.status(500).send("GAS_URLS belum diisi di Vercel Settings.");
  }

  const randomIndex = Math.floor(Math.random() * webAppURLs.length);
  const targetURL = webAppURLs[randomIndex];

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cek Sertifikat</title>
      <style>
        html, body {
          margin: 0; padding: 0;
          width: 100%; height: 100%;
          overflow: hidden;
          background-color: #ffffff;
        }
        iframe {
          width: 100%; height: 100%;
          border: none; outline: none;
        }
      </style>
    </head>
    <body>
      <iframe src="${targetURL}" allow="geolocation; microphone; camera"></iframe>
    </body>
    </html>
  `;

  return res.status(200).send(htmlContent);
}
