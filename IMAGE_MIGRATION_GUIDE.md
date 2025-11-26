# Next.js Image Component Migration Guide

**Status:** ✅ **Yes, you can migrate to Next.js `<Image>` component**

Your `next.config.ts` already has image optimization configured, so you're ready to go!

---

## Migration Overview

### Current State
- ✅ Image optimization config exists in `next.config.ts`
- ⚠️ All images use standard `<img>` tags (112+ instances)
- ⚠️ Some images use CSS `backgroundImage` in inline styles

### Benefits of Migration
- ✅ Automatic WebP/AVIF conversion
- ✅ Responsive image generation
- ✅ Built-in lazy loading
- ✅ Better performance and SEO
- ✅ Automatic image optimization

---

## Migration Patterns

### Pattern 1: Simple Images (Logos, Icons)

**Before:**
```tsx
<img
  src="/images/logos/NJT Logo Cruise Blue.webp"
  alt="Not Just Travel"
  className="h-12 sm:h-14 w-auto"
/>
```

**After:**
```tsx
import Image from 'next/image';

<Image
  src="/images/logos/NJT Logo Cruise Blue.webp"
  alt="Not Just Travel"
  width={200}  // Approximate width
  height={56}  // Approximate height (h-14 = 56px)
  className="h-12 sm:h-14 w-auto"
  priority // If above the fold
/>
```

**Note:** For logos with `w-auto`, you can use `width` and `height` props, or use `fill` with a container.

---

### Pattern 2: Absolute Positioned Background Images (Most Common)

**Before:**
```tsx
<img
  src="/images/corfu.webp"
  alt="Beautiful Corfu coastline"
  className="absolute inset-0 h-full w-full object-cover"
/>
```

**After:**
```tsx
import Image from 'next/image';

<div className="relative w-full h-full">
  <Image
    src="/images/corfu.webp"
    alt="Beautiful Corfu coastline"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

**Key Points:**
- Use `fill` prop instead of width/height
- Parent container must have `position: relative`
- Add `sizes` prop for responsive optimization
- Keep `object-cover` class

---

### Pattern 3: CSS Background Images (Hero Sections)

**Before:**
```tsx
<section 
  style={{ 
    backgroundImage: 'url(/images/hero-video-2-poster.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
```

**After (Option A - Recommended):**
```tsx
import Image from 'next/image';

<section className="relative">
  <Image
    src="/images/hero-video-2-poster.webp"
    alt=""
    fill
    className="object-cover"
    priority
    aria-hidden="true"
  />
  {/* Content overlay */}
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

**After (Option B - Keep CSS if needed):**
```tsx
// If you must keep CSS background-image, use Next.js Image API
// But this loses optimization benefits - not recommended
```

---

### Pattern 4: Images with Custom Object Position

**Before:**
```tsx
<img
  src={item.image}
  alt={item.title}
  className="size-full rounded-2xl object-cover"
  style={{ objectPosition: '35% bottom' }}
/>
```

**After:**
```tsx
import Image from 'next/image';

<Image
  src={item.image}
  alt={item.title}
  fill
  className="rounded-2xl object-cover"
  style={{ objectPosition: '35% bottom' }}
  sizes="280px"
/>
```

---

### Pattern 5: Images with Masks/Gradients

**Before:**
```tsx
<img
  src={product.hoverImage}
  alt={product.altText}
  className="absolute inset-0 h-full w-full object-cover"
  style={{  
    maskImage: 'linear-gradient(...)',
    WebkitMaskImage: 'linear-gradient(...)',
  }}
/>
```

**After:**
```tsx
import Image from 'next/image';

<Image
  src={product.hoverImage}
  alt={product.altText}
  fill
  className="object-cover"
  style={{  
    maskImage: 'linear-gradient(...)',
    WebkitMaskImage: 'linear-gradient(...)',
  }}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Note:** Masks and gradients work the same with Next.js Image.

---

## Step-by-Step Migration Plan

### Phase 1: Create Image Component Wrapper (Optional but Recommended)

Create a reusable wrapper for common patterns:

**File: `components/ui/OptimizedImage.tsx`**
```tsx
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fill?: boolean;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  fill = false,
  priority = false,
  className,
  sizes,
  ...props
}: OptimizedImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn('object-cover', className)}
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      className={className}
      sizes={sizes}
      {...props}
    />
  );
}
```

### Phase 2: Migrate Components One by One

**Priority Order:**
1. ✅ Above-the-fold images (hero, logos) - Add `priority` prop
2. ✅ Background images in cards
3. ✅ Gallery images
4. ✅ Below-the-fold images (lazy loading automatic)

### Phase 3: Handle Special Cases

**External CDN Images:**
```tsx
// Update next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'deifkwefumgah.cloudfront.net',
      pathname: '/shadcnblocks/**',
    },
  ],
}

// Then use normally:
<Image
  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
  alt="..."
  width={600}
  height={400}
/>
```

---

## Common Challenges & Solutions

### Challenge 1: Images with Dynamic Sizes

**Solution:** Use `fill` prop with responsive container:

```tsx
<div className="relative aspect-[3/4] w-full">
  <Image
    src="/images/portraitjane.webp"
    alt="Jane Smith"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 320px"
  />
</div>
```

### Challenge 2: Images in Carousels/Sliders

**Solution:** Use `fill` with proper `sizes`:

```tsx
<div className="relative w-[280px] h-[280px]">
  <Image
    src={item.image}
    alt={item.title}
    fill
    className="object-cover rounded-2xl"
    sizes="280px"
  />
</div>
```

### Challenge 3: Images with Transform/Animation

**Solution:** Next.js Image works with CSS transforms:

```tsx
<Image
  src="/images/29841.jpg"
  alt="Travel destination"
  fill
  className="object-cover transition-transform duration-500 hover:scale-110"
  sizes="320px"
/>
```

---

## Migration Checklist

### Pre-Migration
- [ ] Review all image usage patterns
- [ ] Identify images that need `priority` prop (above fold)
- [ ] Note images with custom `object-position`
- [ ] List external CDN images (need `remotePatterns` config)

### Migration Steps
- [ ] Update `next.config.ts` with `remotePatterns` if needed
- [ ] Create `OptimizedImage` wrapper component (optional)
- [ ] Migrate hero/logo images first (add `priority`)
- [ ] Migrate card background images
- [ ] Migrate gallery images
- [ ] Migrate remaining images
- [ ] Remove unused image optimization config if any

### Post-Migration
- [ ] Test all pages visually
- [ ] Verify images load correctly
- [ ] Check responsive behavior
- [ ] Verify lazy loading works
- [ ] Test on slow connections
- [ ] Check browser console for errors

---

## Example: Complete Component Migration

### Before: `components/ui/BrandCard.tsx`

```tsx
const BrandCard = ({ backgroundImage, logoImage, logoAlt }: BrandCardProps) => {
  return (
    <Card className="border-0 overflow-hidden aspect-[3/4] w-full relative">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <img
          src={logoImage}
          alt={logoAlt}
          className="max-w-full max-h-12 w-auto h-auto object-contain"
        />
      </div>
    </Card>
  );
};
```

### After: `components/ui/BrandCard.tsx`

```tsx
import Image from 'next/image';

const BrandCard = ({ backgroundImage, logoImage, logoAlt }: BrandCardProps) => {
  return (
    <Card className="border-0 overflow-hidden aspect-[3/4] w-full relative">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Frosted Glass Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] backdrop-blur-xl z-[1]" />
      
      {/* Logo */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 flex items-center justify-center">
        <Image
          src={logoImage}
          alt={logoAlt}
          width={200}
          height={64}
          className="max-w-full max-h-12 w-auto h-auto object-contain drop-shadow-lg"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>
    </Card>
  );
};
```

---

## Performance Tips

1. **Use `priority` for above-the-fold images:**
   ```tsx
   <Image src="..." priority />
   ```

2. **Optimize `sizes` prop:**
   ```tsx
   // Mobile-first approach
   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
   ```

3. **Use appropriate image formats:**
   - Next.js automatically serves WebP/AVIF when supported
   - Your config already specifies these formats ✅

4. **Consider image dimensions:**
   - For `fill` images, ensure parent has defined dimensions
   - For fixed-size images, provide accurate width/height

---

## Testing Checklist

After migration, test:

- [ ] Images load correctly on all pages
- [ ] Responsive images work on mobile/tablet/desktop
- [ ] Lazy loading works (scroll to see images load)
- [ ] Above-fold images load immediately (priority)
- [ ] Images maintain aspect ratios
- [ ] Object-cover/object-contain work correctly
- [ ] Custom object-position still works
- [ ] Masks/gradients still apply correctly
- [ ] No layout shift (CLS) issues
- [ ] Performance improved (check Lighthouse)

---

## Estimated Migration Time

- **Quick Migration (basic):** 2-4 hours
- **Complete Migration (with testing):** 4-8 hours
- **With wrapper component:** +1 hour setup, but faster overall

---

## Next Steps

1. **Start Small:** Migrate one component first (e.g., `BrandCard.tsx`)
2. **Test Thoroughly:** Verify it works before continuing
3. **Migrate Incrementally:** One section at a time
4. **Monitor Performance:** Use Lighthouse to track improvements

---

## Need Help?

If you encounter issues:
- Check Next.js Image docs: https://nextjs.org/docs/app/api-reference/components/image
- Verify `next.config.ts` image settings
- Ensure parent containers have `position: relative` for `fill` images
- Check browser console for errors

---

**Ready to migrate?** Start with the hero section or logo images - they'll show immediate performance benefits!

