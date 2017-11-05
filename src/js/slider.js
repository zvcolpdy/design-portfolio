import page from "./pageItems"

//слава украине
let slider = {
	items:page.items,
	currentItem:0
}

//adding item to slider
export let put = (item) => {
	slider.items = page.items; //update slider items if pressed "load more" button
	slider.currentItem = slider.items.indexOf(item);
	page.sliderContent.innerHTML = "";
	let currElem = slider.items[slider.currentItem].cloneNode(true); //
	currElem.className = "item";
	page.sliderContent.appendChild(currElem);
}

//listeners for both 1920-arrow and small-screen prev button
[].slice.call(page.sliderPrev).forEach((item) => {
	item.addEventListener('click',() => {
		slider.currentItem = slider.currentItem == 0 ? 0 : 
		slider.currentItem - 1;
		put(slider.items[slider.currentItem]);
	})
});

//vice versa as function above
[].slice.call(page.sliderNext).forEach((item) => {
	item.addEventListener('click',() => {
		slider.currentItem = slider.currentItem == slider.items.length - 1 ? slider.currentItem : 
		slider.currentItem + 1;
		put(slider.items[slider.currentItem]);
	})
});


