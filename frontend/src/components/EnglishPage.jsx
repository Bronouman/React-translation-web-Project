// translation-web/frontend/src/components/EnglishPage.jsx
import React, { useState } from 'react';
import supported_languages from '../languages.json';

const API_URL = '/api';

export default function EnglishPage() {
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    if (!inputText) return alert("Please Enter Some Text For Translation");
    if (!selectedLanguage) return alert("Please Select a Language To Be Translated");

    const destCode = supported_languages[selectedLanguage];

    try {
      const res = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, dest_lang_code: destCode })
      });
      const data = await res.json();
      if (data.result) setTranslatedText(data.result);
    } catch (error) {
      alert("Error translating. Please try again.");
    }
  };

  const playAudio = async (textToSpeak, targetLangCode = null) => {
    if (!textToSpeak) return;

    try {
      let finalLang = targetLangCode;

      if (!finalLang) {
        const detRes = await fetch(`${API_URL}/detect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textToSpeak })
        });
        const detData = await detRes.json();
        finalLang = detData.language || 'en';
      }

      const audRes = await fetch(`${API_URL}/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, language: finalLang })
      });
      const audData = await audRes.json();

      if (audData.audio) {
        const audio = new Audio(audData.audio);
        audio.play();
      }
    } catch (error) {
      alert("Error playing audio.");
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '25px', color: '#1e293b' }}>English Translator & Speech Synthesis</h2>

      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <option value="">-- Select Target Language --</option>
        {Object.keys(supported_languages).map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <textarea
        placeholder="Enter Text for Translation"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ height: '140px', marginBottom: '20px' }}
      />

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button onClick={handleTranslate}>Translate</button>
        <button onClick={() => playAudio(inputText, null)}>Speak Input</button>
        <button onClick={() => playAudio(translatedText, supported_languages[selectedLanguage])}>Speak Output</button>
      </div>

      <div style={{ padding: '25px', backgroundColor: '#f8fafc', minHeight: '100px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
        <strong style={{ color: '#475569' }}>Result: </strong> <br /><br />
        <span style={{ fontSize: '16px' }}>{translatedText}</span>
      </div>
    </div>
  );
}
