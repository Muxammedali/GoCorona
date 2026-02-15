'use strict';

(function () {
  const menuToggle = document.querySelector('.menu__toggle');
  const menuBody = document.querySelector('.menu__body');

  if (!menuToggle || !menuBody) {
    return;
  }

  const bodyClass = 'menu-open';
  const openClass = 'menu__body--open';
  const toggleOpenClass = 'menu__toggle--open';
  const navLinks = menuBody.querySelectorAll('.menu__link');

  const focusSafely = (element) => {
    if (!element) {
      return;
    }

    try {
      element.focus({ preventScroll: true });
    } catch (error) {
      element.focus();
    }
  };

  const setMenuState = (shouldOpen, options = {}) => {
    const { focusToggle = true } = options;
    const isOpen = typeof shouldOpen === 'boolean'
      ? shouldOpen
      : !menuBody.classList.contains(openClass);

    menuBody.classList.toggle(openClass, isOpen);
    menuToggle.classList.toggle(toggleOpenClass, isOpen);
    document.body.classList.toggle(bodyClass, isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      focusSafely(menuBody.querySelector('.menu__link'));
    } else if (focusToggle) {
      focusSafely(menuToggle);
    }
  };

  menuToggle.addEventListener('click', () => {
    setMenuState();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false, { focusToggle: false }));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuBody.classList.contains(openClass)) {
      event.preventDefault();
      setMenuState(false);
    }
  });

  document.addEventListener('click', (event) => {
    if (!menuBody.classList.contains(openClass)) {
      return;
    }

    if (event.target === menuToggle || menuToggle.contains(event.target)) {
      return;
    }

    if (menuBody.contains(event.target)) {
      return;
    }

    setMenuState(false, { focusToggle: false });
  });

  const mediaQuery = window.matchMedia('(min-width: 769px)');
  const handleMediaChange = (event) => {
    if (event.matches) {
      setMenuState(false, { focusToggle: false });
    }
  };

  handleMediaChange(mediaQuery);

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleMediaChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleMediaChange);
  }
})();
// Muxammedali 2025 year
