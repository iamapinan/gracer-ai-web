import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  businessType?: string;
}

const ResellerRegistration = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'email' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // ตรวจสอบชื่อบริษัท
    if (formData.companyName.length < 2) {
      newErrors.companyName = t("companyNameError");
    }

    // ตรวจสอบชื่อผู้ติดต่อ
    if (formData.contactName.length < 2) {
      newErrors.contactName = t("contactNameError");
    }

    // ตรวจสอบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t("emailError");
    }

    // ตรวจสอบเบอร์โทรศัพท์
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t("phoneError");
    }

    // ตรวจสอบที่อยู่
    if (formData.address.length < 10) {
      newErrors.address = t("addressError");
    }

    // ตรวจสอบประเภทธุรกิจ
    if (!formData.businessType) {
      newErrors.businessType = t("businessTypeError");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const details = `${t('companyName')}: ${formData.companyName}\n${t('contactName')}: ${formData.contactName}\n${t('email')}: ${formData.email}\n${t('phone')}: ${formData.phone}\n${t('address')}: ${formData.address}\n${t('businessType')}: ${formData.businessType}\n${t('additionalMessage')}: ${formData.message || '-'}`;
    const webhookUrl = import.meta.env.PROD
      ? '/api/contact'
      : import.meta.env.VITE_DISCORD_WEBHOOK_URL?.trim();

    if (!webhookUrl) {
      const subject = encodeURIComponent(`ขอรับคำปรึกษา Gracer AI — ${formData.companyName}`);
      window.location.href = `mailto:apinan@gracer.co.th?subject=${subject}&body=${encodeURIComponent(details)}`;
      setSubmitState('email');
      return;
    }

    setSubmitState('sending');
    try {
      const response = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'Gracer AI Website', embeds: [{ title: 'New service enquiry', description: details, color: 9188095 }] }) });
      if (!response.ok) throw new Error('Discord webhook failed');
      setSubmitState('success');
      setFormData({ companyName: '', contactName: '', email: '', phone: '', address: '', businessType: '', message: '' });
    } catch { setSubmitState('error'); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // ลบข้อความ error เมื่อผู้ใช้เริ่มพิมพ์
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-[#2a2930]/10 bg-[#f6f5f8] py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-28 top-12 h-72 w-72 rounded-full bg-[#ff5757]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.4fr] lg:items-start lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:sticky lg:top-28"
        >
          <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#8c52ff]"><span className="h-px w-10 bg-[#8c52ff]" /> Gracer AI</p>
          <h1 className="mb-5 font-urbanist text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-[#2a2930] sm:text-5xl">{t("contactFormTitle")}</h1>
          <p className="max-w-md text-lg leading-relaxed text-[#54515f]">
            {t("resellerDesc")}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[28px] border border-[#2a2930]/10 bg-white p-6 shadow-[0_22px_60px_rgba(42,41,48,0.08)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[#ff5757] before:to-[#8c52ff] sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-[#54515f]">
                {t("companyName")}
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[#2a2930] ${errors.companyName ? 'border-red-500' : 'border-[#2a2930]/15'} focus:border-[#8c52ff] focus:ring-2 focus:ring-[#8c52ff]/20`}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-[#54515f]">
                {t("contactName")}
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[#2a2930] ${errors.contactName ? 'border-red-500' : 'border-[#2a2930]/15'} focus:border-[#8c52ff] focus:ring-2 focus:ring-[#8c52ff]/20`}
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
              )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-[#54515f]">
                {t("email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[#2a2930] ${errors.email ? 'border-red-500' : 'border-[#2a2930]/15'} focus:border-[#8c52ff] focus:ring-2 focus:ring-[#8c52ff]/20`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-[#54515f]">
                {t("phone")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[#2a2930] ${errors.phone ? 'border-red-500' : 'border-[#2a2930]/15'} focus:border-[#8c52ff] focus:ring-2 focus:ring-[#8c52ff]/20`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#54515f]">
                {t("address")}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[#2a2930] ${errors.address ? 'border-red-500' : 'border-[#2a2930]/15'} focus:border-[#8c52ff] focus:ring-2 focus:ring-[#8c52ff]/20`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#54515f]">
                {t("businessType")}
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[#2a2930] ${errors.businessType ? 'border-red-500' : 'border-[#2a2930]/15'} focus:border-[#8c52ff] focus:ring-2 focus:ring-[#8c52ff]/20`}
              >
                <option value="">{t("selectBusinessType")}</option>
                <option value="ai-transformation">{t("transformationTitle")}</option>
                <option value="ai-governance">{t("governanceTitle")}</option>
                <option value="ai-training">{t("trainingTitle")}</option>
                <option value="other">{t("other")}</option>
              </select>
              {errors.businessType && (
                <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>
              )}
            </div>

            <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#54515f]">
                {t("additionalMessage")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={t("additionalMessagePlaceholder")}
                className="w-full rounded-lg border border-[#2a2930]/15 bg-white px-4 py-2.5 text-[#2a2930] focus:border-[#8c52ff] focus:ring-2 focus:ring-[#8c52ff]/20"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={submitState === 'sending'}
              className="rounded-full bg-gradient-to-r from-[#ff5757] to-[#8c52ff] px-8 py-3 text-lg font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState === 'sending' ? t('contactSending') : t("contactSubmit")}
            </button>
            {submitState === 'success' && <p className="mt-4 text-sm font-medium text-emerald-700">{t('contactSuccess')}</p>}
            {submitState === 'email' && <p className="mt-4 text-sm font-medium text-[#7040d5]">{t('contactEmailFallback')}</p>}
            {submitState === 'error' && <p className="mt-4 text-sm font-medium text-red-600">{t('contactError')}</p>}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ResellerRegistration; 
