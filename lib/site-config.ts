import fs from 'fs'
import path from 'path'
import { z } from 'zod'

// Component schemas
const bannerConfigSchema = z.object({
  type: z.literal('banner'),
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  variant: z.enum(['default', 'gradient', 'image']).default('default'),
  backgroundImage: z.string().optional(),
})

const textConfigSchema = z.object({
  type: z.literal('text'),
  id: z.string(),
  content: z.string(),
  variant: z.enum(['paragraph', 'heading', 'subheading']).default('paragraph'),
})

const buttonConfigSchema = z.object({
  type: z.literal('button'),
  id: z.string(),
  text: z.string(),
  variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'primary']).default('default'),
  size: z.enum(['default', 'sm', 'lg', 'icon']).default('default'),
  link: z.string().optional(),
})

const cardConfigSchema = z.object({
  type: z.literal('card'),
  id: z.string(),
  title: z.string(),
  content: z.string(),
  variant: z.enum(['default', 'outline']).default('default'),
})

const componentConfigSchema = z.discriminatedUnion('type', [
  bannerConfigSchema,
  textConfigSchema,
  buttonConfigSchema,
  cardConfigSchema,
])

// Page schema
const pageConfigSchema = z.object({
  id: z.string(),
  path: z.string(),
  title: z.string(),
  description: z.string().optional(),
  components: z.array(componentConfigSchema),
  layout: z.enum(['default', 'centered', 'wide']).default('default'),
})

// Site configuration schema
const siteConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  pages: z.array(pageConfigSchema),
  theme: z.object({
    primaryColor: z.string().default('#3b82f6'),
    fontFamily: z.string().default('Inter'),
  }).default({}),
})

export type ComponentConfig = z.infer<typeof componentConfigSchema>
export type PageConfig = z.infer<typeof pageConfigSchema>
export type SiteConfiguration = z.infer<typeof siteConfigSchema>

export function getSiteConfig(): SiteConfiguration {
  const configPath = path.join(process.cwd(), 'data', 'site-config.json')
  const configContent = fs.readFileSync(configPath, 'utf8')
  const configData = JSON.parse(configContent)
  
  const result = siteConfigSchema.safeParse(configData)
  if (!result.success) {
    throw new Error(`Invalid site configuration: ${result.error.message}`)
  }
  
  return result.data
}

export function getAllPagePaths(): string[] {
  const config = getSiteConfig()
  return config.pages.map(page => page.path)
}

export function getPageByPath(path: string): PageConfig | undefined {
  const config = getSiteConfig()
  return config.pages.find(page => page.path === path)
}