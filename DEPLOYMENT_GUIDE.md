# Guide de Déploiement Vercel - KelvexTrader

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Préparation du Projet](#préparation-du-projet)
3. [Déploiement sur Vercel](#déploiement-sur-vercel)
4. [Configuration de la Base de Données](#configuration-de-la-base-de-données)
5. [Variables d'Environnement](#variables-denvironnement)
6. [Domaines Personnalisés](#domaines-personnalisés)
7. [Monitoring et Logs](#monitoring-et-logs)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prérequis

- **Node.js** 18+ installé
- **Git** configuré avec GitHub
- **Compte Vercel** (gratuit)
- **Compte GitHub** (pour connecter le repo)
- **Base de données MySQL** (TiDB ou autre)

---

## 📦 Préparation du Projet

### 1. Vérifier la Structure du Projet

```bash
kelvex-trading-dashboard/
├── client/                    # Frontend React
├── server/                    # Backend Express + tRPC
├── drizzle/                   # Migrations DB
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── vercel.json               # Configuration Vercel
```

### 2. Créer le fichier `vercel.json`

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret",
    "VITE_APP_ID": "@vite_app_id",
    "OAUTH_SERVER_URL": "@oauth_server_url",
    "VITE_OAUTH_PORTAL_URL": "@vite_oauth_portal_url",
    "OWNER_OPEN_ID": "@owner_open_id",
    "OWNER_NAME": "@owner_name",
    "BUILT_IN_FORGE_API_URL": "@built_in_forge_api_url",
    "BUILT_IN_FORGE_API_KEY": "@built_in_forge_api_key",
    "VITE_FRONTEND_FORGE_API_KEY": "@vite_frontend_forge_api_key",
    "VITE_FRONTEND_FORGE_API_URL": "@vite_frontend_forge_api_url"
  }
}
```

### 3. Vérifier le `package.json`

Assurez-vous que les scripts de build sont corrects :

```json
{
  "scripts": {
    "dev": "concurrently \"pnpm run server\" \"pnpm run client\"",
    "build": "pnpm run build:client && pnpm run build:server",
    "build:client": "cd client && vite build",
    "build:server": "tsc --project server/tsconfig.json",
    "start": "node dist/server/index.js",
    "test": "vitest"
  }
}
```

### 4. Vérifier le `.gitignore`

```
node_modules/
dist/
build/
.env
.env.local
.env.*.local
*.log
.DS_Store
.manus-logs/
```

### 5. Pousser le Code sur GitHub

```bash
git add .
git commit -m "feat: prepare for Vercel deployment"
git push origin main
```

---

## 🚀 Déploiement sur Vercel

### Étape 1 : Connecter le Repository GitHub

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"New Project"**
3. Sélectionnez **"Import Git Repository"**
4. Cherchez `kelvex-trading-dashboard`
5. Cliquez sur **"Import"**

### Étape 2 : Configurer le Projet

1. **Project Name** : `kelvex-trading-dashboard`
2. **Framework Preset** : Sélectionnez **"Other"** (car c'est un projet personnalisé)
3. **Root Directory** : `.` (racine du projet)
4. **Build Command** : `pnpm build`
5. **Output Directory** : `dist`
6. **Install Command** : `pnpm install`

### Étape 3 : Ajouter les Variables d'Environnement

Avant de déployer, cliquez sur **"Environment Variables"** et ajoutez :

```
DATABASE_URL=mysql://user:password@host:3306/kelvex
JWT_SECRET=your-secret-key-here
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
```

### Étape 4 : Déployer

Cliquez sur **"Deploy"** et attendez que le build se termine (~5-10 minutes).

---

## 🗄️ Configuration de la Base de Données

### 1. Créer une Base de Données TiDB (Recommandé)

1. Allez sur [tidb.cloud](https://tidb.cloud)
2. Créez un nouveau cluster
3. Notez la chaîne de connexion (DATABASE_URL)

### 2. Exécuter les Migrations

Une fois déployé sur Vercel, exécutez les migrations :

```bash
# Localement
pnpm drizzle-kit push

# Ou via Vercel CLI
vercel env pull
pnpm drizzle-kit push
```

### 3. Vérifier la Connexion

```bash
# Tester la connexion à la DB
pnpm run test:db
```

---

## 🔐 Variables d'Environnement

### Obligatoires

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | Chaîne de connexion MySQL | `mysql://user:pass@host/db` |
| `JWT_SECRET` | Clé de signature des tokens | `your-secret-key-min-32-chars` |
| `VITE_APP_ID` | ID de l'app OAuth | `app_123456` |
| `OAUTH_SERVER_URL` | URL du serveur OAuth | `https://api.manus.im` |

### Optionnelles

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NODE_ENV` | Environnement | `production` |
| `PORT` | Port du serveur | `3000` |
| `LOG_LEVEL` | Niveau de log | `info` |

---

## 🌐 Domaines Personnalisés

### 1. Ajouter un Domaine

1. Allez sur votre projet Vercel
2. Cliquez sur **"Settings"** → **"Domains"**
3. Entrez votre domaine (ex: `kelvextrader.com`)
4. Suivez les instructions pour configurer les DNS

### 2. Configurer les DNS

Chez votre registraire de domaine, ajoutez :

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Ou pour le domaine racine :

```
Type: A
Name: @
Value: 76.76.19.165
```

---

## 📊 Monitoring et Logs

### 1. Accéder aux Logs

```bash
# Via Vercel CLI
vercel logs --follow

# Ou dans le dashboard Vercel
# Settings → Logs
```

### 2. Monitorer les Performances

1. Allez sur **Analytics** dans le dashboard Vercel
2. Consultez :
   - **Response Time**
   - **Requests**
   - **Error Rate**

### 3. Configurer les Alertes

1. Allez sur **Settings** → **Alerts**
2. Configurez les seuils pour :
   - Erreurs 5xx
   - Temps de réponse élevé
   - Taux d'erreur élevé

---

## 🔧 Troubleshooting

### Problème : Build échoue

**Solution :**
```bash
# Vérifier les erreurs TypeScript
pnpm run type-check

# Vérifier les dépendances
pnpm install

# Reconstruire localement
pnpm build
```

### Problème : Erreur de connexion à la DB

**Solution :**
```bash
# Vérifier la DATABASE_URL
vercel env pull

# Tester la connexion
pnpm run test:db

# Vérifier les firewall rules
# (Assurez-vous que Vercel peut accéder à votre DB)
```

### Problème : OAuth ne fonctionne pas

**Solution :**
```bash
# Vérifier les URLs OAuth
echo $OAUTH_SERVER_URL
echo $VITE_OAUTH_PORTAL_URL

# Vérifier le VITE_APP_ID
echo $VITE_APP_ID

# Redéployer après correction
git push origin main
```

### Problème : Erreur 502 Bad Gateway

**Solution :**
1. Vérifier les logs : `vercel logs --follow`
2. Vérifier la mémoire du serveur
3. Vérifier les timeouts de la DB
4. Redéployer : `vercel deploy --prod`

---

## 📈 Optimisations pour la Production

### 1. Activer la Compression

Dans `server/index.ts` :

```typescript
import compression from "compression";

app.use(compression());
```

### 2. Configurer le Cache

```typescript
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=3600");
  next();
});
```

### 3. Monitorer les Performances

```bash
# Générer un rapport de performance
pnpm run analyze
```

### 4. Optimiser les Images

Utilisez des images optimisées via `manus-upload-file --webdev`.

---

## ✅ Checklist de Déploiement

- [ ] Code poussé sur GitHub
- [ ] `vercel.json` créé et configuré
- [ ] Variables d'environnement ajoutées
- [ ] Base de données configurée
- [ ] Migrations exécutées
- [ ] Tests passants localement
- [ ] Déploiement sur Vercel réussi
- [ ] Tests fonctionnels en production
- [ ] Domaine personnalisé configuré
- [ ] Monitoring activé
- [ ] Alertes configurées

---

## 🎯 Prochaines Étapes

1. **Monitoring** : Configurez les alertes et les logs
2. **Performance** : Optimisez les temps de réponse
3. **Sécurité** : Activez les headers de sécurité
4. **Backup** : Configurez les sauvegardes automatiques de la DB
5. **CI/CD** : Configurez les tests automatiques avant le déploiement

---

## 📞 Support

Pour plus d'aide :
- Documentation Vercel : https://vercel.com/docs
- Documentation tRPC : https://trpc.io/docs
- Documentation Drizzle : https://orm.drizzle.team
