// translation-web/frontend/src/components/Layout.jsx
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children, hideSidebar }) {
  const location = useLocation();

  // Renders a fullscreen layout without the sidebar for the Landing Page
  if (hideSidebar) {
    return (
      <div className="app-container landing-background">
        {children}
      </div>
    );
  }

  // Detect interface mode based on the URL path string
  const isArabicInterface = location.pathname.startsWith('/arabic');

  if (isArabicInterface) {
    return (
      <div className="app-container" style={{ flexDirection: 'row-reverse' }}>
        {/* Sidebar Navigation - Arabic Interface */}
        <nav className="sidebar" style={{ textAlign: 'right' }}>
          <h3>قائمة لينجو</h3>
          <ul className="nav-links" style={{ paddingRight: 0, listStyle: 'none' }}>
            <li><Link to="/arabic">الصفحة الرئيسية</Link></li>
            <li><Link to="/arabic/about">من نحن</Link></li>
            <li><Link to="/arabic/contact">اتصل بنا</Link></li>
            <li><Link to="/arabic/langs">اللغات</Link></li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="main-content" style={{ direction: 'rtl', textAlign: 'right' }}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation - English Interface */}
      <nav className="sidebar">
        <h3>Lingo Menu</h3>
        <ul className="nav-links">
          <li><Link to="/english">Home Page</Link></li>
          <li><Link to="/english/about">About Us</Link></li>
          <li><Link to="/english/contact">Contact Us</Link></li>
          <li><Link to="/english/langs">Languages</Link></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}