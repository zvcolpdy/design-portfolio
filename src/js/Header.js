import fullscreen from 'fullscreen'
import {getEl} from './helpers'
import Gallery from './Gallery'
import GallerySlider from './GallerySlider'
import FullResolution from './FullResolution'

var Header = (function(){
    var $fullScreen = getEl('fullscreen'),
        $toTile = getEl('toTileBtn'),
        $toRow = getEl('toRowBtn'),
        $highResCloseBtn = getEl('goBackToGallery'),
        $gallerySlider = getEl('galleySliderNav'),
        $gallerySliderPrevBtn = getEl('slide-left'),
        $gallerySliderRightBtn = getEl('slide-right');

    var currentStructureType = 'row';
    var fullscreenObj = fullscreen(document.documentElement);

    var setUpListeners = function() {
        $fullScreen.addEventListener('click', toggleFullScreen);
        $toTile.addEventListener('click', function() {onClickListStructureBtn('tile')});
        $toRow.addEventListener('click', function() {onClickListStructureBtn('row')});
        $gallerySliderPrevBtn.addEventListener('click', GallerySlider.prev);
        $gallerySliderRightBtn.addEventListener('click', GallerySlider.next);
        $highResCloseBtn.addEventListener('click', FullResolution.closeModule)
    };

    var init = function() {
        setUpListeners();
    };

    var toggleFullScreen = function() {
        if(!window.screenTop && !window.screenY){
            $fullScreen.classList.remove("active");
            fullscreenObj.release();
        }else{
            $fullScreen.classList.add("active");
            fullscreenObj.request();
        }
    };

    var onClickListStructureBtn = function(type) {
        if(currentStructureType !== type){
            if(type === 'row'){
                GallerySlider.closeSlider();
                closeSliderNav();
            }

            currentStructureType = type;

            $toTile.classList.toggle("active");
            $toRow.classList.toggle("active");

            Gallery.toggleStructure(type)
        }
    };

    var openSliderNav = function() {
        $gallerySlider.classList.add("visible");
    };

    var closeSliderNav = function() {
        $gallerySlider.classList.remove("visible");
    };

    var toggleHighResCloseBtn = function() {
        $highResCloseBtn.classList.toggle("visible");
    };

    init();

    return{
        openSliderNav: openSliderNav,
        closeSliderNav: openSliderNav,
        toggleHighResCloseBtn: toggleHighResCloseBtn
    }
})();

export default Header