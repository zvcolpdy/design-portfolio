export let refreshItems = () => {
	items.items = [].slice.call(items.polkaRapper.children);
}

let getEl = (id) => (document.getElementById(id));

let items = {};

items.html = document.documentElement;
items.body = document.body;
items.toTileButton = getEl('toTileButton');
items.toRowButton = getEl('toRowButton');
items.polkaRapper = getEl('main-wrapper');
items.items = [].slice.call(items.polkaRapper.children);
items.main = getEl('main');
items.about = getEl('about-container');
items.sliderPrev = document.getElementsByClassName("sliderPrev");
items.sliderNext = document.getElementsByClassName("sliderNext");
items.sliderContent = getEl("slider-content"); 
items.slider = getEl("slider"); 
items.backToGalleryViewButton = getEl('gallery-back-button');

export default items;