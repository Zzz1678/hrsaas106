export const imgerror = {
    inserted(dom, options) {

        dom.src = dom.src || options.value;
        dom.onerror = function() {
            dom.src = options.value
        }
    },
    componentUpdate(dom, options) {
        dom.src = dom.src = options.value
    }
}