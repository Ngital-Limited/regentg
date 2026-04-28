import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://regentgroup.com.bd";
const DEFAULT_IMAGE = `${SITE_URL}/regent-dark-logo.png`;
const SCHEMA_ID = "seo-jsonld-schema";

const upsertMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SEO = ({ title, description, path = "/", image, type = "website", jsonLd }: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;
  const fullTitle = title.includes("Regent") ? title : `${title} | Regent Design & Development Ltd`;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertLink("canonical", url);

    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage);

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // JSON-LD: Organization, WebSite, WebPage/Article + page-specific
    const organizationSchema = {
      "@type": "RealEstateAgent",
      name: "Regent Design & Development Ltd",
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      image: DEFAULT_IMAGE,
      description:
        "Regent Design & Development Ltd is a premier real estate developer in Bangladesh, delivering luxury residential and commercial projects.",
      address: { "@type": "PostalAddress", addressCountry: "BD", addressLocality: "Dhaka" },
    };
    const websiteSchema = {
      "@type": "WebSite",
      name: "Regent Design & Development Ltd",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/projects?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
    const webPageSchema = {
      "@type": type === "article" ? "Article" : "WebPage",
      name: fullTitle,
      description,
      url,
      image: ogImage,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Regent Design & Development Ltd" },
    };

    const extra: Record<string, unknown>[] = [];
    if (jsonLd) {
      if (Array.isArray(jsonLd)) extra.push(...jsonLd);
      else extra.push(jsonLd);
    }

    const graph = {
      "@context": "https://schema.org",
      "@graph": [organizationSchema, websiteSchema, webPageSchema, ...extra].map((s) => {
        const { ["@context"]: _ctx, ...rest } = s as Record<string, unknown>;
        return rest;
      }),
    };

    let scriptEl = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.id = SCHEMA_ID;
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(graph);
  }, [fullTitle, description, url, ogImage, type, jsonLd]);

  return null;
};

export default SEO;
