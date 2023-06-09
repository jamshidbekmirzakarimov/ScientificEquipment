"use strict";
const arrowBtnLeft = document.querySelector(".btn-arrow-left");
const arrowBtnRight = document.querySelector(".btn-arrow-right");

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

let curSlide = 0;
let autoSlideInterval;

// Functions
const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const nextSlide = () => {
  curSlide === slides.length - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = () => {
  curSlide === 0 ? (curSlide = slides.length - 1) : curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const createDots = () => {
  slides.forEach((_, i) =>
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dot' data-slide='${i}'></button>`
    )
  );
};

const activateDot = (slide) => {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot--active"));
  document
    .querySelectorAll(`.dot[data-slide="${slide}"]`)
    .forEach((dot) => dot.classList.add("dot--active"));
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

// Initial setup
const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
  startAutoSlide();
};
init();

// Event listeners
arrowBtnLeft.addEventListener("click", () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

arrowBtnRight.addEventListener("click", () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
    stopAutoSlide();
    startAutoSlide();
  }
});
