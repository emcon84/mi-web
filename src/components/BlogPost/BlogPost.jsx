import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  HiArrowLeft,
  HiCalendar,
  HiClock,
  HiTag,
  HiUser,
} from "react-icons/hi";
import { SEOHead } from "../SEO/SEOHead";
import { formatDate } from "../../data/blogData";

export const BlogPost = ({ post, language = "es", theme = "dark", onBack }) => {
  // Scroll to top when component mounts and ensure scroll is enabled
  useEffect(() => {
    // Force scroll to be enabled and add blog-view class
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("allow-scroll", "blog-view");
    document.getElementById("root").classList.add("blog-view");
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Cleanup function to remove blog-view classes when component unmounts
    return () => {
      document.body.classList.remove("blog-view");
      document.getElementById("root").classList.remove("blog-view");
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
    };
  }, [post]);

  // Handle back navigation with scroll
  const handleBack = () => {
    // Remove blog-view classes before going back
    document.body.classList.remove("blog-view");
    document.getElementById("root").classList.remove("blog-view");
    // Ensure scroll remains enabled
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("allow-scroll");

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      onBack();
    }, 300); // Small delay to allow scroll animation
  };
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {language === "es" ? "Artículo no encontrado" : "Article not found"}
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {language === "es" ? "Volver al blog" : "Back to blog"}
          </button>
        </div>
      </div>
    );
  }

  // Función para convertir Markdown básico a HTML
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

        // Envolver listas consecutivas
        if (paragraph.includes("<li>")) {
          if (paragraph.match(/^\d+\./m)) {
            return `<ol>${paragraph}</ol>`;
          } else {
            return `<ul>${paragraph}</ul>`;
          }
        }

        return `<p>${paragraph}</p>`;
      })
      .join("\n\n");

    // Restaurar código inline
    inlineCode.forEach((code, index) => {
      const placeholder = `__INLINE_CODE_${index}__`;
      processedMarkdown = processedMarkdown.replace(
        placeholder,
        `<code>${code}</code>`
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

  return (
    <>
      <SEOHead
        title={`${post.title[language]} - Blog`}
        description={post.excerpt[language]}
        keywords={post.tags.join(", ")}
        image={post.image}
        language={language}
        type="article"
        isBlogPost={true}
        blogPost={post}
        publishedTime={post.date}
        authors={[post.author]}
        tags={post.tags}
        category={post.category[language]}
      />

      <div className="min-h-screen py-8 md:py-12 px-4 md:px-6 pt-20 md:pt-32 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header with back button */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "text-blue-400 hover:bg-white/10"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
            >
              <HiArrowLeft className="w-5 h-5" />
              {language === "es" ? "Volver al blog" : "Back to blog"}
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title[language]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Category badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-blue-500/90 text-white text-sm font-medium rounded-full">
                {post.category[language]}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {post.title[language]}
            </h1>

            <p
              className={`text-lg md:text-xl mb-6 leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {post.excerpt[language]}
            </p>

            {/* Article Meta */}
            <div
              className={`flex flex-wrap items-center gap-4 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex items-center gap-2">
                <HiUser className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCalendar className="w-4 h-4" />
                <span>{formatDate(post.date, language)}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiClock className="w-4 h-4" />
                <span>{post.readTime[language]}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <HiTag
                  className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 text-xs rounded-md ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <article
            className={`prose prose-lg max-w-none ${
              theme === "dark"
                ? "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-gray-800"
                : "prose-gray prose-headings:text-gray-900 prose-p:text-gray-700"
            }`}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(post.content[language]),
            }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <button
                onClick={onBack}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {language === "es" ? "Ver más artículos" : "View more articles"}
              </button>
            </div>
          </footer>
        </motion.div>
      </div>
    </>
  );
};
