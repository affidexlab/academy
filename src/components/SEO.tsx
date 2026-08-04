import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  /** Path after the domain, e.g. "" or "/about" */
  path?: string;
  image?: string;
  /** Set true on error/utility pages (e.g. 404) so they aren't indexed */
  noindex?: boolean;
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets the document title and meta/OG/Twitter tags for the current route.
 * Mount this once near the top of each page component.
 */
export default function SEO({ title, description, path = "", image = "/logo.png", noindex = false }: SEOProps) {
  useEffect(() => {
    const fullUrl = `https://affidexacademy.com.ng${path}`;

    document.title = title;

    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", noindex ? "noindex, follow" : "index, follow");

    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", fullUrl);
    setMetaTag("property", "og:image", image);

    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // Schema.org Structured Data
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Affidex Academy",
      "url": "https://affidexacademy.com.ng",
      "logo": "https://affidexacademy.com.ng/logo.png",
      "description": "Leading provider of vocational education and digital technology training in Uyo, Nigeria.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "50 Udo Udoma Avenue",
        "addressLocality": "Uyo",
        "addressRegion": "Akwa Ibom State",
        "addressCountry": "NG"
      },
      "sameAs": [
        "https://facebook.com",
        "https://twitter.com",
        "https://linkedin.com",
        "https://instagram.com"
      ]
    };
    schemaScript.textContent = JSON.stringify(schemaData);
  }, [title, description, path, image, noindex]);

  return null;
}
