const NavBar = (function(){
    const $linksArr = document.querySelectorAll('#nav-bar a');

    const setUpListeners = () => {
        $linksArr.forEach(($el) => {
            $el.addEventListener('click', () => {historyChange($el.dataset.link)});
        })
    };

    const init = () => {
        setUpListeners();
    };

    const historyChange = (path) => {
        history.pushState({page: path}, "", '/#/' + path);
    };

    return {
        init
    }
})()

export default  NavBar