import {getEl} from '../helpers'
import fullscreen from 'fullscreen'
import ImagesList from '../mainModules/ImagesList'

const Header = (function(){
    const $fullScreen = getEl('fullscreen'),
          $toTile = getEl('toTileButton'),
          $toRow = getEl('toRowButton'),
          $rowStuff = getEl('row-stuff'),
          $tileStuff = getEl('tile-stuff');
    let currentStructureType = 'row';

    const setUpListeners = () => {
        $fullScreen.addEventListener('click', toggleFullScreen)
        $toTile.addEventListener('click', () => {onClickListStructureBtn('tile')})
        $toRow.addEventListener('click', () => {onClickListStructureBtn('row')})
    }

    const init = () => {
        setUpListeners();
    }

    const toggleFullScreen = () => {
        fullscreen(document.documentElement).request();
        $fullScreen.children[1].classList.add("active");
    }

    const onClickListStructureBtn = (type) => {
        if(currentStructureType !== type){
            currentStructureType = type;

            $toTile.classList.toggle("active");
            $toRow.classList.toggle("active");
            // labels
            $rowStuff.classList.toggle("visible");
            $tileStuff.classList.toggle("visible");

            $fullScreen.classList.toggle("hidden-on-medium");
            ImagesList.toggleStructure(type)
        }
    }

    init()
})()