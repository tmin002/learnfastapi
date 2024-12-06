export function E(element_id) {
    return document.getElementById(element_id);
}
export function C(element_class) {
    return document.getElementsByClassName(element_id)[0];
}
export function setElementDisplay(element, display) {
    element.style.display = display ? display : 'none';
}

export function createElement(tagName, innerHTML, events = {}) {
    let element = document.createElement(tagName);
    element.innerHTML = innerHTML;
    Object.keys(events).forEach(eventName => {
        element[eventName] = events[eventName];
    })
    return element;
}