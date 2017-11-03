import './header'
import './footer'
import './slider'
import page from "./pageItems"
import {put} from "./slider"

let putToSlider = (e) => {
	if(e.target.parentNode.parentNode.className == "tile"){
		put(e.target.parentNode.parentNode);
		page.slider.style.display = "flex";
		scrollToTop();
	}
}

let scrollToTop = () => {
		let stop  = setInterval(() => {
			page.html.scrollTop == 0 ? clearInterval(stop) : page.html.scrollTop -= 35;
		},10)
}

page.main.addEventListener('click',putToSlider);