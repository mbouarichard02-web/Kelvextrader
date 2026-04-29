import { describe, it, expect, beforeEach } from "vitest";
import { BlogService } from "./blogService";
import { VideoScriptService } from "./videoScriptService";
import { SocialResponseService } from "./socialResponseService";

describe("Content Services", () => {
  // ═══════════════════════════════════
  // BLOG SERVICE TESTS
  // ═══════════════════════════════════

  describe("BlogService", () => {
    it("should return all articles", async () => {
      const articles = await BlogService.getAllArticles();
      expect(articles).toHaveLength(3);
      expect(articles[0]).toHaveProperty("title");
      expect(articles[0]).toHaveProperty("slug");
    });

    it("should filter articles by level", async () => {
      const beginnerArticles = await BlogService.getArticlesByLevel("beginner");
      expect(beginnerArticles).toHaveLength(1);
      expect(beginnerArticles[0].level).toBe("beginner");

      const intermediateArticles = await BlogService.getArticlesByLevel("intermediate");
      expect(intermediateArticles).toHaveLength(1);
      expect(intermediateArticles[0].level).toBe("intermediate");

      const professionalArticles = await BlogService.getArticlesByLevel("professional");
      expect(professionalArticles).toHaveLength(1);
      expect(professionalArticles[0].level).toBe("professional");
    });

    it("should get article by slug", async () => {
      const article = await BlogService.getArticleBySlug("apprendre-trading-debutant-guide-complet");
      expect(article).toBeDefined();
      expect(article?.title).toContain("apprendre");
      expect(article?.level).toBe("beginner");
    });

    it("should return null for non-existent slug", async () => {
      const article = await BlogService.getArticleBySlug("non-existent-slug");
      expect(article).toBeNull();
    });

    it("should generate JSON-LD for article", async () => {
      const articles = await BlogService.getAllArticles();
      const jsonLD = BlogService.generateJsonLD(articles[0]);

      expect(jsonLD["@context"]).toBe("https://schema.org");
      expect(jsonLD["@type"]).toBe("Article");
      expect(jsonLD.headline).toBeDefined();
      expect(jsonLD.description).toBeDefined();
      expect(jsonLD.author).toBeDefined();
      expect(jsonLD.publisher).toBeDefined();
    });

    it("should search articles by keyword", async () => {
      const results = await BlogService.searchByKeyword("trading");
      expect(results.length).toBeGreaterThan(0);
      const hasTrading = results[0].title.toLowerCase().includes("trading") || 
                        results[0].content.toLowerCase().includes("trading");
      expect(hasTrading).toBe(true);
    });

    it("should increment views", async () => {
      const article = await BlogService.getArticleBySlug("apprendre-trading-debutant-guide-complet");
      const initialViews = article?.views || 0;

      await BlogService.incrementViews("apprendre-trading-debutant-guide-complet");
      const updatedArticle = await BlogService.getArticleBySlug("apprendre-trading-debutant-guide-complet");

      expect(updatedArticle?.views).toBeGreaterThan(initialViews);
    });

    it("should increment likes", async () => {
      const article = await BlogService.getArticleBySlug("apprendre-trading-debutant-guide-complet");
      const initialLikes = article?.likes || 0;

      await BlogService.incrementLikes("apprendre-trading-debutant-guide-complet");
      const updatedArticle = await BlogService.getArticleBySlug("apprendre-trading-debutant-guide-complet");

      expect(updatedArticle?.likes).toBe(initialLikes + 1);
    });

    it("should get trending articles", async () => {
      const trending = await BlogService.getTrendingArticles(2);
      expect(trending.length).toBeLessThanOrEqual(2);
    });

    it("should generate sitemap XML", () => {
      const sitemap = BlogService.generateSitemap();
      expect(sitemap).toContain("<?xml");
      expect(sitemap).toContain("<urlset");
      expect(sitemap).toContain("<loc>");
      expect(sitemap).toContain("</urlset>");
    });
  });

  // ═══════════════════════════════════
  // VIDEO SCRIPT SERVICE TESTS
  // ═══════════════════════════════════

  describe("VideoScriptService", () => {
    it("should return all scripts", async () => {
      const scripts = await VideoScriptService.getAllScripts();
      expect(scripts).toHaveLength(4);
      expect(scripts[0]).toHaveProperty("title");
      expect(scripts[0]).toHaveProperty("platform");
    });

    it("should filter scripts by platform", async () => {
      const tiktokScripts = await VideoScriptService.getScriptsByPlatform("tiktok");
      expect(tiktokScripts.length).toBeGreaterThan(0);
      expect(tiktokScripts.every((s) => s.platform === "tiktok")).toBe(true);

      const youtubeScripts = await VideoScriptService.getScriptsByPlatform("youtube");
      expect(youtubeScripts).toHaveLength(1);
      expect(youtubeScripts[0].platform).toBe("youtube");
    });

    it("should get script by ID", async () => {
      const script = await VideoScriptService.getScriptById("video_tiktok_001");
      expect(script).toBeDefined();
      expect(script?.title).toContain("TikTok");
    });

    it("should return null for non-existent script ID", async () => {
      const script = await VideoScriptService.getScriptById("non-existent-id");
      expect(script).toBeNull();
    });

    it("should generate Remotion config", async () => {
      const scripts = await VideoScriptService.getAllScripts();
      const config = VideoScriptService.generateRemotionConfig(scripts[0]);

      expect(config.scriptId).toBeDefined();
      expect(config.duration).toBeDefined();
      expect(config.fps).toBe(30);
      expect(config.branding).toBeDefined();
      expect(config.scenes).toBeDefined();
    });

    it("should generate TikTok content", async () => {
      const scripts = await VideoScriptService.getAllScripts();
      const tiktokScript = scripts.find((s) => s.platform === "tiktok");

      if (tiktokScript) {
        const content = VideoScriptService.generateTikTokContent(tiktokScript);
        expect(content).toContain(tiktokScript.title);
        expect(content).toContain("Voix Off");
        expect(content).toContain("Instructions Remotion");
      }
    });

    it("should generate YouTube content", async () => {
      const scripts = await VideoScriptService.getAllScripts();
      const youtubeScript = scripts.find((s) => s.platform === "youtube");

      if (youtubeScript) {
        const content = VideoScriptService.generateYouTubeContent(youtubeScript);
        expect(content).toContain(youtubeScript.title);
        expect(content).toContain("Chapitres");
        expect(content).toContain("Description");
      }
    });

    it("should filter scripts by audience", async () => {
      const scripts = await VideoScriptService.getScriptsByAudience("Débutants");
      expect(scripts.length).toBeGreaterThan(0);
    });

    it("should filter scripts by hook type", async () => {
      const scripts = await VideoScriptService.getScriptsByHookType("Educational");
      expect(scripts.length).toBeGreaterThan(0);
    });
  });

  // ═══════════════════════════════════
  // SOCIAL RESPONSE SERVICE TESTS
  // ═══════════════════════════════════

  describe("SocialResponseService", () => {
    it("should return all responses", async () => {
      const responses = await SocialResponseService.getAllResponses();
      expect(responses.length).toBeGreaterThan(0);
      expect(responses[0]).toHaveProperty("trigger");
      expect(responses[0]).toHaveProperty("response");
    });

    it("should filter responses by category", async () => {
      const capitalResponses = await SocialResponseService.getResponsesByCategory("Capital Minimum");
      expect(capitalResponses.length).toBeGreaterThan(0);
      expect(capitalResponses.every((r) => r.category === "Capital Minimum")).toBe(true);
    });

    it("should get response by trigger", async () => {
      const response = await SocialResponseService.getResponseByTrigger(
        "Quel est le capital minimum pour débuter le trading ?"
      );
      expect(response).toBeDefined();
      expect(response?.response).toContain("5$");
    });

    it("should return null for non-existent trigger", async () => {
      const response = await SocialResponseService.getResponseByTrigger("Non-existent question");
      expect(response).toBeNull();
    });

    it("should filter responses by platform", async () => {
      const twitterResponses = await SocialResponseService.getResponsesByPlatform("twitter");
      expect(twitterResponses.length).toBeGreaterThan(0);
    });

    it("should search responses", async () => {
      const results = await SocialResponseService.searchResponses("capital");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should get unique categories", async () => {
      const categories = await SocialResponseService.getCategories();
      expect(categories).toContain("Capital Minimum");
      expect(categories).toContain("Rentabilité");
      expect(categories).toContain("Gestion du Risque");
    });

    it("should filter responses by tone", async () => {
      const friendlyResponses = await SocialResponseService.getResponsesByTone("friendly");
      expect(friendlyResponses.length).toBeGreaterThan(0);
      expect(friendlyResponses.every((r) => r.tone === "friendly")).toBe(true);
    });

    it("should format response for platform", async () => {
      const responses = await SocialResponseService.getAllResponses();
      const response = responses[0];

      const twitterFormatted = SocialResponseService.formatForPlatform(response, "twitter");
      expect(typeof twitterFormatted).toBe("string");

      const linkedinFormatted = SocialResponseService.formatForPlatform(response, "linkedin");
      expect(typeof linkedinFormatted).toBe("string");
    });

    it("should generate chat response", async () => {
      const response = await SocialResponseService.generateChatResponse("capital minimum");
      expect(response).toContain("5$");
    });

    it("should handle non-matching questions gracefully", async () => {
      const response = await SocialResponseService.generateChatResponse("xyz123abc");
      expect(typeof response).toBe("string");
    });
  });

  // ═══════════════════════════════════
  // INTEGRATION TESTS
  // ═══════════════════════════════════

  describe("Integration Tests", () => {
    it("should have articles with valid SEO metadata", async () => {
      const articles = await BlogService.getAllArticles();

      articles.forEach((article) => {
        expect(article.seoMetadata).toBeDefined();
        expect(article.seoMetadata.description).toBeTruthy();
        expect(article.seoMetadata.ogImage).toBeTruthy();
        expect(article.seoMetadata.canonical).toBeTruthy();
      });
    });

    it("should have video scripts with Remotion instructions", async () => {
      const scripts = await VideoScriptService.getAllScripts();

      scripts.forEach((script) => {
        expect(script.remotionInstructions).toBeDefined();
        expect(script.remotionInstructions.length).toBeGreaterThan(0);
      });
    });

    it("should have social responses with CTAs", async () => {
      const responses = await SocialResponseService.getAllResponses();

      responses.forEach((response) => {
        expect(response.cta).toBeTruthy();
        expect(typeof response.cta).toBe("string");
        expect(response.cta.length).toBeGreaterThan(0);
      });
    });

    it("should have consistent article keywords", async () => {
      const articles = await BlogService.getAllArticles();

      articles.forEach((article) => {
        expect(Array.isArray(article.keywords)).toBe(true);
        expect(article.keywords.length).toBeGreaterThan(0);
        expect(article.keywords.every((k) => typeof k === "string")).toBe(true);
      });
    });

    it("should have video scripts with proper timing", async () => {
      const scripts = await VideoScriptService.getAllScripts();

      scripts.forEach((script) => {
        expect(script.duration).toBeGreaterThan(0);
        script.script.forEach((block) => {
          expect(block.duration.start).toBeLessThan(block.duration.end);
          expect(block.duration.end).toBeLessThanOrEqual(script.duration);
        });
      });
    });
  });
});
