// translation-web/frontend/src/components/LanguagesPage.jsx
import { useNavigate } from 'react-router-dom';

export default function LanguagesPage({ interfaceLang }) {
  const navigate = useNavigate();

  if (interfaceLang === 'arabic') {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>اللغات</h2>
        <p style={{ marginBottom: '25px', color: '#64748b' }}>تبديل واجهة التطبيق كاملة إلى اللغة الأخرى:</p>

        <button
          onClick={() => navigate('/english/langs')}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600'
          }}
        >
          English
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>English Languages</h2>
      <p style={{ marginBottom: '25px', color: '#64748b' }}>Toggle the application interface layout language completely:</p>

      <button
        onClick={() => navigate('/arabic/langs')}
        style={{
          padding: '12px 30px',
          fontSize: '16px',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600'
        }}
      >
        Arabic
      </button>
    </div>
  );
}

