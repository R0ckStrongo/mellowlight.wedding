const slides = document.querySelectorAll('.hero-slideshow picture');
let current = 0;

// Erstes Bild ist schon sichtbar
slides[current].classList.add('active');

setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 5000); // alle 4 Sekunden wechseln