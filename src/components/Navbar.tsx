import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2930]/10 bg-[#f6f5f8]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <img src="/assets/logo-text.png" alt="Gracer AI" className="h-8 w-auto" />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <a href="/#services" className="rounded-md px-3 py-2 text-sm font-medium text-[#54515f] hover:text-[#2a2930]">{t("services")}</a>
              <a href="/#products" className="rounded-md px-3 py-2 text-sm font-medium text-[#54515f] hover:text-[#2a2930]">{t("products")}</a>
              <LanguageSwitcher />
              <a href="/#contact" className="ml-4 rounded-full bg-[#2a2930] px-4 py-2 text-sm font-medium text-white">{t("contactUs")}</a>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[#54515f] hover:bg-black/5 hover:text-[#2a2930] focus:outline-none"
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
          <div className="space-y-1 bg-[#f6f5f8] px-2 pb-3 pt-2 sm:px-3">
            <a href="/#services" className="block rounded-md px-3 py-2 text-base font-medium text-[#54515f]">{t("services")}</a>
            <a href="/#products" className="block rounded-md px-3 py-2 text-base font-medium text-[#54515f]">{t("products")}</a>
            <div className="mt-2 border-t border-[#2a2930]/10 pt-3">
              <LanguageSwitcher />
            </div>
            <a href="/#contact" className="mt-4 block w-full rounded-full bg-[#2a2930] px-4 py-2 text-center text-sm font-medium text-white">{t("contactUs")}</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
