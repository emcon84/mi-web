import { motion } from "framer-motion";
import { useState } from "react";
import {
  HiCalendar,
  HiClock,
  HiTag,
  HiEye,
  HiArrowRight,
} from "react-icons/hi";
import {
  blogData,
  getPostsByCategory,
  getCategories,
  formatDate,
} from "../../data/blogData";
import { SEOHead } from "../SEO/SEOHead";

export const ModernBlog = ({ language = "es", theme = "dark" }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = getCategories(language);

  // Filtrar posts por categoría
  const filteredPosts =
    selectedCategory === "all"
      ? blogData
      : blogData.filter(
          (post) =>
            post.category[language].toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Función para abrir post en nueva pestaña
  const openPostInNewTab = (post) => {
    // Obtener la URL base del sitio
    const baseUrl = window.location.origin;

    // Función simple para convertir Markdown básico a HTML
    const markdownToHtml = (markdown) => {
      // Primero, proteger los bloques de código para evitar procesamiento
      const codeBlocks = [];
      let codeBlockIndex = 0;

      // Extraer y proteger bloques de código
      let processedMarkdown = markdown.replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        (match, lang, code) => {
          const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
          codeBlocks.push({
            lang: lang || "",
            code: code.trim(),
          });
          codeBlockIndex++;
          return placeholder;
        }
      );

      // Proteger código inline
      const inlineCode = [];
      let inlineIndex = 0;
      processedMarkdown = processedMarkdown.replace(
        /`([^`\n]+)`/g,
        (match, code) => {
          const placeholder = `__INLINE_CODE_${inlineIndex}__`;
          inlineCode.push(code);
          inlineIndex++;
          return placeholder;
        }
      );

      // Ahora procesar el resto del Markdown
      processedMarkdown = processedMarkdown
        // Headers (orden importante: del más específico al menos específico)
        .replace(/^### (.*$)/gm, "<h3>$1</h3>")
        .replace(/^## (.*$)/gm, "<h2>$1</h2>")
        .replace(/^# (.*$)/gm, "<h1>$1</h1>")
        // Bold
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        // Listas con viñetas
        .replace(/^- (.*$)/gm, "<li>$1</li>")
        // Listas numeradas
        .replace(/^\d+\. (.*$)/gm, "<li>$1</li>");

      // Procesar párrafos
      const paragraphs = processedMarkdown.split("\n\n");
      processedMarkdown = paragraphs
        .map((paragraph) => {
          paragraph = paragraph.trim();
          if (paragraph === "") return "";

          // No envolver en <p> si ya es un elemento de bloque
          if (paragraph.match(/^<(h[1-6]|ul|ol|li|blockquote|pre|div)/)) {
            return paragraph;
          }

          // Convertir saltos de línea simples en <br>
          return `<p>${paragraph.replace(/\n/g, "<br>")}</p>`;
        })
        .join("\n");

      // Agrupar elementos de lista consecutivos
      processedMarkdown = processedMarkdown.replace(
        /(<li>.*?<\/li>\s*)+/g,
        (match) => {
          return `<ul>${match}</ul>`;
        }
      );

      // Restaurar código inline
      inlineCode.forEach((code, index) => {
        const placeholder = `__INLINE_CODE_${index}__`;
        const escapedCode = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        processedMarkdown = processedMarkdown.replace(
          placeholder,
          `<code>${escapedCode}</code>`
        );
      });

      // Restaurar bloques de código
      codeBlocks.forEach((block, index) => {
        const placeholder = `__CODE_BLOCK_${index}__`;
        const escapedCode = block.code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        processedMarkdown = processedMarkdown.replace(
          placeholder,
          `<pre><code class="language-${block.lang}">${escapedCode}</code></pre>`
        );
      });

      return processedMarkdown;
    };

    // Crear contenido HTML para la nueva pestaña
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${language}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${post.title[language]} - Blog</title>
        <meta name="description" content="${post.excerpt[language]}">
        <meta name="author" content="${post.author}">
        <meta name="keywords" content="${post.tags.join(", ")}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article">
        <meta property="og:title" content="${post.title[language]}">
        <meta property="og:description" content="${post.excerpt[language]}">
        <meta property="og:article:author" content="${post.author}">
        <meta property="og:article:published_time" content="${post.date}">
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${post.title[language]}">
        <meta name="twitter:description" content="${post.excerpt[language]}">
        
        <!-- Favicons -->
        <link rel="icon" type="image/svg+xml" href="${baseUrl}/favicon.svg">
        <link rel="icon" type="image/png" sizes="16x16" href="${baseUrl}/favicon-16x16.svg">
        <link rel="icon" type="image/png" sizes="32x32" href="${baseUrl}/favicon-32x32.svg">
        <link rel="apple-touch-icon" href="${baseUrl}/apple-touch-icon.svg">
        <link rel="manifest" href="${baseUrl}/site.webmanifest">
        
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
            padding: 2rem;
            color: #374151;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            word-wrap: break-word;
          }
          
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            position: relative;
          }
          
          .back-btn {
            position: absolute;
            top: 2rem;
            left: 2rem;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: background 0.3s;
            font-size: 14px;
          }
          
          .back-btn:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          
          .category {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }
          
          .title {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            line-height: 1.2;
          }
          
          .excerpt {
            font-size: 1.125rem;
            opacity: 0.9;
            margin-bottom: 2rem;
            line-height: 1.6;
          }
          
          .meta {
            display: flex;
            justify-content: center;
            gap: 2rem;
            font-size: 0.875rem;
            opacity: 0.8;
            flex-wrap: wrap;
          }
          
          .content {
            padding: 3rem 2rem;
            font-size: 1rem;
            line-height: 1.8;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          
          .content h1 {
            font-size: 2.25rem;
            font-weight: 700;
            margin: 2.5rem 0 1.5rem 0;
            color: #1f2937;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 0.5rem;
          }
          
          .content h2 {
            font-size: 1.875rem;
            font-weight: 600;
            margin: 2rem 0 1rem 0;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
          }
          
          .content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1.5rem 0 0.75rem 0;
            color: #1f2937;
          }
          
          .content h4 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 1.25rem 0 0.5rem 0;
            color: #374151;
          }
          
          .content p {
            margin-bottom: 1.5rem;
            text-align: justify;
          }
          
          .content code {
            background: #f3f4f6;
            color: #dc2626;
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          }
          
          .content pre {
            background: #1e293b;
            color: #f1f5f9;
            padding: 1.5rem;
            border-radius: 0.75rem;
            overflow-x: auto;
            margin: 1.5rem 0;
            border-left: 4px solid #3b82f6;
            white-space: pre;
            word-wrap: normal;
            max-width: calc(100% - 0px);
            box-sizing: border-box;
          }
          
          .content pre code {
            background: transparent;
            color: inherit;
            padding: 0;
            font-size: 0.875rem;
            line-height: 1.6;
            white-space: pre;
            word-wrap: normal;
            display: block;
            overflow-x: auto;
          }
          
          .content ul, .content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
          }
          
          .content li {
            margin-bottom: 0.75rem;
            line-height: 1.6;
          }
          
          .content ul li {
            list-style-type: disc;
          }
          
          .content ol li {
            list-style-type: decimal;
          }
          
          .content blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #6b7280;
            background: #f8fafc;
            padding: 1rem 1rem 1rem 1.5rem;
            border-radius: 0 0.5rem 0.5rem 0;
          }
          
          .content strong {
            font-weight: 700;
            color: #1f2937;
          }
          
          .content a {
            color: #3b82f6;
            text-decoration: underline;
            transition: color 0.2s;
          }
          
          .content a:hover {
            color: #1d4ed8;
          }
          
          .content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            overflow-x: auto;
            display: block;
            white-space: nowrap;
          }
          
          .content th,
          .content td {
            border: 1px solid #e5e7eb;
            padding: 0.75rem;
            text-align: left;
          }
          
          .content th {
            background: #f9fafb;
            font-weight: 600;
          }
          
          .content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
          }
          
          .content hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 2rem 0;
          }
          
          .tags {
            padding: 2rem;
            border-top: 1px solid #e5e7eb;
            background: #f9fafb;
          }
          
          .tag {
            display: inline-block;
            background: #e5e7eb;
            color: #374151;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            margin: 0.25rem;
            transition: background 0.2s;
          }
          
          .tag:hover {
            background: #d1d5db;
          }
          
          @media (max-width: 768px) {
            body {
              padding: 1rem;
            }
            
            .title {
              font-size: 1.875rem;
            }
            
            .meta {
              flex-direction: column;
              gap: 0.5rem;
            }
            
            .content {
              padding: 2rem 1.5rem;
            }
            
            .content h1 {
              font-size: 1.875rem;
            }
            
            .content h2 {
              font-size: 1.5rem;
            }
            
            .content pre {
              margin: 1rem 0;
              padding: 1rem;
              font-size: 0.8rem;
              overflow-x: auto;
              border-radius: 0.5rem;
            }
            
            .content code {
              font-size: 0.8rem;
              padding: 0.2rem 0.4rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <button class="back-btn" onclick="window.close()">
              ← ${language === "es" ? "Cerrar" : "Close"}
            </button>
            
            <div class="category">${post.category[language]}</div>
            <h1 class="title">${post.title[language]}</h1>
            <p class="excerpt">${post.excerpt[language]}</p>
            
            <div class="meta">
              <div>📅 ${formatDate(post.publishedAt, language)}</div>
              <div>⏱️ ${post.readTime[language]}</div>
              <div>👤 ${post.author}</div>
            </div>
          </div>
          
          <div class="content">
            ${markdownToHtml(post.content[language])}
          </div>
          
          ${
            post.tags && post.tags.length > 0
              ? `
            <div class="tags">
              <strong>${language === "es" ? "Etiquetas: " : "Tags: "}</strong>
              ${post.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}
            </div>
          `
              : ""
          }
        </div>
      </body>
      </html>
    `;

    // Abrir en nueva pestaña (no ventana)
    const newTab = window.open("about:blank", "_blank");
    if (newTab) {
      newTab.document.write(htmlContent);
      newTab.document.close();
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
  };

  return (
    <>
      <SEOHead
        title={
          language === "es"
            ? "Blog & Artículos | Emiliano Conti"
            : "Blog & Articles | Emiliano Conti"
        }
        description={
          language === "es"
            ? "Artículos sobre desarrollo frontend, React, JavaScript y las últimas tendencias en tecnología web. Tutoriales, tips y experiencias de un desarrollador con 8+ años de experiencia."
            : "Articles about frontend development, React, JavaScript and the latest trends in web technology. Tutorials, tips and experiences from a developer with 8+ years of experience."
        }
        keywords="blog, frontend development, react, javascript, web development, programming, tutorials, tips, articles, emiliano conti"
        language={language}
        type="blog"
      />
      <section
        className="min-h-screen flex flex-col py-8 md:py-12 px-4 md:px-6 pt-20 md:pt-32 pb-8 md:pb-12 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 0px)" }}
        aria-labelledby="blog-title"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto w-full flex-1 flex flex-col"
        >
          {/* Section Title */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 md:mb-12"
          >
            <h2
              id="blog-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "from-blue-400 to-cyan-400"
                    : "from-blue-600 to-cyan-600"
                }`}
              >
                {language === "es" ? "Blog & Artículos" : "Blog & Articles"}
              </span>
            </h2>
            <p
              className={`text-sm md:text-base max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {language === "es"
                ? "Pensamientos, tutoriales y experiencias sobre desarrollo frontend y tecnología"
                : "Thoughts, tutorials and experiences about frontend development and technology"}
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? theme === "dark"
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 text-white"
                  : theme === "dark"
                    ? "bg-white/10 text-gray-300 hover:bg-white/20"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {language === "es" ? "Todos" : "All"}
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? theme === "dark"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-600 text-white"
                    : theme === "dark"
                      ? "bg-white/10 text-gray-300 hover:bg-white/20"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Featured Posts */}
          {selectedCategory === "all" && (
            <motion.div variants={itemVariants} className="mb-12">
              <h3
                className={`text-xl md:text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {language === "es"
                  ? "Artículos Destacados"
                  : "Featured Articles"}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {blogData
                  .filter((post) => post.featured)
                  .slice(0, 2)
                  .map((post, index) => (
                    <motion.article
                      key={post.id}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => openPostInNewTab(post)}
                      className={`group cursor-pointer backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/50"
                          : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-xl hover:border-blue-500/50"
                      }`}
                    >
                      {/* Featured Image */}
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <div
                          className={`w-full h-full bg-gradient-to-br ${
                            index % 2 === 0
                              ? "from-blue-500/20 to-cyan-500/20"
                              : "from-purple-500/20 to-pink-500/20"
                          } flex items-center justify-center`}
                        >
                          <span
                            className={`text-4xl ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}
                          >
                            📝
                          </span>
                        </div>

                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
                            {language === "es" ? "Destacado" : "Featured"}
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              theme === "dark"
                                ? "bg-blue-500/80 text-white"
                                : "bg-blue-600/90 text-white"
                            }`}
                          >
                            {post.category[language]}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4
                          className={`text-lg md:text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {post.title[language]}
                        </h4>

                        <p
                          className={`text-sm mb-4 line-clamp-3 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {post.excerpt[language]}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <HiCalendar
                                className={
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }
                              />
                              <span
                                className={
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }
                              >
                                {formatDate(post.publishedAt, language)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HiClock
                                className={
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }
                              />
                              <span
                                className={
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }
                              >
                                {post.readTime[language]}
                              </span>
                            </div>
                          </div>

                          <motion.div
                            className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300"
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-xs font-medium">
                              {language === "es" ? "Leer más" : "Read more"}
                            </span>
                            <HiArrowRight className="text-sm" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
              </div>
            </motion.div>
          )}

          {/* All Posts Grid */}
          <motion.div variants={itemVariants}>
            <h3
              className={`text-xl md:text-2xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {selectedCategory === "all"
                ? language === "es"
                  ? "Todos los Artículos"
                  : "All Articles"
                : `${selectedCategory} ${language === "es" ? "Artículos" : "Articles"}`}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                  onClick={() => openPostInNewTab(post)}
                  className={`group cursor-pointer backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/50"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-lg hover:border-blue-500/50"
                  }`}
                >
                  {/* Image Placeholder */}
                  <div className="relative h-32 md:h-36 overflow-hidden">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${
                        index % 3 === 0
                          ? "from-blue-500/20 to-cyan-500/20"
                          : index % 3 === 1
                            ? "from-purple-500/20 to-pink-500/20"
                            : "from-green-500/20 to-teal-500/20"
                      } flex items-center justify-center`}
                    >
                      <span
                        className={`text-2xl ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}
                      >
                        📄
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          theme === "dark"
                            ? "bg-blue-500/80 text-white"
                            : "bg-blue-600/90 text-white"
                        }`}
                      >
                        {post.category[language]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4
                      className={`text-sm md:text-base font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {post.title[language]}
                    </h4>

                    <p
                      className={`text-xs mb-3 line-clamp-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {post.excerpt[language]}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs ${
                            theme === "dark"
                              ? "bg-gray-700/50 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <HiClock
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }
                        />
                        <span
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {post.readTime[language]}
                        </span>
                      </div>

                      <span
                        className={
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }
                      >
                        {formatDate(post.publishedAt, language)}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};
