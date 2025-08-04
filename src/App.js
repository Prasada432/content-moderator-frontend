import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    try {
      const response = await axios.post('https://content-moderator-backend-2.onrender.com/analyze', { youtubeLink: link });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : '';
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Content Moderator Online</h1>
      <input
        type="text"
        value={link}
        onChange={e => setLink(e.target.value)}
        placeholder="Paste YouTube Link"
        style={{ width: '300px' }}
      />
      <button onClick={analyze}>Analyze</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>{result.videoTitle}</h3>
          <p><b>Tags:</b> {result.tags.join(', ')}</p>
          <p><b>Moderation Status:</b> {result.moderationStatus}</p>

          {/* Embed YouTube Video */}
          <div style={{ marginTop: 20 }}>
            <iframe
              width="560"
              height="315"
              src={getYouTubeEmbedUrl(link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
