export function E(element_id) {
    return document.getElementById(element_id);
}
export function setElementDisplay(element, display) {
    element.style.display = display ? display : 'none';
}

export function createElement(tagName, innerHTML, events = {}) {
    let element = document.createElement(tagName);
    element.innerHTML = innerHTML;

    Object.keys(events).forEach(querySelector => {
        let target = querySelector === '$self' ?
            element : element.querySelector(querySelector);
        target[events[querySelector]['eventName']]
         = events[querySelector]['event'];
    });

    return element;
}