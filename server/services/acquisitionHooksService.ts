// Acquisition Hooks Service - 5 proven hooks for user acquisition

export interface AcquisitionHook {
  id: string;
  title: string;
  category: string;
  primaryHook: string;
  variants: string[];
  usage: string;
  targetAudience: string;
  expectedCTR: string;
  platforms: string[];
}

export class AcquisitionHooksService {
  private static hooks: AcquisitionHook[] = [
    {
      id: "hook_001",
      title: "The System Hook",
      category: "Philosophical",
      primaryHook: "Le trading n'est pas un talent.\nC'est un système.",
      variants: [
        "Le trading n'est pas un don. C'est une science.",
        "Vous ne manquez pas de talent. Vous manquez de système.",
        "Le talent ne gagne pas. La méthode gagne.",
      ],
      usage:
        "Utilisez cette accroche pour briser le mythe que le trading est réservé aux doués. Parfait pour les débutants.",
      targetAudience: "Débutants 18-35 ans",
      expectedCTR: "2.5% - 3.5%",
      platforms: ["Facebook", "Instagram", "TikTok"],
    },
    {
      id: "hook_002",
      title: "The Question Hook",
      category: "Curiosity",
      primaryHook: "Vous tradez depuis combien de temps ?\nEt votre compte est rentable ?",
      variants: [
        "Ça fait 6 mois que vous tradez. Vous gagnez combien par mois ?",
        "Vous avez perdu de l'argent en trading. Savez-vous pourquoi ?",
        "Vous tradez depuis 1 an. Êtes-vous rentable ?",
      ],
      usage:
        "Posez une question directe qui force le prospect à se confronter à la réalité. Crée de la curiosité.",
      targetAudience: "Tous profils",
      expectedCTR: "3% - 4%",
      platforms: ["TikTok", "Instagram Reels", "YouTube Shorts"],
    },
    {
      id: "hook_003",
      title: "The Proof Hook",
      category: "Social Proof",
      primaryHook:
        "En 2024, des traders sans expérience ont passé leurs premiers challenges prop firm.\nIls avaient deux choses en commun : une méthode et les bons outils.",
      variants: [
        "810 traders ont atteint la rentabilité avec KelvexTrader en 2024.",
        "5 000+ traders utilisent KelvexTrader pour passer leurs challenges prop firm.",
        "Des traders gagnent 50 000 - 500 000 FCFA par mois avec notre système.",
      ],
      usage:
        "Montrez les résultats réels d'autres traders. La preuve sociale est puissante. Utilisez des chiffres spécifiques.",
      targetAudience: "Intermédiaires, Retargeting",
      expectedCTR: "2% - 3%",
      platforms: ["Facebook", "LinkedIn", "Instagram"],
    },
    {
      id: "hook_004",
      title: "The Disruption Hook",
      category: "Disruption",
      primaryHook:
        "Si vous n'êtes pas rentable en trading, ce n'est pas votre faute.\nPersonne ne vous a montré la bonne méthode.",
      variants: [
        "Vous avez échoué vos challenges prop firm. Ce n'était pas votre faute.",
        "Les cours de trading gratuits sur YouTube ne vous rendent pas riche. Voici pourquoi.",
        "90% des traders perdent de l'argent. Vous êtes peut-être l'un d'eux.",
      ],
      usage:
        "Validez la frustration du prospect. Montrez que le problème n'est pas lui, c'est le système. Crée de l'empathie.",
      targetAudience: "Traders frustrés",
      expectedCTR: "3% - 4.5%",
      platforms: ["TikTok", "YouTube", "Instagram Reels"],
    },
    {
      id: "hook_005",
      title: "The Offer Hook",
      category: "Offer",
      primaryHook:
        "Déposez 10$ chez Deriv.\nObtenez -30% sur Cloud Ultra. Pour toujours.",
      variants: [
        "Offre Nexus : 10$ de dépôt = -30% à vie sur Cloud Ultra.",
        "Première fois ? Déposez 10$. Obtenez 3 600 FCFA de réduction chaque mois.",
        "Alliance Deriv + KelvexTrader : -30% sur votre abonnement, à vie.",
      ],
      usage:
        "Présentez l'offre concrète. Soyez spécifique sur le montant et la réduction. Crée de l'urgence.",
      targetAudience: "Prospects chauds, Retargeting",
      expectedCTR: "4% - 6%",
      platforms: ["Facebook", "Instagram", "Email"],
    },
  ];

  /**
   * Récupérer tous les hooks
   */
  static getAllHooks(): AcquisitionHook[] {
    return this.hooks;
  }

  /**
   * Récupérer un hook par ID
   */
  static getHookById(id: string): AcquisitionHook | null {
    return this.hooks.find((hook) => hook.id === id) || null;
  }

  /**
   * Récupérer les hooks par catégorie
   */
  static getHooksByCategory(category: string): AcquisitionHook[] {
    return this.hooks.filter((hook) =>
      hook.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  /**
   * Récupérer les hooks par plateforme
   */
  static getHooksByPlatform(platform: string): AcquisitionHook[] {
    return this.hooks.filter((hook) =>
      hook.platforms.some((p) => p.toLowerCase().includes(platform.toLowerCase()))
    );
  }

  /**
   * Récupérer les hooks par audience
   */
  static getHooksByAudience(audience: string): AcquisitionHook[] {
    return this.hooks.filter((hook) =>
      hook.targetAudience.toLowerCase().includes(audience.toLowerCase())
    );
  }

  /**
   * Générer un guide A/B testing
   */
  static generateABTestingGuide(): string {
    return `# Guide A/B Testing - Acquisition Hooks

## Stratégie de Test

### Phase 1 : Test des Hooks (Semaine 1-2)
Testez chaque hook avec 5 variantes différentes.
- Budget : 2 000 FCFA/jour par hook
- Durée : 7 jours
- Métrique clé : CTR (Click-Through Rate)

### Phase 2 : Optimisation (Semaine 3-4)
Gardez les 2 meilleurs hooks de la Phase 1.
- Budget : 5 000 FCFA/jour par hook
- Durée : 7 jours
- Métrique clé : CPC (Cost Per Click)

### Phase 3 : Scale (Semaine 5+)
Scalisez les hooks gagnants.
- Budget : 10 000+ FCFA/jour
- Durée : Continu
- Métrique clé : ROAS (Return on Ad Spend)

## Hooks Recommandés par Audience

### Débutants
1. The System Hook (Philosophical)
2. The Question Hook (Curiosity)

### Intermédiaires
1. The Proof Hook (Social Proof)
2. The Offer Hook (Offer)

### Traders Frustrés
1. The Disruption Hook (Disruption)
2. The Question Hook (Curiosity)

## Métriques de Succès

| Métrique | Cible | Excellent |
|----------|-------|-----------|
| CTR | > 2% | > 3.5% |
| CPC | < 500 FCFA | < 300 FCFA |
| ROAS | > 2 | > 3 |
| Conversion Rate | > 3% | > 5% |

## Checklist de Lancement

- [ ] Créer les 5 variantes de chaque hook
- [ ] Uploader les créatifs (image/vidéo)
- [ ] Configurer le pixel de suivi
- [ ] Définir les audiences
- [ ] Lancer les campagnes
- [ ] Monitorer quotidiennement
- [ ] Analyser les résultats
- [ ] Optimiser et scaler`;
  }

  /**
   * Générer des recommandations de hooks
   */
  static getRecommendedHooks(context: {
    audience?: string;
    platform?: string;
    objective?: string;
  }): AcquisitionHook[] {
    let recommended = this.hooks;

    if (context.audience) {
      recommended = recommended.filter((hook) =>
        hook.targetAudience.toLowerCase().includes(context.audience!.toLowerCase())
      );
    }

    if (context.platform) {
      recommended = recommended.filter((hook) =>
        hook.platforms.some((p) => p.toLowerCase().includes(context.platform!.toLowerCase()))
      );
    }

    if (context.objective) {
      if (context.objective.toLowerCase().includes("awareness")) {
        recommended = recommended.filter((hook) =>
          ["Philosophical", "Disruption"].includes(hook.category)
        );
      } else if (context.objective.toLowerCase().includes("engagement")) {
        recommended = recommended.filter((hook) =>
          ["Curiosity", "Disruption"].includes(hook.category)
        );
      } else if (context.objective.toLowerCase().includes("conversion")) {
        recommended = recommended.filter((hook) =>
          ["Social Proof", "Offer"].includes(hook.category)
        );
      }
    }

    return recommended;
  }

  /**
   * Générer un rapport de performance estimée
   */
  static generatePerformanceEstimate(hookId: string, budget: number): {
    estimatedImpressions: number;
    estimatedClicks: number;
    estimatedCPC: number;
    estimatedCTR: number;
  } {
    const hook = this.getHookById(hookId);
    if (!hook) {
      return {
        estimatedImpressions: 0,
        estimatedClicks: 0,
        estimatedCPC: 0,
        estimatedCTR: 0,
      };
    }

    // Extraire les valeurs de CTR estimé
    const ctrRange = hook.expectedCTR.split("-").map((v) => parseFloat(v) / 100);
    const avgCTR = (ctrRange[0] + ctrRange[1]) / 2;

    // Calculer les estimations
    const avgCPC = 400; // FCFA moyen
    const estimatedClicks = Math.floor(budget / avgCPC);
    const estimatedImpressions = Math.floor(estimatedClicks / avgCTR);
    const estimatedCTR = avgCTR * 100;

    return {
      estimatedImpressions,
      estimatedClicks,
      estimatedCPC: avgCPC,
      estimatedCTR,
    };
  }
}
