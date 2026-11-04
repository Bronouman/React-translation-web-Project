// translation-web/frontend/src/components/AboutPage.jsx
import React from 'react';
import tripletsImage from '../assets/3riplets.jpeg';

export default function AboutPage({ interfaceLang }) {
  if (interfaceLang === 'arabic') {
    return (
      <div style={{ padding: '25px', lineHeight: '1.8' }}>
        <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>من نحن</h2>
        
        <img 
          src={tripletsImage} 
          alt="3riplets" 
          style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', marginBottom: '25px' }} 
        />
        
        <p style={{ marginBottom: '15px' }}>
          في قلب مساعينا الرقمية يقف نعمان، مهندس هذه المساحة الافتراضية. وتتكامل روحه الرؤيوية مع المساهمات الثاقبة لاخوته، اللذين تثري حكمتهما الجماعية رحلتنا
        </p>
        <p style={{ marginBottom: '15px' }}>
          باهيتشارا، وهو مصطلح متجذر بعمق باللغة الهندية/الأردية ، يلف جوهر مساعينا - أخوة الإنسانية ، وتتجاوز الحدود والثقافات المشابهة لأخوةنا/أخوتنا.
        </p>
        <p style={{ marginBottom: '15px' }}>
          يساعد موقعنا على الإنترنت على صياغة عالم عالمي
          باهيتشارا، وهو نسيج من النفوس المترابطة المرتبطة بخيوط التعاطف والوحدة. من خلال هذه المنصة ، نطمح إلى تفكيك الحواجز الجغرافية ، مما يعزز عالمًا حيث يمكن للأفراد من آفاق متنوعة التواصل بسلاسة وتمديد يد العون إلى المحتاجين
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '25px', lineHeight: '1.6' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>About Us</h2>
      
      <img 
        src={tripletsImage} 
        alt="3riplets" 
        style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', marginBottom: '25px' }} 
      />

      <p style={{ marginBottom: '15px' }}>
        At the heart of our digital endeavour stands Nouman, the architect of this virtual space. His visionary spirit is complemented by the insightful contributions inspired by his brotherhood, whose collective wisdom enriches our journey.
      </p>
      <p style={{ marginBottom: '15px' }}>
        'Bhaichara', a term deeply rooted in Hindi/Urdu, encapsulates the essence of our endeavour - the fraternity of humanity, transcending borders and cultures akin to our brotherhood/fraternity.
      </p>
      <p style={{ marginBottom: '15px' }}>
        Our website helps to forge a global 'Bhaichara', a tapestry of interconnected souls bound by the threads of compassion and unity. Through this platform, we aspire to dismantle geographical barriers, fostering a world where individuals from diverse horizons can communicate seamlessly and extend a helping hand to those in need.
      </p>
    </div>
  );
}