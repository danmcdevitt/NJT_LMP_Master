# Luxury Travel Agency - Project Structure & Components

## Page Structure (Single Page)

1. **Header Navigation** - Logo, nav links, phone number (call/message)
2. **Hero** - Main hero section with headline and CTA
3. **About** - About section with company story
4. **How It Works** - Step-by-step process explanation
5. **Reassurance** - Trust indicators and key benefits
6. **CTA** - Final call-to-action section
7. **Footer** - Footer with company info and links

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
│   ├── layout/
│   │   ├── Header.tsx              # Navigation header with phone number
│   │   ├── Footer.tsx              # Site footer
│   │   └── Navigation.tsx          # Main navigation component
│   │
│   ├── sections/
│   │   ├── Hero.tsx                # Hero section with CTA
│   │   ├── About.tsx               # About/why choose us section
│   │   ├── HowItWorks.tsx          # How it works/process section
│   │   ├── Reassurance.tsx         # Trust indicators/reassurance section
│   │   └── CTA.tsx                 # Call-to-action section
│   │
│   ├── ui/
│   │   ├── Button.tsx              # Reusable button component
│   │   ├── Card.tsx                # Card container component
│   │   ├── Badge.tsx               # Badge/tag component
│   │   └── ScrollReveal.tsx        # Scroll animation wrapper
│   │
│   └── shared/
│       ├── Logo.tsx                # Site logo component
│       ├── Icon.tsx                # Icon wrapper component
│       └── Image.tsx               # Optimized image component
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
├── next.config.js                  # Next.js configuration
├── package.json
├── tsconfig.json                   # TypeScript configuration
└── tailwind.config.ts              # Tailwind CSS configuration
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

## Luxury Design Considerations

- Elegant typography (serif fonts for headings)
- Generous white space
- High-quality imagery
- Subtle animations and transitions
- Premium color palette (gold accents, deep blues, whites)
- Refined hover effects
- Polished micro-interactions

