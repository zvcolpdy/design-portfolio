import {getEl} from '../helpers'
import page, {refreshItems} from '../pageItems'

const LoadMore = (function(){
    const $loadMore = getEl('loadMore');
    let pics = [],
        itr,
        numberOfPicsToLoad = 2;

    const setUpListeners = () => {
        $loadMore.addEventListener('click', loadMore)
    }

    const init = () => {
        load();
        setUpListeners();
    }

    const toggleLoadMoreVisibility = (visibility) => {
        $loadMore.style.display = visibility ? 'flex' : 'none'
    }

    const load = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://portfel-4f69.restdb.io/rest/imgs?apikey=5a05020679e24ff75c1817e3', false);
        xhr.send();
        xhr.status != 200 ? console.log(xhr.status + ': ' + xhr.statusText) : pics = JSON.parse(xhr.responseText);
        itr = pics[Symbol.iterator]();
        loadMore();
        toggleLoadMoreVisibility(true);
    }

    const loadMore = () => {
        for(let i = 0; i < numberOfPicsToLoad; i++){
            let el = itr.next()
            if(el.done == false){
                page.polkaRapper.appendChild(createContainer(el.value))
            }
            else{
                toggleLoadMoreVisibility(false);
                break;
            }
        }
        refreshItems();
    }

    const createContainer = (item) => {
        let classname = (page.toTileButton.classList.contains('active')) ? 'tile' : 'item';
        let elem = document.createElement('div');
        elem.classList.add(classname);
        let img = document.createElement('img');
        img.src = item.img;
        let name = document.createElement('p');
        name.innerHTML = item.name;
        let button = document.createElement('p');
        button.classList.add('fullResButton')
        button.innerHTML = 'View Highres';
        elem.appendChild(document.createElement('div'));
        elem.children[0].appendChild(img);
        elem.appendChild(name);
        elem.appendChild(button);

        return elem;
    }

    init()
})()