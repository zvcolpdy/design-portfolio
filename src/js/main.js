import './header'
import './footer'
import './slider'
import page from "./pageItems"
import {put} from "./slider"
import {load} from './imgLoad'

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
			let rangeX = item.offsetParent.offsetWidth - item.offsetWidth; //avaliable range of offsetLeft
			let currX = (e.pageX - shiftX); //curr offsetLeft;
			if((page.html.clientWidth - item.offsetWidth) >= 0){
				item.style.left = item.style.left; //don't move if img width < window width
			}
			if((rangeX < currX) && (currX < 0)){ //move if offset in avaliable range
				item.style.left = e.pageX - shiftX + 'px';
			}

			let rangeY = item.offsetParent.offsetHeight - item.offsetHeight; //avaliable range of offsetTop
			let currY = (e.pageY - shiftY - 60); //curr offsetTop; -60 cuz body padding 60px
			if((page.html.clientHeight - item.offsetHeight) >= 0){
				item.style.top = item.style.top; //don't move if img height < window height
			}
			if((rangeY < currY) && (currY < 0)){ //move if offset in avaliable range
				item.style.top = e.pageY - shiftY - 60 + 'px'; // -60 cuz body padding 60px
			}
		}

		//calculating distance between left/top img side and point in which we grab item
		let coords = getCoords(item);
		let shiftX = e.pageX - coords.left; //X point of grab
		let shiftY = e.pageY - coords.top; //Y point of grab

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

	item.ondragstart = () => (false); //disabling built-in drag

	let getCoords = (elem) => {
		let box = elem.getBoundingClientRect();
		return {
			top: box.top,
			left: box.left
		};
	}
}

load();