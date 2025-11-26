# LMP Site - Brand Guidelines

**Last Updated:** 24.11.2025  
**Project:** Luxury Travel Agency - LMP Site

## Design System: Holiday Linen

### Color Palette

#### Primary Colors

**Cruise Blue** (`#004F6E`)
- **Usage:** Primary text, borders, primary buttons, headings
- **RGB:** `0, 79, 110`
- **CSS Variable:** `--foreground`
- **Application:** Main brand color for text and primary UI elements

**Island Coral** (`#FF5353`)
- **Usage:** Primary action buttons, CTAs, highlights
- **RGB:** `255, 83, 83`
- **CSS Variable:** `--coral`
- **Application:** Call-to-action buttons, important interactive elements

#### Background Colors

**Holiday Linen** (`#F5F0EC`)
- **Usage:** Base background color
- **RGB:** `245, 240, 236`
- **CSS Variable:** `--background`
- **Application:** Main page background, card backgrounds

**White** (`#FFFFFF`)
- **Usage:** Card backgrounds, overlays, clean surfaces
- **RGB:** `255, 255, 255`
- **CSS Variable:** `--card`
- **Application:** Cards, modals, elevated surfaces

#### Accent Colors

**Lagoon** (`#9FD5D1`)
- **Usage:** Secondary buttons, decorative accents, overlays
- **RGB:** `159, 213, 209`
- **CSS Variable:** `--lagoon`
- **Application:** Secondary actions, subtle backgrounds, icon colors

**Ocean** (`#9FF0D4`)
- **Usage:** Decorative accents, highlights, overlays
- **RGB:** `159, 240, 212`
- **CSS Variable:** `--ocean`
- **Application:** Feature highlights, gradient overlays, bento box backgrounds

**Pina** (`#E1FCAD`)
- **Usage:** Decorative accents, subtle highlights
- **RGB:** `225, 252, 173`
- **CSS Variable:** `--pina`
- **Application:** Subtle decorative elements

#### Neutral Colors

**Muted** (`#EBE6E2`)
- **Usage:** Subtle backgrounds, borders
- **RGB:** `235, 230, 226`
- **CSS Variable:** `--muted`
- **Application:** Input fields, subtle dividers

**Muted Foreground** (`#647882`)
- **Usage:** Secondary text, captions
- **RGB:** `100, 120, 130`
- **CSS Variable:** `--muted-foreground`
- **Application:** Body copy, secondary information

**Border** (`#DCD7D3`)
- **Usage:** Borders, dividers
- **RGB:** `220, 215, 211`
- **CSS Variable:** `--border`
- **Application:** Card borders, input borders

### Typography

**Font Family:** Outfit (Google Fonts)
- **Weights:** 400 (Regular), 700 (Bold)
- **Usage:** All text elements
- **CSS Variable:** `--font-outfit`

**Font Sizing Scale:**
- **Headings (h1):** `text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl`
- **Headings (h2):** `text-2xl sm:text-3xl lg:text-4xl`
- **Headings (h3):** `text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- **Body Large:** `text-base sm:text-lg md:text-xl`
- **Body:** `text-sm sm:text-base md:text-lg`
- **Body Small:** `text-xs sm:text-sm md:text-base lg:text-lg`
- **Small Text:** `text-xs md:text-sm lg:text-base`

**Font Weight:**
- **Headings:** `font-bold` (700)
- **Body:** `font-medium` or default (400)

### Border Radius

**Standard Radius:** `1.5rem` (24px)
- **CSS Variable:** `--radius`
- **Tailwind Class:** `rounded-3xl`
- **Application:** Buttons, cards, containers, all rounded elements

**Radius Variants:**
- `--radius-sm`: `calc(var(--radius) - 4px)` = 20px
- `--radius-md`: `calc(var(--radius) - 2px)` = 22px
- `--radius-lg`: `var(--radius)` = 24px
- `--radius-xl`: `calc(var(--radius) + 4px)` = 28px

### Spacing & Layout

**Container Width:**
- **Mobile/Tablet:** `95vw` (95% of viewport width)
- **Desktop Max:** `max-w-7xl` (1280px)
- **Centering:** `mx-auto`

**Padding:**
- **Section Padding:** `py-12 sm:py-16 lg:py-24`
- **Container Padding:** `px-4 sm:px-6 lg:px-8` or `px-4 sm:px-6 lg:px-12`

**Gaps:**
- **Grid Gaps:** `gap-4 sm:gap-6 lg:gap-8`
- **Flex Gaps:** `gap-2 sm:gap-3 lg:gap-4` or `gap-4 sm:gap-6 lg:gap-8`

### Component Styles

#### Buttons

**Primary Button (Coral):**
- Background: `rgb(var(--coral))` / `#FF5353`
- Text: White
- Hover: `rgb(255, 70, 70)`
- Shadow: `shadow-lg hover:shadow-xl`
- Border Radius: `rounded-3xl`

**Secondary Button (Lagoon):**
- Background: `rgb(var(--lagoon))` / `#9FD5D1`
- Text: Cruise Blue (`--foreground`)
- Hover: `rgb(var(--lagoon))/90`
- Shadow: `shadow-md hover:shadow-lg`
- Border Radius: `rounded-3xl`

**Outline Button:**
- Border: `2px solid` Cruise Blue
- Background: Transparent/White
- Text: Cruise Blue
- Hover: Cruise Blue background, white text

**Sizes:**
- Small: `h-8 px-3 py-2`
- Default: `h-9 px-4 py-2`
- Large: `h-12 px-8 py-4 text-base`

#### Cards

**Standard Card:**
- Background: White
- Border Radius: `rounded-lg` or `rounded-3xl`
- Shadow: Varies by context
- Padding: `p-4 md:p-6 lg:p-10`

**Glass Effect Card:**
- Background: `rgba(255, 255, 255, 0.1)`
- Backdrop Filter: `blur(10px)`
- Border: `1px solid rgba(255, 255, 255, 0.2)`

#### Badges/Pills

**Style:**
- Background: `rgba(159, 240, 212, 0.15)` (Ocean with opacity)
- Text Color: `rgb(0, 120, 120)` (Teal)
- Border: `1px solid rgba(0, 120, 120, 0.3)`
- Padding: `px-3 sm:px-4 py-1.5 sm:py-2`
- Border Radius: `rounded-lg`
- Font: `text-xs sm:text-sm font-bold`

### Animations & Transitions

**Fade In Animations:**
- Duration: `0.7s - 1s ease-out`
- Delay: `0s - 0.3s` (staggered)
- Transform: `translateY(20px)` to `translateY(0)`

**Floating Animation:**
- Duration: `6s ease-in-out infinite`
- Transform: `translateY(0px)` to `translateY(-10px)`

**Slow Spin:**
- Duration: `20s linear infinite`
- Transform: `rotate(0deg)` to `rotate(360deg)`

**Ping Animation:**
- Duration: `3s cubic-bezier(0, 0, 0.2, 1) infinite`
- Transform: `scale(1)` to `scale(1.5)` with opacity fade

**Scan Animation:**
- Duration: `3s ease-in-out infinite`
- Transform: `translateY(-100%)` to `translateY(200%)`

**Zoom In:**
- Duration: `20s ease-in-out infinite alternate`
- Transform: `scale(1)` to `scale(1.1)`

### Icon Library

**Library:** Lucide React
**Common Icons Used:**
- `User` - Personal service
- `Gift` - Free service
- `Plane` - Travel
- `Star` - Quality/ratings
- `Sparkles` - Features
- `MapPin` - Location
- `Award` - Trust/quality
- `ArrowRight` - Navigation

**Icon Sizing:**
- Small: `w-3 h-3 sm:w-4 sm:h-4`
- Default: `w-6 h-6` or `w-8 h-8`
- Large: `w-12 h-12`

### Logo Usage

**Primary Logo:**
- File: `/images/logos/NJT Logo Cruise Blue.webp`
- Usage: Navigation, headers
- Responsive: `h-12 sm:h-14 w-auto`
- Inverted on dark backgrounds: `brightness-0 invert`

**Trust Badges:**
- Trustpilot: `/images/logos/Trustpilot.png`
- ABTA: `/images/logos/abta_white.png`
- Europe The Travel Franchise: `/images/logos/EUROPE THE TRAVEL FRANCHISE.png`
- W Travel Franchise: `/images/logos/W Travel Franchise.png`
- TTF Logos: `/images/logos/TTF website - KTP & Acc-(2).png.webp` and `(3).png.webp`

### Image Guidelines

**Hero Images:**
- Format: WebP preferred, MP4 for videos
- Aspect Ratios: Varies by section
- Optimization: Next.js Image component

**Profile Images:**
- File: `/images/logos/portraitjane.webp`
- Usage: Profile cards, about sections
- Aspect Ratio: `3:4` (portrait)

### Responsive Breakpoints

**Tailwind Defaults:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Common Patterns:**
- Mobile-first approach
- Grid: `grid-cols-2 lg:grid-cols-4`
- Text: `text-base sm:text-lg md:text-xl`
- Padding: `p-4 sm:p-6 lg:p-8`

### Accessibility

**Color Contrast:**
- Cruise Blue on White: WCAG AAA compliant
- White on Coral: WCAG AA compliant
- Text on backgrounds meets WCAG standards

**Focus States:**
- Ring: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`
- Border: `focus-visible:border-ring`

### Usage Examples

#### Bento Grid Box Colors

1. **Box 1 (Personal Service):** Image background with white overlay
2. **Box 2 (Totally Free):** Coral (`#FF5353`) background with image
3. **Box 3 (Complete Protection):** Cruise Blue (`#004F6E`) background
4. **Box 4-6:** Various accent colors (Ocean, Lagoon) with opacity

#### Overlay Gradients

**Frosted Glass Overlay:**
- Gradient: `linear-gradient(to top, rgba(159, 240, 212, 0.95) 0%, rgba(159, 240, 212, 0.85) 40%, rgba(159, 240, 212, 0.6) 70%, rgba(159, 240, 212, 0.2) 100%)`
- Backdrop Filter: `blur(8px)`
- Height: `75%` from bottom

### Implementation Notes

- All colors use CSS custom properties for easy theming
- Tailwind CSS for utility classes
- Design tokens defined in `globals.css`
- Components follow consistent patterns
- Mobile-first responsive design

