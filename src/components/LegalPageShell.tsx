import { ReactNode } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

interface LegalPageShellProps {
  title: string;
  children: ReactNode;
  updatedAt?: string;
}

export default function LegalPageShell({ title, children, updatedAt }: LegalPageShellProps) {
  return (
    <section className="legal-page relative overflow-hidden bg-[#f6f5f8] px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36 lg:px-8">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#8c52ff]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-[34rem] h-64 w-64 rounded-full bg-[#ff5757]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <a href="/" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#686570] transition-colors hover:text-[#8c52ff]">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> กลับสู่หน้าหลัก
        </a>

        <header className="mt-12 grid gap-7 lg:grid-cols-[0.7fr_1.5fr] lg:items-end">
          <p className="flex items-center gap-3 self-start text-sm font-bold uppercase tracking-[0.18em] text-[#8c52ff]">
            <span className="h-px w-10 bg-[#8c52ff]" /> Legal · Gracer AI
          </p>
          <h1 className="max-w-3xl font-urbanist text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#2a2930] sm:text-6xl">{title}</h1>
        </header>

        <article className="legal-content mt-12 overflow-hidden rounded-[28px] border border-[#2a2930]/10 bg-white p-6 shadow-[0_22px_60px_rgba(42,41,48,0.07)] sm:p-10 lg:p-14">
          <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8c52ff]/30 bg-[#f0e9ff] text-[#8c52ff]">
            <FileText size={22} strokeWidth={1.8} />
          </div>
          {children}
          {updatedAt && <p className="mt-10 border-t border-[#2a2930]/10 pt-6 text-sm text-[#77737f]">อัปเดตล่าสุด: {updatedAt}</p>}
        </article>
      </div>
    </section>
  );
}
