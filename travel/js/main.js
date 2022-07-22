// Burger menu

const burger = document.querySelector('.header__burger');
const bodyShadow = document.querySelector('.body__shadow');
const nav = document.querySelector('.header__nav');
const navItems = document.querySelectorAll('.header__item');
const closeButton = document.querySelector('.header__nav-close');


burger.onclick = function() {
  nav.classList.toggle('header__nav-active');
  bodyShadow.classList.toggle('body__shadow-active');
  document.body.style.overflow = 'hidden';
}

for (let item in navItems) {
  navItems[item].onclick = function() {
    nav.classList.toggle('header__nav-active');
    bodyShadow.classList.toggle('body__shadow-active');
    document.body.style.overflow = '';
  }
}

closeButton.onclick = function() {
  nav.classList.toggle('header__nav-active');
  bodyShadow.classList.toggle('body__shadow-active');
  document.body.style.overflow = '';
}

document.addEventListener( 'click', (element) => {
  let target = element.target;
 
	if ( !target.closest('.header__wrapper') && !target.closest('.header__burger') ) {
		nav.classList.remove('header__nav-active'); 
    bodyShadow.classList.remove('body__shadow-active');
    document.body.style.overflow = '';
	}
})

// Pop up

const headerButton = document.querySelector('.header__login-form')
const accountButton = document.querySelector('.header__item-account')
const popupActive = 'login__popup-active';
const popup = document.querySelector('.login__pop-up');
const popupClick = document.querySelector('.login__register-url');
const popupTitle = document.querySelector('.login__caption');
const popupButton = document.querySelector('.login__sign-button-text');
const popupText = document.querySelector('.login__register-question');
const loginButton = document.querySelector('.login__sign-button');

const loginWindow = {
  title: "Login to your account",
  button: "Sign In",
  account: "Don't have an account?",
  link: "Register"
}

const createWindow = {
  title: "Create account",
  button: "Sign Up",
  account: "Already have an account?",
  link: "Log in"
}

function makePopUpVisible(element){
	document.querySelector(".header__nav").classList.remove('header__nav-active');
  popup.classList.remove(popupActive);
  popupTitle.innerHTML = loginWindow.title;
  popupButton.innerHTML = loginWindow.button;
  popupText.innerHTML = loginWindow.account;
  popupClick.innerHTML = loginWindow.link;
	element.stopPropagation();
  popup.classList.toggle('login__pop-up-visible');
  shadow.classList.add('body__shadow-active');
  document.body.style.overflow = 'hidden';
}

function makePopUpInvisible(event) {
  let target = event.target;
  let popupActive = popup == target || popup.contains(target);
  if (popup.classList.contains('login__pop-up-visible') && !popupActive) {
      popup.classList.remove('login__pop-up-visible');
      shadow.classList.remove('body__shadow-active');
    }
}

function changePopUpWindow(event) {
  let changeWords = (event.target.innerHTML != "Register")?loginWindow:createWindow;
  popup.classList.toggle(popupActive);
  popupTitle.innerHTML = changeWords.title;
  popupButton.innerHTML = changeWords.button;
  popupText.innerHTML = changeWords.account;
  popupClick.innerHTML = changeWords.link;
  shadow.classList.add('body__shadow-active');
	document.body.style.overflow = 'hidden';
}

function alertLoginPassword() {
  let loginValue = document.getElementById('login').value;
  let passwordValue = document.getElementById('password').value;
  alert(`Login: ${loginValue}\nPassword: ${passwordValue}`);
}

headerButton.addEventListener('click', makePopUpVisible);
accountButton.addEventListener('click', makePopUpVisible);
popupClick.addEventListener('click', changePopUpWindow);
loginButton.addEventListener('click', alertLoginPassword);
document.addEventListener('click', makePopUpInvisible);

// Slider

const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const slider = document.querySelector('.slider');
const item0 = document.querySelector('#item-0');
const item1 = document.querySelector('#item-1');
const item2 = document.querySelector('#item-2');
const item3 = document.querySelector('#item-3');
const item4 = document.querySelector('#item-4');
const sliderItem = document.querySelectorAll('.slider__item');

const moveLeft = () => {
	slider.classList.add('transition-left');
	arrowLeft.removeEventListener('click', moveLeft);
	arrowRight.removeEventListener('click', moveRight);
	itemLeft();
}

const moveRight = () => {
	slider.classList.add('transition-right');
	arrowRight.removeEventListener('click', moveRight);
	arrowLeft.removeEventListener('click', moveLeft);
	itemRight();
}

function itemLeft() {
	for (let i = 0; i < sliderItem.length; i++) {
		if (sliderItem[i] == document.querySelector('.slider__item_active')) {
			if (i == 0) {
				sliderItem[0].classList.remove('slider__item_active')
				sliderItem[2].classList.add('slider__item_active')
				return
			} else if (i == 1) {
				sliderItem[1].classList.remove('slider__item_active')
				sliderItem[0].classList.add('slider__item_active')
				return
			} else {
				sliderItem[2].classList.remove('slider__item_active')
				sliderItem[1].classList.add('slider__item_active')
				return
			}
		}
	}
}

function itemRight() {
	for (let i = 0; i < sliderItem.length; i++) {
		if (sliderItem[i] == document.querySelector('.slider__item_active')) {
			if (i == 0) {
				sliderItem[0].classList.remove('slider__item_active')
				sliderItem[1].classList.add('slider__item_active')
				return
			} else if (i == 1) {
				sliderItem[1].classList.remove('slider__item_active')
				sliderItem[2].classList.add('slider__item_active')
				return
			} else {
				sliderItem[2].classList.remove('slider__item_active')
				sliderItem[0].classList.add('slider__item_active')
				return
			}
		}
	}
}

arrowLeft.addEventListener('click', moveLeft);
arrowRight.addEventListener('click', moveRight);
item1.addEventListener('click', moveLeft);
item3.addEventListener('click', moveRight);

slider.addEventListener('animationend', (animation) => {
	let itemBox = item2.innerHTML
	if (animation.animationName === 'move-left') {
		slider.classList.remove('transition-left')
		item2.innerHTML = item1.innerHTML
		item1.innerHTML = item0.innerHTML
		item3.innerHTML = itemBox
		item0.innerHTML = itemBox
		item4.innerHTML = item1.innerHTML
	} else {
		slider.classList.remove('transition-right')
		item2.innerHTML = item3.innerHTML
		item3.innerHTML = item4.innerHTML
		item1.innerHTML = itemBox
		item4.innerHTML = itemBox
		item0.innerHTML = item3.innerHTML
	}
	arrowLeft.addEventListener('click', moveLeft)
	arrowRight.addEventListener('click', moveRight)
})