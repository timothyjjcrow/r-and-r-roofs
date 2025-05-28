# R&R Roofing Modern Website

A beautiful, modern, and responsive website for R&R Roofing built with HTML5, CSS3, and JavaScript. Features include web scraping capabilities, Calendly integration, and a clean professional design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Web Scraping**: Automated image and content extraction from existing website
- **Calendly Integration**: Built-in scheduling for free roof inspections
- **Interactive Elements**: Image galleries, contact forms, and smooth scrolling
- **SEO Optimized**: Proper meta tags, semantic HTML, and fast loading
- **Performance Optimized**: Lazy loading, compressed images, and efficient code

## 📁 Project Structure

```
r-and-r-roofs/
├── package.json                 # Node.js dependencies
├── scraper.js                  # Puppeteer web scraper
├── scraped_data/               # Scraped content and images
│   ├── images/                 # Downloaded images
│   ├── scraped_data.json      # Complete scraping results
│   ├── images_metadata.json   # Image details
│   ├── links.json             # Extracted links
│   └── page_content.json      # Page content structure
├── website/                    # Main website files
│   ├── index.html             # Homepage
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── script.js          # Interactive functionality
│   └── assets/
│       └── images/
│           ├── logos/         # Company logos
│           ├── certifications/ # Certification badges
│           ├── gallery/       # Project photos
│           └── shingles/      # Shingle color samples
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Web Scraper (Optional)

```bash
npm run scrape
```

### 3. Start Development Server

```bash
npm run dev
# or
npm start
```

The website will be available at `http://localhost:3000`

## 📸 Web Scraping

The project includes a powerful Puppeteer-based scraper that extracts:

- **Images**: All images from the original website
- **Content**: Headings, paragraphs, and text content
- **Links**: Navigation and external links
- **Metadata**: Image alt text, dimensions, and file information

### Running the Scraper

```bash
npm run scrape
```

### Scraper Features

- Downloads and organizes images automatically
- Generates detailed metadata files
- Handles errors gracefully
- Provides progress feedback
- Creates usage instructions

## 🗓️ Calendly Integration

### Setup Instructions

1. **Create Calendly Account**

   - Go to [calendly.com](https://calendly.com)
   - Sign up or log in to your account

2. **Create Event Type**

   - Create a new event type for "Free Roof Inspection"
   - Set duration (e.g., 60 minutes)
   - Configure availability
   - Add custom questions if needed

3. **Get Embed Code**

   - Go to your event type settings
   - Click "Share" or "Embed"
   - Copy the inline embed URL

4. **Update Website**
   - Open `website/index.html`
   - Find the Calendly section (around line 280)
   - Replace `https://calendly.com/your-calendly-link/free-roof-inspection` with your actual Calendly URL

### Example Calendly Integration

```html
<div
  class="calendly-inline-widget"
  data-url="https://calendly.com/your-username/free-roof-inspection"
  style="min-width:320px;height:700px;"
></div>
```

## 🎨 Customization

### Colors and Branding

The website uses a blue color scheme that can be customized in `website/css/style.css`:

```css
/* Primary brand colors */
--primary-blue: #2563eb;
--primary-blue-dark: #1d4ed8;
--primary-blue-light: #3b82f6;
```

### Content Updates

- **Company Information**: Update contact details in `index.html`
- **Services**: Modify service descriptions in the services section
- **Gallery**: Add new project images to `assets/images/gallery/`
- **Certifications**: Update certification logos in `assets/images/certifications/`

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding CSS styles in `style.css`
3. Add any interactive functionality in `script.js`

## 📱 Responsive Design

The website is fully responsive with breakpoints at:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 767px and below

## ⚡ Performance Features

- **Lazy Loading**: Images load as they come into view
- **Optimized Images**: Compressed and properly sized
- **Smooth Animations**: CSS transitions and transforms
- **Fast Loading**: Minified code and efficient structure
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🔧 Development

### File Organization

- **HTML**: Semantic structure with proper accessibility
- **CSS**: Modern CSS with Grid and Flexbox
- **JavaScript**: Vanilla JS with modern ES6+ features
- **Images**: Organized by category and optimized

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Contact Information

Update the following contact details in the website:

- **Phone**: Currently set to (408) 555-1234
- **Email**: Currently set to info@rnrroofs.com
- **Address**: 407 Bayview Dr, Oakley, CA 94561
- **License**: #1085701

## 🚀 Deployment

### Option 1: Static Hosting (Recommended)

- **Netlify**: Drag and drop the `website` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable in repository settings

### Option 2: Traditional Web Hosting

- Upload the contents of the `website` folder to your web server
- Ensure all file paths are correct
- Test all functionality

### Pre-Deployment Checklist

- [ ] Update Calendly URL
- [ ] Update contact information
- [ ] Test all forms and links
- [ ] Optimize images
- [ ] Test on mobile devices
- [ ] Check loading speed

## 📈 SEO Optimization

The website includes:

- Proper meta descriptions and titles
- Semantic HTML structure
- Alt text for all images
- Fast loading times
- Mobile-friendly design
- Local business schema (can be added)

## 🔒 Security

- No sensitive data in client-side code
- Form validation on both client and server side (server-side needs implementation)
- HTTPS recommended for production

## 📝 License

This project is created for R&R Roofing. All rights reserved.

## 🤝 Support

For technical support or questions about the website:

1. Check this README for common issues
2. Review the code comments for implementation details
3. Test in different browsers and devices

---

**Built with ❤️ for R&R Roofing - Your Roof. Our Reputation.**
