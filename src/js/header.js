import page from "./pageItems"
import fullscreen from 'fullscreen'

//providing fullscreen
page.fullScrBtn.addEventListener('click', () => {
	fullscreen(page.html).request();
	page.fullScrBtn.children[1].classList.add("active")
})

//tile view
page.toTileButton.addEventListener('click', () => {
	page.toTileButton.classList.add("active");
	page.toRowButton.classList.remove("active");
	page.backToGalleryViewButton.style.display = "none";
	page.items.forEach((el) => {
		el.className = 'tile';
	})
	page.fullScrBtn.classList.add("hidden-on-medium");
	page.rowStuff.style.display = "none";
	page.tileStuff.style.display = "flex";
})

//row view
page.toRowButton.addEventListener('click', () => {
	page.toTileButton.classList.remove("active");
	page.toRowButton.classList.add("active");
	page.slider.style.display = "none";
	page.items.forEach((el) => {
		el.className = 'item';
	})
	page.fullScrBtn.classList.remove("hidden-on-medium");
	page.tileStuff.style.display = "none";
	page.rowStuff.style.display = "block";
})
