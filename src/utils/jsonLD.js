import siteData from "../data/siteData.json";
import { slugify } from "./slugify";

export default function jsonLDGenerator({ type, post, url }) {
  const siteUrl = import.meta.env.SITE || "https://globaltechsignal.com";

  if (type === "post" && post) {
    const postTitle = post.title || "";
    const postDesc = post.summary || post.description || siteData.description;
    const postDate = post.pubDate ? new Date(post.pubDate).toISOString() : (post.date || new Date().toISOString());
    const imageSrc = post.image
      ? (typeof post.image === "string" ? `${siteUrl}/blog/${post.image}` : (post.image.src || `${siteUrl}${siteData.image.src}`))
      : `${siteUrl}${siteData.image.src}`;
    const authorName = post.author || "GlobalTechSignal Team";

    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "headline": postTitle,
      "description": postDesc,
      "image": imageSrc,
      "author": {
        "@type": "Person",
        "name": authorName
      },
      "publisher": {
        "@type": "Organization",
        "name": siteData.title,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/Logo.svg`
        }
      },
      "datePublished": postDate,
      "dateModified": postDate
    };

    return `<script type="application/ld+json">${JSON.stringify(blogPostingSchema)}</script>`;
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": siteData.title,
    "url": siteUrl,
    "logo": `${siteUrl}/Logo.svg`,
    "image": `${siteUrl}${siteData.image.src}`,
    "description": siteData.description,
    "sameAs": [
      "https://linkedin.com/company/global-tech-signal"
    ]
  };

  return `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`;
}

