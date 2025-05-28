# R&R Roofing Website Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

1. **Prepare the website folder**

   ```bash
   # Make sure you're in the project root
   cd website
   ```

2. **Go to Netlify**

   - Visit [netlify.com](https://netlify.com)
   - Sign up for a free account
   - Click "Add new site" → "Deploy manually"

3. **Deploy**

   - Drag and drop the entire `website` folder onto Netlify
   - Your site will be live in seconds!
   - Netlify will provide a URL like `https://amazing-site-name.netlify.app`

4. **Custom Domain (Optional)**
   - In Netlify dashboard, go to "Domain settings"
   - Add your custom domain (e.g., `www.rnrroofs.com`)
   - Follow DNS configuration instructions

### Option 2: Vercel (Great for GitHub Integration)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial R&R Roofing website"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up and connect your GitHub account
   - Import your repository
   - Set build settings:
     - Build Command: `echo "Static site"`
     - Output Directory: `website`

### Option 3: Traditional Web Hosting

1. **Prepare files**

   - Zip the contents of the `website` folder
   - Upload via FTP/cPanel file manager

2. **Upload to your hosting provider**
   - Extract files to your domain's public folder
   - Usually `public_html` or `www` folder

## 🔧 Pre-Deployment Checklist

### 1. Update Contact Information

Edit `website/index.html` and update:

- [ ] Phone number (currently: (408) 555-1234)
- [ ] Email address (currently: info@rnrroofs.com)
- [ ] Physical address (currently: 407 Bayview Dr, Oakley, CA 94561)
- [ ] License number (currently: #1085701)

### 2. Set Up Calendly Integration

- [ ] Create Calendly account at [calendly.com](https://calendly.com)
- [ ] Create "Free Roof Inspection" event type
- [ ] Copy your Calendly URL
- [ ] Replace placeholder URL in `index.html` (line ~280):
  ```html
  data-url="https://calendly.com/YOUR-USERNAME/free-roof-inspection"
  ```

### 3. Optimize Images (Optional but Recommended)

```bash
# Install image optimization tools
npm install -g imagemin-cli imagemin-webp imagemin-mozjpeg

# Optimize images
imagemin website/assets/images/**/*.{jpg,jpeg,png} --out-dir=website/assets/images/optimized --plugin=mozjpeg --plugin=webp
```

### 4. Test Everything

- [ ] All navigation links work
- [ ] Contact form displays properly
- [ ] Gallery images load correctly
- [ ] Mobile responsiveness
- [ ] Calendly widget loads
- [ ] All certification logos display

## 📱 Mobile Testing

Test on these devices/screen sizes:

- [ ] iPhone (375px width)
- [ ] iPad (768px width)
- [ ] Desktop (1200px+ width)

Use browser dev tools or real devices.

## 🔍 SEO Setup

### 1. Google My Business

- Claim your Google My Business listing
- Add photos from your gallery
- Encourage customer reviews

### 2. Google Analytics (Optional)

Add this before closing `</head>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_TRACKING_ID");
</script>
```

### 3. Local SEO Schema

Add this JSON-LD schema before closing `</head>` tag:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "R&R Roofing",
    "image": "https://yoursite.com/assets/images/logos/randr-horiz-clear.png",
    "telephone": "+1-408-555-1234",
    "email": "info@rnrroofs.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "407 Bayview Dr",
      "addressLocality": "Oakley",
      "addressRegion": "CA",
      "postalCode": "94561",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.9974",
      "longitude": "-121.7124"
    },
    "url": "https://yoursite.com",
    "sameAs": [
      "https://www.facebook.com/rnrroofing",
      "https://www.google.com/search?q=r%26r+roofing+oakley"
    ],
    "priceRange": "$$",
    "areaServed": "Bay Area, CA"
  }
</script>
```

## 🔒 Security & Performance

### SSL Certificate

- Most hosting providers offer free SSL certificates
- Ensure your site loads with `https://`
- Update any hardcoded `http://` links to `https://`

### Performance Optimization

- [ ] Enable gzip compression on your server
- [ ] Set up browser caching headers
- [ ] Consider using a CDN for images

### Form Security

The contact form currently uses client-side validation only. For production:

1. Set up server-side form processing
2. Add CAPTCHA to prevent spam
3. Implement proper email sending

## 📊 Analytics & Monitoring

### Website Performance

- Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Aim for scores above 90 for both mobile and desktop

### Uptime Monitoring

- Set up monitoring with services like:
  - UptimeRobot (free)
  - Pingdom
  - StatusCake

## 🎯 Post-Launch Tasks

### Week 1

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Test all contact forms
- [ ] Monitor for any broken links

### Month 1

- [ ] Review analytics data
- [ ] Gather customer feedback
- [ ] Update content based on user behavior
- [ ] Add more project photos to gallery

### Ongoing

- [ ] Regular content updates
- [ ] New project photos
- [ ] Customer testimonials
- [ ] Blog posts (if desired)

## 🆘 Troubleshooting

### Common Issues

**Images not loading:**

- Check file paths are correct
- Ensure images are in the right directories
- Verify image file extensions match HTML

**Calendly not showing:**

- Verify Calendly URL is correct
- Check if Calendly script is loading
- Test in different browsers

**Mobile layout issues:**

- Test CSS media queries
- Check viewport meta tag
- Validate HTML structure

**Contact form not working:**

- Remember: form needs server-side processing
- Consider using services like Formspree or Netlify Forms

## 📞 Support

If you need help with deployment:

1. Check this guide first
2. Review the main README.md
3. Test in a local environment first
4. Check browser console for errors

---

**Ready to launch? Your new R&R Roofing website is going to look amazing! 🏠✨**
