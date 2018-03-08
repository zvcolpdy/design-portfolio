import {getEl, smothScroll, debounce} from './helpers'
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

var Gallery = (function(){
    var $gallery = getEl('gallery'),
          $main = getEl('main');
    var simpleBarObject = new SimpleBar($main);
    var $scrolledElement = null;

    var currentStructureType = 'row';

    var setUpListeners = function() {
        $gallery.addEventListener('click', itemClickEvent)
    };

    var init = function() {
        setUpListeners();
        initScroll();
    };

    var initScroll = function() {
        var debouncedRemoveClassFn = debounce(function(){
            $scrolledElement.classList.remove("scrolled");
        }, 300);

        $scrolledElement = simpleBarObject.getScrollElement();
        $scrolledElement.addEventListener('scroll', function() {
            if(!$scrolledElement.classList.contains("scrolled")){
                $scrolledElement.classList.add("scrolled");
            }
            debouncedRemoveClassFn();
        });
    };

    var itemClickEvent = function(e) {
        var el = e.target,
            highResAttr = el.getAttribute("high-res-url");

        // highResolution open btn
        if(highResAttr){
            FullResolution.openModule(highResAttr);
        }

        // tile open gallery
        if(currentStructureType === 'tile'){
            var itemNode = itemIsParentNode(el);
            if(itemNode){
                var index = Array.prototype.slice.call($gallery.children).indexOf(itemNode);
                GallerySlider.openSlider(index);
                smothScroll($scrolledElement, 0, 500);
            }
        }
    };

    var toggleStructure = function(type) {
        currentStructureType = type;
        smothScroll($scrolledElement, 0, 0);
        if(type === 'tile'){
            $gallery.classList.add("tile");
        }else{
            $gallery.classList.remove("tile");
        }
    };

    var appendItems = function(docFrag) {
        $gallery.appendChild(docFrag);
    };

    var resizeToFooterChanges = function(type) {
        if(type === 'hide'){
            $main.classList.add("full-size");
        }else{
            $main.classList.remove("full-size");
        }
    };

    init();

    return {
        toggleStructure: toggleStructure,
        appendItems: appendItems,
        resizeToFooterChanges: resizeToFooterChanges
    }
})()

export default Gallery