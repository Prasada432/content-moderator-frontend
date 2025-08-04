
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const response = await axios.post('http://localhost:5000/analyze', { youtubeLink: link });
    setResult(response.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Content Moderator Online</h1>
      <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="Paste YouTube Link" />
      <button onClick={analyze}>Analyze</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>{result.videoTitle}</h3>
          <p><b>Tags:</b> {result.tags.join(', ')}</p>
          <p><b>Moderation Status:</b> {result.moderationStatus}</p>
        </div>
      )}
    </div>
  );
}

export default App;
