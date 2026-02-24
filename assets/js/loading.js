document.addEventListener("DOMContentLoaded", function () {
  const heroImg = document.querySelector("#hero-image");
  const loader = document.getElementById("loading_screen");

  function hideLoader() {
    loader.classList.add("fadeout");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

  // Falls Bild schon aus Cache geladen ist
  if (heroImg.complete && heroImg.naturalWidth !== 0) {
    hideLoader();
  } else {
    heroImg.addEventListener("load", hideLoader);
  }
});