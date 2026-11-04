// translation-web/frontend/src/components/ArabicPage.jsx
import React, { useState } from 'react';
import supported_languages from '../languages.json';

const BACKEND_URL = `http://${window.location.hostname}:8000`;

export default function ArabicPage() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleTranslate = async () => {
    if (!inputText) return window.alert("الرجاء إدخال بعض النص للترجمة");
    if (!selectedLanguage) return window.alert("الرجاء اختيار اللغة المراد ترجمتها");

    const destCode = supported_languages[selectedLanguage];

    try {
      const res = await fetch(`${BACKEND_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, dest_lang_code: destCode })
      });
      const data = await res.json();
      if (data.result) setTranslatedText(data.result);
    } catch (error) {
      window.alert("خطأ في الترجمة");
    }
  };

  const playAudio = async (textToSpeak, targetLangCode = null) => {
    if (!textToSpeak) return;

    try {
      let finalLang = targetLangCode;

      if (!finalLang) {
        const detRes = await fetch(`${BACKEND_URL}/detect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textToSpeak })
        });
        const detData = await detRes.json();
        finalLang = detData.language || 'ar';
      }

      const audRes = await fetch(`${BACKEND_URL}/speak`, {
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
      alert("خطأ في الصوت");
    }
  };

  return (
    <div dir="rtl" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'right' }}>
      <h2 style={{ marginBottom: '25px', color: '#1e293b' }}>المترجم ومركب النطق</h2>

      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <option value="">-- اختر اللغة الهدف --</option>
        {Object.keys(supported_languages).map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <textarea
        style={{ minHeight: '140px', marginBottom: '20px' }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="أدخل النص للترجمة..."
      />

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        <button onClick={handleTranslate}>ترجمة</button>
        <button onClick={() => playAudio(inputText, null)}>استمع للأصل</button>
        <button onClick={() => playAudio(translatedText, supported_languages[selectedLanguage])}>استمع للترجمة</button>
      </div>

      <div style={{ minHeight: '100px', padding: '25px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
        <strong style={{ color: '#475569' }}>النتيجة: </strong> <br /><br />
        <span style={{ fontSize: '16px' }}>{translatedText}</span>
      </div>
    </div>
  );
}
