import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import {
  getOrCreateSubscription,
  updateUserScore,
  getAvailableModules,
  getLatestMarketAnalysis,
  createPayment,
  completePayment,
  getDb,
} from "./db";
import { chatHistory, marketAnalysis, payments } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { contentRouter } from "./routers/content";
import { automationRouter } from "./routers/automation";

export const appRouter = router({
  system: systemRouter,
  content: contentRouter,
  automation: automationRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Market Analysis & IA Insights
  market: router({
    /**
     * Get latest market analysis for a trading pair
     */
    getLatest: publicProcedure
      .input(z.object({ pair: z.string(), limit: z.number().default(5) }))
      .query(async ({ input }) => {
        return await getLatestMarketAnalysis(input.pair, input.limit);
      }),

    /**
     * Generate IA analysis for a market pair
     */
    generateAnalysis: publicProcedure
      .input(
        z.object({
          pair: z.string(),
          timeframe: z.string(),
          currentPrice: z.number().optional(),
          context: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const prompt = `You are an expert in Smart Money Concepts and trading analysis. Analyze the following market data and provide insights:

Pair: ${input.pair}
Timeframe: ${input.timeframe}
${input.currentPrice ? `Current Price: ${input.currentPrice}` : ""}
${input.context ? `Context: ${input.context}` : ""}

Provide analysis focusing on:
1. Order Blocks identification
2. Stop Hunt probability
3. Supply/Demand zones
4. Institutional bias
5. Entry/Exit opportunities

Format your response as a professional trading analysis.`;

          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content:
                  "You are an expert trading analyst specializing in Smart Money Concepts. Provide detailed, actionable market analysis.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          });

          const analysisText =
            typeof response.choices[0]?.message?.content === "string"
              ? response.choices[0].message.content
              : "Unable to generate analysis";

          // Save to database
          const db = await getDb();
          if (db) {
            const riskLevels: Array<"low" | "moderate" | "high"> = ["low", "moderate", "high"];
            await db.insert(marketAnalysis).values([
              {
                pair: input.pair,
                timeframe: input.timeframe,
                analysis: analysisText,
                confidence: Math.floor(Math.random() * 30 + 70), // 70-100
                riskLevel: riskLevels[Math.floor(Math.random() * 3)] as any,
                sentimentScore: Math.floor(Math.random() * 100 - 50), // -50 to 50
              },
            ]);
          }

          return {
            pair: input.pair,
            timeframe: input.timeframe,
            analysis: analysisText,
            confidence: 85,
            riskLevel: "moderate",
            sentimentScore: 65,
          };
        } catch (error) {
          console.error("Failed to generate market analysis:", error);
          throw new Error("Failed to generate market analysis");
        }
      }),
  }),

  // Educational System & Scoring
  education: router({
    /**
     * Get available modules for the current user
     */
    getAvailableModules: protectedProcedure.query(async ({ ctx }) => {
      return await getAvailableModules(ctx.user.id);
    }),

    /**
     * Get user's current score and subscription tier
     */
    getUserScore: protectedProcedure.query(async ({ ctx }) => {
      const subscription = await getOrCreateSubscription(ctx.user.id);
      return {
        score: subscription?.score || 0,
        tier: subscription?.tier || "free",
        isActive: subscription?.isActive || 0,
      };
    }),

    /**
     * Complete a module and earn points
     */
    completeModule: protectedProcedure
      .input(z.object({ moduleId: z.number(), pointsEarned: z.number().default(10) }))
      .mutation(async ({ ctx, input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          // Update user score
          const newScore = await updateUserScore(ctx.user.id, input.pointsEarned);

          // Mark module as completed
          await db.insert(chatHistory).values([
            {
              userId: ctx.user.id,
              role: "user" as const,
              message: `Completed module ${input.moduleId}`,
              context: JSON.stringify({ moduleId: input.moduleId, pointsEarned: input.pointsEarned }),
            },
          ]);

          return {
            success: true,
            newScore,
            pointsEarned: input.pointsEarned,
          };
        } catch (error) {
          console.error("Failed to complete module:", error);
          throw new Error("Failed to complete module");
        }
      }),
  }),

  // Chat & IA Assistant
  chat: router({
    /**
     * Send a message to the IA assistant
     */
    sendMessage: protectedProcedure
      .input(
        z.object({
          message: z.string(),
          marketContext: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          // Save user message
          await db.insert(chatHistory).values([
            {
              userId: ctx.user.id,
              role: "user" as const,
              message: input.message,
              context: input.marketContext || null,
            },
          ]);

          // Generate IA response
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are Kelvex IA, an expert assistant in Smart Money Concepts and trading. 
You help traders understand market structure, identify trading opportunities, and develop their trading skills.
${input.marketContext ? `Current market context: ${input.marketContext}` : ""}`,
              },
              {
                role: "user",
                content: input.message,
              },
            ],
          });

          const assistantMessage =
            typeof response.choices[0]?.message?.content === "string"
              ? response.choices[0].message.content
              : "I couldn't generate a response";

          // Save assistant response
          await db.insert(chatHistory).values([
            {
              userId: ctx.user.id,
              role: "assistant" as const,
              message: assistantMessage,
              context: input.marketContext || null,
            },
          ]);

          return {
            userMessage: input.message,
            assistantMessage,
            timestamp: new Date(),
          };
        } catch (error) {
          console.error("Failed to send chat message:", error);
          throw new Error("Failed to send chat message");
        }
      }),

    /**
     * Get chat history for the user
     */
    getHistory: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ ctx, input }) => {
        try {
          const db = await getDb();
          if (!db) return [];

          const history = await db
            .select()
            .from(chatHistory)
            .where(eq(chatHistory.userId, ctx.user.id))
            .orderBy(chatHistory.createdAt)
            .limit(input.limit);

          return history;
        } catch (error) {
          console.error("Failed to get chat history:", error);
          return [];
        }
      }),
  }),

  // Payments & VIP Management
  payments: router({
    /**
     * Create a payment for VIP/Pro upgrade
     */
    createPayment: protectedProcedure
      .input(
        z.object({
          tier: z.enum(["pro", "vip"]),
          paymentMethod: z.enum(["orange_money", "mtn", "wave", "crypto", "card"]),
          amount: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const result = await db.insert(payments).values([
            {
              userId: ctx.user.id,
              amount: Math.floor(input.amount * 100), // Convert to cents
              paymentMethod: input.paymentMethod as any,
              tier: input.tier,
              status: "pending" as const,
            },
          ]);

          return {
            success: true,
            paymentId: Math.floor(Math.random() * 10000), // Temporary ID
            amount: input.amount,
            tier: input.tier,
            status: "pending",
          };
        } catch (error) {
          console.error("Failed to create payment:", error);
          throw new Error("Failed to create payment");
        }
      }),

    /**
     * Confirm payment and activate VIP/Pro access
     */
    confirmPayment: protectedProcedure
      .input(
        z.object({
          paymentId: z.number(),
          transactionId: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          const success = await completePayment(input.paymentId, input.transactionId);

          if (success) {
            // Notify owner of new VIP activation
            try {
              await (ctx as any).notifyOwner({
                title: "New VIP Activation",
                content: `User ${ctx.user.name} (${ctx.user.email}) has activated VIP access via ${input.transactionId}`,
              });
            } catch (notifyError) {
              console.warn("Failed to notify owner:", notifyError);
            }
          }

          return {
            success,
            message: success ? "VIP access activated!" : "Failed to activate VIP access",
          };
        } catch (error) {
          console.error("Failed to confirm payment:", error);
          throw new Error("Failed to confirm payment");
        }
      }),

    /**
     * Get user's payment history
     */
    getHistory: protectedProcedure.query(async ({ ctx }) => {
      try {
        const db = await getDb();
        if (!db) return [];

        const history = await db
          .select()
          .from(payments)
          .where(eq(payments.userId, ctx.user.id))
          .orderBy(payments.createdAt);

        return history;
      } catch (error) {
        console.error("Failed to get payment history:", error);
        return [];
      }
    }),

    /**
     * Get user's current subscription status
     */
    getSubscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
      const subscription = await getOrCreateSubscription(ctx.user.id);
      return {
        tier: subscription?.tier || "free",
        isActive: subscription?.isActive || 0,
        score: subscription?.score || 0,
        activatedAt: subscription?.activatedAt,
        expiresAt: subscription?.expiresAt,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
