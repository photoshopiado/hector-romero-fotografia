/* Proyectos reales de https://www.behance.net/Photoshopiado */
const CDN = 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/';
const PROJECTS = [
  { t:'Xiaomi 15 Pro+',            c:'Campaña',     id:'254260689/XIAOMI-15-PRO-',  img:'1d2d9d254260689.Y3JvcCw0NjcyLDM2NTQsMCwxNjc2.jpg' },
  { t:'Xiaomi 15 Pro+ Influencer', c:'Campaña',     id:'254260627/XIAOMI-15-PRO-INFLUENCER', img:'962f44254260627.Y3JvcCw0NjcyLDM2NTQsMCwxNjc2.jpg' },
  { t:'Xiaomi 15 Pro+ Chef',       c:'Campaña',     id:'254260583/XIAMO-15-PRO-chef', img:'733397254260583.Y3JvcCw0NjcyLDM2NTQsMCwxNjc2.jpg' },
  { t:'Xiaomi 17 Mundialista EC',  c:'Campaña',     id:'254259909/XIAOMI-17-MUNDIALISTA-EC', img:'1c8a3d254259909.Y3JvcCwzMDcyLDI0MDIsMCwxNDQ0.jpg' },
  { t:'Chosen Bar',                c:'Gastronomía', id:'240360963/Chosen-Bar',      img:'bdc605240360963.Y3JvcCwxOTk5LDE1NjQsMCw4MTE.jpg' },
  { t:'Osaka Nikkei',              c:'Gastronomía', id:'240358761/OSAKA-NIKKEI',    img:'c80f88240358761.Y3JvcCwzMDcyLDI0MDIsMCwxMTAy.jpg' },
  { t:'Chuan Yu Ramen',            c:'Gastronomía', id:'240237019/Chuan-Yu-Ramen',  img:'48fcd2240237019.Y3JvcCwxNTY2LDEyMjUsMjY3LDM3Ng.jpg' },
  { t:'21 Bit Coffee',             c:'Gastronomía', id:'240236673/21-bit-coffee',   img:'e538c7240236673.Y3JvcCwzOTk5LDMxMjgsMCwyMzU2.jpg' },
  { t:'Rosen Bee',                 c:'Gastronomía', id:'240236285/Rosen-Bee',       img:'99e03d240236285.Y3JvcCwzMDcyLDI0MDIsMCwxMDk0.jpg' },
  { t:'Juan Valdez · Milkshake',   c:'Producto',    id:'195288911/Red-Velvet-Chocolate-Juan-Valdez-New-Milkshake-Line', img:'3f275f195288911.Y3JvcCwzMDg0LDI0MTIsNjcxLDQ1OA.jpg' },
  { t:'Casa Res · En su punto',    c:'Gastronomía', id:'222284293/CASA-RES-EN-SU-PUNTO', img:'8ad8ff222284293.Y3JvcCwxMjg2LDEwMDYsMTI3LDkwNw.jpg' },
  { t:'Federer Stylist',           c:'Gastronomía', id:'222283795/FEDERER-STYLIST', img:'f57e54222283795.Y3JvcCwzMTM3LDI0NTMsMCwxMzM1.jpg' }
];

const pad = n => String(n).padStart(2, '0');
const track = document.getElementById('track');
const imgSrc = p => 'img/' + p.img;
const imgFallback = p => 'img/' + p.img;

track.innerHTML = PROJECTS.map((p, i) => `
  <a class="card" href="https://www.behance.net/gallery/${p.id}" target="_blank" rel="noopener" data-cursor="Ver más">
    <div class="card__media">
      <span class="card__num">${pad(i + 1)} / ${pad(PROJECTS.length)}</span>
      <span class="card__go">↗</span>
      <img src="${imgSrc(p)}" alt="${p.t}: fotografía ${p.c.toLowerCase()} por Héctor Romero, Quito" width="808" loading="lazy" onerror="this.onerror=null;this.src='${imgFallback(p)}'">
    </div>
    <div class="card__info"><h3>${p.t}</h3><span>${p.c}</span></div>
  </a>`).join('') + `
  <a class="card card--all" href="https://www.behance.net/Photoshopiado" target="_blank" rel="noopener" data-cursor="Behance">
    <div class="card__media"><div class="big">Ver todo<em>en Behance</em></div></div>
    <div class="card__info"><h3>Portafolio completo</h3><span>↗</span></div>
  </a>`;


document.getElementById('year').textContent = new Date().getFullYear();
const clock = document.getElementById('clock');
const tick = () => clock.textContent = new Date().toLocaleTimeString('es-EC', { hour:'2-digit', minute:'2-digit', timeZone:'America/Guayaquil' });
tick(); setInterval(tick, 20000);

gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('is-loading');

/* smooth scroll */
const lenis = new Lenis({ lerp: reduce ? 1 : 0.085 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
window.lenis = lenis;
lenis.stop();
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); lenis.scrollTo(t, { duration: 1.6 }); }
}));

/* split helpers */
function splitChars(el) {
  const txt = el.textContent; el.textContent = '';
  el.setAttribute('aria-label', txt);
  return [...txt].map(c => {
    const s = document.createElement('span'); s.className = 'ch'; s.setAttribute('aria-hidden', 'true');
    s.textContent = c === ' ' ? ' ' : c; el.appendChild(s); return s;
  });
}
function splitWords(el) {
  const raw = el.textContent.trim().split(/\s+/), words = [];
  raw.forEach((w, i) => { if (i && raw[i - 1].length <= 3 && words.length && words[words.length - 1].short) { words[words.length - 1] = { t: words[words.length - 1].t + ' ' + w, short: w.length <= 3 }; } else words.push({ t: w, short: w.length <= 3 }); });
  el.textContent = '';
  return words.map(w => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w.t; el.appendChild(s); el.append(' '); return s; });
}

/* hero + titles: chars rise */
const heroChars = [...document.querySelectorAll('.hero__title .split')].flatMap(splitChars);
gsap.set(heroChars, { yPercent: 115, rotate: 6 });

/* loader */
const count = document.getElementById('count');
const bar = document.querySelector('.loader__bar i');
const state = { v: 0 };
const intro = gsap.timeline();
intro
  .to(state, { v: 100, duration: reduce ? .3 : 2.2, ease: 'power2.inOut', onUpdate: () => {
      count.textContent = Math.round(state.v); bar.style.width = state.v + '%'; } })
  .to('.loader__count, .loader__top', { yPercent: -30, opacity: 0, duration: .6, ease: 'power3.in' }, '+=.1')
  .to('.loader', { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=.2')
  .add(() => { document.body.classList.remove('is-loading'); lenis.start(); }, '-=.5')
  .to(heroChars, { yPercent: 0, rotate: 0, duration: 1.3, ease: 'expo.out', stagger: .045 }, '-=.6')
  .from('.hero__meta > *, .hero__foot > *, .nav > *', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08 }, '-=.9');

/* destacados: slideshow con wipe */
const FEATURED = [5, 6, 7, 4, 9].map(i => PROJECTS[i]).map(p => ({ ...p, t: p.t.split(' · ')[0] }));
const slidesEl = document.getElementById('slides'), titlesEl = document.getElementById('showTitles');
slidesEl.innerHTML = FEATURED.map(p => `
  <a class="slide" href="https://www.behance.net/gallery/${p.id}" target="_blank" rel="noopener" data-cursor="Ver más" aria-label="${p.t} en Behance">
    <img src="${imgSrc(p)}" alt="${p.t}: fotografía ${p.c.toLowerCase()} por Héctor Romero, Quito" onerror="this.onerror=null;this.src='${imgFallback(p)}'">
  </a>`).join('');
titlesEl.innerHTML = FEATURED.map(p => `<h3 class="show__t">${p.t}</h3>`).join('');
const slides = gsap.utils.toArray('.slide'), tEls = gsap.utils.toArray('.show__t');
gsap.set(tEls, { yPercent: 110 }); gsap.set(tEls[0], { yPercent: 0 });
gsap.set(slides.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
gsap.set(slides.map(s => s.querySelector('img')), { scale: 1.25 });
gsap.set(slides[0].querySelector('img'), { scale: 1 });
const showCount = document.getElementById('showCount'), showCat = document.getElementById('showCat');
showCat.textContent = FEATURED[0].c;
let cur = 0;
const showTl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#show', start: 'top top', end: '+=' + (FEATURED.length - 1) * 110 + '%', scrub: .7, pin: '.show__pin', anticipatePin: 1,
  onUpdate: self => {
    const i = Math.min(FEATURED.length - 1, Math.round(self.progress * (FEATURED.length - 1)));
    if (i === cur) return;
    gsap.to(tEls[cur], { yPercent: i > cur ? -110 : 110, duration: .6, ease: 'expo.inOut', overwrite: true });
    gsap.fromTo(tEls[i], { yPercent: i > cur ? 110 : -110 }, { yPercent: 0, duration: .8, ease: 'expo.out', overwrite: true });
    cur = i; showCount.textContent = pad(i + 1) + ' / ' + pad(FEATURED.length); showCat.textContent = FEATURED[i].c;
  } } });
slides.forEach((s, i) => {
  if (i === 0) return;
  showTl.to(s, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, i - 1)
        .to(s.querySelector('img'), { scale: 1, duration: 1 }, i - 1)
        .to(slides[i - 1].querySelector('img'), { yPercent: -8, duration: 1 }, i - 1);
});

/* parallax hero out */
gsap.to('.hero__title', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

/* manifest: word by word */
const words = splitWords(document.getElementById('manifest'));
gsap.to(words, { opacity: 1, stagger: .1, ease: 'none',
  scrollTrigger: { trigger: '#manifest', start: 'top 80%', end: 'bottom 55%', scrub: true } });

/* section titles */
['.work__head h2 .split', '.services__title .split', '.exp__title .split', '.contact__title .split'].forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    const parent = el.closest('h2');
    gsap.from(el, { yPercent: 110, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: parent, start: 'top 85%' } });
  });
});
document.querySelectorAll('.contact__title .line, .work__head h2, .services__title, .exp__title').forEach(el => { el.style.overflow = 'hidden'; });

/* work: horizontal scroll on desktop */
const mm = gsap.matchMedia();
mm.add('(min-width: 900px)', () => {
  const dist = () => track.scrollWidth - window.innerWidth;
  const tween = gsap.to(track, { x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '.work', start: 'top top', end: () => '+=' + dist(), pin: '.work__pin', scrub: .8, invalidateOnRefresh: true, anticipatePin: 1 } });
  gsap.utils.toArray('.card__media img').forEach(img => {
    gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none',
      scrollTrigger: { trigger: img.closest('.card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
  });
});
mm.add('(max-width: 899px)', () => {
  gsap.utils.toArray('.card').forEach(c => gsap.from(c, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%' } }));
  gsap.utils.toArray('.card__media img').forEach(img => {
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.closest('.card'), scrub: true } });
  });
});

/* marquee de logos: avanza siempre y se acelera con el scroll */
const mq = document.querySelector('.marquee__in');
let mqX = 0, mqDir = -1;
gsap.ticker.add((time, dt) => {
  const half = mq.scrollWidth / 2;
  if (!half) return;
  const v = lenis.velocity || 0;
  if (Math.abs(v) > 0.2) mqDir = v > 0 ? -1 : 1;
  const speed = reduce ? 0 : 70 + Math.min(Math.abs(v), 40) * 14;
  mqX += mqDir * speed * (dt / 1000);
  if (mqX <= -half) mqX += half;
  if (mqX > 0) mqX -= half;
  mq.style.transform = `translate3d(${mqX}px,0,0)`;
});

/* lists reveal */
gsap.utils.toArray('.services__list li, .exp__list li').forEach(li => {
  gsap.from(li, { opacity: 0, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 92%' } });
});
gsap.from('.skills span', { opacity: 0, y: 20, stagger: .06, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.skills', start: 'top 90%' } });
gsap.from('.contact__row .btn', { opacity: 0, y: 30, stagger: .1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.contact__row', start: 'top 92%' } });

/* custom cursor + magnet */
if (matchMedia('(hover:hover)').matches) {
  const cur = document.querySelector('.cursor'), lab = cur.querySelector('.cursor__label');
  const xTo = gsap.quickTo(cur, 'x', { duration: .35, ease: 'power3' }), yTo = gsap.quickTo(cur, 'y', { duration: .35, ease: 'power3' });
  addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); });
  document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => { lab.textContent = el.dataset.cursor; cur.classList.add('is-big'); });
    el.addEventListener('mouseleave', () => cur.classList.remove('is-big'));
  });
  document.querySelectorAll('[data-magnet]').forEach(el => {
    const mx = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1,.5)' }), my = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1,.5)' });
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .3); my((e.clientY - r.top - r.height / 2) * .4); });
    el.addEventListener('mouseleave', () => { mx(0); my(0); });
  });
}

addEventListener('load', () => ScrollTrigger.refresh());

/* botón Behance: compacto al bajar, completo arriba */
const cta = document.querySelector('.nav__cta');
const toggleCta = () => cta.classList.toggle('is-compact', window.scrollY > 80);
addEventListener('scroll', toggleCta, { passive: true });
toggleCta();


/* aka @photoshopiado: onda suave en las letras + partículas crema */
(() => {
  const aka = document.querySelector('.aka');
  if (!aka || reduce) return;
  const chars = [...aka.querySelectorAll('.ch')];
  const cv = document.createElement('canvas'); cv.className = 'fx'; cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cv);
  const ctx = cv.getContext('2d');
  let dpr = 1, parts = [];
  const resize = () => { dpr = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; };
  resize(); addEventListener('resize', resize);
  const spawn = (x, y, burst) => {
    const a = Math.random() * Math.PI * 2, s = burst ? 1 + Math.random() * 3.2 : .4 + Math.random() * 1.4;
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (burst ? 0 : .8), r: .8 + Math.random() * 2.2, life: 1, d: .012 + Math.random() * .016, plus: Math.random() < .18 });
  };
  const burst = () => {
    const r = aka.getBoundingClientRect();
    for (let i = 0; i < 46; i++) spawn(r.left + Math.random() * r.width, r.top + r.height * (.3 + Math.random() * .5), true);
  };
  gsap.ticker.add(() => {
    if (!parts.length) { if (cv.dataset.dirty) { ctx.clearRect(0, 0, cv.width, cv.height); delete cv.dataset.dirty; } return; }
    cv.dataset.dirty = '1';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = ctx.strokeStyle = '#efe9dc';
    parts = parts.filter(p => p.life > 0);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vx *= .965; p.vy = p.vy * .965 - .012; p.life -= p.d;
      ctx.globalAlpha = Math.max(p.life, 0);
      if (p.plus) { ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x - 3, p.y); ctx.lineTo(p.x + 3, p.y); ctx.moveTo(p.x, p.y - 3); ctx.lineTo(p.x, p.y + 3); ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
    });
    ctx.globalAlpha = 1;
  });
  aka.addEventListener('pointerenter', () => {
    burst();
    gsap.fromTo(chars, { y: 0 }, { y: -7, duration: .22, ease: 'power2.out', yoyo: true, repeat: 1, stagger: .025, overwrite: true });
  });
  aka.addEventListener('pointermove', e => { for (let i = 0; i < 2; i++) spawn(e.clientX + (Math.random() - .5) * 14, e.clientY + (Math.random() - .5) * 8, false); });
  // cada letra se levanta cuando el puntero pasa por encima
  chars.forEach(c => {
    c.addEventListener('pointerenter', () => gsap.fromTo(c, { y: 0 }, { y: -10, duration: .18, ease: 'power2.out', yoyo: true, repeat: 1, overwrite: true }));
  });
})();
