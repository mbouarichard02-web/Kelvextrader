import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { BlogService } from "../services/blogService";
import { VideoScriptService } from "../services/videoScriptService";
import { SocialResponseService } from "../services/socialResponseService";

export const contentRouter = router({
  // ═══════════════════════════════════
  // BLOG PROCEDURES
  // ═══════════════════════════════════

  blog: router({
    // Récupérer tous les articles
    getAllArticles: publicProcedure.query(async () => {
      const articles = await BlogService.getAllArticles();
      return articles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        level: article.level,
        readingTime: article.readingTime,
        views: article.views,
        likes: article.likes,
      }));
    }),

    // Récupérer les articles par niveau
    getByLevel: publicProcedure
      .input(z.enum(["beginner", "intermediate", "professional"]))
      .query(async ({ input }) => {
        const articles = await BlogService.getArticlesByLevel(input);
        return articles.map((article) => ({
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          level: article.level,
          readingTime: article.readingTime,
        }));
      }),

    // Récupérer un article complet par slug
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const article = await BlogService.getArticleBySlug(input);
        if (!article) {
          throw new Error("Article not found");
        }

        return {
          id: article.id,
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          level: article.level,
          keywords: article.keywords,
          readingTime: article.readingTime,
          seoMetadata: article.seoMetadata,
          jsonLD: BlogService.generateJsonLD(article),
          views: article.views,
          likes: article.likes,
        };
      }),

    // Récupérer les articles tendance
    getTrending: publicProcedure
      .input(z.number().optional())
      .query(async ({ input }) => {
        const articles = await BlogService.getTrendingArticles(input || 3);
        return articles.map((article) => ({
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          level: article.level,
          views: article.views,
        }));
      }),

    // Rechercher les articles
    search: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const articles = await BlogService.searchByKeyword(input);
        return articles.map((article) => ({
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          level: article.level,
        }));
      }),

    // Incrémenter les vues
    incrementViews: publicProcedure
      .input(z.string())
      .mutation(async ({ input }) => {
        await BlogService.incrementViews(input);
        return { success: true };
      }),

    // Incrémenter les likes
    incrementLikes: publicProcedure
      .input(z.string())
      .mutation(async ({ input }) => {
        await BlogService.incrementLikes(input);
        return { success: true };
      }),

    // Récupérer le sitemap
    getSitemap: publicProcedure.query(async () => {
      const sitemap = BlogService.generateSitemap();
      return { xml: sitemap };
    }),
  }),

  // ═══════════════════════════════════
  // VIDEO SCRIPTS PROCEDURES
  // ═══════════════════════════════════

  videos: router({
    // Récupérer tous les scripts
    getAllScripts: publicProcedure.query(async () => {
      const scripts = await VideoScriptService.getAllScripts();
      return scripts.map((script) => ({
        id: script.id,
        title: script.title,
        platform: script.platform,
        duration: script.duration,
        format: script.format,
        hookType: script.hookType,
        targetAudience: script.targetAudience,
        cta: script.cta,
        engagementTarget: script.engagementTarget,
      }));
    }),

    // Récupérer les scripts par plateforme
    getByPlatform: publicProcedure
      .input(z.enum(["tiktok", "youtube", "instagram"]))
      .query(async ({ input }) => {
        const scripts = await VideoScriptService.getScriptsByPlatform(input);
        return scripts.map((script) => ({
          id: script.id,
          title: script.title,
          duration: script.duration,
          hookType: script.hookType,
          engagementTarget: script.engagementTarget,
        }));
      }),

    // Récupérer un script complet par ID
    getById: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const script = await VideoScriptService.getScriptById(input);
        if (!script) {
          throw new Error("Script not found");
        }

        return {
          id: script.id,
          title: script.title,
          platform: script.platform,
          duration: script.duration,
          format: script.format,
          hookType: script.hookType,
          targetAudience: script.targetAudience,
          cta: script.cta,
          script: script.script,
          remotionInstructions: script.remotionInstructions,
          remotionConfig: VideoScriptService.generateRemotionConfig(script),
        };
      }),

    // Récupérer les scripts par audience
    getByAudience: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const scripts = await VideoScriptService.getScriptsByAudience(input);
        return scripts.map((script) => ({
          id: script.id,
          title: script.title,
          targetAudience: script.targetAudience,
          duration: script.duration,
        }));
      }),

    // Récupérer les scripts par type de hook
    getByHookType: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const scripts = await VideoScriptService.getScriptsByHookType(input);
        return scripts.map((script) => ({
          id: script.id,
          title: script.title,
          hookType: script.hookType,
          duration: script.duration,
        }));
      }),

    // Générer le contenu TikTok
    generateTikTokContent: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const script = await VideoScriptService.getScriptById(input);
        if (!script) {
          throw new Error("Script not found");
        }
        const content = VideoScriptService.generateTikTokContent(script);
        return { content };
      }),

    // Générer le contenu YouTube
    generateYouTubeContent: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const script = await VideoScriptService.getScriptById(input);
        if (!script) {
          throw new Error("Script not found");
        }
        const content = VideoScriptService.generateYouTubeContent(script);
        return { content };
      }),
  }),

  // ═══════════════════════════════════
  // SOCIAL RESPONSES PROCEDURES
  // ═══════════════════════════════════

  social: router({
    // Récupérer toutes les réponses
    getAllResponses: publicProcedure.query(async () => {
      const responses = await SocialResponseService.getAllResponses();
      return responses.map((response) => ({
        id: response.id,
        category: response.category,
        trigger: response.trigger,
        platform: response.platform,
        tone: response.tone,
      }));
    }),

    // Récupérer les réponses par catégorie
    getByCategory: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const responses = await SocialResponseService.getResponsesByCategory(input);
        return responses.map((response) => ({
          id: response.id,
          trigger: response.trigger,
          response: response.response,
          cta: response.cta,
        }));
      }),

    // Récupérer une réponse par trigger
    getByTrigger: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const response = await SocialResponseService.getResponseByTrigger(input);
        if (!response) {
          throw new Error("Response not found");
        }

        return {
          id: response.id,
          trigger: response.trigger,
          response: response.response,
          platform: response.platform,
          tone: response.tone,
          cta: response.cta,
          hashtags: response.hashtags,
        };
      }),

    // Récupérer les réponses par plateforme
    getByPlatform: publicProcedure
      .input(z.enum(["twitter", "linkedin", "instagram", "tiktok", "generic"]))
      .query(async ({ input }) => {
        const responses = await SocialResponseService.getResponsesByPlatform(input);
        return responses.map((response) => ({
          id: response.id,
          trigger: response.trigger,
          response: response.response,
          cta: response.cta,
        }));
      }),

    // Rechercher les réponses
    search: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const responses = await SocialResponseService.searchResponses(input);
        return responses.map((response) => ({
          id: response.id,
          trigger: response.trigger,
          response: response.response,
          category: response.category,
        }));
      }),

    // Récupérer les catégories
    getCategories: publicProcedure.query(async () => {
      const categories = await SocialResponseService.getCategories();
      return { categories };
    }),

    // Générer une réponse pour le chat
    generateChatResponse: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const response = await SocialResponseService.generateChatResponse(input);
        return { response };
      }),

    // Formater pour une plateforme
    formatForPlatform: publicProcedure
      .input(
        z.object({
          responseId: z.string(),
          platform: z.enum(["twitter", "linkedin", "instagram", "tiktok"]),
        })
      )
      .query(async ({ input }) => {
        const response = await SocialResponseService.getResponseByTrigger(input.responseId);
        if (!response) {
          throw new Error("Response not found");
        }

        const formatted = SocialResponseService.formatForPlatform(response, input.platform);
        return { formatted };
      }),
  }),
});
