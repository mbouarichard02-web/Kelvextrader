// Blog Service - Standalone (no DB dependencies needed for pillar articles)

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  level: "beginner" | "intermediate" | "professional";
  keywords: string[];
  readingTime: number;
  seoMetadata: {
    description: string;
    ogImage: string;
    canonical: string;
  };
  jsonLD: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
}

// 3 Articles Piliers de Claude
const PILLAR_ARTICLES: BlogArticle[] = [
  {
    id: "article_beginner_001",
    title: "Comment apprendre le trading quand on débute : le guide complet 2025",
    slug: "apprendre-trading-debutant-guide-complet",
    level: "beginner",
    keywords: [
      "apprendre le trading débutant",
      "comment trader",
      "trading pour débutant",
      "apprendre bourse gratuit",
      "trading Afrique",
    ],
    readingTime: 12,
    excerpt:
      "Découvrez le cadre exact pour apprendre le trading correctement. Pas de stratégie miracle, pas de promesses — une méthode structurée et adaptable à tous les profils.",
    seoMetadata: {
      description:
        "Guide complet pour débuter le trading en 2025. Apprenez les bases sans risque, construisez une stratégie testée, et évitez les erreurs coûteuses.",
      ogImage: "https://kelvextrader.com/og/beginner-guide.jpg",
      canonical: "https://kelvextrader.com/blog/apprendre-trading-debutant-guide-complet",
    },
    content: `
# Comment apprendre le trading quand on débute : le guide complet 2025

## Pourquoi 90% des débutants abandonnent le trading dans les 3 premiers mois

La réponse est simple : ils apprennent dans le mauvais ordre. Ils commencent par les indicateurs, les stratégies complexes, les signaux payants. Ils oublient l'essentiel : comprendre pourquoi les marchés bougent avant de comprendre comment en profiter.

Ce guide est différent. Il ne vous vendra pas une stratégie miracle. Il vous donnera le cadre exact — testé par des milliers de traders — pour construire une base solide et éviter les erreurs qui coûtent du capital et du temps.

## Les 4 marchés accessibles avec 5$ à 100$

### 1. Indices Synthétiques (Deriv)
Dépôt minimum : 5$. Accessibilité : Excellente depuis l'Afrique de l'Ouest (Mobile Money). Disponibilité : 24h/24. Idéal pour : les débutants qui veulent tester sans risque majeur.

### 2. Forex (XM, Exness)
Dépôt minimum : 50-100$. Accessibilité : Bonne. Effet de levier : 1:100 à 1:500. Idéal pour : les traders qui comprennent le risque.

### 3. Crypto (Binance, Bybit)
Dépôt minimum : Flexible. Accessibilité : Excellente. Volatilité : Très haute. Idéal pour : les traders qui acceptent la volatilité.

### 4. Matières Premières (Or, Pétrole)
Dépôt minimum : 100$+. Accessibilité : Bonne. Volatilité : Modérée. Idéal pour : les traders qui cherchent des tendances long terme.

## Les 4 stratégies de trading — choisissez la vôtre

### 1. Fibonacci
Basé sur les ratios de retracement (23.6%, 38.2%, 50%, 61.8%, 78.6%). Logique : les marchés retracent selon des proportions mathématiques. Idéal pour : les traders qui aiment les structures géométriques.

### 2. Price Action
Basé sur les patterns chartistes (double top, head & shoulders, triangles). Logique : la structure du prix révèle l'intention des gros traders. Idéal pour : les traders qui lisent les graphiques.

### 3. Smart Money Concepts (SMC)
Basé sur les Order Blocks et Fair Value Gaps (FVG). Logique : les gros traders laissent des traces (zones d'accumulation). Idéal pour : les traders qui cherchent les zones de liquidité.

### 4. Indicateurs Techniques
RSI, MACD, Bollinger Bands, moyennes mobiles. Logique : des outils mathématiques qui aident à identifier les tendances. Idéal pour : les traders qui préfèrent des signaux visuels clairs.

## Le plan d'apprentissage en 90 jours

| Phase | Durée | Objectif | Action quotidienne |
|-------|-------|----------|-------------------|
| Phase 1 | J1 – J30 | Comprendre les bases sans risque | 30 min de formation + Compte démo uniquement |
| Phase 2 | J31 – J60 | Backtester sa stratégie | Analyser 50 trades passés + Journal |
| Phase 3 | J61 – J90 | Premiers trades réels (micro) | Max 1% de risque par trade + Journalisation |

## La règle absolue que personne ne vous dit

Avant de déposer un seul franc ou dollar réel, vous devez avoir un système qui gagne sur au moins 100 trades en simulation. Pas 10. Pas 20. 100. C'est la seule façon de savoir si votre stratégie a un edge statistique réel ou si vous avez juste eu de la chance.

La plupart des débutants sautent cette étape. Ils déposent 50$ après 2 semaines de formation YouTube, perdent tout en 3 jours, et concluent que le trading ne fonctionne pas. Le trading fonctionne — mais il exige de la méthode.

## FAQ — Questions fréquentes des débutants

**Peut-on vraiment vivre du trading ?**
Oui, mais statistiquement moins de 10% des traders atteignent la rentabilité consistante. Ceux qui y arrivent ont en commun : une stratégie testée, une gestion du risque rigoureuse, et une patience à toute épreuve. C'est atteignable — mais pas en 30 jours.

**Quel capital faut-il pour débuter ?**
Sur les indices synthétiques Deriv, vous pouvez commencer avec 5$. Sur le Forex, 50-100$ permettent de trader en micro-lots. L'important n'est pas le montant — c'est de ne jamais risquer ce que vous ne pouvez pas vous permettre de perdre.

**Quelle plateforme utiliser en Afrique ?**
Deriv est la plateforme la plus accessible depuis l'Afrique de l'Ouest : dépôts en Mobile Money (Wave, Orange Money), interface en français, et indices synthétiques disponibles 24h/24.
    `,
    jsonLD: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    likes: 0,
  },
  {
    id: "article_intermediate_001",
    title: "Gestion du risque en trading : la méthode complète pour ne jamais exploser son compte",
    slug: "gestion-risque-trading-methode-complete",
    level: "intermediate",
    keywords: [
      "gestion du risque trading",
      "risk management forex",
      "taille de position trading",
      "stop loss placement",
      "drawdown trading",
    ],
    readingTime: 14,
    excerpt:
      "Un trader avec une stratégie qui gagne 40% du temps peut être plus rentable qu'un trader qui gagne 70%. Découvrez pourquoi la gestion du risque est plus importante que votre stratégie.",
    seoMetadata: {
      description:
        "Maîtrisez la gestion du risque en trading. Apprenez le ratio R:R, la taille de position, et les 5 règles des pros pour protéger votre capital.",
      ogImage: "https://kelvextrader.com/og/risk-management.jpg",
      canonical: "https://kelvextrader.com/blog/gestion-risque-trading-methode-complete",
    },
    content: `
# Gestion du risque en trading : la méthode complète pour ne jamais exploser son compte

## Pourquoi la gestion du risque est plus importante que votre stratégie

Voici un fait contre-intuitif : un trader avec une stratégie qui gagne 40% du temps peut être plus rentable qu'un trader qui gagne 70% du temps. Comment ? Par la gestion du risque.

Si votre stratégie gagne 40% mais que vos gains valent 3× vos pertes (R:R de 3:1), vous êtes rentable. Si votre stratégie gagne 70% mais que vous perdez 5× plus que vous ne gagnez, vous perdez de l'argent.

La gestion du risque n'est pas un accessoire — c'est le moteur de la rentabilité.

## Le ratio R:R (Risk-to-Reward) expliqué

Le ratio R:R mesure le rapport entre ce que vous risquez et ce que vous espérez gagner sur chaque trade. Un R:R de 1:2 signifie que vous risquez 1$ pour en gagner 2$.

| Ratio R:R | Win Rate nécessaire | Commentaire |
|-----------|-------------------|-------------|
| 1:1 | 50%+ | Minimum absolu — très difficile à maintenir |
| 1:2 | 34%+ | Standard professionnel — accessible |
| 1:3 | 26%+ | Excellent — même avec peu de trades gagnants |
| 1:5 | 17%+ | Stratégies de type sniper — rares mais puissants |

## La formule de taille de position (valable pour toutes les stratégies)

Peu importe votre stratégie (Fibonacci, Price Action, SMC, Indicateurs), le calcul de la taille de position est identique :

**Risque en $** = Capital × Pourcentage de risque
**Distance SL** = |Prix entrée - Prix stop loss| en pips
**Taille lot** = Risque $ ÷ (Distance SL × Valeur du pip)

**EXEMPLE : Capital $1 000 · Risk 1% · SL 40 pips**
- Risque = $1 000 × 1% = $10
- Taille = $10 ÷ (40 × $1/pip) = 0.25 lot

## Les 5 règles de gestion du risque que les pros appliquent

### Règle 1 — Ne jamais risquer plus de 1-2% par trade
Avec 1% de risque par trade, il faudrait 100 trades perdants consécutifs pour tout perdre. Avec 10%, 10 trades suffisent. La différence entre survivre et exploser son compte se joue ici.

### Règle 2 — Le stop loss n'est pas optionnel
Un trade sans stop loss n'est pas un trade — c'est un pari. Le stop loss est votre assurance. Il protège votre capital quand le marché ne va pas dans votre direction.

### Règle 3 — La règle du 3% quotidien
Si vous perdez 3% de votre capital en une journée, vous arrêtez de trader pour cette journée. Les mauvaises journées existent. Ce qui est inacceptable, c'est de continuer à perdre après les premières mauvaises décisions.

### Règle 4 — Ne jamais déplacer son stop loss dans la mauvaise direction
Déplacer son stop loss pour donner "plus d'espace" au trade quand le prix s'approche est l'une des erreurs les plus coûteuses. Si le marché atteint votre stop, votre analyse était fausse.

### Règle 5 — Journaliser chaque trade
Sans journal de trading, vous ne savez pas si votre stratégie fonctionne vraiment ou si vous avez juste eu de la chance. Le journal révèle vos patterns, vos biais émotionnels, et les conditions de marché où vous performez le mieux.

## Drawdown : comprendre et mesurer votre pire scénario

Le drawdown mesure la baisse maximale de votre capital depuis un pic. Un drawdown de 20% signifie que votre capital a baissé de 20% depuis son point le plus haut. Pour récupérer un drawdown de 20%, vous devez gagner 25% (pas 20%). Pour récupérer 50% de drawdown, vous avez besoin d'un gain de 100%.

| Drawdown subi | Gain nécessaire | Durée estimée |
|---------------|-----------------|---------------|
| 10% | 11.1% | 2-3 semaines |
| 20% | 25% | 1-2 mois |
| 30% | 42.9% | 3-4 mois |
| 50% | 100% | 6-12 mois |
| 70% | 233% | Souvent jamais |

## Gestion du risque selon votre stratégie

La logique est universelle mais l'application varie :

- **Fibonacci** : SL sous le niveau 100% du retracement
- **Price Action** : SL sous le swing low/high qui invalide votre setup
- **SMC** : SL sous le bas de l'Order Block ou du FVG
- **Indicateurs** : SL défini par le niveau technique qui contredit le signal
    `,
    jsonLD: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    likes: 0,
  },
  {
    id: "article_professional_001",
    title: "Passer un challenge prop firm en 2025 : stratégie, psychologie et protocole complet",
    slug: "passer-challenge-prop-firm-2025-protocole",
    level: "professional",
    keywords: [
      "passer challenge prop firm",
      "FTMO challenge",
      "prop firm trading",
      "funded account",
      "challenge forex réussir",
    ],
    readingTime: 16,
    excerpt:
      "Les firmes de financement présentent leurs challenges comme accessibles. Techniquement, c'est vrai. Pratiquement, le taux de succès est 10-15%. Voici le protocole manquant.",
    seoMetadata: {
      description:
        "Protocole complet pour passer un challenge prop firm. Apprenez la stratégie, la psychologie, et les règles exactes pour obtenir un compte financé.",
      ogImage: "https://kelvextrader.com/og/prop-firm-challenge.jpg",
      canonical: "https://kelvextrader.com/blog/passer-challenge-prop-firm-2025-protocole",
    },
    content: `
# Passer un challenge prop firm en 2025 : stratégie, psychologie et protocole complet

## Ce que les prop firms ne vous disent pas dans leur marketing

Les firmes de financement (FTMO, My Forex Funds, The Funded Trader, etc.) présentent leurs challenges comme accessibles à tous. Techniquement, c'est vrai. Pratiquement, le taux de succès tourne autour de 10-15%. Pas parce que les règles sont impossibles — mais parce que 85% des traders n'ont pas de protocole.

Ce guide est le protocole manquant.

## Comprendre les règles d'un challenge type

| Règle | Valeur typique | Votre objectif réel |
|-------|----------------|-------------------|
| Objectif de profit | 8-10% | Atteindre 8% en minimum de trades |
| Max Daily Drawdown | 5% | Ne jamais dépasser 3% dans la pratique |
| Max Total Drawdown | 10% | Rester à 7% maximum |
| Durée | 30-60 jours | Planifier pour 45 jours |
| Levier | 1:100 | Utiliser 1:50 maximum |

## La psychologie du challenge : pourquoi 85% échouent

Le challenge n'est pas difficile techniquement. Il est difficile psychologiquement. Voici pourquoi :

1. **Pression du temps** : Vous avez 30-60 jours pour prouver votre rentabilité
2. **Peur de perdre** : Chaque perte vous rapproche du drawdown limite
3. **Surtrading** : Vous tradez plus que d'habitude pour atteindre l'objectif
4. **Changement de stratégie** : Vous abandonnez votre système au premier drawdown

## Le protocole en 5 étapes

### Étape 1 : Sélection de la stratégie (Semaine 1)
Choisissez UNE stratégie testée. Pas de changements pendant le challenge.

### Étape 2 : Backtesting intensif (Semaine 2-3)
Testez sur 500+ trades passés. Win rate minimum 50%, R:R minimum 1:1.5.

### Étape 3 : Simulation du challenge (Semaine 4-6)
Tradez en démo avec les mêmes règles. Objectif : 8% en 45 jours sans dépasser 3% daily drawdown.

### Étape 4 : Exécution du vrai challenge (Jour 1-45)
Appliquez exactement le même protocole. Aucun changement.

### Étape 5 : Gestion du compte financé (Jour 46+)
Une fois approuvé, gérez le capital comme le vôtre. Objectif : 5-10% par mois.
    `,
    jsonLD: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    likes: 0,
  },
];

export class BlogService {
  // Générer JSON-LD pour un article
  static generateJsonLD(article: BlogArticle, baseUrl: string = "https://kelvextrader.com"): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.seoMetadata.description,
      image: article.seoMetadata.ogImage,
      datePublished: article.createdAt.toISOString(),
      dateModified: article.updatedAt.toISOString(),
      author: {
        "@type": "Organization",
        name: "KelvexTrader",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      publisher: {
        "@type": "Organization",
        name: "KelvexTrader",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": article.seoMetadata.canonical,
      },
      keywords: article.keywords.join(", "),
      articleBody: article.content,
    };
  }

  // Récupérer tous les articles
  static async getAllArticles(): Promise<BlogArticle[]> {
    return PILLAR_ARTICLES;
  }

  // Récupérer les articles par niveau
  static async getArticlesByLevel(level: "beginner" | "intermediate" | "professional"): Promise<BlogArticle[]> {
    return PILLAR_ARTICLES.filter((article) => article.level === level);
  }

  // Récupérer un article par slug
  static async getArticleBySlug(slug: string): Promise<BlogArticle | null> {
    const article = PILLAR_ARTICLES.find((a) => a.slug === slug);
    if (article) {
      article.jsonLD = this.generateJsonLD(article);
      article.views += 1;
    }
    return article || null;
  }

  // Incrémenter les vues
  static async incrementViews(slug: string): Promise<void> {
    const article = PILLAR_ARTICLES.find((a) => a.slug === slug);
    if (article) {
      article.views += 1;
    }
  }

  // Incrémenter les likes
  static async incrementLikes(slug: string): Promise<void> {
    const article = PILLAR_ARTICLES.find((a) => a.slug === slug);
    if (article) {
      article.likes += 1;
    }
  }

  // Récupérer les articles populaires
  static async getTrendingArticles(limit: number = 3): Promise<BlogArticle[]> {
    return PILLAR_ARTICLES.sort((a, b) => b.views - a.views).slice(0, limit);
  }

  // Rechercher par keyword
  static async searchByKeyword(keyword: string): Promise<BlogArticle[]> {
    const lowerKeyword = keyword.toLowerCase();
    return PILLAR_ARTICLES.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerKeyword) ||
        article.keywords.some((k) => k.toLowerCase().includes(lowerKeyword)) ||
        article.content.toLowerCase().includes(lowerKeyword)
    );
  }

  // Générer le sitemap XML
  static generateSitemap(baseUrl: string = "https://kelvextrader.com"): string {
    const urls = PILLAR_ARTICLES.map((article) => ({
      loc: `${baseUrl}/blog/${article.slug}`,
      lastmod: article.updatedAt.toISOString().split("T")[0],
      priority: article.level === "beginner" ? "0.9" : article.level === "intermediate" ? "0.8" : "0.7",
    }));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    return xml;
  }
}
