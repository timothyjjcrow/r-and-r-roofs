# R&R Roofing Website

A modern, responsive website for R&R Roofing - Bay Area's trusted roofing contractor since 2002.

## 🏠 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean design with smooth animations and professional aesthetics
- **Interactive Gallery**: Showcasing the Martinez TPO project transformation
- **Shingle Showcase**: California Cool™ shingle color options
- **Contact Integration**: Contact form and Calendly scheduling integration
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
r-and-r-roofs/
├── index.html               # Main website file
├── assets/
│   └── images/
│       ├── certifications/    # GAF, BBB, NRCA, Google, HomeAdvisor badges
│       ├── gallery/          # Project photos and company images
│       ├── logos/            # R&R Roofing branding assets
│       └── shingles/         # Shingle color samples
├── css/
│   └── style.css            # Main stylesheet
├── js/
│   └── script.js            # Interactive functionality
├── README.md                # This documentation
├── DEPLOYMENT.md            # Deployment guide
└── .gitignore              # Git ignore file
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/timothyjjcrow/r-and-r-roofs.git
   cd r-and-r-roofs
   ```

2. Open the website:

   ```bash
   # Option 1: Open directly in browser
   open index.html

   # Option 2: Use a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Live Server (Recommended)

For the best development experience with live reloading:

```bash
# Install live-server globally
npm install -g live-server

# Start development server
live-server --port=3000
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy with default settings (no build configuration needed)

### Option 2: Netlify

1. Fork this repository
2. Connect your GitHub account to [Netlify](https://netlify.com)
3. Deploy from GitHub with these settings:
   - **Build command**: Leave empty
   - **Publish directory**: `/` (root directory)
   - **Branch**: `master`

### Option 3: GitHub Pages

1. Go to repository Settings > Pages
2. Select source: Deploy from a branch
3. Choose `master` branch and `/ (root)` folder
4. Your site will be available at: `https://username.github.io/r-and-r-roofs/`

### Option 4: Traditional Web Hosting

Upload all files in the repository root to your web server's public directory.

## 📋 Calendly Integration

To activate the scheduling functionality:

1. Sign up at [calendly.com](https://calendly.com)
2. Create an event type for "Free Roof Inspection"
3. In `index.html`, replace the Calendly URL:
   ```html
   data-url="https://calendly.com/your-username/free-roof-inspection"
   ```

## 🎨 Customization

### Colors

The website uses a professional blue color scheme. Main colors are defined in CSS variables:

- Primary: `#2563eb` (Blue)
- Secondary: `#1d4ed8` (Darker Blue)
- Background: `#f8fafc` (Light Gray)

### Content

All content can be easily modified in `index.html`:

- Company information
- Service descriptions
- Contact details
- Project showcases

### Images

Replace images in the `assets/images/` folders with your own:

- Logo: `assets/images/logos/randr-horiz-clear.png`
- Project photos: `assets/images/gallery/` folder
- Certifications: `assets/images/certifications/` folder

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📞 Contact Information

**R&R Roofing**

- Address: 407 Bayview Dr, Oakley, CA 94561
- License #: 1085701
- Status: Licensed, Insured & Bonded

## 📄 License

This project is proprietary and confidential. All rights reserved by R&R Roofing.

---

_Built with ❤️ for R&R Roofing - Your Roof. Our Reputation._
