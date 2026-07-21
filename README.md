# Sentinel: Multi-Agency Safety Platform

Sentinel is a next-generation platform for public safety, cyber threat neutralization, and cross-agency intelligence sharing. It features dual workspaces (Citizen & Government) and integrates live AI evaluations including chatbot heuristics, deepfake media scanning, and banknote counterfeit analysis.

---

## 🚀 How to Run the Project (For Judges/Evaluators)

This project consists of a React frontend and a FastAPI backend. It is designed to run locally with zero database configuration. All data is managed in-memory for the duration of the hackathon demo.

### 1. Start the Backend (Python/FastAPI)
The backend handles AI processing, OpenCV counterfeit scanning, and threat intelligence.

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Python server:
   ```bash
   python main.py
   ```
   *The backend will now be running on `http://127.0.0.1:5000`.*

### 2. Start the Frontend (React/Vite)
The frontend serves the Citizen Shield and Police Command dashboards.

1. Open a **new, separate terminal** and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Click the Local link (usually `http://localhost:5173`) to view the application in your browser.

---

## 🔑 Note on Environment Variables
For ease of evaluation during the hackathon, the `backend/.env` file containing the necessary API keys (`GEMINI_API_KEY`) has been included in this repository. 
**No manual API key configuration is required to test the AI features.**

---

## 🛠 Features to Test
- **Citizen Portal**: Register/Login, upload a suspicious Banknote image to test OpenCV counterfeit detection, or use the Private Safety AI chatbot.
- **Government Portal**: Register/Login to access the Inter-Agency Ledger, freeze targeted mule accounts, and utilize the Tactical Assistant AI.
- **Fail-Safe AI**: The AI backend uses a cascading Google Gemini retry loop. If Google's servers are overloaded (503 High Demand), it will automatically fall back to an offline heuristic engine to ensure the platform never crashes during evaluation.
