export function E(element_id) {
    return document.getElementById(element_id);
}
export function setElementDisplay(element, display) {
    element.style.display = display ? display : 'none';
}