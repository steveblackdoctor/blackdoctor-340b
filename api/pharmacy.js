export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { zip } = req.query;
  if (!/^\d{5}$/.test(zip)) return res.status(400).json({ error: "Invalid zip" });

  // 1. Try HRSA server-side (no CORS issues here)
  let hrsaError = null;
  try {
    const response = await fetch(
      `https://340bopais.hrsa.gov/api/coveredentities/search?zipCode=${zip}&miles=25&pageSize=20&pageNumber=1`,
      { headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" } }
    );
    if (response.ok) {
      let data;
      try { data = JSON.parse(await response.text()); } catch { /* fall through */ }
      if (data) {
        const items = data.items || data.data || data.results || (Array.isArray(data) ? data : []);
        if (items.length > 0) return res.status(200).json({ items, source: "hrsa" });
      }
    } else {
      hrsaError = `HRSA ${response.status}: ${await response.text().then(t => t.slice(0, 200))}`;
    }
  } catch (err) { hrsaError = err.message; }

  // 2. Claude fallback
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: "You are a 340B covered entity lookup assistant. Respond ONLY with a JSON array (no markdown) of up to 8 likely 340B covered entities near the given zip code. Each object: {name, type, city, state, phone, address}. type: one of FQHC, DSH, CAH, RRC, Children's Hospital.",
        messages: [{ role: "user", content: `340B covered entities near zip ${zip}` }],
      }),
    });
    const data = await response.json();
    const text = data.content?.map(b => b.text || "").join("") || "[]";
    const items = JSON.parse(text.replace(/```json|```/g, "").trim());
    return res.status(200).json({ items, source: "ai", hrsaError });
  } catch (err) {
    return res.status(500).json({ error: "Could not retrieve data", hrsaError, claudeError: err.message, items: [] });
  }
}
