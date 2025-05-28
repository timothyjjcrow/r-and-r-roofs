const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");
const https = require("https");
const http = require("http");
const axios = require("axios");

async function scrapeRnRRoofs() {
  console.log("🚀 Starting R&R Roofing website scraper...");

  const browser = await puppeteer.launch({
    headless: true, // Changed to headless mode
    defaultViewport: { width: 1920, height: 1080 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const url = "https://www.rnrroofs.com/";
  const scrapedDir = path.join(__dirname, "scraped_data");
  const imagesDir = path.join(scrapedDir, "images");

  // Create directories
  await fs.ensureDir(scrapedDir);
  await fs.ensureDir(imagesDir);

  try {
    console.log(`📄 Navigating to ${url}...`);

    // Set user agent to avoid blocking
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for page to fully load
    await page.waitForTimeout(2000);

    console.log("📸 Extracting images...");
    // Get all images with detailed information
    const images = await page.evaluate(() => {
      const imageElements = Array.from(document.querySelectorAll("img"));
      return imageElements
        .map((img, index) => ({
          src: img.src,
          alt: img.alt || `image_${index}`,
          title: img.title || "",
          className: img.className || "",
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          loading: img.loading || "",
          index: index,
        }))
        .filter((img) => img.src && !img.src.includes("data:image")); // Filter out data URLs
    });

    console.log(`🖼️  Found ${images.length} images`);

    // Download images with better error handling
    let downloadCount = 0;
    for (const [index, imageData] of images.entries()) {
      try {
        const imageUrl = imageData.src;

        // Skip if not a valid URL
        if (!imageUrl.startsWith("http")) {
          console.log(`⏭️  Skipping invalid URL: ${imageUrl}`);
          continue;
        }

        const urlObj = new URL(imageUrl);
        let fileName = path.basename(urlObj.pathname);

        // Generate better filename if needed
        if (!fileName || fileName === "/" || !path.extname(fileName)) {
          const altText = imageData.alt
            .replace(/[^a-zA-Z0-9]/g, "_")
            .toLowerCase();
          fileName = `${altText}_${index}.jpg`;
        }

        // Ensure unique filename
        let finalPath = path.join(imagesDir, fileName);
        let counter = 1;
        while (await fs.pathExists(finalPath)) {
          const ext = path.extname(fileName);
          const name = path.basename(fileName, ext);
          finalPath = path.join(imagesDir, `${name}_${counter}${ext}`);
          counter++;
        }

        // Download image with shorter timeout
        const response = await axios({
          method: "GET",
          url: imageUrl,
          responseType: "stream",
          timeout: 10000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        });

        const writer = fs.createWriteStream(finalPath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
          setTimeout(() => reject(new Error("Download timeout")), 15000);
        });

        downloadCount++;
        console.log(`✅ Downloaded: ${path.basename(finalPath)}`);

        // Update image data with local path
        imageData.localPath = finalPath;
        imageData.fileName = path.basename(finalPath);
      } catch (error) {
        console.error(
          `❌ Failed to download ${imageData.src}: ${error.message}`
        );
        imageData.downloadError = error.message;
      }
    }

    console.log(`🔗 Extracting links...`);
    // Get all links
    const links = await page.evaluate(() => {
      const anchorElements = Array.from(document.querySelectorAll("a"));
      return anchorElements
        .map((a, index) => ({
          href: a.href,
          text: a.textContent.trim(),
          title: a.title || "",
          className: a.className || "",
          target: a.target || "",
          index: index,
        }))
        .filter((link) => link.href && link.text);
    });

    console.log(`📝 Extracting page content...`);
    // Get page content and structure
    const pageContent = await page.evaluate(() => {
      // Get main headings
      const headings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      ).map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: h.textContent.trim(),
        className: h.className || "",
      }));

      // Get paragraphs
      const paragraphs = Array.from(document.querySelectorAll("p"))
        .map((p) => ({
          text: p.textContent.trim(),
          className: p.className || "",
        }))
        .filter((p) => p.text.length > 10);

      // Get navigation items
      const navItems = Array.from(
        document.querySelectorAll("nav a, .nav a, .menu a")
      ).map((a) => ({
        text: a.textContent.trim(),
        href: a.href,
        className: a.className || "",
      }));

      // Get contact information
      const contactInfo = {
        phone:
          document.querySelector('[href^="tel:"]')?.href?.replace("tel:", "") ||
          "",
        email:
          document
            .querySelector('[href^="mailto:"]')
            ?.href?.replace("mailto:", "") || "",
        address: "",
      };

      // Try to find address
      const addressPatterns = [
        /\d+\s+[A-Za-z\s]+(?:Dr|Drive|St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road)[,\s]+[A-Za-z\s]+[,\s]+[A-Z]{2}\s+\d{5}/,
        /407\s+Bayview\s+Dr[,\s]+Oakley[,\s]+CA\s+94561/i,
      ];

      const bodyText = document.body.textContent;
      for (const pattern of addressPatterns) {
        const match = bodyText.match(pattern);
        if (match) {
          contactInfo.address = match[0];
          break;
        }
      }

      return {
        title: document.title,
        headings,
        paragraphs,
        navItems,
        contactInfo,
      };
    });

    // Save all data
    const scrapedData = {
      url,
      scrapeDate: new Date().toISOString(),
      images,
      links,
      pageContent,
      downloadStats: {
        totalImages: images.length,
        downloadedImages: downloadCount,
        failedDownloads: images.length - downloadCount,
      },
    };

    await fs.writeJSON(
      path.join(scrapedDir, "scraped_data.json"),
      scrapedData,
      { spaces: 2 }
    );
    await fs.writeJSON(path.join(scrapedDir, "images_metadata.json"), images, {
      spaces: 2,
    });
    await fs.writeJSON(path.join(scrapedDir, "links.json"), links, {
      spaces: 2,
    });
    await fs.writeJSON(
      path.join(scrapedDir, "page_content.json"),
      pageContent,
      { spaces: 2 }
    );

    console.log("✅ All data saved successfully!");
    console.log(`📊 Summary:
        - Images found: ${images.length}
        - Images downloaded: ${downloadCount}
        - Links extracted: ${links.length}
        - Headings found: ${pageContent.headings.length}
        - Paragraphs extracted: ${pageContent.paragraphs.length}`);
  } catch (error) {
    console.error("❌ Scraping failed:", error);
  } finally {
    await browser.close();
    console.log("🏁 Scraper finished!");
  }
}

// Create instructions file
async function createInstructions() {
  const instructions = `# R&R Roofing Website Scraper - Usage Instructions

## 📁 File Structure After Scraping

\`\`\`
scraped_data/
├── images/                    # All downloaded images
├── scraped_data.json         # Complete scraping results
├── images_metadata.json      # Detailed image information
├── links.json               # All extracted links
└── page_content.json        # Page content structure
\`\`\`

## 🖼️ How to Use Scraped Images

### 1. Image Organization
- All images are saved in \`scraped_data/images/\`
- Images are renamed for better organization
- Check \`images_metadata.json\` for original sources and alt text

### 2. For Website Development
\`\`\`javascript
// Example: Loading image metadata
const imageData = require('./scraped_data/images_metadata.json');

// Find specific images
const logos = imageData.filter(img => 
    img.alt.toLowerCase().includes('logo') || 
    img.className.includes('logo')
);

const galleryImages = imageData.filter(img => 
    img.alt.toLowerCase().includes('roof') || 
    img.alt.toLowerCase().includes('project')
);
\`\`\`

### 3. Image Optimization Recommendations
- Resize images to actual display dimensions
- Compress using tools like TinyPNG or ImageOptim
- Convert to WebP format with fallbacks
- Add proper alt text for accessibility

### 4. CSS Background Images
Some images might be used as CSS backgrounds:
\`\`\`css
.hero-section {
    background-image: url('./scraped_data/images/hero-image.jpg');
}
\`\`\`

## 🔗 Using Extracted Links

Check \`links.json\` for:
- Navigation structure
- External resources
- Social media links
- Contact information

## 📄 Content Structure

\`page_content.json\` contains:
- All headings with hierarchy
- Main paragraphs
- Navigation items
- Contact information

## 🚀 Next Steps

1. **Organize Assets**: Move relevant images to your website's asset folder
2. **Create Components**: Use the scraped content to build website sections
3. **Implement Design**: Create modern, responsive layouts
4. **Add Calendly**: Integrate scheduling functionality
5. **Optimize**: Compress images and optimize performance

## ⚠️ Important Notes

- Always respect copyright and usage rights
- Optimize images before using in production
- Test all functionality thoroughly
- Consider SEO implications of alt text and file names
`;

  await fs.writeFile(
    path.join(__dirname, "SCRAPER_INSTRUCTIONS.md"),
    instructions
  );
  console.log("📝 Instructions file created: SCRAPER_INSTRUCTIONS.md");
}

// Run the scraper
if (require.main === module) {
  scrapeRnRRoofs()
    .then(() => createInstructions())
    .catch(console.error);
}

module.exports = { scrapeRnRRoofs, createInstructions };
