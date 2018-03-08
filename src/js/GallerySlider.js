import {getEl} from './helpers'
import Header from './Header'

var GallerySlider = (function(){
    var $slider = getEl('gallerySlider'),
          $sliderWrapper = $slider.children[0].children[0],
          $nextBtn = getEl('nextBtn'),
          $prevBtn = getEl('prevBtn');
    var currentIndex = null;
    var itemLength = null;

    var setUpListeners = function() {
        $nextBtn.addEventListener('click', next);
        $prevBtn.addEventListener('click', prev);
    };

    var init = function() {
        setUpListeners();
    };

    var initSlider = function() {
        itemLength = $sliderWrapper.children.length;

        // styles
        $sliderWrapper.style.width = 100*itemLength + "%";
        Array.prototype.slice.call($sliderWrapper.children).forEach(function(el) {
            el.style.width = 100/itemLength + "%"
        })
    };

    var appendItems = function(itemsFragment) {
        $sliderWrapper.appendChild(itemsFragment);
        initSlider();
    };

    var openSlider = function(artIndex) {
        currentIndex = artIndex;
        setCurrentSlide();

        Header.openSliderNav();
        $slider.classList.add("opened");
    };

    var closeSlider = function() {
        Header.closeSliderNav();
        $slider.classList.remove("opened");
    };

    var setCurrentSlide = function() {
        $sliderWrapper.style.transform = "translate3d(" + (100/itemLength)*currentIndex*-1 + "%" + ",0, 0)";
    };

    var next = function() {
        if(currentIndex < itemLength - 1)
            currentIndex++;
        else
            currentIndex = 0;

        setCurrentSlide();
    };

    var prev = function() {
        if(currentIndex > 0)
            currentIndex--;
        else
            currentIndex = itemLength - 1;

        setCurrentSlide();
    };

    init();

    return{
        appendItems: appendItems,
        initSlider: initSlider,
        openSlider: openSlider,
        closeSlider: closeSlider,
        prev: prev,
        next: next
    }
})();

export default GallerySlider