// Remotion Video Generator - Automated video generation from scripts

export interface VideoScript {
  id: string;
  title: string;
  platform: "tiktok" | "youtube" | "instagram";
  duration: number; // seconds
  scenes: Array<{
    duration: number;
    type: "text" | "image" | "animation" | "voiceover";
    content: string;
    styling?: Record<string, unknown>;
  }>;
  music?: {
    url: string;
    volume: number;
  };
  voiceover?: {
    text: string;
    language: "fr" | "en";
    speed: number;
  };
}

export interface RemotionConfig {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  backgroundColor: string;
  font: string;
}

export interface GeneratedVideo {
  id: string;
  scriptId: string;
  status: "pending" | "processing" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  duration: number;
  fileSize?: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export class RemotionVideoGenerator {
  private static platformConfigs: Record<string, RemotionConfig> = {
    tiktok: {
      width: 1080,
      height: 1920,
      fps: 30,
      durationInFrames: 0, // Will be calculated
      backgroundColor: "#03060C",
      font: "Sora",
    },
    youtube: {
      width: 1920,
      height: 1080,
      fps: 30,
      durationInFrames: 0,
      backgroundColor: "#03060C",
      font: "Sora",
    },
    instagram: {
      width: 1080,
      height: 1080,
      fps: 30,
      durationInFrames: 0,
      backgroundColor: "#03060C",
      font: "Sora",
    },
  };

  private static generatedVideos: Map<string, GeneratedVideo> = new Map();

  /**
   * Générer une vidéo à partir d'un script
   */
  static async generateVideo(script: VideoScript): Promise<GeneratedVideo> {
    const videoId = `video_${Date.now()}`;
    const config = this.platformConfigs[script.platform];

    // Créer l'entrée de vidéo
    const video: GeneratedVideo = {
      id: videoId,
      scriptId: script.id,
      status: "pending",
      duration: script.duration,
      createdAt: new Date(),
    };

    this.generatedVideos.set(videoId, video);

    // Simuler le traitement asynchrone
    setTimeout(async () => {
      try {
        video.status = "processing";

        // Générer la configuration Remotion
        const remotionConfig = this.generateRemotionConfig(script, config);

        // Générer le code React/Remotion
        const remotionCode = this.generateRemotionCode(script, remotionConfig);

        // Simuler la génération vidéo
        const videoUrl = await this.renderVideo(remotionCode, script, remotionConfig);

        video.videoUrl = videoUrl;
        video.thumbnailUrl = `${videoUrl.replace(".mp4", "_thumb.png")}`;
        video.fileSize = Math.floor(Math.random() * 50000000) + 10000000; // 10-60 MB
        video.status = "completed";
        video.completedAt = new Date();
      } catch (error) {
        video.status = "failed";
        video.error = error instanceof Error ? error.message : "Unknown error";
      }
    }, 1000);

    return video;
  }

  /**
   * Générer la configuration Remotion
   */
  private static generateRemotionConfig(
    script: VideoScript,
    baseConfig: RemotionConfig
  ): RemotionConfig {
    return {
      ...baseConfig,
      durationInFrames: Math.ceil(script.duration * baseConfig.fps),
    };
  }

  /**
   * Générer le code React/Remotion
   */
  private static generateRemotionCode(script: VideoScript, config: RemotionConfig): string {
    const scenes = script.scenes
      .map((scene, index) => {
        const startFrame = Math.ceil(
          script.scenes.slice(0, index).reduce((sum, s) => sum + s.duration, 0) * config.fps
        );
        const durationFrames = Math.ceil(scene.duration * config.fps);

        if (scene.type === "text") {
          return `
    <Sequence from={${startFrame}} durationInFrames={${durationFrames}}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '${config.backgroundColor}',
        color: '#EEF2F8',
        fontSize: '48px',
        fontFamily: '${config.font}',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '40px'
      }}>
        ${scene.content}
      </div>
    </Sequence>
          `;
        } else if (scene.type === "image") {
          return `
    <Sequence from={${startFrame}} durationInFrames={${durationFrames}}>
      <img src="${scene.content}" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }} />
    </Sequence>
          `;
        } else if (scene.type === "animation") {
          return `
    <Sequence from={${startFrame}} durationInFrames={${durationFrames}}>
      <div style={{
        width: '100%',
        height: '100%',
        animation: 'fadeIn 0.5s ease-in'
      }}>
        ${scene.content}
      </div>
    </Sequence>
          `;
        }

        return "";
      })
      .join("\n");

    return `
import { Composition, Sequence } from 'remotion';

export const RemotionVideo = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '${config.backgroundColor}',
      overflow: 'hidden'
    }}>
      ${scenes}
    </div>
  );
};

export const remotionConfig = {
  id: '${script.id}',
  component: RemotionVideo,
  durationInFrames: ${config.durationInFrames},
  fps: ${config.fps},
  width: ${config.width},
  height: ${config.height},
};
    `;
  }

  /**
   * Simuler le rendu vidéo
   */
  private static async renderVideo(
    remotionCode: string,
    script: VideoScript,
    config: RemotionConfig
  ): Promise<string> {
    // En production, cela appellerait l'API Remotion
    // Pour maintenant, on simule une URL de vidéo générée
    return `/manus-storage/video_${script.id}_${Date.now()}.mp4`;
  }

  /**
   * Récupérer une vidéo générée
   */
  static getVideo(videoId: string): GeneratedVideo | null {
    return this.generatedVideos.get(videoId) || null;
  }

  /**
   * Récupérer toutes les vidéos générées
   */
  static getAllVideos(): GeneratedVideo[] {
    return Array.from(this.generatedVideos.values());
  }

  /**
   * Récupérer les vidéos par statut
   */
  static getVideosByStatus(status: string): GeneratedVideo[] {
    return Array.from(this.generatedVideos.values()).filter((v) => v.status === status);
  }

  /**
   * Générer un batch de vidéos (2 par jour)
   */
  static async generateBatch(scripts: VideoScript[]): Promise<GeneratedVideo[]> {
    const generatedVideos: GeneratedVideo[] = [];

    for (const script of scripts.slice(0, 2)) {
      const video = await this.generateVideo(script);
      generatedVideos.push(video);
    }

    return generatedVideos;
  }

  /**
   * Planifier la génération automatique de vidéos
   */
  static scheduleAutomaticGeneration(scripts: VideoScript[], intervalHours: number = 12): string {
    // En production, cela utiliserait un job scheduler comme node-cron
    return `Scheduled automatic video generation every ${intervalHours} hours`;
  }

  /**
   * Exporter la vidéo pour publication
   */
  static async exportForPlatform(
    videoId: string,
    platform: "tiktok" | "youtube" | "instagram"
  ): Promise<{
    videoUrl: string;
    format: string;
    dimensions: string;
    duration: number;
  }> {
    const video = this.getVideo(videoId);
    if (!video || !video.videoUrl) {
      throw new Error("Video not found or not completed");
    }

    const config = this.platformConfigs[platform];

    return {
      videoUrl: video.videoUrl,
      format: "MP4",
      dimensions: `${config.width}x${config.height}`,
      duration: video.duration,
    };
  }

  /**
   * Générer un rapport de production vidéo
   */
  static generateProductionReport(): {
    totalGenerated: number;
    completed: number;
    processing: number;
    failed: number;
    averageGenerationTime: number;
    totalStorageUsed: number;
  } {
    const videos = Array.from(this.generatedVideos.values());
    const completed = videos.filter((v) => v.status === "completed");
    const processing = videos.filter((v) => v.status === "processing");
    const failed = videos.filter((v) => v.status === "failed");

    const generationTimes = completed
      .filter((v) => v.completedAt)
      .map((v) => (v.completedAt!.getTime() - v.createdAt.getTime()) / 1000);

    const averageTime = generationTimes.length > 0 ? generationTimes.reduce((a, b) => a + b) / generationTimes.length : 0;

    const totalStorage = completed.reduce((sum, v) => sum + (v.fileSize || 0), 0);

    return {
      totalGenerated: videos.length,
      completed: completed.length,
      processing: processing.length,
      failed: failed.length,
      averageGenerationTime: Math.round(averageTime),
      totalStorageUsed: totalStorage,
    };
  }

  /**
   * Nettoyer les vidéos anciennes
   */
  static cleanupOldVideos(daysOld: number = 30): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    let deletedCount = 0;
    const entries = Array.from(this.generatedVideos.entries());
    for (const [key, video] of entries) {
      if (video.createdAt < cutoffDate) {
        this.generatedVideos.delete(key);
        deletedCount++;
      }
    }

    return deletedCount;
  }
}
