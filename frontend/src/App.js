import React, { useState } from "react";

function App() {
  const [eventName, setEventName] = useState("");
  const [programFile, setProgramFile] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [eventUrl, setEventUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("programFile", programFile);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setQrCode(data.qrCodeDataUrl);
    setEventUrl(data.eventUrl);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🎓 Event Program Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setProgramFile(e.target.files[0])}
          required
        />
        <br /><br />
        <button type="submit">Upload Program</button>
      </form>

      {qrCode && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Your QR Code</h2>
          <img src={qrCode} alt="QR Code" />
          <p>
            <a href={eventUrl} target="_blank" rel="noreferrer">
              View Program PDF
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
