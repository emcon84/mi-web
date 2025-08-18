import { Helmet } from "react-helmet";

export const SEOHead = ({
  title = "Emiliano Conti - Frontend Developer",
  description = "Portfolio de Emiliano Conti, Frontend Developer especializado en React, JavaScript y desarrollo web moderno. Más de 8 años de experiencia creando aplicaciones web innovadoras.",
  keywords = "frontend developer, react developer, javascript, web development, portfolio, emiliano conti, desarrollador frontend, programador web",
  image = "/img/yo.jpeg",
  url = "https://emilianoconti.dev",
  language = "es",
  type = "website",
}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : url;
  const currentLang = language === "es" ? "es-AR" : "en-US";

  // Títulos específicos por sección
  const sectionTitles = {
    home: language === "es" ? "Inicio" : "Home",
    projects: language === "es" ? "Proyectos" : "Projects",
    skills: language === "es" ? "Tecnologías" : "Technologies",
    contact: language === "es" ? "Contacto" : "Contact",
  };

  // Descripciones específicas por sección
  const sectionDescriptions = {
    home:
      language === "es"
        ? "Frontend Developer con más de 8 años de experiencia en React, JavaScript y desarrollo web moderno. Especializado en crear aplicaciones web innovadoras y accesibles."
        : "Frontend Developer with 8+ years of experience in React, JavaScript and modern web development. Specialized in creating innovative and accessible web applications.",
    projects:
      language === "es"
        ? "Explora mis proyectos destacados: aplicaciones React, sistemas de gestión, dashboards y soluciones web completas desarrolladas con las últimas tecnologías."
        : "Explore my featured projects: React applications, management systems, dashboards and complete web solutions developed with the latest technologies.",
    skills:
      language === "es"
        ? "Tecnologías y herramientas que domino: React, JavaScript, TypeScript, Node.js, MongoDB, CSS, Tailwind, Next.js y más. Stack completo de desarrollo frontend."
        : "Technologies and tools I master: React, JavaScript, TypeScript, Node.js, MongoDB, CSS, Tailwind, Next.js and more. Complete frontend development stack.",
    contact:
      language === "es"
        ? "¿Tienes un proyecto en mente? Contacta conmigo para discutir cómo puedo ayudarte a llevarlo a cabo. Disponible para proyectos remotos."
        : "Have a project in mind? Contact me to discuss how I can help you bring it to life. Available for remote projects.",
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Emiliano Conti" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={currentLang} />
      <meta name="revisit-after" content="7 days" />

      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Emiliano Conti Portfolio" />
      <meta property="og:locale" content={currentLang} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@emcon84" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternative Languages */}
      <link rel="alternate" hrefLang="es-AR" href={`${url}?lang=es`} />
      <link rel="alternate" hrefLang="en-US" href={`${url}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://res.cloudinary.com" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <link rel="apple-touch-icon" href="/img/yo.jpeg" />

      {/* Theme Color */}
      <meta name="theme-color" content="#1e293b" />
      <meta name="msapplication-TileColor" content="#1e293b" />

      {/* Structured Data - Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Emiliano Conti",
          jobTitle: "Frontend Developer",
          description: description,
          url: url,
          image: image,
          sameAs: [
            "https://github.com/emcon84",
            "https://linkedin.com/in/emilianoconti",
            "https://instagram.com/emcon.dev",
          ],
          knowsAbout: [
            "React",
            "JavaScript",
            "TypeScript",
            "Frontend Development",
            "Web Development",
            "Node.js",
            "CSS",
            "HTML5",
          ],
          worksFor: {
            "@type": "Organization",
            name: "Freelancer",
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "AR",
            addressRegion: "Buenos Aires",
          },
        })}
      </script>

      {/* Structured Data - WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Emiliano Conti Portfolio",
          url: url,
          description: description,
          inLanguage: [currentLang],
          author: {
            "@type": "Person",
            name: "Emiliano Conti",
          },
        })}
      </script>
    </Helmet>
  );
};
