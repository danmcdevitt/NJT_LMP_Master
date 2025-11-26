# Luxury Travel Agency - Project Structure & Components

**Last Updated:** 24.11.2025

## Documentation

- **[BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)** - Complete brand guidelines, color palette, typography, and component specifications
- **[SPECSTORY.md](./SPECSTORY.md)** - Design system story, component narratives, and implementation philosophy

## Page Structure (Single Page)

1. **Header Navigation** - Fixed navigation with logo, phone number, scroll-based styling
2. **Hero** - Full-viewport video background with headline, trust badges, and feature highlights
3. **Profile Card** - Sticky profile card (desktop) with fan card animations
4. **About** - About section with partnership story and trust logos
5. **How It Works (Bento Grid)** - Feature grid showcasing key benefits with pill badge, headline, and body copy
6. **Additional Sections** - Holiday type gallery and other content sections

**Note:** No contact form - phone number in header nav for direct contact (call or message).

## Folder Structure

```
07_LMP_Site/
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                    # Main landing page (1-page site)
│   ├── globals.css                 # Global styles & Tailwind imports
│   └── favicon.ico                 # Site favicon
│
├── components/
│   └── ui/
│       ├── Button.tsx              # Reusable button component (Coral/Lagoon variants)
│       ├── Card.tsx                # Card container component (glass effects)
│       ├── Badge.tsx               # Badge/tag component
│       ├── FeatureGrid.tsx         # Bento grid component (How It Works section)
│       ├── gallery15.tsx           # Gallery component
│       ├── holidaytypegallery.tsx  # Holiday type gallery component
│       └── feature71.tsx          # Feature component
│
├── lib/
│   ├── utils.ts                    # Utility functions (cn, etc.)
│   └── constants.ts                # Site constants & data
│
├── types/
│   └── index.ts                    # TypeScript type definitions
│
├── public/
│   ├── images/                     # Image assets
│   │   ├── hero/
│   │   ├── about/
│   │   ├── how-it-works/
│   │   └── logos/
│   └── fonts/                      # Custom fonts (if any)
│
├── .cursorrules                    # Cursor AI rules
├── .gitignore
├── BRAND_GUIDELINES.md            # Brand documentation and design system
├── SPECSTORY.md                   # Design system story and component narratives
├── PROJECT_STRUCTURE.md            # This file
├── next.config.ts                 # Next.js configuration
├── package.json
├── tsconfig.json                  # TypeScript configuration
└── postcss.config.mjs              # PostCSS configuration
```

## Reusable Components List

### Layout Components

1. **Header**
   - Responsive navigation
   - Logo
   - Navigation links (smooth scroll to sections)
   - **Phone number** (clickable tel: link and/or message link)
   - Mobile menu toggle
   - Sticky/fixed positioning option
   - Active section highlighting

2. **Footer**
   - Company info
   - Social media links (optional)
   - Contact information
   - Copyright notice
   - Additional navigation links

3. **Navigation**
   - Desktop horizontal menu
   - Mobile hamburger menu
   - Active section highlighting
   - Smooth scroll behavior
   - Phone number display (prominent in nav)

### Section Components

4. **Hero**
   - Full-screen or large hero image/video background
   - Headline and subheadline
   - Primary CTA button (scrolls to CTA section or phone)
   - Scroll indicator
   - Overlay for text readability
   - Luxury aesthetic with elegant typography

5. **About**
   - Two-column layout (image + text)
   - Company story/mission
   - Key differentiators list
   - Personal touch messaging
   - Trust indicators

6. **How It Works**
   - Step-by-step process display
   - Numbered steps or timeline
   - Icon + title + description for each step
   - Grid or vertical layout
   - Visual flow indicators
   - Responsive columns (3-4 on desktop, 1 on mobile)

7. **Reassurance**
   - Trust indicators and guarantees
   - Key benefits/features grid
   - Statistics/metrics display (optional)
   - Testimonials/quotes (optional)
   - Badges/certifications (optional)
   - Icon + title + description cards

8. **CTA**
   - Prominent call-to-action section
   - Background image/color
   - Headline + subheadline
   - Primary CTA button (phone link)
   - Secondary messaging
   - Compelling copy to drive action

### UI Components

9. **Button**
    - Primary, secondary, outline variants
    - Different sizes (sm, md, lg)
    - Icon support (Phone icon for CTA)
    - Full-width option
    - Tel: link support for phone buttons

10. **Card**
    - Container with shadow/border
    - Header, body, footer sections
    - Hover effects
    - Image support
    - Used for steps, features, reassurance items

11. **Badge**
    - Small tag/badge component
    - Color variants
    - Icon support
    - For certifications, guarantees, etc.

12. **ScrollReveal**
    - Wrapper for scroll animations
    - Fade-in, slide-up effects
    - Intersection Observer based
    - Configurable delay/duration

### Shared Components

13. **Logo**
    - SVG or image logo
    - Responsive sizing
    - Link to home/top of page

14. **Icon**
    - Wrapper for lucide-react icons
    - Consistent sizing
    - Color variants

15. **Image**
    - Next.js Image component wrapper
    - Default optimization settings
    - Placeholder support
    - Responsive sizing

## Type Definitions Needed

```typescript
// types/index.ts
export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ReassuranceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}
```

## Key Features to Implement

- **Smooth scrolling** between sections
- **Parallax effects** on hero/background images
- **Fade-in animations** on scroll
- **Responsive design** (mobile-first)
- **Phone number integration** (tel: and messaging links)
- **Image optimization** with Next.js Image
- **SEO optimization** with proper metadata
- **Accessibility** (ARIA labels, keyboard navigation)
- **Performance** (code splitting, lazy loading)

## Design System: Holiday Linen

**Color Palette:**
- **Cruise Blue** (`#004F6E`) - Primary text and UI elements
- **Island Coral** (`#FF5353`) - Primary actions and CTAs
- **Holiday Linen** (`#F5F0EC`) - Base background
- **Lagoon** (`#9FD5D1`) - Secondary accents
- **Ocean** (`#9FF0D4`) - Decorative highlights
- **Pina** (`#E1FCAD`) - Subtle accents

**Typography:**
- **Font:** Outfit (Google Fonts) - 400 (Regular), 700 (Bold)
- **Border Radius:** 1.5rem (24px) - Heavy rounding throughout

**See [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) for complete specifications.**

## Current Implementation

### Actual Components in Use

1. **Navigation** (in `page.tsx`)
   - Fixed positioning with scroll-based background
   - Logo with brightness inversion
   - Phone number display
   - Responsive layout

2. **Hero Section** (in `page.tsx`)
   - Full-viewport video background
   - Centered content with max-width
   - Trust badges (Trustpilot, ABTA, etc.)
   - Feature highlights with mobile carousel

3. **Profile Card** (in `page.tsx`)
   - Sticky positioning on desktop
   - Fan card animations on scroll
   - Frosted glass effect
   - Mobile inline version

4. **About Section** (in `page.tsx`)
   - Pill badge with plane icon
   - Partnership story
   - Trust logos
   - Responsive layout

5. **FeatureGrid** (`components/ui/FeatureGrid.tsx`)
   - Bento grid layout (2 cols mobile, 4 cols desktop)
   - Pill badge with star icon
   - Headline and body copy
   - Multiple box styles:
     - Box 1: Image with overlay (Personal Service)
     - Box 2: Coral background with image (Totally Free)
     - Box 3: Cruise Blue with shield/plane animation (Complete Protection)
     - Boxes 4-6: Metric displays

6. **Holiday Type Gallery** (`components/ui/holidaytypegallery.tsx`)
   - Gallery component for holiday types

### Animations

- Scroll-triggered fade-ins (Intersection Observer)
- Floating animations (6s ease-in-out)
- Slow rotations (20s linear)
- Ping animations (3s cubic-bezier)
- Scan animations (3s ease-in-out)
- Zoom effects (20s ease-in-out alternate)

See [SPECSTORY.md](./SPECSTORY.md) for detailed component stories and animation philosophy.

