<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  <img src="https://img.shields.io/badge/Google%20Gemini-886FBF?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white" alt="Selenium" />
</p>

<h1 align="center">📊 CurateCite</h1>

<p align="center">
  <strong>Automated Publication Analysis & AI-Powered Research Summaries</strong>
</p>

<p align="center">
  <a href="https://github.com/Vaibhavsingh167/Publication_Summary_Generator/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT" />
  </a>
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status" />
  <img src="https://img.shields.io/badge/python-3.10+-blue" alt="Python" />
  <img src="https://img.shields.io/badge/node-18+-339933" alt="Node" />
</p>

---

## 📖 About The Project

**CurateCite** is a full-stack web application that automates the analysis of academic research profiles. Users input a researcher's Google Scholar Author ID, and the application fetches their complete publication metadata — including total publications, citation counts, H-index, and i10-index — then generates a rich, AI-powered analytical summary of their research focus and impact.

The tool solves a common pain point for students, academic reviewers, and hiring committees who need to quickly evaluate a researcher's body of work without manually combing through dozens of publications. CurateCite transforms raw bibliometric data into structured visualizations and a readable narrative summary in seconds.


---

## ✨ Key Features

- 🔍 **Live Data Scraping** — Fetches real-time publication data from Google Scholar via SerpAPI
- 📊 **Interactive Visualizations** — Publications-per-year bar chart powered by Chart.js with hover tooltips
- 🤖 **AI-Generated Summaries** — Google Gemini analyzes the top publications and generates a concise research profile narrative
- 📈 **Bibliometric Dashboard** — Metric cards displaying Total Publications, Total Citations, H-Index, and i10-Index at a glance
- ⚡ **Asynchronous React State Management** — Non-blocking API calls with loading spinners, shimmer skeletons, and graceful error handling
- 📱 **Fully Responsive** — Built with Bootstrap 5's grid system; works seamlessly on desktop and mobile
- 🌙 **Premium Dark Theme** — Glassmorphism UI with smooth fade-in animations and accent glow effects
- 📋 **Copy to Clipboard** — One-click copy for the AI-generated summary

---

## 🛠️ Built With

| Layer             | Technology                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| **Frontend**      | React.js, Bootstrap 5, Chart.js (`react-chartjs-2`), React Markdown       |
| **Backend**       | Python, Flask, Flask-CORS                                                  |
| **Data Source**    | SerpAPI (Google Scholar Author endpoint)                                   |
| **AI Engine**     | Google Gemini API (`gemini-2.5-flash`)                                     |
| **Environment**   | python-dotenv for secure API key management                                |

---

## 🚀 Getting Started

Follow these steps to run CurateCite locally on your machine.

### Prerequisites

- **Python 3.10+** — [Download](https://www.python.org/downloads/)
- **Node.js 18+** — [Download](https://nodejs.org/)
- **SerpAPI Key** — [Get one free](https://serpapi.com/manage-api-key)
- **Google Gemini API Key** — [Get one free](https://aistudio.google.com/app/apikey)

---

### 🔧 Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/Vaibhavsingh167/Publication_Summary_Generator.git
cd Publication_Summary_Generator

# 2. Create and activate a virtual environment
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Start the Flask server
python app.py
```

The backend will be running at **http://localhost:5000**.

---

### 🔐 Environment Variables

Create a `.env` file in the project root by copying the provided template:

```bash
cp .env.example .env
```

Then open `.env` and replace the placeholders with your actual keys:

```env
SERPAPI_KEY=your_serpapi_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

---

### 🎨 Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node.js dependencies
npm install

# 3. Start the React development server
npm run dev
```

The frontend will be running at **http://localhost:5173**.

---

## 💡 Usage

1. **Start both servers** — Run the Flask backend and React frontend in two separate terminals.
2. **Open the dashboard** — Navigate to `http://localhost:5173` in your browser.
3. **Enter an Author ID** — Type a Google Scholar Author ID (e.g., `wt0u1YQAAAAJ`) into the search field and click **Analyze**.
4. **View Metrics** — The dashboard displays the author's profile, bibliometric cards, and a publications-per-year chart.
5. **Generate AI Summary** — Click **Generate Summary** to receive a Gemini-powered research narrative.
6. **Copy & Share** — Use the **Copy Summary** button to export the analysis.

> 💡 **Tip:** Don't know the Author ID? Visit [Google Scholar](https://scholar.google.com/), search for the researcher, open their profile, and copy the ID from the URL (the `user=` parameter).

---

## 📁 Project Structure

```
Publication_Summary_Generator/
├── app.py                  # Flask backend — REST API endpoints
├── logic.py                # SerpAPI fetching + Gemini AI summary generation
├── requirements.txt        # Python dependencies
├── .env.example            # Environment variable template
├── .gitignore              # Git exclusion rules
├── templates/
│   └── index.html          # Legacy Jinja2 template (standalone mode)
├── static/
│   └── images/             # Guide screenshots
└── frontend/               # React.js application
    ├── index.html           # Vite entry HTML
    ├── package.json         # Node dependencies
    └── src/
        ├── App.jsx          # Root component — state management
        ├── App.css          # Dark theme design system
        ├── main.jsx         # Vite entry point
        ├── components/
        │   ├── Navbar.jsx                  # Sticky dark navbar
        │   ├── SearchSection.jsx           # Author ID input + search
        │   ├── VisualizationDashboard.jsx  # Metric cards + Chart.js bar chart
        │   └── SummarySection.jsx          # AI summary + copy to clipboard
        └── services/
            └── api.js       # Centralized API fetch wrappers
```


## 📬 Contact

**Vaibhav Singh** — [@Vaibhavsingh167](https://github.com/Vaibhavsingh167)

Project Link: [https://github.com/Vaibhavsingh167/Publication_Summary_Generator](https://github.com/Vaibhavsingh167/Publication_Summary_Generator)

---

<p align="center">
  Built with ❤️ using React, Flask & Gemini AI
</p>
