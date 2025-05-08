import { motion } from 'framer-motion';
import { BookOpen, BrainCircuit, Code, FileText, PenTool,  Store, Video } from 'lucide-react';

const AppStoreSection = () => {
  const categories = [
    {
      name: "Productivity",
      icon: <FileText size={24} />,
      description: "Enhance your workflow with powerful productivity tools",
      apps: [
        { name: "Document AI", description: "Smart document processing and summarization" },
        { name: "Meeting Assistant", description: "Transcription, notes, and action items from meetings" }
      ]
    },
    {
      name: "Education",
      icon: <BookOpen size={24} />,
      description: "Transform learning with personalized AI assistance",
      apps: [
        { name: "Study Companion", description: "Personalized tutoring in any subject" },
        { name: "Research Assistant", description: "Literature review and knowledge synthesis" }
      ]
    },
    {
      name: "Creative",
      icon: <PenTool size={24} />,
      description: "Unleash your creativity with AI-powered tools",
      apps: [
        { name: "Image Generator", description: "Create stunning visuals from text descriptions" },
        { name: "Music Composer", description: "Compose original music in any style" }
      ]
    },
    {
      name: "Development",
      icon: <Code size={24} />,
      description: "Accelerate coding and development projects",
      apps: [
        { name: "Code Assistant", description: "Intelligent code completion and generation" },
        { name: "Debug Helper", description: "Find and fix bugs with AI guidance" }
      ]
    },
    {
      name: "Media",
      icon: <Video size={24} />,
      description: "Process and create media content effortlessly",
      apps: [
        { name: "Video Editor", description: "AI-powered video editing and enhancement" },
        { name: "Content Creator", description: "Generate scripts, storyboards, and more" }
      ]
    },
    {
      name: "AI Research",
      icon: <BrainCircuit size={24} />,
      description: "Push the boundaries of AI with advanced tools",
      apps: [
        { name: "Model Trainer", description: "Fine-tune models on your local data" },
        { name: "Neural Explorer", description: "Visualize and understand model operations" }
      ]
    }
  ];

  return (
    <section id="app-store" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Gracer AI App Store</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Extend your device's capabilities with a growing ecosystem of specialized applications.
            All apps run locally, ensuring your data stays private.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center flex-shrink-0 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold">{category.name}</h3>
              </div>
              <p className="text-gray-300 mb-6">{category.description}</p>
              
              <div className="space-y-4">
                {category.apps.map((app, appIndex) => (
                  <div key={appIndex} className="bg-gray-800/50 rounded-lg p-3">
                    <h4 className="font-medium mb-1">{app.name}</h4>
                    <p className="text-sm text-gray-400">{app.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center">
                  Explore all {category.name} apps
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
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
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <div className="bg-black px-6 py-2 rounded-full">
              <Store size={20} className="inline mr-2" />
              <span className="font-medium">Over 500+ apps available</span>
            </div>
          </div>
          <div>
            <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium mx-2">
              Browse App Store
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full text-lg font-medium mx-2">
              Developer Portal
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppStoreSection;
