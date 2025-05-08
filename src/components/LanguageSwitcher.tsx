import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang: 'en' | 'th') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 text-gray-300 hover:text-white rounded-md text-sm font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={16} className="mr-1" />
        <ChevronDown size={16} className={`transition duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-blue-400' : 'text-gray-300'} hover:bg-gray-700`}
                role="menuitem"
              >
                {t("english")}
                {language === 'en' && (
                  <span className="ml-2">✓</span>
                )}
              </button>
              <button
                onClick={() => handleLanguageChange('th')}
                className={`block w-full text-left px-4 py-2 text-sm ${language === 'th' ? 'text-blue-400' : 'text-gray-300'} hover:bg-gray-700`}
                role="menuitem"
              >
                {t("thai")}
                {language === 'th' && (
                  <span className="ml-2">✓</span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
