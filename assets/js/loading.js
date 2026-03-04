document.addEventListener("DOMContentLoaded", function () {
  const heroVideo = document.getElementById("hero-video");
  const loader = document.getElementById("loading_screen");

  function hideLoader() {
    loader.classList.add("fadeout");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

  // Versuch Autoplay manuell zu starten
  heroVideo.play().then(() => {
    // Video startet erfolgreich → Loader verschwindet bei "playing"
  }).catch(() => {
    // Autoplay wurde blockiert → Loader trotzdem entfernen
    hideLoader();
  });

  // Wenn Video wirklich zu spielen beginnt
  heroVideo.addEventListener("playing", hideLoader);

  // Falls es schon läuft (Cache-Fall)
  if (!heroVideo.paused) {
    hideLoader();
  }
});