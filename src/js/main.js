import './header'
import './footer'
import './slider'
import page from "./pageItems"
import {put} from "./slider"

let scrollToTop = () => {
		let stop  = setInterval(() => {
			page.html.scrollTop == 0 ? clearInterval(stop) : page.html.scrollTop -= 35;
		},10)
}

//delegation of *add to slider* event to "main" element
let putToSlider = (e) => {
	if(e.target.parentNode.parentNode.className == "tile"){
		put(e.target.parentNode.parentNode);
		page.slider.style.display = "flex";
		scrollToTop();
	}
}

//delegation of handling of "fullResButton" press to "main" element
let fullResView = (e) => {
	if(e.target.className == "fullResButton"){
		page.backToGalleryViewButton.style.display = "flex";
		let img = e.target.parentNode.children[0].children[0].cloneNode(true);
		let removeHighResContainer = createHighResContainer(img);
		let backButton = page.backToGalleryViewButton;
		backButton.onclick = () => {
			removeHighResContainer();
			backButton.style.display = "none";
		}
	}
}

//creating a container for high resolution view and appending it to the body
let createHighResContainer = (item) => {
	let container = document.createElement('div');
	container.id = "fullRes";
	makeDraggable(item);
	container.appendChild(item);
	page.body.appendChild(container);
	return () => {
		page.body.removeChild(container);
	}
}

page.main.addEventListener('click',putToSlider);
page.main.addEventListener('click',fullResView);


function makeDraggable(item){
	item.onmousedown = (e) => {
		let moveAt = (e) => {
			item.style.left = e.pageX - shiftX + 'px';
			item.style.top = e.pageY - shiftY - 60 + 'px';
		}

		let coords = getCoords(item);
  	let shiftX = e.pageX - coords.left;
  	let shiftY = e.pageY - coords.top;

		item.style.position = 'absolute';
  	moveAt(e);

		document.onmousemove = (e) => {
			moveAt(e);
		}

		item.onmouseup = () => {
			document.onmousemove = null;
			item.onmouseup = null;
		}
	}

	item.ondragstart = () => (false);

	let getCoords = (elem) => {
		let box = elem.getBoundingClientRect();
		return {
			top: box.top,
			left: box.left
		};
	}
}