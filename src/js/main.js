import fullscreen from 'fullscreen'


let addFullScreenListener = (item) => {
	item.addEventListener('click', () => {
  	fullscreen(item).request();
	})
}

let wrapper = document.getElementById('wrapper-main').childNodes;
wrapper = [].slice.call(wrapper);

wrapper.forEach((el) => {
	el.className === "item" ? addFullScreenListener(el) : null
})
