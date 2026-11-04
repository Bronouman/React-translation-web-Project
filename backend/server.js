// translation-web/backend/server.js
const express = require('express');
const cors = require('cors');
const translate = require('translate-google');
const googleTTS = require('google-tts-api');
const https = require('https');

// Load languages from JSON
const supported_languages = require('./languages.json');

const app = express();
app.use(cors());
app.use(express.json());

// API endpoints are served under /api to match the Vercel public rewrite.
app.post('/api/translate', async (req, res) => {
  try {
    const { text, dest_lang_code } = req.body;
    const result = await translate(text, { to: dest_lang_code });
    res.json({ result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.post('/api/detect', async (req, res) => {
  try {
    const { text } = req.body;
    let detectedLang = supported_languages['English'];

    // Lightweight heuristic detection to handle main scripts
    if (text) {
      if (/[\u0600-\u06FF]/.test(text)) {
        detectedLang = supported_languages['العربية'];
      } else if (/[\u0400-\u04FF]/.test(text)) {
        detectedLang = supported_languages['русский'];
      } else if (/[\u0900-\u097F]/.test(text)) {
        detectedLang = supported_languages['हिंदी'];
      }
    }

    res.json({ language: detectedLang });
  } catch (error) {
    res.status(500).json({ error: 'Detection failed' });
  }
});

app.post('/api/speak', async (req, res) => {
  try {
    const { text, language } = req.body;
    const targetLang = language || supported_languages['English'];

    // Use native base64 generation when supported by the installed google-tts-api version.
    if (googleTTS && typeof googleTTS.getAudioBase64 === 'function') {
      const base64 = await googleTTS.getAudioBase64(text, {
        lang: targetLang,
        slow: false,
        host: 'https://translate.google.com',
      });
      return res.json({ audio: `data:audio/mp3;base64,${base64}` });
    }

    // Fallback for version 1: fetch the generated audio URL on the backend.
    let audioUrl;
    if (typeof googleTTS === 'function') {
      audioUrl = await googleTTS(text, targetLang, 1);
    } else {
      audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${targetLang}&client=tw-ob`;
    }

    https.get(audioUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (response) => {
      if (response.statusCode !== 200) {
        return res.status(500).json({ error: 'Failed to fetch audio from Google' });
      }
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        const base64 = Buffer.concat(chunks).toString('base64');
        res.json({ audio: `data:audio/mp3;base64,${base64}` });
      });
    }).on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Audio fetch failed' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Audio generation failed' });
  }
});

// Export the Express app for Vercel; keep direct local execution available too.
if (require.main === module) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`);
  });
}

module.exports = app;
