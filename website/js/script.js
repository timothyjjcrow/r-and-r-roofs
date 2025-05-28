// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Animate hamburger
    const spans = hamburger.querySelectorAll("span");
    if (hamburger.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");

      // Reset hamburger animation
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document
    .querySelectorAll(
      ".service-card, .gallery-item, .shingle-item, .about-stats .stat"
    )
    .forEach((el) => {
      el.classList.add("scroll-animate");
      observer.observe(el);
    });

  // Gallery thumbnail functionality
  const galleryThumbs = document.querySelectorAll(".gallery-thumbs img");
  const galleryMain = document.querySelector(".gallery-main img");

  if (galleryThumbs.length > 0 && galleryMain) {
    galleryThumbs.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        galleryMain.src = this.src;
        galleryMain.alt = this.alt;

        // Add loading effect
        galleryMain.style.opacity = "0.5";
        setTimeout(() => {
          galleryMain.style.opacity = "1";
        }, 200);

        // Remove active state from all thumbs
        galleryThumbs.forEach((t) => t.classList.remove("active"));
        // Add active state to clicked thumb
        this.classList.add("active");
      });
    });
  }

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Basic form validation
      const requiredFields = ["name", "email", "phone", "service"];
      let isValid = true;

      requiredFields.forEach((field) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!data[field] || data[field].trim() === "") {
          input.style.borderColor = "#ef4444";
          isValid = false;
        } else {
          input.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }
      });

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailInput = contactForm.querySelector('[name="email"]');
      if (!emailRegex.test(data.email)) {
        emailInput.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (isValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handler)
        setTimeout(() => {
          // Show success message
          showNotification(
            "Thank you! Your message has been sent. We'll get back to you soon.",
            "success"
          );

          // Reset form
          contactForm.reset();

          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      } else {
        showNotification(
          "Please fill in all required fields correctly.",
          "error"
        );
      }
    });
  }

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${
              type === "success"
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#3b82f6"
            };
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

    notification.querySelector(".notification-content").style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;

    notification.querySelector(".notification-close").style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Add close functionality
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
      });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Phone number formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      let formattedValue = "";

      if (value.length > 0) {
        if (value.length <= 3) {
          formattedValue = `(${value}`;
        } else if (value.length <= 6) {
          formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
          formattedValue = `(${value.slice(0, 3)}) ${value.slice(
            3,
            6
          )}-${value.slice(6, 10)}`;
        }
      }

      e.target.value = formattedValue;
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Parallax effect for hero background
  const heroBackground = document.querySelector(".hero-background");
  if (heroBackground) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    });
  }

  // Counter animation for statistics
  const counters = document.querySelectorAll(".stat h3");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent.replace(/\D/g, ""));
          const suffix = counter.textContent.replace(/\d/g, "");
          let current = 0;
          const increment = target / 50;

          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.ceil(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + suffix;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // Shingle color picker functionality
  const shingleItems = document.querySelectorAll(".shingle-item");
  shingleItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      shingleItems.forEach((i) => i.classList.remove("selected"));

      // Add active class to clicked item
      this.classList.add("selected");

      // You could add more functionality here, like updating a preview
      const colorName = this.querySelector("h5").textContent;
      console.log(`Selected color: ${colorName}`);
    });
  });

  // Add selected styles for shingle items
  const style = document.createElement("style");
  style.textContent = `
        .shingle-item.selected {
            border: 3px solid #2563eb;
            transform: translateY(-5px) scale(1.02);
        }
        
        .shingle-item.selected h5 {
            color: #2563eb;
            font-weight: 700;
        }
    `;
  document.head.appendChild(style);

  // Performance optimization: Throttle scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Apply throttling to scroll events
  window.addEventListener(
    "scroll",
    throttle(() => {
      // Any scroll-based animations can go here
    }, 16)
  ); // ~60fps

  console.log("R&R Roofing website loaded successfully! 🏠");
});

// Global function for changing main project image (called from HTML onclick)
function changeMainImage(clickedImg) {
  const mainImg = document.getElementById("main-project-image");
  if (mainImg && clickedImg) {
    mainImg.src = clickedImg.src;
    mainImg.alt = clickedImg.alt;

    // Add loading effect
    mainImg.style.opacity = "0.5";
    setTimeout(() => {
      mainImg.style.opacity = "1";
    }, 200);

    // Remove active state from all thumbs
    const allThumbs = document.querySelectorAll(".gallery-thumbs img");
    allThumbs.forEach((thumb) => thumb.classList.remove("active"));

    // Add active state to clicked thumb
    clickedImg.classList.add("active");
  }
}
