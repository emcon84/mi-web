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
    
    // Add theme classes to body
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
    
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Cleanup function to remove blog-view classes when component unmounts
    return () => {
      document.body.classList.remove("blog-view", "dark-theme", "light-theme");
      document.getElementById("root").classList.remove("blog-view");
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
    };
  }, [post, theme]);

  // Handle back navigation with scroll
  const handleBack = () => {
    // Remove blog-view and theme classes before going back
    document.body.classList.remove("blog-view", "dark-theme", "light-theme");
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

  // Función simplificada para convertir Markdown básico a HTML
  const markdownToHtml = (markdown) => {
    if (!markdown) return "";

    const isDark = theme === "dark";

    return (
      markdown
        // Headers
        .replace(
          /^### (.*$)/gim,
          `<h3 class="text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}">$1</h3>`
        )
        .replace(
          /^## (.*$)/gim,
          `<h2 class="text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} border-b-2 border-blue-500 pb-2">$1</h2>`
        )
        .replace(
          /^# (.*$)/gim,
          `<h1 class="text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}">$1</h1>`
        )

        // Bloques de código
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
          const escapedCode = code
            .trim()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          return `<pre class="${isDark ? 'bg-gray-800 text-green-400' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto my-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'}"><code class="language-${lang || "text"}">${escapedCode}</code></pre>`;
        })

        // Código inline
        .replace(
          /`([^`]+)`/g,
          `<code class="${isDark ? 'bg-gray-700 text-red-400' : 'bg-gray-100 text-red-600'} px-2 py-1 rounded text-sm font-mono">$1</code>`
        )

        // Bold y cursiva
        .replace(
          /\*\*(.*?)\*\*/g,
          `<strong class="font-bold ${isDark ? 'text-white' : 'text-gray-900'}">$1</strong>`
        )
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          `<a href="$2" target="_blank" rel="noopener noreferrer" class="${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} hover:underline transition-colors">$1</a>`
        )

        // Listas
        .replace(/^- (.+$)/gim, '<li class="mb-2">$1</li>')
        .replace(/^\d+\. (.+$)/gim, '<li class="mb-2">$1</li>')

        // Párrafos
        .split("\n\n")
        .map((paragraph) => {
          paragraph = paragraph.trim();
          if (!paragraph) return "";

          // Si ya tiene etiquetas HTML de bloque, no envolver en <p>
          if (paragraph.match(/^<(h[1-6]|pre|code|ul|ol|li|blockquote)/)) {
            return paragraph;
          }

          // Si contiene elementos de lista, envolver en <ul>
          if (paragraph.includes("<li>")) {
            return `<ul class="list-disc list-inside mb-4 space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}">${paragraph}</ul>`;
          }

          // Párrafo normal
          return `<p class="mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed">${paragraph.replace(/\n/g, "<br>")}</p>`;
        })
        .join("\n")
    );
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

      <div className={`min-h-screen py-8 md:py-12 px-4 md:px-6 pt-20 md:pt-32 overflow-y-auto transition-colors duration-300`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`max-w-4xl mx-auto rounded-xl shadow-xl p-6 md:p-8 ${
            theme === "dark"
              ? "bg-gray-900/70 backdrop-blur-sm border border-gray-700/30"
              : "bg-white border border-gray-200"
          }`}
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

            {/* Meta information */}
            <div
              className={`flex flex-wrap gap-4 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <div className="flex items-center gap-1">
                <HiUser className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <HiCalendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt, language)}</span>
              </div>
              <div className="flex items-center gap-1">
                <HiClock className="w-4 h-4" />
                <span>{post.readTime[language]}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
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
            className="max-w-none"
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(post.content[language]),
            }}
          />

          {/* Article Footer */}
          <footer className={`mt-12 pt-8 border-t transition-colors ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}>
            <div className="text-center">
              <button
                onClick={handleBack}
                className="px-6 py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
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
