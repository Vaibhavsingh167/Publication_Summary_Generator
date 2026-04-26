import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { fetchSummary } from "../services/api";

export default function SummarySection({ authorId }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setSummary("");
    setCopied(false);
    try {
      const data = await fetchSummary(authorId);
      setSummary(data.summary || "No summary returned.");
    } catch (err) {
      setError(err.message || "Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard may be blocked */
    }
  };

  return (
    <section className="summary-section fade-in-up" id="summary-section">
      <div className="summary-header">
        <h3 className="section-heading">
          <span className="heading-icon">✨</span> AI Research Summary
        </h3>
        <button
          className="generate-btn"
          id="generate-summary-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Generating…
            </>
          ) : (
            "Generate Summary"
          )}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3" role="alert" id="summary-error">
          ⚠️ {error}
        </div>
      )}

      {loading && !summary && (
        <div className="summary-loading">
          <div className="shimmer-block"></div>
          <div className="shimmer-block short"></div>
          <div className="shimmer-block"></div>
          <div className="shimmer-block shorter"></div>
        </div>
      )}

      {summary && (
        <div className="summary-content" id="summary-content">
          <div className="summary-text">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
          <button
            className="copy-btn"
            id="copy-summary-btn"
            onClick={handleCopy}
          >
            {copied ? "✅ Copied!" : "📋 Copy Summary"}
          </button>
        </div>
      )}
    </section>
  );
}
