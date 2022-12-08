import { useDynamicAdapt } from '../libs/dynamicAdapt.js';

useDynamicAdapt();

// бургер меню

const burgerBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('.header__top-nav');
const navLink = document.querySelectorAll('.header__top-link');

const burger = () => {
	burgerBtn.addEventListener('click', () => {

		burgerBtn.classList.toggle('is-active');
		navMenu.classList.toggle('is-open');
		document.body.classList.toggle('stop-scroll');
	});
}

burger();

const navLinkClick = () => {
	navLink.forEach(el => el.addEventListener('click', () => {
		burgerBtn.classList.remove('is-active');
		navMenu.classList.remove('is-open');
		document.body.classList.remove('stop-scroll');

	}));
}

navLinkClick();

// search button

const searchBtn = document.querySelector('.header__search-btn');
const searchInput = document.querySelector('.header__search-input');

const searchBtnClick = () => {
	searchBtn.addEventListener('click', () => {
		searchInput.classList.add('is-open');
		searchInput.focus();

		if (searchInput.value !== '') {
			searchBtn.setAttribute('type', 'submit');
		}
	});
	searchInput.addEventListener('blur', () => {
		searchInput.classList.remove('is-open');
	});
}

searchBtnClick();


// кнопка паузы в header

const headerPause = document.querySelectorAll('.header__btn');

const headerPlayPause = () => {

	headerPause.forEach(el => el.addEventListener('click', () => {
		if (el.classList.contains('pause')) {
			el.classList.remove('pause');
		} else {
			el.classList.add('pause');
		}
	}));
}

headerPlayPause();

// кнопка "Что в эфире"

const onAirBtn = document.querySelector('.on-air__btn');
const onAirBlock = document.querySelector('.header__bottom-right');
const headerBottomBlock = document.querySelector('.header__bottom');

const onAirBtnClick = () => {
	onAirBtn.addEventListener('click', () => {
		onAirBtn.classList.toggle('is-open');
		onAirBlock.classList.toggle('is-open');
		headerBottomBlock.classList.toggle('is-open');
	})
}

onAirBtnClick();

// Кнопка "Еще подкасты"
const showMorePodcasts = document.querySelector('.podcasts__more');
const podcastsLength = document.querySelectorAll('.podcasts__item').length;
const mobileWidth = window.matchMedia("(max-width: 560px)");
let podcasts;

showMorePodcasts.addEventListener('click', () => {

	const handleWidth = () => {
		if (mobileWidth.matches) {
			podcasts = 4;
		} else {
			podcasts = 8;
		}
	}

	handleWidth();

	podcasts += 4;

	const array = Array.from(document.querySelector('.podcasts__list').children);
	const visiblePodcasts = array.slice(0, podcasts);

	visiblePodcasts.forEach(el => el.classList.add('is-visible'));

	if (visiblePodcasts.length === podcastsLength) {
		showMorePodcasts.style.display = 'none';
	} else {
		showMorePodcasts.style.display = 'none';
	}
});

// счетчик лайков в подкастах 
const likes = document.querySelectorAll('.podcast__likes');

const likesCounter = () => {

	likes.forEach(el => el.addEventListener('click', () => {

		const elem = el.childNodes[5];

		if (el.classList.contains('liked')) {
			el.classList.remove('liked');
			elem.textContent--;
		} else {
			elem.textContent++;
			el.classList.add('liked');
		}
	}));
}

likesCounter();

// счетчик share в подкастах
const shares = document.querySelectorAll('.podcast__shares');

const sharesCounter = () => {

	shares.forEach(el => el.addEventListener('click', () => {

		const elem = el.childNodes[5];

		if (el.classList.contains('shared')) {
			el.classList.remove('shared');
			elem.textContent--;
		} else {
			elem.textContent++;
			el.classList.add('shared');
		}
	}));
}

sharesCounter();

// кнопка паузы в подкастах

const pause = document.querySelectorAll('.podcast__btn');

const playPause = () => {

	pause.forEach(el => el.addEventListener('click', () => {
		if (el.classList.contains('pause')) {
			el.classList.remove('pause');
		} else {
			el.classList.add('pause');
		}
	}));
}

playPause();

// Select в передачах

function select() {
	const element = document.querySelector('.shows__select');
	const choices = new Choices(element, {
		searchEnabled: false,
		position: 'bottom',
		items: [{
			value: 'Дмитрий Гутенберг',
			label: 'Дмитрий Гутенберг',
			id: 1,
		}],
		choices: [{
			value: 'Дмитрий Гутенберг',
			label: 'Дмитрий Гутенберг',
			selected: true,
		},
		{
			value: 'Татьяна Флеганова',
			label: 'Татьяна Флеганова',
			selected: false,
		},
		{
			value: 'Анна Васильева',
			label: 'Анна Васильева',
			selected: false,
		},
		{
			value: 'Пётр Дмитриевский',
			label: 'Пётр Дмитриевский',
			selected: false,
		},],
		itemSelectText: '',
		shouldSort: false,
		placeholder: true,
	});
}

select();

// Accordion 

new Accordion('.accordion-container', {
	duration: 300,
});

// карточка гостя

const guestLink = document.querySelectorAll('.guests__link');
const guestName = document.querySelector('.guest__name');

const guests = fetch('./guests.json').then((resp) => {
	return resp.json();
})

const handleLinkClick = () => {

	guestLink.forEach(el => el.addEventListener('click', (e) => {
		e.preventDefault();

		const id = parseInt(el.getAttribute('id'));

		document.querySelector('.guest__card').classList.add('visible');
		document.querySelector('.guest__card_empty').classList.add('hidden');

		guests.then((result) => {
			result.forEach(guest => {
				if (guest.id === id) {
					guestName.textContent = `${guest.name}`;
				} else if (!id) {
					guestName.textContent = 'Имя и фамилия гостя';
				}
			})
		})
	}));
}

handleLinkClick();

// свайпер для секции "О нас"

const swiper = new Swiper('.swiper', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	edgeSwipeThreshold: 60,
	watchOverflow: false,
	breakpoints: {
		320: {
			slidesPerView: 'auto',
			spaceBetween: 20
		},
		576: {
			slidesPerView: 'auto',
			spaceBetween: 20
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 25
		},
		1200: {
			slidesPerView: 4,
			spaceBetween: 30
		},
	}
});

const swiperPrev = document.getElementById('swiper-prev')
const swiperNext = document.getElementById('swiper-next')

swiperPrev.addEventListener('click', () => {
	swiper.slidePrev();
})
swiperNext.addEventListener('click', () => {
	swiper.slideNext();
});

// Валидация формы

const validation = new JustValidate('#form',
	{
		errorFieldCssClass: 'is-invalid',
		focusInvalidField: true,
	}
);

validation
	.addField('#textarea', [
		{
			validator: (value) => {
				return value !== undefined && value.length > 0;
			},
			errorMessage: 'Мы очень ждем Ваше сообщение :)',
		},
		{
			rule: 'maxLength',
			value: 255,
		},
	],
		{
			errorLabelCssClass: 'text-error',
		},
	)
	.addField('#name', [
		{
			rule: 'required',
			errorMessage: 'Введите имя',
		},
		{
			rule: 'minLength',
			value: 2,
			errorMessage: 'Имя слишком короткое',
		},
		{
			rule: 'customRegexp',
			value: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/ui,
			errorMessage: 'Введите имя'
		},
	],
		{
			errorLabelCssClass: 'name-error',
		},
	)
	.addField('#email', [
		{
			rule: 'required',
			errorMessage: 'Введите email',
		},
		{
			rule: 'email',
			errorMessage: 'Email не валиден',
		},
	],
		{
			errorLabelCssClass: 'email-error',
		},
	)
	.addField('#checkbox', [
		{
			rule: 'required',
			errorMessage: 'Вы не приняли условия соглашения'
		},
	],
		{
			errorLabelCssClass: 'checkbox-error',
		},
	)
	.onSuccess((ev) => {
		ev.target.submit();
	});

// кнопка паузы для playlists 

const playlistsPause = document.querySelectorAll('.artist');
let arr = [playlistsPause]

const clickOnCard = () => {
	playlistsPause.forEach(el => el.addEventListener('click', () => {
		el.classList.toggle('is-playing');
	}));

	playlistsPause.forEach(el => el.onkeydown = function (e) {
		if (e.keyCode === 32 || e.keyCode === 13) {
			document.activeElement.click();
		}
	});
}

clickOnCard();

// preventDefault для ссылок в шапке и секции Передачи

const showMoreBtn = document.querySelectorAll('.show__more');
const headerBottomLink = document.querySelectorAll('.header__bottom-link');

const preventClick = () => {
	showMoreBtn.forEach(el => el.addEventListener('click', (e) => {
		e.preventDefault();
	}));

	headerBottomLink.forEach(el => el.addEventListener('click', (e) => {
		e.preventDefault();
	}));
}

preventClick();


// убираем скролл при открытии модального окна

const openModal = document.querySelector('.header__top-btn');
const closeModal = document.querySelector('.modal__close-btn')
const html = document.documentElement;
const scrollPosition = window.pageYOffset;

const scrollPrevent = () => {

	openModal.addEventListener('click', () => {
		html.style.top = -scrollPosition + "px";
		html.classList.add("modal__open");
	});

	closeModal.addEventListener('click', () => {
		html.classList.remove("modal__open");
	})
}

scrollPrevent();
