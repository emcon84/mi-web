import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  getPostBySlug,
} from "../../data/blogData";
import { SEOHead } from "../SEO/SEOHead";
import { BlogPost } from "../BlogPost/BlogPostNew";

export const ModernBlog = ({
  language = "es",
  theme = "dark",
  currentArticleSlug = null,
  onArticleSelect,
  onBackToBlog,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPost, setCurrentPost] = useState(null);

  // Ensure scroll is enabled when blog component mounts
  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("allow-scroll", "blog-view");
    document.getElementById("root").classList.add("blog-view");

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove("blog-view");
      document.getElementById("root").classList.remove("blog-view");
    };
  }, []);

  // Handle article slug from URL
  useEffect(() => {
    if (currentArticleSlug) {
      const post = getPostBySlug(currentArticleSlug);
      if (post) {
        setCurrentPost(post);
      }
    } else {
      setCurrentPost(null);
    }
  }, [currentArticleSlug]);

  // Si hay un post seleccionado, mostrar el componente BlogPost
  if (currentPost) {
    return (
      <BlogPost
        post={currentPost}
        language={language}
        theme={theme}
        onBack={onBackToBlog || (() => setCurrentPost(null))}
      />
    );
  }

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

  // Función para mostrar el post completo
  const showFullPost = (post) => {
    if (onArticleSelect) {
      // Use URL routing
      onArticleSelect(post.slug);
    } else {
      // Fallback to local state
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setCurrentPost(post);
      }, 200);
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
                      onClick={() => showFullPost(post)}
                      className={`group cursor-pointer backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/50"
                          : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-xl hover:border-blue-500/50"
                      }`}
                    >
                      {/* Featured Image */}
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title[language]}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

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
                  onClick={() => showFullPost(post)}
                  className={`group cursor-pointer backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/50"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-lg hover:border-blue-500/50"
                  }`}
                >
                  {/* Article Image */}
                  <div className="relative h-32 md:h-36 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title[language]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

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
