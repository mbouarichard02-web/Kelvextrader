// Meta Ads Service - Manage Facebook/Instagram advertising campaigns

export interface MetaAd {
  id: string;
  title: string;
  objective: string;
  audience: string;
  format: string;
  primaryHook: string;
  bodyText: string;
  ctaText: string;
  adTitle: string;
  adDescription: string;
  creative: {
    type: "image" | "video";
    specs: string;
    directives: string;
  };
  targeting: {
    countries: string[];
    ageRange: [number, number];
    interests: string[];
    behaviors: string[];
    objective: string;
    budgetPerDay: string;
  };
}

export class MetaAdsService {
  private static ads: MetaAd[] = [
    {
      id: "meta_ad_001",
      title: "The System — Acquisition Froide",
      objective: "Trafic vers Quiz",
      audience: "Débutants 18–35 ans",
      format: "Single Image / Vidéo 15s",
      primaryHook: "Le trading n'est pas un talent.\nC'est un système.",
      bodyText: `Les marchés financiers génèrent des opportunités chaque jour.

La plupart des traders les manquent. Non par manque de talent — par manque de méthode.

KelvexTrader est l'infrastructure qui vous donne cette méthode.
Parcours personnalisé. Analyses institutionnelles. Intelligence artificielle.

Entièrement gratuit pour commencer.`,
      ctaText: "Définir mon profil →",
      adTitle: "KelvexTrader. L'infrastructure du trading.",
      adDescription: "Quiz gratuit. Parcours en 2 minutes.",
      creative: {
        type: "image",
        specs: "1:1 pour Feed, 9:16 pour Reels/Stories",
        directives: `Fond bleu nuit profond (#03060C). Graphe EUR/USD épuré en ligne or. Zone encadrée or (Order Block ou support). Aucun texte dans l'image — visuel 100% institutionnel.

Alternative vidéo 15s : Animation lente du graphe qui monte, zone en or qui pulse, logo KELVEX TRADER apparaît en fondu. Aucune voix off. Musique : ambiance tech froide.`,
      },
      targeting: {
        countries: ["CI", "SN", "CM", "ML", "BF", "GN", "TG", "BJ", "FR", "BE"],
        ageRange: [22, 38],
        interests: ["Trading", "Forex", "Deriv", "MetaTrader", "Finance personnelle"],
        behaviors: ["Acheteurs en ligne", "Utilisateurs mobile avancés"],
        objective: "Messages (vers WhatsApp / Messenger)",
        budgetPerDay: "3 000 – 5 000 FCFA",
      },
    },
    {
      id: "meta_ad_002",
      title: "The Proof — Preuve Sociale + Offre Nexus",
      objective: "Conversions Cloud Ultra",
      audience: "Intermédiaires (Retargeting)",
      format: "Carrousel 3 slides",
      primaryHook: "810 000 FCFA de valeur.\nDisponible pour 8 400 FCFA / mois.",
      bodyText: `En 2024, des traders sans expérience préalable ont passé leurs premiers challenges prop firm.

Ils avaient deux choses en commun :
Une méthode. Et les bons outils.

L'un de ces outils : KelvexTrader Cloud Ultra.

Aujourd'hui, une offre unique : déposez 10$ chez votre broker partenaire. Obtenez -30% sur votre abonnement Ultra. Pour toujours.`,
      ctaText: "Accéder à l'Offre Nexus →",
      adTitle: "Cloud Ultra — Offre Nexus Exclusive",
      adDescription: "-30% à vie. Déposez 10$ pour activer.",
      creative: {
        type: "image",
        specs: "1200x628px (carrousel)",
        directives: `Slide 1 : Fond dégradé bleu-or. Prix en gros (810 000 FCFA barré, 8 400 FCFA en or).
Slide 2 : Liste des features (Signaux, Bibliothèque, KelvexAI, Sessions Live).
Slide 3 : CTA + étapes (Ouvrir compte → Déposer 10$ → Réduction activée).`,
      },
      targeting: {
        countries: ["CI", "SN", "CM", "ML", "BF", "GN", "TG", "BJ", "FR", "BE"],
        ageRange: [22, 45],
        interests: ["Trading avancé", "Prop Trading", "Forex professionnel"],
        behaviors: ["Visiteurs site J-7", "Engagés sur posts", "Fans page", "Lookalike 1%"],
        objective: "Conversions · Pixel KelvexTrader",
        budgetPerDay: "5 000 – 10 000 FCFA",
      },
    },
    {
      id: "meta_ad_003",
      title: "The Question — Disruption Philosophique",
      objective: "Engagement + Quiz",
      audience: "Tous profils",
      format: "Vidéo 30s texte animé",
      primaryHook: "Vous tradez depuis combien de temps ?\nEt votre compte est rentable ?",
      bodyText: `[Slide 1 — 0:00–0:05]
Vous tradez depuis combien de temps ?

[Slide 2 — 0:05–0:10]
6 mois. 1 an. 2 ans.
Et votre compte est rentable ?

[Slide 3 — 0:10–0:18]
Si la réponse est non —
ce n'est pas votre faute.
Personne ne vous a montré la bonne méthode.

[Slide 4 — 0:18–0:25]
KelvexTrader change ça.
Méthode institutionnelle. IA. Communauté.

[Slide 5 — 0:25–0:30]
Découvrez votre profil. Gratuit.`,
      ctaText: "Commencer le Quiz →",
      adTitle: "La bonne méthode existe.",
      adDescription: "Découvrez-la en 2 minutes.",
      creative: {
        type: "video",
        specs: "1080x1920px (vertical) · 30 secondes · MP4",
        directives: `Texte blanc sur fond bleu nuit. Chaque slide apparaît avec une transition douce. Aucune voix off. Musique : ambiance tech minimaliste. Logo KELVEX TRADER en fondu à la fin.`,
      },
      targeting: {
        countries: ["CI", "SN", "CM", "ML", "BF", "GN", "TG", "BJ", "FR", "BE"],
        ageRange: [18, 50],
        interests: ["Trading", "Finance", "Entrepreneuriat"],
        behaviors: ["Tous les utilisateurs"],
        objective: "Engagement + Quiz",
        budgetPerDay: "2 000 – 4 000 FCFA",
      },
    },
  ];

  /**
   * Récupérer tous les ads
   */
  static getAllAds(): MetaAd[] {
    return this.ads;
  }

  /**
   * Récupérer un ad par ID
   */
  static getAdById(id: string): MetaAd | null {
    return this.ads.find((ad) => ad.id === id) || null;
  }

  /**
   * Récupérer les ads par objectif
   */
  static getAdsByObjective(objective: string): MetaAd[] {
    return this.ads.filter((ad) => ad.objective.toLowerCase().includes(objective.toLowerCase()));
  }

  /**
   * Récupérer les ads par audience
   */
  static getAdsByAudience(audience: string): MetaAd[] {
    return this.ads.filter((ad) => ad.audience.toLowerCase().includes(audience.toLowerCase()));
  }

  /**
   * Générer un rapport de campagne
   */
  static generateCampaignReport(): {
    totalAds: number;
    objectives: string[];
    totalBudgetPerDay: string;
    estimatedReach: string;
  } {
    const objectivesSet = new Set(this.ads.map((ad) => ad.objective));
    const objectives = Array.from(objectivesSet);
    const budgets = this.ads.map((ad) => {
      const match = ad.targeting.budgetPerDay.match(/(\d+)\s*–\s*(\d+)/);
      return match ? parseInt(match[2]) : 0;
    });
    const totalBudget = budgets.reduce((a, b) => a + b, 0);

    return {
      totalAds: this.ads.length,
      objectives,
      totalBudgetPerDay: `${totalBudget.toLocaleString()} FCFA`,
      estimatedReach: "50,000 – 100,000 impressions/jour",
    };
  }

  /**
   * Exporter les ads au format Meta Ads Manager
   */
  static exportForMetaAdsManager(): string {
    const exported = this.ads.map((ad) => ({
      campaign_name: `KelvexTrader - ${ad.title}`,
      objective: ad.objective,
      audience: {
        countries: ad.targeting.countries,
        age_min: ad.targeting.ageRange[0],
        age_max: ad.targeting.ageRange[1],
        interests: ad.targeting.interests,
      },
      creative: {
        primary_text: ad.primaryHook,
        headline: ad.adTitle,
        description: ad.adDescription,
        cta_type: "LEARN_MORE",
      },
      budget_daily: ad.targeting.budgetPerDay,
    }));

    return JSON.stringify(exported, null, 2);
  }

  /**
   * Générer un guide de déploiement
   */
  static generateDeploymentGuide(): string {
    return `# Guide de Déploiement Meta Ads - KelvexTrader

## Étape 1 : Préparation
1. Créer un compte Business Manager Meta
2. Connecter votre pixel KelvexTrader
3. Configurer les conversions (Quiz, Signup, Purchase)

## Étape 2 : Créer les Campagnes
Pour chaque ad (3 au total) :
1. Aller à Ads Manager
2. Créer une nouvelle campagne
3. Sélectionner l'objectif (Trafic, Conversions, Engagement)
4. Configurer l'audience (voir targeting)
5. Uploader les créatifs (image/vidéo)
6. Définir le budget quotidien

## Étape 3 : Configuration des Audiences
- Pays : CI, SN, CM, ML, BF, GN, TG, BJ, FR, BE
- Âge : 22–38 ans (Ad 1), 22–45 ans (Ad 2), 18–50 ans (Ad 3)
- Intérêts : Trading, Forex, Finance personnelle

## Étape 4 : Suivi & Optimisation
- Monitorer le ROAS (Return on Ad Spend)
- A/B tester les créatifs
- Optimiser le budget vers les meilleurs performers
- Viser un ROAS > 3 avant de scaler

## Budget Recommandé
- Phase Test : 10,000 – 20,000 FCFA/jour (7 jours)
- Phase Scale : 50,000 – 100,000 FCFA/jour (si ROAS > 3)

## Métriques Clés
- CTR (Click-Through Rate) : > 2%
- CPC (Cost Per Click) : < 500 FCFA
- ROAS : > 3
- Conversion Rate : > 5%`;
  }
}
