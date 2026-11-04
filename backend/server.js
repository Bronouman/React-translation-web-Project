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

// 1. Translate Endpoint
app.post('/translate', async (req, res) => {
  try {
    const { text, dest_lang_code } = req.body;
    const result = await translate(text, { to: dest_lang_code });
    res.json({ result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// 2. Detect Endpoint
app.post('/detect', async (req, res) => {
  try {
    const { text } = req.body;
    let detectedLang = supported_languages['English']; // Default fallback

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

// 3. Speak Endpoint - Returns Base64 to entirely bypass browser CORS blocks
app.post('/speak', async (req, res) => {
  try {
    const { text, language } = req.body;
    const targetLang = language || supported_languages['English'];

    // 1st Attempt: Use native base64 generation if using google-tts-api version 2
    if (googleTTS && typeof googleTTS.getAudioBase64 === 'function') {
      const base64 = await googleTTS.getAudioBase64(text, {
        lang: targetLang,
        slow: false,
        host: 'https://translate.google.com',
      });
      return res.json({ audio: `data:audio/mp3;base64,${base64}` });
    }

    // Fallback: If using version 1, get the URL and fetch it via the backend
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

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend is running flawlessly on http://localhost:${PORT}`);
});
