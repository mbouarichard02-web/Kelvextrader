import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, Zap, Users } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            KELVEX<span className="text-yellow-500">TRADER</span>
          </h1>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <Button onClick={() => setLocation("/dashboard")} variant="outline">
                  Dashboard
                </Button>
                <Button onClick={() => setLocation("/ai-chat")} variant="outline">
                  IA Chat
                </Button>
                <Button onClick={() => setLocation("/vip")} className="bg-yellow-500 text-black hover:bg-yellow-600">
                  VIP
                </Button>
                <Button onClick={() => logout()} variant="outline">
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => (window.location.href = getLoginUrl())} variant="outline">
                  Connexion
                </Button>
                <Button onClick={() => (window.location.href = getLoginUrl())} className="bg-blue-500 hover:bg-blue-600">
                  S'inscrire
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Maîtrisez le Trading avec l'IA</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kelvex combine l'analyse de marché en temps réel, les Smart Money Concepts et l'IA pour vous donner un avantage
            compétitif.
          </p>
          {!isAuthenticated && (
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-6 px-8 text-lg"
            >
              Commencer Gratuitement
            </Button>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Fonctionnalités Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Analyse IA en Temps Réel",
                description: "Détection automatique des Order Blocks, Stop Hunts et zones de demande/offre",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Signaux Smart Money",
                description: "Signaux basés sur les concepts de Smart Money pour des entrées précises",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Communauté VIP",
                description: "Accès à une communauté de traders professionnels et à du contenu exclusif",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 bg-background border-border hover:border-blue-500/50 transition-colors">
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Plans Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Free",
                price: "0",
                features: ["Analyses IA limitées", "Chat IA basique", "Modules éducatifs gratuits"],
              },
              {
                name: "Pro",
                price: "29.99",
                features: ["Analyses IA illimitées", "Signaux quotidiens", "Chat IA avancé"],
              },
            ].map((plan, idx) => (
              <Card key={idx} className="p-8 bg-background border-border hover:border-blue-500/50 transition-colors">
                <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
                <p className="text-4xl font-bold mb-6">
                  ${plan.price}
                  <span className="text-lg text-muted-foreground">/mois</span>
                </p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={idx === 1 ? "default" : "outline"}>
                  Choisir {plan.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2026 Kelvex Trading. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
