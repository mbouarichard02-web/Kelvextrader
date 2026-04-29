// Landing Page Nexus Service - Manage the Nexus offer landing page

export interface NexusLandingPage {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta: string;
  };
  nexusOffer: {
    title: string;
    description: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
    pricing: {
      originalPrice: number;
      newPrice: number;
      currency: string;
      savings: number;
      savingsPercent: number;
      guarantee: string;
    };
  };
  socialProof: Array<{
    quote: string;
    author: string;
    country: string;
    result: string;
  }>;
  comparison: Array<{
    name: string;
    originalPrice: number;
    newPrice: number;
  }>;
  footerCta: {
    headline: string;
    subheadline: string;
    button: string;
  };
}

export class LandingPageService {
  private static nexusPage: NexusLandingPage = {
    hero: {
      eyebrow: "OFFRE NEXUS EXCLUSIVE",
      headline: "810 000 FCFA de valeur.\nDisponible pour 8 400 FCFA / mois.",
      subheadline:
        "Déposez 10$ chez Deriv. Obtenez -30% sur Cloud Ultra. Pour toujours.",
      cta: "Accéder à l'Offre Nexus",
    },
    nexusOffer: {
      title: "Comment ça marche ?",
      description:
        "L'Offre Nexus est une alliance stratégique entre KelvexTrader et Deriv. Vous gagnez une réduction à vie. Nous gagnons un partenaire de confiance.",
      steps: [
        {
          number: 1,
          title: "Ouvrir un compte Deriv",
          description: "Via notre lien partenaire (2 minutes)",
        },
        {
          number: 2,
          title: "Déposer 10$",
          description: "Dépôt minimum requis (accepte crypto, cartes, portefeuilles)",
        },
        {
          number: 3,
          title: "Réduction activée",
          description: "Accès Cloud Ultra à 8 400 FCFA / mois, à vie",
        },
      ],
      pricing: {
        originalPrice: 12000,
        newPrice: 8400,
        currency: "FCFA",
        savings: 3600,
        savingsPercent: 30,
        guarantee: "Garantie 30 jours. Annulation sans frais.",
      },
    },
    socialProof: [
      {
        quote:
          "J'ai passé 3 challenges prop firm avant de trouver KelvexTrader. Ça m'a changé la vie.",
        author: "Amadou K.",
        country: "Sénégal",
        result: "+250% de rentabilité en 6 mois",
      },
      {
        quote:
          "Les analyses institutionnelles de Kelvex sont incroyables. Elles m'ont fait gagner 2M FCFA en 2 mois.",
        author: "Fatou M.",
        country: "Côte d'Ivoire",
        result: "+2M FCFA en 2 mois",
      },
      {
        quote:
          "Enfin une plateforme qui explique le trading sans bullshit. KelvexAI répond à TOUTES mes questions.",
        author: "Ousmane T.",
        country: "Mali",
        result: "Rentable depuis 3 mois",
      },
    ],
    comparison: [
      {
        name: "Cloud Pro",
        originalPrice: 6000,
        newPrice: 4200,
      },
      {
        name: "Cloud Ultra",
        originalPrice: 12000,
        newPrice: 8400,
      },
      {
        name: "Cloud Elite",
        originalPrice: 24000,
        newPrice: 16800,
      },
    ],
    footerCta: {
      headline: "Prêt à transformer votre trading ?",
      subheadline:
        "Rejoignez 5 000+ traders qui utilisent KelvexTrader pour atteindre la rentabilité.",
      button: "Commencer maintenant →",
    },
  };

  /**
   * Récupérer la landing page complète
   */
  static getLandingPage(): NexusLandingPage {
    return this.nexusPage;
  }

  /**
   * Récupérer la section hero
   */
  static getHeroSection() {
    return this.nexusPage.hero;
  }

  /**
   * Récupérer l'offre Nexus
   */
  static getNexusOffer() {
    return this.nexusPage.nexusOffer;
  }

  /**
   * Récupérer les preuves sociales
   */
  static getSocialProof() {
    return this.nexusPage.socialProof;
  }

  /**
   * Récupérer la comparaison des prix
   */
  static getPricingComparison() {
    return this.nexusPage.comparison;
  }

  /**
   * Générer le HTML de la landing page
   */
  static generateHTML(): string {
    const page = this.nexusPage;

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KelvexTrader - Offre Nexus Exclusive</title>
  <meta name="description" content="810 000 FCFA de valeur. Disponible pour 8 400 FCFA / mois. Offre Nexus exclusive.">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Sora', sans-serif; 
      background: linear-gradient(135deg, #03060C 0%, #0A1628 100%);
      color: #EEF2F8;
      line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    
    /* Hero Section */
    .hero {
      padding: 120px 40px;
      text-align: center;
      background: linear-gradient(180deg, #040C1E 0%, #03060C 100%);
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(22, 104, 220, 0.1), transparent 65%);
      pointer-events: none;
    }
    .hero-eyebrow {
      font-size: 12px;
      color: #C8A84B;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .hero-h1 {
      font-size: clamp(32px, 5vw, 60px);
      font-weight: 800;
      letter-spacing: -2.5px;
      line-height: 1.1;
      margin-bottom: 20px;
    }
    .hero-sub {
      font-size: 18px;
      color: #9BAABB;
      max-width: 600px;
      margin: 0 auto 40px;
      font-weight: 300;
    }
    .hero-cta {
      background: #C8A84B;
      color: #000;
      padding: 18px 50px;
      font-size: 16px;
      font-weight: 700;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      letter-spacing: 0.5px;
    }
    
    /* Nexus Offer */
    .nexus-section {
      padding: 80px 40px;
      background: #060D1A;
      border-top: 1px solid rgba(255, 255, 255, 0.055);
      border-bottom: 1px solid rgba(255, 255, 255, 0.055);
    }
    .nexus-box {
      background: linear-gradient(135deg, rgba(22, 104, 220, 0.08), rgba(200, 168, 75, 0.05));
      border: 1px solid rgba(200, 168, 75, 0.25);
      border-radius: 16px;
      padding: 60px 50px;
      max-width: 800px;
      margin: 0 auto;
    }
    .nexus-h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .nexus-desc {
      font-size: 16px;
      color: #9BAABB;
      margin-bottom: 40px;
      font-weight: 300;
    }
    .steps {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .step {
      flex: 1;
      min-width: 150px;
      text-align: center;
    }
    .step-num {
      width: 50px;
      height: 50px;
      background: rgba(22, 104, 220, 0.1);
      border: 1px solid rgba(22, 104, 220, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-size: 20px;
      font-weight: 600;
      color: #4A8FFF;
    }
    .step-title {
      font-weight: 600;
      margin-bottom: 8px;
    }
    .step-desc {
      font-size: 13px;
      color: #9BAABB;
    }
    
    /* Pricing */
    .pricing {
      text-align: center;
      margin-bottom: 30px;
    }
    .price-original {
      font-size: 16px;
      color: #3F4E61;
      text-decoration: line-through;
      margin-bottom: 8px;
    }
    .price-new {
      font-size: 48px;
      font-weight: 700;
      color: #EEF2F8;
      letter-spacing: -2px;
      margin-bottom: 12px;
    }
    .savings-badge {
      display: inline-block;
      background: rgba(16, 228, 160, 0.1);
      border: 1px solid rgba(16, 228, 160, 0.2);
      color: #10E4A0;
      padding: 6px 16px;
      border-radius: 4px;
      font-size: 12px;
    }
    
    /* Social Proof */
    .proof-section {
      padding: 80px 40px;
      background: #03060C;
      border-bottom: 1px solid rgba(255, 255, 255, 0.055);
    }
    .proof-title {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 50px;
    }
    .proof-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    .proof-card {
      background: #0A1628;
      border: 1px solid rgba(255, 255, 255, 0.055);
      border-radius: 12px;
      padding: 30px;
    }
    .proof-quote {
      font-size: 15px;
      color: #9BAABB;
      font-style: italic;
      margin-bottom: 20px;
      line-height: 1.8;
    }
    .proof-author {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .proof-country {
      font-size: 12px;
      color: #3F4E61;
      margin-bottom: 12px;
    }
    .proof-result {
      font-size: 14px;
      color: #C8A84B;
      font-weight: 600;
    }
    
    /* Footer CTA */
    .footer-cta {
      padding: 80px 40px;
      text-align: center;
      background: linear-gradient(180deg, #03060C, #040C1E);
    }
    .footer-h2 {
      font-size: 44px;
      font-weight: 800;
      letter-spacing: -2px;
      margin-bottom: 16px;
    }
    .footer-sub {
      font-size: 18px;
      color: #9BAABB;
      margin-bottom: 40px;
      font-weight: 300;
    }
    .footer-btn {
      background: #C8A84B;
      color: #000;
      padding: 18px 50px;
      font-size: 16px;
      font-weight: 700;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .hero { padding: 60px 20px; }
      .nexus-box { padding: 40px 25px; }
      .steps { flex-direction: column; }
    }
  </style>
</head>
<body>
  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-eyebrow">${page.hero.eyebrow}</div>
      <h1 class="hero-h1">${page.hero.headline}</h1>
      <p class="hero-sub">${page.hero.subheadline}</p>
      <button class="hero-cta">${page.hero.cta}</button>
    </div>
  </section>

  <!-- Nexus Offer -->
  <section class="nexus-section">
    <div class="container">
      <div class="nexus-box">
        <h2 class="nexus-h2">${page.nexusOffer.title}</h2>
        <p class="nexus-desc">${page.nexusOffer.description}</p>
        
        <div class="steps">
          ${page.nexusOffer.steps
            .map(
              (step) => `
          <div class="step">
            <div class="step-num">${step.number}</div>
            <div class="step-title">${step.title}</div>
            <div class="step-desc">${step.description}</div>
          </div>
          `
            )
            .join("")}
        </div>

        <div class="pricing">
          <div class="price-original">${page.nexusOffer.pricing.originalPrice} ${page.nexusOffer.pricing.currency}</div>
          <div class="price-new">${page.nexusOffer.pricing.newPrice} <span style="font-size: 24px;">FCFA/mois</span></div>
          <div class="savings-badge">Économisez ${page.nexusOffer.pricing.savingsPercent}% (${page.nexusOffer.pricing.savings} FCFA)</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Social Proof -->
  <section class="proof-section">
    <div class="container">
      <h2 class="proof-title">Résultats Réels</h2>
      <div class="proof-grid">
        ${page.socialProof
          .map(
            (proof) => `
        <div class="proof-card">
          <div class="proof-quote">"${proof.quote}"</div>
          <div class="proof-author">${proof.author}</div>
          <div class="proof-country">${proof.country}</div>
          <div class="proof-result">${proof.result}</div>
        </div>
        `
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- Footer CTA -->
  <section class="footer-cta">
    <div class="container">
      <h2 class="footer-h2">${page.footerCta.headline}</h2>
      <p class="footer-sub">${page.footerCta.subheadline}</p>
      <button class="footer-btn">${page.footerCta.button}</button>
    </div>
  </section>
</body>
</html>`;
  }

  /**
   * Générer un rapport de conversion
   */
  static generateConversionReport(): {
    estimatedMonthlyRevenue: number;
    estimatedConversions: number;
    estimatedROI: number;
  } {
    // Estimations basées sur des benchmarks typiques
    const estimatedDailyVisitors = 1000;
    const conversionRate = 0.05; // 5%
    const monthlyConversions = estimatedDailyVisitors * conversionRate * 30;
    const monthlyRevenue = monthlyConversions * 8400; // Prix Nexus

    return {
      estimatedMonthlyRevenue: monthlyRevenue,
      estimatedConversions: monthlyConversions,
      estimatedROI: ((monthlyRevenue - 50000) / 50000) * 100, // Coût marketing estimé
    };
  }
}
