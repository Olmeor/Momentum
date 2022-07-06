// Burger handler

/*(function () {
  const burger= document.querySelector('.burger');
  const menu = document.querySelector('.header__nav');
  const menuClose = document.querySelector('.header__nav-close');
  const menuLinks = document.querySelectorAll('.header__link');

  burger.addEventListener('click', () => {
    menu.classList.add('header__nav-active');

  });

  menuClose.addEventListener('click', () => {
    menu.classList.remove('header__nav-active');
  });

  if (window.innerWidth <= 390) {
    for (let i = 0; i < menuLinks.length; i += 1) {
      menuLinks[i].addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
      });
    }
  }

  function closeBurger() {
    menu.classList.remove('header__nav-active');
  }

  document.body.addEventListener("click", function(event) {
    if ((event.target != menu)) closeBurger();
  });

}());*/

const navBurger = document.querySelector('.burger');
const headerNav = document.querySelector('.header__nav')

function active() {
  navBurger.classList.toggle('header__nav-active');
  headerNav.classList.toggle('header__nav-active');
}

document.addEventListener('click', (event => {
  if (event.target.classList.contains('burger')) {
      active();
  }
  else if (!event.target.classList.contains('header__nav') &&
      headerNav.classList.contains('header__nav-active')) {
      active();
  }
}))
