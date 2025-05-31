// Fade-in intersection observer
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Dark mode toggle
  const toggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    toggle.textContent = '☀️';
  }
  toggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      toggle.textContent = '☀️';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      toggle.textContent = '🌙';
    }
  });

  // Typing effect for tagline
  const taglines = [
    "Web Developer",
    "Explorer",
    "Learner",
    "Stargazer",
    "Galactic Dreamer"
  ];
  let typedIndex = 0, charIndex = 0, isDeleting = false;
  const typedSpan = document.getElementById('typed');
  function type() {
    if (!typedSpan) return;
    let current = taglines[typedIndex];
    if (isDeleting) {
      typedSpan.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        typedIndex = (typedIndex + 1) % taglines.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, 50);
      }
    } else {
      typedSpan.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        setTimeout(type, 100);
      }
    }
  }
  if (typedSpan) type();

  // Scroll progress bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar)
      progressBar.style.width = scrollPercent + "%";
    // Back to top button
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  // Back-to-top button
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});


// Hamburger menu toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  // Optional: change icon to X when open
  if (navLinks.classList.contains('show')) {
    navToggle.innerHTML = '&times;';
  } else {
    navToggle.innerHTML = '&#9776;';
  }
});
// Hide menu when a link is clicked (for better UX)
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) {
      navLinks.classList.remove('show');
      navToggle.innerHTML = '&#9776;';
    }
  });
});
