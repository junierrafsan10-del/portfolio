// Mouse move 3D effect for code window
const codeWindow = document.getElementById('codeWindow');
const perspectiveContainer = document.querySelector('.perspective-container');

if (codeWindow && perspectiveContainer) {
  perspectiveContainer.addEventListener('mousemove', (e) => {
    const rect = perspectiveContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const rotateY = ((mouseX - centerX) / rect.width) * 20;
    const rotateX = ((centerY - mouseY) / rect.height) * 20;

    codeWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  perspectiveContainer.addEventListener('mouseleave', () => {
    codeWindow.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// Typing animation for About section title
const aboutTitle = "Building the Future of Digital Products";
const typewriterEl = document.querySelector('.typewriter-text');
const typingCursor = document.querySelector('.typing-cursor');
let titleIndex = 0;
let titleTyped = false;

function typeTitle() {
  if (typewriterEl && !titleTyped) {
    if (titleIndex < aboutTitle.length) {
      typewriterEl.textContent += aboutTitle.charAt(titleIndex);
      titleIndex++;
      setTimeout(typeTitle, 50 + Math.random() * 30);
    } else {
      titleTyped = true;
      setTimeout(() => {
        if (typingCursor) typingCursor.style.display = 'none';
      }, 2000);
    }
  }
}

// Typing animation for about paragraphs
function typeParagraph(element) {
  const originalText = element.dataset.originalText || element.textContent;
  element.textContent = '';
  let charIndex = 0;

  function typeChar() {
    if (charIndex < originalText.length) {
      element.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 15 + Math.random() * 15);
    }
  }

  typeChar();
}

// Store original text and clear for typing effect
document.querySelectorAll('.about-paragraph').forEach(el => {
  if (!el.dataset.originalText) {
    el.dataset.originalText = el.textContent;
  }
  el.textContent = '';
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counter animation for stat cards
      if (entry.target.classList.contains('stat-card')) {
        const counter = entry.target.querySelector('.counter');
        if (counter && counter.textContent === '0') {
          const target = parseInt(entry.target.dataset.target);
          const suffix = entry.target.dataset.suffix || '';
          animateCounter(counter, target, suffix);
        }
      }

      // Start typing animations when About section is visible
      if (entry.target.id === 'about') {
        // Type the title
        if (!titleTyped) {
          typeTitle();
        }

        // Type the paragraphs
        const paragraphs = entry.target.querySelectorAll('.about-paragraph');
        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            if (p.dataset.originalText) {
              typeParagraph(p);
            }
          }, 500 + (index * 2500));
        });
      }
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('#about, .stat-card, .about-paragraph, .about-title, .slide-left, .slide-right').forEach(el => {
  observer.observe(el);
});

// Counter animation function
function animateCounter(element, target, suffix) {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const stepDuration = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, stepDuration);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Cursor Trail Effect
const cursorTrail = document.getElementById('cursorTrail');
let lastTrailTime = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTrailTime > 30) {
    lastTrailTime = now;

    const trail = cursorTrail.cloneNode();
    trail.classList.add('active');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 800);
  }
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.parallax-shape');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;

  shapes.forEach(shape => {
    const speed = parseFloat(shape.dataset.speed) || 0.02;
    const x = (mouseX * speed);
    const y = (mouseY * speed);
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Navigation Progress Dots
const sections = ['hero', 'about', 'stack', 'projects', 'contact'];
const navDots = document.querySelectorAll('.nav-dot');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === `#${id}`) {
          dot.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(id => {
  const section = document.getElementById(id);
  if (section) navObserver.observe(section);
});

// Scroll-triggered Animations - observe individual elements
const scrollElements = document.querySelectorAll('.scroll-animate, .animate-entry-1, .animate-entry-2, .animate-entry-3, .animate-entry-4, .animate-entry-5, .animate-entry-6, .skill-bar');

const elementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.add('play');
    }
  });
}, { threshold: 0.1 });

scrollElements.forEach(el => {
  elementObserver.observe(el);
});

// Also observe sections for container animations
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});

// Hero animations trigger immediately on load
setTimeout(() => {
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    // Make hero visible immediately
    heroSection.classList.add('visible');
    document.querySelectorAll('#hero .animate-entry-1, #hero .animate-entry-2, #hero .animate-entry-3, #hero .animate-entry-4').forEach(el => {
      el.classList.add('play', 'visible');
    });
    // Start background animations
    document.querySelectorAll('.energy-orb, .float-particle, .sparkle, .aurora-wave, .morph-shape').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
}, 100);