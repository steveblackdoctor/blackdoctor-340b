export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { zip } = req.body;

  if (!/^\d{5}$/.test(zip)) {
    return res.status(400).json({ error: "Invalid zip code" });
  }

  try {
    const response = await fetch(
      `https://340bopais.hrsa.gov/api/coveredentities/search?zipCode=${zip}&miles=25&pageSize=20&pageNumber=1`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { return res.status(500).json({ error: "Invalid response from HRSA", raw: text.slice(0, 300) }); }

    const items = data.items || data.data || data.results || (Array.isArray(data) ? data : []);
    res.status(200).json({ items, raw: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
