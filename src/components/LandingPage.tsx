import { motion } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck, Sparkles, Workflow, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroMotionCanvas from './HeroMotionCanvas';
import { useLanguage } from '../contexts/LanguageContext';
import { productVisualPath } from '../data/productDetails';

const LandingPage = () => {
  const { t } = useLanguage();
  const pillars = [
    {
      number: '01',
      title: t('transformationTitle'),
      description: t('landingTransformationDesc'),
      tone: 'border-[#8c52ff] bg-[#f0e9ff] text-[#7040d5]',
      accent: '#8c52ff',
      icon: Workflow,
      products: [t('aiIntegration'), t('aiWorkflowConsulting'), t('aiErp'), t('bullDocs'), t('beokBoq'), t('foodCostProfit'), t('homePlace'), t('gvents')],
    },
    {
      number: '02',
      title: t('governanceTitle'),
      description: t('landingGovernanceDesc'),
      tone: 'border-[#00c7c7] bg-[#e8f8f8] text-[#008f8f]',
      accent: '#00a8a8',
      icon: ShieldCheck,
      products: [t('gegiControlPlan'), t('aiGatewayOptimize'), t('ragSandbox')],
    },
    {
      number: '03',
      title: t('trainingTitle'),
      description: t('landingTrainingDesc'),
      tone: 'border-[#ff5757] bg-[#fff0f0] text-[#df4545]',
      accent: '#ef4b4b',
      icon: GraduationCap,
      products: [t('basicAiTraining'), t('advancedWorkflowTraining'), t('smeWorkshop')],
    },
  ];
  const productMeta: Record<string, { slug: string }> = {
    [t('aiIntegration')]: { slug: 'ai-integration' }, [t('aiWorkflowConsulting')]: { slug: 'ai-workflow-consulting' }, [t('aiErp')]: { slug: 'ai-erp' }, [t('bullDocs')]: { slug: 'bull-docs' }, [t('beokBoq')]: { slug: 'beok-boq' }, [t('foodCostProfit')]: { slug: 'food-cost-profit-dna' }, [t('homePlace')]: { slug: 'homeplace' }, [t('gvents')]: { slug: 'gvents' }, [t('gegiControlPlan')]: { slug: 'gegi' }, [t('aiGatewayOptimize')]: { slug: 'ai-gateway' }, [t('ragSandbox')]: { slug: 'rag-sandbox' }, [t('basicAiTraining')]: { slug: 'basic-ai-business' }, [t('advancedWorkflowTraining')]: { slug: 'advanced-workflow' }, [t('smeWorkshop')]: { slug: '10x-sme' },
  };
  const catalogProducts = [{ product: 'Gracer AI LLM', pillar: 'Gracer AI Platform', slug: 'llm' }, ...pillars.flatMap(pillar => pillar.products.map(product => ({ product, pillar: pillar.title, ...productMeta[product] })))] as const;

  return (
    <div className="bg-[#f6f5f8] text-[#2a2930]">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 lg:px-8 lg:pt-36">
        <HeroMotionCanvas />
        <div className="landing-orb landing-orb--coral" />
        <div className="landing-orb landing-orb--violet" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl">
            <p className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#8c52ff]">
              <span className="h-px w-10 bg-[#8c52ff]" /> {t('landingEyebrow')}
            </p>
            <h1 className="max-w-5xl font-urbanist text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-[#2a2930] sm:text-7xl lg:text-[86px]">
              {t('landingTitleStart')} <span className="landing-gradient-text">{t('landingTitleGradient')}</span> {t('landingTitleEnd')}
            </h1>
            <div className="mt-9 flex flex-col gap-6 border-l-2 border-[#8c52ff] pl-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-2xl text-lg leading-relaxed text-[#54515f] sm:text-xl">{t('landingDescription')}</p>
              <a href="#products" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#2a2930] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                {t('exploreProducts')} <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-16 grid overflow-hidden rounded-2xl border border-[#2a2930]/10 bg-white shadow-[0_20px_60px_rgba(42,41,48,0.08)] md:grid-cols-3">
            {[
              [t('outcomeIntegration'), Workflow],
              [t('outcomeControl'), ShieldCheck],
              [t('outcomeMomentum'), Sparkles],
            ].map(([outcome, Icon], index) => {
              const OutcomeIcon = Icon as typeof Workflow;
              return <div key={outcome as string} className={`p-7 ${index < 2 ? 'border-b border-[#2a2930]/10 md:border-b-0 md:border-r' : ''}`}>
                <OutcomeIcon size={22} className="mb-6 text-[#8c52ff]" />
                <p className="text-lg font-bold leading-snug">{outcome as string}</p>
              </div>;
            })}
          </motion.div>
        </div>
      </section>

      <section id="services" className="relative overflow-hidden border-y border-[#2a2930]/10 bg-[#f6f5f8] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="pointer-events-none absolute -right-28 top-10 h-72 w-72 rounded-full bg-[#8c52ff]/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="relative mb-12 grid gap-6 lg:grid-cols-[0.75fr_1.65fr] lg:items-end">
            <p className="flex items-center gap-3 self-start text-sm font-bold uppercase tracking-[0.18em] text-[#8c52ff]">
              <span className="h-px w-10 bg-[#8c52ff]" /> {t('servicesEyebrow')}
            </p>
            <div>
              <h2 className="max-w-4xl font-urbanist text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{t('landingPillarsTitle')}</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#686570] sm:text-lg">{t('servicesDesc')}</p>
            </div>
          </div>
          <div className="relative grid gap-4 lg:grid-cols-12">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`group relative overflow-hidden rounded-[28px] border border-[#2a2930]/10 bg-white p-6 shadow-[0_18px_50px_rgba(42,41,48,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(42,41,48,0.11)] sm:p-8 ${index === 0 ? 'lg:col-span-12' : 'lg:col-span-6'}`}
              >
                <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: pillar.accent }} />
                <div className="flex items-start justify-between gap-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${pillar.tone}`}>
                    <pillar.icon size={23} strokeWidth={1.8} />
                  </div>
                  <p className="text-xs font-bold tracking-[0.22em]" style={{ color: pillar.accent }}>{pillar.number} / 03</p>
                </div>
                <div className={index === 0 ? 'mt-10' : 'mt-8'}>
                  <h3 className={`font-urbanist font-bold leading-none tracking-[-0.04em] text-[#2a2930] ${index === 0 ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>{pillar.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-[#686570]">{pillar.description}</p>
                </div>
                <div className="mt-8 border-t border-[#2a2930]/10 pt-6">
                  <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: pillar.accent }}>{t('includedProducts')}</p>
                  <ul className={index === 0 ? 'grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4' : 'space-y-3'}>
                    {pillar.products.map(product => <li key={product} className="flex gap-2.5 text-sm font-semibold leading-snug text-[#2a2930]"><Check size={16} className="mt-0.5 shrink-0" style={{ color: pillar.accent }} />{product}</li>)}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8c52ff]">{t('productCatalogEyebrow')}</p>
              <h2 className="mt-3 max-w-2xl font-urbanist text-4xl font-bold tracking-[-0.04em] sm:text-5xl">{t('productCatalogTitle')}</h2>
            </div>
            <p className="max-w-md leading-relaxed text-[#54515f]">{t('productCatalogDesc')}</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {catalogProducts.map(({ product, pillar, slug }, index) => (
              <motion.article key={product} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.24) }} className="group flex min-h-52 flex-col rounded-2xl border border-[#2a2930]/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(42,41,48,0.1)]">
                <img src={productVisualPath(slug)} alt="" className="h-24 w-24 object-contain transition duration-300 group-hover:scale-105" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#77737f]">{pillar}</p>
                <h3 className="mt-3 font-urbanist text-xl font-bold leading-tight tracking-[-0.025em]">{product}</h3>
                <Link to={slug === 'llm' ? '/llm' : `/products/${slug}`} className="mt-auto pt-7 text-sm font-semibold text-[#8c52ff]">{t('productDetailsSoon')} <ArrowRight className="inline" size={15} /></Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="landing-cta mx-auto max-w-7xl overflow-hidden rounded-3xl px-7 py-12 sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/75">Gracer AI</p>
            <h2 className="mt-4 font-urbanist text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl">{t('landingCtaTitle')}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">{t('landingCtaDesc')}</p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#2a2930] transition-transform hover:-translate-y-0.5">{t('landingCtaAction')} <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
