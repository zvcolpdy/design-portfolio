import page from '../pageItems'

const ImagesList = (function(){
    const toggleStructure = (type) => {
        if(type === 'row'){
            page.slider.style.display = "none";
            page.items.forEach((el) => {
                el.className = 'item';
            })
        }
        if(type === 'tile'){
            let fullResContainer = document.getElementById('fullRes');

            page.backToGalleryViewButton.style.display = "none";
            page.items.forEach((el) => {
                el.className = 'tile';
            })
            if(fullResContainer){
                page.body.removeChild(fullResContainer);
            }
        }
    }

    return {
        toggleStructure
    }
})()

export default ImagesList