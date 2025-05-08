import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const UseCasesSection = () => {
  const { t } = useLanguage();
  const useCases = [
    {
      title: "ด้านการศึกษา",
      description: "มีแอปฯที่ทำงานร่วมกับ AI ใส่ร้างความสะดวกในการเรียนการสอน การทดสอบ การตรวจสอบผลการเรียนของนักเรียน",
      icon: "💼"
    },
    {
      title: "ด้านการสร้างสรรค์",
      description: "มีแอปฯที่ทำงานร่วมกับ AI ที่ใช้สร้างสรรค์ผลงาน รูปภาพ สไลด์ และบทความต่างๆ",
      icon: "🎨"
    },
    {
      title: "ด้านธุรกิจ",
      description: "มีแอปฯที่ทำงานร่วมกับ AI ในการบริหารจัดการธุรกิจ เช่นปฎิทินการนัดหมาย การจัดซื้อ การจัดส่ง การออกใบเสร็จ และอีกมากมาย",
      icon: "🏢"
    },
    {
      title: "ด้านการทำงานทั่วไป",
      description: "มีแอปฯที่ทำงานร่วมกับ AI ใส่ร้างความสะดวกในการทำงานทั่วไป เช่น การจัดการไฟล์ การวางแผน การตรวจสอบข่าว และอีกมากมาย",
      icon: "📇"
    },
    {
      title: "ด้านความเป็นส่วนตัว",
      description: "รักษาความเป็นส่วนตัวของข้อมูล ไม่มีการส่งข้อมูลออนไลน์ ทั้งหมดทำงานอยู่บนอุปกรณ์ของคุณเอง",
      icon: "🔒"
    },
    {
      title: "ทำงานแบบ Offline",
      description: "รักษาความเป็นส่วนตัวของข้อมูล ไม่มีการส่งข้อมูลออนไลน์ ทั้งหมดทำงานอยู่บนอุปกรณ์ของคุณเอง",
      icon: "🚫"
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Possibilities expand with Mini Apps</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Gracer AI มีระบบ App Explorer สำหรับผู้ใช้งานที่ต้องการค้นหาแอพพลิเคชั่นที่ต้องการใช้งาน เฉพาะเจาะจงตามความต้องการของผู้ใช้งาน สามารถติดตั้งได้ฟรีไม่จำกัด สามารถเลือกติดตั้งได้ตามความต้องการของผู้ใช้งาน และเพิ่มขึ้นเรื่อยๆ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-300">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">พร้อมที่จะเปลี่ยนแปลงการทำงานของคุณหรือยัง?</h3>
          <a href="#reseller-registration" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
          >
            {t("becomeReseller")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
