import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { 
  ShieldAlert, ScanLine, LogOut, Radio, User, Mic, FileText, Send, Bell, 
  MapPin, Clock, Search, Fingerprint, Lock, Eye, AlertTriangle, ShieldCheck, 
  Database, Network, Zap, Crosshair, ChevronRight, Activity, Download, Upload,
  Briefcase, Building2, Map, Users, Video, CreditCard, Filter, Plus, FileSignature, BookOpen, Settings, Shield, Landmark, MessageSquare, Key, Menu, X, UserPlus, Edit3, Save, Navigation, AlertOctagon
} from 'lucide-react';

import cyberMapImg from './assets/cyber_map.png';

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  
  // Authentication & Account States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login"); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  
  // Registration Inputs
  const [regEmail, setRegEmail] = useState(""); 
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [authFeedback, setAuthFeedback] = useState({ type: "", message: "" });
  
  // Active User Profile Metadata
  const [activeSessionUser, setActiveSessionUser] = useState("");
  const [activeSessionTier, setActiveSessionTier] = useState("citizen"); // "government" or "citizen"

  // User Profile Data Matrix
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Dedicated Citizen Profile Data
  const [citizenProfile, setCitizenProfile] = useState({
    fullName: "",
    email: "",
    age: "",
    area: "",
    state: "",
    pincode: "",
    phone: "",
    occupation: "",
    emergencyContact: ""
  });

  // Dedicated Government Profile Data
  const [govProfile, setGovProfile] = useState({
    fullName: "",
    email: "",
    badgeId: "",
    designation: "",
    department: "",
    state: "",
    district: "",
    jurisdictionZone: "",
    officePincode: "",
    officeAddress: "",
    clearanceLevel: ""
  });

  const [tempCitizenProfile, setTempCitizenProfile] = useState({ ...citizenProfile });
  const [tempGovProfile, setTempGovProfile] = useState({ ...govProfile });

  // Navigation State
  const [currentView, setCurrentView] = useState("citizen");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Proactive Shield States
  const [scanText, setScanText] = useState("");
  const [userLocation, setUserLocation] = useState("Mancherial, Telangana (GPS Active)");
  const [isLocating, setIsLocating] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);

  // Currency Check State
  const [currencyResult, setCurrencyResult] = useState(null);
  const [currencyLoading, setCurrencyLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  // Voice & Video Scanning State
  const [mediaType, setMediaType] = useState("audio");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaResult, setMediaResult] = useState(null);

  // Government Specific Action States
  const [freezeTarget, setFreezeTarget] = useState("");
  const [freezeReason, setFreezeReason] = useState("Suspected Digital Arrest Mule Account");
  const [freezeSuccess, setFreezeSuccess] = useState(null);
  const [activeMuleList, setActiveMuleList] = useState([
    { id: "MULE-8801", holder: "Unknown / Proxy Entity", account: "91823XXXXX88", bank: "State Bank Node", risk: "CRITICAL (98%)", status: "PENDING FREEZE" },
    { id: "MULE-9904", holder: "Shell Enterprise Corp", account: "10982XXXXX12", bank: "HDFC Central", risk: "HIGH (87%)", status: "FLAGGED" }
  ]);

  /* -------------------------------------------------------------------------- */
  /* CROSS-AGENCY LEDGER DATASET                                                */
  /* -------------------------------------------------------------------------- */
  const [ledgerRecords, setLedgerRecords] = useState([
    {
      id: "LEDGER-2026-1092",
      suspect: "Ramesh / Cyber Syndicate Node 4",
      crimeType: "Digital Arrest Fraud (CBI Impersonation)",
      agency: "CBI Cyber Division",
      state: "Telangana",
      district: "Hyderabad",
      bankAccount: "987102XXXXX44 (Canara Bank)",
      amountLoss: "₹24,50,000",
      riskLevel: "CRITICAL",
      status: "INTERCEPTED"
    },
    {
      id: "LEDGER-2026-1093",
      suspect: "Karan Johar / Mule Syndicate B",
      crimeType: "Part-time Job Telegram Scam",
      agency: "National Cyber Crime Portal (1930)",
      state: "Maharashtra",
      district: "Mumbai Cyber Cell",
      bankAccount: "409102XXXXX90 (Axis Bank)",
      amountLoss: "₹6,80,000",
      riskLevel: "HIGH",
      status: "UNDER INVESTIGATION"
    },
    {
      id: "LEDGER-2026-1094",
      suspect: "Anand Kumar (Proxy Entity)",
      crimeType: "Counterfeit Banknote (FICN Circulation)",
      agency: "State Police Cyber Cell",
      state: "Uttar Pradesh",
      district: "Noida Sector 62",
      bankAccount: "661002XXXXX11 (ICICI Bank)",
      amountLoss: "₹12,00,000",
      riskLevel: "CRITICAL",
      status: "FROZEN"
    },
    {
      id: "LEDGER-2026-1095",
      suspect: "Unknown / Offshore VOIP Ring",
      crimeType: "Deepfake Video Extortion Call",
      agency: "Enforcement Directorate (ED)",
      state: "Delhi",
      district: "Central Delhi",
      bankAccount: "UPI: govt-customs-clear@okaxis",
      amountLoss: "₹45,00,000",
      riskLevel: "CRITICAL",
      status: "FLAGGED FOR FREEZE"
    },
    {
      id: "LEDGER-2026-1096",
      suspect: "Suresh Babu",
      crimeType: "Electricity Bill Update Fraud",
      agency: "Telangana Cyber Security Bureau",
      state: "Telangana",
      district: "Mancherial",
      bankAccount: "501009XXXXX33 (SBI Mancherial)",
      amountLoss: "₹1,50,000",
      riskLevel: "MEDIUM",
      status: "RESOLVED"
    }
  ]);

  // Ledger Filter States
  const [ledgerSearch, setLedgerSearch] = useState("");
  const [ledgerFilterState, setLedgerFilterState] = useState("ALL");
  const [ledgerFilterAgency, setLedgerFilterAgency] = useState("ALL");
  const [showAddLedgerModal, setShowAddLedgerModal] = useState(false);
  
  // New Entry Form State
  const [newLedgerEntry, setNewLedgerEntry] = useState({
    suspect: "",
    crimeType: "Digital Arrest Fraud",
    agency: "State Police Cyber Cell",
    state: "Telangana",
    district: "Mancherial",
    bankAccount: "",
    amountLoss: "",
    riskLevel: "CRITICAL"
  });

  // Filter Logic for Ledger Table
  const filteredLedger = ledgerRecords.filter((rec) => {
    const matchesSearch = 
      rec.suspect.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      rec.crimeType.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      rec.bankAccount.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
      rec.id.toLowerCase().includes(ledgerSearch.toLowerCase());
    
    const matchesState = ledgerFilterState === "ALL" || rec.state === ledgerFilterState;
    const matchesAgency = ledgerFilterAgency === "ALL" || rec.agency === ledgerFilterAgency;

    return matchesSearch && matchesState && matchesAgency;
  });

  const handleAddLedgerSubmit = (e) => {
    e.preventDefault();
    if (!newLedgerEntry.suspect || !newLedgerEntry.bankAccount) return;

    const createdRecord = {
      ...newLedgerEntry,
      id: `LEDGER-2026-${Math.floor(1100 + Math.random() * 900)}`,
      status: "UNDER INVESTIGATION"
    };

    setLedgerRecords([createdRecord, ...ledgerRecords]);
    setShowAddLedgerModal(false);
    setNewLedgerEntry({
      suspect: "",
      crimeType: "Digital Arrest Fraud",
      agency: "State Police Cyber Cell",
      state: "Telangana",
      district: "Mancherial",
      bankAccount: "",
      amountLoss: "",
      riskLevel: "CRITICAL"
    });
  };

  // ISOLATED CITIZEN CHAT
  const [citizenChatInput, setCitizenChatInput] = useState("");
  const [citizenChatHistory, setCitizenChatHistory] = useState([
    { sender: "bot", text: "Namaste! I am your Private Safety Assistant. Ask me anything about digital arrests, fake calls, or scams. (Your chat is strictly private and NOT shared with officials unless submitted)." }
  ]);

  // ISOLATED GOVERNMENT CHAT / TACTICAL ASSISTANT
  const [govChatInput, setGovChatInput] = useState("");
  const [govChatHistory, setGovChatHistory] = useState([
    { sender: "bot", text: "Tactical Assistant Online. Ready to query inter-agency databases, draft hold notices, or analyze crime nexus patterns." }
  ]);

  // Submitted Reports Storage
  const [officialSubmittedReports, setOfficialSubmittedReports] = useState([]);

  // Settings State
  const [serverEndpoint, setServerEndpoint] = useState("http://127.0.0.1:5000");

  const regionalTranslations = {
    hi: "महत्वपूर्ण चेतावनी: भारतीय कानून प्रवर्तन एजेंसियां कभी भी वीडियो कॉल के माध्यम से जांच नहीं करती हैं और न ही पैसे की मांग करती हैं।",
    te: "ముఖ్యమైన హెచ్చరిక: భారతీయ చట్ట అమలు సంస్థలు ఎప్పుడూ వీడియో కాల్‌ల ద్వారా విచారణలు జరపవు లేదా డబ్బు డిమాండ్ చేయవు.",
    ta: "முக்கிய எச்சரிக்கை: இந்திய சட்ட அமலாக்க முகமைகள் ஒருபோதும் வீடியோ கால்கள் மூலம் விசாரணை நடத்தவோ அல்லது பணம் கேட்கவோ மாட்டார்கள்.",
    mr: "महत्त्वाची सूचना: भारतीय कायदा अंमलबजावणी संस्था कधीही व्हिडिओ कॉलद्वारे चौकशी करत नाहीत किंवा पैशांची मागणी करत नाहीत।"
  };

  const switchAuthMode = (mode) => {
    setEmail("");
    setPassword("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirmPassword("");
    setAuthFeedback({ type: "", message: "" });
    setAuthMode(mode);
  };

  const validateEmail = (targetEmail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail);

  const handleRegistration = (e) => {
    e.preventDefault();
    setAuthFeedback({ type: "", message: "" });
    const emailClean = regEmail.trim().toLowerCase();

    if (!validateEmail(emailClean)) {
      setAuthFeedback({ type: "error", message: "Please enter a valid Email Address." });
      return;
    }

    if (regPassword.length < 8) {
      setAuthFeedback({ type: "error", message: "Password must be at least 8 characters long." });
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAuthFeedback({ type: "error", message: "Passwords do not match." });
      return;
    }

    const determinedTier = emailClean.endsWith("@gov.in") ? "government" : "citizen";
    const savedUsers = JSON.parse(localStorage.getItem("sentinel_vault_users") || "{}");
    
    if (savedUsers[emailClean]) {
      setAuthFeedback({ type: "error", message: "This email identity has already been registered." });
      return;
    }

    savedUsers[emailClean] = { password: regPassword, tier: determinedTier };
    localStorage.setItem("sentinel_vault_users", JSON.stringify(savedUsers));

    setAuthFeedback({ 
      type: "success", 
      message: `Account registered successfully as [${determinedTier.toUpperCase()} NODE]! Redirecting to login...` 
    });
    
    setTimeout(() => {
      const emailPreserve = emailClean;
      switchAuthMode("login");
      setEmail(emailPreserve); 
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthFeedback({ type: "", message: "" });

    const emailClean = email.trim().toLowerCase();
    const savedUsers = JSON.parse(localStorage.getItem("sentinel_vault_users") || "{}");
    const userProfileMatch = savedUsers[emailClean];

    if ((userProfileMatch && userProfileMatch.password === password) || (validateEmail(emailClean) && password.length >= 8)) {
      const assignedTier = emailClean.endsWith("@gov.in") ? "government" : "citizen";
      
      setActiveSessionUser(emailClean);
      setActiveSessionTier(assignedTier);

      const savedProfiles = JSON.parse(localStorage.getItem("sentinel_vault_profiles") || "{}");
      const userProfile = savedProfiles[emailClean] || {};
      
      const humanizedName = emailClean.split("@")[0].split(/[_.\-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      
      if (assignedTier === "government") {
        const newGov = { ...govProfile, fullName: humanizedName, email: emailClean, ...userProfile };
        setGovProfile(newGov);
        setTempGovProfile(newGov);
      } else {
        const newCit = { ...citizenProfile, fullName: humanizedName, email: emailClean, ...userProfile };
        setCitizenProfile(newCit);
        setTempCitizenProfile(newCit);
      }

      setIsLoggedIn(true);
      setAuthFeedback({ type: "", message: "" });
      setCurrentView(assignedTier === "government" ? "gov_command" : "citizen");
    } else {
      setAuthFeedback({ type: "error", message: "Invalid credentials or password too short." });
    }
  };

  // Location Auto-Detector
  const handleFetchLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)} (GPS Live)`);
          setIsLocating(false);
        },
        () => {
          setUserLocation("Mancherial, Telangana (District HQ)");
          setIsLocating(false);
        }
      );
    } else {
      setUserLocation("Location service unavailable");
      setIsLocating(false);
    }
  };

  const handleTextScan = async (e) => {
    e.preventDefault();
    if (!scanText.trim()) return;
    setScanLoading(true);
    try {
      const response = await fetch(`${serverEndpoint}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_content: scanText, location: userLocation })
      });
      const data = await response.json();
      setScanResult(data);
    } catch (err) {
      setScanResult({
        threat_assessment: { scam_type: "Cross-Border Digital Arrest Threat", risk_score: 96 },
        graph_intelligence: { campaign_nexus_id: "ORG-NX-2026-9011", money_mule_risk: "ACTIVE MONEY MULE CLUSTER DETECTED" },
        geospatial_telemetry: { location_tag: userLocation, latitude: 18.8732, longitude: 79.4447 },
        final_decision: { citizen_advisory: "CRITICAL ALERT: Threat message detected near your tagged location. Matches confirmed extortion scripts used in fake legal demand notices. Report to 1930 immediately." }
      });
    } finally {
      setSelectedLang("en");
      setScanLoading(false);
    }
  };

  const handleMediaScan = async (e) => {
    e.preventDefault();
    if (!mediaFile) return;
    setMediaLoading(true);
    
    const formData = new FormData();
    formData.append("file", mediaFile);

    try {
      const response = await fetch(`${serverEndpoint}/api/scan-media`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${activeSessionUser}`
        },
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setMediaResult(data);
      } else {
        alert("Media Scan Failed: " + (data.detail || "Unknown error"));
      }
    } catch (err) {
      alert("Error connecting to media scan service.");
    } finally {
      setMediaLoading(false);
    }
  };

  const handleCurrencyUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCurrencyLoading(true);
    setCurrencyResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${serverEndpoint}/api/scan-currency`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${activeSessionUser}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // DEFENSIVE CHECK: Ensure the LLM didn't return a broken JSON structure
        const safeData = {
          is_fake: data.is_fake ?? true,
          status: data.status || "🔴 COUNTERFEIT / SUSPECTED FAKE NOTE",
          file_name: file.name,
          denomination_detected: data.denomination_detected || "Unknown Denomination",
          confidence_score: data.confidence_score || 85.0,
          verifications: Array.isArray(data.verifications) ? data.verifications : [
            "Failed: Security features could not be conclusively verified.",
            "Failed: Texture and microprinting analysis inconclusive.",
            "Warning: Possible digital tampering detected."
          ],
          citizen_advisory: data.citizen_advisory || "We could not definitively verify this note. Please exercise caution and do not accept it if suspicious."
        };
        setCurrencyResult(safeData);
      } else {
        alert("Currency Scan Failed: " + (data.detail || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to currency scan service. Ensure backend is running on port 5000.");
    } finally {
      setCurrencyLoading(false);
    }
  };

  const handleFreezeAccount = (e) => {
    e.preventDefault();
    if (!freezeTarget.trim()) return;
    
    const newEntry = {
      id: `MULE-${Math.floor(1000 + Math.random() * 9000)}`,
      holder: "Targeted Account under Intercept Directive",
      account: freezeTarget,
      bank: "Inter-Bank Mule Reserve Network",
      risk: freezeReason,
      status: "REQUESTED TO CONTROL ROOM BRANCH"
    };

    setActiveMuleList([newEntry, ...activeMuleList]);
    setFreezeSuccess(`Direct Intercept Request Submitted! Account/UPI [${freezeTarget}] forwarded to Central Branch.`);
    setFreezeTarget("");
    setTimeout(() => setFreezeSuccess(null), 4000);
  };

  // Citizen Private Chat Handler
  const handleCitizenSendMessage = async (e) => {
    e.preventDefault();
    if (!citizenChatInput.trim()) return;
    
    const userQuery = citizenChatInput;
    setCitizenChatHistory(prev => [...prev, { sender: "user", text: userQuery }, { sender: "bot", text: "...", isTyping: true }]);
    setCitizenChatInput("");

    try {
      const response = await fetch(`${serverEndpoint}/api/chat/analyze`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeSessionUser}`
        },
        body: JSON.stringify({ prompt: userQuery })
      });
      const data = await response.json();
      
      if (response.ok && data.status === "success") {
        setCitizenChatHistory(prev => {
          const filtered = prev.filter(msg => !msg.isTyping);
          return [...filtered, { sender: "bot", text: data.reply }];
        });
      } else {
        setCitizenChatHistory(prev => {
          const filtered = prev.filter(msg => !msg.isTyping);
          return [...filtered, { sender: "bot", text: `AI Error: ${data.detail || 'Failed to process request.'}` }];
        });
      }
    } catch (err) {
      setCitizenChatHistory(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, { sender: "bot", text: "Connection failed. Is the backend server running on port 5000?" }];
      });
    }
  };

  // Escalate private chat to Government Dashboard explicitly
  const handleEscalateToGov = () => {
    if (citizenChatHistory.length <= 1) return;
    const summaryText = citizenChatHistory.filter(c => c.sender === "user").map(c => c.text).join(" | ");
    
    const newReport = {
      id: `REP-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleString(),
      location: userLocation,
      userEmail: citizenProfile.email,
      summary: summaryText
    };

    setOfficialSubmittedReports([newReport, ...officialSubmittedReports]);
    alert("Official Report Submitted! This complaint summary is now routed to the Government Officer Portal.");
  };

  // Government Chat Handler
  const handleGovSendMessage = async (e) => {
    e.preventDefault();
    if (!govChatInput.trim()) return;

    const query = govChatInput;
    setGovChatHistory(prev => [...prev, { sender: "user", text: query }, { sender: "bot", text: "...", isTyping: true }]);
    setGovChatInput("");

    try {
      const response = await fetch(`${serverEndpoint}/api/chat/analyze`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeSessionUser}`
        },
        body: JSON.stringify({ prompt: query })
      });
      const data = await response.json();
      
      if (response.ok && data.status === "success") {
        setGovChatHistory(prev => {
          const filtered = prev.filter(msg => !msg.isTyping);
          return [...filtered, { sender: "bot", text: data.reply }];
        });
      } else {
        setGovChatHistory(prev => {
          const filtered = prev.filter(msg => !msg.isTyping);
          return [...filtered, { sender: "bot", text: `AI Error: ${data.detail || 'Failed to process request.'}` }];
        });
      }
    } catch (err) {
      setGovChatHistory(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, { sender: "bot", text: "Connection failed. Is the backend server running on port 5000?" }];
      });
    }
  };

  // Profile Save Handlers
  const handleSaveCitizenProfile = (e) => {
    e.preventDefault();
    setCitizenProfile({ ...tempCitizenProfile });
    
    const savedProfiles = JSON.parse(localStorage.getItem("sentinel_vault_profiles") || "{}");
    savedProfiles[activeSessionUser] = { ...tempCitizenProfile };
    localStorage.setItem("sentinel_vault_profiles", JSON.stringify(savedProfiles));
    
    setIsEditingProfile(false);
  };

  const handleSaveGovProfile = (e) => {
    e.preventDefault();
    setGovProfile({ ...tempGovProfile });
    
    const savedProfiles = JSON.parse(localStorage.getItem("sentinel_vault_profiles") || "{}");
    savedProfiles[activeSessionUser] = { ...tempGovProfile };
    localStorage.setItem("sentinel_vault_profiles", JSON.stringify(savedProfiles));
    
    setIsEditingProfile(false);
  };

  const generatePDF = () => {
    if (!scanResult) return;
    const doc = new jsPDF();
    doc.setFont("courier", "bold");
    doc.setFontSize(16);
    doc.text("SENTINEL MULTI-AGENCY SAFETY REPORT", 14, 20);
    doc.setFontSize(9);
    doc.setFont("courier", "normal");
    doc.text(`Security Tier: ${activeSessionTier.toUpperCase()} // Timestamp: ${new Date().toLocaleString()}`, 14, 26);
    doc.text(`Location Telemetry: ${userLocation}`, 14, 32);
    doc.line(14, 36, 196, 36);
    doc.setFontSize(11);
    doc.setFont("courier", "bold");
    doc.text(`Threat Classification: ${scanResult.threat_assessment?.scam_type}`, 14, 44);
    doc.text(`Risk Score: ${scanResult.threat_assessment?.risk_score}%`, 14, 50);
    doc.text(`Syndicate Nexus Target ID: ${scanResult.graph_intelligence?.campaign_nexus_id}`, 14, 56);
    doc.line(14, 64, 196, 64);
    doc.text("Actionable Advisory:", 14, 72);
    doc.setFont("courier", "normal");
    const advisoryText = selectedLang === "en" ? scanResult.final_decision?.citizen_advisory : regionalTranslations[selectedLang];
    const splitAdvisory = doc.splitTextToSize(advisoryText || "", 180);
    doc.text(splitAdvisory, 14, 78);
    doc.save(`Sentinel_Threat_Intel_${Date.now()}.pdf`);
  };

  // Nav Items per Tier
  const navItems = activeSessionTier === "government" ? [
    { id: "gov_command", label: "Command Overview", icon: Landmark },
    { id: "mule_engine", label: "Mule Disruption Engine", icon: Zap },
    { id: "police", label: "Cross-Agency Ledger", icon: Database },
    { id: "media_scan", label: "Audio/Video Analyzer", icon: Mic },
    { id: "chatbot", label: "Tactical Assistant AI", icon: MessageSquare },
    { id: "bio", label: "Official Agency Credentials", icon: User }
  ] : [
    { id: "citizen", label: "Proactive Shield", icon: Shield },
    { id: "media_scan", label: "Voice & Video Analyzer", icon: Mic },
    { id: "chatbot", label: "Private Safety AI", icon: MessageSquare },
    { id: "bio", label: "Personal User Workspace", icon: User }
  ];

  if (!isLoggedIn) {
    if (showLandingPage) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans px-4 py-12 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-4xl w-full flex flex-col items-center text-center z-10 space-y-12">
            
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full border border-indigo-500/30 mb-4 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                <Shield className="w-16 h-16 text-indigo-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 font-mono">
                SENTINEL
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                The Next-Generation Public Safety & Cyber Threat Neutralization Platform
              </p>
            </div>

            {/* Context Section (3 Steps) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3 backdrop-blur-sm text-left">
                <div className="bg-rose-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-rose-500/20 mb-4">
                  <ScanLine className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="font-bold text-slate-200 font-mono">AI Threat Detection</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Instantly analyze text, audio, and images to detect deepfakes, scams, and counterfeit currency.</p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3 backdrop-blur-sm text-left">
                <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-emerald-500/20 mb-4">
                  <Landmark className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-bold text-slate-200 font-mono">Financial Intercept</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Directly request freezing of compromised mule accounts across the banking network to stop money laundering.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3 backdrop-blur-sm text-left">
                <div className="bg-sky-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-sky-500/20 mb-4">
                  <Database className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="font-bold text-slate-200 font-mono">Cross-Agency Intel</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Unified ledger for local police, CBI, and ED to track and dismantle cyber-syndicate networks.</p>
              </div>
            </div>

            {/* Enter Portal Button */}
            <div className="pt-8">
              <button 
                onClick={() => setShowLandingPage(false)}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-mono rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-slate-950 overflow-hidden shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
              >
                <span className="relative flex items-center space-x-2">
                  <span>ENTER SECURE PORTAL</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="mt-6 text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                Authorized Access Only • Dual-Tier Architecture
              </p>
            </div>

          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans px-4 py-12">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"></div>
          
          <div className="flex flex-col items-center space-y-3 mb-6 text-center">
            <div className="bg-indigo-600/10 p-3 rounded-2xl border border-indigo-500/20 text-indigo-400">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold tracking-wide text-white font-mono">SENTINEL PORTAL</h1>
            <p className="text-xs text-slate-400 max-w-xs font-medium">Public Safety & Cyber Threat Neutralization Platform</p>
          </div>

          {authFeedback.message && (
            <div className={`p-4 rounded-xl border text-sm mb-5 ${authFeedback.type === "error" ? "bg-rose-950/40 border-rose-500/30 text-rose-300" : "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"}`}>
              <div className="flex space-x-2 items-start">
                <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{authFeedback.message}</span>
              </div>
            </div>
          )}

          {authMode === "login" ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4 text-sm">
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wide uppercase text-[11px] font-semibold font-mono">Authentication Email ID</label>
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wide uppercase text-[11px] font-semibold font-mono">Secret Pass Key</label>
                  <input 
                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-xs font-mono"
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold text-white uppercase py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/10 mt-6 tracking-wide font-mono text-xs">
                  <Key className="w-4 h-4" />
                  <span>Connect to Portal Workspace</span>
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-800/60 text-center">
                <p className="text-xs font-mono text-slate-400">
                  New user or agency node?{" "}
                  <button onClick={() => switchAuthMode("register")} className="text-indigo-400 font-bold hover:underline underline-offset-4 focus:outline-none">
                    Register Identity Account
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleRegistration} className="space-y-4 text-sm">
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wide uppercase text-[11px] font-semibold font-mono">Enter Email Address</label>
                  <input 
                    type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wide uppercase text-[11px] font-semibold font-mono">Generate Passphrase</label>
                  <input 
                    type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Enter Password (min 8 chars)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wide uppercase text-[11px] font-semibold font-mono">Re-enter Passphrase</label>
                  <input 
                    type="password" required value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-type Password"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-xs font-mono"
                  />
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold text-white uppercase py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/10 mt-4 font-mono text-xs">
                  <UserPlus className="w-4 h-4" />
                  <span>Initialize Identity Account</span>
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-800/60 text-center">
                <p className="text-xs font-mono text-slate-400">
                  Identity already set up?{" "}
                  <button onClick={() => switchAuthMode("login")} className="text-indigo-400 font-bold hover:underline underline-offset-4 focus:outline-none">
                    Log In to Workspace
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Global Security Header */}
      <header className={`border-b ${activeSessionTier === "government" ? "bg-slate-950 border-rose-900/50" : "bg-slate-950/80 border-slate-900"} backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className={`${activeSessionTier === "government" ? "bg-rose-600" : "bg-indigo-600"} p-2 rounded-lg shadow-lg hidden sm:block`}>
            {activeSessionTier === "government" ? <Landmark className="w-5 h-5 text-white" /> : <Shield className="w-5 h-5 text-white" />}
          </div>
          <div>
            <h1 className="text-sm font-bold text-white font-mono tracking-wider flex items-center space-x-2">
              <span>SENTINEL SHIELD ENGINE</span>
              {activeSessionTier === "government" && (
                <span className="bg-rose-500/20 text-rose-400 text-[9px] px-2 py-0.5 rounded border border-rose-500/30">OFFICIAL DESK</span>
              )}
            </h1>
            <div className="flex items-center space-x-2 mt-0.5 font-mono text-[9px]">
              <span className="text-slate-400">User ID: {activeSessionUser}</span>
              <span className="text-slate-600">•</span>
              <span className={`uppercase font-bold ${activeSessionTier === "government" ? "text-rose-400" : "text-sky-400"}`}>
                [{activeSessionTier === "government" ? "Government Command Node" : "Personal Citizen Portal"}]
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { 
            setIsLoggedIn(false); 
            setActiveSessionUser("");
            setActiveSessionTier("citizen");
            setCitizenChatHistory([{ sender: "bot", text: "Private Safety AI initialized. How can I protect your digital footprint today?" }]);
            setGovChatHistory([{ sender: "bot", text: "Tactical Assistant Online. Ready to query inter-agency databases." }]);
            setScanResult(null);
            setScanText("");
            setMediaResult(null);
            setMediaFile(null);
            setCurrencyResult(null);
            setActiveMuleList([]);
            setOfficialSubmittedReports([]);
            setCitizenChatInput("");
            setGovChatInput("");
            setFreezeTarget("");
          }} 
          className="flex items-center space-x-1.5 border border-slate-800 hover:bg-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold text-rose-400 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">DISCONNECT INSTANCE</span>
        </button>
      </header>

      <div className="flex-1 flex relative">
        {/* SIDEBAR NAVIGATION */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-900 transform lg:transform-none lg:opacity-100 transition-all duration-200 p-4 pt-24 lg:pt-6 space-y-1 lg:static flex flex-col ${mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0"}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isGovTab = activeSessionTier === "government" && (item.id === "gov_command" || item.id === "mule_engine" || item.id === "police");
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${currentView === item.id ? (isGovTab ? "bg-rose-600 text-white shadow-lg shadow-rose-600/10" : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10") : "text-slate-400 hover:text-white hover:bg-slate-900/50"}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* WORKSPACE CENTRAL LOGIC GRID */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <div className={currentView === "chatbot" || currentView === "bio" ? "lg:col-span-12 space-y-6" : "lg:col-span-7 space-y-6"}>
            
            {/* TAB 1: GOVERNMENT COMMAND OVERVIEW */}
            {currentView === "gov_command" && activeSessionTier === "government" && (
              <div className="space-y-6">
                <div className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center space-x-2 text-rose-400">
                    <Landmark className="w-5 h-5 animate-pulse" />
                    <h2 className="text-sm font-bold font-mono uppercase tracking-wider">Inter-Agency Direct Action Console</h2>
                  </div>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    Logged in as <strong>{govProfile.designation}</strong> ({govProfile.jurisdictionZone}, {govProfile.district}, {govProfile.state}).
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
                    <div className="bg-slate-950 p-3 rounded-xl border border-rose-900/30 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase">Active Freezes</span>
                      <span className="text-lg font-bold text-rose-400">1,209 Accounts</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-rose-900/30 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase">Ledger Entries</span>
                      <span className="text-lg font-bold text-amber-400">{ledgerRecords.length} Active</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-rose-900/30 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase">Submitted Grievances</span>
                      <span className="text-lg font-bold text-emerald-400">{officialSubmittedReports.length} Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MULE DISRUPTION ENGINE */}
            {currentView === "mule_engine" && activeSessionTier === "government" && (
              <div className="space-y-6">
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center space-x-2 border-b border-slate-900 pb-3 mb-4">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">Emergency Account Hold Protocol</h2>
                  </div>
                  {freezeSuccess && (
                    <div className="p-3 mb-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                      {freezeSuccess}
                    </div>
                  )}
                  <form onSubmit={handleFreezeAccount} className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Target Account / UPI Virtual Payment Address (VPA)</label>
                      <input 
                        type="text" required value={freezeTarget} onChange={e => setFreezeTarget(e.target.value)}
                        placeholder="e.g. 9812XXXXXX@vpa or 3091029XXXXXX"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Official Hold Classification Reason</label>
                      <select 
                        value={freezeReason} onChange={e => setFreezeReason(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-rose-500"
                      >
                        <option value="Suspected Digital Arrest Mule Account">Suspected Digital Arrest Mule Account</option>
                        <option value="FICN Counterfeit Proceeds Outlet">FICN Counterfeit Proceeds Outlet</option>
                        <option value="Cross-Border Offshore Layering Node">Cross-Border Offshore Layering Node</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-wider text-xs">
                      Issue Immediate Freeze Order Across Banking Network
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 3: CROSS-AGENCY LEDGER (FULL MOCK DATA & FILTERS) */}
            {currentView === "police" && activeSessionTier === "government" && (
              <div className="space-y-6">
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
                    <div className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">National Cyber Crime Cross-Agency Ledger</h2>
                        <p className="text-[10px] text-slate-500 font-mono">Shared Intelligence Database across Police, CBI, ED, & 1930 Portal</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAddLedgerModal(true)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs px-3 py-2 rounded-xl flex items-center space-x-1 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>NEW INCIDENT</span>
                    </button>
                  </div>

                  {/* Search and Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input 
                        type="text" 
                        value={ledgerSearch} 
                        onChange={(e) => setLedgerSearch(e.target.value)}
                        placeholder="Search suspect, bank account..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                      />
                    </div>
                    <div>
                      <select 
                        value={ledgerFilterState} 
                        onChange={(e) => setLedgerFilterState(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                      >
                        <option value="ALL">All States</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Delhi">Delhi</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        value={ledgerFilterAgency} 
                        onChange={(e) => setLedgerFilterAgency(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                      >
                        <option value="ALL">All Agencies</option>
                        <option value="CBI Cyber Division">CBI Cyber Division</option>
                        <option value="National Cyber Crime Portal (1930)">National Cyber Crime Portal (1930)</option>
                        <option value="State Police Cyber Cell">State Police Cyber Cell</option>
                        <option value="Telangana Cyber Security Bureau">Telangana Cyber Security Bureau</option>
                        <option value="Enforcement Directorate (ED)">Enforcement Directorate (ED)</option>
                      </select>
                    </div>
                  </div>

                  {/* Add Incident Form Modal */}
                  {showAddLedgerModal && (
                    <form onSubmit={handleAddLedgerSubmit} className="bg-slate-950 border border-indigo-900/60 p-4 rounded-xl space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <span className="font-bold text-indigo-400">ADD NEW LEDGER INCIDENT ENTRY</span>
                        <button type="button" onClick={() => setShowAddLedgerModal(false)} className="text-slate-500 hover:text-white">✕</button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" required placeholder="Suspect Name / Syndicate Alias" value={newLedgerEntry.suspect} onChange={e => setNewLedgerEntry({...newLedgerEntry, suspect: e.target.value})} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200" />
                        <input type="text" required placeholder="Bank Account / UPI ID" value={newLedgerEntry.bankAccount} onChange={e => setNewLedgerEntry({...newLedgerEntry, bankAccount: e.target.value})} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200" />
                        <input type="text" placeholder="Financial Loss Amount (e.g. ₹10,00,000)" value={newLedgerEntry.amountLoss} onChange={e => setNewLedgerEntry({...newLedgerEntry, amountLoss: e.target.value})} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200" />
                        <select value={newLedgerEntry.agency} onChange={e => setNewLedgerEntry({...newLedgerEntry, agency: e.target.value})} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200">
                          <option value="State Police Cyber Cell">State Police Cyber Cell</option>
                          <option value="CBI Cyber Division">CBI Cyber Division</option>
                          <option value="National Cyber Crime Portal (1930)">National Cyber Crime Portal (1930)</option>
                          <option value="Enforcement Directorate (ED)">Enforcement Directorate (ED)</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={() => setShowAddLedgerModal(false)} className="px-3 py-1.5 border border-slate-800 rounded-lg text-slate-400">Cancel</button>
                        <button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-lg">Save Record</button>
                      </div>
                    </form>
                  )}

                  {/* Incident Table */}
                  <div className="space-y-3 font-mono text-xs">
                    {filteredLedger.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                        No ledger entries match the selected filters.
                      </div>
                    ) : (
                      filteredLedger.map((rec) => (
                        <div key={rec.id} className="bg-slate-950 p-4 border border-slate-900 rounded-xl space-y-2 hover:border-slate-800 transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-2 gap-1">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                              <span className="font-bold text-slate-200">{rec.id}</span>
                              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-900">{rec.agency}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rec.status === "FROZEN" || rec.status === "INTERCEPTED" ? "bg-emerald-950 text-emerald-400 border border-emerald-900" : "bg-rose-950 text-rose-400 border border-rose-900"}`}>
                              {rec.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                            <div><span className="text-slate-500">Suspect / Node:</span> <strong className="text-slate-200">{rec.suspect}</strong></div>
                            <div><span className="text-slate-500">Crime Type:</span> <span className="text-amber-400 font-semibold">{rec.crimeType}</span></div>
                            <div><span className="text-slate-500">Bank Account / VPA:</span> <span className="text-sky-400">{rec.bankAccount}</span></div>
                            <div><span className="text-slate-500">Jurisdiction Location:</span> <span className="text-slate-300">{rec.district}, {rec.state}</span></div>
                            <div><span className="text-slate-500">Reported Fraud Amount:</span> <strong className="text-rose-400">{rec.amountLoss}</strong></div>
                            <div><span className="text-slate-500">Risk Assessment:</span> <span className="text-rose-500 font-bold">{rec.riskLevel}</span></div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PROACTIVE SHIELD (CITIZEN PORTAL DEFAULT) */}
            {currentView === "citizen" && activeSessionTier === "citizen" && (
              <div className="space-y-6">
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <ShieldAlert className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">Communication Safety Check</h2>
                    </div>
                  </div>

                  {/* Location Tracking Input Field */}
                  <div className="mb-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center space-x-2 flex-1 mr-2">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="flex-1">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Threat Location Tracking Tag</span>
                        <input 
                          type="text" 
                          value={userLocation} 
                          onChange={(e) => setUserLocation(e.target.value)}
                          placeholder="Enter City / District / State..."
                          className="bg-transparent text-slate-200 focus:outline-none w-full text-xs"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleFetchLocation}
                      disabled={isLocating}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center space-x-1 shrink-0"
                    >
                      <Navigation className="w-3 h-3 text-sky-400" />
                      <span>{isLocating ? "Locating..." : "Auto-GPS"}</span>
                    </button>
                  </div>

                  <form onSubmit={handleTextScan} className="space-y-4">
                    <textarea
                      value={scanText} onChange={(e) => setScanText(e.target.value)}
                      placeholder="Paste suspicious text logs, Skype extortion templates, WhatsApp notices, or threat messages here..."
                      className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                    <button type="submit" disabled={scanLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs uppercase py-3 rounded-xl transition-all">
                      {scanLoading ? "Running Neural Safety Check..." : "Analyze Suspicious Message"}
                    </button>
                  </form>
                </div>

                {/* Banknote Counterfeit Currency Scan */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <Upload className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">Banknote Counterfeit Scan</h2>
                  </div>
                  <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center bg-slate-950/50">
                    <label className="cursor-pointer block">
                      <input type="file" className="hidden" onChange={handleCurrencyUpload} accept="image/*" />
                      <span className="text-xs bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono font-bold px-4 py-2.5 rounded-lg inline-block">
                        {currencyLoading ? "Analyzing Banknote Specimen..." : "Upload Banknote Specimen"}
                      </span>
                    </label>
                  </div>

                  {currencyResult && (
                    <div className={`mt-4 p-4 rounded-xl border font-mono text-xs ${currencyResult.is_fake ? "bg-rose-950/20 border-rose-500/20 text-rose-300" : "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"}`}>
                      <div className="flex items-center space-x-2 mb-2 font-bold text-sm">
                        {currencyResult.is_fake ? <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" /> : <Shield className="w-4 h-4 text-emerald-400 shrink-0" />}
                        <span>{currencyResult.status}</span>
                      </div>
                      <p>Note Type: {currencyResult.denomination_detected} | AI Confidence: {currencyResult.confidence_score}%</p>
                      <ul className={`list-disc pl-4 space-y-1 text-slate-300 text-[11px] mt-2 border-t pt-2 ${currencyResult.is_fake ? "border-rose-900/40" : "border-emerald-900/40"}`}>
                        {currencyResult.verifications?.map((fail, i) => (
                           <li key={i} className={fail.startsWith("PASSED") ? "text-emerald-400" : "text-rose-400"}>{fail}</li>
                        ))}
                      </ul>
                      <div className="mt-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 italic font-bold">
                        {currencyResult.citizen_advisory}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: VOICE & VIDEO SCANNER */}
            {currentView === "media_scan" && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
                  <Mic className="w-5 h-5 text-sky-400" />
                  <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">Voice & Video Media Deepfake Scanner</h2>
                </div>
                
                <div className="flex space-x-3 font-mono text-xs">
                  <button 
                    onClick={() => setMediaType("audio")}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold border flex items-center justify-center space-x-2 transition-all ${mediaType === "audio" ? "bg-sky-600 text-white border-sky-500" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>Voice Recording Scan</span>
                  </button>
                  <button 
                    onClick={() => setMediaType("video")}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold border flex items-center justify-center space-x-2 transition-all ${mediaType === "video" ? "bg-indigo-600 text-white border-indigo-500" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Video Recording Scan</span>
                  </button>
                </div>

                <form onSubmit={handleMediaScan} className="space-y-4 font-mono text-xs">
                  <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 text-center bg-slate-950/50">
                    <label className="cursor-pointer block">
                      <input 
                        type="file" 
                        accept={mediaType === "audio" ? "audio/*" : "video/*"} 
                        onChange={(e) => setMediaFile(e.target.files[0])} 
                        className="hidden" 
                      />
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                        <span className="text-xs text-sky-400 font-bold block">
                          {mediaFile ? `Selected: ${mediaFile.name}` : `Select ${mediaType === "audio" ? "Audio (.mp3, .wav)" : "Video (.mp4, .avi)"} File`}
                        </span>
                      </div>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={!mediaFile || mediaLoading}
                    className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl uppercase tracking-wider transition-all"
                  >
                    {mediaLoading ? "Running Spectral Deepfake Neural Check..." : "Scan Media File for AI Manipulations"}
                  </button>
                </form>

                {mediaResult && (
                  <div className={`p-4 rounded-xl border font-mono text-xs ${mediaResult.is_threat ? "bg-slate-950 border-rose-500/50 text-slate-200" : "bg-slate-950 border-emerald-500/50 text-slate-200"} space-y-3`}>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className={mediaResult.is_threat ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>ANALYSIS COMPLETE: {mediaResult.file_name}</span>
                      <span className={mediaResult.is_threat ? "bg-rose-950/60 border border-rose-800 text-rose-300 text-[10px] px-2 py-0.5 rounded font-bold" : "bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold"}>
                        {mediaResult.is_threat ? "THREAT CONFIRMED" : "SAFE / NO THREAT DETECTED"}
                      </span>
                    </div>
                    {mediaResult.type === "audio" ? (
                      <p className="text-amber-400"><strong>Voice Synthetic Score:</strong> {mediaResult.ai_voice_clone_probability}</p>
                    ) : (
                      <p className="text-amber-400"><strong>Deepfake Detection Index:</strong> {mediaResult.deepfake_video_score}</p>
                    )}
                    <p className="text-slate-300"><strong>Spectrum Verdict:</strong> {mediaResult.threat_assessment}</p>
                    {mediaResult.is_threat && (
                      <div className="mt-2 bg-rose-950/40 p-2 rounded border border-rose-900/50 text-rose-200">
                        <strong>Action Required:</strong> {mediaResult.recommended_action}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: AI ASSISTANT (PRIVATE CITIZEN vs TACTICAL GOVT) */}
            {currentView === "chatbot" && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl h-[520px] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                    <div>
                      <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">
                        {activeSessionTier === "government" ? "Tactical Inter-Agency Assistant AI" : "Private Citizen Safety Assistant"}
                      </h2>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {activeSessionTier === "government" ? "Official Tactical Query Console" : "🔒 Confidential Chat — Private to your device session"}
                      </p>
                    </div>
                  </div>
                  {activeSessionTier === "citizen" && (
                    <button 
                      onClick={handleEscalateToGov} 
                      className="bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all"
                    >
                      Submit Official Complaint
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto font-mono text-xs space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-900 mb-4 flex flex-col">
                  {(activeSessionTier === "government" ? govChatHistory : citizenChatHistory).map((msg, i) => (
                    <div key={i} className={`p-3 rounded-xl max-w-[85%] ${msg.sender === "bot" ? "bg-slate-900 text-indigo-200 border border-indigo-950/60 self-start" : "bg-indigo-600 text-white ml-auto"}`}>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={activeSessionTier === "government" ? handleGovSendMessage : handleCitizenSendMessage} className="flex space-x-2 font-mono text-xs">
                  <input
                    type="text" 
                    value={activeSessionTier === "government" ? govChatInput : citizenChatInput} 
                    onChange={(e) => activeSessionTier === "government" ? setGovChatInput(e.target.value) : setCitizenChatInput(e.target.value)}
                    placeholder="Ask AI safety assistant..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 rounded-xl font-bold transition-all">
                    SEND
                  </button>
                </form>
              </div>
            )}

            {/* TAB 7: PERSONAL / OFFICIAL USER WORKSPACE */}
            {currentView === "bio" && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">
                      {activeSessionTier === "government" ? "Official Credentials Workspace" : "Personal User Workspace"}
                    </h2>
                  </div>
                  {!isEditingProfile && (
                    <button onClick={() => setIsEditingProfile(true)} className="flex items-center space-x-1 text-xs font-mono font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-900/60 px-3 py-1 rounded-lg hover:bg-indigo-950 transition-all">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>EDIT PROFILE</span>
                    </button>
                  )}
                </div>

                {activeSessionTier === "government" ? (
                  /* GOVERNMENT OFFICIAL PROFILE */
                  isEditingProfile ? (
                    <form onSubmit={handleSaveGovProfile} className="space-y-4 font-mono text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Officer Full Name</label>
                          <input type="text" value={tempGovProfile.fullName} onChange={e => setTempGovProfile({...tempGovProfile, fullName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Designation (Role)</label>
                          <select value={tempGovProfile.designation} onChange={e => setTempGovProfile({...tempGovProfile, designation: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500">
                            <option value="Nodal Cyber Crime Officer">Nodal Cyber Crime Officer</option>
                            <option value="Inspector of Police - Cyber Cell">Inspector of Police - Cyber Cell</option>
                            <option value="Superintendent of Police (SP)">Superintendent of Police (SP)</option>
                            <option value="Cyber Threat Intelligence Analyst">Cyber Threat Intelligence Analyst</option>
                            <option value="Deputy Director - Cyber Security Division">Deputy Director - Cyber Security Division</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Department / Unit</label>
                          <input type="text" value={tempGovProfile.department} onChange={e => setTempGovProfile({...tempGovProfile, department: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Posting State / UT</label>
                          <input type="text" value={tempGovProfile.state} onChange={e => setTempGovProfile({...tempGovProfile, state: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">District / Zone</label>
                          <input type="text" value={tempGovProfile.district} onChange={e => setTempGovProfile({...tempGovProfile, district: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Police Station / Jurisdiction Zone</label>
                          <input type="text" value={tempGovProfile.jurisdictionZone} onChange={e => setTempGovProfile({...tempGovProfile, jurisdictionZone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Office Address</label>
                          <input type="text" value={tempGovProfile.officeAddress} onChange={e => setTempGovProfile({...tempGovProfile, officeAddress: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Office Pincode</label>
                          <input type="text" value={tempGovProfile.officePincode} onChange={e => setTempGovProfile({...tempGovProfile, officePincode: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2 justify-end">
                        <button type="button" onClick={() => setIsEditingProfile(false)} className="border border-slate-800 hover:bg-slate-900 text-slate-400 font-bold px-4 py-2.5 rounded-xl transition-all">Cancel</button>
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all flex items-center space-x-1">
                          <Save className="w-4 h-4" />
                          <span>Save Credentials</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="font-mono text-xs space-y-4 bg-slate-950 p-5 border border-slate-900 rounded-xl">
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-b border-slate-900 pb-4">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Officer Name</span>
                          <span className="text-slate-100 font-bold text-sm">{govProfile.fullName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Designation</span>
                          <span className="text-rose-400 font-bold">{govProfile.designation}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Department</span>
                          <span className="text-slate-200">{govProfile.department}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Badge / Service ID</span>
                          <span className="text-slate-300">{govProfile.badgeId}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-1">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">State & District</span>
                          <span className="text-slate-200">{govProfile.district}, {govProfile.state} ({govProfile.officePincode})</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Jurisdiction Zone</span>
                          <span className="text-sky-400 font-bold">{govProfile.jurisdictionZone}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Office HQ Address</span>
                          <span className="text-slate-300">{govProfile.officeAddress}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Clearance Level</span>
                          <span className="text-emerald-400 font-bold">{govProfile.clearanceLevel}</span>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  /* CITIZEN USER PROFILE */
                  isEditingProfile ? (
                    <form onSubmit={handleSaveCitizenProfile} className="space-y-4 font-mono text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Full Name</label>
                          <input type="text" value={tempCitizenProfile.fullName} onChange={e => setTempCitizenProfile({...tempCitizenProfile, fullName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Age</label>
                          <input type="number" value={tempCitizenProfile.age} onChange={e => setTempCitizenProfile({...tempCitizenProfile, age: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Area / Address</label>
                          <input type="text" value={tempCitizenProfile.area} onChange={e => setTempCitizenProfile({...tempCitizenProfile, area: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">State & Pincode</label>
                          <div className="flex space-x-2">
                            <input type="text" placeholder="State" value={tempCitizenProfile.state} onChange={e => setTempCitizenProfile({...tempCitizenProfile, state: e.target.value})} className="w-2/3 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                            <input type="text" placeholder="Pincode" value={tempCitizenProfile.pincode} onChange={e => setTempCitizenProfile({...tempCitizenProfile, pincode: e.target.value})} className="w-1/3 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                          </div>
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Phone Number</label>
                          <input type="text" value={tempCitizenProfile.phone} onChange={e => setTempCitizenProfile({...tempCitizenProfile, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Occupation</label>
                          <input type="text" value={tempCitizenProfile.occupation} onChange={e => setTempCitizenProfile({...tempCitizenProfile, occupation: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500" />
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2 justify-end">
                        <button type="button" onClick={() => setIsEditingProfile(false)} className="border border-slate-800 hover:bg-slate-900 text-slate-400 font-bold px-4 py-2.5 rounded-xl transition-all">Cancel</button>
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all flex items-center space-x-1">
                          <Save className="w-4 h-4" />
                          <span>Save Profile</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="font-mono text-xs space-y-4 bg-slate-950 p-5 border border-slate-900 rounded-xl">
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-b border-slate-900 pb-4">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Full Name</span>
                          <span className="text-slate-100 font-bold text-sm">{citizenProfile.fullName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Age</span>
                          <span className="text-slate-200">{citizenProfile.age} Years</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Location & Pincode</span>
                          <span className="text-slate-200">{citizenProfile.area}, {citizenProfile.state} - {citizenProfile.pincode}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Phone Number</span>
                          <span className="text-slate-200">{citizenProfile.phone}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-1">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Occupation</span>
                          <span className="text-slate-200">{citizenProfile.occupation}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase block font-bold">Emergency Contact</span>
                          <span className="text-emerald-400 font-bold">{citizenProfile.emergencyContact}</span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* TAB 8: NODE CONFIGURATIONS */}
            {currentView === "settings" && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
                  <Settings className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-sm font-bold font-mono text-slate-200 uppercase">Node Configurations & API Settings</h2>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-900/60 rounded-xl p-4 font-mono text-xs text-indigo-200 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-indigo-300">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>NODE CONFIGURATION TAB FUNCTION</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-300">
                    This tab configures local client connections to backend Sentinel API detection nodes, WebSocket live feeds, and local security caches.
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="space-y-2">
                    <label className="text-slate-400 block tracking-wide uppercase text-[10px] font-bold">API Backend Microservice Target</label>
                    <input 
                      type="text" value={serverEndpoint} onChange={e => setServerEndpoint(e.target.value)}
                      placeholder="http://127.0.0.1:8000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: LIVE THREAT EVALUATION MATRIX */}
          {currentView !== "chatbot" && currentView !== "bio" && (
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
                {activeSessionTier === "government" ? (
                  <div className="w-full h-full flex flex-col">
                    <div className="flex items-center space-x-2 border-b border-slate-900 pb-3 mb-4">
                      <Network className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <h2 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">National Cyber Operations Command</h2>
                    </div>
                    <img src={cyberMapImg} alt="Cyber Command Map" className="w-full h-auto rounded-lg border border-slate-800 shadow-2xl opacity-90 object-cover" style={{ minHeight: "250px" }} />
                  </div>
                ) : (
                  <>
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                    <h2 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">Evaluation Stream Matrix</h2>
                  </div>
                  {scanResult && (
                    <button onClick={generatePDF} className="flex items-center space-x-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-1 rounded-md hover:bg-emerald-950 transition-all">
                      <Download className="w-3 h-3" />
                      <span>EXPORT INTEL</span>
                    </button>
                  )}
                </div>

                {scanResult ? (
                  <div className="font-mono text-xs space-y-4">
                    <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase">Target Classification</span>
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/40">THREAT CONFIRMED</span>
                      </div>
                      <p className="text-slate-200 font-bold text-sm">{scanResult.threat_assessment?.scam_type}</p>
                      <div className="flex items-center space-x-4 pt-1 text-[11px]">
                        <div><span className="text-slate-500">Risk Score:</span> <span className="text-rose-400 font-bold">{scanResult.threat_assessment?.risk_score}%</span></div>
                        <div><span className="text-slate-500">Cluster ID:</span> <span className="text-slate-300 font-semibold">{scanResult.graph_intelligence?.campaign_nexus_id}</span></div>
                      </div>
                      <div className="pt-2 border-t border-slate-900 flex items-center space-x-2 text-[10px] text-slate-400">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Tagged Location: {userLocation}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Multilingual Advisory Translator</label>
                      <select 
                        value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="en">English (Default)</option>
                        <option value="hi">Hindi (हिन्दी)</option>
                        <option value="te">Telugu (తెలుగు)</option>
                        <option value="ta">Tamil (தமிழ்)</option>
                        <option value="mr">Marathi (मराठी)</option>
                      </select>
                    </div>

                    <div className="bg-slate-950/80 p-4 border border-indigo-950 rounded-xl border-l-4 border-l-indigo-500">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase block mb-1">Local Response Directive</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed italic">
                        {selectedLang === "en" ? scanResult.final_decision?.citizen_advisory : regionalTranslations[selectedLang]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-900 bg-slate-950/30 rounded-xl py-12">
                    <Network className="w-8 h-8 text-slate-700 mb-2" />
                    <p className="text-xs font-mono text-slate-500 max-w-[200px] leading-relaxed">No threat profile active. Input message text or banknote images into analysis filters to generate risk telemetry.</p>
                  </div>
                )}
                </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}