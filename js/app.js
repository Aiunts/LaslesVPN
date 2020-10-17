"use strict";

//Burger
const burgerBtn = document.querySelector(".header__burger");
const nav = document.querySelector(".nav");

burgerBtn.addEventListener("click", function() {
	burgerBtn.classList.toggle("active");
	nav.classList.toggle("active");
});


//Slider
let position = 0;
const slidesToShow = (window.screen.width >= 1024)? 3: (window.screen.width >= 768)? 2: 1;
const slidesToScroll = 1;
const container = document.querySelector(".slider__container");
const track = document.querySelector(".slider__track");
const items = document.querySelectorAll(".slider__item");
const btnPrev = document.querySelector(".slider__btn-prev");
const btnNext = document.querySelector(".slider__btn-next");
const sliderPoints = document.querySelectorAll(".slider__point");
const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

sliderPoints.forEach((item, index) => {
	item.addEventListener("click", () => {
		position = -(itemWidth * index) ;

		setPosition();
	    checkBtns();
	    checkActive();
	})
});

btnNext.addEventListener("click", () => {
	const itemsLeft = itemsCount - (Math.abs(position) + slidesToScroll * itemWidth) / itemWidth;

	position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

	setPosition();
	checkBtns();
	checkActive();
});

btnPrev.addEventListener("click", () => {
	const itemsLeft = Math.abs(position) / itemWidth;

	position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

	setPosition();
	checkBtns();
	checkActive();
});

const setPosition = () => {
	track.style.transform = `translateX(${position}px`;
};

const checkBtns = () => {
	(position === 0) ? btnPrev.style.opacity = `0` : btnPrev.style.opacity = `1`;

	(position <= -(itemsCount - slidesToScroll) * itemWidth) ? btnNext.style.opacity = `0` : btnNext.style.opacity = `1`;
};

const checkActive = () => {
	for (let i = 0; i < itemsCount; i++) {
	sliderPoints[i].classList.remove("active");
	items[i].classList.remove("active");
    }

    items[Math.abs(Math.round(position / itemWidth))].classList.add("active");
	sliderPoints[Math.round(Math.abs(position / itemWidth))].classList.add("active");
};

checkBtns();
