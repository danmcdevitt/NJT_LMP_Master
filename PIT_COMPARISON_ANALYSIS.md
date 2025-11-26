# Partners In Travel vs LMP Site: Image Strategy Comparison

**Analysis Date:** 24.11.2025  
**Purpose:** Compare Partners In Travel image handling with LMP site Next.js Image migration plan

---

## Executive Summary

Partners In Travel uses a **pre-optimized image strategy** with Google Cloud Storage, while the LMP site is planning **runtime image optimization** with Next.js Image component. Both approaches work on GCP, but have different trade-offs. This analysis recommends a **hybrid approach** that combines the best of both.

---

## 1. Partners In Travel Image Strategy

### Current Architecture

**Image Storage:**
- ✅ **Primary:** Google Cloud Storage (`storage.googleapis.com/njt-cms-media/`)
- ✅ **Format:** Pre-optimized WebP images
- ✅ **Organization:** Folder-based (`PIT Marketing/WebP/`, `PIT Landing/WebP/`)
- ✅ **Naming:** Descriptive with dimensions (e.g., `business 970x730.webp`)

**Image Delivery:**
- ✅ **CDN:** Google Cloud Storage (CDN-enabled)
- ✅ **Caching:** Appropriate cache headers
- ✅ **Format:** WebP (pre-converted)
- ✅ **Responsive:** Multiple sizes pre-generated (e.g., `970x730.webp`)

**Backend:**
- ✅ **API:** Google App Engine (`vision-pit-backend...appspot.com`)
- ✅ **Returns:** Image URLs in JSON response
- ✅ **Pattern:** `primary_image_server_url` and `secondary_image_server_url`

**Key Characteristics:**
- ✅ **Pre-optimized:** Images optimized before deployment
- ✅ **Static URLs:** Direct GCS URLs in API responses
- ✅ **No Runtime Processing:** Images served as-is
- ✅ **Multiple Formats:** WebP, SVG, PNG organized by type

---

## 2. LMP Site Current & Planned Strategy

### Current State

**Image Storage:**
- ⚠️ **Location:** `/public/images/` folder
- ⚠️ **Format:** Mix of WebP, PNG, JPG
- ⚠️ **Delivery:** Served directly from Next.js app
- ⚠️ **Optimization:** None (standard `<img>` tags)

### Planned Strategy (Next.js Image)

**Image Storage:**
- ✅ **Location:** `/public/images/` folder (same)
- ✅ **Format:** Original formats (Next.js converts on-demand)
- ✅ **Delivery:** Next.js Image Optimization API
- ✅ **Optimization:** Runtime (WebP/AVIF conversion, responsive sizing)

**Key Characteristics:**
- ✅ **Runtime Optimization:** Images optimized on-demand
- ✅ **Automatic Formats:** WebP/AVIF conversion
- ✅ **Responsive:** Multiple sizes generated automatically
- ✅ **Lazy Loading:** Built-in

---

## 3. Comparison Matrix

| Aspect | Partners In Travel | LMP Site (Planned) | Winner |
|--------|-------------------|-------------------|--------|
| **Image Optimization** | Pre-optimized (manual) | Runtime (automatic) | 🟢 LMP (automatic) |
| **Format Conversion** | Manual WebP conversion | Automatic WebP/AVIF | 🟢 LMP (automatic) |
| **Responsive Images** | Pre-generated sizes | Auto-generated | 🟢 LMP (automatic) |
| **Build Time** | Fast (no processing) | Slower (processes images) | 🟢 PIT (faster builds) |
| **Runtime Performance** | Fast (pre-optimized) | Fast (optimized on-demand) | 🟡 Tie |
| **Storage Efficiency** | Multiple files per image | Single source file | 🟢 LMP (less storage) |
| **CDN Integration** | Direct GCS URLs | Next.js API + CDN | 🟢 PIT (simpler) |
| **Maintenance** | Manual optimization | Automatic | 🟢 LMP (less work) |
| **Cost** | GCS storage + bandwidth | Cloud Run + bandwidth | 🟡 Similar |
| **Scalability** | Excellent (GCS CDN) | Good (Next.js API) | 🟢 PIT (better CDN) |

---

## 4. Key Differences

### Partners In Travel Approach

**Pros:**
- ✅ **Faster Builds:** No image processing during build
- ✅ **Better CDN:** Direct GCS URLs with global CDN
- ✅ **Predictable:** Pre-optimized images, no runtime surprises
- ✅ **Scalable:** GCS handles all image delivery
- ✅ **Cost-Effective:** GCS storage is cheap, bandwidth is reasonable

**Cons:**
- ❌ **Manual Work:** Must optimize images before upload
- ❌ **Storage:** Multiple sizes stored (more storage used)
- ❌ **Maintenance:** Need to regenerate if source changes
- ❌ **No AVIF:** Only WebP (missing latest format)

### LMP Site Approach (Next.js Image)

**Pros:**
- ✅ **Automatic:** No manual optimization needed
- ✅ **Latest Formats:** AVIF support (better compression)
- ✅ **Single Source:** One image file, multiple sizes generated
- ✅ **Less Storage:** Only store original images
- ✅ **Developer Experience:** Easier to work with

**Cons:**
- ⚠️ **Build Time:** Longer builds (image processing)
- ⚠️ **Runtime Dependency:** Requires Next.js server/API
- ⚠️ **CDN Complexity:** Need to configure CDN for optimized images
- ⚠️ **Cache Management:** Optimized images cached in container/filesystem

---

## 5. GCP Compatibility Analysis

### Partners In Travel Setup

**Hosting:** Google Cloud Platform (Static)
- ✅ **Frontend:** Static React build (served from GCP)
- ✅ **Backend:** Google App Engine (API)
- ✅ **Images:** Google Cloud Storage (CDN)
- ✅ **Architecture:** Decoupled (frontend, API, storage separate)

**Why It Works:**
- Static frontend can be hosted anywhere
- Images served directly from GCS (no server needed)
- API handles content, not images
- Simple, scalable architecture

### LMP Site on GCP

**Hosting Options:**

**Option A: Cloud Run (Next.js Image)**
- ✅ **Frontend:** Next.js on Cloud Run
- ✅ **Images:** Next.js Image Optimization API
- ✅ **Storage:** `/public` folder or GCS
- ⚠️ **Requirement:** Next.js server must run

**Option B: Static + GCS (PIT Pattern)**
- ✅ **Frontend:** Static export (`output: 'export'`)
- ✅ **Images:** Pre-optimized in GCS
- ✅ **Storage:** Google Cloud Storage
- ✅ **CDN:** GCS CDN
- ⚠️ **Requirement:** Manual image optimization

---

## 6. Recommended Hybrid Approach

### Best of Both Worlds

**Strategy:** Use Next.js Image component with Google Cloud Storage as image source

**Architecture:**
```
┌─────────────────────────────────────┐
│   Cloud Run (Next.js App)          │
│   ┌───────────────────────────────┐ │
│   │   Next.js Image Optimization   │ │
│   │   - Optimizes on-demand        │ │
│   │   - Caches optimized images    │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
              │
              │ Reads from
              ▼
┌─────────────────────────────────────┐
│   Google Cloud Storage              │
│   ┌───────────────────────────────┐ │
│   │   Original Images              │ │
│   │   - /images/logos/             │ │
│   │   - /images/gallery/           │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
              │
              │ Serves optimized
              ▼
┌─────────────────────────────────────┐
│   Cloud CDN (via Cloud Run)         │
│   ┌───────────────────────────────┐ │
│   │   Optimized Images             │ │
│   │   - WebP/AVIF                  │ │
│   │   - Responsive sizes           │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Implementation Steps

**Step 1: Store Images in Google Cloud Storage**

```bash
# Create GCS bucket
gsutil mb -p YOUR_PROJECT -l us-central1 gs://lmp-site-images

# Upload images
gsutil -m cp -r lmp-site/public/images/* gs://lmp-site-images/images/
```

**Step 2: Configure Next.js to Use GCS Images**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optional: Use GCS as remote pattern
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/lmp-site-images/**',
      },
    ],
  },
};
```

**Step 3: Use Images from GCS**

```tsx
// Option A: Use GCS URLs directly
<Image
  src="https://storage.googleapis.com/lmp-site-images/images/logos/njt-logo.webp"
  alt="Not Just Travel"
  width={200}
  height={56}
/>

// Option B: Use environment variable for base URL
const GCS_BASE_URL = process.env.NEXT_PUBLIC_GCS_BASE_URL || 'https://storage.googleapis.com/lmp-site-images';

<Image
  src={`${GCS_BASE_URL}/images/logos/njt-logo.webp`}
  alt="Not Just Travel"
  width={200}
  height={56}
/>
```

**Step 4: Configure Cloud Run with GCS Access**

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY lmp-site/package*.json ./
RUN npm ci

FROM base AS builder
COPY lmp-site .
# Set GCS bucket URL
ENV NEXT_PUBLIC_GCS_BASE_URL=https://storage.googleapis.com/lmp-site-images
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
ENV NEXT_PUBLIC_GCS_BASE_URL=https://storage.googleapis.com/lmp-site-images
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Don't copy images (they're in GCS)
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 7. Alternative: Pure PIT Pattern (Pre-Optimized)

### If You Want to Match Partners In Travel Exactly

**Strategy:** Pre-optimize images, store in GCS, use static URLs

**Steps:**

1. **Pre-optimize Images:**
```bash
# Use Sharp or ImageOptim to convert to WebP
# Generate multiple sizes: 640w, 1080w, 1920w
# Store in GCS with naming: image-640w.webp, image-1080w.webp, etc.
```

2. **Use Standard `<img>` Tags:**
```tsx
// Use srcset for responsive images
<img
  srcSet="
    https://storage.googleapis.com/lmp-site-images/images/hero-640w.webp 640w,
    https://storage.googleapis.com/lmp-site-images/images/hero-1080w.webp 1080w,
    https://storage.googleapis.com/lmp-site-images/images/hero-1920w.webp 1920w
  "
  src="https://storage.googleapis.com/lmp-site-images/images/hero-1920w.webp"
  alt="Hero image"
  loading="lazy"
/>
```

3. **Benefits:**
- ✅ Faster builds (no image processing)
- ✅ Direct GCS CDN (best performance)
- ✅ Works with static export
- ✅ Matches PIT architecture

4. **Drawbacks:**
- ❌ Manual optimization work
- ❌ More storage (multiple sizes)
- ❌ No AVIF format
- ❌ More maintenance

---

## 8. Recommendation Matrix

### Choose Next.js Image If:
- ✅ You want automatic optimization
- ✅ You're using Cloud Run (server available)
- ✅ You want AVIF support
- ✅ You prefer less manual work
- ✅ You want single source images

### Choose PIT Pattern (Pre-Optimized) If:
- ✅ You want fastest builds
- ✅ You're using static export
- ✅ You want direct GCS CDN
- ✅ You have image optimization pipeline
- ✅ You want to match PIT architecture exactly

### Choose Hybrid Approach If:
- ✅ You want Next.js Image benefits
- ✅ You want GCS storage benefits
- ✅ You're using Cloud Run
- ✅ You want flexibility
- ✅ You want best of both worlds

---

## 9. Cost Comparison

### Partners In Travel Pattern

**Costs:**
- **GCS Storage:** ~$0.020/GB/month
- **GCS Bandwidth:** ~$0.12/GB (first 10TB)
- **Example:** 10GB images, 100GB/month bandwidth = ~$12/month

### Next.js Image Pattern (Cloud Run)

**Costs:**
- **Cloud Run:** ~$0.40 per million requests
- **Compute Time:** ~$0.00002400 per vCPU-second
- **Bandwidth:** Included (outbound)
- **Example:** 1M requests/month = ~$0.40 + compute time (~$5-10/month)

### Hybrid Approach

**Costs:**
- **GCS Storage:** ~$0.020/GB/month (original images)
- **Cloud Run:** ~$0.40 per million requests (optimization API)
- **Bandwidth:** GCS bandwidth for originals, Cloud Run for optimized
- **Example:** Similar to Next.js Image pattern

**Verdict:** Costs are similar (~$10-15/month for typical traffic)

---

## 10. Performance Comparison

### Partners In Travel Pattern

**Performance:**
- ✅ **CDN:** Direct GCS CDN (fastest)
- ✅ **Cache:** GCS cache headers
- ✅ **Latency:** Low (direct CDN)
- ✅ **Throughput:** High (GCS scales well)

### Next.js Image Pattern

**Performance:**
- ✅ **Optimization:** On-demand (first request slower)
- ✅ **Cache:** Next.js caches optimized images
- ✅ **Latency:** Slightly higher (optimization step)
- ✅ **Throughput:** Good (Cloud Run scales)

### Hybrid Approach

**Performance:**
- ✅ **CDN:** Cloud Run + Cloud CDN (good)
- ✅ **Cache:** Next.js + CDN caching
- ✅ **Latency:** Similar to Next.js Image
- ✅ **Throughput:** Good (Cloud Run scales)

**Verdict:** PIT pattern has slight edge for pure performance, but difference is minimal

---

## 11. Migration Path Recommendations

### Option A: Start with Next.js Image (Recommended)

**Why:**
- ✅ Easier to implement
- ✅ Automatic optimization
- ✅ Can migrate to GCS later if needed
- ✅ Works with current setup

**Steps:**
1. Migrate to Next.js `<Image>` component
2. Deploy to Cloud Run
3. Monitor performance
4. Consider GCS migration later if needed

### Option B: Start with Hybrid Approach

**Why:**
- ✅ Best of both worlds
- ✅ Matches PIT architecture
- ✅ Scalable storage
- ✅ Future-proof

**Steps:**
1. Set up GCS bucket
2. Upload images to GCS
3. Configure Next.js Image with GCS URLs
4. Deploy to Cloud Run
5. Monitor performance

### Option C: Match PIT Pattern Exactly

**Why:**
- ✅ Proven architecture
- ✅ Fastest builds
- ✅ Direct CDN
- ✅ Matches existing infrastructure

**Steps:**
1. Pre-optimize all images
2. Upload to GCS
3. Use `<img>` tags with `srcset`
4. Deploy static export
5. Serve from GCS CDN

---

## 12. Final Recommendation

### ✅ **Recommended: Hybrid Approach**

**Why:**
1. ✅ **Leverages Next.js Image Benefits:**
   - Automatic optimization
   - AVIF support
   - Responsive images
   - Lazy loading

2. ✅ **Leverages GCS Benefits:**
   - Scalable storage
   - CDN integration
   - Cost-effective
   - Matches PIT pattern

3. ✅ **Best of Both Worlds:**
   - Automatic optimization (like Next.js Image)
   - Scalable storage (like PIT)
   - Flexible architecture
   - Future-proof

**Implementation:**
- Store original images in GCS
- Use Next.js Image component
- Configure Cloud Run to read from GCS
- Let Next.js optimize on-demand
- Cache optimized images

**Migration Path:**
1. Start with Next.js Image (local `/public` folder)
2. Migrate images to GCS gradually
3. Update image URLs to GCS
4. Monitor and optimize

---

## 13. Action Items

### Immediate (Next.js Image Migration)
- [ ] Migrate to Next.js `<Image>` component
- [ ] Deploy to Cloud Run
- [ ] Test image optimization
- [ ] Monitor performance

### Short-term (GCS Integration)
- [ ] Set up GCS bucket for images
- [ ] Upload images to GCS
- [ ] Configure Next.js to use GCS URLs
- [ ] Update image references

### Long-term (Optimization)
- [ ] Monitor costs and performance
- [ ] Consider Cloud CDN for optimized images
- [ ] Optimize image sizes and formats
- [ ] Consider pre-optimization for critical images

---

## Conclusion

**Partners In Travel** uses a proven, scalable architecture with pre-optimized images in GCS. The **LMP site** can benefit from Next.js Image's automatic optimization while still leveraging GCS for storage. The **hybrid approach** combines the best of both:

- ✅ Automatic optimization (Next.js Image)
- ✅ Scalable storage (GCS)
- ✅ CDN delivery (Cloud Run + GCS)
- ✅ Cost-effective
- ✅ Future-proof

**Recommendation:** Start with Next.js Image on Cloud Run, then migrate images to GCS for better scalability and to match the PIT architecture pattern.

---

**Report Generated:** 24.11.2025  
**Comparison:** Partners In Travel vs LMP Site Image Strategies

