import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setIsProcessing(true);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setRecognizedText(response.data.text);
    } catch (error) {
      console.error('Error during OCR:', error);
      alert('Error processing image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Handwritten Text Recognition</h1>
        <p>Upload an image and recognize text from it</p>
      </div>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Upload and Recognize'}
        </button>
      </div>
      {recognizedText && (
        <div className="result-section">
          <h3>Recognized Text:</h3>
          <div className="recognized-text">{recognizedText}</div>
        </div>
      )}
    </div>
  );
}

export default App;
