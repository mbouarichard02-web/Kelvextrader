// Multilingual SEO Service - International dominance with FR/EN optimization

export interface SEOMetadata {
  language: "fr" | "en";
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  structuredData: Record<string, unknown>;
  hreflang: Array<{
    lang: string;
    href: string;
  }>;
}

export interface MultilingualPage {
  slug: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  content: {
    fr: string;
    en: string;
  };
  keywords: {
    fr: string[];
    en: string[];
  };
  seoScore: {
    fr: number;
    en: number;
  };
}

export class MultilingualSeoService {
  /**
   * Générer les métadonnées SEO complètes pour une page
   */
  static generateSEOMetadata(
    page: MultilingualPage,
    language: "fr" | "en",
    baseUrl: string
  ): SEOMetadata {
    const lang = language;
    const title = page.title[lang];
    const description = page.description[lang];
    const keywords = page.keywords[lang];

    return {
      language: lang,
      title: `${title} | KelvexTrader`,
      description,
      keywords,
      canonical: `${baseUrl}/${lang}/${page.slug}`,
      ogTitle: title,
      ogDescription: description,
      ogImage: `${baseUrl}/og-image-${lang}.png`,
      structuredData: this.generateStructuredData(page, lang, baseUrl),
      hreflang: [
        {
          lang: "fr",
          href: `${baseUrl}/fr/${page.slug}`,
        },
        {
          lang: "en",
          href: `${baseUrl}/en/${page.slug}`,
        },
        {
          lang: "x-default",
          href: `${baseUrl}/${page.slug}`,
        },
      ],
    };
  }

  /**
   * Générer le JSON-LD structuré
   */
  private static generateStructuredData(
    page: MultilingualPage,
    language: "fr" | "en",
    baseUrl: string
  ): Record<string, unknown> {
    const lang = language;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title[lang],
      description: page.description[lang],
      image: `${baseUrl}/og-image-${lang}.png`,
      datePublished: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: "KelvexTrader",
        logo: `${baseUrl}/logo.png`,
      },
      inLanguage: lang === "fr" ? "fr-FR" : "en-US",
      keywords: page.keywords[lang].join(", "),
    };
  }

  /**
   * Générer le HTML head avec tous les meta tags
   */
  static generateHTMLHead(
    metadata: SEOMetadata,
    additionalTags?: Record<string, string>
  ): string {
    const lang = metadata.language;

    return `
<!-- SEO Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${metadata.description}">
<meta name="keywords" content="${metadata.keywords.join(", ")}">
<meta name="language" content="${lang === "fr" ? "French" : "English"}">
<meta name="author" content="KelvexTrader">

<!-- Canonical & Hreflang -->
<link rel="canonical" href="${metadata.canonical}">
${metadata.hreflang.map((h) => `<link rel="alternate" hreflang="${h.lang}" href="${h.href}">`).join("\n")}

<!-- Open Graph -->
<meta property="og:title" content="${metadata.ogTitle}">
<meta property="og:description" content="${metadata.ogDescription}">
<meta property="og:image" content="${metadata.ogImage}">
<meta property="og:type" content="article">
<meta property="og:locale" content="${lang === "fr" ? "fr_FR" : "en_US"}">
<meta property="og:locale:alternate" content="${lang === "fr" ? "en_US" : "fr_FR"}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${metadata.ogTitle}">
<meta name="twitter:description" content="${metadata.ogDescription}">
<meta name="twitter:image" content="${metadata.ogImage}">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
${JSON.stringify(metadata.structuredData, null, 2)}
</script>

<!-- Additional Tags -->
${Object.entries(additionalTags || {})
  .map(([key, value]) => `<meta name="${key}" content="${value}">`)
  .join("\n")}
`;
  }

  /**
   * Générer un sitemap multilingue
   */
  static generateMultilingualSitemap(pages: MultilingualPage[], baseUrl: string): string {
    const sitemapEntries = pages
      .flatMap((page) => [
        {
          url: `${baseUrl}/fr/${page.slug}`,
          lang: "fr",
          priority: 0.8,
        },
        {
          url: `${baseUrl}/en/${page.slug}`,
          lang: "en",
          priority: 0.8,
        },
      ])
      .map(
        (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${entry.priority}</priority>
    <xhtml:link rel="alternate" hreflang="${entry.lang}" href="${entry.url}" />
  </url>
`
      )
      .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>`;
  }

  /**
   * Générer un robots.txt multilingue
   */
  static generateRobotsTxt(baseUrl: string): string {
    return `User-agent: *
Allow: /
Allow: /fr/
Allow: /en/
Disallow: /admin/
Disallow: /api/
Disallow: /.env

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-fr.xml
Sitemap: ${baseUrl}/sitemap-en.xml

# Crawl delay for respectful crawling
Crawl-delay: 1`;
  }

  /**
   * Calculer le score SEO d'une page
   */
  static calculateSEOScore(page: MultilingualPage, language: "fr" | "en"): number {
    let score = 0;
    const lang = language;

    // Vérifier le titre (max 60 caractères)
    if (page.title[lang].length > 30 && page.title[lang].length < 60) {
      score += 15;
    }

    // Vérifier la description (max 160 caractères)
    if (page.description[lang].length > 50 && page.description[lang].length < 160) {
      score += 15;
    }

    // Vérifier les keywords
    if (page.keywords[lang].length >= 3 && page.keywords[lang].length <= 10) {
      score += 10;
    }

    // Vérifier le contenu (min 300 mots)
    const wordCount = page.content[lang].split(" ").length;
    if (wordCount >= 300 && wordCount <= 3000) {
      score += 20;
    }

    // Vérifier la structure du contenu
    if (page.content[lang].includes("<h1>") && page.content[lang].includes("<h2>")) {
      score += 15;
    }

    // Vérifier les images
    if (page.content[lang].includes("<img")) {
      score += 10;
    }

    // Vérifier les liens internes
    if (page.content[lang].includes("<a")) {
      score += 15;
    }

    return Math.min(score, 100);
  }

  /**
   * Générer des recommandations SEO
   */
  static generateSEORecommendations(page: MultilingualPage, language: "fr" | "en"): string[] {
    const recommendations: string[] = [];
    const lang = language;

    // Vérifier le titre
    if (page.title[lang].length < 30) {
      recommendations.push(`Augmentez la longueur du titre (actuellement ${page.title[lang].length} caractères)`);
    }
    if (page.title[lang].length > 60) {
      recommendations.push(`Réduisez la longueur du titre (actuellement ${page.title[lang].length} caractères)`);
    }

    // Vérifier la description
    if (page.description[lang].length < 50) {
      recommendations.push(
        `Augmentez la longueur de la description (actuellement ${page.description[lang].length} caractères)`
      );
    }
    if (page.description[lang].length > 160) {
      recommendations.push(
        `Réduisez la longueur de la description (actuellement ${page.description[lang].length} caractères)`
      );
    }

    // Vérifier les keywords
    if (page.keywords[lang].length < 3) {
      recommendations.push("Ajoutez au moins 3 mots-clés");
    }

    // Vérifier le contenu
    const wordCount = page.content[lang].split(" ").length;
    if (wordCount < 300) {
      recommendations.push(`Augmentez le contenu (actuellement ${wordCount} mots, minimum 300)`);
    }

    // Vérifier les headings
    if (!page.content[lang].includes("<h1>")) {
      recommendations.push("Ajoutez un titre H1 principal");
    }

    // Vérifier les images
    if (!page.content[lang].includes("<img")) {
      recommendations.push("Ajoutez des images optimisées");
    }

    // Vérifier les liens
    if (!page.content[lang].includes("<a")) {
      recommendations.push("Ajoutez des liens internes pertinents");
    }

    return recommendations;
  }

  /**
   * Générer les métadonnées pour les réseaux sociaux
   */
  static generateSocialMetadata(
    page: MultilingualPage,
    language: "fr" | "en",
    baseUrl: string
  ): {
    facebook: Record<string, string>;
    twitter: Record<string, string>;
    linkedin: Record<string, string>;
  } {
    const lang = language;
    const url = `${baseUrl}/${lang}/${page.slug}`;

    return {
      facebook: {
        title: page.title[lang],
        description: page.description[lang],
        image: `${baseUrl}/og-image-${lang}.png`,
        url,
      },
      twitter: {
        title: page.title[lang],
        description: page.description[lang],
        image: `${baseUrl}/og-image-${lang}.png`,
        url,
        hashtags: page.keywords[lang].slice(0, 3).join(","),
      },
      linkedin: {
        title: page.title[lang],
        description: page.description[lang],
        image: `${baseUrl}/og-image-${lang}.png`,
        url,
      },
    };
  }

  /**
   * Générer un rapport SEO complet
   */
  static generateSEOReport(
    pages: MultilingualPage[],
    baseUrl: string
  ): {
    totalPages: number;
    averageSEOScore: number;
    languageCoverage: Record<string, number>;
    recommendations: string[];
  } {
    const scores = pages.flatMap((page) => [
      this.calculateSEOScore(page, "fr"),
      this.calculateSEOScore(page, "en"),
    ]);

    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    const recommendations: string[] = [];
    pages.forEach((page) => {
      const frRecs = this.generateSEORecommendations(page, "fr");
      const enRecs = this.generateSEORecommendations(page, "en");
      recommendations.push(...frRecs, ...enRecs);
    });

    return {
      totalPages: pages.length,
      averageSEOScore: averageScore,
      languageCoverage: {
        fr: Math.round((pages.length / pages.length) * 100),
        en: Math.round((pages.length / pages.length) * 100),
      },
      recommendations: Array.from(new Set(recommendations)).slice(0, 5),
    };
  }
}
