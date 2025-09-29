# Design Guidelines for Next.js JSON-Configured SSG Application

## Design Approach: Clean Utility Design System

**Selected Approach:** Design System Approach using Material Design principles  
**Justification:** This is a utility-focused application for content management and page generation, prioritizing functionality, clarity, and maintainability over visual differentiation.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 219 91% 60% (Modern blue for interactive elements)
- Secondary: 220 13% 91% (Light gray backgrounds)
- Surface: 0 0% 100% (White cards and containers)
- Text Primary: 220 9% 15% (Dark gray for main content)
- Text Secondary: 220 9% 46% (Medium gray for supporting text)

**Dark Mode:**
- Primary: 219 91% 70% (Slightly lighter blue for contrast)
- Secondary: 220 13% 18% (Dark gray backgrounds)
- Surface: 220 13% 9% (Very dark gray for cards)
- Text Primary: 220 9% 95% (Light gray for main content)
- Text Secondary: 220 9% 65% (Medium gray for supporting text)

### B. Typography
- **Primary Font:** Inter (Google Fonts) - Clean, readable, excellent for interfaces
- **Sizes:** 12px (captions), 14px (body), 16px (body-large), 20px (headings), 24px (page titles)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold)

### C. Layout System
**Spacing Units:** Consistently use Tailwind units of 2, 4, 6, and 8
- `p-2, m-2` for tight spacing
- `p-4, m-4` for standard component spacing  
- `p-6, m-6` for section spacing
- `p-8, m-8` for major layout spacing

### D. Component Library

**Navigation:**
- Clean sidebar navigation with collapsible sections
- Breadcrumb navigation for deep page structures
- Tab-based navigation for configuration sections

**Forms:**
- Standard input fields with clear labels and validation states
- Dropdown selectors for component types
- Toggle switches for boolean configuration options
- Clean button hierarchy (primary, secondary, ghost)

**Data Displays:**
- Card-based layout for page previews
- Table format for configuration lists
- Code preview blocks with syntax highlighting
- Component preview panels

**Configuration Interface:**
- JSON editor with syntax highlighting
- Drag-and-drop component ordering
- Live preview panels
- Component property editors

### E. Animations
Minimal animations focused on usability:
- Subtle hover states on interactive elements
- Smooth transitions between configuration panels (200ms)
- Loading states for page generation

## Page-Specific Guidelines

**Configuration Dashboard:**
- Two-panel layout: configuration editor on left, live preview on right
- Component palette as a collapsible sidebar
- Status indicators for page generation progress

**Generated Pages:**
- Clean, content-focused layout that adapts to configured components
- Consistent spacing and typography regardless of component mix
- Responsive design that works across all device sizes

**Component Previews:**
- Isolated component display with clear boundaries
- Configuration options clearly labeled and grouped
- Real-time updates as configurations change

## Images
No hero images required. Use placeholder images (via services like Unsplash) for:
- Banner component demonstrations (1200x400px landscapes)
- Card component examples (400x300px various subjects)
- User avatar placeholders (circular, 40x40px)

Place these as examples within the component configuration interface to show how different content types would render.