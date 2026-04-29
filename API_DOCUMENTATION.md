# KelvexTrader - Documentation Complète des APIs

## 📋 Table des Matières

1. [Authentification](#authentification)
2. [Market Analysis](#market-analysis)
3. [Educational Modules](#educational-modules)
4. [Payments & Subscriptions](#payments--subscriptions)
5. [Chat IA](#chat-ia)
6. [Content Management](#content-management)
7. [SEO & Automation](#seo--automation)
8. [Error Handling](#error-handling)

---

## 🔐 Authentification

Toutes les requêtes utilisent **Manus OAuth** avec des cookies de session.

### Endpoints d'Authentification

#### `auth.me`
Récupère l'utilisateur actuel.

**Type:** `publicProcedure.query()`

**Réponse:**
```typescript
{
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
}
```

#### `auth.logout`
Déconnecte l'utilisateur.

**Type:** `publicProcedure.mutation()`

**Réponse:**
```typescript
{
  success: boolean;
}
```

---

## 📊 Market Analysis

### `market.getLatest`
Récupère les dernières analyses de marché pour une paire.

**Type:** `publicProcedure.query()`

**Input:**
```typescript
{
  pair: string;        // ex: "EUR/USD", "V75", "V100"
  limit?: number;      // défaut: 5
}
```

**Réponse:**
```typescript
{
  pair: string;
  timestamp: Date;
  price: number;
  sentiment: "bullish" | "bearish" | "neutral";
  confidence: number;  // 0-100
  analysis: string;
}[]
```

### `market.generateAnalysis`
Génère une analyse IA en direct pour une paire.

**Type:** `publicProcedure.query()`

**Input:**
```typescript
{
  pair: string;
  timeframe?: "1m" | "5m" | "15m" | "1h" | "4h" | "1d";
  includeSmartMoney?: boolean;
}
```

**Réponse:**
```typescript
{
  pair: string;
  analysis: string;
  sentiment: "bullish" | "bearish" | "neutral";
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  smartMoneySignals?: {
    orderBlocks: string[];
    liquidityZones: string[];
    keyLevels: string[];
  };
}
```

---

## 🎓 Educational Modules

### `education.getAvailableModules`
Récupère les modules éducatifs disponibles selon le score utilisateur.

**Type:** `publicProcedure.query()`

**Réponse:**
```typescript
{
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  requiredScore: number;
  isUnlocked: boolean;
  content: string;
  duration: number; // en minutes
}[]
```

### `education.getUserScore`
Récupère le score pédagogique de l'utilisateur.

**Type:** `protectedProcedure.query()`

**Réponse:**
```typescript
{
  userId: string;
  totalScore: number;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  progress: number;  // 0-100
  unlockedModules: string[];
  completedQuizzes: number;
}
```

### `education.updateScore`
Met à jour le score utilisateur après une action.

**Type:** `protectedProcedure.mutation()`

**Input:**
```typescript
{
  action: "quiz_completed" | "module_completed" | "analysis_viewed";
  points: number;
}
```

**Réponse:**
```typescript
{
  newScore: number;
  newLevel: string;
  unlockedModules?: string[];
}
```

---

## 💳 Payments & Subscriptions

### `subscription.getStatus`
Récupère le statut d'abonnement de l'utilisateur.

**Type:** `protectedProcedure.query()`

**Réponse:**
```typescript
{
  userId: string;
  tier: "free" | "pro" | "vip";
  status: "active" | "expired" | "cancelled";
  expiresAt: Date;
  features: string[];
}
```

### `payment.initiate`
Initie un paiement.

**Type:** `protectedProcedure.mutation()`

**Input:**
```typescript
{
  tier: "pro" | "vip";
  method: "mobile_money" | "crypto" | "card";
  currency?: string;
}
```

**Réponse:**
```typescript
{
  paymentId: string;
  amount: number;
  currency: string;
  status: "pending";
  redirectUrl?: string;
  paymentDetails: {
    method: string;
    provider?: string;
  };
}
```

### `payment.verify`
Vérifie un paiement complété.

**Type:** `protectedProcedure.mutation()`

**Input:**
```typescript
{
  paymentId: string;
  transactionId: string;
}
```

**Réponse:**
```typescript
{
  success: boolean;
  subscription?: {
    tier: string;
    expiresAt: Date;
  };
}
```

---

## 💬 Chat IA

### `chat.sendMessage`
Envoie un message au chat IA.

**Type:** `protectedProcedure.mutation()`

**Input:**
```typescript
{
  message: string;
  context?: {
    pair?: string;
    timeframe?: string;
    marketData?: Record<string, unknown>;
  };
}
```

**Réponse:**
```typescript
{
  response: string;
  streaming: boolean;
  sources?: string[];
  confidence: number;
}
```

### `chat.getHistory`
Récupère l'historique du chat.

**Type:** `protectedProcedure.query()`

**Input:**
```typescript
{
  limit?: number;  // défaut: 50
}
```

**Réponse:**
```typescript
{
  id: string;
  message: string;
  response: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}[]
```

---

## 📝 Content Management

### `content.blog.getAllArticles`
Récupère tous les articles du blog.

**Type:** `publicProcedure.query()`

**Réponse:**
```typescript
{
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  level: "beginner" | "intermediate" | "advanced";
  views: number;
  likes: number;
  publishedAt: Date;
}[]
```

### `content.blog.getBySlug`
Récupère un article complet par son slug.

**Type:** `publicProcedure.query()`

**Input:**
```typescript
{
  slug: string;
}
```

**Réponse:**
```typescript
{
  id: string;
  title: string;
  slug: string;
  content: string;
  level: string;
  views: number;
  likes: number;
  publishedAt: Date;
  seoMetadata: Record<string, unknown>;
}
```

### `content.videos.getAllScripts`
Récupère tous les scripts vidéo.

**Type:** `publicProcedure.query()`

**Réponse:**
```typescript
{
  id: string;
  title: string;
  platform: "tiktok" | "youtube" | "instagram";
  duration: number;
  scenes: number;
}[]
```

### `content.social.getByCategory`
Récupère les réponses sociales par catégorie.

**Type:** `publicProcedure.query()`

**Input:**
```typescript
{
  category: "capital" | "rentabilité" | "risque" | "stratégies" | "psychologie" | "prop_firms";
}
```

**Réponse:**
```typescript
{
  id: string;
  category: string;
  trigger: string;
  response: string;
  hashtags: string[];
  cta: string;
}[]
```

---

## 🌍 SEO & Automation

### `automation.seo.generateMetadata`
Génère les métadonnées SEO pour une page.

**Type:** `publicProcedure.query()`

**Input:**
```typescript
{
  slug: string;
  title: Record<"fr" | "en", string>;
  description: Record<"fr" | "en", string>;
  keywords: Record<"fr" | "en", string[]>;
  content: Record<"fr" | "en", string>;
  language: "fr" | "en";
  baseUrl: string;
}
```

**Réponse:**
```typescript
{
  language: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  structuredData: Record<string, unknown>;
  hreflang: Array<{ lang: string; href: string }>;
}
```

### `automation.seo.calculateScore`
Calcule le score SEO d'une page.

**Type:** `publicProcedure.query()`

**Input:**
```typescript
{
  slug: string;
  title: Record<"fr" | "en", string>;
  description: Record<"fr" | "en", string>;
  keywords: Record<"fr" | "en", string[]>;
  content: Record<"fr" | "en", string>;
  language: "fr" | "en";
}
```

**Réponse:**
```typescript
number // 0-100
```

### `automation.video.generate`
Génère une vidéo Remotion.

**Type:** `protectedProcedure.mutation()`

**Input:**
```typescript
{
  title: string;
  platform: "tiktok" | "youtube" | "instagram";
  duration: number;
  scenes: Array<{
    duration: number;
    type: "text" | "image" | "animation" | "voiceover";
    content: string;
  }>;
}
```

**Réponse:**
```typescript
{
  id: string;
  scriptId: string;
  status: "pending" | "processing" | "completed" | "failed";
  videoUrl?: string;
  duration: number;
  createdAt: Date;
}
```

### `automation.pipeline.createJob`
Crée un job de pipeline automatisé.

**Type:** `protectedProcedure.mutation()`

**Input:**
```typescript
{
  topic: string;
  language: "fr" | "en";
  platform: "tiktok" | "youtube" | "instagram";
}
```

**Réponse:**
```typescript
{
  id: string;
  status: "pending";
  stage: number;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  createdAt: Date;
}
```

### `automation.pipeline.startAutomatic`
Démarre la génération automatique de vidéos (2/jour).

**Type:** `protectedProcedure.mutation()`

**Réponse:**
```typescript
{
  message: string;
}
```

---

## ⚠️ Error Handling

### Codes d'Erreur Courants

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Utilisateur non authentifié |
| `FORBIDDEN` | Accès refusé (rôle insuffisant) |
| `NOT_FOUND` | Ressource non trouvée |
| `BAD_REQUEST` | Données invalides |
| `INTERNAL_SERVER_ERROR` | Erreur serveur |
| `PAYMENT_FAILED` | Erreur de paiement |
| `QUOTA_EXCEEDED` | Limite dépassée |

### Format d'Erreur

```typescript
{
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
```

---

## 🔄 Rate Limiting

- **Free tier:** 100 requêtes/heure
- **Pro tier:** 1 000 requêtes/heure
- **VIP tier:** Illimité

---

## 📞 Support

Pour toute question, contactez : `support@kelvextrader.com`
