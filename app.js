(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll progress + nav state + active link ---- */
  var nav = document.getElementById('nav');
  var bar = document.querySelector('.progress-bar');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      if (nav) nav.classList.toggle('scrolled', y > 8);
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
      }
      var current = -1;
      for (var i = 0; i < sections.length; i++) {
        var s = sections[i];
        if (s && s.getBoundingClientRect().top <= 140) current = i;
      }
      links.forEach(function (a, i) { a.classList.toggle('active', i === current); });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---- hero name, letter by letter ---- */
  var name = document.querySelector('[data-split]');
  if (name && !reduced) {
    var text = name.textContent;
    name.textContent = '';
    var n = 0;
    text.split('').forEach(function (c) {
      var span = document.createElement('span');
      span.className = 'ch';
      span.textContent = c === ' ' ? ' ' : c;
      span.style.animationDelay = (0.25 + n * 0.045) + 's';
      name.appendChild(span);
      n++;
    });
  }

  /* ---- typewriter role line ---- */
  var typed = document.querySelector('.typed');
  if (typed && !reduced) {
    var phrases = JSON.parse(typed.getAttribute('data-phrases') || '[]');
    if (phrases.length) {
      var pi = 0, ci = 0, deleting = false;
      typed.textContent = '';
      var tick = function () {
        var word = phrases[pi];
        ci += deleting ? -1 : 1;
        typed.textContent = word.slice(0, ci);
        var wait = deleting ? 38 : 70;
        if (!deleting && ci === word.length) { deleting = true; wait = 1900; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; wait = 320; }
        setTimeout(tick, wait);
      };
      setTimeout(tick, 1400);
    }
  }

  /* ---- reveal on scroll, staggered per group ---- */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduced) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (e, i) {
        var el = e.target;
        setTimeout(function () { el.classList.add('in'); }, i * 90);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -70px 0px', threshold: 0.08 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---- count up numbers ---- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCount(e.target);
        co.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(counters, function (el) { co.observe(el); });
  } else {
    Array.prototype.forEach.call(counters, runCount);
  }

  /* ---- cursor-follow glow on cards ---- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.card'), function (card) {
      card.addEventListener('mousemove', function (ev) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      });
    });
  }

  /* ---- gentle parallax on the hero aurora ---- */
  var aurora = document.querySelector('.aurora');
  if (aurora && !reduced && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', function (ev) {
      var x = (ev.clientX / window.innerWidth - 0.5) * 26;
      var y = (ev.clientY / window.innerHeight - 0.5) * 20;
      aurora.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    }, { passive: true });
  }

  /* ---- 3D tilt on the hero code card ---- */
  var visual = document.querySelector('.hero-visual');
  var card3d = document.querySelector('[data-tilt]');
  if (visual && card3d && !reduced && window.matchMedia('(hover: hover)').matches) {
    visual.addEventListener('mousemove', function (ev) {
      var r = visual.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width - 0.5;
      var py = (ev.clientY - r.top) / r.height - 0.5;
      card3d.style.transform =
        'rotateY(' + (px * 10) + 'deg) rotateX(' + (-py * 8) + 'deg) translateY(-4px)';
    });
    visual.addEventListener('mouseleave', function () {
      card3d.style.transform = '';
    });
  }
})();
