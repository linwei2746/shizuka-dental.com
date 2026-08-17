document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('siteHeader');
  var hamburger = document.getElementById('hamburger');
  var gnav = document.getElementById('gnav');
  var overlay = document.getElementById('navOverlay');

  // Header: transparent over hero at top, solid bar on scroll.
  // Floating TOP button: revealed after scrolling down.
  var floatCta = document.getElementById('floatCta');
  var onScroll = function () {
    var y = window.scrollY;
    if (y > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    if (floatCta) floatCta.classList.toggle('show-top', y > 400);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Back-to-top
  var floatTop = document.getElementById('floatTop');
  if (floatTop) {
    floatTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile drawer
  function closeNav() {
    hamburger.classList.remove('active');
    gnav.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if (hamburger && gnav) {
    hamburger.addEventListener('click', function () {
      var open = gnav.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      overlay.classList.toggle('show', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    overlay.addEventListener('click', closeNav);
    // Close when a real link (not the dropdown toggle) is clicked
    gnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 1280 && a.closest('.has-drop')) return;
        closeNav();
      });
    });
  }

  // Mobile: 診療案内 accordion toggle
  var hasDrop = document.querySelector('.has-drop');
  if (hasDrop) {
    var dropLink = hasDrop.querySelector(':scope > a');
    dropLink.addEventListener('click', function (e) {
      if (window.innerWidth <= 1280) {
        e.preventDefault();
        hasDrop.classList.toggle('expanded');
      }
    });
  }

  // Recruit tabs
  var tabButtons = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var target = document.getElementById(btn.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section, .feature-row, .med-card, .pickup-card').forEach(function (el) {
      el.classList.add('reveal'); io.observe(el);
    });
  }
});
