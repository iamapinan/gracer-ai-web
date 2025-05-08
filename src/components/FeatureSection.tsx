import { motion } from 'framer-motion';

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureSectionProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  features: FeatureItem[];
  reverse?: boolean;
  imgClass?: string;
}

const FeatureSection = ({ id, title, description, imageSrc, features, reverse = false, imgClass = '' }: FeatureSectionProps) => {
  return (
    <section id={id} className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          <motion.div 
            initial={{ opacity: 0, x: reverse ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={imageSrc} 
                  alt={title} 
                  className={`object-cover w-full h-full ${imgClass}`} 
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-xl text-gray-300 mb-10">{description}</p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
