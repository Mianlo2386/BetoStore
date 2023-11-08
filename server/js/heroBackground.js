// heroBackground.js
const images = [
  '/images/AnimeHero1.jpg',
  '/images/AnimeHero2.jpg',
  '/images/AnimeHero3.jpg'
];

let currentIndex = 0;
const hero = document.getElementById('hero');

function changeBackground() {
  hero.style.backgroundImage = `url('${images[currentIndex]}')`;
  currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackground, 5000); // Cambiar la imagen cada 5 segundos
