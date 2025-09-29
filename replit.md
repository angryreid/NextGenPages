# Dynamic SSG Builder - JSON Configuration Engine

## Overview

This is a Next.js-based Static Site Generator (SSG) that allows users to build dynamic websites through JSON configuration. The application features a visual builder interface where users can create and configure pages using predefined components (buttons, banners, text blocks, and cards) without writing code. The system generates static sites at build time while providing a real-time preview and configuration management interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom design system based on Material Design principles
- **State Management**: React Context for configuration management, TanStack Query for server state
- **Routing**: Wouter for client-side routing with dynamic route generation

### Component System
- **Configurable Components**: Modular system supporting buttons, banners, text blocks, and cards
- **Configuration Schema**: Zod-based validation for type-safe JSON configuration
- **Dynamic Rendering**: Runtime component generation based on JSON configuration
- **Theme Support**: Light/dark mode with CSS custom properties

### Data Management
- **Configuration Storage**: LocalStorage for client-side persistence with JSON validation
- **Schema Validation**: Comprehensive Zod schemas for all component types and site configuration
- **Type Safety**: Full TypeScript integration with shared types between client and server

### Build System
- **Development**: Vite dev server with HMR and error overlay
- **Production**: Static site generation with optimized builds
- **Asset Management**: Path aliasing and asset resolution for development and production

### Backend Architecture (Planned)
- **Server Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for schema management
- **API Layer**: RESTful endpoints for configuration CRUD operations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Design System
- **Color Palette**: Neutral-based theme with primary blue accents
- **Typography**: Inter font family with consistent sizing scale
- **Layout**: Responsive grid system with standardized spacing units
- **Components**: Consistent button variants, form controls, and navigation elements

## External Dependencies

### Database
- **PostgreSQL**: Primary database for configuration storage (configured via Drizzle)
- **Neon Database**: Serverless PostgreSQL provider via @neondatabase/serverless

### UI Components
- **Radix UI**: Complete set of accessible UI primitives for forms, dialogs, navigation
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for content display

### Development Tools
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **Drizzle Kit**: Database schema management and migration tools
- **Zod**: Runtime type validation for configuration schemas

### Build and Development
- **Vite**: Fast build tool with development server and HMR
- **esbuild**: Fast bundling for production server builds
- **TypeScript**: Type safety across the entire application

### Styling and Animation
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **PostCSS**: CSS processing with autoprefixer
- **Class Variance Authority**: Type-safe variant management for components

### State Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Date-fns**: Date utility library for time-based operations