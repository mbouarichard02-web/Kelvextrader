# Kelvex Trading Dashboard - TODO

## Architecture & Base de Données
- [x] Schéma Drizzle : tables users, subscriptions, market_analysis, educational_modules, user_scores, payments
- [x] Migrations SQL générées et appliquées
- [x] Helpers de base de données dans server/db.ts

## Backend - APIs & Logique Métier
- [x] API IA pour analyse de marché en direct (EUR/USD, V75, V100)
- [x] Moteur de scoring pédagogique (calcul du score utilisateur)
- [x] Système de déblocage de modules selon le score
- [x] Procédures tRPC pour les analyses IA
- [x] Procédures tRPC pour le scoring et les modules éducatifs
- [x] Procédures tRPC pour la gestion des paiements VIP
- [x] Notification propriétaire lors des paiements/activations VIP

## Frontend - Interface Utilisateur
- [x] Design sombre premium : thème #05070D, accents #1E6BFF et #C8A84B
- [x] Sidebar de navigation fixe avec menu principal (DashboardLayout)
- [x] Dashboard principal avec statut algorithmique en direct
- [x] Sentiment meter pour le biais institutionnel (Daily)
- [x] Affichage des métriques de marché en temps réel
- [x] Cartes d'analyse IA avec confiance et risque
- [x] Responsive design et glassmorphism

## Chat IA Contextuel
- [x] Composant de chat interactif avec historique
- [x] Intégration de l'IA pour répondre aux questions Smart Money
- [x] Contexte de marché en direct dans les réponses
- [x] Streaming des réponses IA (via Streamdown)

## Système de Paiement & VIP
- [x] Portail de paiement avec support Mobile Money (Orange, MTN, Wave)
- [x] Support des cryptomonnaies
- [x] Déblocage automatique des accès VIP après paiement
- [x] Gestion des statuts d'abonnement (Free, Pro, VIP)
- [x] Historique des transactions utilisateur

## Authentification & Autorisation
- [x] Manus OAuth intégré
- [x] Gestion des rôles (user, admin)
- [x] Contrôle d'accès basé sur le statut d'abonnement
- [x] Profil utilisateur avec historique et statut

## Tests & Qualité
- [ ] Tests unitaires Vitest pour les APIs critiques
- [ ] Tests des procédures tRPC
- [ ] Tests du système de scoring
- [ ] Tests du déblocage automatique VIP

## Déploiement & Documentation
- [ ] Checkpoint final du projet
- [ ] Documentation des APIs
- [ ] Guide d'utilisation pour les utilisateurs
- [ ] Guide d'administration pour le propriétaire
