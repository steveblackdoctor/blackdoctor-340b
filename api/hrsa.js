export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { zip } = req.body;

  if (!zip || !/^\d{5}$/.test(zip)) {
    return res.status(400).json({ error: "Invalid zip code" });
  }

  try {
    const response = await fetch(
      `https://340bopais.hrsa.gov/api/coveredentities/search?zipCode=${zip}&radius=25&pageSize=20&pageNumber=1`,
      { headers: { "Accept": "application/json" } }
    );

    if (!response.ok) throw new Error("HRSA API error");

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from HRSA API" });
  }
}
