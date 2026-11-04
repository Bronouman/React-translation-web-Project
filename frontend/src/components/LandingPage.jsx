// translation-web/frontend/src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnglishClick = () => {
    window.alert("** PLEASE READ THE CAUTIONS VERY CAREFULLY **\n😊🍿All The Best🍟🥤\n😊🍿Now, Go and Enjoy The Website🍟🥤");
    // Replace: true prevents the user from using the browser back button to return here
    navigate('/english', { replace: true });
  };

  const handleArabicClick = () => {
    window.alert("** يرجى قراءة التحذيرات بعناية فائقة **\n🥤🍟أتمنى لك كل خير🍿😊\n🥤🍟الآن، يلاّ روح واستمتع بالموقع🍿😊");
    // Replace: true prevents the user from using the browser back button to return here
    navigate('/arabic', { replace: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{
        fontSize: '44px',
        fontWeight: '700',
        marginBottom: '15px',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Welcome to Lingo
      </h1>
      <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '50px' }}>
        Please select your preferred interface language:
      </p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ background: '#ffffff', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', width: '320px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '15px', color: '#1e293b', fontSize: '22px' }}>English</h3>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '30px' }}>Access the English interface and tools.</p>
          <button onClick={handleEnglishClick} style={{ width: '100%' }}>Launch English</button>
        </div>

        <div style={{ background: '#ffffff', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', width: '320px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '15px', color: '#1e293b', fontSize: '22px' }}>العربية</h3>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '30px' }}>الوصول إلى واجهة اللغة العربية.</p>
          {/* Optional touch of green specifically for the Arabic button */}
          <button onClick={handleArabicClick} style={{ width: '100%', background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)' }}>ابدأ بالعربية</button>
        </div>
      </div>
    </div>
  );
}
