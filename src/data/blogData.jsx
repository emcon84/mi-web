// Import all articles
import { tailwindMigrationArticle } from "./articles/tailwind-migration.js";
import { reactHooksArticle } from "./articles/react-hooks.js";
import { performanceOptimizationArticle } from "./articles/performance-optimization.js";
import { nextjsGuideArticle } from "./articles/nextjs-guide.js";
import { webAccessibilityArticle } from "./articles/web-accessibility.js";
import { testingReactArticle } from "./articles/testing-react.js";

// Blog data array
export const blogData = [
  tailwindMigrationArticle,
  reactHooksArticle,
  performanceOptimizationArticle,
  nextjsGuideArticle,
  webAccessibilityArticle,
  testingReactArticle,
];

// Utility functions for blog management
export const getPostById = (id) => {
  return blogData.find((post) => post.id === id);
};

export const getPostsByCategory = (category) => {
  return blogData.filter(
    (post) =>
      post.category.es.toLowerCase() === category.toLowerCase() ||
      post.category.en.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedPosts = () => {
  return blogData.filter((post) => post.featured);
};

export const getCategories = (language = "es") => {
  const categories = [
    ...new Set(blogData.map((post) => post.category[language])),
  ];
  return ["all", ...categories];
};

export const formatDate = (dateString, language = "es") => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(
    language === "es" ? "es-ES" : "en-US",
    options
  );
};

export const searchPosts = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return blogData.filter(
    (post) =>
      post.title.es.toLowerCase().includes(term) ||
      post.title.en.toLowerCase().includes(term) ||
      post.excerpt.es.toLowerCase().includes(term) ||
      post.excerpt.en.toLowerCase().includes(term) ||
      post.tags.some((tag) => tag.toLowerCase().includes(term))
  );
};

export const getRelatedPosts = (currentPostId, limit = 3) => {
  const currentPost = getPostById(currentPostId);
  if (!currentPost) return [];

  return blogData
    .filter((post) => post.id !== currentPostId)
    .filter(
      (post) =>
        // Match by category or tags
        post.category.es === currentPost.category.es ||
        post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
};

export default blogData;
