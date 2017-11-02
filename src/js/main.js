import _ from './pageItems'
import fullscreen from 'fullscreen'


//providing fullscreen
_.fullScrBtn.addEventListener('click', () => {
	fullscreen(_.html).request();
})

//home page
_.homeButton.addEventListener('click', () => {
	_.main.style.display = "block";
	_.about.style.display = "none";
})

//about page
_.aboutButton.addEventListener('click', () => {
	_.main.style.display = "none";
	_.about.style.display = "block";
})

//tile view
_.toTileButton.addEventListener('click', () => {
	_.toTileButton.classList.add("active");
	_.toRowButton.classList.remove("active");
	_.items.forEach((el) => {
		el.className = 'tile'
	})
	_.fullScrBtn.classList.add("hidden-on-medium");
	_.rowStuff.style.display = "none";
	_.tileStuff.style.display = "flex";
})

//row view
_.toRowButton.addEventListener('click', () => {
	_.toTileButton.classList.remove("active");
	_.toRowButton.classList.add("active");
	_.items.forEach((el) => {
		el.className = 'item'
	})
	_.fullScrBtn.classList.remove("hidden-on-medium");
	_.tileStuff.style.display = "none";
	_.rowStuff.style.display = "block";
})







