/* Landingpage – kleine, abhängigkeitsfreie Helfer */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal beim Scrollen
  const els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((e, i) => { e.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms'; io.observe(e); });
  }

  // Mobiles Menü
  const burger = document.querySelector('.burger'), links = document.getElementById('navlinks');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      links.classList.toggle('open', open);
    });
    links.addEventListener('click', e => { if (e.target.closest('a')) { burger.setAttribute('aria-expanded', 'false'); links.classList.remove('open'); } });
  }

  // Platzhalter-Links (Calendly, Instagram): solange nicht ersetzt, zum Formular scrollen
  document.querySelectorAll('[data-placeholder]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') { e.preventDefault(); document.getElementById('kontakt').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }
    });
  });

  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // Formular: Formspree (data-endpoint) oder E-Mail-Fallback (data-mailto)
  const form = document.getElementById('leadForm');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const setStatus = (msg, cls) => { status.textContent = msg; status.className = 'form-status ' + (cls || ''); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstBad = null;
    form.querySelectorAll('input,textarea').forEach(f => {
      const bad = !f.checkValidity(); f.classList.toggle('invalid', bad); f.setAttribute('aria-invalid', bad);
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) { setStatus('Bitte fülle die markierten Felder aus.', 'err'); firstBad.focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    const endpoint = form.dataset.endpoint.trim();
    if (endpoint) {
      setStatus('Wird gesendet …');
      try {
        const r = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        if (!r.ok) throw new Error();
        form.reset(); setStatus('Danke! Wir melden uns in Kürze bei dir.', 'ok');
      } catch { setStatus('Senden hat nicht geklappt. Bitte versuch es später noch einmal.', 'err'); }
      return;
    }
    const to = form.dataset.mailto;
    if (!to || to.startsWith('[')) { setStatus('Hinweis für den Betreiber: E-Mail-Adresse oder Formspree-Endpoint im Formular eintragen.', 'err'); return; }
    const body = `Name: ${data.name}\nInstagram: ${data.instagram}\nE-Mail: ${data.email}\nNetwork: ${data.network || '-'}\n\n${data.message || ''}`;
    location.href = `mailto:${to}?subject=${encodeURIComponent('Anfrage Strategie-Session – ' + data.name)}&body=${encodeURIComponent(body)}`;
    setStatus('Dein E-Mail-Programm öffnet sich – einfach absenden.', 'ok');
  });
  form.addEventListener('input', e => { if (e.target.classList.contains('invalid') && e.target.checkValidity()) { e.target.classList.remove('invalid'); e.target.removeAttribute('aria-invalid'); } });
})();
