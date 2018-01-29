import fullscreen from 'fullscreen'
import {getEl} from './helpers'
import Gallery from './Gallery'
import GallerySlider from './GallerySlider'

const Header = (function(){
    const $fullScreen = getEl('fullscreen'),
        $toTile = getEl('toTileBtn'),
        $toRow = getEl('toRowBtn'),
        $gallerySlider = getEl('galleySliderNav'),
        $gallerySliderPrevBtn = getEl('slide-left'),
        $gallerySliderRightBtn = getEl('slide-right');

    let currentStructureType = 'row';
    let fullscreenFlag = false;

    const setUpListeners = () => {
        $fullScreen.addEventListener('click', toggleFullScreen)
        $toTile.addEventListener('click', () => {onClickListStructureBtn('tile')})
        $toRow.addEventListener('click', () => {onClickListStructureBtn('row')})
        $gallerySliderPrevBtn.addEventListener('click', GallerySlider.prev)
        $gallerySliderRightBtn.addEventListener('click', GallerySlider.next)
    };

    const init = () => {
        setUpListeners();
    };

    const toggleFullScreen = () => {
        $fullScreen.classList.toggle("active");
        if(fullscreenFlag)
            fullscreen(document.documentElement).release();
        else
            fullscreen(document.documentElement).request();
        fullscreenFlag = !fullscreenFlag;
    };

    const onClickListStructureBtn = (type) => {
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

    const openSliderNav = () => {
        $gallerySlider.classList.add("visible");
    };

    const closeSliderNav = () => {
        $gallerySlider.classList.remove("visible");
    };

    init()

    return{
        openSliderNav,
        closeSliderNav
    }
})()

export default Header