import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq, ilike, or, and, gte, lte, desc } from "drizzle-orm";
import * as schema from "@shared/schema";
import type { User, InsertUser, Sweet, InsertSweet, UpdateSweet } from "@shared/schema";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllSweets(): Promise<Sweet[]>;
  getSweet(id: number): Promise<Sweet | undefined>;
  searchSweets(query?: string, category?: string, minPrice?: number, maxPrice?: number): Promise<Sweet[]>;
  createSweet(sweet: InsertSweet): Promise<Sweet>;
  updateSweet(id: number, sweet: UpdateSweet): Promise<Sweet | undefined>;
  deleteSweet(id: number): Promise<boolean>;
  purchaseSweet(id: number, quantity: number): Promise<Sweet | undefined>;
  restockSweet(id: number, quantity: number): Promise<Sweet | undefined>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  async getAllSweets(): Promise<Sweet[]> {
    return await db.select().from(schema.sweets).orderBy(desc(schema.sweets.createdAt));
  }

  async getSweet(id: number): Promise<Sweet | undefined> {
    const [sweet] = await db.select().from(schema.sweets).where(eq(schema.sweets.id, id));
    return sweet;
  }

  async searchSweets(query?: string, category?: string, minPrice?: number, maxPrice?: number): Promise<Sweet[]> {
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(schema.sweets.name, `%${query}%`),
          ilike(schema.sweets.description, `%${query}%`)
        )
      );
    }
    
    if (category) {
      conditions.push(eq(schema.sweets.category, category));
    }
    
    if (minPrice !== undefined) {
      conditions.push(gte(schema.sweets.price, minPrice));
    }
    
    if (maxPrice !== undefined) {
      conditions.push(lte(schema.sweets.price, maxPrice));
    }

    if (conditions.length === 0) {
      return this.getAllSweets();
    }

    return await db.select().from(schema.sweets).where(and(...conditions)).orderBy(desc(schema.sweets.createdAt));
  }

  async createSweet(insertSweet: InsertSweet): Promise<Sweet> {
    const [sweet] = await db.insert(schema.sweets).values(insertSweet).returning();
    return sweet;
  }

  async updateSweet(id: number, updateSweet: UpdateSweet): Promise<Sweet | undefined> {
    const [sweet] = await db.update(schema.sweets).set(updateSweet).where(eq(schema.sweets.id, id)).returning();
    return sweet;
  }

  async deleteSweet(id: number): Promise<boolean> {
    const result = await db.delete(schema.sweets).where(eq(schema.sweets.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async purchaseSweet(id: number, quantity: number): Promise<Sweet | undefined> {
    const sweet = await this.getSweet(id);
    if (!sweet || sweet.quantity < quantity) {
      return undefined;
    }
    
    const [updated] = await db
      .update(schema.sweets)
      .set({ quantity: sweet.quantity - quantity })
      .where(eq(schema.sweets.id, id))
      .returning();
    
    return updated;
  }

  async restockSweet(id: number, quantity: number): Promise<Sweet | undefined> {
    const sweet = await this.getSweet(id);
    if (!sweet) {
      return undefined;
    }
    
    const [updated] = await db
      .update(schema.sweets)
      .set({ quantity: sweet.quantity + quantity })
      .where(eq(schema.sweets.id, id))
      .returning();
    
    return updated;
  }
}

export const storage = new DbStorage();
