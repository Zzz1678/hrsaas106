export const imgerror = {
    inserted(dom, options) {
        dom.onerror = function() {
            dom.src = options.value
        }
    }
}