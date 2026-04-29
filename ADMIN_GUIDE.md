# KelvexTrader - Guide d'Administration

## 🔐 Accès Administrateur

Ce guide est réservé aux administrateurs de KelvexTrader. Pour accéder au panneau d'administration, vous devez avoir le rôle **"admin"** dans la base de données.

---

## 📋 Table des Matières

1. [Dashboard Admin](#dashboard-admin)
2. [Gestion des Utilisateurs](#gestion-des-utilisateurs)
3. [Gestion des Paiements](#gestion-des-paiements)
4. [Gestion du Contenu](#gestion-du-contenu)
5. [Analytics & Reporting](#analytics--reporting)
6. [Configuration Système](#configuration-système)
7. [Maintenance](#maintenance)
8. [Troubleshooting](#troubleshooting)

---

## 📊 Dashboard Admin

### Vue d'Ensemble

Le dashboard admin affiche :

- **Utilisateurs Actifs:** Nombre d'utilisateurs connectés
- **Revenus Totaux:** Montant total des paiements
- **Taux de Conversion:** % d'utilisateurs Free → Payants
- **Satisfaction Utilisateurs:** Score de satisfaction moyen
- **Alertes Système:** Problèmes détectés

### Métriques Clés

| Métrique | Cible | Fréquence |
|----------|-------|-----------|
| Utilisateurs Actifs/Jour | 1000+ | Temps réel |
| Taux de Rétention | 70%+ | Quotidien |
| Taux de Conversion | 15%+ | Quotidien |
| Satisfaction | 4.5/5 | Hebdomadaire |
| Uptime | 99.9%+ | Temps réel |

---

## 👥 Gestion des Utilisateurs

### Accéder à la Liste des Utilisateurs

1. Allez à **Admin → Utilisateurs**
2. Consultez la liste complète avec filtres

### Filtrer les Utilisateurs

- **Par Statut:** Free, Pro, VIP
- **Par Date d'Inscription:** Derniers 7j, 30j, 90j
- **Par Activité:** Actifs, Inactifs, Dormants
- **Par Score:** Débutant, Intermédiaire, Avancé

### Actions Utilisateur

#### **Consulter le Profil**
1. Cliquez sur un utilisateur
2. Voyez ses informations complètes
3. Consultez son historique d'activité

#### **Modifier le Rôle**
1. Sélectionnez l'utilisateur
2. Changez le rôle (user → admin)
3. Confirmez la modification

#### **Réinitialiser le Score**
1. Cliquez sur **"Réinitialiser le Score"**
2. Confirmez l'action
3. Le score revient à 0

#### **Suspendre/Réactiver**
1. Cliquez sur **"Suspendre"**
2. Choisissez la durée (1j, 7j, 30j, permanent)
3. Confirmez

#### **Supprimer un Utilisateur**
1. Cliquez sur **"Supprimer"**
2. Confirmez deux fois (sécurité)
3. Toutes les données sont supprimées

### Notifications Utilisateurs

#### **Envoyer un Message**
1. Sélectionnez les utilisateurs
2. Cliquez sur **"Envoyer un Message"**
3. Rédigez le message
4. Choisissez le canal (Email, In-app, Push)
5. Envoyez

#### **Campagnes de Marketing**
1. Allez à **Admin → Campagnes**
2. Créez une nouvelle campagne
3. Sélectionnez le segment d'utilisateurs
4. Configurez le message
5. Planifiez l'envoi

---

## 💳 Gestion des Paiements

### Historique des Paiements

1. Allez à **Admin → Paiements**
2. Consultez tous les paiements avec statut

### Statuts de Paiement

| Statut | Description |
|--------|-------------|
| **Pending** | En attente de confirmation |
| **Completed** | Paiement réussi |
| **Failed** | Paiement échoué |
| **Refunded** | Remboursement effectué |
| **Disputed** | Contestation ouverte |

### Actions de Paiement

#### **Confirmer un Paiement**
1. Trouvez le paiement en attente
2. Cliquez sur **"Confirmer"**
3. Vérifiez les détails
4. Confirmez

#### **Rembourser un Paiement**
1. Trouvez le paiement complété
2. Cliquez sur **"Rembourser"**
3. Choisissez le montant (total ou partiel)
4. Confirmez
5. Le remboursement est traité

#### **Gérer les Disputes**
1. Allez à **Admin → Disputes**
2. Consultez les paiements contestés
3. Examinez les preuves
4. Décidez (Approuver/Rejeter)

### Rapports Financiers

#### **Rapport de Revenus**
1. Allez à **Admin → Rapports → Revenus**
2. Sélectionnez la période
3. Choisissez le format (PDF, CSV, Excel)
4. Téléchargez

#### **Rapport par Méthode de Paiement**
1. Allez à **Admin → Rapports → Méthodes**
2. Consultez la répartition
3. Analysez les tendances

#### **Rapport de Rétention Client**
1. Allez à **Admin → Rapports → Rétention**
2. Consultez les taux par période
3. Identifiez les tendances

---

## 📝 Gestion du Contenu

### Articles de Blog

#### **Créer un Article**
1. Allez à **Admin → Contenu → Articles**
2. Cliquez sur **"Nouvel Article"**
3. Remplissez les détails :
   - Titre (FR + EN)
   - Contenu (Markdown)
   - Niveau (Débutant/Intermédiaire/Avancé)
   - Mots-clés SEO
4. Cliquez sur **"Publier"**

#### **Modifier un Article**
1. Trouvez l'article
2. Cliquez sur **"Éditer"**
3. Modifiez le contenu
4. Cliquez sur **"Mettre à jour"**

#### **Supprimer un Article**
1. Trouvez l'article
2. Cliquez sur **"Supprimer"**
3. Confirmez

### Scripts Vidéo

#### **Créer un Script**
1. Allez à **Admin → Contenu → Vidéos**
2. Cliquez sur **"Nouveau Script"**
3. Remplissez les détails :
   - Titre
   - Plateforme (TikTok/YouTube/Instagram)
   - Durée
   - Scènes
4. Cliquez sur **"Créer"**

#### **Générer une Vidéo**
1. Sélectionnez le script
2. Cliquez sur **"Générer Vidéo"**
3. Attendez la génération (quelques minutes)
4. Consultez l'aperçu
5. Publiez ou modifiez

### Réponses Sociales

#### **Ajouter une Réponse**
1. Allez à **Admin → Contenu → Social**
2. Cliquez sur **"Nouvelle Réponse"**
3. Sélectionnez la catégorie
4. Rédigez la réponse
5. Ajoutez les hashtags
6. Cliquez sur **"Ajouter"**

#### **Gérer les Réponses**
1. Consultez la liste des réponses
2. Modifiez ou supprimez selon les besoins
3. Suivez l'engagement

---

## 📊 Analytics & Reporting

### Dashboard Analytics

Consultez les métriques clés :

- **Utilisateurs:** Nouveaux, Actifs, Retenus
- **Engagement:** Vues, Clics, Conversions
- **Revenus:** Total, Moyen par utilisateur
- **Satisfaction:** Scores, Avis, Feedback

### Rapports Personnalisés

#### **Créer un Rapport**
1. Allez à **Admin → Rapports → Personnalisé**
2. Sélectionnez les métriques
3. Choisissez la période
4. Générez le rapport

#### **Exporter les Données**
1. Sélectionnez les données
2. Choisissez le format (CSV, Excel, PDF)
3. Téléchargez

### Alertes Automatiques

Configurez les alertes pour :

- **Revenus:** Baisse de 20% → Alerte
- **Utilisateurs:** Chute d'activité → Alerte
- **Erreurs:** Taux d'erreur > 1% → Alerte
- **Performance:** Temps de réponse > 2s → Alerte

---

## ⚙️ Configuration Système

### Paramètres Généraux

1. Allez à **Admin → Configuration**
2. Modifiez :
   - Nom de l'application
   - Logo
   - Couleurs de thème
   - Devise par défaut

### Paramètres de Paiement

1. Allez à **Admin → Paiement**
2. Configurez :
   - Clés API (Stripe, PayPal, etc.)
   - Devises acceptées
   - Taux de commission
   - Délais de paiement

### Paramètres d'Email

1. Allez à **Admin → Email**
2. Configurez :
   - Adresse d'envoi
   - Serveur SMTP
   - Templates d'email
   - Horaires d'envoi

### Paramètres de Sécurité

1. Allez à **Admin → Sécurité**
2. Configurez :
   - Authentification 2FA
   - Politique de mot de passe
   - Délai d'inactivité
   - Limite de tentatives de connexion

---

## 🔧 Maintenance

### Sauvegardes

#### **Sauvegarder la Base de Données**
1. Allez à **Admin → Maintenance → Sauvegardes**
2. Cliquez sur **"Nouvelle Sauvegarde"**
3. Attendez la completion
4. Téléchargez si nécessaire

#### **Restaurer une Sauvegarde**
1. Consultez la liste des sauvegardes
2. Sélectionnez une sauvegarde
3. Cliquez sur **"Restaurer"**
4. Confirmez (⚠️ Cela écrasera les données actuelles)

### Mises à Jour

#### **Vérifier les Mises à Jour**
1. Allez à **Admin → Maintenance → Mises à Jour**
2. Consultez les mises à jour disponibles
3. Lisez les notes de version

#### **Installer une Mise à Jour**
1. Cliquez sur **"Installer"**
2. Attendez la completion
3. Vérifiez que tout fonctionne

### Logs Système

1. Allez à **Admin → Logs**
2. Consultez les logs par type :
   - Erreurs
   - Avertissements
   - Informations
   - Débogages
3. Filtrez par date ou utilisateur

---

## 🐛 Troubleshooting

### Problèmes Courants

#### **Le site est lent**
1. Vérifiez la charge serveur
2. Consultez les logs d'erreur
3. Vérifiez la base de données
4. Redémarrez les services si nécessaire

#### **Les paiements ne fonctionnent pas**
1. Vérifiez les clés API
2. Consultez les logs de paiement
3. Testez avec un paiement de test
4. Contactez le support du fournisseur

#### **Les utilisateurs ne peuvent pas se connecter**
1. Vérifiez le statut OAuth
2. Consultez les logs d'authentification
3. Réinitialisez les sessions
4. Vérifiez la base de données

#### **Les vidéos ne se génèrent pas**
1. Vérifiez la configuration Remotion
2. Consultez les logs de génération
3. Vérifiez l'espace disque
4. Redémarrez le service

### Contacter le Support Technique

- 📧 **Email:** tech-support@kelvextrader.com
- 🆘 **Urgence:** +1 (555) 999-8888
- 📱 **Slack:** #tech-support

---

## 📞 Contacts Importants

| Rôle | Email | Téléphone |
|------|-------|----------|
| CEO | ceo@kelvextrader.com | +1 (555) 111-1111 |
| CTO | cto@kelvextrader.com | +1 (555) 222-2222 |
| Support | support@kelvextrader.com | +1 (555) 333-3333 |
| Ventes | sales@kelvextrader.com | +1 (555) 444-4444 |

---

**Dernière mise à jour:** 29 Avril 2026

**Version:** 1.0
