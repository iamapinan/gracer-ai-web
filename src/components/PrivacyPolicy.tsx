import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-black rounded-lg">
      <h1 className="text-3xl font-bold mb-6">นโยบายความเป็นส่วนตัว</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. การเก็บข้อมูลส่วนบุคคล</h2>
        <p className="text-gray-100 mb-4">
          เรารวบรวมข้อมูลส่วนบุคคลของคุณเพื่อให้บริการที่ดีที่สุด โดยข้อมูลที่เรารวบรวมอาจรวมถึง:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>ชื่อ-นามสกุล</li>
          <li>ที่อยู่อีเมล</li>
          <li>หมายเลขโทรศัพท์</li>
          <li>ข้อมูลการใช้งานเว็บไซต์</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. การใช้ข้อมูล</h2>
        <p className="text-gray-100 mb-4">
          เราใช้ข้อมูลของคุณเพื่อ:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>ให้บริการและสนับสนุนลูกค้า</li>
          <li>ปรับปรุงและพัฒนาบริการของเรา</li>
          <li>ส่งข้อมูลและข่าวสารที่เกี่ยวข้อง</li>
          <li>ป้องกันการใช้งานที่ไม่ถูกต้อง</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. การคุ้มครองข้อมูล</h2>
        <p className="text-gray-100 mb-4">
          เรามีมาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต การเปิดเผย การเปลี่ยนแปลง หรือการทำลาย
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. สิทธิ์ของคุณ</h2>
        <p className="text-gray-100 mb-4">
          คุณมีสิทธิ์ในการ:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>เข้าถึงข้อมูลส่วนบุคคลของคุณ</li>
          <li>ขอแก้ไขข้อมูลที่ไม่ถูกต้อง</li>
          <li>ขอลบข้อมูลของคุณ</li>
          <li>คัดค้านการประมวลผลข้อมูล</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. การติดต่อ</h2>
        <p className="text-gray-100 mb-4">
          หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวของเรา กรุณาติดต่อเราได้ที่:
          <br />
          อีเมล: privacy@gracer.co.th
        </p>
      </section>

      <footer className="text-sm text-gray-500">
        <p>อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy; 