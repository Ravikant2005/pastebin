
 import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE;

export default function ViewPaste() {
  const id = window.location.pathname.split("/").pop();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/pastes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setContent(data.content))
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  function copyText() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>View Paste</h1>

        {error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <>
            <button onClick={copyText} style={styles.copyBtn}>
              {copied ? "Copied!" : "Copy Text"}
            </button>

            <pre style={styles.pasteBox}>{content}</pre>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "50px",
    color: "#e5e7eb"
  },
  card: {
    width: "90%",
    maxWidth: "800px",
    background: "#020617",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
  },
  title: {
    textAlign: "center",
    marginBottom: "15px"
  },
  pasteBox: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "6px",
    padding: "15px",
    whiteSpace: "pre-wrap",
    overflowX: "auto"
  },
  copyBtn: {
    marginBottom: "10px",
    padding: "8px 14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  error: {
    color: "#f87171",
    textAlign: "center"
  }
};

