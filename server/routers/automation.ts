// Automation Router - tRPC procedures for SEO, Video Generation, and Pipeline

import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { MultilingualSeoService } from "../services/multilingualSeoService";
import { RemotionVideoGenerator, VideoScript } from "../services/remotionVideoGenerator";
import { AutomatedPipeline } from "../services/automatedPipeline";

export const automationRouter = router({
  // ============ SEO MULTILINGUE ============

  seo: router({
    /**
     * Générer les métadonnées SEO pour une page
     */
    generateMetadata: publicProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.record(z.string(), z.string()),
          description: z.record(z.string(), z.string()),
          keywords: z.record(z.string(), z.array(z.string())),
          content: z.record(z.string(), z.string()),
          language: z.enum(["fr", "en"]),
          baseUrl: z.string(),
        })
      )
      .query(({ input }: any) => {
        const page = {
          slug: input.slug,
          title: input.title as Record<"fr" | "en", string>,
          description: input.description as Record<"fr" | "en", string>,
          keywords: input.keywords as Record<"fr" | "en", string[]>,
          content: input.content as Record<"fr" | "en", string>,
          seoScore: { fr: 0, en: 0 },
        };

        return MultilingualSeoService.generateSEOMetadata(page, input.language, input.baseUrl);
      }),

    /**
     * Générer le HTML head avec tous les meta tags
     */
    generateHead: publicProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.record(z.string(), z.string()),
          description: z.record(z.string(), z.string()),
          keywords: z.record(z.string(), z.array(z.string())),
          content: z.record(z.string(), z.string()),
          language: z.enum(["fr", "en"]),
          baseUrl: z.string(),
        })
      )
      .query(({ input }: any) => {
        const page = {
          slug: input.slug,
          title: input.title as Record<"fr" | "en", string>,
          description: input.description as Record<"fr" | "en", string>,
          keywords: input.keywords as Record<"fr" | "en", string[]>,
          content: input.content as Record<"fr" | "en", string>,
          seoScore: { fr: 0, en: 0 },
        };

        const metadata = MultilingualSeoService.generateSEOMetadata(page, input.language, input.baseUrl);
        return MultilingualSeoService.generateHTMLHead(metadata);
      }),

    /**
     * Générer un sitemap multilingue
     */
    generateSitemap: publicProcedure
      .input(
        z.object({
          pages: z.array(
            z.object({
              slug: z.string(),
              title: z.record(z.string(), z.string()),
              description: z.record(z.string(), z.string()),
              keywords: z.record(z.string(), z.array(z.string())),
              content: z.record(z.string(), z.string()),
            })
          ),
          baseUrl: z.string(),
        })
      )
      .query(({ input }: any) => {
        const pages = input.pages.map((p: any) => ({
          ...p,
          seoScore: { fr: 0, en: 0 },
        }));
        return MultilingualSeoService.generateMultilingualSitemap(pages, input.baseUrl);
      }),

    /**
     * Générer un robots.txt
     */
    generateRobots: publicProcedure
      .input(z.object({ baseUrl: z.string() }))
      .query(({ input }: any) => {
        return MultilingualSeoService.generateRobotsTxt(input.baseUrl);
      }),

    /**
     * Calculer le score SEO
     */
    calculateScore: publicProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.record(z.string(), z.string()),
          description: z.record(z.string(), z.string()),
          keywords: z.record(z.string(), z.array(z.string())),
          content: z.record(z.string(), z.string()),
          language: z.enum(["fr", "en"]),
        })
      )
      .query(({ input }: any) => {
        const page = {
          slug: input.slug,
          title: input.title as Record<"fr" | "en", string>,
          description: input.description as Record<"fr" | "en", string>,
          keywords: input.keywords as Record<"fr" | "en", string[]>,
          content: input.content as Record<"fr" | "en", string>,
          seoScore: { fr: 0, en: 0 },
        };

        return MultilingualSeoService.calculateSEOScore(page, input.language);
      }),

    /**
     * Générer des recommandations SEO
     */
    getRecommendations: publicProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.record(z.string(), z.string()),
          description: z.record(z.string(), z.string()),
          keywords: z.record(z.string(), z.array(z.string())),
          content: z.record(z.string(), z.string()),
          language: z.enum(["fr", "en"]),
        })
      )
      .query(({ input }: any) => {
        const page = {
          slug: input.slug,
          title: input.title as Record<"fr" | "en", string>,
          description: input.description as Record<"fr" | "en", string>,
          keywords: input.keywords as Record<"fr" | "en", string[]>,
          content: input.content as Record<"fr" | "en", string>,
          seoScore: { fr: 0, en: 0 },
        };

        return MultilingualSeoService.generateSEORecommendations(page, input.language);
      }),
  }),

  // ============ REMOTION VIDEO GENERATION ============

  video: router({
    /**
     * Générer une vidéo
     */
    generate: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          platform: z.enum(["tiktok", "youtube", "instagram"]),
          duration: z.number(),
          scenes: z.array(
            z.object({
              duration: z.number(),
              type: z.enum(["text", "image", "animation", "voiceover"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }: any) => {
        const script: VideoScript = {
          id: `script_${Date.now()}`,
          title: input.title,
          platform: input.platform,
          duration: input.duration,
          scenes: input.scenes as any[],
        };

        const video = await RemotionVideoGenerator.generateVideo(script);
        return video;
      }),

    /**
     * Récupérer une vidéo générée
     */
    get: publicProcedure
      .input(z.object({ videoId: z.string() }))
      .query(({ input }: any) => {
        return RemotionVideoGenerator.getVideo(input.videoId as string);
      }),

    /**
     * Récupérer toutes les vidéos
     */
    getAll: publicProcedure.query(() => {
      return RemotionVideoGenerator.getAllVideos();
    }),

    /**
     * Générer un batch de 2 vidéos
     */
    generateBatch: protectedProcedure
      .input(
        z.object({
          scripts: z.array(
            z.object({
              title: z.string(),
              platform: z.enum(["tiktok", "youtube", "instagram"]),
              duration: z.number(),
              scenes: z.array(
                z.object({
                  duration: z.number(),
                  type: z.enum(["text", "image", "animation", "voiceover"]),
                  content: z.string(),
                })
              ),
            })
          ),
        })
      )
      .mutation(async ({ input }: any) => {
        const scripts = input.scripts.map((s: any) => ({
          id: `script_${Date.now()}`,
          ...s,
          scenes: s.scenes as any[],
        }));

        return RemotionVideoGenerator.generateBatch(scripts);
      }),

    /**
     * Récupérer le rapport de production
     */
    getReport: publicProcedure.query(() => {
      return RemotionVideoGenerator.generateProductionReport();
    }),
  }),

  // ============ AUTOMATED PIPELINE ============

  pipeline: router({
    /**
     * Créer un nouveau job de pipeline
     */
    createJob: protectedProcedure
      .input(
        z.object({
          topic: z.string(),
          language: z.enum(["fr", "en"]),
          platform: z.enum(["tiktok", "youtube", "instagram"]),
        })
      )
      .mutation(async ({ input }: any) => {
        return AutomatedPipeline.createJob(input);
      }),

    /**
     * Récupérer un job
     */
    getJob: publicProcedure
      .input(z.object({ jobId: z.string() }))
      .query(({ input }: any) => {
        return AutomatedPipeline.getJob(input.jobId as string);
      }),

    /**
     * Récupérer tous les jobs
     */
    getAllJobs: publicProcedure.query(() => {
      return AutomatedPipeline.getAllJobs();
    }),

    /**
     * Démarrer la génération automatique
     */
    startAutomatic: protectedProcedure.mutation(async () => {
      await AutomatedPipeline.startAutomaticGeneration();
      return { message: "Automatic generation started (2 videos every 12 hours)" };
    }),

    /**
     * Arrêter la génération automatique
     */
    stopAutomatic: protectedProcedure.mutation(() => {
      AutomatedPipeline.stopAutomaticGeneration();
      return { message: "Automatic generation stopped" };
    }),

    /**
     * Récupérer le rapport du pipeline
     */
    getReport: publicProcedure.query(() => {
      return AutomatedPipeline.generatePipelineReport();
    }),

    /**
     * Exporter les résultats
     */
    exportResults: publicProcedure.query(() => {
      return AutomatedPipeline.exportResults();
    }),
  }),
});
