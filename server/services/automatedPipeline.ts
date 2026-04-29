// Automated Pipeline - NotebookLM → Claude → Remotion → Publication (Closed Loop)

import { VideoScriptService } from "./videoScriptService";
import { RemotionVideoGenerator, VideoScript } from "./remotionVideoGenerator";
import { SocialResponseService } from "./socialResponseService";

export interface PipelineJob {
  id: string;
  status: "pending" | "notebooklm" | "claude" | "remotion" | "publishing" | "completed" | "failed";
  stage: number; // 0: NotebookLM, 1: Claude, 2: Remotion, 3: Publishing
  input: {
    topic: string;
    language: "fr" | "en";
    platform: "tiktok" | "youtube" | "instagram";
  };
  output: {
    notebookLmContent?: string;
    claudeScript?: string;
    videoId?: string;
    publishedUrl?: string;
  };
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export class AutomatedPipeline {
  private static jobs: Map<string, PipelineJob> = new Map();
  private static isRunning = false;

  /**
   * Créer un nouveau job de pipeline
   */
  static async createJob(input: {
    topic: string;
    language: "fr" | "en";
    platform: "tiktok" | "youtube" | "instagram";
  }): Promise<PipelineJob> {
    const jobId = `job_${Date.now()}`;

    const job: PipelineJob = {
      id: jobId,
      status: "pending",
      stage: 0,
      input,
      output: {},
      createdAt: new Date(),
    };

    this.jobs.set(jobId, job);

    // Démarrer le pipeline asynchrone
    this.processPipeline(jobId);

    return job;
  }

  /**
   * Traiter le pipeline complet (boucle fermée)
   */
  private static async processPipeline(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;

    try {
      // Stage 0: NotebookLM (Récupérer le contenu)
      job.status = "notebooklm";
      job.stage = 0;
      const notebookLmContent = await this.stage0_NotebookLM(job);
      job.output.notebookLmContent = notebookLmContent;

      // Stage 1: Claude (Générer le script)
      job.status = "claude";
      job.stage = 1;
      const claudeScript = await this.stage1_Claude(job, notebookLmContent);
      job.output.claudeScript = claudeScript;

      // Stage 2: Remotion (Générer la vidéo)
      job.status = "remotion";
      job.stage = 2;
      const videoId = await this.stage2_Remotion(job, claudeScript);
      job.output.videoId = videoId;

      // Stage 3: Publishing (Publier)
      job.status = "publishing";
      job.stage = 3;
      const publishedUrl = await this.stage3_Publishing(job, videoId);
      job.output.publishedUrl = publishedUrl;

      job.status = "completed";
      job.completedAt = new Date();
    } catch (error) {
      job.status = "failed";
      job.error = error instanceof Error ? error.message : "Unknown error";
      job.completedAt = new Date();
    }
  }

  /**
   * Stage 0: NotebookLM - Récupérer le contenu
   */
  private static async stage0_NotebookLM(job: PipelineJob): Promise<string> {
    // Simuler la récupération du contenu depuis NotebookLM
    // En production, cela appellerait l'API NotebookLM
    const content = `
# ${job.input.topic}

## Introduction
${job.input.topic} est un sujet crucial pour les traders modernes.

## Points Clés
1. Le trading est une science, pas un art
2. La méthode est plus importante que le talent
3. La gestion du risque est fondamentale
4. La psychologie du trading est essentielle

## Conclusion
Maîtriser ${job.input.topic} transforme votre carrière de trading.
    `;

    return content;
  }

  /**
   * Stage 1: Claude - Générer le script vidéo
   */
  private static async stage1_Claude(job: PipelineJob, notebookLmContent: string): Promise<string> {
    // Simuler l'appel à Claude pour générer le script
    // En production, cela appellerait l'API Claude
    const script = `
[Slide 1 — 0:00–0:05]
${job.input.topic}

[Slide 2 — 0:05–0:10]
La clé du succès en trading

[Slide 3 — 0:10–0:18]
Découvrez comment maîtriser ${job.input.topic}

[Slide 4 — 0:18–0:25]
KelvexTrader vous montre la voie

[Slide 5 — 0:25–0:30]
Commencez votre transformation aujourd'hui
    `;

    return script;
  }

  /**
   * Stage 2: Remotion - Générer la vidéo
   */
  private static async stage2_Remotion(job: PipelineJob, claudeScript: string): Promise<string> {
    // Créer un script vidéo Remotion
    const videoScript: VideoScript = {
      id: `script_${Date.now()}`,
      title: job.input.topic,
      platform: job.input.platform,
      duration: job.input.platform === "youtube" ? 1200 : 30,
      scenes: [
        {
          duration: 5,
          type: "text",
          content: job.input.topic,
        },
        {
          duration: 5,
          type: "text",
          content: "La clé du succès en trading",
        },
        {
          duration: 8,
          type: "text",
          content: `Découvrez comment maîtriser ${job.input.topic}`,
        },
        {
          duration: 7,
          type: "text",
          content: "KelvexTrader vous montre la voie",
        },
        {
          duration: 5,
          type: "text",
          content: "Commencez votre transformation aujourd'hui",
        },
      ],
    };

    // Générer la vidéo
    const video = await RemotionVideoGenerator.generateVideo(videoScript);

    return video.id;
  }

  /**
   * Stage 3: Publishing - Publier la vidéo
   */
  private static async stage3_Publishing(job: PipelineJob, videoId: string): Promise<string> {
    // Simuler la publication sur les réseaux sociaux
    // En production, cela utiliserait les APIs des réseaux sociaux

    const platforms: Record<string, string> = {
      tiktok: "https://tiktok.com/@kelvextrader/video/",
      youtube: "https://youtube.com/watch?v=",
      instagram: "https://instagram.com/p/",
    };

    const baseUrl = platforms[job.input.platform];
    const publishedUrl = `${baseUrl}${videoId}`;

    return publishedUrl;
  }

  /**
   * Récupérer un job
   */
  static getJob(jobId: string): PipelineJob | null {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Récupérer tous les jobs
   */
  static getAllJobs(): PipelineJob[] {
    return Array.from(this.jobs.values());
  }

  /**
   * Récupérer les jobs par statut
   */
  static getJobsByStatus(status: string): PipelineJob[] {
    return Array.from(this.jobs.values()).filter((j) => j.status === status);
  }

  /**
   * Démarrer la génération automatique de 2 vidéos par jour
   */
  static async startAutomaticGeneration(): Promise<void> {
    if (this.isRunning) {
      console.log("Pipeline already running");
      return;
    }

    this.isRunning = true;

    // Générer 2 vidéos par jour (toutes les 12 heures)
    const self = this;
    const interval = setInterval(async () => {
      try {
        const topics = [
          "Gestion du risque en trading",
          "Psychologie du trading",
          "Stratégies de trading avancées",
          "Comment passer un challenge prop firm",
          "Les erreurs les plus courantes des traders",
        ];

        const platforms: Array<"tiktok" | "youtube" | "instagram"> = ["tiktok", "youtube"];
        const languages: Array<"fr" | "en"> = ["fr", "en"];

        // Générer 2 jobs aléatoires
        for (let i = 0; i < 2; i++) {
          const topic = topics[Math.floor(Math.random() * topics.length)];
          const platform = platforms[Math.floor(Math.random() * platforms.length)];
          const language = languages[Math.floor(Math.random() * languages.length)];

          await self.createJob({
            topic,
            platform,
            language,
          });
        }
      } catch (error) {
        console.error("Error in automatic generation:", error);
      }
    }, 12 * 60 * 60 * 1000); // 12 heures

    console.log("Automatic video generation started (2 videos every 12 hours)");
  }

  /**
   * Arrêter la génération automatique
   */
  static stopAutomaticGeneration(): void {
    AutomatedPipeline.isRunning = false;
    console.log("Automatic video generation stopped");
  }

  /**
   * Générer un rapport du pipeline
   */
  static generatePipelineReport(): {
    totalJobs: number;
    completed: number;
    processing: number;
    failed: number;
    averageProcessingTime: number;
    videosGenerated: number;
  } {
    const jobs = Array.from(this.jobs.values());
    const completed = jobs.filter((j) => j.status === "completed");
    const processing = jobs.filter((j) => j.status !== "completed" && j.status !== "failed");
    const failed = jobs.filter((j) => j.status === "failed");

    const processingTimes = completed
      .filter((j) => j.completedAt)
      .map((j) => (j.completedAt!.getTime() - j.createdAt.getTime()) / 1000);

    const averageTime = processingTimes.length > 0 ? processingTimes.reduce((a, b) => a + b) / processingTimes.length : 0;

    return {
      totalJobs: jobs.length,
      completed: completed.length,
      processing: processing.length,
      failed: failed.length,
      averageProcessingTime: Math.round(averageTime),
      videosGenerated: completed.length,
    };
  }

  /**
   * Exporter les résultats du pipeline
   */
  static exportResults(): {
    jobs: PipelineJob[];
    report: ReturnType<typeof AutomatedPipeline.generatePipelineReport>;
  } {
    return {
      jobs: AutomatedPipeline.getAllJobs(),
      report: AutomatedPipeline.generatePipelineReport(),
    };
  }
}
