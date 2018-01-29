import {getEl, smothScroll} from './helpers'
import GallerySlider from './GallerySlider'
import FullResolution from "./FullResolution";

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
    let $scrolledElement = null;

    let currentStructureType = 'row';

    const setUpListeners = () => {
        $gallery.addEventListener('click', itemClickEvent)
    };

    const init = () => {
        setUpListeners();
        initScroll();

    };

    const initScroll = () => {
        const delay = 300;
        let timeout = null;

        let el = new SimpleBar(getEl('main'));
        $scrolledElement = el.getScrollElement();
        // el.recalculate()
        $scrolledElement.addEventListener('scroll', (e) => {
            $scrolledElement.classList.add("scrolled");
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                $scrolledElement.classList.remove("scrolled");
            },delay);
        });
    }

    const itemClickEvent = (e) => {
        let el = e.target,
            highResAttr = el.getAttribute("high-res-url");

        // highResolution open btn
        if(highResAttr){
            FullResolution.fillContainer(highResAttr)
        }

        // tile open gallery
        if(currentStructureType === 'tile'){
            let itemNode = itemIsParentNode(el);
            if(itemNode){
                let index = Array.prototype.slice.call($gallery.children).indexOf(itemNode)
                GallerySlider.openSlider(index);
                smothScroll($scrolledElement, 0, 500);
            }
        }
    }

    const toggleStructure = (type) => {
        currentStructureType = type;
        smothScroll($scrolledElement, 0, 0);
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