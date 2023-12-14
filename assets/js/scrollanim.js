const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
}, { rootMargin: "-50px" });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

function refreshPage () {
	var page_y = document.getElementsByTagName("body")[0].scrollTop;
	window.location.href = window.location.href.split('?')[0] + '?page_y=' + page_y;
}
window.onload = function () {
	setTimeout(refreshPage, 35000);
	if ( window.location.href.indexOf('page_y') != -1 ) {
		var match = window.location.href.split('?')[1].split("&")[0].split("=");
		document.getElementsByTagName("body")[0].scrollTop = match[1];
	}
}