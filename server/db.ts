import { and, desc, eq, inArray, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import {
  chatHistory,
  educationalModules,
  marketAnalysis,
  payments,
  subscriptions,
  userProgress,
} from '../drizzle/schema';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get or create user subscription
 */
export async function getOrCreateSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    // Create default free subscription
    await db.insert(subscriptions).values({
      userId,
      tier: 'free',
      score: 0,
      isActive: 1,
    });

    const created = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    return created[0];
  } catch (error) {
    console.error('[Database] Failed to get/create subscription:', error);
    return undefined;
  }
}

/**
 * Update user score and check for module unlocks
 */
export async function updateUserScore(userId: number, scoreIncrement: number) {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const subscription = await getOrCreateSubscription(userId);
    if (!subscription) return undefined;

    const newScore = subscription.score + scoreIncrement;
    await db
      .update(subscriptions)
      .set({ score: newScore })
      .where(eq(subscriptions.id, subscription.id));

    return newScore;
  } catch (error) {
    console.error('[Database] Failed to update user score:', error);
    return undefined;
  }
}

/**
 * Get available modules for user based on score and tier
 */
export async function getAvailableModules(userId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    const subscription = await getOrCreateSubscription(userId);
    if (!subscription) return [];

    const modules = await db
      .select()
      .from(educationalModules)
      .where(
        and(
          lte(educationalModules.requiredScore, subscription.score),
          inArray(educationalModules.tier, ['free', subscription.tier])
        )
      )
      .orderBy(educationalModules.order);

    return modules;
  } catch (error) {
    console.error('[Database] Failed to get available modules:', error);
    return [];
  }
}

/**
 * Get latest market analysis for a pair
 */
export async function getLatestMarketAnalysis(pair: string, limit = 5) {
  const db = await getDb();
  if (!db) return [];

  try {
    const analyses = await db
      .select()
      .from(marketAnalysis)
      .where(eq(marketAnalysis.pair, pair))
      .orderBy(desc(marketAnalysis.createdAt))
      .limit(limit);

    return analyses;
  } catch (error) {
    console.error('[Database] Failed to get market analysis:', error);
    return [];
  }
}

/**
 * Create a payment record
 */
export async function createPayment(
  userId: number,
  amount: number,
  paymentMethod: string,
  tier: 'pro' | 'vip'
) {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db.insert(payments).values({
      userId,
      amount,
      paymentMethod: paymentMethod as any,
      tier,
      status: 'pending',
    });

    return result;
  } catch (error) {
    console.error('[Database] Failed to create payment:', error);
    return undefined;
  }
}

/**
 * Update payment status and activate subscription if completed
 */
export async function completePayment(paymentId: number, transactionId: string) {
  const db = await getDb();
  if (!db) return false;

  try {
    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.id, paymentId))
      .limit(1);

    if (payment.length === 0) return false;

    const paymentRecord = payment[0];

    // Update payment status
    await db
      .update(payments)
      .set({ status: 'completed', transactionId })
      .where(eq(payments.id, paymentId));

    // Update subscription tier
    const subscription = await getOrCreateSubscription(paymentRecord.userId);
    if (subscription) {
      await db
        .update(subscriptions)
        .set({ tier: paymentRecord.tier, isActive: 1 })
        .where(eq(subscriptions.id, subscription.id));
    }

    return true;
  } catch (error) {
    console.error('[Database] Failed to complete payment:', error);
    return false;
  }
}


