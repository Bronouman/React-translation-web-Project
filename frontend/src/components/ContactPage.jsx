// translation-web/frontend/src/components/ContactPage.jsx
import React from 'react';

export default function ContactPage({ interfaceLang }) {
  if (interfaceLang === 'arabic') {
    return (
      <div style={{ padding: '25px', lineHeight: '1.8' }}>
        <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>اتصل بنا</h2>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <p style={{ margin: '8px 0' }}><strong>الاتصال :</strong> ٦٠١١٥٧٨١٣٩٧٨+ | ٩١٧٩٨١٦٠٦٥٤٨+</p>
          <p style={{ margin: '8px 0' }}><strong>البريد الإلكتروني :</strong> mohammadgmalr@gmail.com</p>
          <p style={{ margin: '8px 0' }}><strong>المواعيد:</strong> ٥:٠٠ مساءً - ٧:٠٠ مساءً</p>
        </div>

        <p style={{ marginBottom: '15px', color: '#334155' }}>
          نوصيك بإرسال بريد إلكتروني إلينا بدلاً من الاتصال بنا لأننا لن نرد على المكالمات لأننا سنكون مشغولين للغاية. ولكن إذا كان ذلك ضروريًا حقًا، فيرجى الاتصال بنا باستخدام الرقم أعلاه
        </p>

        <p style={{ fontWeight: '600', color: '#2563eb', marginBottom: '20px' }}>
          أرسل مقطع فيديو إلى بريدنا الإلكتروني
        </p>

        <div style={{ background: '#fef2f2', borderRight: '4px solid #ef4444', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
          <p style={{ color: '#991b1b', margin: 0, fontWeight: '500' }}>
            اتصل فقط في حالة حدوث خطأ أو أي مشكلات أخرى أثناء استخدام الموقع
          </p>
          <p style={{ margin: '5px 0 0 0' }}>😡لن نستقبل المكالمات غير الضرورية😡</p>
        </div>

        <p style={{ fontStyle: 'italic', color: '#64748b', marginBottom: '10px' }}>😉لا أقصد الإساءة بصراحة😜</p>
        <p style={{ fontWeight: '500', color: '#10b981' }}>😊شكرًا لك على تفهمك ودعمك😊</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '25px', lineHeight: '1.6' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>Contact Us</h2>

      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
        <p style={{ margin: '8px 0' }}><strong>Call :</strong> +91 7981606548 | +60 1157813978</p>
        <p style={{ margin: '8px 0' }}><strong>Email :</strong> mohammadgmalr@gmail.com</p>
        <p style={{ margin: '8px 0' }}><strong>Timings :</strong> 5:00 PM - 7:00 PM</p>
      </div>

      <p style={{ marginBottom: '15px', color: '#334155' }}>
        We would recommend to email us rather than calling us since we would not pick up the calls since we would be really busy. But, if it's really necessary, please call us using the above number.
      </p>

      <p style={{ fontWeight: '600', color: '#2563eb', marginBottom: '20px' }}>
        Send a Video to our Email
      </p>

      <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
        <p style={{ color: '#991b1b', margin: 0, fontWeight: '500' }}>
          Call only for Error or Any Other Issues faced while using the Website
        </p>
        <p style={{ margin: '5px 0 0 0' }}>😡Unnecessary Calls will not be entertained by us😡</p>
      </div>

      <p style={{ fontStyle: 'italic', color: '#64748b', marginBottom: '10px' }}>😉No Offence to be Honest😜</p>
      <p style={{ fontWeight: '500', color: '#10b981' }}>😊Thank You for your Understanding and your Support😊</p>
    </div>
  );
}

