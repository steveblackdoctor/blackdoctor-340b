export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { zip } = req.query;
  if (!/^\d{5}$/.test(zip)) return res.status(400).json({ error: "Invalid zip" });

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
        system: "You are a 340B covered entity lookup assistant. Respond ONLY with a JSON array (no markdown) of up to 8 real 340B covered entities near the given zip code. Each object must have: {name, type, city, state, phone, address}. type: one of FQHC, DSH, CAH, RRC, Children's Hospital. Always return at least a few results for populated areas.",
        messages: [{ role: "user", content: `340B covered entities near zip ${zip}` }],
      }),
    });
    const data = await response.json();
    const text = data.content?.map(b => b.text || "").join("") || "[]";
    let items;
    try { items = JSON.parse(text.replace(/```json|```/g, "").trim()); } catch { items = []; }
    return res.status(200).json({ items, source: "ai", raw: text.slice(0, 500), claudeError: data.error });
  } catch (err) {
    return res.status(500).json({ error: err.message, items: [] });
  }
}
