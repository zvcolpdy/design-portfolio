import fullscreen from 'fullscreen'

let getEl = (id) => (document.getElementById(id));

let html = document.documentElement;
let homeButton = getEl('homeButton');
let aboutButton = getEl('aboutButton');
let fullScrBtn = getEl('fullscreen');
let toTileButton = getEl('toTileButton');
let toRowButton = getEl('toRowButton');
let polkaRapper = getEl('main-wrapper');
let items = [].slice.call(polkaRapper.childNodes).filter(el => el.tagName === 'DIV');
let main = getEl('main');
let about = getEl('about-container');


fullScrBtn.addEventListener('click', () => {
	fullscreen(html).request();
})

homeButton.addEventListener('click', () => {
	main.style.display = "block";
	about.style.display = "none";
})

aboutButton.addEventListener('click', () => {
	main.style.display = "none";
	about.style.display = "block";
})

toTileButton.addEventListener('click', () => {
	toTileButton.classList.add("active");
	toRowButton.classList.remove("active");
	items.forEach((el) => {
		el.className = 'tile'
	})
})

toRowButton.addEventListener('click', () => {
	toTileButton.classList.remove("active");
	toRowButton.classList.add("active");
	items.forEach((el) => {
		el.className = 'item'
	})
})