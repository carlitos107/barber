'use strict';

(function () {
  const nav = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.main-nav__toggle');

  nav.classList.add('main-nav--closed');

  navToggle.addEventListener('click', () => {
    if (nav.classList.contains('main-nav--closed')) {
      nav.classList.remove('main-nav--closed');
      nav.classList.add('main-nav--opened');
    } else {
      nav.classList.remove('main-nav--opened');
      nav.classList.add('main-nav--closed');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const currentLoc = document.location.href;
    const links = nav.querySelectorAll('.site-menu a');

    links.forEach((item) => {
      if (item.href === currentLoc) {
        item.parentElement.classList.add('site-menu__item--active');
        item.removeAttribute('href');
      }
    });
  });
})();
