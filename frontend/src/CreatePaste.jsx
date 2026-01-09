import { useState } from "react";
import "./index.css";

const API = import.meta.env.VITE_API_BASE;

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [pasteId, setPasteId] = useState("");
  const [backendLink, setBackendLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    setCopied(false);
    setPasteId("");
    setBackendLink("");

    if (!content.trim()) {
      setError("Paste content cannot be empty");
      return;
    }

    const res = await fetch(`${API}/api/pastes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    if (!res.ok) {
      setError("Failed to create paste");
      return;
    }

    const data = await res.json();

    // IMPORTANT
    setPasteId(data.id);
    setBackendLink(data.url); // this is http://localhost:5000/p/<id>
  }

  function copyLink() {
    navigator.clipboard.writeText(backendLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="container">
      <h1>Pastebin Lite</h1>

      <textarea
        placeholder="Write or paste text..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={submit}>Create Paste</button>

      {error && <p className="error">{error}</p>}

      {backendLink && (
        <div className="result">
          <p><strong>Shareable link (backend):</strong></p>

          <div className="copy-row">
            <a href={backendLink} target="_blank" rel="noreferrer">
              {backendLink}
            </a>
            <button className="copy-btn" onClick={copyLink}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <br />

          <p><strong>View:</strong></p>
          <button
            onClick={() =>
              window.location.href = `http://localhost:5173/p/${pasteId}`
            }
          >
            View Paste
          </button>
        </div>
      )}
    </div>
  );
}



