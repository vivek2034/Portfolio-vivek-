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
  // ...inside DOMContentLoaded or after your other code...
  const toggle = document.getElementById('dark-mode-toggle');
  const darkIcon = document.getElementById('dark-icon');
  const body = document.body;

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkIcon.textContent = '☀️';
    darkIcon.className = 'icon-sun';
  } else {
    darkIcon.textContent = '🌙';
    darkIcon.className = 'icon-moon';
  }

  toggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkIcon.textContent = '☀️';
      darkIcon.className = 'icon-sun';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkIcon.textContent = '🌙';
      darkIcon.className = 'icon-moon';
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

// Starfield animation for dark mode
function galacticStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  let stars = [];
  for(let i=0; i<100; i++){
    stars.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.6+0.5,
      dx: (Math.random()-0.5)*0.05,
      dy: (Math.random()-0.5)*0.05,
      glow: Math.random()*12+8
    });
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      ctx.save();
      ctx.shadowBlur = s.glow;
      ctx.shadowColor = "#7aa2f7";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.restore();
      s.x += s.dx; s.y += s.dy;
      if(s.x<0) s.x=w; if(s.x>w) s.x=0;
      if(s.y<0) s.y=h; if(s.y>h) s.y=0;
    }
    if(document.body.classList.contains("dark-mode")) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,w,h);
  }
  draw();
  window.addEventListener('resize', ()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
}
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', function() {
  setTimeout(()=>{
    if(document.body.classList.contains('dark-mode')) galacticStarfield();
    else {
      const canvas = document.getElementById('starfield');
      if(canvas) canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
    }
  }, 400);
});
// Start starfield if page loads in dark mode
if(document.body.classList.contains('dark-mode')) galacticStarfield();

// Custom animated cursor
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
let cursorX = mouseX, cursorY = mouseY;
let scale = 1;

// Move the cursor toward the mouse smoothly
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.opacity = 0.85;
});
document.addEventListener('mousedown', () => {
  scale = 1.5;
  cursor.style.opacity = 1;
});
document.addEventListener('mouseup', () => {
  scale = 1;
  cursor.style.opacity = 0.85;
});

// Hide when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = 0;
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = 0.85;
});

// Optional: Hide on touch devices
if ('ontouchstart' in window) cursor.style.display = 'none';

// Optional: Switch appearance on dark mode toggle
const observer = new MutationObserver(() => {
  // Just triggers the CSS to update on body class change
  cursor.className = '';
});
observer.observe(document.body, {attributes:true, attributeFilter:['class']});


if (!('ontouchstart' in window)) {
  document.body.style.cursor = 'none';
}
