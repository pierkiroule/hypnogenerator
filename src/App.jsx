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
          prompt: `
À partir de ce vécu :
« ${vecu} »

Invite doucement à explorer un paysage sensoriel intérieur.

Inspire-toi des transitions naturelles et des états de métamorphose :
une goutte devient onde, un souffle devient rythme, un silence devient voix.

Fais vibrer les 3 grandes dimensions de la conscience :
— Dedans / Dehors : ce qui vibre en soi et ce qui appelle de l’extérieur.  
— Passé / Futur : ce qui murmure du souvenir, ce qui souffle une possibilité.  
— Infiniment Petit / Infiniment Grand : le détail fragile et l’immensité diffuse.

Traverse symboliquement cinq membranes de résonance :
1. **Morphose** : sensations de forme, de mouvement, de transformation.  
2. **Chronose** : rythmes, lenteur, accélérations du temps.  
3. **Sémiose** : signes, symboles, messages perçus ou imaginés.  
4. **Ontose** : impressions d’être, présences invisibles, profondeurs existentielles.  
5. **Technose** : textures artificielles, échos hybrides, interfaces sensibles.

Utilise un langage suggestif, sensoriel, synesthésique :  
— des sons invisibles,  
— des lumières qui vibrent,  
— des odeurs qui chantent,  
— des textures liquides ou granuleuses.

Fais émerger un **paysage sonore halluciné**, une **topographie intime**, un monde flottant entre rêve et corps.

Termine le texte par une **résonance existentielle subtile**,  
comme un noyau sensoriel qui palpite encore,  
une onde émotionnelle suspendue dans l’espace du lecteur.
`,
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
          prompt: `
Image inspirée du texte suivant :
"${texteResonant}"

Abstraite, immersive, bleutée.
Suggère un paysage sonore intérieur.
Ondes, flux, bulles, textures fines.
Pas de scène figurative. Projetif. Suggestif.
Style poétique, éthéré, doux.
          `,
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
        background: rgba(255, 255, 255, 0.15);
        animation: float 15s linear infinite;
        pointer-events: none;
        aspect-ratio: 1 / 1;
      }
      @keyframes float {
        0% { transform: translateY(0) scale(1); opacity: 0.4; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-130vh) scale(1.2); opacity: 0; }
      }
      .content {
        position: relative;
        z-index: 2;
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
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 100}px`,
            width: `30px`,
            animationDuration: `${10 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      <div className="content">
        <h1>🎧 Générateur de Résonances HypnoSonores</h1>
        <p>
          Ce dispositif est une expérimentation de suggestion poétique
          conçue pour éveiller l’imaginaire auditif. Écris ou dicte un
          vécu sensoriel... et laisse émerger un paysage sonore intérieur.
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