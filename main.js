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

/* hero: al pasar el mouse, "HÉCTOR Romero" se vuelve nube de partículas */
function heroDust() {
  if (reduce || !matchMedia('(hover:hover)').matches) return;
  const nameChars = [...document.querySelectorAll('.hero__title .split:not(.aka) .ch')];
  let cv, ctx, P = [], N = 0, W = 0, H = 0, dpr = 1, dotR = 2, box = null, ready = false;
  let active = false, running = false, lastIn = 0;
  const R = 120;
  const mouse = { x: -999, y: -999 };

  const build = () => {
    W = innerWidth; H = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
    const off = document.createElement('canvas'); off.width = W; off.height = H;
    const o = off.getContext('2d', { willReadFrequently: true });
    o.fillStyle = '#000'; o.textBaseline = 'alphabetic';
    let minFont = 999, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    document.querySelectorAll('.hero__title .split:not(.aka)').forEach(group => {
      const probe = document.createElement('span');
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
      group.appendChild(probe);
      const baseline = probe.getBoundingClientRect().bottom; probe.remove();
      group.querySelectorAll('.ch').forEach(ch => {
        const cs = getComputedStyle(ch), r = ch.getBoundingClientRect(), size = parseFloat(cs.fontSize);
        minFont = Math.min(minFont, size);
        o.font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
        o.fillText(cs.textTransform === 'uppercase' ? ch.textContent.toUpperCase() : ch.textContent, r.left, baseline);
        x0 = Math.min(x0, r.left); x1 = Math.max(x1, r.right); y0 = Math.min(y0, r.top); y1 = Math.max(y1, r.bottom);
      });
    });
    box = { x0: x0 - 30, y0: y0 - 20, x1: x1 + 30, y1: y1 + 20 };
    let step = Math.max(2, Math.round(W / 480)), pts = [];
    for (let tries = 0; tries < 4; tries++) {
      const data = o.getImageData(0, 0, W, H).data; pts = [];
      const hs = step >> 1;
      for (let y = 0; y < H - step; y += step) for (let x = 0; x < W - step; x += step) if (data[((y + hs) * W + x + hs) * 4 + 3] > 110) pts.push(x + step / 2, y + step / 2);
      if (pts.length / 2 <= 26000) break;
      step++;
    }
    N = pts.length / 2; dotR = Math.max(1, step * .55);
    P = Array.from({ length: N }, (_, i) => ({ hx: pts[i * 2], hy: pts[i * 2 + 1], x: pts[i * 2], y: pts[i * 2 + 1], vx: 0, vy: 0 }));
    if (!cv) {
      cv = document.createElement('canvas'); cv.className = 'fx fx--intro'; cv.setAttribute('aria-hidden', 'true'); cv.style.opacity = 0;
      document.body.appendChild(cv); ctx = cv.getContext('2d');
    }
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ready = true;
  };

  const frame = () => {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#efe9dc'; ctx.beginPath();
    let moving = 0;
    for (let i = 0; i < N; i++) {
      const p = P[i];
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (active && d2 < R * R) {
        const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 5.5;
        p.vx += (dx / d) * f + (Math.random() - .5) * .8; p.vy += (dy / d) * f + (Math.random() - .5) * .8;
      }
      p.vx += (p.hx - p.x) * .055; p.vy += (p.hy - p.y) * .055;
      p.vx *= .84; p.vy *= .84; p.x += p.vx; p.y += p.vy;
      if (Math.abs(p.vx) + Math.abs(p.vy) > .08 || Math.abs(p.hx - p.x) + Math.abs(p.hy - p.y) > .8) moving++;
      ctx.rect(p.x - dotR, p.y - dotR, dotR * 2, dotR * 2);
    }
    ctx.fill();
    if (!active && !moving && performance.now() - lastIn > 400) stop();
  };

  const start = () => {
    if (!running) { running = true; gsap.ticker.add(frame); frame(); }   // dibuja ya, sin esperar al siguiente cuadro
    gsap.killTweensOf(cv);
    cv.style.opacity = 1;                 // los puntos cubren el texto exactamente...
    gsap.set(nameChars, { opacity: 0 });  // ...y en el mismo instante se oculta el texto: sin superposición
  };
  const stop = () => {
    running = false; gsap.ticker.remove(frame);
    // el texto vuelve debajo de los puntos (que siguen opacos) y luego los puntos se desvanecen
    gsap.set(nameChars, { opacity: 1 });
    gsap.to(cv, { opacity: 0, duration: .5, ease: 'power1.inOut', overwrite: true, onComplete: () => ctx.clearRect(0, 0, W, H) });
  };

  addEventListener('pointermove', e => {
    if (!ready || scrollY > 30) { active = false; return; }
    mouse.x = e.clientX; mouse.y = e.clientY;
    const inside = e.clientX > box.x0 && e.clientX < box.x1 && e.clientY > box.y0 && e.clientY < box.y1;
    if (inside) { lastIn = performance.now(); active = true; start(); } else active = false;
  }, { passive: true });
  document.addEventListener('pointerleave', () => { active = false; });
  addEventListener('resize', () => { if (!running) build(); });
  document.fonts.ready.then(build).catch(e => console.error('heroDust', e));
}

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
  .from('.hero__meta > *, .hero__foot > *, .nav > *', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08 }, '-=.9')
  .add(heroDust);

/* destacados: carrusel 3D (flechas, teclado y gesto de arrastre) */
(() => {
  const FEATURED = [5, 6, 7, 4, 9].map(i => PROJECTS[i]).map(p => ({ ...p, t: p.t.split(' · ')[0] }));
  const N = FEATURED.length, HALF = Math.floor(N / 2);
  const ring = document.getElementById('scRing'), stage = document.getElementById('scStage');
  const titlesEl = document.getElementById('showTitles');
  const countEl = document.getElementById('showCount'), catEl = document.getElementById('showCat'), linkEl = document.getElementById('showLink');
  const url = p => 'https://www.behance.net/gallery/' + p.id;

  ring.innerHTML = FEATURED.map((p, i) => `
    <a class="sc__card" href="${url(p)}" target="_blank" rel="noopener" data-i="${i}" data-cursor="Ver más" draggable="false">
      <img src="${imgSrc(p)}" alt="${p.t}: fotografía ${p.c.toLowerCase()} por Héctor Romero, Quito" draggable="false" onerror="this.onerror=null;this.src='${imgFallback(p)}'">
      <span class="sc__shade"></span>
      <span class="sc__tag">${pad(i + 1)} / ${pad(N)}</span>
      <span class="sc__name">${p.t}</span>
    </a>`).join('');
  titlesEl.innerHTML = FEATURED.map(p => `<h3 class="sc__t">${p.t}</h3>`).join('');
  const cards = [...ring.children], tEls = [...titlesEl.children];
  gsap.set(tEls, { yPercent: 115 });

  let cur = 0, cw = cards[0].offsetWidth || 300, first = true;
  const offOf = i => ((i - cur + N + HALF) % N) - HALF;
  const stateFor = off => {
    const a = Math.abs(off), s = Math.sign(off);
    return {
      x: s * (a === 0 ? 0 : a === 1 ? cw * .68 : cw * 1.08),
      z: a === 0 ? 0 : a === 1 ? -cw * .5 : -cw * 1.05,
      rotationY: s * (a === 0 ? 0 : a === 1 ? 52 : 64),
      scale: a === 0 ? 1 : a === 1 ? .94 : .86,
      opacity: a > HALF ? 0 : 1
    };
  };
  const shadeOf = a => (a === 0 ? 0 : a === 1 ? .45 : .7);
  const layout = (animate) => {
    cw = cards[0].offsetWidth || cw;
    cards.forEach((card, i) => {
      const off = offOf(i), old = card._off, st = stateFor(off), a = Math.abs(off);
      card.style.zIndex = 10 - a;
      card.dataset.cursor = off === 0 ? 'Ver más' : 'Ir';
      card.setAttribute('aria-current', off === 0 ? 'true' : 'false');
      card.tabIndex = off === 0 ? 0 : -1;
      const shade = card.querySelector('.sc__shade');
      if (!animate || old === undefined) {
        gsap.set(card, { xPercent: -50, yPercent: -50, ...st });
        gsap.set(shade, { opacity: shadeOf(a) });
      } else {
        // si la tarjeta tiene que dar la vuelta por detrás, aparece desde el lado opuesto
        if (Math.abs(off - old) > HALF + .5) gsap.set(card, { ...stateFor(Math.sign(off) * (HALF + 1)), opacity: 0 });
        gsap.to(card, { ...st, duration: .95, ease: 'power3.inOut', overwrite: true });
        gsap.to(shade, { opacity: shadeOf(a), duration: .95, ease: 'power3.inOut', overwrite: true });
        if (off === 0) gsap.fromTo(card, { filter: 'blur(5px)' }, { filter: 'blur(0px)', duration: .9, ease: 'power2.out', clearProps: 'filter' });
      }
      card._off = off;
    });
  };
  const setInfo = prev => {
    const p = FEATURED[cur];
    countEl.textContent = pad(cur + 1) + ' / ' + pad(N);
    catEl.textContent = p.c; linkEl.href = url(p);
    if (first) { gsap.set(tEls[cur], { yPercent: 0 }); return; }
    const dir = ((cur - prev + N + HALF) % N) - HALF > 0 ? 1 : -1;
    gsap.to(tEls[prev], { yPercent: -115 * dir, duration: .6, ease: 'expo.inOut', overwrite: true });
    gsap.fromTo(tEls[cur], { yPercent: 115 * dir }, { yPercent: 0, duration: .85, ease: 'expo.out', overwrite: true });
  };
  const goTo = i => {
    const prev = cur; cur = (i + N) % N;
    if (cur === prev) return;
    first = false; layout(true); setInfo(prev);
  };
  layout(false); setInfo(0); first = false;

  document.getElementById('scPrev').addEventListener('click', () => goTo(cur - 1));
  document.getElementById('scNext').addEventListener('click', () => goTo(cur + 1));

  // clic: la tarjeta central abre Behance; las laterales se traen al centro
  let moved = false;
  ring.addEventListener('click', e => {
    const card = e.target.closest('.sc__card'); if (!card) return;
    const i = +card.dataset.i;
    if (moved || i !== cur) { e.preventDefault(); if (!moved) goTo(i); }
  });
  // arrastre / gesto táctil
  let sx = 0, down = false;
  stage.addEventListener('pointerdown', e => { if (e.target.closest('.sc__arrow')) return; down = true; moved = false; sx = e.clientX; });
  addEventListener('pointerup', e => {
    if (!down) return; down = false;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 45) { moved = true; goTo(cur + (dx < 0 ? 1 : -1)); setTimeout(() => { moved = false; }, 60); }
  });
  // teclado, solo mientras el carrusel está a la vista
  let inView = false;
  new IntersectionObserver(([en]) => { inView = en.isIntersecting; }, { threshold: .4 }).observe(stage);
  addEventListener('keydown', e => {
    if (!inView) return;
    if (e.key === 'ArrowLeft') goTo(cur - 1); else if (e.key === 'ArrowRight') goTo(cur + 1);
  });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => layout(false), 150); });
})();

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

