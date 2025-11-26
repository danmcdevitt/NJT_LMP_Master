# LMP Site - SpecStory

**Project:** Luxury Travel Agency - LMP Site  
**Last Updated:** 24.11.2025  
**Last Synced:** 24.11.2025  
**Status:** Active Development

## Story Overview

This is a luxury travel agency website for Jane Smith, showcasing her partnership with Not Just Travel. The site emphasizes personal service, trust, and the backing of an award-winning travel brand while maintaining a personal touch.

## Design System Story

### The Holiday Linen Palette

**The Vision:** A warm, inviting design system that evokes luxury travel experiences - think of crisp linen on a cruise deck, the deep blue of ocean waters, and the vibrant coral of tropical destinations.

**Color Story:**

1. **Cruise Blue** (`#004F6E`) - The deep, trustworthy blue of ocean depths. Used for primary text and key UI elements, it conveys professionalism and reliability.

2. **Island Coral** (`#FF5353`) - The vibrant energy of tropical destinations. Used for CTAs and primary actions, it creates excitement and urgency.

3. **Holiday Linen** (`#F5F0EC`) - The warm, neutral base that grounds the design. Like premium hotel linens, it provides comfort and elegance.

4. **Lagoon** (`#9FD5D1`) - The refreshing turquoise of shallow tropical waters. Used for secondary elements and accents.

5. **Ocean** (`#9FF0D4`) - The bright, energetic mint of tropical waters. Used for highlights and decorative overlays.

6. **Pina** (`#E1FCAD`) - The subtle, fresh accent like a tropical drink garnish. Used sparingly for delicate highlights.

## Component Stories

### Navigation

**Story:** The navigation transforms as you scroll - starting transparent over the hero video, then becoming a solid white bar. The logo inverts to white when over dark backgrounds, ensuring visibility. The phone number is always prominent, emphasizing direct, personal contact.

**Implementation:**
- Fixed positioning with scroll-based background change
- Logo brightness inversion on scroll
- Prominent phone number display
- Responsive layout with mobile considerations

### Hero Section

**Story:** A cinematic video background sets the scene for luxury travel. The hero content is carefully positioned to balance with the profile card on desktop, creating a sophisticated two-column layout. The video creates atmosphere while the content delivers the key message.

**Implementation:**
- Full-viewport video background
- Centered content with max-width constraint
- Trust badges displayed prominently
- Feature highlights at bottom with scrollable mobile carousel

### Profile Card

**Story:** Jane's profile card is the personal touch that makes this different from a corporate site. It's sticky on desktop, following you as you scroll, and includes fan cards that animate in to create depth and interest. The frosted glass effect adds luxury.

**Implementation:**
- Sticky positioning on desktop
- Fan cards with rotation and translation animations
- Frosted glass overlay effect
- Responsive: hidden on mobile, replaced with inline card

### About Section

**Story:** This section tells the partnership story - combining the power of Not Just Travel with Jane's personal service. The pill badge introduces the section with a plane icon and "HOLIDAY WITH THE BEST" text, and the content emphasizes the best of both worlds.

**Content:**
- Pill badge: Plane icon, "HOLIDAY WITH THE BEST" text
- Headline: "I'm so excited to have partnered with the multi-award winning Not Just Travel."
- Body: Partnership benefits and trust messaging
- Trust logos: TTF website logos displayed

**Implementation:**
- Two-column layout on desktop (max-width constraint)
- Pill badge with plane icon (Ocean green background, teal text)
- Logo displays for trust (TTF logos)
- Responsive single-column on mobile

### Bento Grid (How It Works)

**Story:** The bento grid showcases key benefits in an engaging, visual way. Introduced with a pill badge featuring a star icon and "HOW IT WORKS" text, followed by a compelling headline and body copy that emphasizes personal service backed by an award-winning brand.

**Headline:** "Everything you need from someone you can call anytime"  
**Body Copy:** "I can bring you the backing, tools, technology and deals of an award‑winning travel brand, except you have my personal number."

**Box Stories:**
1. **Box 1 - Personal Service:** 
   - Large hero image (Amalfi Coast) with elegant white frosted glass overlay
   - User icon, headline "Personal service"
   - Description: "You'll be looked after by one of the top travel agencies in the UK"
   - Spans 2 columns on mobile, 1 on tablet, 2 on desktop

2. **Box 2 - Totally Free:**
   - Island Coral (`#FF5353`) background
   - Older couple image with frosted coral gradient overlay (75% height)
   - Gift icon, headline "Totally free" (white text)
   - Description: "We handle every detail for you, including research, quotes, bookings, amendments and aftercare." (white text)

3. **Box 3 - Complete Protection:**
   - Cruise Blue (`#004F6E`) background
   - Animated shield/plane icon composition with concentric circles
   - Headline: "Complete protection" (white, left-aligned)
   - Body: "All our holidays are ABTA and ATOL protected for total peace of mind." (white, left-aligned)

4. **Box 4 - Metric Display:**
   - Ocean green background (`rgba(159, 240, 212, 0.15)`)
   - Large number: "150+"
   - Label: "Metric 3"

5. **Box 5 - Metric Display:**
   - Lagoon background (`rgba(159, 213, 209, 0.2)`)
   - Large number: "10"
   - Label: "Metric 4"

6. **Box 6 - The Best Brands:**
   - Image background with Cruise Blue overlay (`rgba(0, 79, 110, 0.5)`)
   - Headline: "The best brands" (white)
   - Spans 2 columns on mobile, 1 on tablet, 2 on desktop

**Implementation:**
- Responsive grid: 2 columns mobile, 4 columns desktop
- Pill badge with Star icon (not Plane) - Ocean green background
- Each box has unique styling and content
- Scroll-triggered fade-in animations with staggered delays (0s to 0.3s)
- Consistent rounded corners (`rounded-lg`) and spacing
- Intersection Observer for scroll detection

### Shield & Plane Animation

**Story:** The protection icon combines a shield (security) with a plane (travel) in an animated composition. Concentric circles rotate slowly, creating a sense of scanning/protection. The floating animation adds life, and the scanning beam effect reinforces the security theme.

**Implementation:**
- SVG shield with mask for scanning effect
- Plane icon centered in shield
- Multiple animation layers (float, spin, ping, scan)
- Cruise Blue color scheme matching box 3

## Typography Story

**Outfit Font:** Modern, clean, and approachable. The bold weight for headings creates impact while remaining friendly. The regular weight for body text ensures readability across all devices.

**Hierarchy:**
- Large hero headlines create immediate impact
- Section headings guide the user through content
- Body text is sized for comfortable reading
- Small text provides supporting information without overwhelming

## Animation Philosophy

**Subtle & Purposeful:** Animations enhance the experience without distracting. They:
- Guide attention to important elements
- Create depth and interest
- Provide feedback for interactions
- Maintain performance with optimized CSS animations

**Key Animations:**
- Scroll-triggered fade-ins create a sense of progression
- Floating animations add life to static elements
- Slow rotations create depth without distraction
- Scanning effects reinforce security themes

## Responsive Story

**Mobile-First:** The site is designed mobile-first, ensuring excellent experiences on all devices. Key considerations:
- Touch-friendly button sizes
- Readable text at all sizes
- Optimized images for performance
- Horizontal scrolling carousels where appropriate

**Desktop Enhancements:**
- Multi-column layouts
- Sticky elements for better UX
- Hover states for interactivity
- More generous spacing

## Content & Copy

### Hero Section
- **Badge:** "YOUR PERSONAL HOLIDAY HERO"
- **Headline:** "Make planning a holiday, feel like a holiday"
- **Trust Badges:** Trustpilot, ABTA, Europe The Travel Franchise, W Travel Franchise
- **Feature Highlights:**
  - "Expert knowledge for unforgettable travel experiences"
  - "Personalised service tailored to your preferences"
  - "Trusted by travellers worldwide"

### About Section
- **Badge:** "HOLIDAY WITH THE BEST" (with Plane icon)
- **Headline:** "I'm so excited to have partnered with the multi-award winning Not Just Travel."
- **Body:** Partnership benefits and value proposition
- **Trust Logos:** TTF website logos

### Bento Grid Section
- **Badge:** "HOW IT WORKS" (with Star icon)
- **Headline:** "Everything you need from someone you can call anytime"
- **Body:** "I can bring you the backing, tools, technology and deals of an award‑winning travel brand, except you have my personal number."

**Box Content:**
1. **Personal Service:** "You'll be looked after by one of the top travel agencies in the UK."
2. **Totally Free:** "We handle every detail for you, including research, quotes, bookings, amendments and aftercare."
3. **Complete Protection:** "All our holidays are ABTA and ATOL protected for total peace of mind."
4. **Metrics:** "150+", "10" (with labels "Metric 3", "Metric 4")
5. **The Best Brands:** Headline only

### Navigation
- **Phone Number:** "Contact Jane Smith on 07777 000 123"
- **CTA Button:** "Contact Jane"

## Trust & Reassurance

**Visual Trust Indicators:**
- ABTA and ATOL badges
- Trustpilot rating display
- Franchise logos (Europe The Travel Franchise, W Travel Franchise, TTF)
- Professional photography

**Content Trust Elements:**
- "Totally free" messaging
- "Complete protection" with ABTA/ATOL
- Personal phone number availability
- Award-winning brand backing

## Performance Story

**Optimizations:**
- Next.js Image optimization
- CSS animations (not JavaScript)
- Lazy loading where appropriate
- Efficient component structure

## Accessibility Story

**Inclusive Design:**
- High contrast ratios
- Focus states for keyboard navigation
- Semantic HTML structure
- ARIA labels where needed
- Alt text for all images

## Future Considerations

**Potential Enhancements:**
- Dark mode support (design tokens ready)
- Additional animation refinements
- More interactive elements
- Enhanced mobile experiences
- Performance monitoring

## Component Inventory

### Active Components

1. **FeatureGrid** (`components/ui/FeatureGrid.tsx`)
   - Bento grid with 6 boxes
   - Scroll-triggered animations
   - Shield/plane animation in box 3
   - Responsive grid layout

2. **Button** (`components/ui/Button.tsx`)
   - Coral primary variant
   - Lagoon secondary variant
   - Outline variant
   - Multiple sizes (sm, default, lg)

3. **Card** (`components/ui/Card.tsx`)
   - Standard card with glass effects
   - Frosted glass utility classes

4. **Badge** (`components/ui/Badge.tsx`)
   - Badge component for pills and tags

5. **HolidayTypeGallery** (`components/ui/holidaytypegallery.tsx`)
   - Carousel-based gallery component
   - Uses shadcn carousel components

6. **Gallery15** (`components/ui/gallery15.tsx`)
   - Gallery component variant

7. **Feature71** (`components/ui/feature71.tsx`)
   - Feature component variant

### Page Structure (page.tsx)

- Navigation (fixed, scroll-responsive)
- Hero section (video background, trust badges)
- Profile card (sticky desktop, inline mobile)
- About section (partnership story)
- FeatureGrid section (bento grid)

## Maintenance Notes

**Key Files:**
- `app/globals.css` - Design tokens and utilities
- `components/ui/FeatureGrid.tsx` - Bento grid implementation
- `components/ui/Button.tsx` - Button variants
- `app/page.tsx` - Main page structure

**When Updating:**
- Always update CSS variables in `globals.css`
- Maintain consistent spacing patterns
- Test responsive breakpoints
- Verify color contrast ratios
- Update this documentation
- Sync specstory after major changes

**Last Sync:** 24.11.2025

