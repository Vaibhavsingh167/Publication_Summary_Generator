import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import VisualizationDashboard from "./components/VisualizationDashboard";
import SummarySection from "./components/SummarySection";
import { analyzeAuthor } from "./services/api";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (id) => {
    setLoading(true);
    setError("");
    setProfile(null);
    setArticles([]);
    setAuthorId(id);

    try {
      const data = await analyzeAuthor(id);
      setProfile(data.profile);
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper" id="app-root">
      <AppNavbar />

      <main className="container py-4">
        <SearchSection onSearch={handleSearch} loading={loading} />

        {/* Error state */}
        {error && (
          <div
            className="alert alert-danger d-flex align-items-center mt-4 fade-in-up"
            role="alert"
            id="global-error"
          >
            <span className="me-2">⚠️</span>
            <div>{error}</div>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="text-center my-5 fade-in-up" id="global-loader">
            <div className="spinner-border text-info" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading…</span>
            </div>
            <p className="text-secondary mt-3">
              Fetching publications — this may take a moment…
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && profile && (
          <>
            <SummarySection authorId={authorId} />
            <VisualizationDashboard profile={profile} articles={articles} />

          </>
        )}
      </main>

      <footer className="app-footer" id="app-footer">
        <p>
          Built with ❤️ by <strong>Vaibhav Singh</strong> &bull; Powered by
          SerpAPI &amp; Gemini AI
        </p>
      </footer>
    </div>
  );
}
