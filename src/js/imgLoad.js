import page from "./pageItems"

let pics = [];
export function load(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://portfel-4f69.restdb.io/rest/imgs?apikey=5a05020679e24ff75c1817e3', false);
	xhr.send();
	xhr.status != 200 ? console.log(xhr.status + ': ' + xhr.statusText) : pics = JSON.parse(xhr.responseText);
}

function createContainer(item){
	let classname = (page.toTileButton.classList.contains('active')) ? 'tile' : 'item';
	let elem = document.createElement('div');
	elem.classList.add(classname);
	let img = document.createElement('img');
	img.src = item.img;
	let name = document.createElement('p');
	name.innerHTML = item.name;
	let button = document.createElement('p');
	button.classList.add('fullResButton')
	button.innerHTML = 'View Highres';

	elem.appendChild(document.createElement('div'));
	elem.children[0].appendChild(img);
	elem.appendChild(name);
	elem.appendChild(button);

	return elem;
}