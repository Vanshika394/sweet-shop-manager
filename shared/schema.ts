import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sweets = pgTable("sweets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  isAdmin: true,
}).extend({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertSweetSchema = createInsertSchema(sweets).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  price: z.number().int().positive(),
  quantity: z.number().int().min(0),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export const updateSweetSchema = insertSweetSchema.partial();

export const purchaseSchema = z.object({
  quantity: z.number().int().positive(),
});

export const restockSchema = z.object({
  quantity: z.number().int().positive(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

export type Sweet = typeof sweets.$inferSelect;
export type InsertSweet = z.infer<typeof insertSweetSchema>;
export type UpdateSweet = z.infer<typeof updateSweetSchema>;
