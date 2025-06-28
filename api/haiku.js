export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Méthode non autorisée");

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt manquant" });

  try {
    const response = await fetch("https://api.replicate.com/v1/models/anthropic/claude-3.5-haiku/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        input: { prompt },
        stream: false,
      }),
    });

    const result = await response.json();

    if (result.error) return res.status(500).json({ error: result.error });

    const text = Array.isArray(result.output)
      ? result.output.join("")
      : String(result.output);

    res.status(200).json({ text });
  } catch (err) {
    console.error("Erreur haiku :", err);
    res.status(500).json({ error: "Erreur API haiku" });
  }
}