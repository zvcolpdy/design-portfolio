import fullscreen from 'fullscreen'


let html = document.documentElement;
let fullScrBtn = document.getElementById('fullscreen');
fullScrBtn.addEventListener('click', () => {
	fullscreen(html).request();
})


let homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', () => {
	window.location.pathname = "/index.html";
})

let aboutButton = document.getElementById('aboutButton');
aboutButton.addEventListener('click', () => {
	window.location.pathname = "/about.html";
})