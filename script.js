// assets/js/script.js

// Smooth scroll for navbar links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Show/hide "Go to Top" button
const goToTopBtn = document.getElementById('goToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    goToTopBtn.style.display = 'block';
  } else {
    goToTopBtn.style.display = 'none';
  }
});

// Scroll smoothly to top when button clicked
goToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Mobile navbar toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const navbar = document.querySelector('.navbar');

if (menuIcon && navLinks) {
  // Toggle sidebar when menu icon clicked
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close sidebar when a nav link is clicked
 document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Allow normal link behavior for external links like PDF
    if (!link.classList.contains('download-btn')) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('active');
    } else {
      // Allow PDF link to open normally
      navLinks.classList.remove('active');
    }
  });
});

}

// Hide navbar on scroll down, show on scroll up
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // scrolling down
    navbar.classList.add('hidden');
  } else {
    // scrolling up
    navbar.classList.remove('hidden');
  }
  lastScrollY = window.scrollY;
});
