import fullscreen from 'fullscreen'

let body = document.getElementsByTagName('html')[0];

let addFullScreenListener = (item) => {
	let fullScr = fullscreen(item);
	let bodyReleaseListener = () => {
		fullScr.release()
	}

	item.addEventListener('click', () => {
  	fullScr.request();
  	body.addEventListener('click',bodyReleaseListener)
	})

	fullScr.on('release', function() {
  	body.removeEventListener('click',bodyReleaseListener)
	})
}

let wrapper = document.getElementById('wrapper-main').childNodes;
wrapper = [].slice.call(wrapper);

wrapper.forEach((el) => {
	el.className === "item" ? addFullScreenListener(el) : null
})