📋 **LMP Site Migration Summary**

**Current Setup:**
• Next.js 16.0.3 site on Vercel
• Images stored locally in `/public/images/` (112+ images)
• No image optimization currently
• Standard `<img>` tags throughout

**Migration Plan:**
Moving to Partners In Travel architecture pattern:

**Phase 1:** Optimize all images to WebP → Upload to Google Cloud Storage
**Phase 2:** Update Next.js to static export → Change all image URLs to GCS
**Phase 3:** Deploy to GCP (Cloud Storage/Cloud Run) → Set up CDN
**Phase 4:** Optional backend API (if needed)

**Key Changes:**
✅ Images move from local `/public` folder to Google Cloud Storage
✅ Pre-optimized WebP format (matches PIT pattern)
✅ Direct GCS CDN delivery (better performance)
✅ Static export for faster builds
✅ Scalable architecture matching PIT

**Benefits:**
• Better performance (CDN delivery)
• Scalable image storage
• Proven architecture (matches PIT)
• Cost-effective (~$10-25/month)

**Status:** Planning phase - ready to start Phase 1


