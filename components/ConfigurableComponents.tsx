import { ComponentConfig } from '@/lib/site-config'

// Banner Component
interface BannerProps {
  config: Extract<ComponentConfig, { type: 'banner' }>
}

function Banner({ config }: BannerProps) {
  const { title, subtitle, variant } = config
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-900',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    image: 'bg-gray-800 text-white'
  }
  
  return (
    <div className={`py-16 px-8 text-center ${variantClasses[variant]}`}>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-xl opacity-90">{subtitle}</p>}
    </div>
  )
}

// Text Component
interface TextProps {
  config: Extract<ComponentConfig, { type: 'text' }>
}

function Text({ config }: TextProps) {
  const { content, variant } = config
  
  const variantClasses = {
    heading: 'text-3xl font-bold mb-6',
    subheading: 'text-xl font-semibold mb-4', 
    paragraph: 'text-base leading-relaxed mb-4'
  }
  
  const Tag = variant === 'heading' ? 'h2' : variant === 'subheading' ? 'h3' : 'p'
  
  return <Tag className={variantClasses[variant]}>{content}</Tag>
}

// Button Component
interface ButtonProps {
  config: Extract<ComponentConfig, { type: 'button' }>
}

function Button({ config }: ButtonProps) {
  const { text, variant, size, link } = config
  
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100',
    link: 'text-blue-600 underline hover:no-underline'
  }
  
  const sizeClasses = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2'
  }
  
  const className = `inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]}`
  
  if (link) {
    return (
      <a href={link} className={className}>
        {text}
      </a>
    )
  }
  
  return (
    <button className={className}>
      {text}
    </button>
  )
}

// Card Component
interface CardProps {
  config: Extract<ComponentConfig, { type: 'card' }>
}

function Card({ config }: CardProps) {
  const { title, content, variant } = config
  
  const variantClasses = {
    default: 'bg-white shadow-sm',
    outline: 'border border-gray-200'
  }
  
  return (
    <div className={`rounded-lg p-6 ${variantClasses[variant]}`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  )
}

// Main component renderer
export function renderComponent(component: ComponentConfig) {
  switch (component.type) {
    case 'banner':
      return <Banner key={component.id} config={component} />
    case 'text':
      return <Text key={component.id} config={component} />
    case 'button':
      return <Button key={component.id} config={component} />
    case 'card':
      return <Card key={component.id} config={component} />
    default:
      return null
  }
}