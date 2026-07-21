import React, { useState } from 'react';

export default function CitizenPortal() {
  // File state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('currency'); // 'currency' or 'media'
  
  // Loading & Result state
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle File Selection & Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // Reset previous result
      setErrorMessage('');
    }
  };

  // Handle API Submission
  const handleUploadAndVerify = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select an image file first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Determine target API endpoint based on active tab
    const endpoint = activeTab === 'currency' 
      ? 'http://127.0.0.1:5000/api/verify-note'
      : 'http://127.0.0.1:5000/api/verify-media';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Server processing error');
      }

      const data = await response.json();
      console.log("Live Backend Payload:", data);
      setResult(data);
    } catch (err) {
      console.error('Verification Error:', err);
      setErrorMessage(err.message || 'Failed to connect to backend server on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.badge}>SENTINEL SHIELD ENGINE</div>
        <h1 style={styles.title}>CITIZEN INTELLIGENCE PORTAL</h1>
        <p style={styles.subtitle}>Computer Vision Counterfeit & Deepfake Analysis System</p>
      </header>

      {/* Tab Switcher */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'currency' ? styles.activeTab : {}),
          }}
          onClick={() => {
            setActiveTab('currency');
            setResult(null);
          }}
        >
          💵 Banknote Counterfeit Scan
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'media' ? styles.activeTab : {}),
          }}
          onClick={() => {
            setActiveTab('media');
            setResult(null);
          }}
        >
          🔍 Deepfake / Tampering Check
        </button>
      </div>

      {/* Main Container Card */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>
          {activeTab === 'currency'
            ? 'UPLOAD BANKNOTE SPECIMEN (e.g., ₹500)'
            : 'UPLOAD MEDIA FOR TAMPERING ANALYSIS'}
        </h3>

        <div style={styles.uploadBox}>
          <input
            type="file"
            id="file-upload-input"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload-input" style={styles.uploadLabel}>
            {selectedFile ? `Selected: ${selectedFile.name}` : '📁 Choose Image File'}
          </label>
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div style={styles.previewContainer}>
            <img src={previewUrl} alt="Upload Preview" style={styles.previewImage} />
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleUploadAndVerify}
          disabled={isLoading || !selectedFile}
          style={{
            ...styles.submitButton,
            ...(isLoading || !selectedFile ? styles.disabledButton : {}),
          }}
        >
          {isLoading ? 'ANALYZING COMPUTER VISION MATRIX...' : 'RUN LIVE ANALYSIS'}
        </button>

        {/* Error Display */}
        {errorMessage && (
          <div style={styles.errorBox}>
            <strong>SYSTEM ERROR:</strong> {errorMessage}
          </div>
        )}

        {/* Live Analysis Result Output */}
        {result && (
          <div
            style={{
              ...styles.resultCard,
              borderColor: (result.is_genuine || result.is_tampered === false) ? '#10b981' : '#f43f5e',
              backgroundColor: (result.is_genuine || result.is_tampered === false) ? '#064e3b22' : '#88133722',
            }}
          >
            <h2
              style={{
                color: (result.is_genuine || result.is_tampered === false) ? '#34d399' : '#fb7185',
                marginTop: 0,
                fontSize: '18px',
                letterSpacing: '0.05em'
              }}
            >
              {(result.is_genuine || result.is_tampered === false) ? '✓ ' : '⚠️ '}
              {result.status}
            </h2>

            <p style={styles.resultText}>
              <strong style={{ color: '#94a3b8' }}>Details:</strong> {result.message}
            </p>

            {/* Banknote metadata */}
            {activeTab === 'currency' && result.matches_found !== undefined && (
              <p style={styles.resultText}>
                <strong style={{ color: '#94a3b8' }}>Keypoint Matches (Inliers):</strong>{' '}
                <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{result.matches_found}</span>
              </p>
            )}

            {/* Deepfake metadata */}
            {activeTab === 'media' && result.manipulation_score !== undefined && (
              <p style={styles.resultText}>
                <strong style={{ color: '#94a3b8' }}>ELA Compression Score:</strong>{' '}
                <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{result.manipulation_score}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Cyber Dark Theme Styles
const styles = {
  container: {
    maxWidth: '850px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: '#f8fafc',
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    color: '#38bdf8',
    backgroundColor: '#0369a133',
    borderRadius: '20px',
    border: '1px solid #0284c7',
    marginBottom: '8px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '0.05em',
    margin: '5px 0',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
  tabContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  tabButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: '700',
    border: '1px solid #334155',
    borderRadius: '8px',
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    backgroundColor: '#1e1b4b',
    color: '#818cf8',
    borderColor: '#6366f1',
    boxShadow: '0 0 12px rgba(99, 102, 241, 0.25)',
  },
  card: {
    backgroundColor: '#0f172a',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
    border: '1px solid #1e293b',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    color: '#cbd5e1',
    marginTop: 0,
    marginBottom: '15px',
  },
  uploadBox: {
    marginBottom: '15px',
  },
  uploadLabel: {
    display: 'block',
    padding: '16px',
    textAlign: 'center',
    backgroundColor: '#1e293b',
    border: '2px dashed #475569',
    borderRadius: '8px',
    color: '#38bdf8',
    fontWeight: '600',
    cursor: 'pointer',
  },
  previewContainer: {
    textAlign: 'center',
    margin: '15px 0',
  },
  previewImage: {
    maxHeight: '220px',
    borderRadius: '8px',
    border: '1px solid #334155',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    fontSize: '14px',
    fontWeight: '800',
    letterSpacing: '0.05em',
    color: '#ffffff',
    backgroundColor: '#4f46e5',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
  },
  disabledButton: {
    backgroundColor: '#334155',
    color: '#64748b',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  errorBox: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#450a0a',
    color: '#fca5a5',
    borderRadius: '6px',
    border: '1px solid #991b1b',
    fontSize: '13px',
  },
  resultCard: {
    marginTop: '20px',
    padding: '18px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  resultText: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#e2e8f0',
  },
};