import { useState } from "react";

function ExplorationForm({ onSubmit }) {
  const [inputs, setInputs] = useState({
    sonMarquant: "",
    morphose: "",
    chronose: "",
    semiose: "",
    ontose: "",
    technose: "",
    phraseCoeur: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="exploration-form">
      <h2>1. Exploration sensorielle</h2>

      <label>🔊 Un son marquant</label>
      <input name="sonMarquant" value={inputs.sonMarquant} onChange={handleChange} />

      <label>🟢 Morphose (ressenti corporel)</label>
      <input name="morphose" value={inputs.morphose} onChange={handleChange} />

      <label>🔵 Chronose (relation au temps)</label>
      <input name="chronose" value={inputs.chronose} onChange={handleChange} />

      <label>🟡 Sémiose (image ou symbole)</label>
      <input name="semiose" value={inputs.semiose} onChange={handleChange} />

      <label>🟣 Ontose (présence ressentie)</label>
      <input name="ontose" value={inputs.ontose} onChange={handleChange} />

      <label>🟤 Technose (appui ou soutien)</label>
      <input name="technose" value={inputs.technose} onChange={handleChange} />

      <label>💬 Ma phrase-cœur</label>
      <input name="phraseCoeur" value={inputs.phraseCoeur} onChange={handleChange} />

      <button type="submit">Valider l’exploration</button>
    </form>
  );
}

export default ExplorationForm;