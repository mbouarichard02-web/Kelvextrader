// Video Script Service - Remotion Integration

export interface VideoScript {
  id: string;
  title: string;
  platform: "tiktok" | "youtube" | "instagram";
  duration: number; // en secondes
  format: "vertical" | "horizontal";
  hookType: string;
  targetAudience: string;
  cta: string;
  script: ScriptBlock[];
  remotionInstructions: string[];
  createdAt: Date;
  updatedAt: Date;
  engagementTarget: number; // pourcentage
}

export interface ScriptBlock {
  type: "intro" | "hook" | "body" | "cta";
  duration: { start: number; end: number };
  voiceOver?: string;
  remotionInstructions?: string[];
  visualNotes?: string;
}

// 4 Scripts Vidéo de Claude
const VIDEO_SCRIPTS: VideoScript[] = [
  {
    id: "video_tiktok_001",
    title: "TikTok #1 — Hook 'Statut Quo Brisé'",
    platform: "tiktok",
    duration: 38,
    format: "vertical",
    hookType: "Status quo broken",
    targetAudience: "Débutants hésitants",
    cta: "Quiz gratuit",
    engagementTarget: 8,
    script: [
      {
        type: "intro",
        duration: { start: 0, end: 3 },
        remotionInstructions: [
          "REMOTION: Texte blanc massif 'LE TRADING C'EST DIFFICILE' apparaît",
          "Grande croix rouge ❌ barre le texte avec animation slash",
          "Son de buzzer",
          "Durée 3s",
        ],
      },
      {
        type: "body",
        duration: { start: 3, end: 33 },
        voiceOver:
          "Stop. Le trading n'est PAS réservé aux riches. Voici la preuve.\n\nAujourd'hui, tu peux commencer le trading avec 5 dollars. 5 dollars.\nLa vraie barrière, c'est pas le capital. C'est le manque de méthode.\n\nLa méthode, c'est ce qu'on t'apprend gratuitement sur KelvexTrader.",
        remotionInstructions: [
          "REMOTION: 3 cartes apparaissent en séquence",
          "Carte 1: 'DERIV — Dépôt minimum : 5$'",
          "Carte 2: 'XM — Bonus de démarrage disponible'",
          "Carte 3: 'Synthétiques — 24h/24, pas d'impact news'",
          "Animation graphique comparatif: 'Capital requis' vs 'Méthode requise'",
        ],
      },
      {
        type: "cta",
        duration: { start: 33, end: 38 },
        voiceOver:
          "Si tu veux un plan adapté à TON profil de trader — pas un truc générique — j'ai quelque chose pour toi.\n\nFais le quiz d'onboarding KelvexTrader. 2 minutes. C'est gratuit. Il va analyser ton profil et te créer ton parcours personnalisé.",
        remotionInstructions: [
          "REMOTION: CTA animé 'QUIZ GRATUIT → kelvextrader.com' en or avec flèche pulsante",
          "Son d'action",
          "Fond bleu nuit",
          "Durée: 5s",
        ],
      },
    ],
    remotionInstructions: [
      "Fond noir profond (#05070D)",
      "Texte blanc et or (#C8A84B)",
      "Animations fluides avec GSAP",
      "Musique d'ambiance légère",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "video_tiktok_002",
    title: "TikTok #2 — Hook 'Mythe Brisé'",
    platform: "tiktok",
    duration: 32,
    format: "vertical",
    hookType: "Myth busted",
    targetAudience: "Hésitants",
    cta: "Quiz",
    engagementTarget: 8,
    script: [
      {
        type: "intro",
        duration: { start: 0, end: 3 },
        remotionInstructions: [
          "REMOTION: Texte 'LE TRADING C'EST POUR LES RICHES' apparaît en blanc",
          "Grande croix rouge ❌ barre le texte avec animation slash",
          "Son de buzzer",
          "Durée 3s",
        ],
      },
      {
        type: "body",
        duration: { start: 3, end: 28 },
        voiceOver:
          "Stop. Le trading n'est PAS réservé aux riches. Voici la preuve.\n\nAujourd'hui, tu peux commencer le trading avec 5 dollars. 5 dollars.\nLa vraie barrière, c'est pas le capital. C'est le manque de méthode.",
        remotionInstructions: [
          "REMOTION: 3 cartes apparaissent en séquence",
          "Chaque carte: fond sombre, chiffre en or, texte blanc",
          "Carte 1: 'DERIV — Dépôt minimum : 5$'",
          "Carte 2: 'XM — Bonus de démarrage disponible'",
          "Carte 3: 'Synthétiques — 24h/24, pas d'impact news'",
          "Animation graphique comparatif: deux barres",
          "'Capital requis' = très petite barre",
          "'Méthode requise' = grande barre en or",
          "Durée 3s",
        ],
      },
      {
        type: "cta",
        duration: { start: 28, end: 32 },
        voiceOver:
          "Lien dans la bio. Quiz gratuit. 2 minutes. Ton profil de trader t'attend.",
        remotionInstructions: [
          "REMOTION: Écran final",
          "Logo KELVEX TRADER centre",
          "'QUIZ GRATUIT' bouton animé",
          "URL visible",
          "Son positif",
          "Durée 5s",
        ],
      },
    ],
    remotionInstructions: [
      "Fond noir profond",
      "Animations rapides et impactantes",
      "Texte blanc et or",
      "Transitions fluides",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "video_tiktok_003",
    title: "TikTok #3 — Hook 'Question Directe'",
    platform: "tiktok",
    duration: 42,
    format: "vertical",
    hookType: "Direct question",
    targetAudience: "Actifs perdants",
    cta: "Quiz",
    engagementTarget: 8,
    script: [
      {
        type: "intro",
        duration: { start: 0, end: 4 },
        remotionInstructions: [
          "REMOTION: Fond noir",
          "Texte blanc massif apparaît mot par mot avec son de frappe",
          "'Tu. Trades. Depuis. 6. Mois.'",
          "Pause",
          "Puis en rouge: 'Et tu perds encore.'",
          "Chaque mot pop avec son impact",
          "Durée 4s",
        ],
      },
      {
        type: "body",
        duration: { start: 4, end: 35 },
        voiceOver:
          "Si tu trades depuis 6 mois et que tu n'es pas encore rentable — le problème n'est pas ton manque de talent.\n\nLe problème, c'est que personne ne t'a montré comment construire une base solide. Pas les vidéos YouTube. Pas les groupes Telegram. Pas les signaux payants.\n\nCe dont tu as besoin, c'est d'un diagnostic précis. Qu'est-ce qui ne fonctionne pas dans TON trading spécifiquement ?\n\nLa réponse est dans ton profil de trader. Et le seul moyen de le connaître, c'est de répondre à 5 questions.",
        remotionInstructions: [
          "REMOTION: Liste qui apparaît avec ❌ sur chaque item",
          "'YouTube ❌', 'Telegram ❌', 'Signaux ❌'",
          "Puis nouvelle liste avec ✅",
          "'Méthode adaptée ✅', 'Gestion du risque ✅', 'Parcours personnalisé ✅'",
          "Animation slide",
          "Durée 6s",
        ],
      },
      {
        type: "cta",
        duration: { start: 35, end: 42 },
        voiceOver:
          "KelvexTrader. Quiz gratuit. 2 minutes. Ton diagnostic arrive instantanément. Lien dans la bio.",
        remotionInstructions: [
          "REMOTION: Écran split",
          "Gauche: Animation quiz interactif (5 points qui se cochent)",
          "Droite: 'RÉSULTAT: Profil Intermédiaire — Parcours généré ✅'",
          "Fond bleu nuit",
          "Logo KELVEX",
          "URL",
          "Durée 7s",
        ],
      },
    ],
    remotionInstructions: [
      "Animations texte impactantes",
      "Transitions rapides",
      "Fond noir profond",
      "Texte blanc et or",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "video_youtube_001",
    title: "YouTube Long-Form — 'Le Trading expliqué en 20 minutes'",
    platform: "youtube",
    duration: 1200, // 20 minutes
    format: "horizontal",
    hookType: "Educational",
    targetAudience: "Débutants et intermédiaires",
    cta: "Quiz + Guide",
    engagementTarget: 5,
    script: [
      {
        type: "intro",
        duration: { start: 0, end: 150 },
        voiceOver:
          "Dans 20 minutes, tu vas comprendre le trading mieux que la plupart des gens qui tradent depuis 2 ans.\n\nJe ne vais pas te vendre une stratégie miracle. Je ne vais pas te promettre 10 000$ par mois.\nCe que je vais faire, c'est te donner le cadre exact — celui que les traders professionnels utilisent — pour construire une base solide.\n\nParce que le problème avec le trading en 2025, c'est pas le manque d'information. C'est le surplus d'informations contradictoires.",
        remotionInstructions: [
          "REMOTION: Intro cinématique 8 secondes",
          "Logo KELVEX TRADER sur fond spatial",
          "Animation particules or et bleu",
          "Musique instrumentale professionnelle",
          "Animation 'information overload' — logos de 10 stratégies différentes qui tournent en chaos",
          "Puis zoom sur une seule: 'VOTRE MÉTHODE'",
          "Durée 4s",
        ],
      },
      {
        type: "body",
        duration: { start: 150, end: 1050 },
        voiceOver:
          "Chapitre 1: Pourquoi 90% des traders perdent\n\nLa vraie raison pour laquelle la plupart des traders perdent, c'est pas le manque de talent. C'est pas la malchance.\n\nC'est qu'ils traitent le trading comme un jeu de hasard alors que c'est un jeu de probabilités.\n\nQuelle est la différence ? Dans un jeu de hasard, vous n'avez aucun contrôle. Dans un jeu de probabilités, vous construisez un système qui gagne sur le long terme — même si vous perdez 6 trades sur 10.\n\nComment un trader peut-il perdre 60% de ses trades et rester rentable ? Parce que ses gains valent 3 fois ses pertes. C'est le ratio risque/récompense. Et c'est le concept le plus important de cette vidéo.",
        remotionInstructions: [
          "REMOTION: Titre chapitre animé 'CHAPITRE 1 : POURQUOI 90% PERDENT'",
          "Fond noir",
          "Chiffre 90% en rouge qui pulse",
          "Durée 3s",
          "Graphique animé: 10 trades",
          "6 rouges (pertes), 4 verts (gains)",
          "Total final: VERT (+20%)",
          "Animation compteur",
          "Durée 6s",
          "Titre: '40% de win rate peut être RENTABLE'",
        ],
      },
      {
        type: "cta",
        duration: { start: 1050, end: 1200 },
        voiceOver:
          "Votre prochaine étape concrète est simple : faire le quiz d'onboarding KelvexTrader. 2 minutes. Gratuit. Pas de carte bancaire requise.\n\nCe quiz va analyser votre profil de trader et vous créer un parcours personnalisé basé sur votre niveau, votre stratégie préférée, et vos objectifs.\n\nLien dans la description.",
        remotionInstructions: [
          "REMOTION: Écran final",
          "Logo KELVEX TRADER",
          "Bouton 'QUIZ GRATUIT'",
          "URL kelvextrader.com/quiz",
          "Son positif",
          "Durée 10s",
        ],
      },
    ],
    remotionInstructions: [
      "Qualité 4K",
      "Animations fluides",
      "Graphiques animés",
      "Sous-titres français",
      "Musique de fond professionnelle",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class VideoScriptService {
  // Récupérer tous les scripts
  static async getAllScripts(): Promise<VideoScript[]> {
    return VIDEO_SCRIPTS;
  }

  // Récupérer les scripts par plateforme
  static async getScriptsByPlatform(
    platform: "tiktok" | "youtube" | "instagram"
  ): Promise<VideoScript[]> {
    return VIDEO_SCRIPTS.filter((script) => script.platform === platform);
  }

  // Récupérer un script par ID
  static async getScriptById(id: string): Promise<VideoScript | null> {
    return VIDEO_SCRIPTS.find((script) => script.id === id) || null;
  }

  // Générer les instructions Remotion pour un script
  static generateRemotionConfig(script: VideoScript): Record<string, any> {
    return {
      scriptId: script.id,
      title: script.title,
      duration: script.duration,
      fps: 30,
      width: script.format === "vertical" ? 1080 : 1920,
      height: script.format === "vertical" ? 1920 : 1080,
      branding: {
        colors: {
          primary: "#1E6BFF",
          secondary: "#C8A84B",
          background: "#05070D",
          accent: "#00D4FF",
        },
        logo: "https://kelvextrader.com/logo.png",
      },
      scenes: script.script.map((block, index) => ({
        id: `scene_${index}`,
        type: block.type,
        duration: block.duration.end - block.duration.start,
        voiceOver: block.voiceOver,
        remotionInstructions: block.remotionInstructions,
      })),
    };
  }

  // Générer le contenu pour TikTok
  static generateTikTokContent(script: VideoScript): string {
    const voiceOvers = script.script
      .filter((block) => block.voiceOver)
      .map((block) => block.voiceOver)
      .join("\n\n");

    return `
# ${script.title}

## Durée: ${script.duration}s
## Hook: ${script.hookType}
## Audience: ${script.targetAudience}
## CTA: ${script.cta}

## Voix Off:
${voiceOvers}

## Instructions Remotion:
${script.remotionInstructions.join("\n")}

## Engagement Target: ${script.engagementTarget}%
    `;
  }

  // Générer le contenu pour YouTube
  static generateYouTubeContent(script: VideoScript): string {
    const chapters = script.script
      .filter((block) => block.type !== "intro")
      .map((block, index) => {
        const minutes = Math.floor(block.duration.start / 60);
        const seconds = block.duration.start % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} - Chapitre ${index}`;
      });

    return `
# ${script.title}

## Chapitres:
${chapters.join("\n")}

## Description:
Dans cette vidéo, je te donne le cadre complet pour apprendre le trading correctement en 2025. Pas de stratégie miracle, pas de promesses — une méthode structurée, agnostique (Fibonacci, Price Action, SMC, Indicateurs), et adaptable à tous les profils.

## Ressources mentionnées:
→ Quiz d'Onboarding KelvexTrader : kelvextrader.com/quiz
→ Guide gratuit "Premiers trades" : kelvextrader.com/guide

#trading #apprendreletrading #tradingdebutant #forex #kelvextrader
    `;
  }

  // Récupérer les scripts par audience cible
  static async getScriptsByAudience(audience: string): Promise<VideoScript[]> {
    return VIDEO_SCRIPTS.filter((script) =>
      script.targetAudience.toLowerCase().includes(audience.toLowerCase())
    );
  }

  // Récupérer les scripts par type de hook
  static async getScriptsByHookType(hookType: string): Promise<VideoScript[]> {
    return VIDEO_SCRIPTS.filter((script) =>
      script.hookType.toLowerCase().includes(hookType.toLowerCase())
    );
  }
}
