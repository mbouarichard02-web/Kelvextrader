import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Check, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function VIPPortal() {
  const { isAuthenticated, loading } = useAuth();
  const [selectedTier, setSelectedTier] = useState<"pro" | "vip">("pro");
  const [selectedMethod, setSelectedMethod] = useState<"orange_money" | "mtn" | "wave" | "crypto">(
    "orange_money"
  );

  const subscriptionQuery = trpc.payments.getSubscriptionStatus.useQuery();
  const createPaymentMutation = trpc.payments.createPayment.useMutation();
  const confirmPaymentMutation = trpc.payments.confirmPayment.useMutation();

  const tiers = [
    {
      name: "Pro",
      value: "pro" as const,
      price: 29.99,
      features: [
        "Accès aux analyses IA en temps réel",
        "Signaux Smart Money quotidiens",
        "Chat IA illimité",
        "Modules éducatifs Pro",
        "Support prioritaire",
      ],
    },
    {
      name: "VIP",
      value: "vip" as const,
      price: 99.99,
      features: [
        "Tout du plan Pro",
        "Analyses avancées 24/7",
        "Signaux en temps réel (tous les timeframes)",
        "Accès à la communauté VIP",
        "Modules éducatifs VIP exclusifs",
        "Consultation personnalisée",
        "Données de marché illimitées",
      ],
      popular: true,
    },
  ];

  const paymentMethods = [
    { id: "orange_money", name: "Orange Money", icon: "🟠" },
    { id: "mtn", name: "MTN Mobile Money", icon: "🟡" },
    { id: "wave", name: "Wave", icon: "🔵" },
    { id: "crypto", name: "Cryptomonnaies", icon: "₿" },
  ];

  const handlePayment = async () => {
    try {
      const result = await createPaymentMutation.mutateAsync({
        tier: selectedTier,
        paymentMethod: selectedMethod,
        amount: selectedTier === "pro" ? 29.99 : 99.99,
      });

      // Simulate payment confirmation
      setTimeout(async () => {
        await confirmPaymentMutation.mutateAsync({
          paymentId: result.paymentId,
          transactionId: `TXN-${Date.now()}`,
        });

        toast.success("Accès VIP activé avec succès !");
        subscriptionQuery.refetch();
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors du paiement");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Portail VIP Kelvex</h1>
          <p className="text-muted-foreground mb-6">Connectez-vous pour accéder aux plans VIP.</p>
          <Button className="w-full">Se connecter</Button>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Débloquez Votre Potentiel</h1>
          <p className="text-muted-foreground">Choisissez le plan qui vous convient et accédez à des analyses IA avancées</p>
        </div>

        {/* Current Status */}
        {subscriptionQuery.data && (
          <Card className="p-6 bg-blue-500/10 border-blue-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Votre Plan Actuel</p>
                <p className="text-2xl font-bold text-foreground capitalize">{subscriptionQuery.data.tier}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-2xl font-bold text-yellow-500">{subscriptionQuery.data.score}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.value}
              className={`p-8 backdrop-blur-sm cursor-pointer transition-all ${
                selectedTier === tier.value
                  ? "border-blue-500/50 bg-blue-500/10"
                  : "border-border hover:border-blue-500/30"
              } ${tier.popular ? "relative md:scale-105" : ""}`}
              onClick={() => setSelectedTier(tier.value)}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                  POPULAIRE
                </div>
              )}

              <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                <span className="text-muted-foreground">/mois</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  selectedTier === tier.value
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-white/10 hover:bg-white/20 border border-white/20"
                }`}
              >
                {selectedTier === tier.value ? "Sélectionné" : "Choisir"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <Card className="p-8 bg-card border-border backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Méthode de Paiement</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-white/5 hover:border-blue-500/50"
                }`}
              >
                <div className="text-3xl mb-2">{method.icon}</div>
                <p className="text-sm font-semibold text-foreground">{method.name}</p>
              </button>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan {selectedTier.toUpperCase()}</span>
                <span className="font-semibold text-foreground">
                  ${selectedTier === "pro" ? "29.99" : "99.99"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais de traitement</span>
                <span className="font-semibold text-foreground">$0.00</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-xl font-bold text-yellow-500">
                  ${selectedTier === "pro" ? "29.99" : "99.99"}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handlePayment}
            disabled={createPaymentMutation.isPending || confirmPaymentMutation.isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-6 text-lg"
          >
            {createPaymentMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Traitement...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Activer {selectedTier.toUpperCase()} Maintenant
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Paiement sécurisé. Accès immédiat après confirmation.
          </p>
        </Card>

        {/* FAQ */}
        <Card className="p-8 bg-card border-border backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Questions Fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Puis-je changer de plan ?",
                a: "Oui, vous pouvez passer à un plan supérieur à tout moment. Le crédit sera ajusté.",
              },
              {
                q: "Y a-t-il une période d'essai gratuite ?",
                a: "Non, mais vous pouvez commencer avec le plan Pro et passer à VIP si vous le souhaitez.",
              },
              {
                q: "Comment puis-je annuler mon abonnement ?",
                a: "Vous pouvez annuler à tout moment depuis votre profil. Aucune pénalité n'est appliquée.",
              },
              {
                q: "Quels sont les délais de paiement ?",
                a: "Les paiements sont traités instantanément. L'accès est activé immédiatement après confirmation.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-white/10 pb-4 last:border-0">
                <p className="font-semibold text-foreground mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
