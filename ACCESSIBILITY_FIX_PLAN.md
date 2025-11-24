# Accessibility Fix Plan

## Audit Summary
- **Audit Score**: 53% (Below 90% threshold - NOT COMPLIANT)
- **Critical Issues**: 11
- **Passed Audits**: 32
- **Required Manual Audits**: 22
- **Not Applicable**: 51

## Critical Issues Breakdown

### 1. Ensure Buttons Have Accessible Names (2 elements)
**WCAG 2.0 - 2.2 Level A**  
**Affects**: Blind, Deafblind users

**Issue**: Two buttons lack accessible names/labels for screen readers.

**Location**: `components/ui/holidaytypegallery.tsx` (lines 166-183)

**Current Code**:
```typescript
<Button
  size="icon"
  variant="outline"
  onClick={() => scroll('prev')}
  disabled={!canScrollPrev}
>
  <ArrowLeft className="size-5 transition-colors duration-200" />
</Button>
<Button
  size="icon"
  variant="outline"
  onClick={() => scroll('next')}
  disabled={!canScrollNext}
>
  <ArrowRight className="size-5 transition-colors duration-200" />
</Button>
```

**Fix**: Add `aria-label` attributes to both buttons:
- Previous button: `aria-label="Previous holiday type"`
- Next button: `aria-label="Next holiday type"`

---

### 2. Color Contrast Issues (6 elements)
**WCAG 2.0 - 2.2 Level AA**  
**Affects**: Low Vision, Colorblindness users

**Issue**: Text colors don't meet minimum contrast ratio of 4.5:1 for normal text or 3:1 for large text.

**Potential Locations**:
1. Hero section feature cards with white text on light backgrounds
2. Feature grid cards with text overlays
3. Holiday type gallery cards with text on colored backgrounds
4. Accordion content text colors
5. Footer text colors

**Fix Strategy**:
- Review all text overlays on images/backgrounds
- Ensure white text has sufficient contrast (darken backgrounds or add text shadows)
- Test with contrast checker tools
- Consider adding semi-transparent dark overlays behind text

**Specific Areas to Check**:
- `app/page.tsx` - Hero feature cards (lines 405-451)
- `components/ui/FeatureGrid.tsx` - Feature cards with overlays
- `components/ui/holidaytypegallery.tsx` - Card text overlays
- `components/feature197.tsx` - Accordion content

---

### 3. Landmarks Should Have Unique Role/Label (1 element)
**Best Practice**  
**Affects**: Sighted, Keyboard Users, Screen Reader Users

**Issue**: Multiple `<nav>` elements without unique labels.

**Locations**:
1. `app/page.tsx` (line 216) - Main navigation
2. `components/footer13.tsx` (line 42) - Footer navigation

**Current Code**:
```tsx
// page.tsx line 216
<nav className={`fixed top-0...`}>

// footer13.tsx line 42
<nav className="w-full border-b...">
```

**Fix**: Add `aria-label` to distinguish navigation landmarks:
- Main nav: `aria-label="Main navigation"`
- Footer nav: `aria-label="Footer navigation"` or change to `<footer>` with proper structure

---

### 4. Heading Order Issues (1 element)
**Best Practice**  
**Affects**: Blind, Deafblind, Screen Reader Users

**Issue**: Heading hierarchy is not semantically correct (e.g., h1 → h3 skipping h2, or h4 used incorrectly).

**Potential Issues**:
- `components/feature197.tsx` - Accordion uses h4 inside h3 (lines 150-155)
- Check for any h4 elements that should be h3 or h2

**Current Code**:
```tsx
// feature197.tsx
<AccordionTrigger>
  <h4 className="...">{tab.title}</h4>
</AccordionTrigger>
```

**Fix**: 
- Ensure proper heading hierarchy: h1 → h2 → h3 (no skipping)
- Review all heading levels across the site
- Change h4 to appropriate level or use semantic structure

---

### 5. Scrollable Content Keyboard Accessibility (1 element)
**WCAG 2.0 - 2.2 Level A**  
**Affects**: Blind, Deafblind, Keyboard Users

**Issue**: Scrollable container not fully accessible via keyboard.

**Location**: `components/ui/holidaytypegallery.tsx` (lines 188-318)

**Current Code**:
```tsx
<div
  ref={scrollContainerRef}
  onScroll={checkScrollability}
  className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-5 lg:px-6 pb-10"
  style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
>
```

**Fix**:
- Add `tabindex="0"` to make container focusable
- Add `role="region"` and `aria-label="Holiday types carousel"`
- Add keyboard event handlers for arrow keys (left/right)
- Ensure focus management when scrolling

---

## Implementation Priority

### Priority 1 (Critical - Legal Risk)
1. ✅ Fix buttons without accessible names
2. ✅ Fix color contrast issues
3. ✅ Fix scrollable content keyboard accessibility

### Priority 2 (Important - Best Practice)
4. ✅ Fix landmark uniqueness
5. ✅ Fix heading order

---

## Additional Recommendations

### Video Accessibility
- Add `aria-label` to video elements describing their content
- Ensure video controls are keyboard accessible
- Consider adding captions/subtitles for video content

### Image Alt Text
- Review all images to ensure descriptive alt text
- Decorative images should have empty alt (`alt=""`)
- Informative images need descriptive alt text

### Focus Management
- Ensure all interactive elements have visible focus indicators
- Test keyboard navigation through entire page
- Ensure focus order is logical

### ARIA Labels
- Add `aria-label` to icon-only buttons
- Add `aria-describedby` where helpful context is needed
- Ensure form inputs have proper labels

### Semantic HTML
- Use proper semantic elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- Ensure proper use of landmarks
- Use `<button>` for actions, `<a>` for navigation

---

## Testing Checklist

After implementing fixes:
- [ ] Run accessibility checker again
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Test keyboard navigation (Tab, Arrow keys, Enter, Space)
- [ ] Test color contrast with contrast checker tool
- [ ] Test on mobile devices
- [ ] Verify heading hierarchy
- [ ] Check all interactive elements have focus states
- [ ] Verify all images have appropriate alt text

---

## Tools for Testing

1. **Accessibility Checker**: https://www.accessibilitychecker.org/
2. **WAVE**: https://wave.webaim.org/
3. **axe DevTools**: Browser extension
4. **Contrast Checker**: https://webaim.org/resources/contrastchecker/
5. **Screen Readers**: NVDA (Windows), VoiceOver (Mac/iOS), JAWS

---

## Notes

- All fixes should maintain existing design and functionality
- Test thoroughly after each fix
- Document any design compromises needed for accessibility
- Consider adding skip links for main content navigation

