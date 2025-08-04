import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!link) {
      alert('Please paste a YouTube video link');
      return;
    }

    try {
      const response = await axios.post('https://content-moderator-backend-2.onrender.com/analyze', {
        youtubeLink: link,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing video:', error);
      alert('Network Error: Please ensure backend is running.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Content Moderator Online</h1>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste YouTube Link"
        style={{ width: '300px', padding: '10px' }}
      />
      <button onClick={analyze} style={{ marginLeft: '10px', padding: '10px 20px' }}>
        Analyze
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>{result.videoTitle}</h3>
          <p><b>Tags:</b> {result.tags.join(', ')}</p>
          <p><b>Moderation Status:</b> {result.moderationStatus}</p>
          <p><b>Description:</b> {result.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
