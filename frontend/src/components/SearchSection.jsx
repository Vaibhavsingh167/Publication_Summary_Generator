import { useState } from "react";

export default function SearchSection({ onSearch, loading }) {
  const [authorId, setAuthorId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = authorId.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <section className="search-section" id="search-section">
      <div className="search-hero">
        <h1 className="search-title">
          Discover Academic <span className="text-accent">Impact</span>
        </h1>
        <p className="search-subtitle">
          Enter a Google Scholar Author ID to analyze publications, citations,
          and generate an AI-powered research summary.
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              id="author-id-input"
              className="search-input"
              placeholder="Enter Google Scholar Author ID (e.g. wt0u1YQAAAAJ)"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            id="search-button"
            className="search-btn"
            disabled={loading || !authorId.trim()}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Analyzing…
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </form>

        <p className="search-hint">
          Don&apos;t know the author ID? Visit{" "}
          <a
            href="https://scholar.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar
          </a>
          , search for the author, and copy the ID from the profile URL.
        </p>
      </div>
    </section>
  );
}
