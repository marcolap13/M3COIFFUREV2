/* M3 Coiffure — petits comportements de la page.
   Tout le contenu reste lisible sans JavaScript. */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('menu-principal');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ---------- Ombre de l'en-tête au scroll ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  if (header) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Accordéons des tarifs ---------- */
  var accButtons = Array.prototype.slice.call(document.querySelectorAll('.acc__btn'));

  function setPanel(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  }

  function openFromHash() {
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (!target || !target.classList.contains('acc')) return false;
    var btn = target.querySelector('.acc__btn');
    setPanel(btn, true);
    return true;
  }

  if (accButtons.length) {
    // Sans JS tout est déplié ; avec JS, seule la première catégorie l'est.
    accButtons.forEach(function (btn, i) { setPanel(btn, i === 0); });
    if (openFromHash()) {
      setPanel(accButtons[0], location.hash === '#tarifs-elle');
    }

    accButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setPanel(btn, btn.getAttribute('aria-expanded') !== 'true');
      });
    });

    // Les cartes « Prestations » ouvrent la bonne catégorie.
    window.addEventListener('hashchange', openFromHash);
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#tarifs-"]');
      if (link && link.getAttribute('href') === location.hash) openFromHash();
    });
  }

  /* ---------- Horaires : jour en cours et statut ouvert / fermé ---------- */
  var OPEN = 9 * 60 + 30;   // 9h30
  var CLOSE = 19 * 60;      // 19h
  var DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  function parisNow() {
    var parts = {};
    try {
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris', weekday: 'short',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
      return { day: day, minutes: (parseInt(parts.hour, 10) % 24) * 60 + parseInt(parts.minute, 10) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function isOpenDay(day) { return day >= 1 && day <= 6; }

  function statusText(now) {
    if (isOpenDay(now.day) && now.minutes >= OPEN && now.minutes < CLOSE) {
      return { open: true, text: 'Ouvert maintenant · jusqu’à 19h' };
    }
    if (isOpenDay(now.day) && now.minutes < OPEN) {
      return { open: false, text: 'Fermé · ouvre aujourd’hui à 9h30' };
    }
    var next = (now.day + 1) % 7;
    while (!isOpenDay(next)) next = (next + 1) % 7;
    var when = next === (now.day + 1) % 7 ? 'demain' : DAYS[next];
    return { open: false, text: 'Fermé · ouvre ' + when + ' à 9h30' };
  }

  function updateHours() {
    var now = parisNow();
    if (now.day < 0) return;
    var s = statusText(now);

    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.textContent = s.text;
      el.classList.toggle('is-open', s.open);
      el.classList.toggle('is-closed', !s.open);
      el.hidden = false;
    });

    document.querySelectorAll('[data-hours] li').forEach(function (li) {
      var today = Number(li.getAttribute('data-day')) === now.day;
      li.classList.toggle('is-today', today);
      if (today) li.setAttribute('aria-current', 'date');
      else li.removeAttribute('aria-current');
    });
  }

  updateHours();
  setInterval(updateHours, 60 * 1000);

  /* ---------- Année du copyright ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Apparition douce au scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
