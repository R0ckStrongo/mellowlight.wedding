const cookieBox = document.querySelector(".cookiewrapper"),
  buttons = document.querySelectorAll(".cookiebutton"),
      cookieSettings = document.querySelector(".cookiesettings");

const executeCodes = () => {
  //if cookie contains cookieConsent it will be returned and below of this code will not run
  if (document.cookie.includes("granted")) return;
  cookieBox.classList.add("show");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");

      //if button has acceptBtn id
      if (button.id == "acceptBtn") {
        //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
        document.cookie = "cookieConsent= granted; max-age=" + 60 * 60 * 24 * 30;
        fbq('consent', 'grant');
      }
        else {
            document.cookie = "cookieConsent= no; max-age=" + 60 * 60 * 24 * 30;
            fbq('consent', 'revoke');
            document.cookie = "_fbp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    });
  });
};

//executeCodes function will be called on webpage load
window.addEventListener("load", executeCodes);
cookieSettings.onclick = function(){
    document.cookie = "cookieConsent= unsure; max-age=" + 60 * 60 * 24 * 30;
    executeCodes();
};

document.querySelector(".banner__close").addEventListener("click", function () {
  this.closest(".banner").style.display = "none";
});
