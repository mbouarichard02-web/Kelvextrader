// Social Response Service - Context-aware responses for social media

export interface SocialResponse {
  id: string;
  category: string;
  trigger: string; // La question qui déclenche la réponse
  response: string; // La réponse complète
  platform: "twitter" | "linkedin" | "instagram" | "tiktok" | "generic";
  tone: "friendly" | "professional" | "educational" | "motivational";
  cta: string; // Call to action
  hashtags?: string[];
  createdAt: Date;
}

// Réponses Sociales Contextuelles
const SOCIAL_RESPONSES: SocialResponse[] = [
  // Catégorie: Capital Minimum
  {
    id: "social_capital_001",
    category: "Capital Minimum",
    trigger: "Quel est le capital minimum pour débuter le trading ?",
    response: `Sur les indices synthétiques Deriv, vous pouvez commencer avec 5$. Sur le Forex, 50-100$ permettent de trader en micro-lots. L'important n'est pas le montant — c'est de ne jamais risquer ce que vous ne pouvez pas vous permettre de perdre.

Découvrez votre configuration optimale en 2 minutes avec notre Quiz d'Onboarding. Gratuit, sans engagement.`,
    platform: "generic",
    tone: "educational",
    cta: "Faire le quiz",
    hashtags: ["#Trading", "#Débutant", "#Forex"],
    createdAt: new Date(),
  },
  {
    id: "social_capital_002",
    category: "Capital Minimum",
    trigger: "On peut vraiment trader avec 5$ ?",
    response: `Oui, absolument. Deriv propose des indices synthétiques avec un dépôt minimum de 5$. C'est parfait pour tester votre stratégie sans risque majeur.

Mais attention : le capital n'est pas le problème. C'est la méthode. 90% des débutants perdent parce qu'ils n'ont pas de système testé.

Nous vous donnons ce système. Quiz gratuit → kelvextrader.com/quiz`,
    platform: "twitter",
    tone: "friendly",
    cta: "Commencer",
    hashtags: ["#Trading", "#Crypto", "#Forex"],
    createdAt: new Date(),
  },

  // Catégorie: Rentabilité
  {
    id: "social_profitability_001",
    category: "Rentabilité",
    trigger: "Peut-on vraiment vivre du trading ?",
    response: `Oui, mais statistiquement moins de 10% des traders atteignent la rentabilité consistante. Ceux qui y arrivent ont en commun :
- Une stratégie testée
- Une gestion du risque rigoureuse
- Une patience à toute épreuve

C'est atteignable — mais pas en 30 jours.

Découvrez votre parcours personnalisé : kelvextrader.com/quiz`,
    platform: "generic",
    tone: "motivational",
    cta: "Découvrir le parcours",
    hashtags: ["#Trading", "#Rentabilité", "#Mindset"],
    createdAt: new Date(),
  },
  {
    id: "social_profitability_002",
    category: "Rentabilité",
    trigger: "Combien peut-on gagner par mois en trading ?",
    response: `Ça dépend de votre capital, votre stratégie, et votre gestion du risque.

Un trader professionnel vise 5-10% par mois. Un trader avec 1 000$ qui gagne 5% = 50$/mois. Avec 10 000$ = 500$/mois.

Mais le vrai objectif n'est pas le gain mensuel — c'est la consistance. Un trader qui gagne 5% chaque mois pendant 10 ans devient millionnaire.

Apprenez la bonne méthode : kelvextrader.com/quiz`,
    platform: "linkedin",
    tone: "professional",
    cta: "En savoir plus",
    hashtags: ["#Trading", "#Finance", "#Investissement"],
    createdAt: new Date(),
  },

  // Catégorie: Gestion du Risque
  {
    id: "social_risk_001",
    category: "Gestion du Risque",
    trigger: "Quel pourcentage de risque par trade ?",
    response: `La règle d'or : ne jamais risquer plus de 1-2% de votre capital par trade.

Pourquoi ? Avec 1% de risque par trade, il faudrait 100 trades perdants consécutifs pour tout perdre. Avec 10%, 10 trades suffisent.

La différence entre survivre et exploser son compte se joue ici.

Apprenez la gestion du risque professionnelle : kelvextrader.com/blog/gestion-risque-trading`,
    platform: "generic",
    tone: "educational",
    cta: "Lire l'article",
    hashtags: ["#RiskManagement", "#Trading", "#Education"],
    createdAt: new Date(),
  },
  {
    id: "social_risk_002",
    category: "Gestion du Risque",
    trigger: "Comment calculer la taille de position ?",
    response: `Formule universelle (valable pour toutes les stratégies) :

Risque en $ = Capital × % de risque
Distance SL = |Prix entrée - Prix stop loss| en pips
Taille lot = Risque $ ÷ (Distance SL × Valeur du pip)

Exemple : Capital 1 000$ · Risk 1% · SL 40 pips
Risque = 1 000 × 1% = 10$
Taille = 10 ÷ (40 × 1) = 0.25 lot

Maîtrisez cette formule et vous survivrez aux pires drawdowns.`,
    platform: "twitter",
    tone: "educational",
    cta: "Sauvegarder",
    hashtags: ["#Trading", "#RiskManagement", "#Forex"],
    createdAt: new Date(),
  },

  // Catégorie: Stratégies
  {
    id: "social_strategy_001",
    category: "Stratégies",
    trigger: "Quelle est la meilleure stratégie de trading ?",
    response: `Il n'existe pas de "meilleure" stratégie. Il existe la stratégie qui fonctionne POUR VOUS.

Fibonacci ? Price Action ? SMC ? Indicateurs ? Toutes fonctionnent si :
1. Vous l'avez testée sur 100+ trades
2. Vous comprenez ses conditions d'utilisation
3. Vous la tradez avec discipline

Le problème n'est pas la stratégie. C'est la discipline.

Découvrez quelle stratégie vous convient : kelvextrader.com/quiz`,
    platform: "generic",
    tone: "motivational",
    cta: "Trouver ma stratégie",
    hashtags: ["#Trading", "#Strategy", "#Mindset"],
    createdAt: new Date(),
  },
  {
    id: "social_strategy_002",
    category: "Stratégies",
    trigger: "Fibonacci ou Price Action ?",
    response: `Fibonacci : parfait si vous aimez les structures géométriques.
Price Action : parfait si vous lisez bien les graphiques.
SMC : parfait si vous cherchez les zones de liquidité.
Indicateurs : parfait si vous préférez des signaux visuels clairs.

Aucune n'est meilleure. Elles sont juste différentes.

Ce qui compte : testez-la, maîtrisez-la, tradez-la avec discipline.

Quiz gratuit pour trouver VOTRE stratégie : kelvextrader.com/quiz`,
    platform: "instagram",
    tone: "friendly",
    cta: "Commencer",
    hashtags: ["#Trading", "#TradingStrategy", "#Forex"],
    createdAt: new Date(),
  },

  // Catégorie: Psychologie
  {
    id: "social_psychology_001",
    category: "Psychologie",
    trigger: "Comment gérer les émotions en trading ?",
    response: `La psychologie est 80% du trading. Voici les 3 règles :

1. **Acceptez les pertes** : Elles font partie du jeu. Un trader qui gagne 40% du temps peut être rentable.

2. **Journalisez chaque trade** : Sans journal, vous ne savez pas si vous avez de la chance ou une stratégie.

3. **Arrêtez après 3% de perte quotidienne** : Les mauvaises journées existent. Ce qui est inacceptable, c'est de continuer à perdre.

Maîtrisez votre psychologie et vous maîtrisez le marché.`,
    platform: "linkedin",
    tone: "professional",
    cta: "En savoir plus",
    hashtags: ["#Trading", "#Psychology", "#Mindset"],
    createdAt: new Date(),
  },

  // Catégorie: Prop Firms
  {
    id: "social_propfirm_001",
    category: "Prop Firms",
    trigger: "Comment passer un challenge prop firm ?",
    response: `85% des traders échouent les challenges prop firm. Pas parce que les règles sont impossibles — mais parce qu'ils n'ont pas de protocole.

Voici le protocole :
1. Backtestez sur 500+ trades
2. Simulez le challenge en démo
3. Exécutez exactement le même système
4. Gagnez votre compte financé

Découvrez le protocole complet : kelvextrader.com/blog/passer-challenge-prop-firm`,
    platform: "generic",
    tone: "educational",
    cta: "Lire le guide",
    hashtags: ["#PropFirm", "#Trading", "#FTMO"],
    createdAt: new Date(),
  },
];

export class SocialResponseService {
  // Récupérer toutes les réponses
  static async getAllResponses(): Promise<SocialResponse[]> {
    return SOCIAL_RESPONSES;
  }

  // Récupérer les réponses par catégorie
  static async getResponsesByCategory(category: string): Promise<SocialResponse[]> {
    return SOCIAL_RESPONSES.filter(
      (response) => response.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Récupérer une réponse par trigger
  static async getResponseByTrigger(trigger: string): Promise<SocialResponse | null> {
    const lowerTrigger = trigger.toLowerCase();
    return (
      SOCIAL_RESPONSES.find((response) =>
        response.trigger.toLowerCase().includes(lowerTrigger)
      ) || null
    );
  }

  // Récupérer les réponses par plateforme
  static async getResponsesByPlatform(
    platform: "twitter" | "linkedin" | "instagram" | "tiktok" | "generic"
  ): Promise<SocialResponse[]> {
    return SOCIAL_RESPONSES.filter(
      (response) => response.platform === platform || response.platform === "generic"
    );
  }

  // Rechercher les réponses par keyword
  static async searchResponses(keyword: string): Promise<SocialResponse[]> {
    const lowerKeyword = keyword.toLowerCase();
    return SOCIAL_RESPONSES.filter(
      (response) =>
        response.trigger.toLowerCase().includes(lowerKeyword) ||
        response.response.toLowerCase().includes(lowerKeyword) ||
        response.category.toLowerCase().includes(lowerKeyword)
    );
  }

  // Générer le contenu formaté pour une plateforme
  static formatForPlatform(
    response: SocialResponse,
    platform: "twitter" | "linkedin" | "instagram" | "tiktok"
  ): string {
    let formatted = response.response;

    if (platform === "twitter") {
      // Limiter à 280 caractères
      if (formatted.length > 280) {
        formatted = formatted.substring(0, 277) + "...";
      }
    } else if (platform === "linkedin") {
      // Ajouter des sauts de ligne pour LinkedIn
      formatted = formatted.replace(/\n/g, "\n\n");
    } else if (platform === "instagram") {
      // Ajouter des emojis pour Instagram
      formatted = formatted.replace(/\n/g, "\n");
    }

    // Ajouter les hashtags
    if (response.hashtags && response.hashtags.length > 0) {
      formatted += "\n\n" + response.hashtags.join(" ");
    }

    return formatted;
  }

  // Récupérer les catégories uniques
  static async getCategories(): Promise<string[]> {
    const categories = new Set(SOCIAL_RESPONSES.map((response) => response.category));
    return Array.from(categories);
  }

  // Récupérer les réponses par tone
  static async getResponsesByTone(
    tone: "friendly" | "professional" | "educational" | "motivational"
  ): Promise<SocialResponse[]> {
    return SOCIAL_RESPONSES.filter((response) => response.tone === tone);
  }

  // Générer une réponse personnalisée pour le chat
  static async generateChatResponse(question: string): Promise<string> {
    const response = await this.getResponseByTrigger(question);
    if (response) {
      return response.response;
    }

    // Si pas de réponse exacte, chercher par keyword
    const keyword = question.split(" ")[0];
    const responses = await this.searchResponses(keyword);
    if (responses.length > 0) {
      return responses[0].response;
    }

    return "Je n'ai pas de réponse pré-préparée pour cette question. Posez une autre question ou consultez notre blog.";
  }
}
