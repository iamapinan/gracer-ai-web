import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const UseCasesSection = () => {
  const { t } = useLanguage();
  const useCases = [
    {
      title: t("educationUseCase"),
      description: t("educationUseCaseDesc"),
      icon: "💼"
    },
    {
      title: t("creativityUseCase"),
      description: t("creativityUseCaseDesc"),
      icon: "🎨"
    },
    {
      title: t("businessUseCase"),
      description: t("businessUseCaseDesc"),
      icon: "🏢"
    },
    {
      title: t("generalWorkUseCase"),
      description: t("generalWorkUseCaseDesc"),
      icon: "📇"
    },
    {
      title: t("privacyUseCase"),
      description: t("privacyUseCaseDesc"),
      icon: "🔒"
    },
    {
      title: t("offlineWorkUseCase"),
      description: t("offlineWorkUseCaseDesc"),
      icon: "🚫"
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("useCasesTitle")}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("useCasesDesc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-300">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">{t("readyTransform")}</h3>
          <a href="#reseller-registration" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
          >
            {t("becomeReseller")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
