import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Streamdown } from "streamdown";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();

  // Récupérer l'article
  const { data: article, isLoading } = trpc.content.blog.getBySlug.useQuery(slug || "", {
    enabled: !!slug,
  });

  // Incrémenter les vues
  const incrementViewsMutation = trpc.content.blog.incrementViews.useMutation();
  const incrementLikesMutation = trpc.content.blog.incrementLikes.useMutation();

  useEffect(() => {
    if (article && slug) {
      incrementViewsMutation.mutate(slug);
    }
  }, [article, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article non trouvé</h1>
          <Button onClick={() => setLocation("/blog")} className="mt-4">
            ← Retour au blog
          </Button>
        </div>
      </div>
    );
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
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation("/blog")}
          className="mb-8 text-gray-400 hover:text-white"
        >
          ← Retour au blog
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {getLevelBadge(article.level)}
            <span className="text-sm text-gray-400">{article.readingTime} min de lecture</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>

          <p className="text-lg text-gray-400 mb-6">{article.excerpt}</p>

          {/* SEO Metadata */}
          {article.seoMetadata && (
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-400 mb-2">
                <strong>Description:</strong> {article.seoMetadata.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {article.keywords?.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8 mb-8 prose prose-invert max-w-none">
          <Streamdown>{article.content}</Streamdown>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-amber-600/20 border border-blue-500/30 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Prêt à commencer ?</h3>
          <p className="text-gray-300 mb-6">
            Découvrez votre profil de trader personnalisé en 2 minutes. Gratuit, sans engagement.
          </p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
            → Faire le Quiz d'Onboarding
          </Button>
        </div>

        {/* Engagement Section */}
        <div className="flex items-center justify-between bg-slate-700/50 border border-slate-600 rounded-lg p-6">
          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
              <span>👁️</span>
              <span>{article.views} vues</span>
            </button>
            <button
              onClick={() => incrementLikesMutation.mutate(slug || "")}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition"
            >
              <span>❤️</span>
              <span>{article.likes} likes</span>
            </button>
          </div>
          <Button variant="outline" onClick={() => setLocation("/blog")}>
            ← Autres articles
          </Button>
        </div>

        {/* JSON-LD for SEO */}
        {article.jsonLD && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(article.jsonLD),
            }}
          />
        )}
      </div>
    </div>
  );
}
