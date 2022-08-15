// Burger menu

const burger = document.querySelector('.header__burger'); // кнопка бургер
const bodyShadow = document.querySelector('.body__shadow'); // тень
const nav = document.querySelector('.header__nav'); // меню бургер
const navItems = document.querySelectorAll('.header__item'); // строка меню
const closeButton = document.querySelector('.header__nav-close'); // кнопка закрыть

burger.addEventListener('click', e => { // слушаем кнопку
	e.stopPropagation(); // останавливаем всплытие
	nav.classList.add('header__nav-active'); // открываем бургер
	bodyShadow.classList.add('body__shadow-active'); // набрасываем тень
});

document.addEventListener('click', e => { // слуаем все
	let element = e.target; // принимаем клик
	let burgerCheck = element == nav; // проверка клика по меню ли
	//если бургер открыт и клик не по нему
	if (nav.classList.contains('header__nav-active') && !burgerCheck) {
		nav.classList.remove('header__nav-active'); // прячем бургер
		bodyShadow.classList.remove('body__shadow-active'); //снимаем тень
	}
})

// Pop up

const headerButton = document.querySelector('.header__login-form') // кнопка Login
const accountButton = document.querySelector('.header__item-account') // Account в бургере
const popupActive = 'login__popup-active'; // переделка Register -> Login
const popup = document.querySelector('.login__pop-up'); // Поп ап
const popupClick = document.querySelector('.login__register-url'); // ссылка Register
const popupTitle = document.querySelector('.login__header'); // Поп ап заголовок
const popupButton = document.querySelector('.login__sign-button-text'); //текст на кнопке Sign In
const popupText = document.querySelector('.login__register-question'); //строка Don’t have an account?
const loginButton = document.querySelector('.login__sign-button'); // кнопка Sign In

const loginWindow = {
  title: "Login to your account",
  button: "Sign In",
  account: "Don't have an account?",
  link: "Register"
}

const createWindow = { // строки для замены в Register
  title: "Create account",
  button: "Sign Up",
  account: "Already have an account?",
  link: "Log in"
}

function makePopUpVisible(element){ // функция открыть Попап
	nav.classList.remove('header__nav-active'); // закрываем бургер
  popup.classList.remove(popupActive); // открывает скрытое от Register
  popupTitle.innerHTML = loginWindow.title; // возвращаем надписи Login
  popupButton.innerHTML = loginWindow.button; // если было закрыто окно Register
  popupText.innerHTML = loginWindow.account;
  popupClick.innerHTML = loginWindow.link;
	element.stopPropagation(); //останавливаем всплытие
  popup.classList.toggle('login__pop-up-visible'); //открываем Попап
  bodyShadow.classList.add('body__shadow-active'); // навешиваем тень
  document.body.style.overflow = 'hidden'; // блок скролла
}

function makePopUpInvisible(event) { //функция спрятать попап
  let target = event.target; // определяем цель клика
  let popupActive = popup == target || popup.contains(target); // уточняем цель или дочерние элементы
  // если попап открыт и клик не по нему
	if (popup.classList.contains('login__pop-up-visible') && !popupActive) {
      popup.classList.remove('login__pop-up-visible'); // скрываем попап
      bodyShadow.classList.remove('body__shadow-active'); //скрываем тень
			document.body.style.overflow = ''; // убираем блок скролла
    }
}

function changePopUpWindow(event) { // функция изменения окна Register / Login
	// определяем переменную тенарным оператором в щзависимости от открытого окна
  let changeWords = (event.target.innerHTML != "Register")?loginWindow:createWindow;
  popup.classList.toggle(popupActive); //включаем / отключаем элементы
  popupTitle.innerHTML = changeWords.title; // возвращаем надписи Login
  popupButton.innerHTML = changeWords.button;
  popupText.innerHTML = changeWords.account;
  popupClick.innerHTML = changeWords.link;
}

function alertLoginPassword() { // функция алерта для подтверждения логина и пароля
  let loginValue = document.getElementById('login').value; // определяем значение логина
  let passwordValue = document.getElementById('password').value; // определяем значение пароля
  alert(`Login: ${loginValue}\nPassword: ${passwordValue}`); // выводим алерт значений
}

// навешиваем прослушку и запускаем функции:
headerButton.addEventListener('click', makePopUpVisible); // на кнопку Login
accountButton.addEventListener('click', makePopUpVisible); // на строку Acciunt в бургере
popupClick.addEventListener('click', changePopUpWindow); // на ссылку Register
loginButton.addEventListener('click', alertLoginPassword); // на кнопку Sign In
document.addEventListener('click', makePopUpInvisible); // на все остальное для закрытия попап

// Slider

const arrowLeft = document.querySelector('.arrow-left'); // стрелка влево
const arrowRight = document.querySelector('.arrow-right'); // стрелка вправо
const slider = document.querySelector('.slider'); // обвертка слайдера
const item0 = document.querySelector('#item-0'); //слайды
const item1 = document.querySelector('#item-1');
const item2 = document.querySelector('#item-2');
const item3 = document.querySelector('#item-3');
const item4 = document.querySelector('#item-4');
const sliderItem = document.querySelectorAll('.slider__item'); // кружки - указатели

const moveLeft = () => { // функция анимации влево
	slider.classList.add('transition-left'); // навешиваем анимацию
	arrowLeft.removeEventListener('click', moveLeft); // отключаем прослушку на время анимации
	arrowRight.removeEventListener('click', moveRight); // отключаем прослушку на время анимации
	itemLeft(); // запуск функции слайдера влево
}

const moveRight = () => { // функция анимации вправо
	slider.classList.add('transition-right'); // навешиваем анимацию
	arrowRight.removeEventListener('click', moveRight); // отключаем прослушку на время анимации
	arrowLeft.removeEventListener('click', moveLeft); // отключаем прослушку на время анимации
	itemRight(); // запуск функции слайдера вправо
}

function itemLeft() { //меняем цвет кружков при сдвиге влево
	for (let i = 0; i < sliderItem.length; i++) { // цикл сдвига от количества кружков
		// выбираем текущий активный и в зависимости от положения навешиваем активный на следующий кружок
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

function itemRight() { //меняем цвет кружков при сдвиге вправо
	for (let i = 0; i < sliderItem.length; i++) { // цикл сдвига от количества кружков
		// выбираем текущий активный и в зависимости от положения навешиваем активный на предыдущий кружок
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

// навешиваем прослушку и запускаем функции:
arrowLeft.addEventListener('click', moveLeft); // на стрелки в мобильном
arrowRight.addEventListener('click', moveRight);
item1.addEventListener('click', moveLeft); // на слайды в десктопе
item3.addEventListener('click', moveRight);
// работа слайдера, перестановка слайдтов после сдвига
slider.addEventListener('animationend', (animation) => { // слушаем куда был сдвиг
	let itemBox = item2.innerHTML // активный слайдер
	if (animation.animationName === 'move-left') { // если была анимация влево
		slider.classList.remove('transition-left') // заканчиваем анимацию
		item2.innerHTML = item1.innerHTML // перетасовывам слайды
		item1.innerHTML = item0.innerHTML
		item3.innerHTML = itemBox
		item0.innerHTML = itemBox
		item4.innerHTML = item1.innerHTML
	} else { // иначе была анимация вправо
		slider.classList.remove('transition-right') // заканчиваем анимацию
		item2.innerHTML = item3.innerHTML // перетасовывам слайды
		item3.innerHTML = item4.innerHTML
		item1.innerHTML = itemBox
		item4.innerHTML = itemBox
		item0.innerHTML = item3.innerHTML
	}
	arrowLeft.addEventListener('click', moveLeft) // почему-то слетает прослушка стрелок
	arrowRight.addEventListener('click', moveRight)
})

//сдвиг стартового слайда на десктопе
const isMobile = () => document.documentElement.clientWidth > 390;

let lastIsMobile = isMobile(); // сдвигаем если размер более 390px
if (lastIsMobile === true) {
	moveRight();
} 

// переключение при ресайзе
const switchSize = () => {
  if (isMobile() === lastIsMobile) return;
  lastIsMobile = isMobile();
  if (lastIsMobile === true) {
    moveRight();
  } else {
    moveLeft();
  }
}

window.addEventListener('resize', switchSize);
