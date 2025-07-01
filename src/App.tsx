import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowDown, ChevronDown, Menu } from 'lucide-react';
import './index.css';
import { useLanguage } from './contexts/LanguageContext';

// Components
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import UseCasesSection from './components/UseCasesSection';
// import AppStoreSection from './components/AppStoreSection';
import IndustrySection from './components/IndustrySection';
// import ResellerSection from './components/ResellerSection';
import Footer from './components/Footer';
import ResellerRegistration from './components/ResellerRegistration';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import CookiePolicy from './components/CookiePolicy';

export function App() {
  const { t } = useLanguage();
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.title = 'Gracer AI | Intelligence platform and Local LLMs in your area';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Navbar />
            <HeroSection />
            <FeatureSection 
              id="platform"
              title={t("platformTitle")}
              description={t("platformDesc")}
              imageSrc="/assets/platform.png"
              features={[
                { title: t("aiAssistantTitle"), description: t("aiAssistantDesc") },
                { title: t("appExplorerTitle"), description: t("appExplorerDesc") },
                { title: t("dataStorageTitle"), description: t("dataStorageDesc") }
              ]}
              reverse={true}
              imgClass="w-full p-4 hover:scale-105 transition-all duration-300"
            />
            <FeatureSection 
              id="models"
              title={t("modelsTitle")}
              description={t("modelsDesc")}
              imageSrc="/assets/ai-models.jpg"
              features={[
                { title: t("parameterModelsTitle"), description: t("parameterModelsDesc") },
                { title: t("lowLatencyTitle"), description: t("lowLatencyDesc") },
                { title: t("finetuneTitle"), description: t("finetuneDesc") }
              ]}
            />
            <FeatureSection 
              id="privacy"
              title={t("privacyFeatureTitle")}
              description={t("privacyFeatureDesc")}
              imageSrc="/assets/privacy.png"
              features={[
                { title: t("independentOperationTitle"), description: t("independentOperationDesc") },
                { title: t("noDataSharingTitle"), description: t("noDataSharingDesc") },
                { title: t("basicEncryptionTitle"), description: t("basicEncryptionDesc") }
              ]}
              reverse={true}
            />
            <UseCasesSection />
            {/* <AppStoreSection /> */}
            <IndustrySection />
            <ResellerRegistration />
            {/* <ResellerSection /> */}
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
      <Footer />
    </Router>
  );
}

export default App;
