import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiTag,
} from "react-icons/fi";
import { formatDate } from "../../data/blogData";

const BlogPost = ({ post, language, onBack }) => {
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {language === "es" ? "Post no encontrado" : "Post not found"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft />
            {language === "es" ? "Volver al blog" : "Back to blog"}
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        {/* Post Header */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              {post.category[language]}
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title[language]}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.excerpt[language]}
            </p>
          </motion.div>

          {/* Post Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 text-sm"
          >
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4" />
              <span>{post.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt, language)}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              <span>{post.readTime[language]}</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={post.image}
                alt={post.title[language]}
                className="w-full h-64 lg:h-96 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </motion.div>
          )}
        </header>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content[language].replace(/\n/g, "<br />"),
            }}
          />
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiTag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {language === "es" ? "Etiquetas:" : "Tags:"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FiArrowLeft />
            {language === "es" ? "Volver al blog" : "Back to blog"}
          </button>
        </motion.div>
      </motion.article>

      <style jsx>{`
        .blog-content {
          line-height: 1.8;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .dark .blog-content h1,
        .dark .blog-content h2,
        .dark .blog-content h3,
        .dark .blog-content h4,
        .dark .blog-content h5,
        .dark .blog-content h6 {
          color: #f9fafb;
        }

        .blog-content h2 {
          font-size: 1.875rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }

        .dark .blog-content h2 {
          border-bottom-color: #374151;
        }

        .blog-content h3 {
          font-size: 1.5rem;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          color: #4b5563;
        }

        .dark .blog-content p {
          color: #d1d5db;
        }

        .blog-content code {
          background-color: #f3f4f6;
          color: #ef4444;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .dark .blog-content code {
          background-color: #374151;
          color: #fca5a5;
        }

        .blog-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .blog-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }

        .dark .blog-content li {
          color: #d1d5db;
        }

        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .dark .blog-content blockquote {
          color: #9ca3af;
        }

        .blog-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .dark .blog-content strong {
          color: #f9fafb;
        }

        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .blog-content a:hover {
          color: #2563eb;
        }

        .dark .blog-content a {
          color: #60a5fa;
        }

        .dark .blog-content a:hover {
          color: #93c5fd;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
