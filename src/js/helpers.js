export const getEl = (id) => (document.getElementById(id));

// call window.onpopstate when history.pushState()
(function(history){
    let pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate === "function") {
            history.onpushstate({state: state});
        }
        return pushState.apply(history, arguments);
    };
})(window.history)