import page from './pageItems'

const Router = (function(window, history){
    const setUpListeners = () => {
        window.onpopstate = history.onpushstate = listener;
        listener(history)
    };

    const init = () => {
        setUpListeners();
    };

    const listener = (e) => {
        switch(e.state && e.state.page){
            case "":
                page.about.style.display = "none";
                break;
            case "about":
                page.about.style.display = "block";
                break;
        }
    };

    init()
})(window, window.history)
