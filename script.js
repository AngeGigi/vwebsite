/* script.js — moved from the combined file. Runs deferred. */

// === CONFIG & DEFAULTS ===
const defaultConfig = {
  background_color: '#fff0f3',
  surface_color: '#fffbfc',
  text_color: '#3a1a1a',
  primary_action_color: '#B22222',
  secondary_action_color: '#D4A847',
  font_family: 'Great Vibes',
  font_size: 16,
  hero_title: 'Happy Valentine\'s Day, My Love ❤️',
  hero_subtitle: 'A little surprise made with all my heart.',
  love_letter_greeting: 'My Dearest Love,',
  love_letter_body: 'Every moment with you feels like a dream I never want to wake up from. You are my sunrise, my favorite melody, and the reason my heart beats a little faster every single day.\n\nThank you for being the most beautiful chapter of my life. I promise to love you more with every heartbeat, today and always.',
  love_letter_closing: 'Forever & Always Yours 💋',
  surprise_question: 'Will You Be My Valentine?',
  surprise_message: 'You just made me the happiest person alive!'
};

// === FLOATING HEARTS ===
function createFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  if (!container) return;
  const hearts = ['❤', '💕', '💖', '💗', '♥', '🤍', '💘'];
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (12 + Math.random() * 22) + 'px';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = (Math.random() * 15) + 's';
    heart.style.opacity = (0.15 + Math.random() * 0.35);
    container.appendChild(heart);
  }
}
createFloatingHearts();

// === INTERSECTION OBSERVER FOR FADE-INS ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// === ENVELOPE ===
let envelopeOpened = false;
function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;
  const envelope = document.getElementById('envelope');
  const hint = document.getElementById('envelopeHint');
  const letterCard = document.getElementById('letterCard');
  if (!envelope) return;
  envelope.classList.add('opened');
  if (hint) hint.style.opacity = '0';
  setTimeout(() => {
    if (letterCard) letterCard.classList.add('show');
  }, 400);
}

// === RUNAWAY "NO" BUTTON ===
const btnNo = document.getElementById('btnNo');
const surpriseButtons = document.getElementById('surpriseButtons');

function moveNoButton() {
  if (!btnNo || !surpriseButtons) return;
  const parentRect = surpriseButtons.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const maxX = parentRect.width - btnRect.width;
  const maxY = 120;
  const randomX = (Math.random() - 0.5) * maxX;
  const randomY = (Math.random() - 0.5) * maxY;
  btnNo.style.position = 'relative';
  btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  btnNo.style.transition = 'transform 0.3s ease';
}

if (btnNo) {
  btnNo.addEventListener('mouseenter', moveNoButton);
  btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });
}

// === SAY YES ===
function sayYes() {
  const buttons = document.getElementById('surpriseButtons');
  const yesMsg = document.getElementById('yesMessage');
  triggerHeartExplosion();
  if (buttons) buttons.style.display = 'none';
  if (yesMsg) yesMsg.classList.add('show');
}

// === HEART EXPLOSION ===
function triggerHeartExplosion() {
  const container = document.getElementById('heartExplosion');
  if (!container) return;
  container.innerHTML = '';
  const hearts = ['❤️', '💖', '💕', '💗', '💘', '💝', '🌹', '✨'];
  for (let i = 0; i < 60; i++) {
    const heart = document.createElement('span');
    heart.className = 'explosion-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = '50%';
    heart.style.top = '50%';
    const angle = Math.random() * 360;
    const dist = 100 + Math.random() * 400;
    const tx = Math.cos(angle * Math.PI / 180) * dist;
    const ty = Math.sin(angle * Math.PI / 180) * dist;
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    heart.style.fontSize = (16 + Math.random() * 32) + 'px';
    heart.style.animationDelay = (Math.random() * 0.4) + 's';
    container.appendChild(heart);
  }
  setTimeout(() => { container.innerHTML = ''; }, 2500);
}

// === KEYBOARD SUPPORT FOR ENVELOPE ===
const envelopeEl = document.getElementById('envelope');
if (envelopeEl) {
  envelopeEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });
  envelopeEl.addEventListener('click', openEnvelope);
}

// Wire up CTA and YES button (no inline onclicks)
const ctaBtn = document.getElementById('ctaBtn');
if (ctaBtn) ctaBtn.addEventListener('click', () => { document.getElementById('letterSection').scrollIntoView({behavior: 'smooth'}); });
const btnYes = document.getElementById('btnYes');
if (btnYes) btnYes.addEventListener('click', sayYes);

// === SIMPLE LIGHTBOX FOR POLAROID IMAGES ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt, caption) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxCaption.textContent = caption || alt || '';
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  // clear src to release memory
  if (lightboxImg) lightboxImg.src = '';
}

document.querySelectorAll('.polaroid-thumb').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.src, img.alt, img.dataset.caption || img.alt);
  });
});

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    // close when clicking backdrop or close button
    if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// === ELEMENT SDK helpers / styling application ===
function applyConfig(config) {
  const bg = config.background_color || defaultConfig.background_color;
  const surface = config.surface_color || defaultConfig.surface_color;
  const textCol = config.text_color || defaultConfig.text_color;
  const primary = config.primary_action_color || defaultConfig.primary_action_color;
  const secondary = config.secondary_action_color || defaultConfig.secondary_action_color;
  const fontFamily = config.font_family || defaultConfig.font_family;
  const baseSize = config.font_size || defaultConfig.font_size;
  const baseFontStack = 'Lora, Georgia, serif';
  const headingStack = `${fontFamily}, cursive`;

  // Background
  const appWrapper = document.getElementById('appWrapper');
  if (appWrapper) appWrapper.style.background = `linear-gradient(170deg, ${bg} 0%, ${adjustColor(bg, -10)} 50%, ${adjustColor(bg, -20)} 100%)`;

  // Hero section
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.style.background = `
      radial-gradient(ellipse at 20% 50%, ${hexToRgba(primary, 0.08)} 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, ${hexToRgba(primary, 0.12)} 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, ${hexToRgba(secondary, 0.08)} 0%, transparent 50%),
      linear-gradient(180deg, ${bg} 0%, ${adjustColor(bg, -15)} 100%)
    `;
  }

  // Colors
  document.documentElement.style.setProperty('--deep-red', primary);
  document.documentElement.style.setProperty('--gold', secondary);

  // Text colors
  document.body.style.color = textCol;
  document.querySelectorAll('.hero-title, .section-heading, .letter-greeting, .letter-closing, .surprise-question, .yes-msg-text').forEach(el => {
    el.style.color = primary;
  });
  document.querySelectorAll('.hero-subtitle, .letter-body-text, .timeline-text, .polaroid-caption, .footer-text').forEach(el => {
    el.style.color = adjustColor(textCol, 40);
  });
  document.querySelectorAll('.timeline-date').forEach(el => {
    el.style.color = secondary;
  });

  // Surface (letter card)
  const letterCard = document.getElementById('letterCard');
  if (letterCard) {
    letterCard.style.background = `linear-gradient(170deg, ${surface}, ${adjustColor(surface, -5)})`;
  }

  // Buttons
  const cta = document.getElementById('ctaBtn');
  if (cta) cta.style.background = `linear-gradient(135deg, ${adjustColor(primary, 20)}, ${primary})`;

  const yesBtn = document.getElementById('btnYes');
  if (yesBtn) yesBtn.style.background = `linear-gradient(135deg, ${adjustColor(primary, 20)}, ${primary})`;

  // Fonts — headings
  document.querySelectorAll('.hero-title, .section-heading, .letter-greeting, .letter-closing, .surprise-question, .yes-msg-text, .polaroid-caption').forEach(el => {
    el.style.fontFamily = headingStack;
  });

  // Fonts — body
  document.querySelectorAll('.hero-subtitle, .letter-body-text, .timeline-text, .timeline-date, .footer-text, .cta-button, .btn-yes, .btn-no, .envelope-hint').forEach(el => {
    el.style.fontFamily = `${fontFamily}, ${baseFontStack}`;
  });

  // Font sizing
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.style.fontSize = `clamp(${baseSize * 2.2}px, 8vw, ${baseSize * 4.5}px)`;
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) heroSubtitle.style.fontSize = `clamp(${baseSize * 0.87}px, 3vw, ${baseSize * 1.25}px)`;
  document.querySelectorAll('.section-heading').forEach(el => {
    el.style.fontSize = `clamp(${baseSize * 2}px, 6vw, ${baseSize * 3.2}px)`;
  });
  const letterGreeting = document.querySelector('.letter-greeting');
  if (letterGreeting) letterGreeting.style.fontSize = `${baseSize * 2}px`;
  const letterBody = document.querySelector('.letter-body-text');
  if (letterBody) letterBody.style.fontSize = `${baseSize}px`;
  const letterClosing = document.querySelector('.letter-closing');
  if (letterClosing) letterClosing.style.fontSize = `${baseSize * 1.6}px`;
  const surpriseQuestion = document.querySelector('.surprise-question');
  if (surpriseQuestion) surpriseQuestion.style.fontSize = `clamp(${baseSize * 1.9}px, 7vw, ${baseSize * 3.5}px)`;
  const footerText = document.querySelector('.footer-text');
  if (footerText) footerText.style.fontSize = `${baseSize * 0.87}px`;

  // Text content
  const heroTitleEl = document.getElementById('heroTitle'); if (heroTitleEl) heroTitleEl.textContent = config.hero_title || defaultConfig.hero_title;
  const heroSubtitleEl = document.getElementById('heroSubtitle'); if (heroSubtitleEl) heroSubtitleEl.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
  const greetingEl = document.getElementById('letterGreeting'); if (greetingEl) greetingEl.textContent = config.love_letter_greeting || defaultConfig.love_letter_greeting;
  const bodyEl = document.getElementById('letterBody'); if (bodyEl) bodyEl.textContent = config.love_letter_body || defaultConfig.love_letter_body;
  const closingEl = document.getElementById('letterClosing'); if (closingEl) closingEl.textContent = config.love_letter_closing || defaultConfig.love_letter_closing;
  const surpriseQEl = document.getElementById('surpriseQuestion'); if (surpriseQEl) surpriseQEl.textContent = config.surprise_question || defaultConfig.surprise_question;
  const yesMsgEl = document.getElementById('yesMsgText'); if (yesMsgEl) yesMsgEl.textContent = config.surprise_message || defaultConfig.surprise_message;
}

// Color utility: lighten/darken hex color
function adjustColor(hex, amount) {
  hex = (hex || '').replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  if (hex.length !== 6) return hex;
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

function hexToRgba(hex, alpha) {
  hex = (hex || '').replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// === INITIALIZE ELEMENT SDK ===
if (window.elementSdk && window.elementSdk.init) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      applyConfig(config);
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } }
      ],
      borderables: [],
      fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
      fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_title', config.hero_title || defaultConfig.hero_title],
      ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
      ['love_letter_greeting', config.love_letter_greeting || defaultConfig.love_letter_greeting],
      ['love_letter_body', config.love_letter_body || defaultConfig.love_letter_body],
      ['love_letter_closing', config.love_letter_closing || defaultConfig.love_letter_closing],
      ['surprise_question', config.surprise_question || defaultConfig.surprise_question],
      ['surprise_message', config.surprise_message || defaultConfig.surprise_message]
    ])
  });
}

/* small injected iframe script from original file (kept as-is) */
(function(){
  function c(){
    var b=a.contentDocument||a.contentWindow.document;
    if(b){
      var d=b.createElement('script');
      d.innerHTML="window.__CF$cv$params={r:'9ccc5920675a04f2',t:'MTc3MDkwMjA1Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName('head')[0].appendChild(d);
    }
  }
  if(document.body){
    var a=document.createElement('iframe');
    a.height=1; a.width=1; a.style.position='absolute'; a.style.top=0; a.style.left=0; a.style.border='none'; a.style.visibility='hidden';
    document.body.appendChild(a);
    if('loading'!==document.readyState) c();
    else if(window.addEventListener) document.addEventListener('DOMContentLoaded', c);
    else {
      var e=document.onreadystatechange||function(){};
      document.onreadystatechange=function(b){ e(b); 'loading'!==document.readyState && (document.onreadystatechange=e, c()); }
    }
  }
})();
