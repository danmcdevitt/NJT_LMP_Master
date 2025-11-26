# Next.js Site Migration Assessment: Vercel to Alternative Hosting

**Project:** LMP Site (Next.js 16.0.3)  
**Current Hosting:** Vercel  
**Target:** Alternative hosting platform (TBD)  
**Assessment Date:** 24.11.2025

---

## Executive Summary

This Next.js application is currently configured for Vercel deployment but will be migrated to an alternative hosting platform. While the application is primarily a static site with client-side rendering, there are several Vercel-specific configurations and optimizations that need attention before migration. The site uses Next.js 16.0.3 with the App Router and is mostly compatible with standard Node.js hosting, but requires configuration adjustments.

**Risk Level:** 🟡 **Medium** - Most issues are configuration-related and can be resolved with minimal code changes.

---

## 1. Critical Issues

### 1.1 Vercel-Specific Configuration File

**Issue:** `vercel.json` exists at project root with Vercel-specific build settings.

**Location:** `/vercel.json`

**Current Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "lmp-site/.next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

**Impact:** ⚠️ **Medium** - This file will be ignored by other hosting platforms but won't cause errors.

**Recommendation:**
- Remove or archive `vercel.json` before deployment to alternative platform
- Document build settings for new hosting platform
- Ensure new platform uses correct build command: `cd lmp-site && npm run build`
- Ensure output directory is correctly configured: `lmp-site/.next`

**Action Required:** ✅ **Yes** - Remove or update configuration file

---

### 1.2 Missing Next.js Image Optimization

**Issue:** The site uses standard HTML `<img>` tags instead of Next.js `<Image>` component throughout the codebase.

**Impact:** 🔴 **High** - Missing automatic image optimization, lazy loading, and responsive image generation.

**Evidence:**
- All images use `<img>` tags (found 112+ instances)
- Next.js Image configuration exists in `next.config.ts` but is unused
- No imports of `next/image` found in components

**Files Affected:**
- `app/page.tsx` - Hero images, logos, profile images
- `components/ui/FeatureGrid.tsx` - Background images
- `components/ui/holidaytypegallery.tsx` - Gallery images
- `components/ui/BrandCard.tsx` - Brand card images
- `components/feature197.tsx` - Feature section images
- And many more...

**Current Image Configuration (Unused):**
```typescript
// next.config.ts
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**Recommendation:**
- **Option A (Recommended):** Migrate to Next.js `<Image>` component for automatic optimization
  - Better performance and SEO
  - Automatic WebP/AVIF conversion
  - Responsive image generation
  - Lazy loading built-in
  
- **Option B (Quick Fix):** Keep `<img>` tags but ensure:
  - Images are pre-optimized (WebP format)
  - CDN is configured for image delivery
  - Manual lazy loading is implemented
  - Proper `loading="lazy"` attributes added

**Action Required:** ✅ **Yes** - Consider migrating to Next.js Image component for better performance

---

### 1.3 External CDN Dependency

**Issue:** Hardcoded CloudFront CDN URL found in component.

**Location:** `components/hero4.tsx` (line 12) and `components/ui/gallery15.tsx`

**Current Code:**
```typescript
src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
```

**Impact:** 🟡 **Medium** - External dependency on third-party CDN that may not be reliable long-term.

**Recommendation:**
- Move assets to local `/public` directory or your own CDN
- Update all references to use relative paths or environment variables
- Ensure CDN is accessible from production environment

**Action Required:** ✅ **Yes** - Replace external CDN references with local assets or environment variables

---

## 2. Configuration Issues

### 2.1 Build Output Configuration

**Issue:** No explicit `output` configuration in `next.config.ts`.

**Current State:** Next.js defaults to server-side rendering mode.

**Impact:** 🟡 **Medium** - Depends on target hosting platform capabilities.

**Recommendation:**
- **For Static Hosting (Netlify, GitHub Pages, etc.):**
  ```typescript
  output: 'export',
  ```
  - Note: This disables server-side features (API routes, ISR, etc.)
  - All pages must be statically generatable
  
- **For Node.js Hosting (AWS, GCP, Azure, etc.):**
  ```typescript
  output: 'standalone', // Optional, for Docker deployments
  ```
  - Requires Node.js runtime
  - Supports SSR and API routes

**Action Required:** ✅ **Yes** - Add appropriate `output` configuration based on target platform

---

### 2.2 Environment Variables

**Issue:** Site uses `NEXT_PUBLIC_*` environment variables with fallback defaults.

**Location:** `lib/constants.ts`

**Current Configuration:**
```typescript
url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.notjusttravel.com",
agentName: process.env.NEXT_PUBLIC_AGENT_NAME || "Jane Smith",
phone: process.env.NEXT_PUBLIC_AGENT_PHONE || "07777 000 123",
// ... etc
```

**Impact:** 🟢 **Low** - Fallback values exist, but production should use environment variables.

**Recommendation:**
- Ensure all environment variables are set in production environment
- Document required environment variables:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_AGENT_NAME`
  - `NEXT_PUBLIC_AGENT_PHONE`
  - `NEXT_PUBLIC_AGENT_PHONE_FORMATTED`
  - `NEXT_PUBLIC_AGENT_EMAIL`
  - `NEXT_PUBLIC_AGENT_IMAGE`
  - `NEXT_PUBLIC_ABTA_NUMBER`

**Action Required:** ⚠️ **Documentation** - Ensure environment variables are configured on new platform

---

### 2.3 Video File Optimization

**Issue:** Large video files stored in `/public` directory.

**Files:**
- `/public/Sequence 02-converted.webm` (~2.7MB)
- `/public/Sequence 02-converted.mp4`
- `/public/Sequence 03-converted.webm`
- `/public/Sequence 03-converted.mp4`
- `/public/OneContact2.webm`
- `/public/OneContact2.mp4`
- `/public/hero-video-2.mp4`
- `/public/amalfi.mp4`

**Impact:** 🟡 **Medium** - Large files increase build size and deployment time.

**Current Headers Configuration:**
```typescript
// next.config.ts - Headers configured for caching
async headers() {
  return [
    {
      source: '/Sequence%2002-converted.webm',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        { key: 'Content-Type', value: 'video/webm' },
      ],
    },
    // ... more video files
  ];
}
```

**Recommendation:**
- **Option A:** Move videos to CDN (CloudFront, Cloudflare, etc.)
  - Reduces build artifact size
  - Better performance with CDN caching
  - Update video `src` attributes to CDN URLs
  
- **Option B:** Keep videos in `/public` but ensure:
  - CDN/edge caching is configured on hosting platform
  - Proper cache headers are set (already configured)
  - Consider video compression optimization

**Action Required:** ⚠️ **Consider** - Evaluate moving videos to CDN for better performance

---

## 3. Architecture Considerations

### 3.1 Rendering Strategy

**Current State:**
- Main page (`app/page.tsx`) uses `"use client"` directive
- Client-side rendering (CSR) throughout
- No server-side rendering (SSR) or static generation (SSG)

**Impact:** 🟢 **Low** - Compatible with most hosting platforms, but missing SEO benefits of SSR/SSG.

**Recommendation:**
- Current approach works for all hosting platforms
- Consider converting to Server Components where possible for better SEO
- Static generation (`generateStaticParams`) not applicable since it's a single-page site

**Action Required:** ⚠️ **Optional** - Consider Server Components for better SEO

---

### 3.2 API Routes

**Status:** ✅ **No API routes found** - Good for static hosting compatibility.

**Impact:** 🟢 **None** - Site is fully static, compatible with all hosting platforms.

---

### 3.3 Serverless Functions

**Status:** ✅ **No serverless functions found** - No Vercel-specific serverless code.

**Impact:** 🟢 **None** - No migration concerns.

---

### 3.4 Middleware

**Status:** ✅ **No middleware found** - No edge function dependencies.

**Impact:** 🟢 **None** - No migration concerns.

---

## 4. Dependencies & Build Process

### 4.1 Node.js Version

**Issue:** No `.nvmrc` or `engines` field in `package.json` specifying Node.js version.

**Current Dependencies:**
- Next.js 16.0.3
- React 19.2.0
- TypeScript 5.x

**Recommendation:**
- Add `engines` field to `package.json`:
  ```json
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
  ```
- Create `.nvmrc` file: `18` or `20` (LTS versions)

**Action Required:** ⚠️ **Recommended** - Specify Node.js version for consistent builds

---

### 4.2 Build Scripts

**Current Scripts:**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

**Status:** ✅ **Standard Next.js scripts** - Compatible with all platforms.

**Note:** Ensure build command runs from `lmp-site` directory:
```bash
cd lmp-site && npm run build
```

---

### 4.3 Font Loading

**Current Implementation:**
```typescript
// app/layout.tsx
import { Outfit } from "next/font/google";
```

**Status:** ✅ **Compatible** - `next/font/google` works on all platforms, fonts loaded from Google Fonts CDN.

**Impact:** 🟢 **None** - No changes needed.

---

## 5. Performance Considerations

### 5.1 Image Optimization Missing

**Issue:** As mentioned in section 1.2, images are not using Next.js optimization.

**Performance Impact:**
- No automatic WebP/AVIF conversion
- No responsive image generation
- No lazy loading (manual implementation may exist)
- Larger bundle sizes

**Recommendation:** Migrate to Next.js `<Image>` component.

---

### 5.2 Large Video Files

**Issue:** Multiple large video files in `/public` directory.

**Performance Impact:**
- Increased initial page load time
- Higher bandwidth costs
- Slower deployments

**Recommendation:** Move to CDN or implement progressive loading.

---

### 5.3 Client-Side Rendering

**Current State:** Entire site is client-side rendered.

**SEO Impact:**
- Initial HTML may be minimal
- Search engines may need JavaScript execution
- Slower First Contentful Paint (FCP)

**Recommendation:** Consider Server Components for critical content.

---

## 6. Hosting Platform-Specific Considerations

### 6.1 Static Hosting (Netlify, GitHub Pages, Cloudflare Pages)

**Requirements:**
- Add `output: 'export'` to `next.config.ts`
- Ensure all pages are statically generatable
- No API routes or server-side features

**Changes Needed:**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export', // Add this
  // ... rest of config
};
```

**Build Command:**
```bash
cd lmp-site && npm run build
```

**Deploy Directory:** `lmp-site/out` (after export)

---

### 6.2 Node.js Hosting (AWS, GCP, Azure, DigitalOcean)

**Requirements:**
- Node.js runtime (18.x or 20.x recommended)
- Process manager (PM2, systemd, etc.)
- Reverse proxy (Nginx, Apache) for production

**Changes Needed:**
- Optional: Add `output: 'standalone'` for Docker deployments
- Configure environment variables
- Set up process manager
- Configure reverse proxy

**Build Command:**
```bash
cd lmp-site && npm run build
```

**Start Command:**
```bash
cd lmp-site && npm run start
```

---

### 6.3 Docker Deployment

**Requirements:**
- Dockerfile creation
- Multi-stage build recommended

**Example Dockerfile:**
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY lmp-site/package*.json ./
RUN npm ci

FROM base AS builder
COPY lmp-site .
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

**Note:** Requires `output: 'standalone'` in `next.config.ts`.

---

## 7. Migration Checklist

### Pre-Migration

- [ ] Remove or archive `vercel.json`
- [ ] Document all environment variables
- [ ] Replace external CDN references (`deifkwefumgah.cloudfront.net`)
- [ ] Decide on image optimization strategy (Next.js Image vs. pre-optimized)
- [ ] Decide on video hosting (CDN vs. local)
- [ ] Add `output` configuration to `next.config.ts`
- [ ] Add Node.js version specification (`engines` field)
- [ ] Test build locally: `cd lmp-site && npm run build`

### Migration

- [ ] Set up new hosting platform
- [ ] Configure environment variables
- [ ] Configure build command: `cd lmp-site && npm run build`
- [ ] Configure start command (if Node.js hosting): `cd lmp-site && npm run start`
- [ ] Configure output directory (if static export): `lmp-site/out`
- [ ] Set up CDN (if using for images/videos)
- [ ] Configure custom domain
- [ ] Set up SSL certificate

### Post-Migration

- [ ] Test all pages and functionality
- [ ] Verify environment variables are loaded correctly
- [ ] Test image loading and optimization
- [ ] Test video playback
- [ ] Verify SEO metadata
- [ ] Test on multiple devices/browsers
- [ ] Monitor performance metrics
- [ ] Set up monitoring/error tracking (if not already configured)

---

## 8. Risk Assessment Summary

| Issue | Severity | Impact | Effort to Fix |
|-------|----------|--------|---------------|
| Vercel.json config | 🟡 Medium | Configuration only | Low (5 min) |
| Missing Image optimization | 🔴 High | Performance | Medium (2-4 hours) |
| External CDN dependency | 🟡 Medium | Reliability | Low (30 min) |
| No output config | 🟡 Medium | Build compatibility | Low (5 min) |
| Environment variables | 🟢 Low | Configuration | Low (15 min) |
| Large video files | 🟡 Medium | Performance | Medium (1-2 hours) |
| Client-side rendering | 🟢 Low | SEO (optional) | High (if changing) |

---

## 9. Recommendations Priority

### High Priority (Before Migration)

1. ✅ **Remove `vercel.json`** - Prevents confusion
2. ✅ **Add `output` configuration** - Required for static hosting
3. ✅ **Replace external CDN references** - Remove dependency
4. ✅ **Document environment variables** - Ensure proper configuration

### Medium Priority (Before/After Migration)

1. ⚠️ **Migrate to Next.js Image component** - Better performance
2. ⚠️ **Move videos to CDN** - Better performance and smaller builds
3. ⚠️ **Add Node.js version specification** - Consistent builds

### Low Priority (Optional Improvements)

1. 💡 **Consider Server Components** - Better SEO
2. 💡 **Implement image preloading** - Better perceived performance
3. 💡 **Add build optimization** - Faster deployments

---

## 10. Conclusion

The Next.js application is **mostly compatible** with alternative hosting platforms, but requires several configuration adjustments. The main concerns are:

1. **Vercel-specific configuration** - Easy to remove
2. **Missing image optimization** - Performance impact, but not blocking
3. **Build output configuration** - Required for static hosting platforms
4. **External dependencies** - Should be replaced with local assets

**Estimated Migration Effort:** 4-8 hours for complete migration with optimizations.

**Recommended Approach:**
1. Start with minimal changes (remove `vercel.json`, add `output` config)
2. Test build and deployment on new platform
3. Gradually implement optimizations (image component, CDN migration)

The site architecture is solid and compatible with most hosting platforms. The migration should be straightforward with proper planning and testing.

---

**Report Generated:** 24.11.2025  
**Next.js Version:** 16.0.3  
**React Version:** 19.2.0

