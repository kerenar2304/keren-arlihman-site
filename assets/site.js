/* Keren Arlihman site. No framework; Lenis is optional (smooth scroll only). */
(function () {
  var root = document.documentElement;
  try {
    var STATIC = root.classList.contains('static');
    var MOTION = !STATIC && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $ = function (s) { return document.querySelector(s); };
    var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

    /* smooth scroll (desktop only) */
    var lenis = null;
    if (MOTION && window.Lenis && matchMedia('(pointer:fine)').matches) {
      lenis = new Lenis({ lerp: .1 });
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      $$('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var id = a.getAttribute('href'), t = id.length > 1 && $(id);
          if (!t) return; e.preventDefault();
          lenis.scrollTo(id === '#main' ? 0 : t, { offset: -10, duration: 1.2 });
        });
      });
    }

    /* reveals */
    if (!STATIC && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -10% 0px' });
      $$('[data-r]').forEach(function (el) { io.observe(el); });
    } else { $$('[data-r]').forEach(function (el) { el.classList.add('in'); }); }

    /* ---------- hero: headline fitted to the full width ---------- */
    var hero = $('#hero'), h1 = $('#h1');
    function fit() {
      if (!h1) return;
      if (innerWidth <= 860) { h1.style.removeProperty('--hfs'); return; }
      h1.style.setProperty('--hfs', '100px');
      var w = h1.getBoundingClientRect().width, target = h1.parentNode.clientWidth;
      h1.style.setProperty('--hfs', Math.floor(100 * target / w) + 'px');
    }
    // fit() kept for later; the flanking layout uses a fixed size

    var hdr = $('#hdr'), wa = $('.wa');
    /* ---------- hero: the lens (desktop follows the cursor, touch rests on the face) ---------- */
    if (hero) {
      var FACE = { x: .5, y: .34 };
      var fine = matchMedia('(pointer:fine)').matches && innerWidth > 860;
      var cur = { x: 0, y: 0 }, tgt = { x: 0, y: 0 }, size = 1, lw = 0, lh = 0;
      var unit = function () { return innerWidth <= 700 ? Math.min(innerWidth / 400, 1.15) : innerWidth / 1280; };
      var home = function () {
        if (innerWidth <= 860) { tgt.x = hero.clientWidth * .5; tgt.y = $('.hero-bg').clientHeight * .34; }
        else { tgt.x = hero.clientWidth * FACE.x; tgt.y = hero.clientHeight * FACE.y; }
      };
      var lensSize = function () { var ph = innerWidth <= 700; lw = lh = (ph ? 150 : 240) * unit(); };
      /* square cells the size of the lens, aligned so one cell sits exactly on the face */
      var G = { ox: 0, oy: 0, s: 1 };
      var grid = function () {
        G.s = lw; G.ox = ((tgt.x - lw / 2) % lw + lw) % lw; G.oy = ((tgt.y - lw / 2) % lw + lw) % lw;
        hero.style.setProperty('--gs', G.s.toFixed(2) + 'px');
        hero.style.setProperty('--gx', G.ox.toFixed(2) + 'px');
        hero.style.setProperty('--gy', G.oy.toFixed(2) + 'px');
      };
      var snap = function (v, o) { return o + (Math.floor((v - o) / G.s) + .5) * G.s; };
      home(); cur.x = tgt.x; cur.y = tgt.y;
      lensSize(); grid();
      size = MOTION ? Math.max(hero.clientWidth / lw, hero.clientHeight / lh) * 2.2 : 1;
      var t0 = performance.now() + 250, D = 1400, start = size;
      var apply = function () {
        hero.style.setProperty('--lx', cur.x.toFixed(1) + 'px');
        hero.style.setProperty('--ly', cur.y.toFixed(1) + 'px');
        hero.style.setProperty('--lw', (lw * size).toFixed(1) + 'px');
        hero.style.setProperty('--lh', (lh * size).toFixed(1) + 'px');
      };
      apply();
      if (fine && MOTION) {
        hero.addEventListener('pointermove', function (e) {
          var r = hero.getBoundingClientRect(); tgt.x = snap(e.clientX - r.left, G.ox); tgt.y = snap(e.clientY - r.top, G.oy);
        });
        hero.addEventListener('pointerleave', home);
      }
      if (MOTION) (function loop(now) {
        var k = clamp((now - t0) / D, 0, 1), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        size = start + (1 - start) * e;
        cur.x += (tgt.x - cur.x) * .14; cur.y += (tgt.y - cur.y) * .14;
        apply();
        requestAnimationFrame(loop);
      })(performance.now());
      addEventListener('resize', function () { home(); lensSize(); grid(); if (!MOTION) { cur.x = tgt.x; cur.y = tgt.y; size = 1; apply(); } });
    }

    /* header + project stage stack */
    var projs = $$('.proj');
    function onScroll() {
      var y = window.scrollY || pageYOffset;
      hdr.classList.toggle('solid', y > 30 && (!hero || y > hero.offsetHeight - hdr.offsetHeight));
      hdr.classList.toggle('on-hero', !!hero && y <= hero.offsetHeight - hdr.offsetHeight);
      if (wa && hero) wa.classList.toggle('hide', y < hero.offsetHeight * .6);
      if (!MOTION || innerWidth <= 860) return;
      projs.forEach(function (p, i) {
        var next = projs[i + 1]; if (!next) return;
        var top = parseFloat(getComputedStyle(p).top), h = p.offsetHeight;
        var q = clamp(1 - (next.getBoundingClientRect().top - top) / h, 0, 1);
        p.firstElementChild.style.setProperty('--s', (1 - .06 * q).toFixed(4));
        p.firstElementChild.style.setProperty('--d', (.5 * q).toFixed(3));
      });
    }
    var ticking = false;
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); } }, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();

    /* form */
    var form = $('.form');
    if (form) form.addEventListener('submit', function (e) {
      var ok = true, name = $('#f-name'), phone = $('#f-phone');
      var setErr = function (el, msg) { el.setAttribute('aria-invalid', msg ? 'true' : 'false'); $('#e-' + el.id.slice(2)).textContent = msg; if (msg) ok = false; };
      setErr(name, name.value.trim().length < 2 ? 'חסר שם' : '');
      var d = phone.value.replace(/\D/g, '');
      setErr(phone, !d ? 'חסר מספר טלפון' : (d.length < 9 || d.length > 12 ? 'מספר הטלפון לא נראה תקין' : ''));
      if (!ok) { e.preventDefault(); form.querySelector('[aria-invalid="true"]').focus(); }
    });
  } catch (err) {
    root.classList.add('r-fail');
    if (window.console) console.error(err);
  }
})();
