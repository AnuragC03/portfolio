import { navHTML } from './components/nav.js';
import { footerHTML } from './components/footer.js';
import { heroSection } from './sections/hero.js';
import { aboutSection } from './sections/about.js';
import { skillsSection } from './sections/skills.js';
import { projectsSection } from './sections/projects.js';
import { contactSection } from './sections/contact.js';

const app = document.getElementById('app');
app.innerHTML = `<div class="app-shell">${navHTML}${heroSection}${aboutSection}${skillsSection}${projectsSection}${contactSection}${footerHTML}</div>`;

const canvas = document.getElementById('bg-canvas');
const cursorGlow = document.getElementById('cursor-glow');
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

if (canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let particles = [];

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.6,
    }));
  };

  const animate = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

      if (pointer.active) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 140) {
          particle.x -= dx * 0.004;
          particle.y -= dy * 0.004;
        }
      }

      const pulse = 1 + Math.sin((particle.x + particle.y + Date.now() * 0.001) * 0.01) * 0.08;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - distance / 110)})`;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
  window.addEventListener('pointerleave', () => {
    pointer.active = false;
    cursorGlow.style.opacity = '0';
  });
  window.addEventListener('blur', () => {
    pointer.active = false;
    cursorGlow.style.opacity = '0';
  });

  resizeCanvas();
  animate();
}

AOS.init({
  duration: 900,
  once: true,
});

document.getElementById('year').textContent = new Date().getFullYear();

const cards = document.querySelectorAll('.card, .about-card, .contact-card');

cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 18;
    const rotateX = ((y / rect.height) - 0.5) * -18;

    card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(14px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1400px) translateZ(0)';
  });
});

const navLinks = document.querySelectorAll('.main-nav a');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const sections = document.querySelectorAll('section[id]');
const header = document.querySelector('.site-header');

menuToggle?.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

[...navLinks, ...mobileNavLinks].forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id;
    const link = document.querySelector(`.main-nav a[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLinks.forEach((nav) => nav.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0.2,
});

sections.forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
