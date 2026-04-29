import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";

export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "professional" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Récupérer tous les articles
  const { data: allArticles, isLoading: isLoadingAll } = trpc.content.blog.getAllArticles.useQuery();

  // Récupérer les articles par niveau
  const { data: beginnerArticles } = trpc.content.blog.getByLevel.useQuery("beginner");
  const { data: intermediateArticles } = trpc.content.blog.getByLevel.useQuery("intermediate");
  const { data: professionalArticles } = trpc.content.blog.getByLevel.useQuery("professional");

  // Rechercher les articles
  const { data: searchResults } = trpc.content.blog.search.useQuery(searchQuery, {
    enabled: searchQuery.length > 0,
  });

  // Déterminer les articles à afficher
  let displayedArticles: any[] = allArticles || [];
  if (selectedLevel === "beginner" && beginnerArticles) {
    displayedArticles = beginnerArticles;
  } else if (selectedLevel === "intermediate" && intermediateArticles) {
    displayedArticles = intermediateArticles;
  } else if (selectedLevel === "professional" && professionalArticles) {
    displayedArticles = professionalArticles;
  }

  if (searchQuery.length > 0 && searchResults) {
    displayedArticles = searchResults;
  }

  const getLevelBadge = (level: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      beginner: { label: "Débutant", className: "bg-green-500/10 text-green-400" },
      intermediate: { label: "Intermédiaire", className: "bg-blue-500/10 text-blue-400" },
      professional: { label: "Professionnel", className: "bg-amber-500/10 text-amber-400" },
    };
    const config = variants[level] || { label: level, className: "bg-gray-500/10 text-gray-400" };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Blog KelvexTrader</h1>
          <p className="text-gray-400 text-lg">Maîtrisez le trading avec nos guides complets et actualisés</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
            />
            <svg
              className="absolute right-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Level Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedLevel === "all" ? "default" : "outline"}
              onClick={() => setSelectedLevel("all")}
              className="rounded-full"
            >
              Tous les articles
            </Button>
            <Button
              variant={selectedLevel === "beginner" ? "default" : "outline"}
              onClick={() => setSelectedLevel("beginner")}
              className="rounded-full"
            >
              Débutant
            </Button>
            <Button
              variant={selectedLevel === "intermediate" ? "default" : "outline"}
              onClick={() => setSelectedLevel("intermediate")}
              className="rounded-full"
            >
              Intermédiaire
            </Button>
            <Button
              variant={selectedLevel === "professional" ? "default" : "outline"}
              onClick={() => setSelectedLevel("professional")}
              className="rounded-full"
            >
              Professionnel
            </Button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingAll ? (
            // Loading Skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-slate-700/50 border-slate-600 p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <Skeleton className="h-10 w-24" />
              </Card>
            ))
          ) : displayedArticles && displayedArticles.length > 0 ? (
            displayedArticles?.map((article: any) => (
              <Card
                key={article.id}
                className="bg-slate-700/50 border-slate-600 hover:border-blue-500 transition cursor-pointer p-6 group"
                onClick={() => setLocation(`/blog/${article.slug}`)}
              >
                <div className="mb-4 flex items-start justify-between">
                  {getLevelBadge(article.level)}
                  <span className="text-xs text-gray-400">{article.readingTime} min</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>👁️ {article.views}</span>
                    <span>❤️ {article.likes}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                    Lire →
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">Aucun article trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
