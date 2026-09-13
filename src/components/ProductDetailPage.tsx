import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Layers3, Target } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { localise, productDetails, productScreenshotPath, productVisualPath } from '../data/productDetails';

const accents = {
  violet: { solid: '#8c52ff', soft: '#f0e9ff', ink: '#7040d5', border: 'border-[#8c52ff]/25', wash: 'from-[#f0e9ff] via-white to-[#fff5f2]', glow: 'bg-[#8c52ff]/20' },
  teal: { solid: '#00a8a8', soft: '#e7f8f7', ink: '#008a8a', border: 'border-[#00a8a8]/25', wash: 'from-[#e7f8f7] via-white to-[#eff7ff]', glow: 'bg-[#00c7c7]/20' },
  coral: { solid: '#ef4b4b', soft: '#fff0f0', ink: '#df4545', border: 'border-[#ff5757]/25', wash: 'from-[#fff0f0] via-white to-[#fff8ea]', glow: 'bg-[#ff5757]/20' },
  indigo: { solid: '#6257d8', soft: '#ecebff', ink: '#5148bc', border: 'border-[#6257d8]/25', wash: 'from-[#ecebff] via-white to-[#eef7ff]', glow: 'bg-[#6257d8]/20' },
};

const labels = {
  th: {
    back: 'กลับไปหน้าสินค้า', service: 'บริการ', product: 'ผลิตภัณฑ์', course: 'หลักสูตร', platform: 'แพลตฟอร์ม', consult: 'ปรึกษาโครงการ',
    capabilities: 'ความสามารถหลัก', capabilitiesTitle: 'ออกแบบมาเพื่อเปลี่ยนงานจริง ไม่ใช่แค่สาธิต AI', how: 'วิธีทำงาน', howTitle: 'จากโจทย์สู่ผลลัพธ์ที่นำไปใช้ต่อได้',
    suitable: 'เหมาะสำหรับ', receive: 'สิ่งที่คุณจะได้รับ', ctaEyebrow: 'เริ่มต้นกับ Gracer AI', ctaTitle: 'เล่าโจทย์ของคุณ แล้วเราจะช่วยเลือกจุดเริ่มที่เหมาะที่สุด',
    ctaDesc: 'เริ่มจากเป้าหมาย ข้อมูล และข้อจำกัดจริง ก่อนเลือกโมเดลหรือเครื่องมือ', ctaAction: 'คุยกับทีม Gracer AI', related: 'สำรวจต่อ',
    relatedTitle: 'บริการและผลิตภัณฑ์ที่เกี่ยวข้อง', view: 'ดูรายละเอียด', notFound: 'ไม่พบสินค้านี้', preview: 'Product in view',
    previewTitle: 'ดูหน้าตาและการทำงานของผลิตภัณฑ์จริง', coursePreviewTitle: 'ภาพรวมหลักสูตรและรายละเอียดการสมัคร',
  },
  en: {
    back: 'Back to products', service: 'Service', product: 'Product', course: 'Course', platform: 'Platform', consult: 'Discuss your project',
    capabilities: 'Core capabilities', capabilitiesTitle: 'Designed to change real work—not merely demo AI', how: 'How it works', howTitle: 'From a business problem to an operational outcome',
    suitable: 'Best for', receive: 'What you receive', ctaEyebrow: 'Start with Gracer AI', ctaTitle: 'Share the problem. We’ll help identify the right place to begin.',
    ctaDesc: 'We start with outcomes, data and real constraints before choosing a model or tool.', ctaAction: 'Talk to Gracer AI', related: 'Explore next',
    relatedTitle: 'Related services and products', view: 'View details', notFound: 'Product not found', preview: 'Product in view',
    previewTitle: 'See the real product experience and workflow', coursePreviewTitle: 'Course overview and registration details',
  },
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const { language } = useLanguage();
  const copy = labels[language];
  const currentSlug = location.pathname === '/llm' ? 'llm' : slug || '';
  const product = productDetails[currentSlug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) document.title = `${product.name} | Gracer AI`;
  }, [currentSlug, product]);

  if (!product) return <div className="min-h-[70vh] bg-[#f6f5f8] px-4 pt-36 text-center"><h1 className="font-urbanist text-4xl font-bold">{copy.notFound}</h1><Link to="/#products" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#8c52ff]"><ArrowLeft size={17} /> {copy.back}</Link></div>;

  const accent = accents[product.accent];
  const screenshot = productScreenshotPath(currentSlug);
  const related = Object.entries(productDetails).filter(([key, item]) => key !== currentSlug && localise(item.category, language) === localise(product.category, language)).slice(0, 3);

  return (
    <div className="overflow-hidden bg-[#f6f5f8] pb-24 pt-16 text-[#2a2930]">
      <section className={`relative border-b border-[#2a2930]/10 bg-gradient-to-br ${accent.wash} px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8`}>
        <div className={`pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl ${accent.glow}`} />
        <div className="relative mx-auto max-w-7xl">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#54515f] transition hover:text-[#2a2930]"><ArrowLeft size={16} /> {copy.back}</Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
              <div className="flex flex-wrap items-center gap-3"><span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[.16em] ${accent.border}`} style={{ backgroundColor: accent.soft, color: accent.ink }}>{copy[product.type]}</span><span className="text-xs font-bold uppercase tracking-[.16em] text-[#77737f]">{localise(product.category, language)}</span></div>
              <h1 className="mt-7 max-w-4xl font-urbanist text-5xl font-bold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[76px]">{product.name}</h1>
              <p className="mt-7 max-w-3xl text-2xl font-semibold leading-snug tracking-[-.02em] sm:text-3xl">{localise(product.promise, language)}</p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f5b67] sm:text-lg">{localise(product.description, language)}</p>
              <div className="mt-9 flex flex-wrap gap-3"><a href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-[#2a2930] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">{copy.consult} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></a>{product.source && <a href={product.source.url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border bg-white/80 px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 ${accent.border}`} style={{ color: accent.ink }}>{localise(product.source.label, language)} <ExternalLink size={15} /></a>}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay: .1 }} className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rotate-2 rounded-[36px] opacity-45" style={{ backgroundColor: accent.soft }} />
              <div className="relative overflow-hidden rounded-[30px] border border-[#2a2930]/10 bg-[#24232a] p-5 shadow-[0_28px_80px_rgba(42,41,48,.18)] sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5757]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffc857]" /><span className="h-2.5 w-2.5 rounded-full bg-[#00c7a5]" /></div><span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/45">Gracer AI / {String(Object.keys(productDetails).indexOf(currentSlug) + 1).padStart(2, '0')}</span></div>
                <div className="relative flex min-h-64 items-center justify-center py-5 sm:min-h-72"><div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ backgroundColor: `${accent.solid}55` }} /><img src={productVisualPath(currentSlug)} alt={`${product.name} icon`} className={`relative h-56 w-56 object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,.28)] sm:h-64 sm:w-64 ${currentSlug === 'bull-docs' ? 'brightness-0 invert' : ''}`} /></div>
                <div className="grid gap-2 sm:grid-cols-3">{product.highlights.map(item => <div key={localise(item.value, language)} className="rounded-2xl border border-white/10 bg-white/[.06] p-4"><p className="text-sm font-bold text-white">{localise(item.value, language)}</p><p className="mt-1 text-xs leading-5 text-white/50">{localise(item.label, language)}</p></div>)}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {screenshot && (
        <section className="px-4 pb-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-[.68fr_1.32fr] lg:items-end">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[.18em]" style={{ color: accent.ink }}><span className="h-px w-10" style={{ backgroundColor: accent.solid }} /> {copy.preview}</p>
              <h2 className="max-w-4xl font-urbanist text-4xl font-bold leading-[1.08] tracking-[-.045em] sm:text-5xl">{product.type === 'course' ? copy.coursePreviewTitle : copy.previewTitle}</h2>
            </div>
            <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55 }} className={`mt-10 overflow-hidden rounded-[28px] bg-[#24232a] p-2 shadow-[0_28px_75px_rgba(42,41,48,.16)] sm:p-3 ${currentSlug === '10x-sme' ? 'mx-auto max-w-xl' : ''}`}>
              <div className="flex h-9 items-center gap-2 px-3"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5757]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffc857]" /><span className="h-2.5 w-2.5 rounded-full bg-[#00c7a5]" /><span className="ml-auto text-[10px] font-bold uppercase tracking-[.18em] text-white/40">{product.name}</span></div>
              <img src={screenshot} alt={`${product.name} product screenshot`} loading="lazy" decoding="async" className="w-full rounded-[20px] bg-white object-cover" />
            </motion.figure>
          </div>
        </section>
      )}

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-6 lg:grid-cols-[.68fr_1.32fr] lg:items-end"><p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[.18em]" style={{ color: accent.ink }}><span className="h-px w-10" style={{ backgroundColor: accent.solid }} /> {copy.capabilities}</p><h2 className="max-w-4xl font-urbanist text-4xl font-bold leading-[1.08] tracking-[-.045em] sm:text-5xl">{copy.capabilitiesTitle}</h2></div><div className="mt-12 grid gap-4 md:grid-cols-2">{product.features.map((feature, index) => <motion.article key={localise(feature.title, language)} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: index * .05 }} className="rounded-[26px] border border-[#2a2930]/10 bg-white p-7 shadow-[0_14px_40px_rgba(42,41,48,.05)] sm:p-8"><div className="flex items-start gap-5"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${accent.border}`} style={{ backgroundColor: accent.soft, color: accent.ink }}>{index % 2 === 0 ? <Layers3 size={21} /> : <Target size={21} />}</div><div><p className="text-xs font-bold tracking-[.16em] text-[#9a96a1]">0{index + 1}</p><h3 className="mt-2 font-urbanist text-xl font-bold tracking-[-.025em]">{localise(feature.title, language)}</h3><p className="mt-3 leading-7 text-[#65616d]">{localise(feature.description, language)}</p></div></div></motion.article>)}</div></div></section>

      <section className="border-y border-[#2a2930]/10 bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[.18em]" style={{ color: accent.ink }}>{copy.how}</p><h2 className="mt-4 max-w-3xl font-urbanist text-4xl font-bold tracking-[-.04em] sm:text-5xl">{copy.howTitle}</h2><div className="mt-12 grid gap-8 md:grid-cols-3">{product.steps.map((step, index) => <div key={localise(step.title, language)} className="relative border-t-2 pt-7" style={{ borderColor: index === 0 ? accent.solid : '#dedce2' }}><span className="absolute -top-3 left-0 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: index === 0 ? accent.solid : '#8f8b96' }}>{index + 1}</span><h3 className="font-urbanist text-2xl font-bold">{localise(step.title, language)}</h3><p className="mt-3 leading-7 text-[#65616d]">{localise(step.description, language)}</p></div>)}</div></div></section>

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl overflow-hidden rounded-[30px] border border-[#2a2930]/10 bg-white shadow-[0_18px_55px_rgba(42,41,48,.06)] lg:grid-cols-2"><div className="p-8 sm:p-11 lg:border-r lg:border-[#2a2930]/10"><h2 className="font-urbanist text-3xl font-bold tracking-[-.035em]">{copy.suitable}</h2><ul className="mt-7 space-y-4">{product.audiences.map(item => <li key={localise(item, language)} className="flex gap-3 leading-7 text-[#54515f]"><Check size={19} className="mt-1 shrink-0" style={{ color: accent.solid }} />{localise(item, language)}</li>)}</ul></div><div className="p-8 sm:p-11"><h2 className="font-urbanist text-3xl font-bold tracking-[-.035em]">{copy.receive}</h2><ul className="mt-7 space-y-4">{product.deliverables.map(item => <li key={localise(item, language)} className="flex gap-3 leading-7 text-[#54515f]"><Check size={19} className="mt-1 shrink-0" style={{ color: accent.solid }} />{localise(item, language)}</li>)}</ul></div></div></section>

      {related.length > 0 && <section className="px-4 pb-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[.18em]" style={{ color: accent.ink }}>{copy.related}</p><h2 className="mt-3 font-urbanist text-3xl font-bold tracking-[-.035em] sm:text-4xl">{copy.relatedTitle}</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{related.map(([key, item]) => <Link key={key} to={key === 'llm' ? '/llm' : `/products/${key}`} className="group rounded-2xl border border-[#2a2930]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(42,41,48,.09)]"><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#8f8b96]">{localise(item.category, language)}</p><h3 className="mt-4 font-urbanist text-xl font-bold">{item.name}</h3></div><img src={productVisualPath(key)} alt="" className="h-20 w-20 shrink-0 object-contain transition duration-300 group-hover:scale-105" /></div><p className="mt-5 flex items-center gap-2 text-sm font-bold" style={{ color: accents[item.accent].ink }}>{copy.view}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></p></Link>)}</div></div></section>}

      <section className="px-4 sm:px-6 lg:px-8"><div className="landing-cta mx-auto max-w-7xl overflow-hidden rounded-[30px] px-7 py-12 sm:px-12 sm:py-16"><div className="relative z-10 max-w-3xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-white/70">{copy.ctaEyebrow}</p><h2 className="mt-4 font-urbanist text-4xl font-bold leading-tight tracking-[-.04em] text-white sm:text-5xl">{copy.ctaTitle}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{copy.ctaDesc}</p><a href="/#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#2a2930] transition hover:-translate-y-0.5">{copy.ctaAction} <ArrowRight size={16} /></a></div></div></section>
    </div>
  );
}
