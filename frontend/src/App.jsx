// translation-web/frontend/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import ContactPage from './components/ContactPage';
import LanguagesPage from './components/LanguagesPage';
import EnglishPage from './components/EnglishPage';
import ArabicPage from './components/ArabicPage';
import AboutPage from './components/AboutPage';

export default function App() {
  return (
    <Routes>
      {/* Unprotected entry portal page */}
      <Route path="/" element={<Layout hideSidebar><LandingPage /></Layout>} />

      {/* 🇬🇧 English Mode Isolation Context */}
      <Route path="/english/*" element={
        <Layout>
          <Routes>
            <Route path="" element={<EnglishPage />} />
            <Route path="about" element={<AboutPage interfaceLang="english" />} />
            <Route path="contact" element={<ContactPage interfaceLang="english" />} />
            <Route path="langs" element={<LanguagesPage interfaceLang="english" />} />
            <Route path="*" element={<Navigate to="/english" replace />} />
          </Routes>
        </Layout>
      } />

      {/* 🇸🇦 Arabic Mode Isolation Context */}
      <Route path="/arabic/*" element={
        <Layout>
          <Routes>
            <Route path="" element={<ArabicPage />} />
            <Route path="about" element={<AboutPage interfaceLang="arabic" />} />
            <Route path="contact" element={<ContactPage interfaceLang="arabic" />} />
            <Route path="langs" element={<LanguagesPage interfaceLang="arabic" />} />
            <Route path="*" element={<Navigate to="/arabic" replace />} />
          </Routes>
        </Layout>
      } />

      {/* Wildcard security fallback redirector */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}