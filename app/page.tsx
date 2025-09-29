import { getSiteConfig } from '@/lib/site-config'
import { renderComponent } from '@/components/ConfigurableComponents'

export default function HomePage() {
  const config = getSiteConfig()
  const homePage = config.pages.find(page => page.path === '/')
  
  if (!homePage) {
    return <div>Home page not found in configuration</div>
  }

  const getLayoutClasses = () => {
    switch (homePage.layout) {
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
        {homePage.components.map((component) => renderComponent(component))}
      </div>
    </div>
  )
}