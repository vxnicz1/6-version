
import { useState } from "react";

export default function EbayTool() {
  const [vehicle, setVehicle] = useState("");
  const [part, setPart] = useState("");
  const [side, setSide] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [condition, setCondition] = useState("");
  const [title, setTitle] = useState("");
  const [htmlDescription, setHtmlDescription] = useState("");
  const [price, setPrice] = useState("");
  const [autoAccept, setAutoAccept] = useState("");
  const [adRate, setAdRate] = useState("");

  const generateListing = () => {
    const cleanSide = side ? ` ${side}` : "";
    const titleGenerated = `${vehicle} ${part}${cleanSide} Original ${partNumber}`.slice(0, 80);

    const description = `
<h2>✅ Original ${part}${cleanSide} – ${vehicle}</h2>
<p>Zum Verkauf steht ein originales ${part}${cleanSide} für den <strong>${vehicle}</strong>. Das Teil ist voll funktionsfähig und stammt aus einem unfallfreien Fahrzeug.</p>

<h3>🔧 Details:</h3>
<ul>
  <li>Originalteil – kein Nachbau</li>
  <li>Einbauposition:${cleanSide || " bitte angeben"}</li>
  <li>Teilenummer: <strong>${partNumber}</strong></li>
  <li>Zustand: ${condition}</li>
  <li>Lieferumfang: 1x ${part}</li>
</ul>

<h3>📦 Versand &amp; Zahlung:</h3>
<ul>
  <li>Versand per DHL oder Hermes inkl. Sendungsverfolgung</li>
  <li>Zahlung per PayPal, Überweisung oder Barzahlung bei Abholung möglich</li>
</ul>

<h3>🛠 Hinweis:</h3>
<p>Bitte vergleichen Sie vor dem Kauf die Teilenummer mit Ihrem Originalteil. Bei Fragen helfe ich gern weiter.</p>
    `;

    let priceRecommendation = "39,90 €";
    let autoAcceptValue = "35,00 €";
    let adRateValue = "2 %";

    if (condition.toLowerCase().includes("sehr gut")) {
      priceRecommendation = "49,90 €";
      autoAcceptValue = "44,00 €";
    } else if (condition.toLowerCase().includes("gebraucht")) {
      priceRecommendation = "39,90 €";
      autoAcceptValue = "35,00 €";
    } else {
      priceRecommendation = "29,90 €";
      autoAcceptValue = "25,00 €";
    }

    setTitle(titleGenerated);
    setHtmlDescription(description);
    setPrice(priceRecommendation);
    setAutoAccept(autoAcceptValue);
    setAdRate(adRateValue);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("In Zwischenablage kopiert!");
    });
  };

  const exportCSV = () => {
    const headers = ["Titel", "HTML-Beschreibung", "Preis", "Auto-Akzept", "Anzeigentarif", "Teilenummer", "Zustand", "Fahrzeug", "Teil", "Seite"];
    const values = [
      title,
      htmlDescription.replace(/\n/g, " ").replace(/"/g, "'"),
      price,
      autoAccept,
      adRate,
      partNumber,
      condition,
      vehicle,
      part,
      side
    ];
    const csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n${values.join(",")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ebay_listing_${vehicle}_${partNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "1rem", fontFamily: "sans-serif" }}>
      <input placeholder="Fahrzeug (z. B. Polo 9N)" value={vehicle} onChange={(e) => setVehicle(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <input placeholder="Teil (z. B. Rückleuchte)" value={part} onChange={(e) => setPart(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <input placeholder="Seite (z. B. links, rechts, Set)" value={side} onChange={(e) => setSide(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <input placeholder="Teilenummer" value={partNumber} onChange={(e) => setPartNumber(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <input placeholder="Zustand (z. B. gebraucht gut)" value={condition} onChange={(e) => setCondition(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <button onClick={generateListing} style={{ padding: "10px 20px", backgroundColor: "#1d4ed8", color: "white", border: "none", cursor: "pointer", marginBottom: "20px" }}>Vorschlag generieren</button>

      {title && (
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
          <p><strong>Titel:</strong> {title}</p>
          <p><strong>Preisempfehlung:</strong> {price}</p>
          <p><strong>Auto-Akzept ab:</strong> {autoAccept}</p>
          <p><strong>Anzeigentarif:</strong> {adRate}</p>
          <h4 style={{ marginTop: "1rem" }}>HTML-Beschreibung:</h4>
          <textarea readOnly value={htmlDescription} rows={12} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
          <button onClick={() => copyToClipboard(htmlDescription)} style={{ marginRight: "10px", padding: "8px 16px" }}>HTML kopieren</button>
          <button onClick={exportCSV} style={{ padding: "8px 16px" }}>CSV exportieren</button>
        </div>
      )}
    </div>
  );
}
