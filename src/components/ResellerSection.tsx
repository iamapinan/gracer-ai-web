import { motion } from 'framer-motion';
import { ExternalLink, Mail, MapPin, PhoneCall } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ResellerSection = () => {
  const { t } = useLanguage();
  
  const resellers = [
    {
      name: "TechWorld Solutions",
      country: "Thailand",
      region: "Bangkok",
      address: "123 Silom Road, Bangrak, Bangkok 10500",
      phone: "+66 2 123 4567",
      email: "sales@techworld.co.th",
      website: "https://www.techworld.co.th"
    },
    {
      name: "Future Systems Co., Ltd.",
      country: "Thailand",
      region: "Chiang Mai",
      address: "456 Huay Kaew Road, Muang, Chiang Mai 50200",
      phone: "+66 53 987 6543",
      email: "info@futuresystems.co.th",
      website: "https://www.futuresystems.co.th"
    },
    {
      name: "Digital Innovation Center",
      country: "Thailand",
      region: "Phuket",
      address: "789 Thepkrasattri Rd, Thalang, Phuket 83110",
      phone: "+66 76 321 7654",
      email: "contact@dic.co.th",
      website: "https://www.digitalinnovation.co.th"
    },
    {
      name: "AI Solutions Thailand",
      country: "Thailand",
      region: "Khon Kaen",
      address: "101 Mittraphap Rd, Muang, Khon Kaen 40000",
      phone: "+66 43 765 4321",
      email: "support@aisolutions.th",
      website: "https://www.aisolutions.th"
    },
    {
      name: "Smart Tech Distributors",
      country: "Thailand",
      region: "Hat Yai",
      address: "222 Phetkasem Road, Hat Yai, Songkhla 90110",
      phone: "+66 74 234 5678",
      email: "info@smarttech.co.th",
      website: "https://www.smarttechdist.co.th"
    }
  ];

  return (
    <section id="resellers" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("resellers")}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with our authorized resellers to purchase Gracer AI devices and get local support services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resellers.map((reseller, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{reseller.name}</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <MapPin size={18} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{reseller.address}</p>
                    <p className="text-gray-400 text-sm">{reseller.region}, {reseller.country}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <PhoneCall size={18} className="text-blue-400 mr-3 flex-shrink-0" />
                  <a href={`tel:${reseller.phone}`} className="text-gray-300 hover:text-white">{reseller.phone}</a>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-blue-400 mr-3 flex-shrink-0" />
                  <a href={`mailto:${reseller.email}`} className="text-gray-300 hover:text-white">{reseller.email}</a>
                </div>
              </div>
              <a 
                href={reseller.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 font-medium"
              >
                Visit Website <ExternalLink size={16} className="ml-1" />
              </a>
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
          <p className="text-gray-300 mb-6">Can't find a reseller in your area?</p>
          <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium">
            Contact Global Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResellerSection;
