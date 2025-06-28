export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Méthode non autorisée");

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt manquant" });

  try {
    const response = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        input: {
          prompt,
          go_fast: true,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 80,
        },
      }),
    });

    const result = await response.json();
    if (result.error) return res.status(500).json({ error: result.error });

    res.status(200).json({ output: result.output });
  } catch (err) {
    console.error("Erreur image :", err);
    res.status(500).json({ error: "Erreur API image" });
  }
}