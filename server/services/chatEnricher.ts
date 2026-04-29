// Chat Enricher Service - Integrate social responses into AI chat

import { SocialResponseService } from "./socialResponseService";

export interface EnrichedChatResponse {
  originalResponse: string;
  enrichedResponse: string;
  contextualInsights: string[];
  suggestedFollowUp: string;
  socialProof?: string;
}

export class ChatEnricher {
  /**
   * Enrichir une réponse IA avec des réponses sociales contextuelles
   */
  static async enrichChatResponse(
    userQuestion: string,
    aiResponse: string
  ): Promise<EnrichedChatResponse> {
    // Récupérer une réponse sociale pertinente
    const socialResponse = await SocialResponseService.generateChatResponse(userQuestion);

    // Extraire les insights contextuels
    const contextualInsights = this.extractInsights(userQuestion, aiResponse);

    // Générer un suivi suggéré
    const suggestedFollowUp = this.generateFollowUp(userQuestion);

    // Enrichir la réponse
    const enrichedResponse = this.buildEnrichedResponse(aiResponse, socialResponse);

    return {
      originalResponse: aiResponse,
      enrichedResponse,
      contextualInsights,
      suggestedFollowUp,
      socialProof: socialResponse,
    };
  }

  /**
   * Extraire les insights contextuels de la question
   */
  private static extractInsights(userQuestion: string, aiResponse: string): string[] {
    const insights: string[] = [];
    const lowerQuestion = userQuestion.toLowerCase();

    // Détecter les thèmes et ajouter des insights
    if (lowerQuestion.includes("capital") || lowerQuestion.includes("débutant")) {
      insights.push("💡 Vous pouvez commencer avec aussi peu que 5$ sur Deriv");
      insights.push("📊 L'important n'est pas le capital, c'est la méthode");
    }

    if (lowerQuestion.includes("risque") || lowerQuestion.includes("perte")) {
      insights.push("⚠️ Règle d'or : ne jamais risquer plus de 1-2% par trade");
      insights.push("📈 Un trader qui gagne 40% du temps peut être rentable avec un bon R:R");
    }

    if (lowerQuestion.includes("stratégie") || lowerQuestion.includes("trading")) {
      insights.push("🎯 Testez votre stratégie sur 100+ trades avant de trader réel");
      insights.push("📝 Journalisez chaque trade pour identifier vos patterns");
    }

    if (lowerQuestion.includes("prop firm") || lowerQuestion.includes("challenge")) {
      insights.push("🏆 85% des traders échouent les challenges prop firm");
      insights.push("✅ Le protocole : backtesting → simulation → exécution");
    }

    if (lowerQuestion.includes("rentabilité") || lowerQuestion.includes("gagner")) {
      insights.push("📊 Moins de 10% des traders atteignent la rentabilité consistante");
      insights.push("⏱️ Ceux qui y arrivent ont : une stratégie testée, une gestion du risque rigoureuse, de la patience");
    }

    return insights.slice(0, 3); // Limiter à 3 insights
  }

  /**
   * Générer un suivi suggéré
   */
  private static generateFollowUp(userQuestion: string): string {
    const lowerQuestion = userQuestion.toLowerCase();

    if (lowerQuestion.includes("débutant") || lowerQuestion.includes("commencer")) {
      return "Voulez-vous en savoir plus sur le plan d'apprentissage en 90 jours ?";
    }

    if (lowerQuestion.includes("risque") || lowerQuestion.includes("gestion")) {
      return "Souhaitez-vous apprendre à calculer votre taille de position ?";
    }

    if (lowerQuestion.includes("stratégie")) {
      return "Quelle stratégie vous intéresse le plus : Fibonacci, Price Action, SMC ou Indicateurs ?";
    }

    if (lowerQuestion.includes("prop firm")) {
      return "Voulez-vous connaître le protocole exact pour passer un challenge ?";
    }

    return "Avez-vous d'autres questions sur le trading ou KelvexTrader ?";
  }

  /**
   * Construire la réponse enrichie
   */
  private static buildEnrichedResponse(aiResponse: string, socialResponse: string): string {
    return `${aiResponse}

---

**💡 Contexte Complémentaire:**
${socialResponse}`;
  }

  /**
   * Formater la réponse pour affichage dans le chat
   */
  static formatForDisplay(enriched: EnrichedChatResponse): {
    mainResponse: string;
    insights: string[];
    followUp: string;
  } {
    return {
      mainResponse: enriched.enrichedResponse,
      insights: enriched.contextualInsights,
      followUp: enriched.suggestedFollowUp,
    };
  }

  /**
   * Détecter si une question nécessite une réponse enrichie
   */
  static shouldEnrich(userQuestion: string): boolean {
    const keywords = [
      "capital",
      "débutant",
      "risque",
      "stratégie",
      "trading",
      "prop firm",
      "rentabilité",
      "gagner",
      "perte",
      "challenge",
      "comment",
      "quel",
      "pourquoi",
    ];

    return keywords.some((keyword) => userQuestion.toLowerCase().includes(keyword));
  }

  /**
   * Générer des suggestions de questions basées sur le contexte
   */
  static generateQuestionSuggestions(userQuestion: string): string[] {
    const suggestions: string[] = [];
    const lowerQuestion = userQuestion.toLowerCase();

    if (lowerQuestion.includes("débutant")) {
      suggestions.push("Quel capital faut-il pour débuter ?");
      suggestions.push("Comment apprendre le trading ?");
      suggestions.push("Quelle plateforme utiliser ?");
    }

    if (lowerQuestion.includes("stratégie")) {
      suggestions.push("Quelle stratégie choisir ?");
      suggestions.push("Comment backtester une stratégie ?");
      suggestions.push("Fibonacci ou Price Action ?");
    }

    if (lowerQuestion.includes("risque")) {
      suggestions.push("Quel pourcentage de risque par trade ?");
      suggestions.push("Comment calculer la taille de position ?");
      suggestions.push("Qu'est-ce qu'un bon R:R ?");
    }

    return suggestions.slice(0, 3);
  }
}
