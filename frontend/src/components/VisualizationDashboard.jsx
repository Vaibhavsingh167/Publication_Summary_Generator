import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/* ─── helper: aggregate articles by year ─── */
function aggregateByYear(articles) {
  const counts = {};
  articles.forEach((a) => {
    const y = a.year;
    if (y && y !== "N/A") {
      counts[y] = (counts[y] || 0) + 1;
    }
  });
  const sorted = Object.entries(counts).sort(([a], [b]) => a - b);
  return { labels: sorted.map(([y]) => y), data: sorted.map(([, c]) => c) };
}

/* ─── single metric card ─── */
function MetricCard({ icon, label, value, sub }) {
  return (
    <div className="col-6 col-md-3 mb-4">
      <div className="metric-card" id={`metric-${label.toLowerCase().replace(/[\s-]+/g, "-")}`}>
        <div className="metric-icon">{icon}</div>
        <div className="metric-value">{value}</div>
        <div className="metric-label">{label}</div>
        {sub !== undefined && <div className="metric-sub">Since 2020: {sub}</div>}
      </div>
    </div>
  );
}

export default function VisualizationDashboard({ profile, articles }) {
  const yearData = useMemo(() => aggregateByYear(articles), [articles]);

  const chartData = {
    labels: yearData.labels,
    datasets: [
      {
        label: "Publications",
        data: yearData.data,
        backgroundColor: "rgba(88, 166, 255, 0.7)",
        borderColor: "#58a6ff",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(88, 166, 255, 0.95)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Publications Per Year",
        color: "#c9d1d9",
        font: { size: 16, family: "Inter, sans-serif", weight: "600" },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#1c2333",
        titleColor: "#58a6ff",
        bodyColor: "#c9d1d9",
        borderColor: "#30363d",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: { color: "#8b949e", font: { family: "Inter, sans-serif" } },
        grid: { color: "rgba(48,54,61,0.5)" },
      },
      y: {
        ticks: {
          color: "#8b949e",
          font: { family: "Inter, sans-serif" },
          stepSize: 1,
        },
        grid: { color: "rgba(48,54,61,0.5)" },
      },
    },
  };

  return (
    <section className="visualization-section fade-in-up" id="visualization-dashboard">
      {/* ─── Author Profile Banner ─── */}
      <div className="profile-banner">
        {profile.thumbnail && (
          <img
            src={profile.thumbnail}
            alt={profile.name}
            className="profile-avatar"
          />
        )}
        <div className="profile-info">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-affiliation">{profile.affiliations}</p>
          {profile.interests && profile.interests.length > 0 && (
            <div className="profile-interests">
              {profile.interests.map((tag, i) => (
                <span key={i} className="interest-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Metric Cards ─── */}
      <div className="row mt-4" id="metric-cards">
        <MetricCard
          icon="📚"
          label="Total Publications"
          value={articles.length}
        />
        <MetricCard
          icon="📝"
          label="Total Citations"
          value={profile.citations_all}
          sub={profile.citations_recent}
        />
        <MetricCard
          icon="📈"
          label="H-Index"
          value={profile.h_index}
          sub={profile.h_index_recent}
        />
        <MetricCard
          icon="🏆"
          label="I10-Index"
          value={profile.i10_index}
          sub={profile.i10_index_recent}
        />
      </div>

      {/* ─── Bar Chart ─── */}
      {yearData.labels.length > 0 && (
        <div className="chart-container" id="publications-chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {/* ─── Articles Table ─── */}
      <div className="articles-table-wrapper" id="articles-table">
        <h3 className="section-heading">Publications</h3>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
                <th>Citations</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => (
                <tr key={i}>
                  <td className="text-muted">{i + 1}</td>
                  <td>
                    {a.link && a.link !== "#" ? (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="article-link"
                      >
                        {a.title}
                      </a>
                    ) : (
                      a.title
                    )}
                  </td>
                  <td>{a.year}</td>
                  <td>{a.citations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
