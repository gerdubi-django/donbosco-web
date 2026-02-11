const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
const nav = document.querySelector('.nav');
const sectionSelectors = ['main .section', '#contacto.section'];

const updateNavHeight = () => {
  // Sync the dynamic navbar height with CSS layout calculations.
  if (!nav) return;
  const navHeight = `${Math.round(nav.getBoundingClientRect().height)}px`;
  document.documentElement.style.setProperty('--nav-height', navHeight);
};

if (navToggle && navList) {
  // Toggle mobile navigation visibility.
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after selecting a navigation link.
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    // Reveal cards and sections when they enter the viewport.
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sections = sectionSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]);
let snapTimeout;

const snapToNearestSection = () => {
  // Gently align the closest section to the viewport after scrolling settles.
  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
  const viewportMiddle = navHeight + (window.innerHeight - navHeight) / 2;
  const nearestSection = sections.reduce(
    (closest, section) => {
      const distance = Math.abs(section.getBoundingClientRect().top - navHeight);
      return distance < closest.distance ? { section, distance } : closest;
    },
    { section: null, distance: Number.POSITIVE_INFINITY }
  ).section;

  if (!nearestSection) return;
  const sectionBounds = nearestSection.getBoundingClientRect();
  const isFullyVisible = sectionBounds.top <= navHeight + 2 && sectionBounds.bottom >= viewportMiddle;
  if (isFullyVisible) return;

  nearestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const queueSectionSnap = () => {
  // Debounce the scroll snapping helper to avoid fighting user scrolling.
  window.clearTimeout(snapTimeout);
  snapTimeout = window.setTimeout(snapToNearestSection, 140);
};

updateNavHeight();
window.addEventListener('load', updateNavHeight);
window.addEventListener('resize', updateNavHeight);
window.addEventListener('orientationchange', updateNavHeight);
window.addEventListener('scroll', queueSectionSnap, { passive: true });
