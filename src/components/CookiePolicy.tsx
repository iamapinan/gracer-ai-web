export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">นโยบายการใช้คุกกี้ (Cookie Policy)</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">คุกกี้คืออะไร?</h2>
        <p className="mb-4">
          คุกกี้คือไฟล์ข้อความขนาดเล็กที่เว็บไซต์จัดเก็บไว้ในอุปกรณ์ของคุณเมื่อคุณเยี่ยมชมเว็บไซต์ 
          คุกกี้ช่วยให้เว็บไซต์จดจำข้อมูลเกี่ยวกับการเยี่ยมชมของคุณ ซึ่งช่วยให้เราสามารถปรับปรุงเว็บไซต์ให้ดีขึ้นได้
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">ประเภทของคุกกี้ที่เราใช้</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">คุกกี้ที่จำเป็น (Essential Cookies)</h3>
            <p>คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์ และไม่สามารถปิดการใช้งานได้</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">คุกกี้เพื่อประสิทธิภาพ (Performance Cookies)</h3>
            <p>ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมใช้เว็บไซต์ของเราอย่างไร</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">คุกกี้เพื่อการทำงาน (Functionality Cookies)</h3>
            <p>ช่วยให้เว็บไซต์จดจำการตั้งค่าของคุณและปรับปรุงประสบการณ์การใช้งาน</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">การจัดการคุกกี้</h2>
        <p className="mb-4">
          คุณสามารถควบคุมและจัดการคุกกี้ได้ผ่านการตั้งค่าของเบราว์เซอร์ของคุณ 
          อย่างไรก็ตาม การปิดการใช้งานคุกกี้บางประเภทอาจส่งผลต่อการทำงานของเว็บไซต์
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">การเปลี่ยนแปลงนโยบายคุกกี้</h2>
        <p className="mb-4">
          เราอาจปรับปรุงนโยบายคุกกี้นี้เป็นครั้งคราว เพื่อให้สอดคล้องกับการเปลี่ยนแปลงทางเทคโนโลยี 
          หรือการเปลี่ยนแปลงในวิธีการที่เราใช้ข้อมูล
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">ติดต่อเรา</h2>
        <p>
          หากคุณมีคำถามเกี่ยวกับนโยบายคุกกี้ของเรา กรุณาติดต่อเราได้ที่ support@gracer.ai
        </p>
      </section>
    </div>
  );
} 