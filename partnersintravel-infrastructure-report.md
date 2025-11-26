# Partners In Travel Infrastructure Analysis Report

**Site URL:** https://partnersintravel.co.uk/team  
**Analysis Date:** 24.11.2025  
**Site Type:** Affiliate Marketing Site

---

## Executive Summary

Partners In Travel is a React-based single-page application (SPA) that serves as an affiliate marketing platform. The site dynamically loads content from a backend CMS API and renders components based on data retrieved from both a custom backend service and a Knack database. Assets are primarily served from Google Cloud Storage, with some images stored in AWS S3 via Knack.

---

## 1. Technology Stack

### Frontend Framework
- **React** (Single Page Application)
- **Material-UI (MUI)** - Component library (evident from class names like `MuiContainer-root`)
- **Build System:** Appears to be Create React App or similar (based on `/static/js/main.[hash].js` pattern)
- **Deployment:** Static site hosted on Google Cloud Platform

### Backend Services
- **Primary API:** `vision-pit-backend-dot-seismic-helper-364013.nw.r.appspot.com`
  - Google App Engine hosted backend
  - Endpoint: `/marketing_media/team`
  - Returns JSON data structure containing marketing content

### Database/CMS
- **Knack Database** (via AWS S3)
  - URL Pattern: `s3.eu-central-1.amazonaws.com/kn-custom-notjusttravel/`
  - Stores some images and asset metadata
  - Used for content management

### Asset Storage
- **Primary:** Google Cloud Storage
  - Base URL: `storage.googleapis.com/njt-cms-media/`
  - Organized by folders: `PIT Marketing/`, `PIT Landing/`, etc.
  - Formats: WebP (images), SVG (icons), PNG (logos)
  
- **Secondary:** AWS S3 (via Knack)
  - Used for some legacy images and metadata

---

## 2. Architecture Overview

### Application Structure
```
┌─────────────────────────────────────┐
│   Google Cloud Platform (Hosting)   │
│   ┌───────────────────────────────┐ │
│   │   React SPA (Static Build)    │ │
│   │   - /static/js/main.[hash].js │ │
│   │   - /static/css/main.[hash].css│ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
              │
              │ API Calls
              ▼
┌─────────────────────────────────────┐
│   Google App Engine Backend         │
│   vision-pit-backend...appspot.com  │
│   ┌───────────────────────────────┐ │
│   │   /marketing_media/team       │ │
│   │   Returns: JSON with assets   │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
              │
              │ References
              ▼
┌─────────────────────────────────────┐
│   Content Sources                    │
│   ┌───────────────────────────────┐ │
│   │   Google Cloud Storage        │ │
│   │   (Primary media assets)      │ │
│   └───────────────────────────────┘ │
│   ┌───────────────────────────────┐ │
│   │   Knack Database (AWS S3)     │ │
│   │   (Some images & metadata)    │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 3. How Assets Are Called

### 3.1 Initial Page Load
1. **HTML Document** served from Google Frontend
   - Contains minimal HTML structure
   - Includes React root div: `<div id="root">`
   - References bundled JavaScript: `/static/js/main.a21554a8.js`
   - References bundled CSS: `/static/css/main.65cf2c5c.css`

### 3.2 React Application Bootstrap
- React app mounts and makes API call to backend
- **API Endpoint:** `GET https://vision-pit-backend-dot-seismic-helper-364013.nw.r.appspot.com/marketing_media/team`
- Returns comprehensive JSON structure with all page content

### 3.3 Asset Loading Pattern

#### Primary Assets (Google Cloud Storage)
Assets are referenced via URLs in the API response:
```
https://storage.googleapis.com/njt-cms-media/[FOLDER]/[FILE]
```

**Examples:**
- Images: `PIT Marketing/WebP/business 970x730.webp`
- Icons: `PIT Marketing/SVG/refer icon2.svg`
- Logos: `PIT Landing/WebP/ktp-logos-for-pit-3.webp`

#### Secondary Assets (Knack/AWS S3)
Some images stored in Knack database:
```
https://s3.eu-central-1.amazonaws.com/kn-custom-notjusttravel/assets/[ID]/[ID]/original/[filename]
```

**Example:**
- `njonlyreverse.jpg` (Travel Consultant headshot)

#### Static Assets (Local)
Some assets served directly from the site:
```
/assets/[filename]
```

**Examples:**
- `/assets/njt_logo.png`
- `/assets/PIT- Marketing Logo.png`
- `/assets/ABTA_logo.png`
- `/assets/Trust_pilot.png`

### 3.4 Component Rendering Flow

1. **API Response Structure:**
   ```json
   {
     "marketing_data": {
       "tc_info": { ... },
       "assets": [
         {
           "asset_id": 73,
           "asset_description": "...",
           "sort_order": 100,
           "sub_path": "individuals",
           "lines": [
             {
               "headline_text": "...",
               "primary_image_server_url": "https://storage.googleapis.com/...",
               "wistia_embed_block": "...",
               ...
             }
           ]
         }
       ]
     }
   }
   ```

2. **React Components:**
   - Components are rendered based on `asset_id` and `sort_order`
   - Each asset can have multiple "lines" (sub-components)
   - Images loaded via `primary_image_server_url` and `secondary_image_server_url`
   - Video embeds via `wistia_embed_block` (Wistia iframe)

3. **Dynamic Content:**
   - Text content: `headline_text`, `strapline_text`, `paragraph_text`
   - Images: Loaded from URLs in `primary_image_server_url`
   - Videos: Embedded via Wistia iframe code
   - CTA buttons: Generated from `cta_text` field

---

## 4. Data Structure Analysis

### API Response Structure
The backend returns a nested structure:

**Top Level:**
- `marketing_data` - Main container
  - `tc_info` - Travel Consultant information
  - `assets[]` - Array of content blocks

**Asset Object:**
- `asset_id` - Unique identifier
- `asset_description` - Human-readable description
- `asset_image` - Optional Knack image URL
- `sort_order` - Rendering order
- `sub_path` - Route/path identifier (e.g., "individuals", "businesses")
- `lines[]` - Array of content lines within the asset

**Line Object:**
- `assetline_id` - Unique line identifier
- `headline_text` - Main heading
- `strapline_text` - Subheading
- `paragraph_text` - Body text (supports HTML)
- `offer_from` - Pricing text prefix
- `offer_price` - Price display
- `cta_text` - Call-to-action button text
- `primary_image_server_url` - Main image URL (Google Cloud Storage)
- `secondary_image_server_url` - Optional secondary image
- `wistia_embed_block` - HTML iframe code for videos
- `sort_order` - Order within asset

---

## 5. Third-Party Integrations

### Video Hosting
- **Wistia** - Video embedding platform
  - Embed URL: `https://fast.wistia.net/embed/iframe/[VIDEO_ID]`
  - Used for marketing videos and testimonials

### Analytics
- **Google Analytics 4** (GA4)
  - Tracking ID: `G-W12SWWLZG9`
- **Google Analytics Universal** (legacy)
  - Tracking ID: `UA-27349434-1`
- **Google Tag Manager** - Tag management

### Error Tracking
- **Sentry** - Error monitoring
  - CDN: `browser.sentry-cdn.com/9.6.1/bundle.min.js`

### Fonts
- **Google Fonts**
  - Montserrat (weights: 100-900, italic)
  - Quicksand (weights: 300-700)

---

## 6. Asset Organization

### Google Cloud Storage Structure
```
njt-cms-media/
├── PIT Marketing/
│   ├── WebP/          # Marketing images (WebP format)
│   ├── SVG/           # Icons and graphics
│   └── PNG/           # Logos and special images
├── PIT Landing/
│   ├── WebP/          # Landing page images
│   ├── SVG/           # Landing page icons
│   └── PNG/           # Logos and awards
├── SVG/               # Shared SVG assets
└── PNG/               # Shared PNG assets
```

### File Naming Conventions
- **WebP Images:** Descriptive names with dimensions (e.g., `business 970x730.webp`)
- **SVG Icons:** Descriptive names (e.g., `refer icon2.svg`)
- **PNG Files:** Purpose-based names (e.g., `awards row 1-1.png`)

---

## 7. Performance Considerations

### Asset Optimization
- **WebP Format:** Primary image format for better compression
- **SVG Icons:** Vector graphics for scalability
- **CDN Delivery:** Assets served via Google Cloud Storage (CDN-enabled)
- **Lazy Loading:** Likely implemented for below-fold content

### Caching Strategy
- **Static Assets:** Hash-based filenames (`main.a21554a8.js`) enable long-term caching
- **API Responses:** May be cached at CDN level
- **Images:** Served from CDN with appropriate cache headers

---

## 8. Security & Compliance

### HTTPS
- All assets served over HTTPS
- Secure API communications

### Content Security
- Assets restricted to specific domains
- API endpoints likely require authentication (not visible in frontend)

---

## 9. Key Findings

### Strengths
1. **Separation of Concerns:** Clear separation between frontend (React), backend (API), and content (CMS)
2. **Scalable Architecture:** Cloud-based infrastructure allows for easy scaling
3. **Content Management:** Knack database provides non-technical content management
4. **Asset Optimization:** WebP format and CDN delivery for performance
5. **Modular Structure:** Component-based React architecture

### Architecture Patterns
1. **Headless CMS Pattern:** Backend API serves content, frontend renders
2. **Hybrid Asset Storage:** Primary (GCS) + Secondary (Knack/S3)
3. **Static Site Generation:** Pre-built React app deployed as static files
4. **API-Driven Content:** Dynamic content loaded via REST API

### Potential Considerations
1. **API Dependency:** Frontend requires backend API to function
2. **Multiple Asset Sources:** Assets from GCS, S3, and local `/assets` folder
3. **Knack Integration:** Some content still tied to Knack database
4. **Build Process:** Requires rebuild/redeploy for code changes

---

## 10. Recommendations

### For Similar Implementations
1. **Consolidate Asset Storage:** Consider migrating all assets to single CDN (GCS)
2. **API Caching:** Implement caching layer for API responses
3. **Error Handling:** Ensure graceful degradation if API fails
4. **Asset Preloading:** Consider preloading critical above-fold images
5. **Monitoring:** Implement performance monitoring for API calls

---

## Conclusion

Partners In Travel uses a modern, scalable architecture combining React for the frontend, a Google App Engine backend API, and a hybrid content management system using both Google Cloud Storage and Knack database. The site follows best practices for performance and scalability, with a clear separation between content management and presentation layers.

The infrastructure supports an affiliate marketing model where content can be dynamically updated through the CMS without requiring frontend code changes, making it suitable for marketing teams to manage content independently.

---

**Report Generated:** 24.11.2025  
**Analysis Method:** Browser inspection, network analysis, API response examination

