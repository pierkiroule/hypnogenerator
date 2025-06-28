import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// 🔐 Chargement du fichier .env
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = 3001;

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());

const API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!API_TOKEN) {
  console.error("❌ Token REPLICATE_API_TOKEN manquant dans .env.local");
  process.exit(1);
}

console.log("🔐 Token chargé :", API_TOKEN.slice(0, 10) + "...");

// 🧠 Génération de texte hypnopoétique
app.post("/api/haiku", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "⛔ Prompt manquant" });

  try {
    const response = await fetch("https://api.replicate.com/v1/models/anthropic/claude-3.5-haiku/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
      : String(result.output || "").trim();

    res.json({ text });
  } catch (err) {
    console.error("💥 Erreur lors de la génération de texte :", err);
    res.status(500).json({ error: "Erreur backend haiku" });
  }
});

// 🎨 Génération d'image avec Flux Schnell
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "⛔ Prompt manquant" });

  try {
    const response = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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

    res.json({ output: result.output });
  } catch (err) {
    console.error("💥 Erreur lors de la génération d’image :", err);
    res.status(500).json({ error: "Erreur backend image" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend actif : http://localhost:${PORT}`);
});