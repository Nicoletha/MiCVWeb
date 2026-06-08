/* script.js — CV Interactivo */

// ── CUSTOM CURSOR ──────────────────────────────────────────
const cursor = document.getElementById('cursor');
if (cursor) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.18;
    cursorY += dy * 0.18;
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Grow on hover of interactive elements
  document.querySelectorAll('a, button, .tag, .cert-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '28px';
      cursor.style.height = '28px';
      cursor.style.opacity = '0.35';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      cursor.style.opacity = '1';
    });
  });
}

// ── SCROLL REVEAL ──────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .card, .exp-item, .exp-quote, .summary-text');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.animationDelay = (idx * 0.08) + 's';
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// ── SKILL TAG HOVER RIPPLE ─────────────────────────────────
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,0.3);
      transform:scale(0);
      animation:ripple 0.5s linear;
      pointer-events:none;
      width:60px; height:60px;
      left:${e.offsetX - 30}px;
      top:${e.offsetY - 30}px;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ── INJECT RIPPLE KEYFRAME ─────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ── SECTION ACTIVE TRACKING ───────────────────────────────
// Subtle page title update as user scrolls
const sections = document.querySelectorAll('section, header, main');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tag = entry.target.querySelector('.section-tag');
      if (tag) {
        document.title = `${tag.textContent.replace(/\d+ — /, '')} — Nicol Gastelum`;
      } else {
        document.title = 'Nicol Amairani Gastelum Diaz — CV';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── LANGUAGE BAR ANIMATION ────────────────────────────────
// Re-trigger bar animation when it enters view
const bars = document.querySelectorAll('.lang-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'none';
      void entry.target.offsetWidth; // reflow
      entry.target.style.animation = '';
    }
  });
}, { threshold: 0.5 });
bars.forEach(b => barObserver.observe(b));

// ── PRINT SUPPORT ─────────────────────────────────────────
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.reveal, .card, .exp-item, .exp-quote, .summary-text').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// ===== COPIAR CORREO =====

const copyBtn = document.getElementById('copyEmail');

if(copyBtn){

  copyBtn.addEventListener('click', () => {

    navigator.clipboard.writeText(
      'ngastelumdiaz@gmail.com'
    );

    copyBtn.innerHTML = '✅ Copied';

    setTimeout(() => {
      copyBtn.innerHTML = '📋 Copy Email';
    }, 2000);

  });

}

// ===== BOTÓN SUBIR =====

const topBtn = document.getElementById('topBtn');

if(topBtn){

  topBtn.addEventListener('click', () => {

    window.scrollTo({
      top:0,
      behavior:'smooth'
    });

  });

}