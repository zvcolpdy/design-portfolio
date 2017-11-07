export let refreshItems = () => {
	items.items = [].slice.call(items.polkaRapper.children);
}

let getEl = (id) => (document.getElementById(id));

let items = {};

items.html = document.documentElement;
items.body = document.body;
items.homeButton = getEl('homeButton');
items.aboutButton = getEl('aboutButton');
items.fullScrBtn = getEl('fullscreen');
items.toTileButton = getEl('toTileButton');
items.toRowButton = getEl('toRowButton');
items.polkaRapper = getEl('main-wrapper');
items.items = [].slice.call(items.polkaRapper.children);
items.main = getEl('main');
items.about = getEl('about-container');
items.rowStuff = getEl('row-stuff');
items.tileStuff = getEl('tile-stuff');
items.sliderPrev = document.getElementsByClassName("sliderPrev");
items.sliderNext = document.getElementsByClassName("sliderNext");
items.sliderContent = getEl("slider-content"); 
items.slider = getEl("slider"); 
items.hideFooter = getEl("hide-footer");
items.footer = document.getElementsByTagName('footer')[0];
items.backToGalleryViewButton = getEl('gallery-back-button');


export default items;