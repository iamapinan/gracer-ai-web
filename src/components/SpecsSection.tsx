import { motion } from 'framer-motion';

const SpecsSection = () => {
  const specs = [
    {
      category: "Starter",
      items: [
        { name: "AI Performance (TOPS)", value: "246" },
        { name: "RAM", value: "64GB" },
        { name: "Storage", value: "1TB" },
        { name: "Model", value: "Gracer-4b" }
      ]
    },
    {
      category: "Standard",
      items: [
        { name: "AI Performance (TOPS)", value: "988" },
        { name: "RAM", value: "64GB" },
        { name: "Storage", value: "1TB" },
        { name: "Model", value: "Gracer-7b" }
      ]
    },
    {
      category: "Performance",
      items: [
        { name: "AI Performance (TOPS)", value: "3,352" },
        { name: "RAM", value: "128GB" },
        { name: "Storage", value: "2TB" },
        { name: "Model", value: "Gracer-14b" }
      ]
    },
    {
      category: "Super",
      items: [
        { name: "AI Performance (TOPS)", value: "6,704" },
        { name: "RAM", value: "256GB" },
        { name: "Storage", value: "2TB" },
        { name: "Model", value: "Gracer-24b" }
      ]
    }
  ];

  return (
    <section id="specs" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Compute Module Specifications</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            เราออกแบบอุปกรณ์เพื่อให้คุณสามารถใช้ AI ใน Local ได้สะดวก ประหยัดต้นทุน และครอบคลุมการใช้งานทั้งหมด
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specs.map((specGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">{specGroup.category}</h3>
              <div className="space-y-4">
                {specGroup.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
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
          <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium">
            Full Specifications available soon
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecsSection;
