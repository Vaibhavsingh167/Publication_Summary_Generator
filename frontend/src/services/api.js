const API_BASE = "http://localhost:5000";

/**
 * Analyze an author by their Google Scholar ID.
 * POST /analyze  →  { profile, articles }
 */
export async function analyzeAuthor(authorId) {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author_id: authorId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Server error (${res.status})`);
  }

  return res.json();
}

/**
 * Fetch the AI-generated research summary for an author.
 * POST /summary  →  { summary }
 */
export async function fetchSummary(authorId) {
  const res = await fetch(`${API_BASE}/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author_id: authorId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Server error (${res.status})`);
  }

  return res.json();
}
