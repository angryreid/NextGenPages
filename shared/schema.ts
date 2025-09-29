import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Component configuration schemas
export const buttonComponentSchema = z.object({
  type: z.literal("button"),
  id: z.string(),
  text: z.string(),
  variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).default("default"),
  size: z.enum(["default", "sm", "lg", "icon"]).default("default"),
  link: z.string().optional(),
});

export const bannerComponentSchema = z.object({
  type: z.literal("banner"),
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  backgroundImage: z.string().optional(),
  variant: z.enum(["default", "gradient", "image"]).default("default"),
});

export const textComponentSchema = z.object({
  type: z.literal("text"),
  id: z.string(),
  content: z.string(),
  variant: z.enum(["paragraph", "heading", "subheading", "caption"]).default("paragraph"),
});

export const cardComponentSchema = z.object({
  type: z.literal("card"),
  id: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
});

// Union of all component types
export const componentSchema = z.discriminatedUnion("type", [
  buttonComponentSchema,
  bannerComponentSchema,
  textComponentSchema,
  cardComponentSchema,
]);

// Page configuration schema
export const pageConfigSchema = z.object({
  id: z.string(),
  path: z.string(),
  title: z.string(),
  description: z.string().optional(),
  components: z.array(componentSchema),
  layout: z.enum(["default", "centered", "wide"]).default("default"),
});

// Site configuration schema
export const siteConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  pages: z.array(pageConfigSchema),
  theme: z.object({
    primaryColor: z.string().default("#3b82f6"),
    fontFamily: z.string().default("Inter"),
  }).default({}),
});

// Database tables
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const siteConfigs = pgTable("site_configs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  config: jsonb("config").notNull(),
  userId: varchar("user_id").references(() => users.id),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSiteConfigSchema = createInsertSchema(siteConfigs).pick({
  name: true,
  description: true,
  config: true,
  userId: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SiteConfig = typeof siteConfigs.$inferSelect;
export type InsertSiteConfig = z.infer<typeof insertSiteConfigSchema>;

export type ComponentConfig = z.infer<typeof componentSchema>;
export type PageConfig = z.infer<typeof pageConfigSchema>;
export type SiteConfiguration = z.infer<typeof siteConfigSchema>;
export type ButtonComponent = z.infer<typeof buttonComponentSchema>;
export type BannerComponent = z.infer<typeof bannerComponentSchema>;
export type TextComponent = z.infer<typeof textComponentSchema>;
export type CardComponent = z.infer<typeof cardComponentSchema>;