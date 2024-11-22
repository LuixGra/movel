// Banner Slide Controls
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

document.querySelector('.next').addEventListener('click', () => {
    slides[currentSlide].style.opacity = 0;
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = 1;
});

document.querySelector('.prev').addEventListener('click', () => {
    slides[currentSlide].style.opacity = 0;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].style.opacity = 1;
});
