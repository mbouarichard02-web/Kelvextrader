import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, Activity, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [sentiment, setSentiment] = useState(75);
  const [marketData, setMarketData] = useState({
    pair: "EUR/USD",
    status: "Manus Core Online",
    scan: "V75, V100, EUR/USD",
  });

  const marketQuery = trpc.market.getLatest.useQuery({
    pair: "EUR/USD",
    limit: 1,
  });

  const scoreQuery = trpc.education.getUserScore.useQuery();

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
          <h1 className="text-2xl font-bold mb-4">Kelvex Trading Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Connectez-vous pour accéder à l'analyse de marché en temps réel et aux signaux IA.
          </p>
          <Button className="w-full">Se connecter</Button>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kelvex Intelligence</h1>
          <p className="text-muted-foreground">Propulsé par Manus IA & Smart Money Concepts</p>
        </div>

        {/* Status & Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Algorithmic Status */}
          <Card className="p-6 bg-card border-border backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Statut Algorithmique
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-lg font-semibold text-green-500">{marketData.status}</p>
            </div>
            <p className="text-sm text-muted-foreground">Scan en cours : {marketData.scan}</p>
          </Card>

          {/* Institutional Bias */}
          <Card className="p-6 bg-card border-border backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Biais Institutionnel (Daily)
            </h3>
            <div className="flex justify-between text-xs text-muted-foreground mb-3">
              <span>Bears (Vendeurs)</span>
              <span>Bulls (Acheteurs)</span>
            </div>
            <div className="h-3 bg-gray-900 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-500"
                style={{ width: `${sentiment}%` }}
              ></div>
            </div>
            <p className="text-center font-semibold text-green-500">Biais Haussier Fort ({sentiment}%)</p>
          </Card>
        </div>

        {/* AI Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Analysis */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-background border-blue-500/20 backdrop-blur-sm">
              <div className="inline-block px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 text-xs font-bold mb-4">
                MANUS IA INSIGHT
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Analyse Dynamique du Marché
              </h3>

              {marketQuery.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-blue-500" />
                </div>
              ) : marketQuery.data && marketQuery.data.length > 0 ? (
                <p className="text-base leading-relaxed text-foreground mb-6">
                  {marketQuery.data[0].analysis}
                </p>
              ) : (
                <p className="text-base leading-relaxed text-foreground mb-6">
                  "La structure actuelle de l'<strong>EUR/USD</strong> montre une accumulation dans la zone de demande H4.
                  Manus IA détecte une forte probabilité de manipulation (Stop Hunt) sous les 1.08200 avant un mouvement
                  impulsif vers le prochain Order Block."
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="block text-xs text-muted-foreground mb-1">Confiance IA</span>
                  <span className="font-bold text-yellow-500">
                    {marketQuery.data?.[0]?.confidence || 88}%
                  </span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="block text-xs text-muted-foreground mb-1">Risque</span>
                  <span className="font-bold text-yellow-500">
                    {marketQuery.data?.[0]?.riskLevel || "Modéré"}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* VIP Access Card */}
          <Card className="p-6 border-yellow-500/50 bg-yellow-500/5 backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Accès Signaux Manus
            </h3>
            <p className="text-sm text-foreground mb-6">
              Débloquez les setups détectés par l'IA en temps réel.
            </p>

            <div className="flex gap-2 mb-6">
              <div className="w-10 h-6 bg-white rounded text-black text-xs font-bold flex items-center justify-center">
                ORANGE
              </div>
              <div className="w-10 h-6 bg-yellow-400 rounded text-black text-xs font-bold flex items-center justify-center">
                MTN
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded text-white text-xs font-bold flex items-center justify-center">
                WAVE
              </div>
            </div>

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              Payer & Activer
            </Button>

            {scoreQuery.data && (
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">Votre Tier</p>
                <p className="font-bold text-foreground capitalize">{scoreQuery.data.tier}</p>
                <p className="text-xs text-muted-foreground mt-2">Score: {scoreQuery.data.score}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Educational Modules */}
        <Card className="p-6 bg-card border-border backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Parcours Éducatif Personnalisé</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Débloquez des modules de formation selon votre score et votre niveau.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Module {i}</h4>
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-xs text-muted-foreground">Débloqué à {i * 50} points</p>
              </div>
            ))}
          </div>
        </Card>

        {/* IA Prompt Assistant */}
        <Card className="p-6 bg-card border-border backdrop-blur-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
            Prompt Assistant Manus IA
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Posez vos questions complexes sur la Smart Money à l'IA.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Ex: 'Manus, identifie le prochain Order Block sur le V75 en M15...'"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600"
            >
              Envoyer
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
