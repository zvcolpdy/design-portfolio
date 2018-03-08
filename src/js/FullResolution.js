import {getEl, debounce} from './helpers'
import Header from './Header'

var FullResolution = (function(){

    var $container = getEl('fullResolution');
    var zoomCount = 10;
    var zoomIndex = 0;
    var container = {
        width: null,
        height: null,
        attitude: null
    };
    var img = {
        maxSize: {
            width: null,
            height: null
        },
        minSize: {
            width: null,
            height: null
        },
        width: null,
        height: null,
        top: null,
        left: null,
        attitude: null,
        stepWidth: null,
        stepHeight: null
    };
    var dragParams = {
        active: false,
        clickX: null,
        clickY: null
    };
    var $img;

    var throttleOnWheelClassFn = debounce(function(){
        $container.classList.remove('on-wheel');
    }, 150);

    var setUpContainerSize = function() {
        container.width = $container.offsetWidth;
        container.height = $container.offsetHeight;
        container.attitude = container.width/container.height;
    };

    var setUpListeners = function() {
        // wheel eventListener
        if ($container.addEventListener) {
            if ('onwheel' in document) {
                $container.addEventListener("wheel", onWheel);
            } else if ('onmousewheel' in document) {
                $container.addEventListener("mousewheel", onWheel);
            } else {
                $container.addEventListener("MozMousePixelScroll", onWheel);
            }
        } else {
            $container.attachEvent("onmousewheel", onWheel);
        }
        // close module event
        window.addEventListener("keydown", keyDown);
        window.addEventListener('resize', resize);
    };

    var imageDragEvent = function() {
        $img.addEventListener('mousedown', mouseDown);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    };

    var removeListenres = function() {
        window.removeEventListener("keydown", keyDown);
        window.removeEventListener('resize', resize);
        window.removeEventListener("wheel", onWheel);
        $img.removeEventListener('mousedown', mouseDown);
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };

    var resize = function() {
        setUpContainerSize();
        calculatePos();
    }

    var keyDown = function(e) {
        e = e || window.event;
        var isEscape = false;
        if ("key" in e) {
            isEscape = (e.key == "Escape" || e.key == "Esc");
        } else {
            isEscape = (e.keyCode == 27);
        }
        if (isEscape) {
            closeModule();
        }
    };

    var mouseUp = function() {
        dragParams.active = false;
    };

    var mouseDown = function(e) {
        e.preventDefault();
        dragParams.active = true;
        dragParams.clickX = e.clientX;
        dragParams.clickY = e.clientY;
    };

    var mouseMove = function(e) {
        if(dragParams.active){
            var deltaX = e.clientX - dragParams.clickX;
            var deltaY = e.clientY - dragParams.clickY;

            dragParams.clickX = e.clientX;
            dragParams.clickY = e.clientY;

            var leftPos = parseFloat($img.style.left) + deltaX;
            var topPos = parseFloat($img.style.top) + deltaY;

            recalculateImagePosition(leftPos, topPos)
        }
    };

    var onWheel = function(e) {
        e = e || window.event;

        var delta = e.deltaY || e.detail || e.wheelDelta;
        var newLeftPos, newTopPos;

        if(delta > 0 && zoomIndex){
            img.width = Math.max(Math.floor(img.width - img.stepWidth), img.minSize.width);
            img.height = Math.max(Math.floor(img.height - img.stepHeight), img.minSize.height);
            zoomIndex--;

            newLeftPos = parseFloat($img.style.left) + img.stepWidth/2;
            newTopPos = parseFloat($img.style.top) + img.stepHeight/2;

        }else if(delta < 0 && zoomIndex < zoomCount){
            img.width = Math.min(Math.ceil(img.width + img.stepWidth), img.maxSize.width);
            img.height = Math.min(Math.ceil(img.height + img.stepHeight), img.maxSize.height);
            zoomIndex++;

            newLeftPos = parseFloat($img.style.left) - img.stepWidth/2;
            newTopPos = parseFloat($img.style.top) - img.stepHeight/2;
        }

        if(!$container.classList.contains('on-wheel')){
            $container.classList.add('on-wheel');
        }
        throttleOnWheelClassFn();

        recalculateImageSize();
        recalculateImagePosition(newLeftPos, newTopPos);

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    };

    var fillContainer = function(url) {
        $img = new Image();
        $img.onload = function() {
            $container.appendChild($img);

            img.maxSize.width = $img.width;
            img.maxSize.height = $img.height;
            img.attitude = $img.width/$img.height;

            calculatePos();
        };
        $img.src = url;

        // add drag event
        imageDragEvent();
    };

    var calculatePos = function() {
        zoomIndex = 0;
        if(img.maxSize.width <= container.width && img.maxSize.height <= container.height) {
            img.width = img.maxSize.width;
            img.height = img.maxSize.height;
        } else if (img.attitude > container.attitude) {
            img.width = container.width;
            img.height = img.width/img.attitude;
        } else {
            img.height = container.height;
            img.width = img.height*img.attitude;
        }
        img.stepWidth = (img.maxSize.width - img.width)/zoomCount;
        img.stepHeight = (img.maxSize.height - img.height)/zoomCount;
        img.minSize.width = img.width;
        img.minSize.height = img.height;

        recalculateImageSize();
        recalculateImagePosition();
    };

    var recalculateImagePosition = function(leftPos, topPos) {
        // validate if possible to drag in XY
        if(img.width <= container.width){
            leftPos = container.width/2 - img.width/2
        }else{
            if(leftPos > 0){
                leftPos = 0;
            }
            if(leftPos < container.width - img.width){
                leftPos = container.width - img.width;
            }
        }
        if(img.height <= container.height){
            topPos = container.height/2 - img.height/2;
        }else{
            if(topPos > 0){
                topPos = 0;
            }
            if(topPos < container.height - img.height){
                topPos = container.height - img.height;
            }
        }
        // end validation
        $img.style.top = topPos + "px";
        $img.style.left = leftPos + "px";
    };

    var recalculateImageSize = function() {
        $img.height = img.height;
        $img.width = img.width;
    };

    var openModule = function(url) {
        setUpContainerSize();
        setUpListeners();
        fillContainer(url);
        Header.toggleHighResCloseBtn();
        $container.classList.add("visible");
    };

    var closeModule = function() {
        removeListenres();
        $container.classList.remove("visible");
        setTimeout(function() {
            $img.remove();
            $img = null;
        }, 350);
        zoomIndex = 0;
        Header.toggleHighResCloseBtn();
    };

    var resizeToFooterChanges = function(type) {
        // temporary transition
        $container.classList.add("temporary-transition");
        setTimeout(function() {
            $container.classList.remove("temporary-transition");
        }, 350);
        // end

        if(type === 'hide'){
            $container.classList.add("full-size");
        }else{
            $container.classList.remove("full-size");
        }

        setUpContainerSize();
        if($img)
            calculatePos();
    };

    return {
        openModule: openModule,
        closeModule: closeModule,
        resizeToFooterChanges: resizeToFooterChanges
    }

})();

export default FullResolution