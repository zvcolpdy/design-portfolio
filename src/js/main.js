import _ from './pageItems'
import fullscreen from 'fullscreen'


_.fullScrBtn.addEventListener('click', () => {
	fullscreen(_.html).request();
})

_.homeButton.addEventListener('click', () => {
	_.main.style.display = "block";
	_.about.style.display = "none";
})

_.aboutButton.addEventListener('click', () => {
	_.main.style.display = "none";
	_.about.style.display = "block";
})

_.toTileButton.addEventListener('click', () => {
	toTileButton.classList.add("active");
	toRowButton.classList.remove("active");
	_.items.forEach((el) => {
		el.className = 'tile'
	})
})

_.toRowButton.addEventListener('click', () => {
	toTileButton.classList.remove("active");
	toRowButton.classList.add("active");
	_.items.forEach((el) => {
		el.className = 'item'
	})
})



