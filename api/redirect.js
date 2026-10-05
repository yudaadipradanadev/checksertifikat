export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const defaultUrls = [
    "https://script.google.com/macros/s/AKfycbwB3QwbBXXQk-L3_rZmfTx4xyrwLlrTbDqmM5RPecShxpk1JOt5VI-UpdNfnz9FN_QF/exec",
    "https://script.google.com/macros/s/AKfycbzxruqB4jXjwZlHF-gH989DgEfmwoBJD7GCbyJlHPiCOCTT1CvCLO51HR55SbI9Lr2i/exec",
    "https://script.google.com/macros/s/AKfycbyqURVj5DUu3HPhJZwXAmHrD7DfEgWnicg4QEY7X4r3WU4EuMVPZ5CpxV66CTlpGy-t/exec"
  ];


  const envUrls = process.env.GAS_URLS || "";
  const webAppURLs = envUrls
    ? envUrls.split(",").map(url => url.trim()).filter(Boolean)
    : defaultUrls;


  const randomIndex = Math.floor(Math.random() * webAppURLs.length);
  const targetURL = webAppURLs[randomIndex];

  return res.status(200).json({ url: targetURL });
}
