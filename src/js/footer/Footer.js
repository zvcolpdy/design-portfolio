import {getEl} from '../helpers'
import NavBar from './NavBar'

const Footer = (function(){
    const $hideFooter = getEl('hide-footer'),
          $footer = document.getElementsByTagName('footer')[0];

    const setUpListeners = () => {
        $hideFooter.addEventListener('click', hideFooter)
    };

    const init = () => {
        setUpListeners();
        NavBar.init()
    };

    const hideFooter = () => {
        $footer.style.display = "none";
    };

    init()
})()