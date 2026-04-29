# Kelvex Trading Dashboard - Documentation Complète

## Vue d'ensemble

**Kelvex** est une plateforme web avancée de trading algorithmique et de formation Smart Money, propulsée par l'intelligence artificielle. L'application combine l'analyse de marché en temps réel, les Smart Money Concepts et l'IA pour offrir aux traders un avantage compétitif.

### Caractéristiques principales

- **Analyse IA en temps réel** : Détection automatique des Order Blocks, Stop Hunts et zones de demande/offre pour EUR/USD, V75 et V100
- **Chat IA contextuel** : Assistant Smart Money pour répondre aux questions complexes sur le trading
- **Système de scoring pédagogique** : Parcours de formation personnalisé selon le niveau et le score de l'utilisateur
- **Portail de paiement VIP** : Support du Mobile Money (Orange, MTN, Wave) et des cryptomonnaies
- **Déblocage automatique** : Accès VIP activé immédiatement après confirmation du paiement
- **Design sombre premium** : Interface élégante avec thème #05070D, accents #1E6BFF et #C8A84B
- **Authentification OAuth** : Intégration Manus OAuth pour une sécurité maximale

---

## Architecture Technique

### Stack Technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Frontend | React 19 + Tailwind CSS 4 | Latest |
| Backend | Express 4 + tRPC 11 | Latest |
| Base de données | MySQL / TiDB | Latest |
| ORM | Drizzle ORM | 0.44.5 |
| IA / LLM | Manus API | Intégré |
| Authentification | Manus OAuth | Intégré |
| Tests | Vitest | 2.1.4 |

### Structure du projet

```
kelvex-trading-dashboard/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/            # Pages principales (Dashboard, AIChat, VIPPortal, Home)
│   │   ├── components/       # Composants réutilisables (DashboardLayout, etc.)
│   │   ├── lib/              # Utilitaires (tRPC client)
│   │   ├── App.tsx           # Routeur principal
│   │   └── index.css         # Styles globaux (thème Kelvex)
│   └── public/               # Assets statiques
├── server/                    # Backend Express + tRPC
│   ├── routers.ts            # Procédures tRPC (market, education, chat, payments)
│   ├── db.ts                 # Helpers de base de données
│   ├── market.test.ts        # Tests Vitest
│   └── _core/                # Configuration interne (OAuth, LLM, etc.)
├── drizzle/                  # Schéma et migrations
│   ├── schema.ts             # Définition des tables
│   └── 0001_*.sql            # Migrations SQL
├── shared/                   # Code partagé
├── storage/                  # Helpers S3
└── package.json              # Dépendances

```

---

## Fonctionnalités Détaillées

### 1. Dashboard Principal

Le dashboard affiche en temps réel :

- **Statut algorithmique** : Indicateur de l'état du système IA (Manus Core Online)
- **Sentiment meter** : Biais institutionnel (Bears vs Bulls) avec visualisation gradient
- **Analyses IA** : Insights générés automatiquement pour EUR/USD avec confiance et niveau de risque
- **Modules éducatifs** : Parcours de formation débloqués selon le score utilisateur
- **Portail VIP** : Accès aux paiements et déblocage des signaux premium

**Route** : `/dashboard`

### 2. Chat IA Contextuel

L'assistant IA répond aux questions sur la Smart Money avec contexte de marché en direct.

**Fonctionnalités** :
- Historique de conversation persistant
- Contexte de marché (EUR/USD H4, zones d'accumulation, etc.)
- Réponses en markdown avec formatage via Streamdown
- Questions rapides prédéfinies

**Route** : `/ai-chat`

### 3. Portail de Paiement VIP

Permet aux utilisateurs de passer à un plan Pro ou VIP avec plusieurs méthodes de paiement.

**Méthodes supportées** :
- Orange Money
- MTN Mobile Money
- Wave
- Cryptomonnaies (Bitcoin, Ethereum, etc.)

**Fonctionnalités** :
- Affichage des plans avec comparaison de prix
- Résumé de paiement automatique
- Déblocage immédiat après confirmation
- Historique des transactions

**Route** : `/vip`

### 4. Landing Page

Page d'accueil présentant les fonctionnalités, les plans de tarification et les appels à l'action.

**Route** : `/`

---

## APIs tRPC

### Market Analysis

```typescript
// Récupérer les analyses récentes pour une paire
trpc.market.getLatest.useQuery({ 
  pair: "EUR/USD", 
  limit: 5 
})

// Générer une nouvelle analyse IA
trpc.market.generateAnalysis.useMutation({
  pair: "EUR/USD",
  timeframe: "H4",
  currentPrice: 1.0850,
  context: "Accumulation zone"
})
```

### Education & Scoring

```typescript
// Récupérer le score et le tier de l'utilisateur
trpc.education.getUserScore.useQuery()

// Récupérer les modules disponibles
trpc.education.getAvailableModules.useQuery()

// Compléter un module et gagner des points
trpc.education.completeModule.useMutation({
  moduleId: 1,
  pointsEarned: 10
})
```

### Chat IA

```typescript
// Envoyer un message à l'assistant
trpc.chat.sendMessage.useMutation({
  message: "Qu'est-ce qu'un Order Block ?",
  marketContext: "EUR/USD H4"
})

// Récupérer l'historique
trpc.chat.getHistory.useQuery({ limit: 50 })
```

### Payments & VIP

```typescript
// Créer un paiement
trpc.payments.createPayment.useMutation({
  tier: "vip",
  paymentMethod: "crypto",
  amount: 99.99
})

// Confirmer le paiement et activer VIP
trpc.payments.confirmPayment.useMutation({
  paymentId: 123,
  transactionId: "TXN-123456"
})

// Récupérer le statut d'abonnement
trpc.payments.getSubscriptionStatus.useQuery()

// Récupérer l'historique des paiements
trpc.payments.getHistory.useQuery()
```

---

## Schéma de Base de Données

### Tables principales

| Table | Description | Colonnes clés |
|-------|-------------|---------------|
| `users` | Utilisateurs authentifiés | id, openId, name, email, role, createdAt |
| `subscriptions` | Abonnements utilisateur | userId, tier, score, isActive, activatedAt, expiresAt |
| `market_analysis` | Analyses IA générées | pair, timeframe, analysis, confidence, riskLevel, sentimentScore |
| `educational_modules` | Modules de formation | title, requiredScore, tier, content, order |
| `user_progress` | Progression utilisateur | userId, moduleId, completed, completedAt |
| `payments` | Transactions de paiement | userId, amount, paymentMethod, tier, status, transactionId |
| `chat_history` | Historique de chat | userId, role, message, context, createdAt |

### Tiers d'abonnement

- **Free** : Accès limité aux analyses et modules gratuits
- **Pro** : Analyses illimitées, signaux quotidiens, chat IA avancé ($29.99/mois)
- **VIP** : Accès complet 24/7, signaux en temps réel, communauté exclusive ($99.99/mois)

---

## Déploiement

### Prérequis

1. Base de données MySQL/TiDB configurée
2. Variables d'environnement Manus OAuth
3. Clés API Manus pour l'IA et les notifications

### Étapes de déploiement

1. **Appliquer les migrations SQL** :
   ```bash
   pnpm drizzle-kit generate
   # Exécuter le SQL généré dans drizzle/0001_*.sql
   ```

2. **Configurer les variables d'environnement** :
   ```bash
   DATABASE_URL=mysql://user:pass@host/db
   JWT_SECRET=your-secret-key
   VITE_APP_ID=your-app-id
   OAUTH_SERVER_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=your-api-key
   ```

3. **Construire et déployer** :
   ```bash
   pnpm build
   pnpm start
   ```

---

## Tests

### Exécuter les tests

```bash
pnpm test
```

### Couverture de tests

Les tests couvrent les APIs critiques :
- Analyse de marché (getLatest, generateAnalysis)
- Scoring éducatif (getUserScore, getAvailableModules)
- Chat IA (sendMessage, getHistory)
- Paiements (createPayment, confirmPayment, getSubscriptionStatus)

---

## Guide Utilisateur

### Pour les traders gratuits

1. S'inscrire via Manus OAuth
2. Accéder au dashboard pour voir les analyses IA limitées
3. Utiliser le chat IA pour poser des questions
4. Compléter les modules éducatifs gratuits

### Pour les traders Pro/VIP

1. Accéder au portail VIP (`/vip`)
2. Choisir le plan (Pro ou VIP)
3. Sélectionner la méthode de paiement
4. Confirmer le paiement
5. Accès immédiat aux signaux premium et analyses avancées

---

## Support et Maintenance

### Notifications propriétaire

Le système envoie automatiquement des notifications au propriétaire pour :
- Chaque nouveau paiement/activation VIP
- Erreurs critiques du système
- Événements importants

### Monitoring

- Vérifier les logs du serveur : `.manus-logs/devserver.log`
- Vérifier les erreurs client : `.manus-logs/browserConsole.log`
- Vérifier les requêtes réseau : `.manus-logs/networkRequests.log`

---

## Roadmap Future

- Intégration avec des brokers réels (MT4, MT5)
- Signaux en temps réel via WebSocket
- Backtesting automatique des stratégies
- Communauté de traders avec partage de signaux
- Application mobile (iOS/Android)
- Intégration avec des services de notification (Telegram, Discord)

---

## Licence

Propriétaire - Kelvex Trading © 2026

---

## Support

Pour toute question ou assistance, contactez le support Kelvex via le portail utilisateur.
