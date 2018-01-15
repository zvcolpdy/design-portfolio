import {getEl, smothScroll} from './helpers'
import Header from './Header'

const GallerySlider = (function(){
    const $slider = getEl('gallerySlider'),
          $sliderWrapper = $slider.children[0].children[0],
          $nextBtn = getEl('nextBtn'),
          $prevBtn = getEl('prevBtn');
    let currentIndex = null;
    let itemLength = null;

    const setUpListeners = () => {
        $nextBtn.addEventListener('click', next);
        $prevBtn.addEventListener('click', prev);
    };

    const init = () => {
        setUpListeners();
    };

    const initSlider = () => {
        itemLength = $sliderWrapper.children.length;

        // styles
        $sliderWrapper.style.width = 100*itemLength + "%"
        Array.prototype.slice.call($sliderWrapper.children).forEach((el) => {
            el.style.width = 100/itemLength + "%"
        })
    };

    const appendItems = (itemsFragment) => {
        $sliderWrapper.appendChild(itemsFragment);
        initSlider();
    };

    const openSlider = (artIndex) => {
        currentIndex = artIndex;
        setCurrentSlide();

        Header.openSliderNav();
        $slider.classList.add("opened");
    };

    const closeSlider = () => {
        Header.closeSliderNav();
        $slider.classList.remove("opened");
    };

    const setCurrentSlide = () => {
        $sliderWrapper.style.marginLeft = 100*currentIndex*-1 + "%";
        smothScroll(getEl('main'), 0, 300);
    };

    const next = () => {
        if(currentIndex < itemLength - 1)
            currentIndex++;
        else
            currentIndex = 0;

        setCurrentSlide();
    };

    const prev = () => {
        if(currentIndex > 0)
            currentIndex--;
        else
            currentIndex = itemLength - 1;

        setCurrentSlide();
    };

    init();

    return{
        appendItems,
        initSlider,
        openSlider,
        closeSlider,
        prev,
        next
    }
})();

export default GallerySlider
