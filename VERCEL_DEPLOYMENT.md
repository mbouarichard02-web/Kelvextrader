# KelvexTrader - Guide de Déploiement Vercel

## 🚀 Configuration Vercel

Ce projet est configuré pour un déploiement automatique sur Vercel.

### Fichiers de Configuration

- **vercel.json** - Configuration complète Vercel
  - Build command: `pnpm build`
  - Framework: Vite
  - Root Directory: `.` (racine du projet)
  - Rewrites pour SPA configurées

- **.vercelignore** - Fichiers ignorés lors du déploiement

- **package.json** - Scripts de build et démarrage

### Variables d'Environnement Requises

Configurez ces variables dans Vercel Settings → Environment Variables :

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=your_oauth_portal_url
OWNER_OPEN_ID=your_owner_id
OWNER_NAME=your_owner_name
BUILT_IN_FORGE_API_URL=your_forge_api_url
BUILT_IN_FORGE_API_KEY=your_forge_api_key
VITE_FRONTEND_FORGE_API_KEY=your_frontend_key
VITE_FRONTEND_FORGE_API_URL=your_frontend_api_url
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_analytics_id
```

### Déploiement Automatique

1. **Connectez votre GitHub** à Vercel
2. **Sélectionnez ce dépôt** `kelvextrader`
3. **Vercel détecte** automatiquement :
   - Framework: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
4. **Cliquez Deploy**

### Troubleshooting

#### Erreur 404 NOT_FOUND
- ✅ Vérifiez que `vercel.json` existe
- ✅ Vérifiez que `rootDirectory` est défini à `.`
- ✅ Vérifiez que les rewrites SPA sont configurées
- ✅ Attendez 2-3 minutes après le déploiement

#### Build Failure
- ✅ Vérifiez les Build Logs dans Vercel Dashboard
- ✅ Vérifiez que `pnpm install` fonctionne localement
- ✅ Vérifiez que `pnpm build` produit un dossier `dist`

#### Variables d'Environnement Manquantes
- ✅ Allez à Settings → Environment Variables
- ✅ Ajoutez toutes les variables listées ci-dessus
- ✅ Redéployez après avoir ajouté les variables

### Commandes Locales

```bash
# Installation
pnpm install

# Développement
pnpm dev

# Build
pnpm build

# Tests
pnpm test

# Vérification TypeScript
pnpm check
```

### URLs

- **Production:** https://kelvextrader.vercel.app
- **Preview:** https://kelvextrader-git-*.vercel.app
- **Local Dev:** http://localhost:3000

### Support

Pour toute question sur le déploiement Vercel, consultez :
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [tRPC Documentation](https://trpc.io)
