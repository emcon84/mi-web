// Función principal para enviar emails usando FormSubmit (gratuito, sin registro)
export const sendEmailDirect = async (formData, language = "es") => {
  try {
    const response = await fetch("https://formsubmit.co/emcon84@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `Nuevo mensaje de ${formData.name} desde tu portfolio`,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message:
          language === "es"
            ? "¡Mensaje enviado correctamente! Te responderé pronto."
            : "Message sent successfully! I'll get back to you soon.",
      };
    } else {
      throw new Error("Error en el envío");
    }
  } catch (error) {
    console.error("Error enviando email:", error);
    throw error;
  }
};

// Función usando Formspree
export const sendEmailFormspree = async (formData, language = "es") => {
  try {
    const response = await fetch("https://formspree.io/f/mjkvnqjw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `Nuevo mensaje de ${formData.name} desde tu portfolio`,
        _replyto: formData.email,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message:
          language === "es"
            ? "¡Mensaje enviado correctamente! Te responderé pronto."
            : "Message sent successfully! I'll get back to you soon.",
      };
    } else {
      throw new Error("Error en el envío con Formspree");
    }
  } catch (error) {
    console.error("Error enviando email con Formspree:", error);
    throw error;
  }
};

// Función de respaldo usando mailto
export const sendEmailMailto = (formData) => {
  const subject = `Message from ${formData.name}`;
  const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
  const mailtoLink = `mailto:emcon84@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  return {
    success: true,
    message: "Se abrirá tu cliente de email para enviar el mensaje.",
  };
};

// Función principal que NO usa mailto - solo envío automático
export const sendEmailHybrid = async (formData, language = "es") => {
  try {
    // Usar la función directa que simula envío exitoso
    return await sendEmailDirect(formData, language);
  } catch (error) {
    console.error("Error en envío directo:", error);

    // Retornar error sin usar mailto
    return {
      success: false,
      message:
        language === "es"
          ? "Error al enviar el mensaje. Por favor intenta nuevamente."
          : "Error sending message. Please try again.",
    };
  }
};
