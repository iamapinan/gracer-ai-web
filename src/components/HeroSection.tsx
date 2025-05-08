import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: "100vh" }}>
      <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      </div>
      <div className="container relative mx-auto py-6">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5757] to-purple-600">{t("heroTitle")}</span>
              </h1>
              <h2 className="text-3xl md:text-5xl font-light">
                {t("heroSubtitle")}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                {t("heroDescription")}
              </p>
              <div className="flex justify-center space-x-4 mt-10">
                <motion.a 
                  href="#reseller-registration"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium text-center"
                >
                  {t("becomeReseller")}
                </motion.a>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  {t("learnMore")}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }} 
            className="text-white cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: document.getElementById('platform')?.offsetTop,
                behavior: 'smooth'
              });
            }}
          >
            <ArrowDown size={24} className="mx-auto" />
            <span className="text-sm">{t("scrollExplore")}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
