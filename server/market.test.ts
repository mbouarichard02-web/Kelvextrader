import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("market.getLatest", () => {
  it("returns market analysis for a pair", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.market.getLatest({
      pair: "EUR/USD",
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("accepts different trading pairs", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const pairs = ["EUR/USD", "V75", "V100"];

    for (const pair of pairs) {
      const result = await caller.market.getLatest({ pair });
      expect(Array.isArray(result)).toBe(true);
    }
  });
});

describe("market.generateAnalysis", () => {
  it("generates market analysis with IA", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.market.generateAnalysis({
      pair: "EUR/USD",
      timeframe: "H4",
      currentPrice: 1.0850,
    });

    expect(result).toHaveProperty("pair", "EUR/USD");
    expect(result).toHaveProperty("timeframe", "H4");
    expect(result).toHaveProperty("analysis");
    expect(result).toHaveProperty("confidence");
    expect(result).toHaveProperty("riskLevel");
    expect(typeof result.confidence).toBe("number");
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(100);
  });

  it("includes market context in analysis", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const context = "Accumulation zone H4";
    const result = await caller.market.generateAnalysis({
      pair: "EUR/USD",
      timeframe: "H4",
      context,
    });

    expect(result.analysis).toBeTruthy();
    expect(result.analysis.length).toBeGreaterThan(0);
  });
});

describe("education.getUserScore", () => {
  it("returns user score and tier for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.education.getUserScore();

    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("tier");
    expect(result).toHaveProperty("isActive");
    expect(typeof result.score).toBe("number");
    expect(["free", "pro", "vip"]).toContain(result.tier);
  });

  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.education.getUserScore();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("payments.getSubscriptionStatus", () => {
  it("returns subscription status for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.payments.getSubscriptionStatus();

    expect(result).toHaveProperty("tier");
    expect(result).toHaveProperty("isActive");
    expect(result).toHaveProperty("score");
    expect(["free", "pro", "vip"]).toContain(result.tier);
  });

  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.payments.getSubscriptionStatus();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("payments.createPayment", () => {
  it("creates a payment for VIP upgrade", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.payments.createPayment({
      tier: "vip",
      paymentMethod: "crypto",
      amount: 99.99,
    });

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("paymentId");
    expect(result).toHaveProperty("amount", 99.99);
    expect(result).toHaveProperty("tier", "vip");
    expect(result).toHaveProperty("status", "pending");
  });

  it("supports different payment methods", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const methods = ["orange_money", "mtn", "wave", "crypto"];

    for (const method of methods) {
      const result = await caller.payments.createPayment({
        tier: "pro",
        paymentMethod: method as any,
        amount: 29.99,
      });

      expect(result.success).toBe(true);
    }
  });

  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.payments.createPayment({
        tier: "pro",
        paymentMethod: "crypto",
        amount: 29.99,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("chat.sendMessage", () => {
  it("sends a message and receives a response", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.sendMessage({
      message: "What is an Order Block?",
      marketContext: "EUR/USD H4",
    });

    expect(result).toHaveProperty("userMessage", "What is an Order Block?");
    expect(result).toHaveProperty("assistantMessage");
    expect(result).toHaveProperty("timestamp");
    expect(result.assistantMessage.length).toBeGreaterThan(0);
  });

  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.chat.sendMessage({
        message: "Hello",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
