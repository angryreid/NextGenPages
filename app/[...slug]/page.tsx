import { getSiteConfig, getAllPagePaths, getPageByPath } from '@/lib/site-config'
import { renderComponent } from '@/components/ConfigurableComponents'
import { notFound } from 'next/navigation'

// Generate static params for all pages except the home page
export async function generateStaticParams() {
  const paths = getAllPagePaths()
  
  return paths
    .filter(path => path !== '/') // Exclude home page as it's handled by app/page.tsx
    .map(path => ({
      slug: path.split('/').filter(Boolean), // Convert /cms/dash to ['cms', 'dash']
    }))
}

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DynamicPage({ params }: PageProps) {
  // Await params in Next.js 15+
  const resolvedParams = await params
  // Reconstruct the path from slug array
  const path = '/' + resolvedParams.slug.join('/')
  const page = getPageByPath(path)
  
  if (!page) {
    notFound()
  }

  const getLayoutClasses = () => {
    switch (page.layout) {
      case 'centered':
        return 'max-w-4xl mx-auto px-6'
      case 'wide':
        return 'max-w-7xl mx-auto px-8'
      default:
        return 'max-w-6xl mx-auto px-6'
    }
  }

  return (
    <div className={`py-8 ${getLayoutClasses()}`}>
      <div className="space-y-8">
        {page.components.map((component) => renderComponent(component))}
      </div>
    </div>
  )
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const path = '/' + resolvedParams.slug.join('/')
  const page = getPageByPath(path)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title,
    description: page.description,
  }
}