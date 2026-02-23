(function () {

  const PIXEL_ID = "209840151984177";
  const banner = document.querySelector(".cookiewrapper");
  const acceptBtn = document.getElementById("acceptBtn");
  const declineBtn = document.getElementById("declineBtn");
  const settingsBtn  = document.querySelector(".cookiesettings");

  /* -------------------------
     Cookie Helpers
  ------------------------- */

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function deleteMetaCookies() {
    document.cookie = "_fbp=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "_fbc=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }

  /* -------------------------
     Banner Steuerung
  ------------------------- */

  function showBanner() {
    if (banner) banner.classList.add("show");
  }

  function hideBanner() {
    if (banner) banner.classList.remove("show");
  }

  /* -------------------------
     Pixel Loader (Lazy Load)
  ------------------------- */

  function loadPixel() {

    if (window.fbq) return;

    !(function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){
      n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    })(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', PIXEL_ID);
    //PageView, nur bei ThankYou Lead
    if (window.location.pathname.includes("thankyou")) {
      fbq("track", "Lead");
    } else {
      fbq("track", "PageView");
    }
  }

  /* -------------------------
     Initial Check beim Laden
  ------------------------- */

  document.addEventListener("DOMContentLoaded", function () {

    const consent = getCookie("cookieConsent");

    if (!consent) {
      // Noch keine Entscheidung → Banner anzeigen
      showBanner();
    }

    if (consent === "granted") {
      loadPixel();
    }

    /* -------------------------
       Button Events
    ------------------------- */

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        setCookie("cookieConsent", "granted", 30);
        hideBanner();
        loadPixel();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        setCookie("cookieConsent", "denied", 30);
        hideBanner();
        deleteMetaCookies();
      });
    }
    
    if (settingsBtn) {
      settingsBtn.addEventListener("click", function () {

        // Falls vorher Tracking aktiv war → sofort deaktivieren
        const currentConsent = getCookie("cookieConsent");

        if (currentConsent === "granted") {
          deleteMetaCookies();

          if (window.fbq) {
            fbq('consent', 'revoke');
          }
        }

        // Cookie entfernen (damit neue Auswahl erzwungen wird)
        document.cookie = "cookieConsent=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        // Banner wieder anzeigen
        showBanner();
      });
    }

  });

})();