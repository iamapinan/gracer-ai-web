import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  businessType?: string;
}

const ResellerRegistration = () => {
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // ตรวจสอบชื่อบริษัท
    if (formData.companyName.length < 2) {
      newErrors.companyName = 'ชื่อบริษัทต้องมีความยาวอย่างน้อย 2 ตัวอักษร';
    }

    // ตรวจสอบชื่อผู้ติดต่อ
    if (formData.contactName.length < 2) {
      newErrors.contactName = 'ชื่อผู้ติดต่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร';
    }

    // ตรวจสอบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'กรุณากรอกอีเมลให้ถูกต้อง';
    }

    // ตรวจสอบเบอร์โทรศัพท์
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)';
    }

    // ตรวจสอบที่อยู่
    if (formData.address.length < 10) {
      newErrors.address = 'ที่อยู่ต้องมีความยาวอย่างน้อย 10 ตัวอักษร';
    }

    // ตรวจสอบประเภทธุรกิจ
    if (!formData.businessType) {
      newErrors.businessType = 'กรุณาเลือกประเภทธุรกิจ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // สร้างเนื้อหาอีเมล
      const emailBody = `
ชื่อบริษัท: ${formData.companyName}
ชื่อผู้ติดต่อ: ${formData.contactName}
อีเมล: ${formData.email}
เบอร์โทรศัพท์: ${formData.phone}
ที่อยู่: ${formData.address}
ประเภทธุรกิจ: ${formData.businessType}
ข้อความเพิ่มเติม: ${formData.message}
      `.trim();

      // สร้าง mailto link
      const mailtoLink = `mailto:apinan@gracer.co.th?subject=ใบสมัครตัวแทนจำหน่าย Gracer AI&body=${encodeURIComponent(emailBody)}`;
      
      // เปิด mailto link ในแท็บใหม่
      window.open(mailtoLink, '_blank');
    }
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
    <section className="py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">ลงทะเบียนเป็นตัวแทนจำหน่าย</h1>
          <p className="text-xl text-gray-300">
            กรอกข้อมูลด้านล่างเพื่อสมัครเป็นตัวแทนจำหน่าย Gracer AI
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ชื่อบริษัท
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-gray-700 border ${errors.companyName ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ชื่อผู้ติดต่อ
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-gray-700 border ${errors.contactName ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ที่อยู่
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-gray-700 border ${errors.address ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ประเภทธุรกิจ
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-gray-700 border ${errors.businessType ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="">เลือกประเภทธุรกิจ</option>
                <option value="retail">ร้านค้าปลีก</option>
                <option value="wholesale">ร้านค้าส่ง</option>
                <option value="service">ธุรกิจบริการ</option>
                <option value="other">อื่นๆ</option>
              </select>
              {errors.businessType && (
                <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ข้อความเพิ่มเติม
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
            >
              ส่งใบสมัคร
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ResellerRegistration; 