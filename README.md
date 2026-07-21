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

## 🔑 Note on Environment Variables (API Keys)
For security reasons, the `GEMINI_API_KEY` has not been hardcoded into this repository. **To run the AI features, you must configure your own Gemini API key:**

1. Navigate to the `backend` folder.
2. Create a new file named exactly `.env`.
3. Add your Gemini API key inside it like this: `GEMINI_API_KEY=your_key_here`

*(Alternatively, if your hackathon portal has a private "Notes to Judges" section in the submission form, the team has provided our dedicated API key there for your convenience.)*

---

## 🛠 Features to Test
- **Citizen Portal**: Register/Login, upload a suspicious Banknote image to test OpenCV counterfeit detection, or use the Private Safety AI chatbot.
- **Government Portal**: Register/Login to access the Inter-Agency Ledger, freeze targeted mule accounts, and utilize the Tactical Assistant AI.
- **Fail-Safe AI**: The AI backend uses a cascading Google Gemini retry loop. If Google's servers are overloaded (503 High Demand), it will automatically fall back to an offline heuristic engine to ensure the platform never crashes during evaluation.
