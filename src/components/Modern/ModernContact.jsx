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
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return language === "es"
            ? "El nombre es obligatorio"
            : "Name is required";
        }
        if (value.trim().length < 2) {
          return language === "es"
            ? "El nombre debe tener al menos 2 caracteres"
            : "Name must be at least 2 characters";
        }
        return "";
      case "email":
        if (!value.trim()) {
          return language === "es"
            ? "El email es obligatorio"
            : "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return language === "es"
            ? "Ingresa un email válido"
            : "Please enter a valid email";
        }
        return "";
      case "message":
        if (!value.trim()) {
          return language === "es"
            ? "El mensaje es obligatorio"
            : "Message is required";
        }
        if (value.trim().length < 10) {
          return language === "es"
            ? "El mensaje debe tener al menos 10 caracteres"
            : "Message must be at least 10 characters";
        }
        return "";
      default:
        return "";
    }
  };

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
    hidden: { opacity: 0, scale: 0.99 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate field in real time
    const error = validateField(name, value);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setFormErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors).find(
        (key) => errors[key] !== ""
      );
      const element = document.getElementById(`contact-${firstErrorField}`);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendEmailHybrid(formData, language);

      if (result.success) {
        showNotification("success", result.message);
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({ name: "", email: "", message: "" });
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
            className={`text-sm md:text-base max-w-2xl mx-auto px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
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
                id="contact-form-title"
              >
                {language === "es" ? "Enviar Mensaje" : "Send a Message"}
              </h3>

              <div
                className="space-y-6"
                role="form"
                aria-labelledby="contact-form-title"
                aria-describedby="form-instructions"
              >
                <div
                  id="form-instructions"
                  className="sr-only"
                  aria-live="polite"
                >
                  {language === "es"
                    ? "Complete el formulario para enviar un mensaje. Todos los campos son obligatorios."
                    : "Fill out the form to send a message. All fields are required."}
                </div>
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <label
                    htmlFor="contact-name"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {language === "es" ? "Nombre *" : "Name *"}
                  </label>
                  <motion.input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === "es" ? "Tu Nombre" : "Your Name"}
                    required
                    aria-required="true"
                    aria-describedby="name-error"
                    aria-invalid={formErrors.name ? "true" : "false"}
                    className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all duration-300 ${
                      formErrors.name
                        ? "border-red-500 focus:border-red-500"
                        : theme === "dark"
                          ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/10"
                          : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-green-500 focus:bg-white"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <div
                    id="name-error"
                    className={`mt-1 text-sm ${formErrors.name ? "text-red-500" : "sr-only"}`}
                    aria-live="polite"
                  >
                    {formErrors.name || ""}
                  </div>
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <label
                    htmlFor="contact-email"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {language === "es" ? "Email *" : "Email *"}
                  </label>
                  <motion.input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={
                      language === "es" ? "tu@email.com" : "your@email.com"
                    }
                    required
                    aria-required="true"
                    aria-describedby="email-error email-help"
                    aria-invalid={formErrors.email ? "true" : "false"}
                    className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all duration-300 ${
                      formErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : theme === "dark"
                          ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/10"
                          : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-green-500 focus:bg-white"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <div
                    id="email-help"
                    className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"} ${formErrors.email ? "hidden" : ""}`}
                  >
                    {language === "es"
                      ? "Ingresa una dirección de email válida"
                      : "Enter a valid email address"}
                  </div>
                  <div
                    id="email-error"
                    className={`mt-1 text-sm ${formErrors.email ? "text-red-500" : "sr-only"}`}
                    aria-live="polite"
                  >
                    {formErrors.email || ""}
                  </div>
                </motion.div>

                {/* Message Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <label
                    htmlFor="contact-message"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {language === "es" ? "Mensaje *" : "Message *"}
                  </label>
                  <motion.textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={
                      language === "es"
                        ? "Escribe tu mensaje aquí..."
                        : "Write your message here..."
                    }
                    rows={6}
                    required
                    aria-required="true"
                    aria-describedby="message-error message-help"
                    aria-invalid={formErrors.message ? "true" : "false"}
                    className={`w-full px-6 py-4 border rounded-2xl focus:outline-none transition-all duration-300 resize-none ${
                      formErrors.message
                        ? "border-red-500 focus:border-red-500"
                        : theme === "dark"
                          ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/10"
                          : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-green-500 focus:bg-white"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <div
                    id="message-help"
                    className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"} ${formErrors.message ? "hidden" : ""}`}
                  >
                    {language === "es"
                      ? "Mínimo 10 caracteres"
                      : "Minimum 10 characters"}
                  </div>
                  <div
                    id="message-error"
                    className={`mt-1 text-sm ${formErrors.message ? "text-red-500" : "sr-only"}`}
                    aria-live="polite"
                  >
                    {formErrors.message || ""}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-describedby="submit-help"
                  aria-label={
                    language === "es"
                      ? "Enviar mensaje de contacto"
                      : "Send contact message"
                  }
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        {language === "es"
                          ? "Enviando mensaje..."
                          : "Sending message..."}
                      </span>
                      {language === "es" ? "Enviando..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="text-xl" />
                      {language === "es" ? "Enviar Mensaje" : "Send Message"}
                    </>
                  )}
                </motion.button>
                <div
                  id="submit-help"
                  className={`text-xs mt-2 text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  {language === "es"
                    ? "Al enviar aceptas que podemos contactarte por email"
                    : "By submitting you agree that we may contact you by email"}
                </div>
              </div>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 mb-32 md:mb-0"
            role="complementary"
            aria-labelledby="contact-info-title"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <motion.h3
                id="contact-info-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              >
                {language === "es" ? "Ponerse en Contacto" : "Get in Touch"}
              </motion.h3>

              {/* Contact Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ x: 5 }}
                className={`flex items-center gap-4 p-4 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-md"
                }`}
                role="group"
                aria-label={
                  language === "es"
                    ? "Información de email"
                    : "Email information"
                }
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`p-3 rounded-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-green-500/20 to-blue-500/20"
                      : "bg-gradient-to-br from-green-100 to-blue-100"
                  }`}
                  aria-hidden="true"
                >
                  <HiMail
                    className={`text-2xl ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }`}
                  />
                </motion.div>
                <div>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:emcon84@gmail.com"
                    className={`font-medium hover:underline focus:underline focus:outline-none ${
                      theme === "dark"
                        ? "text-white hover:text-green-400"
                        : "text-gray-800 hover:text-green-600"
                    }`}
                    aria-label={
                      language === "es"
                        ? "Enviar email a emcon84@gmail.com"
                        : "Send email to emcon84@gmail.com"
                    }
                  >
                    emcon84@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ x: 5 }}
                className={`flex items-center gap-4 p-4 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-md"
                }`}
                role="group"
                aria-label={
                  language === "es"
                    ? "Información de ubicación"
                    : "Location information"
                }
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`p-3 rounded-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                      : "bg-gradient-to-br from-blue-100 to-cyan-100"
                  }`}
                  aria-hidden="true"
                >
                  <HiLocationMarker
                    className={`text-2xl ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </motion.div>
                <div>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {language === "es" ? "Ubicación" : "Location"}
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
            <div role="region" aria-labelledby="social-links-title">
              <motion.h4
                id="social-links-title"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className={`text-xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {language === "es" ? "Sígueme" : "Follow Me"}
              </motion.h4>
              <div
                className="flex gap-4"
                role="list"
                aria-label={
                  language === "es"
                    ? "Enlaces de redes sociales"
                    : "Social media links"
                }
              >
                {dataSocialNetwork.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 backdrop-blur-sm border rounded-2xl transition-all duration-300 group focus:ring-4 focus:ring-green-300 focus:ring-offset-2 focus:outline-none ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                        : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-md"
                    }`}
                    role="listitem"
                    aria-label={`${language === "es" ? "Visitar perfil de" : "Visit"} ${social.name} ${language === "es" ? "en nueva pestaña" : "profile in new tab"}`}
                  >
                    <div
                      className={`text-3xl transition-colors duration-300 ${
                        theme === "dark"
                          ? "group-hover:text-green-400"
                          : "group-hover:text-green-600"
                      }`}
                      aria-hidden="true"
                    >
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl "
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
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-green-400 font-medium"
                >
                  {language === "es"
                    ? "Disponible para trabajar"
                    : "Available for work"}
                </motion.span>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                {language === "es"
                  ? "Abierto a nuevas oportunidades y proyectos emocionantes. ¡Creemos algo increíble juntos!"
                  : "Open to new opportunities and exciting projects. Let's create something amazing together!"}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
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
                <HiCheckCircle
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <HiExclamationCircle
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <p className="text-sm font-medium">
                <span className="sr-only">
                  {notification.type === "success"
                    ? language === "es"
                      ? "Éxito: "
                      : "Success: "
                    : language === "es"
                      ? "Error: "
                      : "Error: "}
                </span>
                {notification.message}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
