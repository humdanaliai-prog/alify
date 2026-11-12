(() => {
  'use strict';

  function initFinovate() {
    // Fallback behavior keeps the page functional if a CDN dependency is blocked.
    const toggler = document.querySelector('.navbar-toggler');
    const menu = document.querySelector('.navbar-collapse');
    if (toggler && menu) {
      toggler.addEventListener('click', () => {
        if (window.bootstrap?.Collapse) {
          window.bootstrap.Collapse.getOrCreateInstance(menu).toggle();
        } else {
          menu.classList.toggle('show');
        }
      });
    }

    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (!menu?.classList.contains('show')) return;
        if (window.bootstrap?.Collapse) window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
        else menu.classList.remove('show');
      });
    });

    document.querySelectorAll('.journey-step').forEach((step, index) => {
      step.setAttribute('tabindex', '0');
      step.setAttribute('role', 'button');
      const activate = () => {
        document.querySelectorAll('.journey-step').forEach((item) => item.classList.remove('active'));
        step.classList.add('active');
        const counter = document.querySelector('.journey-top span:last-child');
        if (counter) counter.textContent = `0${index + 1} — 03`;
      };
      step.addEventListener('click', activate);
      step.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
      });
    });

    // Native accordion fallback if Bootstrap's bundle is unavailable.
    if (!window.bootstrap?.Collapse) {
      document.querySelectorAll('.accordion-button').forEach((button) => {
        button.addEventListener('click', () => {
          const target = document.querySelector(button.getAttribute('data-bs-target'));
          if (!target) return;
          const opening = !target.classList.contains('show');
          document.querySelectorAll('.accordion-collapse').forEach((panel) => panel.classList.remove('show'));
          document.querySelectorAll('.accordion-button').forEach((item) => item.classList.add('collapsed'));
          if (opening) { target.classList.add('show'); button.classList.remove('collapsed'); }
        });
      });
    }

    const gsap = window.gsap;
    if (gsap) {
      if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
      gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.11, ease: 'power2.out' });
      gsap.from('.hero-visual', { y: 30, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.15 });
      if (window.ScrollTrigger) {
        gsap.utils.toArray('.number-intro,.stat,.about-pics,.about-copy,.service-card,.value-grid>div,.why-copy,.journey-card,.team-card,.trust-inner>* ,.review-grid article,.insight-card,.faq-wrap>*').forEach((element) => {
          gsap.from(element, { scrollTrigger: { trigger: element, start: 'top 88%' }, y: 24, opacity: 0, duration: 0.65, ease: 'power2.out' });
        });
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFinovate, { once: true });
  else initFinovate();
})();
