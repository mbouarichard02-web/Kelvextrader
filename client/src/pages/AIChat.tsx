import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";
import { Streamdown } from "streamdown";

export default function AIChat() {
  const { isAuthenticated, loading } = useAuth();
  const [messages, setMessages] = useState<Array<{ role: string; message: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.sendMessage.useMutation();
  const historyQuery = trpc.chat.getHistory.useQuery({ limit: 50 });

  useEffect(() => {
    if (historyQuery.data) {
      setMessages(historyQuery.data);
    }
  }, [historyQuery.data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatMutation.mutateAsync({
        message: userMessage,
        marketContext: "EUR/USD H4 - Accumulation zone",
      });

      setMessages((prev) => [
        ...prev,
        { role: "user", message: response.userMessage },
        { role: "assistant", message: response.assistantMessage },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
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
          <h1 className="text-2xl font-bold mb-4">Kelvex IA Assistant</h1>
          <p className="text-muted-foreground mb-6">
            Connectez-vous pour accéder à l'assistant IA Smart Money.
          </p>
          <Button className="w-full">Se connecter</Button>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kelvex IA Assistant</h1>
          <p className="text-muted-foreground">Posez vos questions sur la Smart Money et l'analyse de marché</p>
        </div>

        <Card className="p-6 bg-card border-border backdrop-blur-sm flex flex-col h-[600px]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <p className="text-muted-foreground mb-2">Aucun message pour le moment</p>
                  <p className="text-sm text-muted-foreground">
                    Posez une question pour commencer la conversation
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-500/20 border border-blue-500/50 text-foreground"
                        : "bg-white/5 border border-white/10 text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Streamdown>{msg.message}</Streamdown>
                    ) : (
                      <p className="text-sm">{msg.message}</p>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Posez votre question..."
              className="flex-1 bg-white/5 border-white/10 text-foreground placeholder-muted-foreground"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Quick Questions */}
        <Card className="p-6 bg-card border-border backdrop-blur-sm">
          <h3 className="text-sm font-bold text-foreground mb-4">Questions Rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Qu'est-ce qu'un Order Block ?",
              "Comment identifier un Stop Hunt ?",
              "Quelle est la meilleure stratégie pour EUR/USD ?",
              "Comment utiliser les zones de demande ?",
            ].map((q, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="text-left h-auto py-3 border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10"
                onClick={() => {
                  setInput(q);
                }}
              >
                {q}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
