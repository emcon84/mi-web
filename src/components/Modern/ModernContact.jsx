import { motion } from "framer-motion";
import { useState } from "react";
import { dataSocialNetwork, dataContact } from "../../data/data";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiPaperAirplane,
  HiCheckCircle,
  HiExclamationCircle,
} from "react-icons/hi";
import { sendEmailHybrid } from "../../services/emailService";

export const ModernContact = ({ language = "es", theme = "dark" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendEmailHybrid(formData, language);

      if (result.success) {
        showNotification("success", result.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        showNotification("error", result.message);
      }
    } catch (error) {
      console.error("Error enviando email:", error);
      showNotification(
        "error",
        language === "es"
          ? "Hubo un error inesperado. Inténtalo nuevamente."
          : "There was an unexpected error. Please try again."
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4 md:px-6 pt-20 md:pt-24 pb-8 md:pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full"
      >
        {/* Section Title */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-blue-400 to-cyan-400"
                  : "from-blue-600 to-cyan-600"
              }`}
            >
              {language === "es" ? "Conectemos" : "Let's Connect"}
            </span>
          </h2>
          <p
            className={`text-sm md:text-base max-w-xl mx-auto px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {language === "es"
              ? "¿Listo para dar vida a tus ideas? Hablemos sobre tu próximo proyecto"
              : "Ready to bring your ideas to life? Let's discuss your next project"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="relative">
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur opacity-20"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.form
              onSubmit={handleSubmit}
              className={`relative backdrop-blur-sm border rounded-3xl p-8 md:p-10 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white/80 border-gray-200"
              }`}
              whileHover={{
                boxShadow:
                  theme === "dark"
                    ? "0 25px 50px rgba(34, 197, 94, 0.2)"
                    : "0 25px 50px rgba(34, 197, 94, 0.1)",
              }}
            >
              <h3
                className={`text-2xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              >
                {language === "es" ? "Enviar Mensaje" : "Send a Message"}
              </h3>

              <div className="space-y-6">
                {/* Name Input */}
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === "es" ? "Tu Nombre" : "Your Name"}
                    required
                    className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/10"
                        : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-green-500 focus:bg-white"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === "es" ? "Tu Email" : "Your Email"}
                    required
                    className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/10"
                        : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-green-500 focus:bg-white"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Message Input */}
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={
                      language === "es" ? "Tu Mensaje" : "Your Message"
                    }
                    rows={6}
                    required
                    className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all duration-300 resize-none ${
                      theme === "dark"
                        ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/10"
                        : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-green-500 focus:bg-white"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <HiPaperAirplane className="text-xl" />
                      {language === "es" ? "Enviar Mensaje" : "Send Message"}
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <h3
                className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              >
                {language === "es" ? "Ponerse en Contacto" : "Get in Touch"}
              </h3>

              {/* Contact Items */}
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-4 p-4 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-md"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-green-500/20 to-blue-500/20"
                      : "bg-gradient-to-br from-green-100 to-blue-100"
                  }`}
                >
                  <HiMail
                    className={`text-2xl ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Email
                  </p>
                  <p
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    emcon84@gmail.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-4 p-4 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-md"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                      : "bg-gradient-to-br from-blue-100 to-cyan-100"
                  }`}
                >
                  <HiLocationMarker
                    className={`text-2xl ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Location
                  </p>
                  <p
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Argentina
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4
                className={`text-xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Follow Me
              </h4>
              <div className="flex gap-4">
                {dataSocialNetwork.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 backdrop-blur-sm border rounded-2xl transition-all duration-300 group ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                        : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`text-3xl transition-colors duration-300 ${
                        theme === "dark"
                          ? "group-hover:text-green-400"
                          : "group-hover:text-green-600"
                      }`}
                    >
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="text-green-400 font-medium">
                  {language === "es"
                    ? "Disponible para trabajar"
                    : "Available for work"}
                </span>
              </div>
              <p
                className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                {language === "es"
                  ? "Abierto a nuevas oportunidades y proyectos emocionantes. ¡Creemos algo increíble juntos!"
                  : "Open to new opportunities and exciting projects. Let's create something amazing together!"}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <div
              className={`p-4 rounded-2xl backdrop-blur-sm border flex items-center gap-3 shadow-lg ${
                notification.type === "success"
                  ? theme === "dark"
                    ? "bg-green-900/90 border-green-500/50 text-green-100"
                    : "bg-green-100 border-green-300 text-green-800"
                  : theme === "dark"
                    ? "bg-red-900/90 border-red-500/50 text-red-100"
                    : "bg-red-100 border-red-300 text-red-800"
              }`}
            >
              {notification.type === "success" ? (
                <HiCheckCircle className="text-2xl flex-shrink-0" />
              ) : (
                <HiExclamationCircle className="text-2xl flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
