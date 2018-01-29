import {getEl, preloadImages, art} from './helpers'
import Gallery from './Gallery'
import GallerySlider from './GallerySlider'

const LoadMore = (function(){

    const $loadMore = getEl('loadMoreBtn'),
        numberToUpload = 16;

    let lastImgLoaded = 0,
        blockLoadMore = false;

    const setUpListeners = () => {
        $loadMore.addEventListener('click', uploadImages)
    };

    const init = () => {
        setUpListeners();
        uploadImages();
    };

    const createItemElement = (img, title, highResUrl) => {
        let item = document.createElement("div"),
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
    }

    const uploadImages = () => {
        if(!blockLoadMore){
            $loadMore.classList.add("locked");
            blockLoadMore = true;

            let arrOfUrlsToLoad = []

            for(let i = 0; i < numberToUpload; i++){
                if(art[lastImgLoaded + i]){
                    arrOfUrlsToLoad.push(art[lastImgLoaded + i]['base_url'])
                }
            }

            preloadImages(arrOfUrlsToLoad).then((imgs) => {
                let docFrag = document.createDocumentFragment();

                for(let i = 0; i < imgs.length; i++){
                    let item = createItemElement(imgs[i], art[lastImgLoaded+i]['title'], art[lastImgLoaded+i]['highres_url']);
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
            }, (errImg) => {
                alert("failed")
            });
        }
    };

    init();
})()

export default LoadMore