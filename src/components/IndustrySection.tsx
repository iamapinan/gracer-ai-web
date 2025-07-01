import { motion } from 'framer-motion';
import { Building, GraduationCap, MessageSquareCode } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const IndustrySection = () => {
  const { t } = useLanguage();
  const industries = [
    {
      name: t("educationIndustry"),
      icon: <GraduationCap size={28} />,
      highlighted: true,
      description: t("educationIndustryDesc"),
      useCases: [
        t("educationUseCase1"),
        t("educationUseCase2"),
        t("educationUseCase3"),
        t("educationUseCase4"),
        t("educationUseCase5")
      ]
    },
    {
      name: t("corporateIndustry"),
      icon: <Building size={28} />,
      description: t("corporateIndustryDesc"),
      useCases: [
        t("corporateUseCase1"),
        t("corporateUseCase2"),
        t("corporateUseCase3"),
        t("corporateUseCase4")
      ]
    },
    {
      name: t("developmentIndustry"),
      icon: <MessageSquareCode size={28} />,
      description: t("developmentIndustryDesc"),
      useCases: [
        t("developmentUseCase1"),
        t("developmentUseCase2"),
        t("developmentUseCase3"),
        t("developmentUseCase4")
      ]
    }
  ];

  return (
    <section id="industries" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("industryTitle")}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("industryDesc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl p-6 border ${
                industry.highlighted 
                  ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/50' 
                  : 'bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-800'
              } backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300`}
            >
              <div className="flex items-center mb-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3 ${
                  industry.highlighted 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-600' 
                    : 'bg-gray-700'
                }`}>
                  {industry.icon}
                </div>
                <h3 className="text-2xl font-semibold">{industry.name}</h3>
              </div>
              
              <p className="text-gray-300 mb-4">{industry.description}</p>
              
              <ul className="space-y-2 mb-4">
                {industry.useCases.slice(0, 3).map((useCase, caseIndex) => (
                  <li key={caseIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-200">{useCase}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center">
                  {t("learnMoreAbout")} {industry.name} {t("solutions")}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20"
        >
          <div className="md:flex items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">{t("eduSpotlight")}</h3>
              <p className="text-gray-300 mb-4">
                {t("eduSpotlightDesc")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-3">
                  <h4 className="font-medium mb-1">{t("primarySecondary")}</h4>
                  <p className="text-sm text-gray-400">{t("primarySecondaryDesc")}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <h4 className="font-medium mb-1">{t("university")}</h4>
                  <p className="text-sm text-gray-400">{t("universityDesc")}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <h4 className="font-medium mb-1">{t("specialEducation")}</h4>
                  <p className="text-sm text-gray-400">{t("specialEducationDesc")}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <h4 className="font-medium mb-1">{t("dataManagement")}</h4>
                  <p className="text-sm text-gray-400">{t("dataManagementDesc")}</p>
                </div>
              </div>
              <button className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium"
              onClick={() => {
                window.open("/assets/ai-for-education.pdf", "_blank");
              }}>
                {t("educationGuide")}
              </button>
            </div>
            <div className="md:w-1/3">
              <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/assets/education.png" 
                    alt="Education Solutions" 
                    className="object-cover w-full h-full opacity-90" 
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySection;
