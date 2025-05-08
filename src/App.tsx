import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowDown, ChevronDown, Menu } from 'lucide-react';
import './index.css';
// import { useLanguage } from './contexts/LanguageContext';

// Components
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import SpecsSection from './components/SpecsSection';
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
  // const { language } = useLanguage();
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
              title="Gracer Intelligence Platform"
              description="Platform สำหรับผู้ใช้ สามารถแบ่งสิทธิผู้ใช้ได้ มีระบบจัดการผู้ใช้ การตั้งค่า และส่วนต่างๆที่ทำงานร่วมกับ GRACER AI อย่างแนบเนียน ทั้งยังมีคลังแอปพลิเคชั่นที่หลากหลาย เหมาะกับอุตสาหกรรมต่างๆ มีทั้งแบบมาพร้อมอุปกรณ์ Gracer AI Compute module หรือแบบ Online subscription"
              imageSrc="/assets/platform.png"
              features={[
                { title: "AI Assistant", description: "ผู้ช่วยอัจฉริยะที่ผนวกรวมเข้ากับระบบ สามารถใช้พูดคุยได้หลากหลาย สร้างสรรค์ตามจินตนาการได้ไม่สิ้นสุด เรียกใช้ได้เสมอไม่ว่ากำลังใช้งานส่วนใดของระบบ" },
                { title: "App Explorer", description: "ศูนย์รวมแอปฯ ที่หลากหลาย เครื่องมือที่ทำงานกับ AI และเกมสที่เป็นประโยชน์มากมาย ใช้งานได้ฟรีไม่จำกัด เลือกติดตั้งได้ตามความต้องการ และเพิ่มขึ้นเรื่อยๆ" },
                { title: "Data Storage", description: "พื้นที่เก็บข้อมูลที่สามารถใช้งานได้ฟรีผู้ใช้ละ 3GB สามารถเก็บไฟล์และแชร์ได้อย่างอิสระ" }
              ]}
              reverse={true}
              imgClass="w-full p-4 hover:scale-105 transition-all duration-300"
            />
            <FeatureSection 
              id="models"
              title="Gracer AI Models"
              description="Gracer AI คือโมเดล AI ที่มีประสิทธิภาพสูงสุด สามารถดำเนินการทำงานกับข้อมูลที่มีความซับซ้อนได้อย่างรวดเร็ว โดยใช้พลังงานที่น้อยที่สุดและตอบโจทย์ความต้องการเฉพาะที่ต้องการ"
              imageSrc="/assets/ai-models.jpg"
              features={[
                { title: "Parameter Models", description: "ขนาดพารามิเตอร์ที่หลากหลายตอบโจทย์ความซับซ้อนของการใช้งานทั้ง 1b, 4b, 7b, และ 24b" },
                { title: "Low Latency", description: "รองรับการดำเนินการที่มีความต้องการความเร็วสูง" },
                { title: "Finetune for you", description: "มีการฝึกโมเดลสำหรับการทำงานแต่ละแบบ ตามประเภทการใช้งาน" }
              ]}
            />
            <FeatureSection 
              id="privacy"
              title="Privacy First"
              description="รักษาข้อมูลของคุณให้เป็นส่วนตัวอย่างสมบูรณ์ Gracer AI ประมวลผลทุกอย่างในเครื่อง เพื่อให้แน่ใจว่าข้อมูลของคุณจะไม่ถูกส่งออกนอกอุปกรณ์ของคุณ และไม่นำข้อมูลของคุณไปใช้งานส่วนอื่นใดโดยไม่ได้รับความยินยอมจากคุณ"
              imageSrc="/assets/privacy.png"
              features={[
                { title: "การทำงานอย่างอิสระ", description: "ไม่ต้องใช้งานอินเทอร์เน็ต" },
                { title: "ไม่แบ่งปันข้อมูล", description: "ข้อมูลของคุณจะอยู่บนอุปกรณ์ของคุณเสมอ" },
                { title: "การเข้ารหัสขั้นพื้นฐาน", description: "การเข้ารหัสขั้นพื้นฐานสำหรับการปกป้องข้อมูลอย่างมืออาชีพ โดยเฉพาะข้อมูลส่วนบุคคล" }
              ]}
              reverse={true}
            />
            <SpecsSection />
            <UseCasesSection />
            {/* <AppStoreSection /> */}
            <IndustrySection />
            {/* <ResellerSection /> */}
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
      <Footer />
    </Router>
  );
}

export default App;
