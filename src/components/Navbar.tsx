import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <img src="/assets/logo-text-white.png" alt="Gracer AI" className="h-8 w-auto" />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <a href="/#platform" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{t("platform")}</a>
              <a href="/#models" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{t("models")}</a>
              <a href="/#privacy" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{t("privacy")}</a>
              <a href="/#specs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{t("techSpecs")}</a>
              <a href="/#use-cases" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{t("useCases")}</a>
              {/* <a href="#app-store" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{t("appStore")}</a> */}
              <a href="/#industries" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{t("industries")}</a>
              <LanguageSwitcher />
              <a href="/reseller-registration" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium ml-4">{t("becomeReseller")}</a>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95">
            <a href="/#platform" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("platform")}</a>
            <a href="/#models" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("performance")}</a>
            <a href="/#privacy" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("privacy")}</a>
            <a href="/#specs" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("techSpecs")}</a>
            <a href="/#use-cases" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("useCases")}</a>
            {/* <a href="#app-store" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("appStore")}</a> */}
            <a href="/#industries" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("industries")}</a>
            <div className="mt-2 border-t border-gray-700 pt-3">
              <LanguageSwitcher />
            </div>
            <a href="/reseller-registration" className="mt-4 block w-full bg-white text-black px-4 py-2 rounded-md text-sm font-medium text-center">{t("becomeReseller")}</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
