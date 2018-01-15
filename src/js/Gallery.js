import {getEl} from './helpers'
import GallerySlider from './GallerySlider'

function itemIsParentNode(node){
    while (node !== null) {
        if (node.classList && node.classList.contains("item")) {
            return node;
        }
        node = node.parentNode;
    }
    return false;
}

const Gallery = (function(){

    const $gallery = getEl('gallery');
    let currentStructureType = 'row';

    const setUpListeners = () => {
        $gallery.addEventListener('click', itemClickEvent)
    };

    const init = () => {
        setUpListeners();
    };

    const itemClickEvent = (e) => {
        if(currentStructureType === 'tile'){
            let itemNode = itemIsParentNode(e.target);
            if(itemNode){
                let index = Array.prototype.slice.call($gallery.children).indexOf(itemNode)
                GallerySlider.openSlider(index)
            }
        }
    }

    const toggleStructure = (type) => {
        currentStructureType = type;
        if(type === 'tile'){
            $gallery.classList.add("tile");
        }else{
            $gallery.classList.remove("tile");
        }
    };

    const appendItems = (docFrag) => {
        $gallery.appendChild(docFrag);
    }

    init();

    return {
        toggleStructure,
        appendItems
    }
})()

export default Gallery