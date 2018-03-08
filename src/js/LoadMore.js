import {getEl, preloadImages, art} from './helpers'
import Gallery from './Gallery'
import GallerySlider from './GallerySlider'

var LoadMore = (function(){

    var $loadMore = getEl('loadMoreBtn'),
        numberToUpload = 8;

    var lastImgLoaded = 0,
        blockLoadMore = false;

    var setUpListeners = function() {
        $loadMore.addEventListener('click', uploadImages)
    };

    var init = function() {
        setUpListeners();
        uploadImages();
    };

    var createItemElement = function(img, title, highResUrl) {
        var item = document.createElement("div"),
            textDiv = document.createElement("div"),
            name = document.createElement("div"),
            hightRes = document.createElement("div");

        item.setAttribute("class","item");

        name.textContent = title;
        hightRes.textContent = "view highres";
        hightRes.setAttribute("high-res-url", highResUrl);
        textDiv.appendChild(name);
        textDiv.appendChild(hightRes);
        item.appendChild(img);
        item.appendChild(textDiv);

        return item
    };

    var uploadImages = function() {
        if(!blockLoadMore){
            $loadMore.classList.add("locked");
            blockLoadMore = true;

            var arrOfUrlsToLoad = [];

            for(var i = 0; i < numberToUpload; i++){
                if(art[lastImgLoaded + i]){
                    arrOfUrlsToLoad.push(art[lastImgLoaded + i]['base_url'])
                }
            }

            preloadImages(arrOfUrlsToLoad).then(function(imgs) {
                var docFrag = document.createDocumentFragment();

                for(var i = 0; i < imgs.length; i++){
                    var item = createItemElement(imgs[i], art[lastImgLoaded+i]['title'], art[lastImgLoaded+i]['highres_url']);
                    docFrag.appendChild(item);
                }

                GallerySlider.appendItems(docFrag.cloneNode(true));
                Gallery.appendItems(docFrag.cloneNode(true));

                lastImgLoaded += numberToUpload;
                blockLoadMore = false;

                if(lastImgLoaded >= art.length){
                    $loadMore.classList.add("hidden");
                }

                $loadMore.classList.remove("locked");
            }, function(errImg) {
                alert("failed")
            });
        }
    };

    init();
})();

export default LoadMore