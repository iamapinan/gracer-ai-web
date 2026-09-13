import { motion } from 'framer-motion';
import { ArrowUpRight, Blocks, Bot, GraduationCap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ServicePillarsSection = () => {
  const { t } = useLanguage();
  const pillars = [
    {
      eyebrow: '01',
      title: t('transformationTitle'),
      description: t('transformationDesc'),
      icon: <Blocks size={25} strokeWidth={1.75} />,
      accent: 'from-[#ff5757] to-[#ff8c5a]',
      products: [
        t('aiIntegration'),
        t('aiWorkflowConsulting'),
        t('aiErp'),
        t('bullDocs'),
        t('beokBoq'),
        t('foodCostProfit'),
        t('homePlace'),
        t('gvents'),
      ],
    },
    {
      eyebrow: '02',
      title: t('governanceTitle'),
      description: t('governanceDesc'),
      icon: <ShieldCheck size={25} strokeWidth={1.75} />,
      accent: 'from-blue-500 to-cyan-400',
      products: [t('gegiControlPlan'), t('aiGatewayOptimize'), t('ragSandbox')],
    },
    {
      eyebrow: '03',
      title: t('trainingTitle'),
      description: t('trainingDesc'),
      icon: <GraduationCap size={25} strokeWidth={1.75} />,
      accent: 'from-purple-500 to-fuchsia-400',
      products: [t('basicAiTraining'), t('advancedWorkflowTraining'), t('smeWorkshop')],
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">{t('servicesEyebrow')}</p>
          <h2 className="font-urbanist text-4xl font-bold tracking-tight text-white sm:text-5xl">{t('servicesTitle')}</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-300">{t('servicesDesc')}</p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${pillar.accent}`} />
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.accent} text-white shadow-lg`}>
                  {pillar.icon}
                </div>
                <span className="font-urbanist text-sm font-semibold tracking-[0.2em] text-gray-500">{pillar.eyebrow}</span>
              </div>

              <div className="mt-8">
                <h3 className="font-urbanist text-2xl font-bold text-white">{pillar.title}</h3>
                <p className="mt-3 min-h-14 leading-relaxed text-gray-400">{pillar.description}</p>
              </div>

              <ul className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
                {pillar.products.map((product) => (
                  <li key={product} className="flex items-start gap-3 text-[15px] leading-snug text-gray-200">
                    <Bot size={15} className="mt-0.5 shrink-0 text-gray-500 transition-colors group-hover:text-blue-300" />
                    <span>{product}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7 text-sm font-medium text-gray-400">
                <span className="inline-flex items-center gap-2 transition-colors group-hover:text-white">
                  {t('servicePillarLabel')} <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePillarsSection;
