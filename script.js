// Teichträume – Script

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Navbar scroll effect
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Scroll animations
  const fadeElements = document.querySelectorAll(
    '.section-header, .about-text, .about-image, .gallery-item, .contact-header, .contact-card, .feature'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => observer.observe(el));

  // =====================
  // Lightbox Gallery
  // =====================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');

  // Collect all gallery images
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const images = Array.from(galleryItems).map(img => ({
    src: img.src,
    alt: img.alt
  }));

  let currentIndex = 0;
  let isTransitioning = false;

  function openLightbox(index) {
    currentIndex = index;
    updateImage(false);
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
  }

  function updateImage(animate = true) {
    if (animate && !isTransitioning) {
      isTransitioning = true;
      lightboxImg.classList.add('switching');

      setTimeout(() => {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;

        // Wait for image load then fade in
        lightboxImg.onload = () => {
          lightboxImg.classList.remove('switching');
          isTransitioning = false;
        };
        // Fallback if already cached
        if (lightboxImg.complete) {
          lightboxImg.classList.remove('switching');
          isTransitioning = false;
        }
      }, 180);
    } else {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  }

  function navigate(direction) {
    if (isTransitioning) return;
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateImage(true);
  }

  // Click on gallery items to open lightbox
  galleryItems.forEach((img, index) => {
    img.closest('.gallery-item').addEventListener('click', () => {
      openLightbox(index);
    });
  });

  // Close lightbox
  btnClose.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

  // Navigation buttons
  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(-1);
  });

  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigate(-1);
        break;
      case 'ArrowRight':
        navigate(1);
        break;
    }
  });

  // Touch / Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        navigate(1);  // Swipe left → next
      } else {
        navigate(-1); // Swipe right → prev
      }
    }
  }, { passive: true });
});
