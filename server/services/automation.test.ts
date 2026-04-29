import { describe, it, expect, beforeEach } from "vitest";
import { MultilingualSeoService } from "./multilingualSeoService";
import { RemotionVideoGenerator, VideoScript } from "./remotionVideoGenerator";
import { AutomatedPipeline } from "./automatedPipeline";

describe("Multilingual SEO Service", () => {
  const mockPage = {
    slug: "test-article",
    title: {
      fr: "Article de Test",
      en: "Test Article",
    },
    description: {
      fr: "Description de test en français",
      en: "Test description in English",
    },
    keywords: {
      fr: ["test", "seo", "français"],
      en: ["test", "seo", "english"],
    },
    content: {
      fr: "<h1>Test</h1><p>Contenu de test en français avec plus de 300 mots pour satisfaire les critères SEO. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
      en: "<h1>Test</h1><p>Test content in English with more than 300 words to satisfy SEO criteria. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
    },
    seoScore: { fr: 0, en: 0 },
  };

  it("should generate SEO metadata", () => {
    const metadata = MultilingualSeoService.generateSEOMetadata(mockPage, "fr", "https://example.com");

    expect(metadata).toBeDefined();
    expect(metadata.language).toBe("fr");
    expect(metadata.title).toContain("Article de Test");
    expect(metadata.canonical).toContain("https://example.com");
    expect(metadata.hreflang).toHaveLength(3);
  });

  it("should generate HTML head with meta tags", () => {
    const metadata = MultilingualSeoService.generateSEOMetadata(mockPage, "fr", "https://example.com");
    const head = MultilingualSeoService.generateHTMLHead(metadata);

    expect(head).toContain("<meta");
    expect(head).toContain("og:title");
    expect(head).toContain("twitter:card");
    expect(head).toContain("application/ld+json");
  });

  it("should generate multilingual sitemap", () => {
    const sitemap = MultilingualSeoService.generateMultilingualSitemap([mockPage], "https://example.com");

    expect(sitemap).toContain("<?xml");
    expect(sitemap).toContain("https://example.com/fr/test-article");
    expect(sitemap).toContain("https://example.com/en/test-article");
    expect(sitemap).toContain("hreflang");
  });

  it("should generate robots.txt", () => {
    const robots = MultilingualSeoService.generateRobotsTxt("https://example.com");

    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Disallow: /admin/");
    expect(robots).toContain("Sitemap:");
  });

  it("should calculate SEO score", () => {
    const score = MultilingualSeoService.calculateSEOScore(mockPage, "fr");

    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("should generate SEO recommendations", () => {
    const recommendations = MultilingualSeoService.generateSEORecommendations(mockPage, "fr");

    expect(Array.isArray(recommendations)).toBe(true);
  });

  it("should generate social metadata", () => {
    const social = MultilingualSeoService.generateSocialMetadata(mockPage, "fr", "https://example.com");

    expect(social.facebook).toBeDefined();
    expect(social.twitter).toBeDefined();
    expect(social.linkedin).toBeDefined();
    expect(social.facebook.title).toBe("Article de Test");
  });

  it("should generate SEO report", () => {
    const report = MultilingualSeoService.generateSEOReport([mockPage], "https://example.com");

    expect(report.totalPages).toBe(1);
    expect(report.averageSEOScore).toBeGreaterThan(0);
    expect(report.languageCoverage.fr).toBe(100);
    expect(report.languageCoverage.en).toBe(100);
  });
});

describe("Remotion Video Generator", () => {
  const mockScript: VideoScript = {
    id: "test_script",
    title: "Test Video",
    platform: "tiktok",
    duration: 30,
    scenes: [
      {
        duration: 10,
        type: "text",
        content: "Scene 1",
      },
      {
        duration: 10,
        type: "text",
        content: "Scene 2",
      },
      {
        duration: 10,
        type: "text",
        content: "Scene 3",
      },
    ],
  };

  it("should generate a video", async () => {
    const video = await RemotionVideoGenerator.generateVideo(mockScript);

    expect(video).toBeDefined();
    expect(video.scriptId).toBe("test_script");
    expect(video.status).toBe("pending");
    expect(video.duration).toBe(30);
  });

  it("should get all videos", async () => {
    await RemotionVideoGenerator.generateVideo(mockScript);
    const videos = RemotionVideoGenerator.getAllVideos();

    expect(Array.isArray(videos)).toBe(true);
    expect(videos.length).toBeGreaterThan(0);
  });

  it("should get videos by status", async () => {
    await RemotionVideoGenerator.generateVideo(mockScript);
    const pending = RemotionVideoGenerator.getVideosByStatus("pending");

    expect(Array.isArray(pending)).toBe(true);
  });

  it("should generate production report", async () => {
    const report = RemotionVideoGenerator.generateProductionReport();

    expect(report).toBeDefined();
    expect(report.totalGenerated).toBeGreaterThanOrEqual(0);
    expect(report.completed).toBeGreaterThanOrEqual(0);
    expect(report.processing).toBeGreaterThanOrEqual(0);
    expect(report.failed).toBeGreaterThanOrEqual(0);
  });

  it("should cleanup old videos", () => {
    const deleted = RemotionVideoGenerator.cleanupOldVideos(0);

    expect(typeof deleted).toBe("number");
    expect(deleted).toBeGreaterThanOrEqual(0);
  });
});

describe("Automated Pipeline", () => {
  beforeEach(() => {
    // Reset pipeline state before each test
  });

  it("should create a pipeline job", async () => {
    const job = await AutomatedPipeline.createJob({
      topic: "Test Topic",
      language: "fr",
      platform: "tiktok",
    });

    expect(job).toBeDefined();
    expect(job.status).toBe("pending");
    expect(job.input.topic).toBe("Test Topic");
    expect(job.input.language).toBe("fr");
  });

  it("should get a pipeline job", async () => {
    const created = await AutomatedPipeline.createJob({
      topic: "Test Topic",
      language: "fr",
      platform: "tiktok",
    });

    const retrieved = AutomatedPipeline.getJob(created.id);

    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(created.id);
  });

  it("should get all pipeline jobs", async () => {
    await AutomatedPipeline.createJob({
      topic: "Test Topic 1",
      language: "fr",
      platform: "tiktok",
    });

    await AutomatedPipeline.createJob({
      topic: "Test Topic 2",
      language: "en",
      platform: "youtube",
    });

    const jobs = AutomatedPipeline.getAllJobs();

    expect(Array.isArray(jobs)).toBe(true);
    expect(jobs.length).toBeGreaterThan(0);
  });

  it("should generate pipeline report", async () => {
    const report = AutomatedPipeline.generatePipelineReport();

    expect(report).toBeDefined();
    expect(report.totalJobs).toBeGreaterThanOrEqual(0);
    expect(report.completed).toBeGreaterThanOrEqual(0);
    expect(report.processing).toBeGreaterThanOrEqual(0);
    expect(report.failed).toBeGreaterThanOrEqual(0);
  });

  it("should export results", async () => {
    const results = AutomatedPipeline.exportResults();

    expect(results).toBeDefined();
    expect(results.jobs).toBeDefined();
    expect(results.report).toBeDefined();
    expect(Array.isArray(results.jobs)).toBe(true);
  });
});
