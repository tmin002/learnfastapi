import { E, setElementDisplay } from '../DOM';
import {PostElement} from "../PostElement";
import {PageControl} from "./PageControl";

export class PageElement extends HTMLElement {
    constructor(pageName, contentElement, headerBtnId = null) {
        super();
        this.pageName = pageName;
        this.__contentElement = contentElement;
        if (headerBtnId) {
            this.headerBtnId = headerBtnId;
            E(headerBtnId).onclick = () => this.show();
        }
    }
    connectedCallback() {
        this.id = 'page-' + this.pageName;
        this.appendChild(this.__contentElement);
    }
    show() {
        PageControl.__setCurrentPage(this.pageName);
    }
    close() {
        this.remove();
    }
    onPageShow() {
        return true;
    }
}
customElements.define('page-element', PageElement);
