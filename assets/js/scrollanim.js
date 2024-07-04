const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
}, { rootMargin: "-50px" });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
	$(".zoom-me #slideshow").css({
		width: (100 + scroll/5)  + "%",
		top: -(scroll/10)  + "%",
		left: -(scroll/10)  + "%",
		//Blur suggestion from @janwagner: https://codepen.io/janwagner/ in comments
		//"-webkit-filter": "blur(" + (scroll/200) + "px)",
		//filter: "blur(" + (scroll/200) + "px)"
	});
});