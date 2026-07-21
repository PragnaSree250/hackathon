import os
try:
    from fpdf import FPDF
except ImportError:
    print("fpdf2 not installed. Please run: pip install fpdf2")
    exit(1)

class SentinelPDF(FPDF):
    def header(self):
        pass

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def chapter_title(self, num, title):
        self.set_font('helvetica', 'B', 16)
        self.set_fill_color(200, 220, 255)
        self.cell(0, 10, f'{num}. {title}', 0, 1, 'L', 1)
        self.ln(4)

    def chapter_body(self, text, font_size=12, style=''):
        self.set_font('helvetica', style, font_size)
        self.multi_cell(0, 7, text)
        self.ln()

pdf = SentinelPDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# --- PAGE 1: TITLE PAGE ---
pdf.set_y(60)
pdf.set_font('helvetica', 'B', 24)
pdf.cell(0, 15, 'SENTINEL', 0, 1, 'C')
pdf.set_font('helvetica', 'I', 14)
pdf.cell(0, 10, 'The Next-Generation Public Safety & Cyber Threat Neutralization Platform', 0, 1, 'C')

pdf.ln(25)
pdf.set_font('helvetica', 'B', 18)
pdf.cell(0, 12, 'ET AI HACKATHON 2026', 0, 1, 'C')
pdf.set_font('helvetica', 'B', 14)
pdf.cell(0, 10, 'Problem Statement 6: AI for Digital Public Safety', 0, 1, 'C')
pdf.set_font('helvetica', '', 12)
pdf.cell(0, 10, 'Defeating Counterfeiting, Fraud & Digital Arrest Scams', 0, 1, 'C')

pdf.ln(40)
pdf.set_font('helvetica', 'B', 12)
pdf.cell(0, 10, 'Team Members:', 0, 1, 'C')
pdf.set_font('helvetica', '', 12)
pdf.cell(0, 8, 'B Pragna Sree', 0, 1, 'C')
pdf.cell(0, 8, 'S. Sri Vyshnavi', 0, 1, 'C')

# --- PAGE 2: PROBLEM CONTEXT & CHALLENGE ---
pdf.add_page()
pdf.chapter_title('1', 'The Problem Context & Challenge Statement')

pdf.set_font('helvetica', 'B', 12)
pdf.cell(0, 8, 'The Problem Context', 0, 1, 'L')
body_1 = """India registered 1.14 million cybercrime complaints in 2023, up 60% from 2022. 'Digital arrest' scams have defrauded citizens of over Rs 1,776 crore in just the first nine months of 2024. These are highly industrialised operations run by organised syndicates using spoofed numbers, AI-generated voices, and fake government portals. 

Simultaneously, counterfeit currency remains a persistent threat. Record FICN (Fake Indian Currency Notes) seizures continue, with high-denomination counterfeits possessing sufficient quality to defeat manual detection during routine banking operations. 

Law enforcement currently lacks proactive intelligence tools to detect these threats at the point of contact rather than the point of complaint. Solving this requires a convergence of financial transaction intelligence, communication network analysis, and real-time public safety coordination."""
pdf.chapter_body(body_1)

pdf.set_font('helvetica', 'B', 12)
pdf.cell(0, 8, 'Our Challenge Statement', 0, 1, 'L')
body_2 = """Our objective is to build an AI-powered Digital Public Safety Intelligence platform that equips both law enforcement agencies and citizens with proactive tools to detect, disrupt, and respond to digital fraud networks and counterfeit currency circulation. 

Sentinel shifts the paradigm from reactive case investigation to predictive threat neutralisation. We achieve this by bridging the gap between citizen reporting and multi-agency action through a unified, intelligence-driven architecture."""
pdf.chapter_body(body_2)

# --- PAGE 3: WORKING PROTOTYPE ---
pdf.add_page()
pdf.chapter_title('2', 'Working Prototype')

body_3_intro = "Our working prototype, Sentinel, is a fully functional dual-tier web application designed to bridge the gap between citizen safety and cross-agency government intelligence. Below are the core features developed:"
pdf.chapter_body(body_3_intro)

pdf.set_font('helvetica', 'B', 11)
pdf.cell(0, 6, '1. Dual-Tier Architecture', 0, 1)
pdf.chapter_body("A unified portal that dynamically routes users to either the 'Citizen Access' or 'Government Access' dashboards based on their authentication credentials, ensuring data privacy and operational security.", 11)

pdf.set_font('helvetica', 'B', 11)
pdf.cell(0, 6, '2. Multimodal Threat Detection', 0, 1)
pdf.chapter_body("  a) Voice & Video Analyzer (Deepfake Detection): Users can upload .mp3 or .mp4 files. The system utilizes an advanced Multimodal AI Engine to analyze the media and detect deepfakes, AI voice clones, or malicious scam scripts.\n  b) Counterfeit Currency Scanner: Users can upload images of banknotes. The AI acts as a forensic analyst, checking for watermarks, security threads, and microprinting errors to catch high-quality fake notes.", 11)

pdf.set_font('helvetica', 'B', 11)
pdf.cell(0, 6, '3. Mule Disruption Engine', 0, 1)
pdf.chapter_body("A tactical interface for government officials to submit 'Direct Intercept Requests' to freeze suspected money laundering (mule) accounts across the banking network, preventing rapid fund siphoning.", 11)

pdf.set_font('helvetica', 'B', 11)
pdf.cell(0, 6, '4. Cross-Agency Intelligence Ledger', 0, 1)
pdf.chapter_body("A unified database dashboard allowing different jurisdictions (e.g., State Police, CBI, ED) to track, filter, and monitor active cyber-syndicate investigations in real-time.", 11)

pdf.set_font('helvetica', 'B', 11)
pdf.cell(0, 6, '5. Private Safety AI Assistant', 0, 1)
pdf.chapter_body("A localized, multilingual AI chatbot that provides citizens with immediate, private advice on dealing with digital arrests, phishing links, and cyber threats.", 11)

# --- PAGE 4: ARCHITECTURE DIAGRAM ---
pdf.add_page()
pdf.chapter_title('3', 'Architecture & Technologies')

body_4 = "The Sentinel platform is built on a modern, decoupled architecture ensuring high performance, scalability, and real-time AI processing capabilities."
pdf.chapter_body(body_4)

pdf.set_font('helvetica', 'B', 12)
pdf.cell(0, 8, 'Technical Stack Breakdown:', 0, 1)

tech_stack = """- Frontend Application: React.js, Vite, Tailwind CSS, Lucide Icons. Provides a highly responsive, dark-mode user interface designed for both desktop and mobile field usage.
- Backend API Server: Python, FastAPI, Uvicorn. Handles asynchronous API requests ensuring rapid communication between the frontend and the AI inference pipeline.
- AI Intelligence Pipeline: Advanced Multimodal Neural Architecture. Leverages cutting-edge vision, audio processing, and NLP models to execute real-time analysis of digital media and unstructured text.
- State & Data Management: Browser localStorage and React Context. Designed for plug-and-play hackathon portability without requiring a heavy, latency-inducing relational database setup."""
pdf.chapter_body(tech_stack)

pdf.set_font('helvetica', 'B', 12)
pdf.cell(0, 8, 'System Architecture Flowchart:', 0, 1)
pdf.ln(5)

try:
    pdf.image("C:/Users/Pragna Sree/Desktop/Sentinel/architecture.png", x=15, w=180)
    pdf.ln(10)
    pdf.image("C:/Users/Pragna Sree/Desktop/Sentinel/flowchart.png", x=15, w=180)
except Exception as e:
    pdf.cell(0, 10, f"Error loading diagram images: {str(e)}", 0, 1)

# --- PAGE 5: CONCLUSION & FUTURE SCOPE ---
pdf.add_page()
pdf.chapter_title('4', 'Conclusion & Future Scope')

pdf.set_font('helvetica', 'B', 12)
pdf.cell(0, 8, 'Conclusion', 0, 1)
conclusion = """The Sentinel platform demonstrates a paradigm shift in digital public safety. By combining sophisticated AI threat detection for citizens with rapid intervention tools for law enforcement, we have created a holistic ecosystem capable of defeating modern cybercrime. Our working prototype successfully addresses the ET AI Hackathon's challenge by moving beyond post-incident evidence collection into the realm of proactive threat neutralisation. Sentinel proves that with the right technological infrastructure, we can restore digital trust and dismantle organised fraud syndicates before mass victimisation occurs."""
pdf.chapter_body(conclusion)

pdf.set_font('helvetica', 'B', 12)
pdf.cell(0, 8, 'Future Scope & Scalability', 0, 1)
future_scope = """1. Blockchain-Backed Evidence Ledger: Transitioning the Cross-Agency Intelligence Ledger to a private blockchain network (e.g., Hyperledger Fabric) to ensure immutable, court-admissible evidence sharing between the CBI, ED, and State Police.

2. Telecom API Integration (Truecaller / TSP): Direct integration with Telecom Service Providers to actively flag and intercept spoofed international VOIP calls commonly used in Digital Arrest scenarios before they reach the citizen.

3. Mobile Application Deployment: Porting the React web application into a React Native mobile app to allow field officers to scan counterfeit currency offline and citizens to access the Safety Assistant via WhatsApp integrations.

4. Advanced Graph Network Analysis: Implementing Graph AI agents to automatically map relationships between flagged mule accounts, device fingerprints, and call records to visualize large-scale fraud rings autonomously."""
pdf.chapter_body(future_scope)

# --- PAGE 6: RESULTS & SCREENSHOTS ---
pdf.add_page()
pdf.chapter_title('5', 'Project Results & User Interface')
pdf.set_font('helvetica', '', 12)
pdf.cell(0, 8, 'Below is the working prototype of the Sentinel Shield Engine:', 0, 1)
pdf.ln(5)

try:
    pdf.image("C:/Users/Pragna Sree/.gemini/antigravity/brain/tempmediaStorage/media__1784649078179.png", x=10, w=190)
except Exception as e:
    pdf.cell(0, 10, f"Error loading image: {str(e)}", 0, 1)

pdf.output("C:/Users/Pragna Sree/Desktop/Sentinel/Sentinel_Hackathon_Submission_Final_V4.pdf")
print("Successfully generated Sentinel_Hackathon_Submission_Final_V4.pdf")
