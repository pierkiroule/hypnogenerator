import { useState, useEffect } from "react";

function App() {
  const [vecu, setVecu] = useState("");
  const [texteResonant, setTexteResonant] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingTexte, setLoadingTexte] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await genererTexte(vecu);
  };

  const genererTexte = async (vecu) => {
    setLoadingTexte(true);
    setTexteResonant("");
    try {
      const res = await fetch("/api/haiku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `...`, // ton prompt complet ici (inchangé)
        }),
      });
      const result = await res.json();
      setTexteResonant(result.text || "Texte non généré.");
    } catch (err) {
      console.error("Erreur génération texte :", err);
    }
    setLoadingTexte(false);
  };

  const genererImage = async () => {
    setLoadingImage(true);
    setImageUrl("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `...`, // prompt image inchangé
        }),
      });
      const result = await res.json();
      setImageUrl(result.output[0]);
    } catch (err) {
      console.error("Erreur génération image :", err);
    }
    setLoadingImage(false);
  };

  const resetAll = () => {
    setVecu("");
    setTexteResonant("");
    setImageUrl("");
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        padding: 0;
        background: #0e1f3f;
        color: #e0f7fa;
        font-family: sans-serif;
        overflow-x: hidden;
      }
      .app-container {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
        padding: 2rem;
        box-sizing: border-box;
      }
      .bubble {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        filter: blur(2px);
        animation: float 20s ease-in-out infinite;
      }
      .bubble.layer1 {
        width: 60px;
        height: 60px;
        z-index: 1;
        animation-duration: 30s;
        opacity: 0.2;
      }
      .bubble.layer2 {
        width: 40px;
        height: 40px;
        z-index: 2;
        animation-duration: 20s;
        opacity: 0.4;
      }
      .bubble.layer3 {
        width: 25px;
        height: 25px;
        z-index: 3;
        animation-duration: 12s;
        opacity: 0.7;
      }
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-50vh) translateX(5px); }
        100% { transform: translateY(0) translateX(-5px); }
      }
      .content {
        position: relative;
        z-index: 4;
        max-width: 700px;
        margin: 0 auto;
      }
      textarea {
        width: 100%;
        padding: 1em;
        font-size: 1rem;
        border-radius: 0.7rem;
        border: none;
        resize: vertical;
        background: rgba(255, 255, 255, 0.1);
        color: #e0f7fa;
      }
      button {
        margin-top: 1em;
        margin-right: 0.5em;
        padding: 0.7em 1.2em;
        font-size: 1rem;
        border: none;
        border-radius: 0.7rem;
        background-color: #1976d2;
        color: white;
        cursor: pointer;
      }
      .text-section {
        margin-top: 2rem;
        white-space: pre-wrap;
        background: rgba(255, 255, 255, 0.07);
        padding: 1rem;
        border-radius: 1rem;
      }
      img {
        margin-top: 1rem;
        max-width: 100%;
        border-radius: 1rem;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="app-container">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`l1-${i}`}
          className="bubble layer1"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 100}px`,
          }}
        />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`l2-${i}`}
          className="bubble layer2"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 100}px`,
          }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`l3-${i}`}
          className="bubble layer3"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 100}px`,
          }}
        />
      ))}

      <div className="content">
        <h1>🎧 Générateur de Résonances HypnoSonores</h1>
        <p>
          Ce dispositif est une expérimentation de suggestion poétique conçue
          pour éveiller l’imaginaire auditif. Écris ou dicte un vécu sensoriel...
          et laisse émerger un paysage sonore intérieur.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="vecu">🌬️ Que veux-tu faire résonner ?</label>
          <textarea
            id="vecu"
            name="vecu"
            placeholder="Un son, une sensation, un souvenir..."
            rows={5}
            value={vecu}
            onChange={(e) => setVecu(e.target.value)}
          />
          <button type="submit" disabled={!vecu || loadingTexte}>
            ✨ Générer le texte
          </button>
          <button type="button" onClick={resetAll}>
            🔄 Réinitialiser
          </button>
        </form>

        {loadingTexte && <p>⏳ Création du texte...</p>}

        {texteResonant && (
          <div className="text-section">
            <h2>🌌 Résonance générée</h2>
            <p>{texteResonant}</p>
            <button onClick={genererImage} disabled={loadingImage}>
              {loadingImage ? "🖼️ En cours..." : "🎨 Générer une image"}
            </button>
          </div>
        )}

        {imageUrl && (
          <div className="image-result">
            <img src={imageUrl} alt="Image inspirée du texte" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
