import {getEl} from './helpers'
import FullResolution from './FullResolution'
import Gallery from './Gallery'

var Footer = (function(){

    var $footer = getEl('footer'),
          $hideBtn = getEl('hideFooterBtn');

    var setUpListeners = function() {
        $hideBtn.addEventListener('click', addHiddenClass);
        $footer.addEventListener('click', removeHiddenClass);
    };

    var init = function() {
        setUpListeners();
    };

    // type = null || 'hide'
    var updateModulesAfterHidden = function(type) {
        FullResolution.resizeToFooterChanges(type);
        Gallery.resizeToFooterChanges(type);
    };

    var removeHiddenClass = function() {
        if($footer.classList.contains('hidden')){
            $footer.classList.remove('hidden');
            updateModulesAfterHidden();
        }
    };

    var addHiddenClass = function(e) {
        e.stopPropagation();
        $footer.classList.add('hidden', 'disable');
        updateModulesAfterHidden('hide');
        setTimeout(function() {
            $footer.classList.remove('disable');
        }, 350)
    };

    init();
})();

export default Footer