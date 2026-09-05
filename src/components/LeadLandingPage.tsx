import { FormEvent, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  LineChart,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { calculateLeadScore, submitLead } from '../lib/leadCapture';

type FormState = {
  workflow: string;
  frequency: string;
  teamSize: string;
  name: string;
  company: string;
  role: string;
  contact: string;
  preferredChannel: 'line' | 'email' | 'phone';
  consent: boolean;
};

const initialForm: FormState = {
  workflow: '', frequency: '', teamSize: '', name: '', company: '', role: '', contact: '',
  preferredChannel: 'line', consent: false,
};

const lineUrl = import.meta.env.VITE_LINE_OA_URL || '#assessment';
const bookingUrl = import.meta.env.VITE_BOOKING_URL || 'mailto:apinan@gracer.co.th?subject=ขอนัดประเมิน AI Workflow';

const outcomes = [
  { value: 'ตอบลูกค้าได้ใน 3 นาที', label: 'แทนการค้นข้อมูลและทำเอกสารที่อาจกินเวลาทั้งวัน', icon: Clock3 },
  { value: 'ตรวจสอบก่อนส่งทุกครั้ง', label: 'พนักงานแก้ไขและอนุมัติผลลัพธ์สุดท้ายได้', icon: FileCheck2 },
  { value: 'ข้อมูลไม่ต้องหลุดออกไป', label: 'เลือกรูปแบบติดตั้งที่เก็บข้อมูลไว้ภายใต้การควบคุมของบริษัท', icon: LockKeyhole },
];

const flow = [
  ['01', 'รับคำขอจากลูกค้า', 'พนักงานวางข้อความหรือรายละเอียดที่ลูกค้าส่งมา ไม่ต้องกรอกข้อมูลใหม่หลายรอบ'],
  ['02', 'ค้นข้อมูลบริษัทให้ครบ', 'ระบบค้นราคา สต็อก ส่วนลด เงื่อนไขจัดส่ง และเอกสารที่เกี่ยวข้องจากแหล่งที่กำหนด'],
  ['03', 'สร้างงานที่พร้อมใช้', 'ได้ใบเสนอราคา คำตอบลูกค้า หรือรายงานฉบับร่าง พร้อมแสดงข้อมูลอ้างอิง'],
  ['04', 'ให้พนักงานตรวจและอนุมัติ', 'คนยังเป็นผู้ตัดสินใจก่อนส่งออก ลูกค้าจึงได้รับคำตอบเร็วโดยไม่ลดการควบคุม'],
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" aria-label="Gracer AI — กลับไปด้านบน">
      <img
        src={inverse ? '/assets/logo-text-white.png' : '/assets/logo-text.png'}
        alt="Gracer AI"
        className="h-8 w-auto sm:h-9"
      />
    </a>
  );
}

function AssessmentForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const score = useMemo(() => calculateLeadScore(form), [form]);

  const update = (key: keyof FormState, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await submitLead({
        ...form,
        source: new URLSearchParams(window.location.search).get('utm_source') || 'website',
        pageUrl: window.location.href,
        submittedAt: new Date().toISOString(),
        score,
        stage: 'new',
      });
      setStatus('success');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-white p-7 text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,.2)] sm:p-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e95172] text-white"><Check size={28} /></div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[.18em] text-[#c83255]">ส่งข้อมูลเรียบร้อย</p>
        <h3 className="text-3xl font-semibold tracking-[-.04em]">มาดูว่างานนี้ลดเวลาได้เท่าไร</h3>
        <p className="mt-4 max-w-xl leading-7 text-zinc-600">เลือกเวลาคุย 30 นาทีเพื่อดูขั้นตอนปัจจุบัน ตัวอย่างข้อมูลที่ใช้ และผลลัพธ์ที่ธุรกิจของคุณควรได้รับ เราจะติดต่อผ่านช่องทางที่คุณเลือกเท่านั้น</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a href={lineUrl} target={lineUrl.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#06c755] px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5"><MessageCircle size={19} />คุยต่อทาง LINE</a>
          <a href={bookingUrl} target={bookingUrl.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-5 py-3.5 font-semibold transition hover:bg-zinc-50"><CalendarCheck size={19} />เลือกเวลานัดหมาย</a>
        </div>
        <button onClick={() => { setForm(initialForm); setStatus('idle'); }} className="mt-5 text-sm font-medium text-zinc-500 underline underline-offset-4">ส่งข้อมูลอีกครั้ง</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,.2)] sm:p-9">
      <div className="mb-7 flex items-start justify-between gap-4">
        <div><p className="text-sm font-semibold text-[#c83255]">ประเมินงานที่อยากลดเวลา</p><h3 className="mt-1 text-2xl font-semibold tracking-tight">ตอบ 3 คำถาม แล้วรับคำแนะนำเบื้องต้น</h3></div>
        <span className="rounded-full bg-[#fff0f3] px-3 py-1 text-xs font-semibold text-[#c83255]">ไม่มีค่าใช้จ่าย</span>
      </div>

      <div className="space-y-6">
        <fieldset><legend className="mb-3 font-medium">1. งานไหนกินเวลาทีมมากที่สุด?</legend><div className="grid gap-2 sm:grid-cols-2">{['ใบเสนอราคา / เอกสารขาย', 'ค้นข้อมูลภายใน', 'รายงานและสรุปผล', 'งานซ้ำอื่น ๆ'].map((item) => <label key={item} className={`cursor-pointer rounded-xl border p-3 text-sm transition ${form.workflow === item ? 'border-[#e95172] bg-[#fff5f7]' : 'border-zinc-200 hover:border-zinc-400'}`}><input className="sr-only" required type="radio" name="workflow" value={item} checked={form.workflow === item} onChange={(e) => update('workflow', e.target.value)} />{item}</label>)}</div></fieldset>
        <fieldset><legend className="mb-3 font-medium">2. งานนี้เกิดบ่อยแค่ไหน?</legend><div className="grid grid-cols-3 gap-2">{[['daily', 'ทุกวัน'], ['weekly', 'ทุกสัปดาห์'], ['monthly', 'ทุกเดือน']].map(([value, label]) => <label key={value} className={`cursor-pointer rounded-xl border p-3 text-center text-sm transition ${form.frequency === value ? 'border-[#e95172] bg-[#fff5f7]' : 'border-zinc-200 hover:border-zinc-400'}`}><input className="sr-only" required type="radio" name="frequency" value={value} checked={form.frequency === value} onChange={(e) => update('frequency', e.target.value)} />{label}</label>)}</div></fieldset>
        <fieldset><legend className="mb-3 font-medium">3. มีคนเกี่ยวข้องกี่คน?</legend><div className="grid grid-cols-3 gap-2">{[['1-3', '1–3 คน'], ['4-9', '4–9 คน'], ['10+', '10+ คน']].map(([value, label]) => <label key={value} className={`cursor-pointer rounded-xl border p-3 text-center text-sm transition ${form.teamSize === value ? 'border-[#e95172] bg-[#fff5f7]' : 'border-zinc-200 hover:border-zinc-400'}`}><input className="sr-only" required type="radio" name="teamSize" value={value} checked={form.teamSize === value} onChange={(e) => update('teamSize', e.target.value)} />{label}</label>)}</div></fieldset>
      </div>

      <div className="my-7 h-px bg-zinc-200" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input required aria-label="ชื่อผู้ติดต่อ" placeholder="ชื่อผู้ติดต่อ" value={form.name} onChange={(e) => update('name', e.target.value)} className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15" />
        <input required aria-label="ชื่อบริษัท" placeholder="ชื่อบริษัท" value={form.company} onChange={(e) => update('company', e.target.value)} className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15" />
        <input aria-label="ตำแหน่ง" placeholder="ตำแหน่ง (ถ้ามี)" value={form.role} onChange={(e) => update('role', e.target.value)} className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15" />
        <input required aria-label="ช่องทางติดต่อ" placeholder={form.preferredChannel === 'email' ? 'อีเมล' : form.preferredChannel === 'line' ? 'LINE ID หรือเบอร์ที่ผูก LINE' : 'เบอร์โทรศัพท์'} value={form.contact} onChange={(e) => update('contact', e.target.value)} className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="ช่องทางที่สะดวกให้ติดต่อกลับ">{([['line', 'LINE', MessageCircle], ['email', 'อีเมล', Mail], ['phone', 'โทรตามเวลานัด', CalendarCheck]] as const).map(([value, label, Icon]) => <button type="button" key={value} onClick={() => update('preferredChannel', value)} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${form.preferredChannel === value ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200'}`}><Icon size={15} />{label}</button>)}</div>
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-zinc-600"><input required type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} className="mt-1 h-4 w-4 accent-[#e95172]" /><span>ยินยอมให้ Gracer AI ติดต่อกลับและส่งข้อมูลที่เกี่ยวข้อง สามารถยกเลิกได้ทุกเมื่อ</span></label>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={status === 'sending'} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e95172] px-5 py-4 font-semibold text-white transition hover:bg-[#d94162] disabled:opacity-60">{status === 'sending' ? 'กำลังส่ง…' : 'รับผลประเมินและนัดคุย'}<ArrowRight size={18} /></button>
      <p className="mt-3 text-center text-xs text-zinc-400">เราไม่ขายข้อมูล และไม่โทรหาโดยไม่ได้รับอนุญาต</p>
    </form>
  );
}

export default function LeadLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <div id="top" className="min-h-screen bg-[#f6f6f2] font-urbanist text-zinc-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f6f6f2]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8"><Logo /><nav className="hidden items-center gap-7 text-sm font-medium md:flex"><a href="#outcome">สิ่งที่คุณจะได้</a><a href="#workflow">ระบบทำงานอย่างไร</a><a href="/demo">ดูตัวอย่างจริง</a><a href="#assessment" className="rounded-full bg-zinc-950 px-5 py-2.5 text-white">ประเมินงานฟรี</a></nav><button className="md:hidden" aria-label="เปิดเมนู" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
        <AnimatePresence>{menuOpen && <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-t border-black/5 bg-[#f6f6f2] p-5 md:hidden"><div className="flex flex-col gap-4 font-medium"><a onClick={() => setMenuOpen(false)} href="#outcome">สิ่งที่คุณจะได้</a><a onClick={() => setMenuOpen(false)} href="#workflow">ระบบทำงานอย่างไร</a><a href="/demo">ดูตัวอย่างจริง</a><a onClick={() => setMenuOpen(false)} href="#assessment">ประเมินงานฟรี</a></div></motion.nav>}</AnimatePresence>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="pointer-events-none absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-[#e95172]/12 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
            <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm"><Sparkles size={15} className="text-[#e95172]" />สำหรับธุรกิจที่ยังเสียเวลากับเอกสารและการค้นข้อมูล</div>
              <h1 className="max-w-4xl text-[clamp(3.25rem,7vw,6.8rem)] font-semibold leading-[.9] tracking-[-.065em]">ตอบลูกค้าให้ทัน<br /><span className="text-[#e95172]">ก่อนโอกาสขายหายไป</span></h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">ให้ระบบค้นราคา สต็อก เงื่อนไข และเอกสารของบริษัท แล้วเตรียมใบเสนอราคาพร้อมตรวจภายใน 3 นาที—แทนงานที่เคยใช้เวลาทั้งวัน</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#assessment" className="flex items-center justify-center gap-2 rounded-xl bg-[#e95172] px-6 py-4 font-semibold text-white transition hover:-translate-y-0.5">ดูว่างานของคุณลดเวลาได้แค่ไหน<ArrowRight size={18} /></a><a href="/demo" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-4 font-semibold transition hover:bg-zinc-50">ดูตัวอย่างสร้างใบเสนอราคา<ChevronRight size={18} /></a></div>
              <p className="mt-5 flex items-center gap-2 text-sm text-zinc-500"><ShieldCheck size={17} />เริ่มจากงานเดียว วัดผลก่อนตัดสินใจลงทุนต่อ</p>
            </motion.div>
            <div className="relative lg:pl-8"><div className="rounded-[2rem] bg-zinc-950 p-4 shadow-[0_32px_100px_rgba(24,24,27,.24)] sm:p-6"><div className="rounded-[1.4rem] bg-[#fdfdfb] p-6 text-zinc-950"><div className="flex items-center justify-between border-b border-zinc-200 pb-4"><span className="text-sm font-semibold">จากคำขอถึงใบเสนอราคา</span><span className="flex items-center gap-1.5 text-xs text-[#c83255]"><span className="h-2 w-2 rounded-full bg-[#e95172]" />ข้อมูลอยู่ภายใต้การควบคุม</span></div><p className="mt-5 text-sm text-zinc-500">คำขอลูกค้า</p><p className="mt-2 rounded-xl bg-zinc-100 p-4 font-medium">ขอราคา Pump XP-200 จำนวน 50 ตัว ส่งระยองภายในวันนี้</p><div className="mt-5 space-y-3">{['ค้นราคาและสต็อก', 'ตรวจส่วนลดและเงื่อนไข', 'สร้างใบเสนอราคาพร้อมส่ง'].map((item, index) => <motion.div key={item} initial={reduceMotion ? undefined : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .5 + index * .16 }} className="flex items-center gap-3 text-sm"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0f3] text-[#c83255]"><Check size={15} /></span>{item}</motion.div>)}</div><div className="mt-6 rounded-xl border border-[#e95172]/25 bg-[#fff7f8] p-4"><div className="flex items-center justify-between"><span className="font-semibold">ใบเสนอราคาพร้อมตรวจ</span><CheckCircle2 className="text-[#e95172]" /></div><p className="mt-2 text-sm text-zinc-500">ใช้เวลา 3 นาที • อ้างอิงข้อมูล 6 แหล่ง</p></div></div></div></div>
          </div>
        </section>

        <section id="outcome" className="bg-white px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#c83255]">สิ่งที่ธุรกิจของคุณจะได้</p><div className="mt-4 grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><h2 className="text-4xl font-semibold tracking-[-.045em] sm:text-6xl">ทำงานเร็วขึ้น<br />โดยไม่เสียการควบคุม</h2><p className="max-w-2xl text-lg leading-8 text-zinc-600">พนักงานไม่ต้องไล่เปิดหลายไฟล์หรือจำเงื่อนไขทั้งหมดเอง ระบบช่วยรวบรวมข้อมูลและเตรียมงานให้พร้อม ส่วนคนยังเป็นผู้ตรวจ อนุมัติ และรับผิดชอบคำตอบสุดท้าย</p></div><div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-zinc-200 md:grid-cols-3">{outcomes.map(({ value, label, icon: Icon }) => <div key={value} className="bg-[#fafaf7] p-7 sm:p-9"><Icon className="mb-8 text-[#e95172]" /><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-zinc-500">{label}</p></div>)}</div></div></section>

        <section id="workflow" className="px-5 py-24 lg:px-8"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.75fr_1.25fr]"><div className="lg:sticky lg:top-28 lg:self-start"><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#c83255]">ระบบทำงานอย่างไร</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">จากข้อความลูกค้า<br />ถึงงานพร้อมส่ง</h2><p className="mt-5 leading-7 text-zinc-600">ตัวอย่างนี้ใช้การทำใบเสนอราคา แต่แนวทางเดียวกันใช้กับงานค้นข้อมูล รายงาน เอกสารจัดซื้อ และงานประจำที่มีกฎชัดเจนได้</p></div><div className="divide-y divide-zinc-200 border-y border-zinc-200">{flow.map(([number, title, detail]) => <div key={number} className="grid gap-3 py-7 sm:grid-cols-[4rem_14rem_1fr]"><span className="font-mono text-sm text-[#c83255]">{number}</span><h3 className="font-semibold">{title}</h3><p className="leading-7 text-zinc-600">{detail}</p></div>)}</div></div></section>

        <section className="bg-zinc-950 px-5 py-20 text-white lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#ff829c]">เริ่มแบบจำกัดความเสี่ยง</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-6xl">พิสูจน์กับงานจริง<br /><span className="text-[#ff829c]">49,000 บาท</span></h2><p className="mt-5 max-w-lg leading-7 text-zinc-400">ก่อนลงทุนระบบขนาดใหญ่ เลือกหนึ่งงานสำคัญมาทดลองและวัดผลกับข้อมูลของบริษัทคุณ</p></div><div className="grid content-end gap-4 text-zinc-300">{['เลือก 1 งานที่เกิดซ้ำและมีผลต่อธุรกิจ', 'ได้ต้นแบบตั้งแต่รับข้อมูลจนพร้อมให้พนักงานอนุมัติ', 'เห็นตัวเลขก่อน–หลัง พร้อมแผนและราคาสำหรับใช้งานจริง'].map((item) => <p key={item} className="flex gap-3"><Check className="shrink-0 text-[#ff829c]" />{item}</p>)}</div></div></div></section>

        <section id="assessment" className="bg-[#e95172] px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[.8fr_1.2fr]"><div className="pt-3 text-white"><p className="text-sm font-semibold uppercase tracking-[.2em] text-white/75">ลองประเมินก่อนตัดสินใจ</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-6xl">งานของคุณลดจากหนึ่งวันเหลือไม่กี่นาทีได้ไหม?</h2><p className="mt-6 max-w-xl text-lg leading-8 text-white/85">ตอบเพียง 3 คำถาม เราจะช่วยดูว่างานนี้เหมาะกับ AI หรือไม่ มีโอกาสลดเวลาแค่ไหน และควรระวังข้อมูลส่วนใด โดยยังไม่ต้องซื้อระบบ</p><div className="mt-9 space-y-3 text-sm text-white/80"><p className="flex items-center gap-3"><Workflow size={18} />ระบุงานที่ควรเริ่มก่อน</p><p className="flex items-center gap-3"><LineChart size={18} />ประเมินเวลาและต้นทุนที่อาจลดได้</p><p className="flex items-center gap-3"><ShieldCheck size={18} />แนะนำวิธีป้องกันข้อมูลสำคัญไม่ให้หลุด</p></div></div><AssessmentForm /></div></section>
      </main>

      <footer className="bg-zinc-950 px-5 py-10 text-zinc-400 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"><Logo inverse /><p className="text-sm">© {new Date().getFullYear()} Gracer Corp Co., Ltd. All rights reserved.</p><div className="flex gap-5 text-sm"><a href="/privacy-policy">Privacy</a><a href="/terms-and-conditions">Terms</a></div></div></footer>
    </div>
  );
}
