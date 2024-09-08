/* Loading animation */
document.onreadystatechange = function () {
	 if (document.readyState !== "complete") {
		document.querySelector("body").style.visibility = "hidden";
		document.getElementById("loading_screen").style.visibility = "visible";
	 } else {
		document.getElementById("loading_screen").classList.add("fadeout");
		setTimeout(() => {
		   document.getElementById("loading_screen").style.display ="none";
		   document.querySelector("body").style.visibility = "visible";
		}, 500)
	 }
  };