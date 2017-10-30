
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
items.items = [].slice.call(items.polkaRapper.childNodes).filter(el => el.tagName === 'DIV');
items.main = getEl('main');
items.about = getEl('about-container');



export default items;