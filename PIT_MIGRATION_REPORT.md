# Migration Report: LMP Site to Partners In Travel Architecture

**Project:** LMP Site (Next.js) → Partners In Travel Pattern  
**Target Architecture:** Pre-optimized images in Google Cloud Storage + Static/Serverless Frontend  
**Report Date:** 24.11.2025 
**Status:** Planning Phase

---

## Executive Summary

This report outlines the migration plan to transform the LMP site from its current Next.js setup to match the Partners In Travel (PIT) architecture pattern. The PIT architecture uses pre-optimized images stored in Google Cloud Storage, served directly via CDN, with a decoupled frontend and backend API structure.

**Migration Scope:**
- Image storage and optimization strategy
- Frontend deployment architecture
- Asset delivery and CDN configuration
- Build and deployment processes

**Risk Level:** 🟡 Medium  
**Complexity:** Medium-High

---

## Migration Phases Overview

The migration is organized into four main phases:

**Phase 1: Image Optimization & Storage Setup**
- Set up Google Cloud Storage buckets
- Optimize all images to WebP format
- Upload optimized images to GCS
- Configure permissions and cache headers

**Phase 2: Frontend Architecture Changes**
- Update Next.js configuration for static export
- Create GCS URL helper functions
- Update all image references to use GCS URLs
- Implement responsive images (optional)

**Phase 3: Build & Deployment Setup**
- Update build process and scripts
- Configure GCP deployment (Cloud Storage/Cloud Run)
- Set up Cloud CDN (optional)
- Configure CI/CD pipeline

**Phase 4: Optional Backend API Setup**
- Design API structure (if needed)
- Deploy backend API to App Engine (if needed)
- Integrate API with frontend (if needed)

---

## 1. Current State Analysis

### 1.1 LMP Site Current Architecture

**Frontend:**
- Next.js 16.0.3 with App Router
- Client-side rendering (`"use client"`)
- Images in `/public/images/` folder
- Standard `<img>` tags (no optimization)
- Hosted on Vercel (migrating to GCP)

**Image Strategy:**
- Local storage: `/public/images/` directory
- Formats: Mix of WebP, PNG, JPG
- Optimization: None (served as-is)
- Delivery: Served from Next.js app
- Count: 112+ image instances

**Backend:**
- No backend API currently
- Static site with client-side rendering
- Environment variables for configuration

**Deployment:**
- Current: Vercel
- Target: Google Cloud Platform

---

### 1.2 Partners In Travel Architecture (Target)

**Frontend:**
- React SPA (Create React App)
- Static build deployed to GCP
- Images referenced via URLs (not bundled)
- Material-UI components

**Image Strategy:**
- Storage: Google Cloud Storage (`storage.googleapis.com/njt-cms-media/`)
- Formats: Pre-optimized WebP, SVG, PNG
- Organization: Folder-based (`PIT Marketing/WebP/`, `PIT Landing/WebP/`)
- Naming: Descriptive with dimensions (e.g., `business 970x730.webp`)
- Delivery: Direct GCS URLs via CDN
- Optimization: Pre-optimized before upload

**Backend:**
- Google App Engine API
- Endpoint: `/marketing_media/team`
- Returns JSON with image URLs
- Pattern: `primary_image_server_url`, `secondary_image_server_url`

**Deployment:**
- Frontend: Static build on GCP
- Backend: Google App Engine
- Images: Google Cloud Storage (CDN-enabled)

---

## 2. Architecture Comparison

### 2.1 Key Differences

| Aspect | Current (LMP) | Target (PIT Pattern) | Impact |
|--------|---------------|---------------------|--------|
| **Image Storage** | `/public/images/` | Google Cloud Storage | 🔴 High - Major change |
| **Image Optimization** | None | Pre-optimized WebP | 🟡 Medium - New process |
| **Image Delivery** | Next.js app | Direct GCS CDN | 🟡 Medium - URL changes |
| **Frontend Framework** | Next.js | React SPA (or Next.js static) | 🟢 Low - Can keep Next.js |
| **Build Process** | Next.js build | Static export or React build | 🟡 Medium - Build changes |
| **Backend API** | None | App Engine API (optional) | 🟢 Low - Optional |
| **CDN** | Vercel CDN | GCS CDN | 🟡 Medium - Configuration |

---

## 3. Migration Strategy

### 3.1 Approach Options

#### Option A: Full PIT Pattern Match (Recommended)

**Strategy:** Match PIT architecture exactly
- Pre-optimize all images to WebP
- Upload to Google Cloud Storage
- Use static export or React SPA
- Serve images via direct GCS URLs
- Optional: Add App Engine API for dynamic content

**Pros:**
- ✅ Matches proven PIT architecture
- ✅ Best CDN performance (direct GCS)
- ✅ Scalable image storage
- ✅ Decoupled architecture
- ✅ Fast builds (no image processing)

**Cons:**
- ⚠️ Requires image optimization pipeline
- ⚠️ More storage (multiple sizes if needed)
- ⚠️ Manual optimization work
- ⚠️ No AVIF format (WebP only)

#### Option B: Hybrid Approach

**Strategy:** Keep Next.js but use GCS for images
- Store images in Google Cloud Storage
- Use Next.js static export (`output: 'export'`)
- Reference GCS URLs in components
- Keep Next.js benefits (routing, components)

**Pros:**
- ✅ Keep Next.js framework
- ✅ GCS image storage
- ✅ Static export (fast builds)
- ✅ Direct GCS CDN

**Cons:**
- ⚠️ Still need pre-optimization
- ⚠️ No Next.js Image optimization
- ⚠️ Manual image management

#### Option C: Minimal Change

**Strategy:** Keep current setup, just move images to GCS
- Upload images to GCS
- Update image URLs to GCS
- Keep Next.js Image component (if using Cloud Run)
- Minimal architecture changes

**Pros:**
- ✅ Minimal changes
- ✅ Keep Next.js Image benefits
- ✅ GCS storage

**Cons:**
- ⚠️ Doesn't match PIT pattern exactly
- ⚠️ Still requires Next.js server (if using Image)

**Recommendation:** **Option A - Full PIT Pattern Match**

---

## 4. Detailed Migration Plan

### Phase 1: Image Optimization & Storage Setup

#### Step 1.1: Set Up Google Cloud Storage

**Tasks:**
1. Create GCS bucket for images
   - Bucket name: `lmp-site-images` (or similar)
   - Location: `us-central1` (or preferred region)
   - Storage class: `STANDARD`
   - Public access: Configured for web serving

2. Configure bucket permissions
   - Set bucket to public read access
   - Configure CORS for web access
   - Set up lifecycle policies (if needed)

3. Organize bucket structure
   ```
   lmp-site-images/
   ├── images/
   │   ├── logos/
   │   │   ├── WebP/          # Optimized WebP logos
   │   │   └── PNG/           # Original PNG logos
   │   ├── gallery/
   │   │   └── WebP/          # Gallery images
   │   ├── hero/
   │   │   └── WebP/          # Hero images
   │   └── features/
   │       └── WebP/          # Feature images
   ├── SVG/                   # SVG icons and graphics
   └── PNG/                   # Special PNG images
   ```

**Deliverables:**
- ✅ GCS bucket created and configured
- ✅ Folder structure established
- ✅ Public access configured
- ✅ CORS configured

---

#### Step 1.2: Image Optimization Pipeline

**Tasks:**
1. Audit current images
   - List all images in `/public/images/`
   - Document formats, sizes, usage
   - Identify optimization opportunities

2. Set up optimization tools
   - Install Sharp CLI or ImageOptim
   - Create optimization script
   - Configure WebP conversion settings

3. Optimize images
   - Convert to WebP format
   - Generate multiple sizes if needed (640w, 1080w, 1920w)
   - Maintain aspect ratios
   - Preserve quality (80-85% recommended)

4. Apply naming convention
   - Follow PIT pattern: `descriptive-name-dimensions.webp`
   - Examples:
     - `njt-logo-200x56.webp`
     - `hero-image-1920x1080.webp`
     - `gallery-corfu-1080x720.webp`

**Optimization Script Example:**
```bash
#!/bin/bash
# optimize-images.sh

INPUT_DIR="./lmp-site/public/images"
OUTPUT_DIR="./optimized-images"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Convert all images to WebP
find "$INPUT_DIR" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) | while read img; do
    filename=$(basename "$img" | sed 's/\.[^.]*$//')
    dir=$(dirname "$img" | sed "s|$INPUT_DIR||")
    mkdir -p "$OUTPUT_DIR$dir"
    
    # Convert to WebP with 85% quality
    cwebp -q 85 "$img" -o "$OUTPUT_DIR$dir/$filename.webp"
done

# Copy existing WebP files
find "$INPUT_DIR" -type f -name "*.webp" -exec cp {} "$OUTPUT_DIR" \;
```

**Deliverables:**
- ✅ All images optimized to WebP
- ✅ Naming convention applied
- ✅ Optimization script created
- ✅ Image inventory documented

---

#### Step 1.3: Upload Images to Google Cloud Storage

**Tasks:**
1. Upload optimized images to GCS
   ```bash
   gsutil -m cp -r optimized-images/* gs://lmp-site-images/images/
   ```

2. Set public read permissions
   ```bash
   gsutil -m acl ch -u AllUsers:R gs://lmp-site-images/images/**
   ```

3. Configure cache headers
   ```bash
   gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, immutable" \
     gs://lmp-site-images/images/**
   ```

4. Verify uploads
   - Check file counts match
   - Verify public URLs work
   - Test image loading

**Deliverables:**
- ✅ All images uploaded to GCS
- ✅ Public URLs accessible
- ✅ Cache headers configured
- ✅ Verification complete

---

### Phase 2: Frontend Architecture Changes

#### Step 2.1: Decide on Frontend Approach

**Option A: Static Export (Next.js)**
- Use `output: 'export'` in `next.config.ts`
- Generates static HTML/CSS/JS
- No server-side features
- Images reference GCS URLs

**Option B: React SPA (Match PIT Exactly)**
- Convert to Create React App or Vite
- Static build output
- Images reference GCS URLs
- More work but matches PIT exactly

**Recommendation:** **Option A - Next.js Static Export** (less work, keeps framework)

---

#### Step 2.2: Update Next.js Configuration

**Tasks:**
1. Update `next.config.ts`
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export', // Enable static export
     images: {
       unoptimized: true, // Required for static export
       // Remove image optimization config
     },
     // Keep other configs
   };
   ```

2. Remove Next.js Image optimization config
   - Static export doesn't support image optimization
   - Images will be served as-is from GCS

3. Update build scripts if needed
   - Ensure build generates static output
   - Verify `out` directory is created

**Deliverables:**
- ✅ `next.config.ts` updated for static export
- ✅ Build tested locally
- ✅ Static output verified

---

#### Step 2.3: Update Image References

**Tasks:**
1. Create GCS URL helper
   ```typescript
   // lib/gcs-images.ts
   const GCS_BASE_URL = process.env.NEXT_PUBLIC_GCS_BASE_URL || 
     'https://storage.googleapis.com/lmp-site-images';
   
   export function getGCSImageUrl(path: string): string {
     return `${GCS_BASE_URL}/images/${path}`;
   }
   ```

2. Update all image references
   - Replace `/images/` paths with GCS URLs
   - Update all `<img>` tags
   - Update CSS `background-image` URLs
   - Update component props

3. Update components systematically
   - Start with most-used components
   - Test each component after update
   - Verify images load correctly

**Example Migration:**
```tsx
// Before
<img src="/images/logos/njt-logo.webp" alt="Logo" />

// After
<img 
  src="https://storage.googleapis.com/lmp-site-images/images/logos/njt-logo.webp" 
  alt="Logo" 
/>
// Or using helper
<img src={getGCSImageUrl('logos/njt-logo.webp')} alt="Logo" />
```

**Files to Update:**
- `app/page.tsx` - Hero images, logos
- `components/ui/FeatureGrid.tsx` - Background images
- `components/ui/holidaytypegallery.tsx` - Gallery images
- `components/ui/BrandCard.tsx` - Brand images
- `components/feature197.tsx` - Feature images
- All other components with images

**Deliverables:**
- ✅ GCS URL helper created
- ✅ All image references updated
- ✅ Components tested
- ✅ Images loading correctly

---

#### Step 2.4: Implement Responsive Images (Optional)

**Tasks:**
1. Generate multiple image sizes (if not done in Phase 1)
   - 640w, 1080w, 1920w versions
   - Upload all sizes to GCS

2. Update components to use `srcset`
   ```tsx
   <img
     srcSet="
       https://storage.googleapis.com/lmp-site-images/images/hero-640w.webp 640w,
       https://storage.googleapis.com/lmp-site-images/images/hero-1080w.webp 1080w,
       https://storage.googleapis.com/lmp-site-images/images/hero-1920w.webp 1920w
     "
     src="https://storage.googleapis.com/lmp-site-images/images/hero-1920w.webp"
     alt="Hero image"
     sizes="100vw"
   />
   ```

3. Test responsive behavior
   - Verify correct sizes load
   - Test on multiple devices
   - Check network requests

**Deliverables:**
- ✅ Multiple image sizes generated
- ✅ `srcset` implemented
- ✅ Responsive behavior verified

---

### Phase 3: Build & Deployment Setup

#### Step 3.1: Update Build Process

**Tasks:**
1. Update build scripts
   ```json
   {
     "scripts": {
       "build": "next build",
       "export": "next build && next export", // If using export command
       "optimize-images": "node scripts/optimize-images.js",
       "upload-images": "gsutil -m cp -r optimized-images/* gs://lmp-site-images/images/"
     }
   }
   ```

2. Create build pipeline
   - Image optimization step (if automated)
   - Build step
   - Upload step (if needed)
   - Deployment step

3. Test build locally
   - Run full build process
   - Verify static output
   - Check image URLs
   - Test locally

**Deliverables:**
- ✅ Build scripts updated
- ✅ Build pipeline documented
- ✅ Local build tested

---

#### Step 3.2: Set Up GCP Deployment

**Tasks:**
1. Choose deployment method
   - **Option A:** Cloud Storage + Cloud CDN (static hosting)
   - **Option B:** Cloud Run (static files)
   - **Option C:** App Engine (static files)

2. Configure Cloud Storage for static hosting (Option A)
   ```bash
   # Create bucket for static site
   gsutil mb -p PROJECT_ID -l us-central1 gs://lmp-site-static
   
   # Upload static files
   gsutil -m cp -r lmp-site/out/* gs://lmp-site-static/
   
   # Set bucket for web hosting
   gsutil web set -m index.html -e 404.html gs://lmp-site-static
   
   # Make bucket public
   gsutil iam ch allUsers:objectViewer gs://lmp-site-static
   ```

3. Configure Cloud CDN (optional)
   - Create Cloud CDN backend bucket
   - Configure cache policies
   - Set up custom domain

4. Set up custom domain
   - Configure DNS records
   - Set up SSL certificate
   - Verify domain access

**Deliverables:**
- ✅ Deployment method chosen
- ✅ GCP resources configured
- ✅ Static site deployed
- ✅ Custom domain configured

---

#### Step 3.3: Set Up CI/CD Pipeline

**Tasks:**
1. Create Cloud Build configuration
   ```yaml
   # cloudbuild.yaml
   steps:
     - name: 'gcr.io/cloud-builders/npm'
       args: ['install']
       dir: 'lmp-site'
     
     - name: 'gcr.io/cloud-builders/npm'
       args: ['run', 'build']
       dir: 'lmp-site'
     
     - name: 'gcr.io/cloud-builders/gsutil'
       args: ['-m', 'cp', '-r', 'lmp-site/out/*', 'gs://lmp-site-static/']
   
   options:
     machineType: 'N1_HIGHCPU_8'
   ```

2. Configure Cloud Build triggers
   - Set up GitHub/GitLab trigger
   - Configure build on push
   - Set up branch protection

3. Test CI/CD pipeline
   - Push test commit
   - Verify build runs
   - Check deployment

**Deliverables:**
- ✅ CI/CD pipeline configured
- ✅ Build triggers set up
- ✅ Pipeline tested

---

### Phase 4: Optional Backend API Setup

#### Step 4.1: Design API Structure (If Needed)

**Tasks:**
1. Determine if API is needed
   - Current site: No backend API
   - PIT pattern: Has App Engine API
   - Decision: Optional for LMP site

2. If API needed, design structure
   - Endpoints needed
   - Data structure
   - Image URL patterns

3. Create API specification
   - Endpoint definitions
   - Request/response formats
   - Image URL structure

**Note:** This phase is optional. LMP site may not need a backend API if content is static.

**Deliverables:**
- ✅ API requirements defined (if needed)
- ✅ API specification created (if needed)

---

#### Step 4.2: Deploy Backend API (If Needed)

**Tasks:**
1. Create App Engine application
   - Set up App Engine project
   - Configure runtime (Python, Node.js, etc.)
   - Create API endpoints

2. Deploy API
   - Deploy to App Engine
   - Configure environment variables
   - Test endpoints

3. Integrate with frontend
   - Update frontend to call API
   - Handle API responses
   - Error handling

**Deliverables:**
- ✅ API deployed (if needed)
- ✅ Frontend integrated (if needed)

---

## 5. Migration Checklist

### Pre-Migration
- [ ] Review current image inventory
- [ ] Set up Google Cloud project
- [ ] Create GCS buckets (images + static site)
- [ ] Set up image optimization tools
- [ ] Create optimization scripts
- [ ] Document current architecture

### Phase 1: Image Optimization
- [ ] Audit all images
- [ ] Optimize images to WebP
- [ ] Apply naming convention
- [ ] Upload to GCS
- [ ] Configure GCS permissions
- [ ] Set cache headers
- [ ] Verify image URLs

### Phase 2: Frontend Changes
- [ ] Update `next.config.ts` for static export
- [ ] Create GCS URL helper
- [ ] Update image references in components
- [ ] Update CSS background images
- [ ] Test image loading
- [ ] Implement responsive images (optional)
- [ ] Remove unused image files

### Phase 3: Build & Deployment
- [ ] Update build scripts
- [ ] Test build locally
- [ ] Set up GCP deployment
- [ ] Configure Cloud Storage/Cloud Run
- [ ] Set up Cloud CDN
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Configure CI/CD pipeline
- [ ] Test deployment

### Phase 4: Backend API (Optional)
- [ ] Design API structure
- [ ] Create API endpoints
- [ ] Deploy to App Engine
- [ ] Integrate with frontend
- [ ] Test API functionality

### Post-Migration
- [ ] Test all pages and functionality
- [ ] Verify all images load correctly
- [ ] Test on multiple devices/browsers
- [ ] Check performance metrics
- [ ] Verify CDN caching
- [ ] Monitor error logs
- [ ] Update documentation
- [ ] Train team on new process

---

## 6. Risk Assessment

### High Risk Items

**1. Image Optimization Quality**
- **Risk:** Poor optimization may reduce image quality
- **Mitigation:** Test optimization settings, maintain originals
- **Impact:** 🟡 Medium

**2. URL Migration**
- **Risk:** Missing image references, broken images
- **Mitigation:** Systematic update process, thorough testing
- **Impact:** 🔴 High

**3. Build Process Changes**
- **Risk:** Build failures, deployment issues
- **Mitigation:** Test builds thoroughly, have rollback plan
- **Impact:** 🟡 Medium

### Medium Risk Items

**1. CDN Configuration**
- **Risk:** Incorrect cache headers, slow image loading
- **Mitigation:** Test CDN behavior, monitor performance
- **Impact:** 🟡 Medium

**2. Static Export Limitations**
- **Risk:** Loss of Next.js features (API routes, ISR)
- **Mitigation:** Review feature usage, plan alternatives
- **Impact:** 🟡 Medium

**3. Image Storage Costs**
- **Risk:** Higher GCS storage costs than expected
- **Mitigation:** Monitor usage, optimize storage class
- **Impact:** 🟢 Low

### Low Risk Items

**1. Domain Configuration**
- **Risk:** DNS issues, SSL certificate problems
- **Mitigation:** Follow GCP documentation, test thoroughly
- **Impact:** 🟢 Low

**2. CI/CD Pipeline**
- **Risk:** Build pipeline failures
- **Mitigation:** Test pipeline, have manual deployment option
- **Impact:** 🟢 Low

---

## 7. Rollback Plan

### Rollback Strategy

**If Issues Occur:**

1. **Immediate Rollback (Images)**
   - Revert image URLs to local paths
   - Keep images in `/public` folder
   - Deploy previous version
   - **Time:** < 30 minutes

2. **Partial Rollback (Frontend)**
   - Revert `next.config.ts` changes
   - Remove static export
   - Deploy previous build
   - **Time:** < 1 hour

3. **Full Rollback**
   - Revert all code changes
   - Deploy previous version
   - Restore previous infrastructure
   - **Time:** 2-4 hours

**Rollback Triggers:**
- Critical image loading failures
- Significant performance degradation
- Build/deployment failures
- User-reported issues

---

## 8. Success Criteria

### Technical Success Metrics

- ✅ All images load correctly from GCS
- ✅ Image load times < 2 seconds (p95)
- ✅ Build time < 5 minutes
- ✅ Zero broken image references
- ✅ CDN hit rate > 90%
- ✅ Page load performance maintained or improved

### Business Success Metrics

- ✅ No increase in bounce rate
- ✅ Page views maintained
- ✅ User engagement maintained
- ✅ SEO rankings maintained or improved
- ✅ Cost within budget

### Quality Metrics

- ✅ Image quality maintained (no visible degradation)
- ✅ Responsive images work correctly
- ✅ Cross-browser compatibility
- ✅ Mobile performance maintained
- ✅ Accessibility standards met

---

## 9. Post-Migration Maintenance

### Ongoing Tasks

**Image Management:**
- Add new images: Optimize → Upload to GCS → Update references
- Update images: Replace in GCS → Clear CDN cache
- Remove images: Delete from GCS → Update references

**Monitoring:**
- Monitor GCS storage usage
- Monitor bandwidth costs
- Monitor CDN performance
- Monitor image load times

**Optimization:**
- Review image sizes regularly
- Optimize storage class if needed
- Update cache policies
- Review CDN configuration

**Documentation:**
- Maintain image inventory
- Document new image process
- Update team documentation
- Keep migration notes

---

## 10. Recommendations

### Immediate Actions

1. ✅ **Approve Migration Plan**
   - Review and approve approach
   - Allocate resources
   - Set timeline

2. ✅ **Set Up GCP Resources**
   - Create GCP project
   - Set up GCS buckets
   - Configure permissions

3. ✅ **Create Image Optimization Pipeline**
   - Set up optimization tools
   - Create scripts
   - Test on sample images

### Short-term Actions

1. ✅ **Begin Image Optimization**
   - Start optimizing images
   - Upload to GCS
   - Test image URLs

2. ✅ **Update Frontend Components**
   - Start with most-used components
   - Test incrementally
   - Verify image loading

3. ✅ **Set Up Deployment**
   - Configure GCP deployment
   - Set up CI/CD
   - Test deployment process

### Long-term Considerations

1. 💡 **Consider Image CDN Service**
   - Cloudinary, Imgix, or Cloudflare Images
   - Automatic optimization
   - Better performance

2. 💡 **Implement Image API**
   - If dynamic content needed
   - Match PIT pattern exactly
   - App Engine backend

3. 💡 **Optimize Further**
   - Review image usage
   - Implement lazy loading
   - Consider AVIF format (future)

---

## 11. Conclusion

This migration plan outlines the steps to transform the LMP site to match the Partners In Travel architecture pattern. The migration involves:

1. **Moving images to Google Cloud Storage** with pre-optimization
2. **Updating frontend to use GCS URLs** for images
3. **Configuring static export** or React SPA build
4. **Setting up GCP deployment** infrastructure
5. **Optional backend API** if dynamic content needed

**Key Benefits:**
- ✅ Scalable image storage
- ✅ Direct CDN delivery
- ✅ Proven architecture (matches PIT)
- ✅ Cost-effective
- ✅ Better performance

**Key Challenges:**
- ⚠️ Image optimization work required
- ⚠️ URL migration across all components
- ⚠️ Build process changes
- ⚠️ Testing and verification

**Recommendation:** Proceed with migration following this plan, with careful attention to image optimization quality and thorough testing of image references.

---

## 12. Appendices

### Appendix A: Image Optimization Tools

**Recommended Tools:**
- **Sharp** (Node.js): Fast, high-quality
- **ImageOptim** (Mac): GUI tool, easy to use
- **cwebp** (CLI): Google's WebP converter
- **Squoosh** (Web): Online tool, good for testing

### Appendix B: GCS Bucket Configuration

**Bucket Settings:**
- Storage class: STANDARD
- Location: us-central1 (or preferred)
- Public access: Configured
- CORS: Enabled for web
- Lifecycle: None (or as needed)

### Appendix C: Naming Convention Examples

**Format:** `descriptive-name-dimensions.webp`

**Examples:**
- `njt-logo-200x56.webp`
- `hero-image-1920x1080.webp`
- `gallery-corfu-1080x720.webp`
- `feature-personal-service-640x480.webp`

### Appendix D: Reference URLs

**GCS Image URL Pattern:**
```
https://storage.googleapis.com/lmp-site-images/images/[FOLDER]/[FILENAME]
```

**Examples:**
- `https://storage.googleapis.com/lmp-site-images/images/logos/njt-logo-200x56.webp`
- `https://storage.googleapis.com/lmp-site-images/images/gallery/corfu-1080x720.webp`

---

**Report Generated:** 24.11.2025  
**Next Review:** After Phase 1 completion  
**Status:** Ready for Approval

