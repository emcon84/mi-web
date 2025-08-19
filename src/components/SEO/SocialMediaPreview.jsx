import { useState } from "react";
import { motion } from "framer-motion";

export const SocialMediaPreview = ({ 
  title, 
  description, 
  image, 
  url,
  language = "es" 
}) => {
  const [activeTab, setActiveTab] = useState("facebook");

  const tabs = [
    { id: "facebook", name: "Facebook", color: "bg-blue-600" },
    { id: "twitter", name: "Twitter", color: "bg-sky-500" },
    { id: "linkedin", name: "LinkedIn", color: "bg-blue-700" },
    { id: "whatsapp", name: "WhatsApp", color: "bg-green-500" },
  ];

  const FacebookCard = () => (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white max-w-md">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <div className="text-xs text-gray-500 uppercase mb-1">
          {url?.replace(/https?:\/\//, "")}
        </div>
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );

  const TwitterCard = () => (
    <div className="border border-gray-300 rounded-2xl overflow-hidden bg-white max-w-md">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
          {description}
        </p>
        <div className="text-xs text-gray-500">
          🔗 {url?.replace(/https?:\/\//, "")}
        </div>
      </div>
    </div>
  );

  const LinkedInCard = () => (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white max-w-md">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
          {description}
        </p>
        <div className="text-xs text-gray-500">
          {url?.replace(/https?:\/\//, "")}
        </div>
      </div>
    </div>
  );

  const WhatsAppCard = () => (
    <div className="bg-gray-100 p-3 rounded-lg max-w-md">
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <img 
          src={image} 
          alt={title}
          className="w-full h-32 object-cover"
        />
        <div className="p-2">
          <h3 className="font-bold text-gray-900 text-xs mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-600 text-xs line-clamp-2 mb-1">
            {description}
          </p>
          <div className="text-xs text-gray-500">
            {url?.replace(/https?:\/\//, "")}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCard = () => {
    switch (activeTab) {
      case "facebook":
        return <FacebookCard />;
      case "twitter":
        return <TwitterCard />;
      case "linkedin":
        return <LinkedInCard />;
      case "whatsapp":
        return <WhatsAppCard />;
      default:
        return <FacebookCard />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h3 className="text-lg font-bold mb-4 text-gray-800">
        {language === "es" 
          ? "Vista previa en redes sociales" 
          : "Social media preview"}
      </h3>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? `${tab.color} text-white`
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Card Preview */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderCard()}
      </motion.div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 text-sm mb-2">
          {language === "es" ? "Meta tags incluidos:" : "Meta tags included:"}
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• og:title, og:description, og:image</li>
          <li>• twitter:card, twitter:title, twitter:description</li>
          <li>• og:url, og:site_name</li>
          <li>• {language === "es" ? "Imagen optimizada 1200x630px" : "Optimized image 1200x630px"}</li>
        </ul>
      </div>
    </div>
  );
};
