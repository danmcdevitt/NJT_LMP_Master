📊 **LMP vs PIT Setup Comparison**

**LMP Site (Current):**
• Next.js 16 on Vercel
• Images in `/public` folder (local)
• No optimization
• Standard `<img>` tags
• No backend API

**PIT Site (Target):**
• React SPA on GCP (static build)
• Images in Google Cloud Storage
• Pre-optimized WebP format
• Direct GCS CDN delivery
• App Engine API for content

**Key Difference:**
LMP = Images bundled with app
PIT = Images in cloud storage, referenced via URLs

**Migration = Move images to GCS + Update URLs**


