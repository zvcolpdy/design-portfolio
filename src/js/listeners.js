import fullscreen from 'fullscreen'


let html = document.documentElement;
let fullScrBtn = document.getElementById('fullscreen');
fullScrBtn.addEventListener('click', () => {
	fullscreen(html).request();
})


