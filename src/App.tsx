import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowDown, ChevronDown, Menu } from 'lucide-react';
import './index.css';

// Components
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import ResellerRegistration from './components/ResellerRegistration';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import CookiePolicy from './components/CookiePolicy';
import DemoPage from './components/DemoPage';
import ProductDetailPage from './components/ProductDetailPage';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    document.title = location.pathname === '/demo'
      ? 'AI Operations Demo | Gracer AI'
      : 'Gracer AI — AI Workflow สำหรับ SME ไทย';
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/llm" element={<Layout><ProductDetailPage /></Layout>} />
        <Route path="/products/:slug" element={<Layout><ProductDetailPage /></Layout>} />
        <Route path="/" element={
          <Layout>
            <LandingPage />
            <ResellerRegistration />
          </Layout>
        } />
        <Route path="/privacy-policy" element={
          <Layout>
            <PrivacyPolicy />
          </Layout>
        } />
        <Route path="/terms-and-conditions" element={
          <Layout>
            <TermsAndConditions />
          </Layout>
        } />
        <Route path="/reseller-registration" element={
          <Layout>
            <ResellerRegistration />
          </Layout>
        } />
        <Route path="/cookie-policy" element={
          <Layout>
            <CookiePolicy />
          </Layout>
        } />
      </Routes>
      {location.pathname !== '/demo' && <Footer />}
    </>
  );
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
