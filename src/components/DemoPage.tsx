import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  FileCheck2,
  FileText,
  LockKeyhole,
  PackageCheck,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  X,
  Zap,
} from 'lucide-react';
import {
  demoRequest,
  extractedRequest,
  initialCustomerReply,
  quotation,
  sources,
  workflowSteps,
} from '../data/demoData';

type DemoStatus = 'idle' | 'processing' | 'reveal' | 'review' | 'approved';

const storyStages = [
  { title: 'เข้าใจคำขอ', icon: Sparkles },
  { title: 'ค้นข้อมูล', icon: Search },
  { title: 'ใช้กฎธุรกิจ', icon: Tag },
  { title: 'พร้อมตรวจ', icon: FileCheck2 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const wait = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  return (
    <div className={`${sizeClass} flex shrink-0 items-center justify-center rounded-2xl bg-zinc-950 shadow-[0_10px_30px_rgba(24,24,27,0.12)]`}>
      <img src="/assets/logo.png" alt="" className="h-[72%] w-[72%] object-contain" />
    </div>
  );
}

function UnderstandingScene() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">AI เข้าใจว่าลูกค้าต้องการอะไร</h2>
        <p className="mt-2 text-sm text-zinc-500">เปลี่ยนข้อความธรรมดาให้เป็นข้อมูลที่นำไปทำงานต่อได้</p>
      </div>
      <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(24,24,27,0.08)] sm:p-7">
        <div className="mb-6 rounded-2xl bg-zinc-950 px-5 py-4 text-base leading-relaxed text-white">
          “{demoRequest}”
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {extractedRequest.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`rounded-2xl bg-[#f4f4f1] px-4 py-3 ${item.label === 'สินค้า' ? 'sm:col-span-2' : ''}`}
            >
              <p className="text-xs text-zinc-500">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KnowledgeScene({ completedSteps }: { completedSteps: number }) {
  const visibleSources = sources.slice(0, completedSteps >= 5 ? sources.length : Math.max(2, completedSteps - 1));
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">ค้นจากความรู้ภายในบริษัท</h2>
        <p className="mt-2 text-sm text-zinc-500">AI เลือกเฉพาะข้อมูลที่เกี่ยวข้อง พร้อมบอกที่มาทุกครั้ง</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {visibleSources.map((source, index) => (
          <motion.a
            key={source.name}
            href={source.path}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="group flex min-h-32 flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_10px_35px_rgba(24,24,27,0.05)] transition hover:-translate-y-0.5 hover:border-[#e95172]/40 hover:shadow-[0_16px_40px_rgba(24,24,27,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <FileText size={20} className="text-[#e95172]" strokeWidth={1.7} />
              <ChevronRight size={16} className="text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-[#e95172]" />
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold text-zinc-900">{source.name}</p>
              <p className="mt-1 text-xs text-zinc-500">{source.reference}</p>
              <p className="mt-2 text-xs text-[#b23c58]">ใช้สำหรับ: {source.usedFor}</p>
            </div>
          </motion.a>
        ))}
        {visibleSources.length < sources.length && (
          <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/50 text-sm text-zinc-400">
            กำลังค้นเอกสารที่เกี่ยวข้อง
          </div>
        )}
      </div>
    </div>
  );
}

function RulesScene() {
  const ruleCards = [
    { icon: PackageCheck, label: 'สินค้า', value: 'XP-200', detail: 'ตรงกับรหัส EIS-PMP-XP200' },
    { icon: Tag, label: 'ราคาต่อหน่วย', value: '18,500 บาท', detail: 'Price List September 2026' },
    { icon: ShieldCheck, label: 'ส่วนลด', value: '7%', detail: 'ยอดก่อน VAT มากกว่า 900,000 บาท' },
    { icon: Truck, label: 'การจัดส่ง', value: 'ฟรี', detail: 'ระยอง ภายใน 3 วันทำการ' },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">นำข้อมูลมาใช้ตามกฎธุรกิจ</h2>
        <p className="mt-2 text-sm text-zinc-500">ไม่ได้เพียงค้นเอกสาร แต่ตรวจเงื่อนไขและคำนวณผลลัพธ์ให้ด้วย</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {ruleCards.map((rule, index) => (
          <motion.div
            key={rule.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_35px_rgba(24,24,27,0.05)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f3] text-[#d74768]">
                <rule.icon size={19} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs text-zinc-500">{rule.label}</p>
                <p className="mt-0.5 text-lg font-semibold text-zinc-950">{rule.value}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">{rule.detail}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-zinc-950 p-5 text-white shadow-[0_18px_45px_rgba(24,24,27,0.16)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-zinc-400">ยอดสุทธิรวม VAT</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{formatCurrency(quotation.total)} บาท</p>
          </div>
          <p className="text-xs text-zinc-400">มีสินค้าพร้อมส่ง 68 ตัว</p>
        </div>
      </div>
    </div>
  );
}

function QuotationScene({
  status,
  customerReply,
  onReplyChange,
  onApprove,
  reduceMotion,
}: {
  status: DemoStatus;
  customerReply: string;
  onReplyChange: (value: string) => void;
  onApprove: () => void;
  reduceMotion: boolean | null;
}) {
  const outcomeRef = useRef<HTMLElement>(null);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [workflowPain, setWorkflowPain] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contact, setContact] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  useEffect(() => {
    if (status !== 'approved') return;
    const timer = window.setTimeout(() => {
      outcomeRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 420);
    return () => window.clearTimeout(timer);
  }, [status, reduceMotion]);

  useEffect(() => {
    if (!assessmentOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAssessmentOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [assessmentOpen]);

  const submitAssessment = () => {
    const emailBody = `ชื่อผู้ติดต่อ: ${contactName}
บริษัท: ${company}
ช่องทางติดต่อ: ${contact}
เวลาที่สะดวก: ${preferredTime}

Workflow ที่ต้องการลดเวลา:
${workflowPain}

เวลาที่ใช้ในปัจจุบัน: ${timeSpent}`;

    window.location.href = `mailto:apinan@gracer.co.th?subject=${encodeURIComponent(`ขอนัดประเมิน AI Workflow - ${company}`)}&body=${encodeURIComponent(emailBody)}`;
  };

  if (status === 'reveal') {
    return (
      <div className="relative mx-auto flex min-h-[610px] max-w-5xl items-center justify-center overflow-hidden px-2 py-10 [perspective:1200px]">
        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.55 }}
          animate={reduceMotion ? { opacity: 0.35, scale: 1.12 } : { opacity: [0, 0.75, 0.35], scale: [0.55, 1, 1.12] }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(233,81,114,0.22)_0%,rgba(233,81,114,0.08)_42%,transparent_70%)]"
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.92 }}
          animate={{ opacity: 1, y: -238, scale: 1 }}
          transition={{ delay: 0.48, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute z-20 flex items-center gap-3 rounded-2xl bg-zinc-950 px-5 py-3 text-white shadow-[0_18px_45px_rgba(24,24,27,0.18)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e95172]">
            <Check size={18} strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-sm font-semibold">สำเร็จแล้ว</p>
            <p className="text-xs text-zinc-400">ใบเสนอราคาพร้อมตรวจสอบ</p>
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 170, scale: 0.78 }}
          animate={{ opacity: 0.18, y: 34, scale: 0.96 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[430px] w-[min(92%,520px)] rounded-[28px] bg-zinc-950 blur-xl"
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 210, scale: 0.78, rotateX: -16 }}
          animate={{ opacity: 1, y: 18, scale: 1, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 88, damping: 16, mass: 0.9 }}
          className="relative z-10 w-full max-w-[520px] will-change-transform"
        >
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_32px_90px_rgba(63,49,53,0.20)] sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-5">
              <div>
                <p className="text-xl font-semibold text-zinc-950">ใบเสนอราคา</p>
                <p className="mt-1 text-xs text-zinc-500">Eastern Industrial Supply Co., Ltd.</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs font-medium text-[#c93f60]">{quotation.number}</p>
                <p className="mt-1 text-xs text-zinc-500">ฉบับร่าง</p>
              </div>
            </div>
            <div className="py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{quotation.product}</p>
                  <p className="mt-1 font-mono text-xs text-zinc-400">{quotation.sku}</p>
                </div>
                <p className="shrink-0 text-sm text-zinc-600">{quotation.quantity} ตัว</p>
              </div>
            </div>
            <div className="flex items-end justify-between border-t border-zinc-200 pt-5">
              <div>
                <p className="text-xs text-zinc-400">ส่วนลดโครงการ {quotation.discountRate}%</p>
                <p className="mt-1 text-xs text-zinc-500">รวม VAT และจัดส่ง</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400">ยอดสุทธิ</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-950">{formatCurrency(quotation.total)}</p>
                <p className="text-xs font-medium text-[#c93f60]">บาท</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">พร้อมให้พนักงานตรวจสอบ</h2>
          <p className="mt-2 text-sm text-zinc-500">AI เตรียมผลงานให้แล้ว คนยังเป็นผู้ตัดสินใจก่อนส่งจริง</p>
        </div>
        {status === 'approved' && (
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={18} strokeWidth={1.8} />
            อนุมัติแล้ว
          </span>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_18px_55px_rgba(24,24,27,0.08)] sm:p-6">
          <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-zinc-950">ใบเสนอราคา</p>
              <p className="mt-1 text-xs text-zinc-500">Eastern Industrial Supply Co., Ltd.</p>
            </div>
            <div className="sm:text-right">
              <p className="font-mono text-xs font-medium text-[#c93f60]">{quotation.number}</p>
              <p className="mt-1 text-xs text-zinc-500">{quotation.customer}</p>
            </div>
          </div>
          <div className="py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">{quotation.product}</p>
                <p className="mt-1 font-mono text-xs text-zinc-400">{quotation.sku}</p>
              </div>
              <p className="shrink-0 text-sm text-zinc-600">{quotation.quantity} ตัว</p>
            </div>
            <p className="mt-3 text-right text-sm tabular-nums text-zinc-500">{formatCurrency(quotation.unitPrice)} บาท / ตัว</p>
          </div>
          <dl className="space-y-2 border-t border-zinc-200 pt-4 text-sm">
            <div className="flex justify-between text-zinc-500"><dt>ราคารวม</dt><dd>{formatCurrency(quotation.subtotal)}</dd></div>
            <div className="flex justify-between text-zinc-500"><dt>ส่วนลด {quotation.discountRate}%</dt><dd>-{formatCurrency(quotation.discount)}</dd></div>
            <div className="flex justify-between text-zinc-500"><dt>ค่าจัดส่ง</dt><dd>ไม่มีค่าใช้จ่าย</dd></div>
            <div className="flex justify-between text-zinc-500"><dt>VAT 7%</dt><dd>{formatCurrency(quotation.vat)}</dd></div>
            <div className="flex items-end justify-between pt-3 text-zinc-950">
              <dt className="font-semibold">ยอดสุทธิ</dt>
              <dd className="text-xl font-semibold tabular-nums">{formatCurrency(quotation.total)} บาท</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-zinc-100 pt-3 text-xs text-zinc-400">
            <span>{quotation.leadTime}</span>
            <span>{quotation.validity}</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_18px_55px_rgba(24,24,27,0.06)] sm:p-6">
          <label htmlFor="customer-reply" className="text-sm font-semibold text-zinc-900">ข้อความตอบลูกค้า</label>
          <p className="mt-1 text-xs text-zinc-500">แก้ไขได้ก่อนอนุมัติ</p>
          <textarea
            id="customer-reply"
            value={customerReply}
            onChange={(event) => onReplyChange(event.target.value)}
            disabled={status === 'approved'}
            className="mt-4 min-h-56 flex-1 resize-none rounded-xl border border-zinc-200 bg-[#fafaf8] px-4 py-3 text-sm leading-relaxed text-zinc-700 outline-none transition focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15 disabled:opacity-70"
          />
          {status === 'approved' ? (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
              <CheckCircle2 size={18} className="shrink-0" strokeWidth={1.8} />
              เอกสารพร้อมส่งให้ลูกค้า
            </div>
          ) : (
            <button
              type="button"
              onClick={onApprove}
              className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
            >
              อนุมัติเอกสาร
              <ChevronRight size={17} strokeWidth={1.8} />
            </button>
          )}
        </div>
      </div>

      {status === 'approved' && (
        <motion.section
          ref={outcomeRef}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 overflow-hidden rounded-2xl bg-zinc-950 text-white shadow-[0_22px_60px_rgba(24,24,27,0.16)]"
          aria-labelledby="business-outcome-title"
        >
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="border-b border-white/10 p-6 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 text-sm font-medium text-[#ff8da6]">
                <Zap size={17} strokeWidth={1.9} />
                ผลลัพธ์ทางธุรกิจ
              </div>
              <h3 id="business-outcome-title" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                จากงานเอกสาร 1 วัน<br />เหลือตรวจสอบเพียง 3 นาที
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                AI เตรียมข้อมูล กฎธุรกิจ และเอกสารให้ครบ พนักงานยังเป็นผู้ตรวจสอบและอนุมัติก่อนส่งจริง
              </p>
              <p className="mt-5 text-xs text-zinc-500">ผลลัพธ์ตัวอย่างสำหรับ workflow ในการสาธิต</p>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-7">
              <dl className="grid grid-cols-3 gap-4">
                <div>
                  <dt className="text-xs text-zinc-500">ก่อนใช้ AI</dt>
                  <dd className="mt-2 text-2xl font-semibold tabular-nums sm:text-3xl">1</dd>
                  <p className="text-xs text-zinc-400">วันทำงาน</p>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500">หลังใช้ AI</dt>
                  <dd className="mt-2 text-2xl font-semibold tabular-nums text-[#ff8da6] sm:text-3xl">3</dd>
                  <p className="text-xs text-zinc-400">นาที</p>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500">เวลาที่ลดลง</dt>
                  <dd className="mt-2 text-2xl font-semibold tabular-nums sm:text-3xl">99%+</dd>
                  <p className="text-xs text-zinc-400">โดยประมาณ</p>
                </div>
              </dl>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-sm font-medium text-white">บริษัทของคุณมีงานที่ต้องทำซ้ำทุกวันหรือไม่?</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">ลองเลือกหนึ่ง workflow มาประเมินเวลาและโอกาสลดต้นทุนร่วมกัน</p>
                <button
                  type="button"
                  onClick={() => setAssessmentOpen(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e95172] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d74768] active:scale-[0.98]"
                >
                  ประเมิน Workflow ของบริษัทคุณ
                  <ArrowRight size={17} strokeWidth={1.9} />
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      <AnimatePresence>
        {assessmentOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setAssessmentOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="assessment-title"
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-[0_32px_100px_rgba(24,24,27,0.32)]"
            >
              <div className="flex items-start justify-between gap-5 border-b border-zinc-100 px-5 py-5 sm:px-7">
                <div>
                  <p className="text-xs font-semibold text-[#c93f60]">ใช้เวลาประมาณ 1 นาที</p>
                  <h2 id="assessment-title" className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">หา Workflow ที่คุ้มค่าจะเริ่มก่อน</h2>
                  <p className="mt-2 text-sm text-zinc-500">ตอบ 3 ข้อ แล้วนัดคุยกับเรา 30 นาทีโดยไม่มีค่าใช้จ่าย</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAssessmentOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-950"
                  aria-label="ปิดแบบประเมิน"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              <form
                className="space-y-6 p-5 sm:p-7"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitAssessment();
                }}
              >
                <div>
                  <label htmlFor="workflow-pain" className="text-sm font-semibold text-zinc-900">1. งานอะไรที่อยากลดเวลา?</label>
                  <p className="mt-1 text-xs text-zinc-500">เช่น ทำใบเสนอราคา สรุปรายงาน หรือตรวจเอกสาร</p>
                  <textarea
                    id="workflow-pain"
                    required
                    value={workflowPain}
                    onChange={(event) => setWorkflowPain(event.target.value)}
                    placeholder="เล่างานที่ทีมต้องทำซ้ำแบบสั้น ๆ"
                    className="mt-3 min-h-24 w-full resize-none rounded-xl border border-zinc-200 bg-[#fafaf8] px-4 py-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15"
                  />
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-zinc-900">2. งานนี้ใช้เวลาประมาณเท่าไร?</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {['ไม่เกิน 1 ชั่วโมง', '1-3 ชั่วโมง', 'ครึ่งวัน', '1 วันขึ้นไป'].map((option) => (
                      <label
                        key={option}
                        className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-xs font-medium transition ${timeSpent === option ? 'border-[#e95172] bg-[#fff0f3] text-[#b23c58]' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                      >
                        <input
                          type="radio"
                          name="time-spent"
                          value={option}
                          checked={timeSpent === option}
                          onChange={(event) => setTimeSpent(event.target.value)}
                          required
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <p className="text-sm font-semibold text-zinc-900">3. ให้เราติดต่อกลับทางไหน?</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input required value={company} onChange={(event) => setCompany(event.target.value)} placeholder="ชื่อบริษัท" aria-label="ชื่อบริษัท" className="rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15" />
                    <input required value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="ชื่อผู้ติดต่อ" aria-label="ชื่อผู้ติดต่อ" className="rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15" />
                    <input required value={contact} onChange={(event) => setContact(event.target.value)} placeholder="เบอร์โทร อีเมล หรือ LINE ID" aria-label="ช่องทางติดต่อ" className="rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15" />
                    <select required value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} aria-label="เวลาที่สะดวกให้ติดต่อ" className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-[#e95172] focus:ring-2 focus:ring-[#e95172]/15">
                      <option value="">ช่วงเวลาที่สะดวก</option>
                      <option value="วันธรรมดา 09:00-12:00">วันธรรมดา 09:00-12:00</option>
                      <option value="วันธรรมดา 13:00-17:00">วันธรรมดา 13:00-17:00</option>
                      <option value="ติดต่อเพื่อนัดเวลาอีกครั้ง">ติดต่อเพื่อนัดเวลาอีกครั้ง</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-5">
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d74768] active:scale-[0.98]">
                    ขอนัดคุย 30 นาที
                    <ArrowRight size={17} strokeWidth={1.9} />
                  </button>
                  <p className="mt-3 text-center text-xs text-zinc-400">ระบบจะเปิดอีเมลพร้อมรายละเอียดที่กรอกไว้ เพียงตรวจสอบแล้วกดส่ง</p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DemoPage() {
  const [request, setRequest] = useState(demoRequest);
  const [submittedRequest, setSubmittedRequest] = useState('');
  const [status, setStatus] = useState<DemoStatus>('idle');
  const [completedSteps, setCompletedSteps] = useState(0);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [customerReply, setCustomerReply] = useState(initialCustomerReply);
  const runId = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => {
    runId.current += 1;
  }, []);

  const runWorkflow = async () => {
    if (!request.trim()) return;
    const currentRun = runId.current + 1;
    runId.current = currentRun;
    setSubmittedRequest(request.trim());
    setStatus('processing');
    setCompletedSteps(0);
    setSelectedStage(null);

    for (let index = 0; index < workflowSteps.length; index += 1) {
      await wait(index === 0 ? 500 : 720);
      if (runId.current !== currentRun) return;
      setCompletedSteps(index + 1);
    }

    if (runId.current !== currentRun) return;
    setStatus('reveal');
    await wait(reduceMotion ? 350 : 2400);
    if (runId.current === currentRun) setStatus('review');
  };

  const resetDemo = () => {
    runId.current += 1;
    setRequest(demoRequest);
    setSubmittedRequest('');
    setCustomerReply(initialCustomerReply);
    setCompletedSteps(0);
    setSelectedStage(null);
    setStatus('idle');
  };

  const currentStage = completedSteps < 2 ? 0 : completedSteps < 5 ? 1 : completedSteps < 7 ? 2 : 3;
  const visibleStage = selectedStage ?? currentStage;
  const canReviewStages = status === 'review' || status === 'approved';
  const activeStep = workflowSteps[Math.min(completedSteps, workflowSteps.length - 1)];

  return (
    <div className="min-h-[100dvh] bg-[#f5f5f2] font-urbanist text-zinc-950 selection:bg-[#e95172]/20">
      <header className="border-b border-zinc-200/90 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <a
              href="/"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 active:scale-[0.98]"
              aria-label="กลับสู่เว็บไซต์หลัก"
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
            </a>
            <img src="/assets/logo-text.png" alt="Gracer AI" className="h-7 w-auto" />
            <div className="hidden h-6 w-px bg-zinc-200 sm:block" />
            <p className="hidden truncate text-sm font-medium text-zinc-500 sm:block">AI Operations</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 text-xs text-zinc-500 md:flex">
              <LockKeyhole size={14} className="text-[#d74768]" strokeWidth={1.8} />
              Private Demo
            </span>
            {status !== 'idle' && (
              <button
                type="button"
                onClick={resetDemo}
                className="flex h-9 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.98]"
              >
                <RotateCcw size={15} strokeWidth={1.8} />
                <span className="hidden sm:inline">เริ่มใหม่</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {status === 'idle' ? (
          <motion.main
            key="chat-start"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            className="mx-auto flex min-h-[calc(100dvh-65px)] max-w-3xl flex-col justify-center px-4 py-10 sm:px-6"
          >
            <div className="mb-8 text-center">
              <div className="flex justify-center"><BrandMark size="lg" /></div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">วันนี้อยากให้ AI ช่วยงานอะไร?</h1>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-zinc-500">
                ส่งคำขอจากลูกค้ามาได้เลย ผมจะค้นข้อมูล ตรวจเงื่อนไข และเตรียมงานให้คุณตรวจสอบ
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-[0_24px_70px_rgba(24,24,27,0.1)]">
              <label htmlFor="demo-request" className="sr-only">ข้อความถึง Gracer AI</label>
              <textarea
                id="demo-request"
                value={request}
                onChange={(event) => setRequest(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void runWorkflow();
                  }
                }}
                placeholder="พิมพ์คำขอจากลูกค้า..."
                className="min-h-28 w-full resize-none bg-transparent px-3 py-3 text-base leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-400"
              />
              <div className="flex items-center justify-between gap-3 border-t border-zinc-100 px-2 pt-3">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck size={15} className="text-[#d74768]" strokeWidth={1.8} />
                  ข้อมูลอยู่ภายใต้การควบคุมขององค์กร
                </div>
                <button
                  type="button"
                  onClick={() => void runWorkflow()}
                  disabled={!request.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white transition hover:bg-[#d74768] active:scale-[0.96] disabled:cursor-not-allowed disabled:bg-zinc-200"
                  aria-label="ส่งข้อความ"
                >
                  <ArrowUp size={19} strokeWidth={2} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setRequest(demoRequest)}
              className="mx-auto mt-5 text-sm text-zinc-400 transition hover:text-[#c93f60]"
            >
              ใช้ตัวอย่างคำขอใบเสนอราคา
            </button>
          </motion.main>
        ) : (
          <motion.main
            key="story"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto grid min-h-[calc(100dvh-65px)] max-w-[1600px] lg:grid-cols-[380px_minmax(0,1fr)]"
          >
            <aside className="flex flex-col border-b border-zinc-200 bg-white lg:border-b-0 lg:border-r">
              <div className="border-b border-zinc-100 px-5 py-4">
                <p className="text-sm font-semibold text-zinc-900">บทสนทนา</p>
                <p className="mt-1 text-xs text-zinc-400">Eastern Industrial Supply Co., Ltd.</p>
              </div>
              <div className="flex-1 space-y-5 p-5">
                <div className="flex justify-end">
                  <div className="max-w-[88%] rounded-2xl rounded-br-md bg-zinc-950 px-4 py-3 text-sm leading-relaxed text-white">
                    {submittedRequest}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BrandMark size="sm" />
                  <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-[#f1f1ee] px-4 py-3 text-sm leading-relaxed text-zinc-700">
                    {status === 'processing' ? (
                      <>
                        <p>รับเรื่องแล้วครับ กำลังเตรียมใบเสนอราคาให้</p>
                        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-[#c93f60]">
                          <Sparkles size={14} className="animate-pulse" strokeWidth={1.8} />
                          {activeStep.title}
                        </p>
                      </>
                    ) : status === 'approved' ? (
                      <p>เรียบร้อยครับ เอกสารได้รับการอนุมัติและพร้อมส่งให้ลูกค้าแล้ว</p>
                    ) : (
                      <p>{status === 'reveal' ? 'สำเร็จแล้วครับ กำลังเปิดใบเสนอราคาให้คุณตรวจสอบ' : 'เสร็จแล้วครับ ผมตรวจข้อมูลจาก 5 แหล่ง และเตรียมใบเสนอราคาให้คุณตรวจสอบแล้ว'}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-zinc-100 p-4">
                <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-[#fafaf8] px-4 py-3 text-sm text-zinc-400">
                  <span className="flex-1">สนทนาต่อหลังตรวจเอกสาร</span>
                  <ArrowUp size={16} />
                </div>
              </div>
            </aside>

            <section className="min-w-0 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
              <div className="mx-auto mb-6 max-w-5xl">
                <div className="grid grid-cols-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_8px_30px_rgba(24,24,27,0.04)]">
                  {storyStages.map((stage, index) => {
                    const StageIcon = stage.icon;
                    const isReached = index <= currentStage;
                    const isActive = index === visibleStage;
                    return (
                      <button
                        key={stage.title}
                        type="button"
                        disabled={!canReviewStages || !isReached}
                        onClick={() => setSelectedStage(index)}
                        className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-xs font-medium transition sm:text-sm ${
                          isActive ? 'bg-zinc-950 text-white' : isReached ? 'text-zinc-700 hover:bg-zinc-100' : 'text-zinc-300'
                        } disabled:cursor-default`}
                      >
                        {index < currentStage ? <Check size={15} strokeWidth={2} /> : <StageIcon size={15} strokeWidth={1.8} />}
                        <span className="hidden truncate sm:block">{stage.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex min-h-[610px] items-center justify-center py-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={visibleStage}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    {visibleStage === 0 && <UnderstandingScene />}
                    {visibleStage === 1 && <KnowledgeScene completedSteps={completedSteps} />}
                    {visibleStage === 2 && <RulesScene />}
                    {visibleStage === 3 && (
                      <QuotationScene
                        status={status}
                        customerReply={customerReply}
                        onReplyChange={setCustomerReply}
                        onApprove={() => setStatus('approved')}
                        reduceMotion={reduceMotion}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mx-auto mt-3 flex max-w-5xl flex-col gap-2 border-t border-zinc-200 pt-4 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2"><Circle size={8} fill="#e95172" className="text-[#e95172]" /> Demo mode ทำงานได้โดยไม่พึ่ง API ภายนอก</span>
                <span>ข้อมูลทั้งหมดสร้างขึ้นเพื่อการสาธิต</span>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
